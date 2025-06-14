import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EstimateStatus } from '@/generated/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. 견적 관련 통계
    const totalEstimatesCount = await prisma.estimate.count();
    const pendingEstimatesCount = await prisma.estimate.count({
      where: { status: EstimateStatus.PENDING },
    });
    const recentEstimates = await prisma.estimate.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        service: true,
        status: true,
        createdAt: true,
      },
    });

    // 2. 메뉴 관련 통계
    const totalMenusCount = await prisma.menu.count();
    const menuCountByCategory = await prisma.$queryRaw`
      SELECT "category", COUNT(*) as "count"
      FROM "Menu"
      GROUP BY "category"
      ORDER BY "count" DESC
    `;

    // 3. 리뷰 관련 통계
    const totalReviewsCount = await prisma.review.count();
    const averageRating = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    });
    const recentReviews = await prisma.review.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        rating: true,
        content: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      estimates: {
        total: totalEstimatesCount,
        pending: pendingEstimatesCount,
        recent: recentEstimates,
      },
      menus: {
        total: totalMenusCount,
        byCategory: menuCountByCategory,
      },
      reviews: {
        total: totalReviewsCount,
        averageRating: averageRating._avg.rating || 0,
        recent: recentReviews,
      },
    });
  } catch (error) {
    console.error('대시보드 데이터 조회 중 오류 발생:', error);
    return NextResponse.json(
      { message: '대시보드 데이터를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
