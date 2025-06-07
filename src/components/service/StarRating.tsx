import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function StarRating({ rating, onRatingChange }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none"
        >
          {star <= rating ? (
            <StarIconSolid className="w-6 h-6 text-yellow-400" />
          ) : (
            <StarIconOutline className="w-6 h-6 text-gray-300" />
          )}
        </button>
      ))}
    </div>
  );
} 