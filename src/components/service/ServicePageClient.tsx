'use client';

'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ServiceHero from '@/components/service/ServiceHero';

const HeroSlider = dynamic(() => import('@/components/service/HeroSlider'), { 
  ssr: false,
  loading: () => <div className="relative h-[400px] md:h-[500px] w-full bg-gray-200 animate-pulse" />
});
const ServiceListAnimated = dynamic(() => import('@/components/service/ServiceListAnimated'), { ssr: false });
const ProcessListAnimated = dynamic(() => import('@/components/service/ProcessListAnimated'), { ssr: false });
import GalleryModal from '@/components/service/GalleryModal';

import ReviewCard from '@/components/service/ReviewCard'; // Assuming this is used by ReviewSlider or ReviewSection
import Link from 'next/link';
import ReviewForm from '@/components/service/ReviewForm';
import ReviewSlider from '@/components/service/ReviewSlider';
import ReviewSection from '@/components/service/ReviewSection'; // Keep this if it's used

// Define Review type based on schema and usage
interface Review {
  id: string;
  name: string;
  business: string;
  rating: number;
  content: string;
  image: string | null; // Changed from image?: string | null
  createdAt: string; 
  updatedAt?: string;
}

// 갤러리 데이터를 위한 인터페이스
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface ServicePageClientProps {
  initialReviewsData: Review[];
  galleryData: GalleryItem[];
}

const serviceCards = [
  {
    title: '기업 행사 케이터링',
    description: '기업 행사, 워크샵, 세미나 등 다양한 행사에 맞춤형 푸드트럭 서비스를 제공합니다.',
    icon: (
      <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: '축제 & 이벤트',
    description: '지역 축제, 마켓, 야외 행사 등 다양한 이벤트에서 특별한 먹거리를 선보입니다.',
    icon: (
      <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    )
  },
  {
    title: '프라이빗 파티',
    description: '결혼식, 생일파티, 홈파티 등 특별한 날을 더욱 특별하게 만들어드립니다.',
    icon: (
      <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    )
  }
];

const features = [
  {
    title: '풍부한 운영 경험',
    description: '10년 이상의 현장 경험으로 완성된 프리미엄 푸드트럭 서비스',
    icon: (
      <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: '맞춤형 메뉴 구성',
    description: '행사 성격과 고객 니즈에 맞는 특별한 메뉴 커스터마이징',
    icon: (
      <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  },
  {
    title: '위생 관리',
    description: '철저한 위생 관리와 신선한 재료 사용으로 안전한 서비스 제공',
    icon: (
      <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

// 기본 갤러리 이미지 (데이터베이스에 이미지가 없는 경우 fallback으로 사용)
const fallbackGalleryImages = [
  '/images/gallery/food-1.jpg',
  '/images/gallery/food-2.jpg',
  '/images/gallery/food-3.jpg',
  '/images/gallery/food-4.jpg',
  '/images/gallery/food-5.jpg',
  '/images/gallery/food-6.jpg',
];

const priceDetails = [
  '행사 맞춤형 메뉴 구성',
  '전문 쉐프의 현장 조리',
  '위생적인 식자재 관리',
  '행사장 셋업 및 철수',
  '행사 진행 스태프 지원',
  '쓰레기 처리 및 현장 정리',
];

export default function ServicePageClient({ initialReviewsData, galleryData }: ServicePageClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeGalleryItem, setActiveGalleryItem] = useState<string | null>(null);

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  
  const [reviews, setReviews] = useState<Review[]>(initialReviewsData);


  const openReviewForm = () => setIsReviewFormOpen(true);

  const handleNewReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(), 
      createdAt: new Date().toISOString(), 
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem('donkihote_reviews', JSON.stringify(updatedReviews));
  };

  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem('donkihote_reviews', JSON.stringify(updatedReviews));
  };

  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-[300px]">
        <HeroSlider />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              특별한 순간을 더욱 특별하게,<br />돈키호테 푸드트럭
            </h1>

          </div>
        </div>
      </section>



      {/* 핵심 서비스 섹션 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
            어떤 행사든 함께합니다
          </h2>
          <p className="text-gray-600 text-center mb-8 md:mb-12 text-sm md:text-base">
            10년 경력의 푸드트럭 전문가가 특별한 순간을 책임집니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {serviceCards.map((card) => (
              <div key={card.title} className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
                <div className="mb-4 flex justify-center">{card.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{card.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 특징 섹션 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
            왜 우리 서비스일까요?
          </h2>
          <p className="text-gray-600 text-center mb-8 md:mb-12 text-sm md:text-base">
            10년 이상의 노하우로 검증된 전문 서비스를 제공합니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center">
                  <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 border-orange-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 섹션 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
            우리의 푸드트럭 성공사례
          </h2>
          <p className="text-gray-600 text-center mb-8 md:mb-12 text-sm md:text-base">
            실제 고객들의 성공 스토리를 확인해보세요
          </p>
          
          {galleryData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              등록된 갤러리 항목이 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {galleryData.map((item) => (
                <div 
                  key={item.id} 
                  className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
                  onClick={() => setSelectedImage(item.image)}
                  onMouseEnter={() => setActiveGalleryItem(item.id)}
                  onMouseLeave={() => setActiveGalleryItem(null)}
                >
                  <Image
                    src={item.image.startsWith('/') ? item.image : `/${item.image}`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {activeGalleryItem === item.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 transition-opacity duration-300">
                      <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-white text-sm">{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {selectedImage && (
            <GalleryModal 
              isOpen={!!selectedImage}
              imageSrc={selectedImage}
              imageAlt="Gallery image"
              images={galleryData.map(item => item.image.startsWith('/') ? item.image : `/${item.image}`)}
              onClose={() => setSelectedImage(null)} 
            />
          )}
        </div>
      </section>
      
      {/* 서비스 이용 방법 섹션 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
            푸드트럭 서비스 이용 방법
          </h2>
          <p className="text-gray-600 text-center mb-8 md:mb-12 text-sm md:text-base">
            간편한 절차로 특별한 이벤트를 더욱 특별하게 만들어 드립니다
          </p>
          
          {/* 프로세스 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 첫 번째 단계 카드 */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-4 border-2 border-orange-500">
                  <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-500">상담 예약</h3>
                <p className="text-gray-600 text-center">웹사이트나 전화로 간편하게 상담을 신청하세요. 고객님의 이벤트 성격과 요구사항에 맞는 최적의 서비스를 제안해드립니다.</p>
              </div>
            </div>
            
            {/* 두 번째 단계 카드 */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-4 border-2 border-orange-500">
                  <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-500">맞춤 메뉴 제안</h3>
                <p className="text-gray-600 text-center">행사 성격, 예상 인원, 예산에 맞춰 최적의 메뉴를 제안해 드립니다. 시식 서비스도 가능하니 문의해주세요.</p>
              </div>
            </div>
            
            {/* 세 번째 단계 카드 */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-4 border-2 border-orange-500">
                  <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-500">현장 서비스 제공</h3>
                <p className="text-gray-600 text-center">행사 당일, 전문 셰프와 스태프가 약속된 시간에 방문하여 신선하고 맛있는 음식을 제공합니다. 설치부터 철수까지 모두 책임집니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 리뷰 섹션 */}
      <ReviewSection reviews={reviews} />



      {isReviewFormOpen && (
        <ReviewForm 
          isOpen={isReviewFormOpen}
          onClose={() => setIsReviewFormOpen(false)}
        />
      )}
    </main>
  );
}
