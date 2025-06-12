'use client';

import { useState } from 'react';
import MenuList from './MenuList';
import MenuModal from '@/components/MenuModal';

interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isRecommended: boolean;
  isAvailable: boolean;
}

interface MenuPageClientProps {
  initialMenus: Menu[];
}

export default function MenuPageClient({ initialMenus }: MenuPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">메뉴 관리</h1>
          <p className="mt-2 text-sm text-gray-700">
            메뉴 목록을 관리할 수 있습니다.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            메뉴 추가
          </button>
        </div>
      </div>
      <MenuList initialMenus={initialMenus} />
      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (menuData) => {
          try {
            const response = await fetch('/api/menu', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(menuData),
            });

            if (!response.ok) {
              throw new Error('메뉴 생성에 실패했습니다.');
            }

            // 페이지 새로고침
            window.location.reload();
          } catch (error) {
            console.error('메뉴 생성 중 오류 발생:', error);
            alert('메뉴 생성 중 오류가 발생했습니다.');
          }
        }}
      />
    </div>
  );
} 