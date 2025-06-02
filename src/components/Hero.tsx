'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative min-h-screen bg-white text-black overflow-hidden">
      <div className="container mx-auto px-4 py-6 relative">
        <div className="flex items-center min-h-[calc(100vh-80px)]">
          {/* 왼쪽: 텍스트 영역 */}
          <div className="w-full lg:w-1/2 pr-8 z-10">
            <p className="text-gray-600 mb-6 text-lg font-medium tracking-wider">
              맛있는 경험을 전하는 푸드트럭
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              특별한 순간을<br />
              더 특별하게 만드는<br />
              미식 서비스
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              돈키호테 푸드트럭은 행사와 모임의 품격을 높이는 프리미엄 케이터링 서비스를 제공합니다. 
              신선한 재료와 정성스러운 요리로 잊지 못할 맛의 경험을 선사합니다.
            </p>
            <Link 
              href="/service"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black transition-all duration-200 bg-transparent border-2 border-black rounded-full hover:text-theme-yellow hover:border-theme-yellow hover:bg-black focus:outline-none transform hover:-translate-y-1 active:translate-y-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none active:shadow-none"
            >
              서비스 알아보기
            </Link>
          </div>

          {/* 오른쪽: 비디오 영역 */}
          <div className="hidden lg:block w-1/2">
            <div className="relative w-full pt-[56.25%] group">
              {/* 테두리 효과 */}
              <div className="absolute inset-0.5 rounded-3xl bg-gradient-to-r from-theme-yellow to-theme-yellow/20 p-0.5">
                <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gray-100">
                  {/* 비디오 */}
                  <video 
                    className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-[1.02] transition-transform duration-700"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src="/videos/vod1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* 반짝이는 코너 효과 */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-theme-yellow/40 to-transparent rounded-tl-3xl blur-md group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-theme-yellow/40 to-transparent rounded-bl-3xl blur-md group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-theme-yellow/40 to-transparent rounded-tr-3xl blur-md group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-theme-yellow/40 to-transparent rounded-br-3xl blur-md group-hover:opacity-75 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 