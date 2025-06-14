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


      <ReviewForm
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
      />
    </>
  );
} 