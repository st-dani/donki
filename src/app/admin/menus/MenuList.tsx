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

// Prisma 스키마에 정의된 Menu 모델과 일치하는 직렬화된 타입 정의
type SerializedMenu = {
  id: string;
  name: string;
  nameEn: string | null;
  description: string;
  category: MenuCategory;
  categorySlug: string;
  tags: string[];
  isPopular: boolean;
  spicyLevel: number | null;
  isNew: boolean;
  isVegetarian: boolean;
  allergens: string[];
  image: string;
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
        const response = await fetch(`/api/admin/menus/${id}`, {
          method: 'DELETE',
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

  // 가져오기 진행 상태 추가
  const [importing, setImporting] = useState(false);

  // 정적 메뉴 데이터 가져오기 확인 함수
  const showImportConfirmation = () => {
    console.log('초기 메뉴 데이터 가져오기 버튼 클릭됨');
    // 먼저 상태 업데이트를 통해 확인 모달을 표시합니다
    setImporting(true);
  };

  // 실제 데이터 가져오기 실행 함수
  const executeImport = async () => {
    setImporting(false); // 확인 단계 종료
    setLoading(true); // 로딩 시작
    
    try {
      console.log('API 요청 시작: /api/admin/menus/import-from-static');
      const response = await fetch('/api/admin/menus/import-from-static', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      console.log('API 응답 받음:', response.status, response.statusText);
      const result = await response.json();
      console.log('API 응답 데이터:', result);
      
      if (response.ok) {
        alert(`메뉴 데이터 가져오기 성공!\n총 ${result.totalItems}개 중 ${result.successCount}개 가져옴${result.failCount > 0 ? `\n${result.failCount}개 실패` : ''}`);
        await refetchMenus(); // 목록 새로고침
      } else {
        alert(`메뉴 데이터 가져오기 실패: ${result.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('정적 메뉴 데이터 가져오기 오류:', error);
      alert('메뉴 데이터 가져오기 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 확인 모달 컴포넌트
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
      
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
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
        initialData={editingMenu ? {
          id: editingMenu.id,
          name: editingMenu.name,
          nameEn: editingMenu.nameEn || '', // null이면 빈 문자열로 대체
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
