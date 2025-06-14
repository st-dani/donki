'use client';

import GallerySection from '../services/GallerySection';
import { ServiceGallery } from '@/generated/prisma';

type SerializedGallery = Omit<ServiceGallery, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

interface HomeGallerySectionProps {
  galleryData: any[];  // 타입 호환성을 위해 any 사용
}

export default function HomeGallerySection({ galleryData }: HomeGallerySectionProps) {
  if (!galleryData || galleryData.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-500">
          준비 중입니다
        </div>
      </section>
    );
  }
  
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          돈키호테 푸드트럭 갤러리
        </h2>
        <GallerySection initialGalleryItems={galleryData} />
      </div>
    </div>
  );
}
