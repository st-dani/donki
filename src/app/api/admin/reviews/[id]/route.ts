import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!review) {
      return NextResponse.json(
        { message: '해당 리뷰를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error('리뷰 조회 중 오류 발생:', error);
    return NextResponse.json(
      { message: '리뷰를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { rating, content, image } = data;

    // 유효성 검사
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { message: '평점은 1에서 5 사이의 값이어야 합니다.' },
        { status: 400 }
      );
    }

    // 리뷰 존재 여부 확인
    const existingReview = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!existingReview) {
      return NextResponse.json(
        { message: '해당 리뷰를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 리뷰 업데이트
    const updatedReview = await prisma.review.update({
      where: { id: params.id },
      data: {
        rating: rating !== undefined ? parseInt(rating.toString(), 10) : undefined,
        content,
        image,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error('리뷰 수정 중 오류 발생:', error);
    return NextResponse.json(
      { message: '리뷰 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 리뷰 존재 여부 확인
    const existingReview = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!existingReview) {
      return NextResponse.json(
        { message: '해당 리뷰를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 리뷰 삭제
    await prisma.review.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: '리뷰가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('리뷰 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { message: '리뷰 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
