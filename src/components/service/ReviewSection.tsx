'use client';

import { useState } from 'react';
import ReviewSlider from './ReviewSlider';
import ReviewForm from './ReviewForm';

interface Review {
  id: string;
  name: string;
  business: string;
  rating: number;
  content: string;
  image: string | null;
  createdAt: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const openReviewForm = () => setIsReviewFormOpen(true);

  return (
    <>
      <ReviewSlider reviews={reviews} />
      <div className="text-center mt-8 mb-16">
        <button
          onClick={openReviewForm}
          className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-base md:text-lg font-semibold"
        >
          후기 작성하기
        </button>
      </div>

      <ReviewForm
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
      />
    </>
  );
} 