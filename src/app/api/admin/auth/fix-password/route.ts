import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';

// 비밀번호 해싱 함수
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function GET(request: NextRequest) {
  // 개발 환경에서만 실행 허용
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: '개발 환경에서만 사용 가능합니다.' }, { status: 403 });
  }
  
  try {
    // 이메일 파라미터 읽기
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const password = searchParams.get('password') || 'admin1234'; // 기본 비밀번호
    
    if (!email) {
      return NextResponse.json({
        message: 'email 파라미터가 필요합니다. 예: /api/admin/auth/fix-password?email=admin@example.com',
        example: '/api/admin/auth/fix-password?email=admin@example.com&password=newpassword'
      });
    }
    
    // 관리자 확인
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    
    if (!admin) {
      return NextResponse.json({ message: `이메일 ${email}의 관리자를 찾을 수 없습니다.` }, { status: 404 });
    }
    
    // 해시된 비밀번호
    const hashedPassword = hashPassword(password);
    
    // 관리자 비밀번호 업데이트
    const updatedAdmin = await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    return NextResponse.json({
      message: '관리자 비밀번호가 성공적으로 업데이트되었습니다.',
      email: updatedAdmin.email,
      hashedPassword: hashedPassword,
      loginInfo: {
        email: updatedAdmin.email,
        password: password
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: '비밀번호 업데이트 중 오류 발생', error: String(error) },
      { status: 500 }
    );
  }
}
