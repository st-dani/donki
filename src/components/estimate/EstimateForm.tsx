'use client';

import { useState, useRef } from 'react';
import { EstimateFormData, eventTypes } from '@/types/estimate';
import { motion, AnimatePresence } from 'framer-motion';

const initialFormData: EstimateFormData = {
  name: '',
  phone: '',
  email: '',
  service: '',
  date: '',
  location: '',
  attendees: '',
  details: ''
};

// 완료 모달 컴포넌트
function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white rounded-xl p-8 shadow-xl max-w-md w-full z-50 m-4"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">문의가 정상적으로 접수되었습니다</h3>
              <p className="text-gray-600 mb-6">최대한 빠르게 연락 드리겠습니다.</p>
              <button
                onClick={onClose}
                className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                확인
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// 로딩 애니메이션 컴포넌트
function LoadingSpinner() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary delay-75"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary delay-150"></div>
      <span className="font-medium text-gray-600 ml-2">전송중...</span>
    </div>
  );
}

export default function EstimateForm() {
  const [formData, setFormData] = useState<EstimateFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 실제 폼 제출 요청 전에 1초 대기 - 로딩 상태를 잘 보이게 하기 위함 (선택 사항)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('상담문의 전송에 실패했습니다.');
      }

      // 성공 모달 표시
      setIsModalOpen(true);
      setFormData(initialFormData);
      if (formRef.current) formRef.current.reset();
    } catch (error) {
      console.error('상담문의 전송 중 오류:', error);
      alert('상담문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">기본 정보</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                이름 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="홍길동"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                연락처 *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="010-0000-0000"
                autoComplete="tel"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="example@email.com"
                autoComplete="email"
              />
            </div>
          </div>
        </div>

        {/* 행사 정보 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">행사 정보</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                행사 종류 *
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">행사 종류를 선택해주세요</option>
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                행사 날짜 *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="attendees" className="block text-gray-700 font-medium mb-2">
                예상 인원 *
              </label>
              <input
                type="number"
                id="attendees"
                name="attendees"
                required
                value={formData.attendees}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="100"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                행사 장소 *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="서울시 강남구"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="details" className="block text-gray-700 font-medium mb-2">
                추가 요청사항
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="메뉴 선호도, 특별한 요청사항 등을 자유롭게 작성해주세요."
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-orange-500 text-white px-8 py-4 rounded-full font-medium hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-xl hover:transform hover:-translate-y-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? <LoadingSpinner /> : '상담 문의하기'}
          </button>
        </div>
      </form>
    </>
  );
}