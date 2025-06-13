'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MenuCategory } from '@/generated/prisma';
import MenuModal from '../menus/MenuModal';

interface Menu {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  category: MenuCategory;
  isRecommended: boolean;
  isAvailable: boolean;
  tags: string[];
  allergens: string[];
}

interface MenuListProps {
  initialMenus: Menu[];
}

export default function MenuList({ initialMenus }: MenuListProps) {
  const [menus, setMenus] = useState(initialMenus);
  const [selectedMenu, setSelectedMenu] = useState<Menu | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvailabilityChange = async (id: string, isAvailable: boolean) => {
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAvailable }),
      });

      if (!response.ok) {
        throw new Error('메뉴 상태 변경에 실패했습니다.');
      }

      setMenus((prev) =>
        prev.map((menu) =>
          menu.id === id ? { ...menu, isAvailable } : menu
        )
      );
    } catch (error) {
      console.error('메뉴 상태 변경 중 오류 발생:', error);
      alert('메뉴 상태 변경 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async (menuData: Partial<Menu>) => {
    try {
      const response = await fetch(
        selectedMenu ? `/api/menu/${selectedMenu.id}` : '/api/menu',
        {
          method: selectedMenu ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(menuData),
        }
      );

      if (!response.ok) {
        throw new Error('메뉴 저장에 실패했습니다.');
      }

      const savedMenu = await response.json();

      setMenus((prev) => {
        if (selectedMenu) {
          return prev.map((menu) =>
            menu.id === selectedMenu.id ? savedMenu : menu
          );
        }
        return [...prev, savedMenu];
      });
    } catch (error) {
      console.error('메뉴 저장 중 오류 발생:', error);
      alert('메뉴 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    메뉴
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    카테고리
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    가격
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    추천
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    상태
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {menus.map((menu) => (
                  <tr key={menu.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {menu.imageUrl ? (
                            <Image
                              src={menu.imageUrl}
                              alt={menu.name}
                              width={50}
                              height={50}
                              className="rounded-md object-cover"
                            />
                          ) : (
                            <div className="w-[50px] h-[50px] bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {menu.name}
                          </div>
                          <div className="text-gray-500">{menu.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {menu.category}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {menu.isRecommended ? '✓' : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <button
                        onClick={() =>
                          handleAvailabilityChange(menu.id, !menu.isAvailable)
                        }
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          menu.isAvailable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {menu.isAvailable ? '판매중' : '품절'}
                      </button>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          setSelectedMenu(menu);
                          setIsModalOpen(true);
                        }}
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MenuModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMenu(undefined);
        }}
        initialData={selectedMenu}
        onSave={handleSave}
      />
    </div>
  );
} 