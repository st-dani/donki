import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE 요청 처리 (리뷰 삭제)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.review.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json({ message: '리뷰가 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json(
      { error: '리뷰 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
} 