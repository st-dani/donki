import { prisma } from '@/lib/prisma';
import ServicePageClient from '@/components/service/ServicePageClient';
import { Review, ServiceGallery } from '../../generated/prisma';

// 정적 생성 비활성화 - 빌드 시 데이터베이스 접근 방지
export const dynamic = 'force-dynamic';

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

// 갤러리 데이터를 위한 인터페이스 정의
interface GalleryItemForClient {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  createdAt: string;
  updatedAt: string;
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

// 갤러리 데이터를 가져오는 함수
async function getGalleryData(): Promise<GalleryItemForClient[]> {
  try {
    // Prisma를 통해 데이터베이스에서 직접 가져오기
    const galleries = await prisma.serviceGallery.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      take: 6
    });
    
    console.log('서비스 페이지 갤러리 데이터 가져오기 성공:', galleries.length);
    
    // Serialize Date objects to strings for client component props
    return galleries.map((gallery: ServiceGallery) => ({
      ...gallery,
      createdAt: gallery.createdAt.toISOString(),
      updatedAt: gallery.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('서비스 페이지 갤러리 데이터를 가져오는 중 오류 발생:', error);
    return [];
  }
}

export default async function ServicePage() {
  const initialReviews = await getReviews();
  const galleryData = await getGalleryData();
  
  console.log('서비스 페이지 갤러리 데이터 개수:', galleryData.length);
  
  return <ServicePageClient initialReviewsData={initialReviews} galleryData={galleryData} />;
}