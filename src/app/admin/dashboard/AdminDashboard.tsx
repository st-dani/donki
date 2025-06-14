'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { EstimateStatus } from '@/generated/prisma';
import {
  IconListDetails, IconUsers, IconShoppingCart, IconStar,
  IconMenu2, IconTrendingUp, IconBuildingStore, IconCalendarEvent
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';

// Chart 컴포넌트들을 동적으로 불러옵니다
const SalesChart = dynamic(() => import('@/components/admin/charts/SalesChart'), { ssr: false });
const VisitorChart = dynamic(() => import('@/components/admin/charts/VisitorChart'), { ssr: false });
const ServiceChart = dynamic(() => import('@/components/admin/charts/ServiceChart'), { ssr: false });

import StatCard from '@/components/admin/dashboard/StatCard';
import RecentActivity from '@/components/admin/dashboard/RecentActivity';

// 대시보드에 표시할 데이터 타입
export interface DashboardData {
  totalEstimatesCount: number;
  pendingEstimatesCount: number;
  recentEstimates: any[];
  totalMenusCount: number;
  popularMenuCount: number;
  totalReviewsCount: number;
  averageRating: any;
  recentReviews: any[];
  totalUsersCount: number;
  ordersCount: number;
}

interface AdminDashboardProps {
  data: DashboardData;
}

export default function AdminDashboard({ data }: AdminDashboardProps) {
  const {
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
  } = data;

  // 상태별 한글 표시
  const statusToKorean: { [key in EstimateStatus]: string } = {
    PENDING: '문의대기',
    CONFIRMED: '확인',
    REPLIED: '답변완료',
    IN_PROGRESS: '행사진행중',
    COMPLETED: '행사완료',
  };

  // 최근 활동 목록 생성
  const activities = [
    ...recentEstimates.map(estimate => ({
      id: estimate.id,
      type: 'estimate' as const,
      title: `${estimate.name} 님의 견적 요청`,
      description: `${estimate.service} - ${estimate.location} (${estimate.attendees}명)`,
      timestamp: new Date(estimate.createdAt),
      status: statusToKorean[estimate.status],
      statusColor: estimate.status === 'PENDING' ? 'yellow' : 
                 estimate.status === 'CONFIRMED' ? 'green' : 
                 estimate.status === 'REPLIED' ? 'blue' : 
                 estimate.status === 'IN_PROGRESS' ? 'purple' : 'gray'
    })),
    ...recentReviews.map(review => ({
      id: review.id,
      type: 'review' as const,
      title: `${review.name} 님의 리뷰`,
      description: review.content && review.content.length > 50 ? 
                 `${review.content.slice(0, 50)}...` : (review.content || ''),
      timestamp: new Date(review.createdAt),
      status: `평점 ${review.rating}/5`,
      statusColor: review.rating >= 4 ? 'green' : review.rating >= 3 ? 'blue' : 'red'
    }))
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">대시보드</h1>
        <p className="text-gray-500 mt-1">돈키호테 푸드트럭 통합 관리 시스템</p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard 
          title="총 상담 요청" 
          value={totalEstimatesCount} 
          icon={<IconListDetails size={24} />} 
          color="blue"
          percentage={8.5}
          trend="up"
        />
        <StatCard 
          title="대기 중 상담" 
          value={pendingEstimatesCount} 
          icon={<IconCalendarEvent size={24} />} 
          color="yellow"
        />
        <StatCard 
          title="등록된 메뉴" 
          value={totalMenusCount} 
          icon={<IconMenu2 size={24} />} 
          color="green"
        />
        <StatCard 
          title="평균 평점" 
          value={`${averageRating._avg.rating?.toFixed(1) || 0} / 5.0`} 
          icon={<IconStar size={24} />} 
          color="purple"
        />
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesChart title="월별 매출 추이" />
        </div>
        <div>
          <ServiceChart title="서비스 점유율" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <VisitorChart title="일일 방문자 통계" />
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">메뉴 인기도</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 w-24">스테이크</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 w-24">파스타</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm text-gray-600">70%</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 w-24">샐러드</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-sm text-gray-600">65%</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 w-24">샌드위치</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm text-gray-600">60%</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 w-24">수프</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-sm text-gray-600">45%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={activities} title="최근 활동" />

        {/* 빠른 액션 */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">빠른 액션</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/menus/add" className="flex flex-col items-center justify-center p-5 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg">
                <IconMenu2 size={32} className="text-blue-500 mb-3" />
                <span className="text-sm font-medium text-blue-700">새 메뉴 등록</span>
              </Link>
              <Link href="/admin/estimates?status=PENDING" className="flex flex-col items-center justify-center p-5 bg-yellow-50 hover:bg-yellow-100 transition-colors rounded-lg">
                <IconListDetails size={32} className="text-yellow-500 mb-3" />
                <span className="text-sm font-medium text-yellow-700">대기중 견적</span>
              </Link>
              <Link href="/admin/reviews" className="flex flex-col items-center justify-center p-5 bg-green-50 hover:bg-green-100 transition-colors rounded-lg">
                <IconStar size={32} className="text-green-500 mb-3" />
                <span className="text-sm font-medium text-green-700">리뷰 관리</span>
              </Link>
              <Link href="/admin/analytics" className="flex flex-col items-center justify-center p-5 bg-purple-50 hover:bg-purple-100 transition-colors rounded-lg">
                <IconTrendingUp size={32} className="text-purple-500 mb-3" />
                <span className="text-sm font-medium text-purple-700">상세 통계</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
