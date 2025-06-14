import Image from 'next/image';
import { useState, useEffect } from 'react';

// 블로그 배너 이미지 배열
const bannerImages = [
  '/images/blog/blog-hero.png',
  '/images/blog/blog-hero2.png',
];

export default function BlogHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 이미지 자동 전환 효과
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000); // 5초마다 이미지 전환

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-0 pb-6 overflow-hidden h-[300px]">
      {/* 이미지 슬라이더 */}
      {bannerImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`블로그 배너 이미지 ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-white opacity-60"></div>
        </div>
      ))}

      {/* 배너 내용 */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
          돈키호테 푸드트럭 이야기
        </h1>
        <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto">
          맛있는 경험을 전하는 푸드트럭, 돈키호테의 다양한 이야기를 소개합니다.
        </p>
        
        {/* 인디케이터 (선택 사항) */}
        <div className="flex justify-center mt-4 gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'}`}
              aria-label={`배너 이미지 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}