'use client';

import { useEffect, useState } from 'react';

export default function Stats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="w-full bg-white py-16 mb-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          수많은 고객님들께서<br />
          돈키호테와 여정을 함께하고계십니다.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 첫 번째 통계 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-theme-yellow text-6xl font-bold">20</span>
              <span className="text-theme-yellow text-3xl font-bold">만+</span>
              <span className="text-gray-400 ml-2">↗</span>
            </div>
            <p className="text-gray-600 mt-4 text-lg">
              누적 고객 수
            </p>
            <div className="mt-6 border-t border-gray-100 pt-4 w-full">
              <p className="text-sm text-gray-400">더 많은 정보 보기</p>
            </div>
          </div>

          {/* 두 번째 통계 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-theme-yellow text-6xl font-bold">98</span>
              <span className="text-theme-yellow text-3xl font-bold">%</span>
              <span className="text-gray-400 ml-2">↗</span>
            </div>
            <p className="text-gray-600 mt-4 text-lg">
              고객 만족도
            </p>
            <div className="mt-6 border-t border-gray-100 pt-4 w-full">
              <p className="text-sm text-gray-400">더 많은 정보 보기</p>
            </div>
          </div>

          {/* 세 번째 통계 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-theme-yellow text-6xl font-bold">500</span>
              <span className="text-theme-yellow text-3xl font-bold">+</span>
              <span className="text-gray-400 ml-2">↗</span>
            </div>
            <p className="text-gray-600 mt-4 text-lg">
              행사 진행 횟수
            </p>
            <div className="mt-6 border-t border-gray-100 pt-4 w-full">
              <p className="text-sm text-gray-400">더 많은 정보 보기</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 