import { PrismaClient } from '@prisma/client';
import AdminReviewList from '@/components/admin/AdminReviewList';

const prisma = new PrismaClient();

async function getReviews() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return reviews;
}

export default async function AdminReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">리뷰 관리</h1>
      <AdminReviewList reviews={reviews} />
    </div>
  );
} 