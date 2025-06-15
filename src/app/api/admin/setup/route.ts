import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';

// 비밀번호 해싱 함수
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function GET(request: NextRequest) {
  // 보안을 위한 설정 코드 추가 (실제 배포 환경에서는 이 코드를 다른 방식으로 보호해야 함)
  const setupToken = request.nextUrl.searchParams.get('token');
  const requiredToken = process.env.SETUP_TOKEN || 'temporary-setup-token';
  
  // 토큰이 없거나 일치하지 않으면 접근 거부
  if (!setupToken || setupToken !== requiredToken) {
    return NextResponse.json(
      { error: '접근이 거부되었습니다. 유효한 설정 토큰이 필요합니다.' },
      { status: 403 }
    );
  }
  
  try {
    // 기존 관리자 확인
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@donki.com' }
    });
    
    if (existingAdmin) {
      return NextResponse.json(
        { message: '관리자 계정이 이미 존재합니다.', admin: { email: existingAdmin.email } },
        { status: 200 }
      );
    }
    
    // 관리자 계정 생성
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@donki.com',
        password: hashPassword('admin1234!'), // 기본 비밀번호 설정
        name: '관리자',
        role: 'ADMIN'
      }
    });
    
    return NextResponse.json(
      { message: '관리자 계정이 성공적으로 생성되었습니다.', admin: { email: admin.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error('관리자 계정 설정 중 오류 발생:', error);
    return NextResponse.json(
      { error: '관리자 계정 설정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
