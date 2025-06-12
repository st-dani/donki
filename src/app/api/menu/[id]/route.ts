import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const menu = await prisma.menu.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(menu);
  } catch (error) {
    console.error('메뉴 상태 변경 중 오류 발생:', error);
    return NextResponse.json(
      { message: '메뉴 상태 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 