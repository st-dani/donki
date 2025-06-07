import { prisma } from '@/lib/prisma';
import ServicePageClient from '@/components/service/ServicePageClient';
import { Review } from '../../generated/prisma';

// Define Review type for data passed to client - dates are serialized
interface ReviewForClient {
  id: string;
  name: string;
  business: string;
  rating: number;
  content: string;
  image: string | null; // Changed from image?: string | null
  createdAt: string; // Serialized Date
  updatedAt: string; // Serialized Date
}

async function getReviews(): Promise<ReviewForClient[]> {
  const reviewsFromDb = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  // Serialize Date objects to strings for client component props
  return reviewsFromDb.map((review: Review) => ({
    ...review,
    image: review.image ?? null, // Ensure image is string or null
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  }));
}

export default async function ServicePage() {
  const initialReviews = await getReviews();
  
  return <ServicePageClient initialReviewsData={initialReviews} />;
}