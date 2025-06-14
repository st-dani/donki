'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { useCallback } from 'react';

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
};

type GallerySectionProps = {
  initialGalleryItems: GalleryItem[];
};

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

// 이미지 로드 실패 시 대체 표시 기능을 제공하는 컴포넌트
const ImageWithFallback = ({ src, alt, ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(src as string);
  const [tried, setTried] = useState<boolean>(false);
  
  // 이미지 로드 실패 처리
  const handleError = useCallback(() => {
    if (!tried) {
      console.error(`이미지 로드 실패: ${imgSrc}`);
      
      // 파일명에서 UUID 접두사가 없는 경우, 갤러리 폴더에서 이미지 찾기 시도
      const pathParts = (imgSrc as string).split('/');
      const fileName = pathParts[pathParts.length - 1];
      
      // 파일명에 UUID가 없는 경우 (예: food-1.jpg), UUID가 붙은 이미지 시도
      if (!fileName.includes('-')) {
        // 예를 들어 /images/gallery/food-1.jpg -> /images/gallery/*_food-1.jpg 형태로 시도
        // 실제로 Next.js 이미지는 와일드카드를 지원하지 않으므로, 여기서는 오류 표시로 대체
        setTried(true);
        setError(true);
      } else {
        // 이미 실패했으므로 오류 표시
        setError(true);
      }
    }
  }, [imgSrc, tried]);
  
  // 이미지 로드 실패 시 대체 UI 표시
  if (error) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <div className="text-3xl mb-2">🖼️</div>
          <p className="text-sm text-gray-500">이미지를 불러올 수 없습니다</p>
        </div>
      </div>
    );
  }
  
  // 이미지 정상 로드 시도
  return (
    <Image 
      {...props} 
      src={imgSrc} 
      alt={alt} 
      onError={handleError} 
    />
  );
};

export default function GallerySection({ initialGalleryItems }: GallerySectionProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(initialGalleryItems);
  
  // 컴포넌트 로드 시 콘솔에 디버그 정보 출력
  useEffect(() => {
    console.log('갤러리 섹션 컴포넌트 로드 - 갤러리 아이템 수:', items.length);
    
    // 이미지 경로 처리 확인
    items.forEach(item => {
      const imagePath = item.image.startsWith('/') ? item.image : `/${item.image}`;
      console.log('갤러리 아이템:', item.id, item.title, `이미지 경로: ${imagePath}`);
    });
    
    // 초기 값을 상태에 설정
    setItems(initialGalleryItems);
  }, [initialGalleryItems]);
  
  return (
    <>
        
        {initialGalleryItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            등록된 갤러리 항목이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {initialGalleryItems.map((item) => (
              <div 
                key={item.id} 
                className="relative aspect-square overflow-hidden rounded-lg group"
                onMouseEnter={() => setActiveItem(item.id)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <ImageWithFallback
                  src={item.image.startsWith('/') ? item.image : `/${item.image}`}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {activeItem === item.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 transition-opacity duration-300">
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-white text-sm">{item.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
    </>
  );
}
