'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { ServiceGallery } from '@/generated/prisma';
import GalleryFormModal from './GalleryFormModal';

type SerializedGallery = Omit<ServiceGallery, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

interface GalleryClientProps {
  initialGallery: SerializedGallery[];
}

export default function GalleryClient({ initialGallery }: GalleryClientProps) {
  const [gallery, setGallery] = useState<SerializedGallery[]>(initialGallery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SerializedGallery | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 모달 열기 - 새 항목 생성
  const handleAddNew = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  // 모달 열기 - 기존 항목 수정
  const handleEdit = (item: SerializedGallery) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  // 항목 삭제
  const handleDelete = async (id: string) => {
    if (!window.confirm('이 갤러리 항목을 삭제하시겠습니까?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '갤러리 항목 삭제에 실패했습니다.');
      }

      setGallery(gallery.filter(item => item.id !== id));
      toast.success('갤러리 항목이 삭제되었습니다.');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error instanceof Error ? error.message : '갤러리 항목 삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 항목 저장 (추가 또는 수정)
  const handleSave = async (item: SerializedGallery, file?: File) => {
    setIsLoading(true);
    const isEdit = Boolean(item.id);
    
    try {
      const formData = new FormData();
      formData.append('title', item.title);
      formData.append('description', item.description);
      formData.append('order', item.order.toString());
      
      if (file) {
        formData.append('image', file);
      } else if (!isEdit) {
        throw new Error('이미지를 선택해주세요.');
      }

      const url = isEdit 
        ? `/api/admin/gallery/${item.id}` 
        : '/api/admin/gallery';
      
      const method = isEdit ? 'PATCH' : 'POST';
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '갤러리 항목 저장에 실패했습니다.');
      }

      const savedItem = await response.json();

      if (isEdit) {
        setGallery(gallery.map(g => g.id === savedItem.id ? savedItem : g));
        toast.success('갤러리 항목이 수정되었습니다.');
      } else {
        setGallery([...gallery, savedItem]);
        toast.success('새 갤러리 항목이 추가되었습니다.');
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error instanceof Error ? error.message : '갤러리 항목 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">성공 사례 갤러리 목록</h2>
        <button
          onClick={handleAddNew}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          새 항목 추가
        </button>
      </div>

      {gallery.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">등록된 갤러리 항목이 없습니다.</p>
          <button
            onClick={handleAddNew}
            className="mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            첫 항목 추가하기
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-16 py-2 px-4 border-b text-left">순서</th>
                <th className="w-24 py-2 px-4 border-b text-left">이미지</th>
                <th className="w-1/4 py-2 px-4 border-b text-left">제목</th>
                <th className="py-2 px-4 border-b text-left">설명</th>
                <th className="w-32 py-2 px-4 border-b text-left">등록일</th>
                <th className="w-24 py-2 px-4 border-b text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {gallery.sort((a, b) => a.order - b.order).map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.order}</td>
                  <td className="py-2 px-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="64px"
                        className="object-cover rounded-md"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.description}</td>
                  <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        disabled={isLoading}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isLoading}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <GalleryFormModal
          item={currentItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
