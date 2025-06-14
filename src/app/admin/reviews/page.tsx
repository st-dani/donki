import AdminReviewList from '@/components/admin/AdminReviewList';
import { getAuthenticatedAdmin } from '@/lib/auth';

async function getReviews() {
  // 서버 컴포넌트에서 API 요청 수행
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/admin/reviews`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('리뷰 데이터를 가져오지 못했습니다.');
  }
  
  return response.json();
}

export default async function AdminReviewsPage() {
  // 관리자 인증 확인
  await getAuthenticatedAdmin();
  
  const reviews = await getReviews();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">리뷰 관리</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">리뷰 목록</h2>
        <p className="text-gray-600 mb-2">
          고객들이 남긴 리뷰를 관리합니다. 부적절한 내용이나 정보 수정이 필요한 경우 수정하거나 삭제할 수 있습니다.
        </p>
      </div>
      
      <AdminReviewList reviews={reviews} />
    </div>
  );
}