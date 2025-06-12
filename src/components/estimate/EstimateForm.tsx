'use client';

import { useState } from 'react';
import { EstimateFormData, eventTypes } from '@/types/estimate';

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

export default function EstimateForm() {
  const [formData, setFormData] = useState<EstimateFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
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

      alert('상담문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      setFormData(initialFormData);
    } catch (error) {
      console.error('상담문의 전송 중 오류:', error);
      alert('상담문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
          className="bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-dark transition-colors"
        >
          상담 문의하기
        </button>
      </div>
    </form>
  );
} 