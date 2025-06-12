'use client';

import { useState, useEffect, useCallback } from 'react';
import { MenuCategory } from '@/generated/prisma'; // Prisma enum import
import { UploadDropzone } from "@uploadthing/react"; // UploadThing component
import type { OurFileRouter } from "@/app/api/uploadthing/core"; // Import router type
import Image from 'next/image';

// MenuItem 타입 정의 (Prisma 모델과 유사하게)
export interface MenuItemData {
  id?: string;
  name: string;
  description: string;
  price: string | number; // 입력 시 string, 저장 시 number
  category: MenuCategory;
  tags: string[];
  allergens: string[];
  imageUrl?: string | null;
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSave 콜백의 타입을 명확히 합니다. API 요청에 필요한 데이터만 전달하고, 성공/실패 처리는 부모에서 하도록 유도할 수 있습니다.
  onSave: (menu: Omit<MenuItemData, 'id' | 'price'> & { price: number; imageUrl?: string | null }) => Promise<void>; 
  initialData?: MenuItemData | null; // 수정 시 초기 데이터
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  // 초기 상태를 생성하는 함수 (useCallback으로 최적화)
  const getInitialMenuState = useCallback((): MenuItemData => {
    if (initialData) {
      return {
        ...initialData,
        price: initialData.price?.toString() || '0', // 가격을 문자열로 변환, 없으면 '0'
        tags: initialData.tags || [],
        allergens: initialData.allergens || [],
        imageUrl: initialData.imageUrl || null,
      };
    }
    // 새 메뉴 추가 시 기본값
    return {
      name: '',
      description: '',
      price: '0',
      category: Object.values(MenuCategory)[0] as MenuCategory, // 첫 번째 카테고리를 기본값으로
      tags: [],
      allergens: [],
      imageUrl: null,
    };
  }, [initialData]);

  const [menu, setMenu] = useState<MenuItemData>(getInitialMenuState());
  const [tagsInput, setTagsInput] = useState<string>(''); // 태그 입력용 문자열 상태
  const [allergensInput, setAllergensInput] = useState<string>(''); // 알레르기 정보 입력용 문자열 상태
  const [isLoading, setIsLoading] = useState(false);

  // 모달이 열리거나 초기 데이터가 변경될 때 상태 업데이트
  useEffect(() => {
    const initial = getInitialMenuState();
    setMenu(initial);
    setTagsInput(initial.tags?.join(', ') || '');
    setAllergensInput(initial.allergens?.join(', ') || '');
  }, [initialData, isOpen, getInitialMenuState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMenu((prev) => ({ ...prev, [name]: name === 'category' ? value as MenuCategory : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const menuToSave = {
        name: menu.name,
        description: menu.description,
        price: parseFloat(menu.price as string), // 가격을 숫자로 변환
        category: menu.category,
        tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        allergens: allergensInput.split(',').map(allergen => allergen.trim()).filter(allergen => allergen !== ''),
        imageUrl: menu.imageUrl || null, // imageUrl 추가
      };
      
      if (isNaN(menuToSave.price)) {
        alert('가격은 숫자로 입력해주세요.');
        setIsLoading(false);
        return;
      }

      await onSave(menuToSave);
      // 성공 시 모달 닫기는 onSave 콜백을 호출한 부모 컴포넌트에서 처리하는 것이 더 유연할 수 있습니다.
      // onClose(); 
    } catch (error) {
      console.error("Failed to save menu:", error);
      alert("메뉴 저장에 실패했습니다. 콘솔 로그를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-95 focus-within:scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{initialData?.id ? '메뉴 수정' : '새 메뉴 추가'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">메뉴 이름 <span className="text-red-500">*</span></label>
            <input type="text" name="name" id="name" value={menu.name} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">설명 <span className="text-red-500">*</span></label>
            <textarea name="description" id="description" value={menu.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1.5">가격 <span className="text-red-500">*</span></label>
              <input type="number" name="price" id="price" value={menu.price} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" placeholder="예: 10000" required />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1.5">카테고리 <span className="text-red-500">*</span></label>
              <select name="category" id="category" value={menu.category} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white transition-shadow duration-200 ease-in-out hover:shadow-md" required>
                {Object.values(MenuCategory).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-1.5">태그 (쉼표로 구분)</label>
            <input type="text" name="tags" id="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" placeholder="예: 신메뉴, 추천, 매콤" />
          </div>

          <div>
            <label htmlFor="allergens" className="block text-sm font-semibold text-gray-700 mb-1.5">알레르기 정보 (쉼표로 구분)</label>
            <input type="text" name="allergens" id="allergens" value={allergensInput} onChange={(e) => setAllergensInput(e.target.value)} className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" placeholder="예: 우유, 계란, 대두" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">메뉴 이미지</label>
            {menu.imageUrl ? (
              <div className="mt-2 relative group w-full sm:w-64 h-40 border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-gray-50">
                <Image src={menu.imageUrl} alt="메뉴 이미지 미리보기" layout="fill" objectFit="contain" className="rounded-md p-1" />
                <button 
                  type="button"
                  onClick={() => setMenu((prev) => ({ ...prev, imageUrl: null }))}
                  className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="이미지 삭제"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
            ) : (
              <div className="mt-2 flex justify-center items-center w-full h-40 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors duration-200 ease-in-out bg-gray-50 hover:bg-indigo-50">
                <UploadDropzone<OurFileRouter, "imageUploader">
                  endpoint="imageUploader" // 실제 사용하시는 UploadThing 엔드포인트로 정확히 설정해주세요.
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0 && res[0]?.url) {
                      setMenu((prev) => ({ ...prev, imageUrl: res[0].url }));
                      // alert("이미지 업로드 완료!"); // UX 개선을 위해 alert 대신 UI 피드백으로 변경 고려
                    } else {
                      console.error("Upload response error or missing URL:", res);
                      alert("이미지 URL을 받지 못했습니다. 업로드 응답을 확인해주세요.");
                    }
                  }}
                  onUploadError={(error) => {
                    console.error("Upload error:", error);
                    alert(`이미지 업로드 실패: ${error.message}`);
                  }}
                  config={{
                      mode: "auto", // 또는 'manual' 등 필요에 따라 설정
                      // ...기타 UploadThing 설정
                  }}
                  className="w-full ut-label:text-indigo-600 ut-allowed-content:text-gray-500 ut-button:bg-indigo-600 ut-button:ut-readying:bg-indigo-500 ut-upload-icon:text-indigo-400 hover:ut-label:text-indigo-700"
                />
              </div>
            )}
            {menu.imageUrl && <p className="text-xs text-gray-500 mt-1.5">이미지 변경을 원하시면 위 'X' 버튼을 누르고 새 이미지를 업로드하세요.</p>}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-5 border-t border-gray-200 mt-8">
            <button type="button" onClick={onClose} disabled={isLoading} className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors duration-200 ease-in-out">
              취소
            </button>
            <button type="submit" disabled={isLoading} className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200 ease-in-out">
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2.5 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  저장 중...
                </span>
              ) : (initialData?.id ? '변경사항 저장' : '메뉴 추가')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuModal;