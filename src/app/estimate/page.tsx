'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { submitEstimate } from '../actions/estimate';
import { useState } from 'react';
import type { EstimateFormData } from '../actions/estimate';

export default function Estimate() {
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const data: EstimateFormData = {
      company: formData.get('company') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      budget: formData.get('budget') as string,
      date: formData.get('date') as string,
      message: formData.get('message') as string,
      privacy: formData.get('privacy') === 'on'
    };

    const result = await submitEstimate(data);
    
    setFormStatus({
      type: result.success ? 'success' : 'error',
      message: result.message
    });

    if (result.success) {
      event.currentTarget.reset();
    }
  };

  return (
    <div className="pt-32">
      {/* 견적 문의 소개 */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-8">견적 문의</h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              프로젝트에 맞는 최적의 서비스를 제안해드립니다.<br />
              아래 양식을 작성해주시면 빠른 시일 내에 연락드리겠습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 견적 문의 폼 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {formStatus.type && (
              <div
                className={`mb-8 p-4 rounded-lg ${
                  formStatus.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 기본 정보 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-6">기본 정보</h3>
                <div>
                  <label htmlFor="company" className="block text-gray-700 mb-2">
                    회사명 *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    담당자명 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* 서비스 정보 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-6">서비스 정보</h3>
                <div>
                  <label htmlFor="service" className="block text-gray-700 mb-2">
                    관심 서비스 *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">선택해주세요</option>
                    <option value="corporate">기업행사</option>
                    <option value="catering">각종케이터링</option>
                    <option value="religious">종교행사</option>
                    <option value="celebrity">연예인서포트</option>
                    <option value="university">대학축제</option>
                    <option value="military">군부대</option>
                    <option value="filming">촬영장</option>
                    <option value="sports">체육대회</option>
                    <option value="snack">간식차</option>
                    <option value="coffee">커피차</option>
                    <option value="public">공공기관</option>
                    <option value="school">학교</option>
                    <option value="kindergarten">유치원</option>
                    <option value="festival">행사축제</option>
                    <option value="event">이벤트</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-gray-700 mb-2">
                    예상 비용
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">선택해주세요</option>
                    <option value="1">50~100만원</option>
                    <option value="2">100~200만원</option>
                    <option value="3">200~300만원</option>
                    <option value="4">300~500만원</option>
                    <option value="5">500~1000만원</option>
                    <option value="6">1000만원 이상</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-2">
                    희망 진행 시기
                  </label>
                  <input
                    type="month"
                    id="date"
                    name="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    문의 내용 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="프로젝트에 대해 자세히 알려주세요."
                  ></textarea>
                </div>
              </div>

              {/* 개인정보 동의 */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="privacy" className="text-gray-700">
                    개인정보 수집 및 이용에 동의합니다. *
                  </label>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
                >
                  견적 문의하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 