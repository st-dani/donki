'use client';

import { useState, useEffect, useCallback } from 'react';
import { UploadDropzone } from "@uploadthing/react"; // UploadThing component
import type { OurFileRouter } from "@/app/api/uploadthing/core"; // Import router type
import Image from 'next/image';

// MenuCategory enum 직접 정의
enum MenuCategory {
  MAIN = 'MAIN',
  SIDE = 'SIDE',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE'
}

// MenuItem 타입 정의 (Prisma 모델과 유사하게)
export interface MenuItemData {
  id?: string;
  name: string;
  nameEn: string;
  description: string;
  category: MenuCategory;
  tags: string[];
  allergens: string[];
  imageUrl?: string | null;
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSave 콜백의 타입을 명확히 합니다. API 요청에 필요한 데이터만 전달하고, 성공/실패 처리는 부모에서 하도록 유도할 수 있습니다.
  onSave: (menu: Omit<MenuItemData, 'id'> & { imageUrl?: string | null }) => Promise<void>; 
  initialData?: MenuItemData | null; // 수정 시 초기 데이터
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  // 초기 상태를 생성하는 함수 (useCallback으로 최적화)
  const getInitialMenuState = useCallback((): MenuItemData => {
    if (initialData) {
      return {
        ...initialData,
        nameEn: initialData.nameEn || '',
        tags: initialData.tags || [],
        allergens: initialData.allergens || [],
        imageUrl: initialData.imageUrl || null,
      };
    }
    // 새 메뉴 추가 시 기본값
    return {
      name: '',
      nameEn: '',
      description: '',
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

  const translateToEnglish = async (text: string) => {
    if (!text) return '';
    try {
      // 실제 환경에서는 번역 API를 호출해야 합니다.
      // 여기서는 간단한 예시만 제공합니다.
      // 푸드트럭과 길거리 음식 중심의 번역 사전
      const koreanToEnglish: Record<string, string> = {
        // 분식 (길거리 음식)
        '김밥': 'Kimbap (Korean Seaweed Rice Roll)',
        '떡볶이': 'Tteokbokki (Spicy Rice Cake)',
        '어답': 'Eomuk (Fish Cake)',
        '순대': 'Sundae (Korean Blood Sausage)',
        '만두': 'Mandu (Korean Dumplings)',
        '떡꾸이': 'Hotteok (Sweet Filled Pancake)',
        '견과류': 'Gyeranppang (Egg Bread)',
        '튀김': 'Twigim (Korean Tempura)',
        '라볶이': 'Rabokki (Ramen & Tteokbokki)',
        '분식주무': 'Bunsik Set (Assorted Korean Street Foods)',
        '분식세트': 'Bunsik Set (Assorted Korean Street Foods)',
        '치즈부처': 'Cheese Bbucher (Cheese-filled Fish Cake)',
        
        // 식사
        '라면': 'Ramyeon (Korean Instant Noodles)',
        '짜장면': 'Jajangmyeon (Black Bean Noodles)',
        '우동': 'Udon (Japanese Thick Noodles)',
        '짬뽕': 'Jjamppong (Spicy Seafood Noodle Soup)',
        '비빔밥': 'Bibimbap (Mixed Rice Bowl)',
        '냄비밥': 'Naengmyeon (Cold Buckwheat Noodles)',
        '김치볶음밥': 'Kimchi Fried Rice',
        '김치': 'Kimchi (Korean Fermented Cabbage)',
        '돈까스': 'Donkatsu (Korean Pork Cutlet)',
        
        // 핸드푸드 / 버거 / 핫도그
        '햄버거': 'Hamburger',
        '치즈버거': 'Cheeseburger',
        '베이컨버거': 'Bacon Burger',
        '블랙버거': 'Black Burger',
        '비프버거': 'Beef Burger',
        '테크아웃버거': 'Takeout Burger',
        '핫도그': 'Hot Dog',
        '치즈핫도그': 'Cheese Hot Dog',
        '프렌치프라이': 'French Fries',
        '어니언링': 'Onion Rings',
        '나쌌스': 'Nachos',
        
        // 간식
        '피자': 'Pizza',
        '치킨': 'Fried Chicken',
        '양념치킨': 'Yangnyeom Chicken (Korean Sweet & Spicy Chicken)',
        '후라이드치킨': 'Fried Chicken',
        '미니피자': 'Mini Pizza',
        '포테이토': 'Potato Wedges',
        '귀리': 'Squid Rings',
        '물고기튀김': 'Fish Twigim (Korean Fish Tempura)',
        '오뎅튀김': 'Squid Twigim (Korean Squid Tempura)',
        
        // 디저트 & 음료
        '케이크': 'Cake',
        '아이스크림': 'Ice Cream',
        '콜라': 'Cola',
        '사이다': 'Sprite (Korean Cider)',
        '환타': 'Fanta',
        '맥주': 'Beer',
        '소주': 'Soju (Korean Distilled Liquor)',
        '커피': 'Coffee',
        '아이스티': 'Iced Tea',
        '슬러시': 'Slush',
        '스무디': 'Smoothie',
        '샌드위치': 'Sandwich',
        '와플': 'Waffle',
      };
      
      // 공백 제거 후 정확히 일치하는지 확인
      const trimmedText = text.trim();
      if (koreanToEnglish[trimmedText]) {
        return koreanToEnglish[trimmedText];
      }
      
      // 부분 일치하는 단어 찾기
      for (const [korean, english] of Object.entries(koreanToEnglish)) {
        if (trimmedText.includes(korean)) {
          return english;
        }
      }
      
      // 일치하는 항목이 없으면 기본 형식으로 제공
      return `${text} (Korean Cuisine)`;
    } catch (error) {
      console.error('번역 에러:', error);
      return `${text} (Korean Cuisine)`;
    }
  };
  
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMenu((prev) => ({ ...prev, [name]: name === 'category' ? value as MenuCategory : value }));
    
    // 한글 이름이 변경되면 영어 이름 자동 생성
    if (name === 'name') {
      const englishName = await translateToEnglish(value);
      setMenu((prev) => ({ ...prev, nameEn: englishName }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 기본 메뉴 데이터
      const menuToSave: any = {
        name: menu.name,
        nameEn: menu.nameEn,
        description: menu.description,
        category: menu.category,
        tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        allergens: allergensInput.split(',').map(allergen => allergen.trim()).filter(allergen => allergen !== ''),
      };
      
      // 이미지가 변경된 경우에만 imageUrl 전송
      // 초기 데이터와 현재 메뉴의 imageUrl을 비교
      const initialImageUrl = initialData?.imageUrl;
      const currentImageUrl = menu.imageUrl;
      
      // 초기 이미지와 현재 이미지가 다른 경우에만 imageUrl 필드 포함
      if (initialImageUrl !== currentImageUrl) {
        menuToSave.imageUrl = currentImageUrl;
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
        <form onSubmit={handleSubmit} className="space-y-3">
          
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">메뉴 이름 <span className="text-red-500">*</span></label>
            <input type="text" name="name" id="name" value={menu.name} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" required />
          </div>
          
          <div>
            <label htmlFor="nameEn" className="block text-sm font-semibold text-gray-700 mb-1.5">영문 이름 <span className="text-red-500">*</span> <span className="text-xs text-gray-500">(한글 이름 입력 시 자동 생성)</span></label>
            <input type="text" name="nameEn" id="nameEn" value={menu.nameEn} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">설명 <span className="text-red-500">*</span></label>
            <textarea name="description" id="description" value={menu.description} onChange={handleInputChange} rows={2} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">카테고리 <span className="text-red-500">*</span></label>
              <select name="category" id="category" value={menu.category} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white transition-shadow duration-200 ease-in-out hover:shadow-md" required>
                {Object.values(MenuCategory).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-1">태그 (쉼표로 구분)</label>
              <input type="text" name="tags" id="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" placeholder="예: 신메뉴, 추천, 매콤" />
            </div>
            <div>
              <label htmlFor="allergens" className="block text-sm font-semibold text-gray-700 mb-1">알레르기 정보</label>
              <input type="text" name="allergens" id="allergens" value={allergensInput} onChange={(e) => setAllergensInput(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200 ease-in-out hover:shadow-md" placeholder="예: 우유, 계란, 대두" />
            </div>
          </div>

          {/* 태그와 알레르기 정보는 위 그리드로 이동 */}

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
              <div className="mt-2 flex justify-center items-center w-full h-32 px-6 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors duration-200 ease-in-out bg-gray-50 hover:bg-indigo-50">
                <UploadDropzone<OurFileRouter, "menuImageUploader">
                  endpoint="menuImageUploader" // 메뉴 이미지 전용 업로더 사용
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0 && res[0]?.url) {
                      // UploadThing 서버에 업로드된 이미지 URL 저장
                      setMenu((prev) => ({ ...prev, imageUrl: res[0].url }));
                      console.log("메뉴 이미지가 UploadThing에 성공적으로 업로드되었습니다:", res[0].url);
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
                      mode: "auto",
                  }}
                  className="w-full ut-label:text-indigo-600 ut-allowed-content:text-gray-500 ut-button:bg-indigo-600 ut-button:ut-readying:bg-indigo-500 ut-upload-icon:text-indigo-400 hover:ut-label:text-indigo-700"
                />
              </div>
            )}
            {menu.imageUrl && <p className="text-xs text-gray-500 mt-1.5">이미지 변경을 원하시면 위 'X' 버튼을 누르고 새 이미지를 업로드하세요.</p>}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-3 border-t border-gray-200 mt-4">
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