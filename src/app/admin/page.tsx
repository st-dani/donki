import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { EstimateStatus } from '@/generated/prisma';
import AdminDashboard, { DashboardData } from './dashboard/AdminDashboard';

// 정적 생성 비활성화 - 빌드 시 데이터베이스 접근 방지
export const dynamic = 'force-dynamic';

// 대시보드 페이지
export default async function AdminPage() {
  // 대시보드 데이터 수집
  const dashboardData = await collectDashboardData();
  
  return (
    <div className="container mx-auto py-6">
      <Suspense fallback={<div className="text-center py-10">대시보드 데이터를 불러오는 중...</div>}>
        <AdminDashboard data={dashboardData} />
      </Suspense>
    </div>
  );
}

// 대시보드 통계 데이터 수집
async function collectDashboardData(): Promise<DashboardData> {
  // 1. 견적 관련 통계
  const totalEstimatesCount = await prisma.estimate.count();
  const pendingEstimatesCount = await prisma.estimate.count({
    where: { status: EstimateStatus.PENDING },
  });
  const recentEstimates = await prisma.estimate.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      phone: true,
      service: true,
      status: true,
      createdAt: true,
      attendees: true,
      location: true,
    },
  });

  // 2. 메뉴 관련 통계
  const totalMenusCount = await prisma.menu.count();
  // 주요 메뉴 카운트 - 인기 메뉴로 검색
  const popularMenuCount = await prisma.menu.count({
    where: {
      OR: [
        { name: { contains: '인기' } },
        { description: { contains: '인기' } },
      ]
    },
  });

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
  
  // 4. 사용자 통계 - 샘플 데이터 사용
  const totalUsersCount = 145; // 샘플 데이터
  
  // 5. 주문 통계 - 샘플 데이터
  const ordersCount = 24; // 샘플 데이터

  // 수집한 대시보드 데이터 반환
  return {
    totalEstimatesCount,
    pendingEstimatesCount,
    recentEstimates,
    totalMenusCount,
    popularMenuCount,
    totalReviewsCount,
    averageRating,
    recentReviews,
    totalUsersCount,
    ordersCount
  };
}
