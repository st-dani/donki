'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type GalleryItem = {
  id?: string;
  title: string;
  description: string;
  image: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

interface GalleryFormModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: GalleryItem, file?: File) => Promise<void>;
  isLoading: boolean;
}

export default function GalleryFormModal({
  item,
  isOpen,
  onClose,
  onSave,
  isLoading
}: GalleryFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 수정 모드일 경우 초기값 설정
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setOrder(item.order);
      setImagePreview(item.image);
    } else {
      // 새 항목 모드일 경우 초기화
      setTitle('');
      setDescription('');
      setOrder(0);
      setImageFile(null);
      setImagePreview(null);
    }
  }, [item]);

  // 이미지 파일 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    setImageFile(file);
    
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedItem: GalleryItem = {
      ...item,
      id: item?.id,
      title,
      description,
      image: item?.image || '',
      order,
    };

    onSave(updatedItem, imageFile || undefined);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">
            {item ? '갤러리 항목 수정' : '새 갤러리 항목 추가'}
          </h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="갤러리 항목 제목"
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="갤러리 항목 설명"
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              표시 순서
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              required
              min={0}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="낮은 숫자가 먼저 표시됩니다"
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이미지 {!item && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center space-x-4">
              {imagePreview ? (
                <div className="relative w-24 h-24">
                  <Image
                    src={imagePreview}
                    alt="이미지 미리보기"
                    fill
                    sizes="96px"
                    className="object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={isLoading}
                >
                  이미지 선택
                </button>
                <p className="mt-1 text-xs text-gray-500">권장 크기: 800x600px</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
