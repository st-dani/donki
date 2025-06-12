'use client';

import { useCallback, useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';

interface ImageUploaderProps {
  initialImageUrl?: string;
  onUploadComplete: (url: string) => void;
}

export default function ImageUploader({
  initialImageUrl,
  onUploadComplete,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const handleUploadComplete = useCallback(
    (res: { fileUrl: string }[]) => {
      const url = res[0].fileUrl;
      setImageUrl(url);
      onUploadComplete(url);
    },
    [onUploadComplete]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      {imageUrl ? (
        <div className="relative h-40 w-40">
          <Image
            src={imageUrl}
            alt="Uploaded image"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      ) : (
        <div className="flex h-40 w-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          <div className="text-center">
            <div className="text-sm text-gray-600">이미지 없음</div>
          </div>
        </div>
      )}
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            handleUploadComplete(res);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
} 