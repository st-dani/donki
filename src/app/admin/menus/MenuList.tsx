'use client';

import { useState } from 'react';
import { Menu, MenuCategory } from '@/generated/prisma';
import MenuModal, { type MenuItemData } from './MenuModal';

type SerializedMenu = Omit<Menu, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

interface MenuListProps {
  initialMenus: SerializedMenu[];
}

export default function MenuList({ initialMenus }: MenuListProps) {
  const [menus, setMenus] = useState<SerializedMenu[]>(initialMenus);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<SerializedMenu | null>(null);

  const openModal = (menu: SerializedMenu | null = null) => {
    setEditingMenu(menu);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingMenu(null);
    setIsModalOpen(false);
  };

  const refetchMenus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/menu', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setMenus(data);
      } else {
        console.error('Failed to refetch menus');
      }
    } catch (error) {
      console.error('Error refetching menus:', error);
    }
    setLoading(false);
  };

  const handleSave = async (menuData: Omit<MenuItemData, 'id'> & { imageUrl?: string | null }) => {
    setLoading(true);
    const method = editingMenu ? 'PUT' : 'POST';
    const url = '/api/menu';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMenu ? { ...menuData, id: editingMenu.id } : menuData),
      });

      if (response.ok) {
        alert(editingMenu ? '메뉴가 수정되었습니다.' : '새 메뉴가 추가되었습니다.');
        closeModal();
        await refetchMenus();
      } else {
        const errorData = await response.json();
        alert(`저장 실패: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error saving menu:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/menu`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          alert('메뉴가 삭제되었습니다.');
          setMenus(menus.filter((menu) => menu.id !== id));
        } else {
          alert('메뉴 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error deleting menu:', error);
        alert('메뉴 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={() => openModal()}
          disabled={loading}
        >
          {loading ? '로딩중...' : '새 메뉴 추가'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이미지</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">태그</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {menus.map((menu) => (
              <tr key={menu.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  {menu.image ? <img src={menu.image} alt={menu.name} className="h-16 w-16 object-cover rounded" /> : <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Image</div>}
                </td>
                <td className="py-3 px-4 font-medium">{menu.name}</td>
                <td className="py-3 px-4 text-sm max-w-xs truncate">{menu.description}</td>
                <td className="py-3 px-4">{menu.category}</td>
                <td className="py-3 px-4">
                  {menu.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-200 rounded-full px-2 py-1 text-xs mr-1">{tag}</span>
                  ))}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    onClick={() => openModal(menu)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs mr-2 transition duration-300"
                    disabled={loading}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs transition duration-300"
                    disabled={loading}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MenuModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialData={editingMenu}
      />
    </div>
  );
}
