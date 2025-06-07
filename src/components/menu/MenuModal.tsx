'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { MenuItem } from '@/types/menu';

interface MenuModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuModal({ item, isOpen, onClose }: MenuModalProps) {
  if (!item) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* 배경 오버레이 */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        {/* 모달 컨텐츠 */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {/* 이미지 섹션 */}
                <div className="relative h-64 sm:h-72">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-orange-50 flex items-center justify-center">
                      <span className="text-orange-200 text-7xl">🍽️</span>
                    </div>
                  )}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* 콘텐츠 섹션 */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <Dialog.Title className="text-2xl font-bold text-gray-900">
                        {item.name}
                      </Dialog.Title>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-orange-500">
                      {item.price.toLocaleString()}원
                    </span>
                  </div>

                  {/* 태그 섹션 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.isPopular && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        인기 메뉴
                      </span>
                    )}
                    {item.isNew && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        신메뉴
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                        채식 가능
                      </span>
                    )}
                    {item.spicyLevel && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        매운맛 {item.spicyLevel}단계
                      </span>
                    )}
                  </div>

                  {/* 알레르기 정보 */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        알레르기 정보
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.allergens.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 