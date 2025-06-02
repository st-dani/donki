'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// 행사 종류 데이터
const eventTypes = [
  { id: 'corporate', label: '기업 행사', description: '워크숍, 창립기념일, 체육대회 등' },
  { id: 'entertainment', label: '연예인 서포트', description: '촬영장, 콘서트장 케이터링' },
  { id: 'school', label: '학교 행사', description: '입학식, 졸업식, 축제 등' },
  { id: 'festival', label: '지역 축제', description: '지역 행사, 페스티벌 등' },
  { id: 'private', label: '개인 행사', description: '결혼식, 생일파티, 가족 모임 등' },
  { id: 'other', label: '기타', description: '그 외 모든 행사' }
];

export default function Estimate() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    date: '',
    location: '',
    attendees: '',
    details: ''
  });

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
        throw new Error('견적 문의 전송에 실패했습니다.');
      }

      alert('견적 문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      // 폼 초기화
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventType: '',
        date: '',
        location: '',
        attendees: '',
        details: ''
      });
    } catch (error) {
      console.error('견적 문의 전송 중 오류:', error);
      alert('견적 문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            견적 문의
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            돈키호테 푸드트럭과 함께 특별한 순간을 만들어보세요.<br />
            상세한 정보를 입력해 주시면 맞춤 견적을 제안해드립니다.
          </p>

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
                  <label htmlFor="eventType" className="block text-gray-700 font-medium mb-2">
                    행사 종류 *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
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
                    placeholder="서울시 강남구..."
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="메뉴 선호도, 특별한 요청사항 등을 자유롭게 작성해주세요."
                  />
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                견적 문의하기
              </motion.button>
              <p className="mt-4 text-gray-600">
                * 필수 입력 항목입니다
              </p>
            </div>
          </form>

          {/* 문의 방법 안내 */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">다른 문의 방법</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">전화:</span>{' '}
                <a href="tel:010-4680-5447" className="text-primary hover:text-primary-dark">
                  010-4680-5447
                </a>
              </p>
              <p>
                <span className="font-medium">카카오톡:</span>{' '}
                <a
                  href="http://pf.kakao.com/_xfSERG/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  @돈키호테
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 