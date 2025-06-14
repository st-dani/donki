import { useState } from 'react';

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationForm({ isOpen, onClose }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    message: '',
    agreement: false
  });

  const [errors, setErrors] = useState({
    phone: '',
    email: ''
  });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phone) return '전화번호를 입력해주세요.';
    if (!phoneRegex.test(phone)) return '올바른 전화번호 형식이 아닙니다.';
    return '';
  };

  const validateEmail = (email: string) => {
    if (!email) return ''; // 이메일은 선택사항
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.';
    return '';
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
      setErrors(prev => ({ ...prev, phone: validatePhone(formattedPhone) }));
    } else if (name === 'email') {
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 최종 유효성 검사
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);
    
    if (phoneError || emailError) {
      setErrors({ phone: phoneError, email: emailError });
      return;
    }

    // TODO: 실제 API 연동
    console.log('Form submitted:', formData);
    onClose();
    alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden">
        {/* 헤더 */}
        <div className="bg-orange-500 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">무료 상담 신청</h3>
          <button onClick={onClose} className="text-white hover:text-orange-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
            <input
              type="tel"
              name="phone"
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
              }`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              name="email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
              }`}
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">창업 예정 업종 *</label>
            <select
              name="businessType"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={formData.businessType}
              onChange={handleChange}
            >
              <option value="">선택해주세요</option>
              <option value="한식">한식</option>
              <option value="양식">양식</option>
              <option value="일식">일식</option>
              <option value="중식">중식</option>
              <option value="디저트">디저트</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">문의사항</label>
            <textarea
              name="message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
              value={formData.message}
              onChange={handleChange}
              placeholder="문의하실 내용을 자유롭게 작성해주세요."
            ></textarea>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreement"
              required
              className="mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded transition-colors"
              checked={formData.agreement}
              onChange={handleChange}
            />
            <label className="ml-2 text-sm text-gray-600">
              개인정보 수집 및 이용에 동의합니다. *
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            상담 신청하기
          </button>
        </form>
      </div>
    </div>
  );
} 