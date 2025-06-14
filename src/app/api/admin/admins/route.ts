import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';
import { Role } from '@/generated/prisma';

// 비밀번호 해싱 함수 (복호화)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// GET: 모든 관리자 조회
export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json({ message: 'Error fetching admins' }, { status: 500 });
  }
}

// POST: 새로운 관리자 생성
export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: '필수 입력 항목이 누락되었습니다.' }, { status: 400 });
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin with this email already exists' }, { status: 409 });
    }

    const hashedPassword = hashPassword(password);

    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || Role.ADMIN, // 기본값으로 ADMIN 역할 부여
      },
    });

    const { password: _, ...adminWithoutPassword } = newAdmin;

    return NextResponse.json(adminWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ message: '내부 서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
