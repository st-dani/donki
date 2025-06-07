'use client';

import { useState } from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewForm({ isOpen, onClose }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    rating: 5,
    content: '',
    image: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: '',
    business: '',
    content: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      business: '',
      content: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = '이름 또는 닉네임을 입력해주세요';
    }
    if (!formData.business.trim()) {
      newErrors.business = '업체명/직함을 입력해주세요';
    }
    if (!formData.content.trim()) {
      newErrors.content = '후기 내용을 입력해주세요';
    } else if (formData.content.length < 10) {
      newErrors.content = '후기는 최소 10자 이상 작성해주세요';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          business: formData.business,
          rating: formData.rating,
          content: formData.content,
          image: imagePreview || null,
        }),
      });

      if (!response.ok) {
        throw new Error('리뷰 저장에 실패했습니다.');
      }

      // 폼 초기화
      setFormData({
        name: '',
        business: '',
        rating: 5,
        content: '',
        image: null,
      });
      setImagePreview('');
      onClose();
      
      // 페이지 새로고침하여 최신 리뷰 표시
      window.location.reload();
    } catch (error) {
      console.error('리뷰 저장 중 오류:', error);
      alert('리뷰 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            고객 후기 작성
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="이름 또는 닉네임을 입력해주세요"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                업체명/직함 *
              </label>
              <input
                type="text"
                value={formData.business}
                onChange={(e) => setFormData(prev => ({ ...prev, business: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="업체명 또는 직함을 입력해주세요"
              />
              {errors.business && <p className="text-red-500 text-sm mt-1">{errors.business}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                평점
              </label>
              <StarRating
                rating={formData.rating}
                onRatingChange={(newRating: number) => setFormData(prev => ({ ...prev, rating: newRating }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                후기 내용 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px]"
                placeholder="서비스 이용 후기를 작성해주세요 (최소 10자 이상)"
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이미지 첨부
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? '저장 중...' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 