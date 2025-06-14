'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FormData {
  name: string;
  company: string;
  role: string;
  position: string;
  phone: string;
  email: string;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
}

export default function ServiceForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    role: '',
    position: '',
    phone: '',
    email: '',
    privacyAgreed: false,
    marketingAgreed: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add form submission logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Form Header with Image */}
          <div className="relative h-[300px] w-full bg-orange-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  서비스 소개서 받기
                </h1>
                <p className="text-lg text-gray-600">
                  MOBILITY INTERACTION MARKETING SOLUTION
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  성명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="홍길동"
                />
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  기업명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="(주)돈키호테"
                />
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  팀 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="경영전략팀"
                />
              </div>

              {/* Position Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  직함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="팀장"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  핸드폰번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="01012341234 (하이픈 제외)"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="example@foodtravel.kr"
                />
              </div>
            </div>

            {/* Agreement Section */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="privacyAgreed"
                  id="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="privacyAgreed" className="text-sm text-gray-700">
                  개인정보 수집 동의(필수) <button type="button" className="text-orange-500 underline">전문보기</button>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="marketingAgreed"
                  id="marketingAgreed"
                  checked={formData.marketingAgreed}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="marketingAgreed" className="text-sm text-gray-700">
                  광고메시지 수신 동의(선택) <button type="button" className="text-orange-500 underline">전문보기</button>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                빠른상담
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 