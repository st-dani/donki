'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

interface Review {
  id: string;
  name: string;
  business: string;
  rating: number;
  content: string;
  image: string | null;
  createdAt: Date;
}

interface AdminReviewListProps {
  reviews: Review[];
}

export default function AdminReviewList({ reviews: initialReviews }: AdminReviewListProps) {
  const [reviews, setReviews] = useState(initialReviews);

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
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
            {reviews.map((review) => (
              <tr key={review.id} className="border-t">
                <td className="px-4 py-2">
                  {new Date(review.createdAt).toLocaleDateString()}
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
                      />
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 