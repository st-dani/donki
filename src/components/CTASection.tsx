'use client';

import { useState } from 'react';
import EstimateForm from '@/components/estimate/EstimateForm';

interface CTASectionProps {
  className?: string;
}

export default function CTASection({ className }: CTASectionProps) {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  const openEstimate = () => setIsEstimateOpen(true);
  const closeEstimate = () => setIsEstimateOpen(false);

  return (
    <>
      <section className={`py-12 md:py-16 bg-orange-50 ${className || ''}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 상담문의하세요
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            행사의 성격과 규모에 맞는 최적의 서비스를 제안해드립니다.
            특별한 순간을 더욱 특별하게 만들어드리는 돈키호테 푸드트럭과 함께하세요.
          </p>
          <button
            onClick={openEstimate}
            className="bg-orange-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-xl hover:transform hover:-translate-y-1"
          >
            상담 문의하기
          </button>
        </div>
      </section>

      {isEstimateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-start justify-center overflow-y-auto pt-20 pb-20">
          <div className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">상담 문의하기</h2>
              <button onClick={closeEstimate} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <EstimateForm />
          </div>
        </div>
      )}
    </>
  );
} 