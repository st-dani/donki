import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('리뷰 목록 조회 중 오류 발생:', error);
    return NextResponse.json(
      { message: '리뷰 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, business, rating, content, image } = data;

    if (!name || !business || !rating || !content) {
      return NextResponse.json(
        { message: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        name,
        business,
        rating: parseInt(rating, 10),
        content,
        image,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('리뷰 생성 중 오류 발생:', error);
    return NextResponse.json(
      { message: '리뷰 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
