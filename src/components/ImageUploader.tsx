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
    (res: Array<{ url: string; name: string; size: number }>) => {
      // UploadThing이 반환하는 형식에 맞게 접근
      const url = res[0].url;
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
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
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