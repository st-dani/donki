import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const estimate = await prisma.estimate.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(estimate);
  } catch (error) {
    console.error('견적 상태 변경 중 오류 발생:', error);
    return NextResponse.json(
      { message: '견적 상태 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 