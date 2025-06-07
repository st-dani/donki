'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <div className="relative w-full py-32 bg-gradient-to-r from-orange-100 to-orange-200 overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            돈키호테와 함께<br />특별한 순간을 만들어보세요
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/service"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              서비스 소개서 받기
            </Link>
            <Link 
              href="/estimate"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 transition-all duration-300 bg-transparent border-2 border-gray-900 rounded-full hover:text-orange-500 hover:border-orange-500"
            >
              1분 간단 무료 견적
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 