import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function EstimateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    eventDate: '',
    location: '',
    attendees: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        let successMessage = '견적문의가 성공적으로 접수되었습니다.';
        if (data.kakaoSent) {
          successMessage += '\n관리자에게 카카오톡 알림이 전송되었습니다.';
        }
        toast.success(successMessage);
        setFormData({
          name: '',
          phone: '',
          eventType: '',
          eventDate: '',
          location: '',
          attendees: '',
          details: ''
        });
      } else {
        toast.error('견적문의 접수 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('견적문의 전송 실패:', error);
      toast.error('견적문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">연락처</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">행사 유형</label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="">선택해주세요</option>
          <option value="기업행사">기업행사</option>
          <option value="학교행사">학교행사</option>
          <option value="지역행사">지역행사</option>
          <option value="결혼식">결혼식</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">행사 일자</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">행사 장소</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">예상 인원</label>
        <input
          type="number"
          id="attendees"
          name="attendees"
          value={formData.attendees}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">문의 내용</label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
      >
        {isSubmitting ? '처리중...' : '견적문의 보내기'}
      </button>
    </form>
  );
} 