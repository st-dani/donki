import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET 요청 처리 (리뷰 목록 조회)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: '리뷰를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// POST 요청 처리 (새 리뷰 작성)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, business, rating, content, image } = body;

    // 필수 필드 검증
    if (!name || !business || !rating || !content) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 리뷰 생성
    const review = await prisma.review.create({
      data: {
        name,
        business,
        rating: Number(rating),
        content,
        image: image || null
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error); // 상세 에러 로깅 추가
    return NextResponse.json(
      { error: '리뷰 작성에 실패했습니다.', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 