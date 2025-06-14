import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';

interface ReviewCardProps {
  name: string;
  business: string;
  rating: number;
  content: string;
  image?: string | null;
}

export default function ReviewCard({ name, business, rating, content, image }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full transition-transform hover:scale-[1.02] mx-2">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-gray-600 text-sm mt-1">{business}</p>
          
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`h-5 w-5 ${
                  index < rating ? 'text-yellow-400' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        {image && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={`${name}의 리뷰 이미지`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      <p className="text-gray-700 line-clamp-4 text-sm leading-relaxed">{content}</p>
    </div>
  );
} 