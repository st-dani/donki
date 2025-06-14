'use client';

import { useState } from 'react';
import MenuModal, { type MenuItemData } from './MenuModal';

// MenuCategory enum 직접 정의
enum MenuCategory {
  MAIN = 'MAIN',
  SIDE = 'SIDE',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE'
}

// 서버에서 받아온 메뉴 타입 정의
type SerializedMenu = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPublished: boolean;
  tags: string[];
  allergens: string[];
  createdAt: string;
  updatedAt: string;
};

interface MenuClientProps {
  initialMenus: SerializedMenu[];
}

export default function MenuClient({ initialMenus }: MenuClientProps) {
  const [menus, setMenus] = useState<SerializedMenu[]>(initialMenus);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<SerializedMenu | null>(null);
  // 정적 데이터 가져오기 상태
  const [importing, setImporting] = useState(false);

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
      const res = await fetch('/api/admin/menus', { cache: 'no-store' });
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
    const method = editingMenu ? 'PATCH' : 'POST';
    const url = editingMenu ? `/api/admin/menus/${editingMenu.id}` : '/api/admin/menus';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...menuData,
          image: menuData.imageUrl, // 서버 API가 image 필드를 기대함
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save menu');
      }

      await refetchMenus();
      closeModal();
    } catch (error) {
      console.error('Error saving menu:', error);
      alert('메뉴 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (menuId: string) => {
    if (!confirm('이 메뉴를 삭제하시겠습니까?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/menus/${menuId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete menu');
      }

      await refetchMenus();
    } catch (error) {
      console.error('Error deleting menu:', error);
      alert('메뉴 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 정적 메뉴 데이터 가져오기
  const importFromStatic = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/menus/import-from-static', { 
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to import menus');
      }

      const data = await res.json();
      alert(`${data.imported} 개의 메뉴가 성공적으로 가져와졌습니다.`);
      await refetchMenus();
      setImporting(false);
    } catch (error) {
      console.error('Error importing menus:', error);
      alert('메뉴를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const showImportConfirmation = () => {
    setImporting(true);
  };

  const executeImport = () => {
    importFromStatic();
  };

  // 정적 메뉴 데이터 가져오기 확인 대화상자
  const ConfirmationDialog = () => {
    if (!importing) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">정적 메뉴 데이터 가져오기</h2>
          <p className="mb-6">
            프론트 페이지의 정적 메뉴 데이터를 가져오시겠습니까?<br />
            기존 데이터와 중복되는 ID는 업데이트됩니다.
          </p>
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => setImporting(false)} 
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition duration-300"
            >
              취소
            </button>
            <button 
              onClick={executeImport} 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* 확인 대화상자 렌더링 */}
      <ConfirmationDialog />
      
      <div className="flex justify-between mb-8">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 flex items-center text-lg"
          onClick={showImportConfirmation}
          disabled={loading || importing}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              로딩중...
            </>
          ) : (
            <>
              <svg className="-ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              초기 메뉴 데이터 가져오기
            </>
          )}
        </button>
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
              <th className="py-3 px-4 text-left">이미지</th>
              <th className="py-3 px-4 text-left">이름</th>
              <th className="py-3 px-4 text-left">설명</th>
              <th className="py-3 px-4 text-left">카테고리</th>
              <th className="py-3 px-4 text-left">태그</th>
              <th className="py-3 px-4 text-left">작업</th>
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
                    <span key={tag} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded mr-1 mb-1">{tag}</span>
                  ))}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openModal(menu)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    disabled={loading}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="text-red-500 hover:text-red-700"
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
        initialData={editingMenu ? {
          id: editingMenu.id,
          name: editingMenu.name,
          nameEn: editingMenu.nameEn || '', // nameEn 추가 (없을 경우 빈 문자열로 처리)
          description: editingMenu.description,
          category: editingMenu.category as MenuCategory,
          tags: editingMenu.tags,
          allergens: editingMenu.allergens,
          imageUrl: editingMenu.image,
        } : null}
      />
    </div>
  );
}
