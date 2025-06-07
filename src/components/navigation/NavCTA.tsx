'use client';

import { useState, useEffect } from 'react';
import EstimateForm from '@/components/estimate/EstimateForm';

export default function NavCTA() {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  const openEstimate = () => {
    setIsEstimateOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeEstimate = () => {
    setIsEstimateOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <button
        onClick={openEstimate}
        className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-theme-white rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        빠른상담
      </button>

      {isEstimateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-start justify-center overflow-y-auto pt-20 pb-20">
          <div className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">견적 문의하기</h2>
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