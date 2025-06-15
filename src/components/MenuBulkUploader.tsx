'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UploadDropzone } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

interface UploadedImage {
  name: string;
  url: string;
  status: 'completed' | 'failed';
}

export default function MenuBulkUploader() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [processedFiles, setProcessedFiles] = useState(0);

  // 업로드 진행 상태 업데이트
  useEffect(() => {
    if (totalFiles > 0) {
      const progress = Math.round((processedFiles / totalFiles) * 100);
      setUploadProgress(progress);
    }
  }, [processedFiles, totalFiles]);

  // DB에 이미지 정보 저장
  const saveImagesToDB = async () => {
    try {
      const response = await fetch('/api/admin/menu-images/bulk-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images: uploadedImages }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`성공적으로 ${result.savedCount}개의 이미지 정보가 저장되었습니다.`);
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || '이미지 정보 저장 실패');
      }
    } catch (error) {
      console.error('DB 저장 오류:', error);
      alert(`이미지 정보 저장 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">메뉴 이미지 일괄 업로드</h2>
      
      <div className="mb-8 p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">이미지 업로드</h3>
        <p className="text-sm text-gray-500 mb-4">
          여러 이미지를 한 번에 선택해서 업로드할 수 있습니다. 
          업로드된 이미지 URL은 자동으로 수집됩니다.
        </p>
        
        {isUploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {processedFiles}/{totalFiles} 파일 처리 중... ({uploadProgress}%)
            </p>
          </div>
        )}
        
        <UploadDropzone<OurFileRouter, "menuImageUploader">
          endpoint="menuImageUploader"
          onBeforeUploadBegin={(files) => {
            setIsUploading(true);
            setTotalFiles(files.length);
            setProcessedFiles(0);
            return files;
          }}
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              const newImages = res.map(file => ({
                name: file.name,
                url: file.url,
                status: 'completed' as const
              }));
              setUploadedImages(prev => [...prev, ...newImages]);
              setProcessedFiles(prev => prev + res.length);
            }
            setIsUploading(false);
          }}
          onUploadError={(error) => {
            console.error('Upload error:', error);
            alert(`이미지 업로드 실패: ${error.message}`);
            setIsUploading(false);
          }}
          onUploadProgress={(progress) => {
            // progress는 0-100 사이의 값
            console.log(`Upload progress: ${progress}%`);
          }}
          config={{
            mode: "auto",
          }}
          className="ut-button:bg-indigo-600 ut-button:hover:bg-indigo-700 ut-label:text-indigo-600 ut-upload-icon:text-indigo-400"
        />
      </div>

      {uploadedImages.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">업로드된 이미지 ({uploadedImages.length}개)</h3>
            <button
              onClick={saveImagesToDB}
              disabled={isUploading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-gray-400"
            >
              DB에 정보 저장
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((img, index) => (
              <div key={index} className="border rounded-lg overflow-hidden bg-gray-50">
                <div className="relative w-full h-32">
                  <Image
                    src={img.url}
                    alt={img.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs truncate" title={img.name}>{img.name}</p>
                  <p className="text-xs text-gray-500 truncate" title={img.url}>
                    {img.url.substring(0, 20)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
