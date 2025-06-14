import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: 갤러리 항목 목록 조회
export async function GET() {
  try {
    // 최신 등록순으로 6개만 조회
    const galleries = await prisma.serviceGallery.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      take: 6 // 6개만 가져옵니다
    });

    return NextResponse.json(galleries);
  } catch (error) {
    console.error('갤러리 항목 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '갤러리 항목을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
