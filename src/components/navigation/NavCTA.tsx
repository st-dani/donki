'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import EstimateForm from '@/components/estimate/EstimateForm';

export default function NavCTA() {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const portalRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ensure this runs only on the client
    portalRootRef.current = document.getElementById('modal-portal-root');
    if (!portalRootRef.current) {
      const portalDiv = document.createElement('div');
      portalDiv.id = 'modal-portal-root';
      document.body.appendChild(portalDiv);
      portalRootRef.current = portalDiv;
    }
  }, []);

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
      // Optional: remove portalRoot if no other modals use it
      // if (portalRootRef.current && portalRootRef.current.childElementCount === 0) {
      //   portalRootRef.current.remove();
      // }
    };
  }, []);

  const ModalContent = (
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
  );

  return (
    <>
      <button
        onClick={openEstimate}
        className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-theme-white rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        빠른상담
      </button>

      {isEstimateOpen && portalRootRef.current && createPortal(ModalContent, portalRootRef.current)}
    </>
  );
}