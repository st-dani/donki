'use client';

import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { format } from 'date-fns';

interface Review {
  id: string;
  name: string;
  business: string;
  rating: number;
  content: string;
  image: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

interface AdminReviewListProps {
  reviews: Review[];
}

export default function AdminReviewList({ reviews: initialReviews }: AdminReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    content: '',
    image: '',
  });
  
  useEffect(() => {
    // 편집 모드로 전환될 때 폼 데이터 초기화
    if (editingReview) {
      setFormData({
        rating: editingReview.rating,
        content: editingReview.content,
        image: editingReview.image || '',
      });
    }
  }, [editingReview]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Math.min(Math.max(parseInt(value) || 1, 1), 5) : value
    }));
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('리뷰 삭제에 실패했습니다.');
      }

      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('리뷰 삭제 중 오류 발생:', error);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/reviews/${editingReview.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('리뷰 수정에 실패했습니다.');
      }

      const updatedReview = await response.json();
      
      setReviews(reviews.map(review => 
        review.id === editingReview.id ? updatedReview : review
      ));
      
      setEditingReview(null);
    } catch (error) {
      console.error('리뷰 수정 중 오류 발생:', error);
      alert('리뷰 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {editingReview ? (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">리뷰 편집</h3>
            <button
              onClick={() => setEditingReview(null)}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">작성자: {editingReview.name}</label>
              <label className="block text-sm font-medium mb-2">업체/직함: {editingReview.business}</label>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">평점</label>
              <input 
                type="number" 
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-20 border rounded px-3 py-2"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">내용</label>
              <textarea 
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 h-24"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">이미지 URL</label>
              <input 
                type="text" 
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="이미지 URL 입력 (선택사항)"
                className="w-full border rounded px-3 py-2"
              />
              {formData.image && (
                <div className="mt-2 relative h-24 w-24">
                  <Image 
                    src={formData.image} 
                    alt="미리보기" 
                    fill
                    className="object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/100?text=이미지+오류';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="mr-2 px-4 py-2 border rounded hover:bg-gray-50"
                disabled={isSubmitting}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">작성일</th>
              <th className="px-4 py-2 text-left">이름</th>
              <th className="px-4 py-2 text-left">업체/직함</th>
              <th className="px-4 py-2 text-left">평점</th>
              <th className="px-4 py-2 text-left">내용</th>
              <th className="px-4 py-2 text-left">이미지</th>
              <th className="px-4 py-2 text-left">관리</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  등록된 리뷰가 없습니다.
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review.id} className="border-t">
                  <td className="px-4 py-2">
                    {format(new Date(review.createdAt), 'yyyy-MM-dd')}
                  </td>
                  <td className="px-4 py-2">{review.name}</td>
                  <td className="px-4 py-2">{review.business}</td>
                  <td className="px-4 py-2">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {review.content}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {review.image && (
                      <div className="relative w-12 h-12">
                        <Image
                          src={review.image}
                          alt={`${review.name}의 리뷰 이미지`}
                          fill
                          className="object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/100?text=이미지+오류';
                          }}
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingReview(review)}
                        className="text-blue-500 hover:text-blue-700"
                        title="수정"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-500 hover:text-red-700"
                        title="삭제"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}