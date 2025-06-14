import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import GalleryClient from './GalleryClient';

export default async function GalleryPage() {
  // DB에서 갤러리 항목 가져오기
  const galleryItems = await prisma.serviceGallery.findMany({
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ]
  });

  // 날짜 직렬화 (JSON 직렬화 가능하도록)
  const serializedGallery = galleryItems.map(item => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-semibold mb-6">서비스 갤러리 관리</h1>
      <Suspense fallback={<div className="text-center py-10">갤러리 항목을 불러오는 중...</div>}>
        <GalleryClient initialGallery={serializedGallery} />
      </Suspense>
    </div>
  );
}
