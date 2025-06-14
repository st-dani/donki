'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MenuItem } from '@/types/menu';
import MenuModal from './MenuModal';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 매운맛 레벨 표시
  const renderSpicyLevel = () => {
    if (!item.spicyLevel) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(item.spicyLevel)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 3.5c.66 0 1.28.32 1.65.86l3.37 4.85c.28.4.43.89.43 1.4 0 1.38-1.12 2.5-2.5 2.5-.51 0-1-.15-1.4-.43l-1.55-1.08V15c0 1.1-.9 2-2 2s-2-.9-2-2v-3.9L4.45 12.18c-.4.28-.89.43-1.4.43-1.38 0-2.5-1.12-2.5-2.5 0-.51.15-1 .43-1.4l3.37-4.85c.37-.54.99-.86 1.65-.86z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <div 
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* 이미지 영역 */}
        <div className="relative h-48 bg-gray-100">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoadingComplete={() => setIsImageLoading(false)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-orange-50">
              <span className="text-orange-200 text-5xl">🍽️</span>
            </div>
          )}
          {/* 배지 */}
          <div className="absolute top-3 left-3 flex gap-2">
            {item.isPopular && (
              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                인기
              </span>
            )}
            {item.isNew && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                New
              </span>
            )}
            {item.isVegetarian && (
              <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                채식
              </span>
            )}
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
            <div className="flex items-center gap-2">
              {renderSpicyLevel()}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
          <div className="flex items-center justify-between">
            {item.allergens && item.allergens.length > 0 && (
              <div className="text-xs text-gray-500">
                알레르기: {item.allergens.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 메뉴 상세 모달 */}
      <MenuModal
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 