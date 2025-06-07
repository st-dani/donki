'use client';

import { useState } from 'react';
import { ContactFormData } from '@/types/contact';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('문의 전송에 실패했습니다.');
      }

      alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      setFormData(initialFormData);
    } catch (error) {
      console.error('문의 전송 중 오류:', error);
      alert('문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          이메일 *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="example@email.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
          제목 *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="문의 제목을 입력해주세요"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
          문의내용 *
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="문의하실 내용을 자세히 적어주세요"
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
        >
          문의하기
        </button>
      </div>
    </form>
  );
} 