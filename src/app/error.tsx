'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">문제가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">
          죄송합니다. 페이지를 로드하는 중에 오류가 발생했습니다.
        </p>
        <button
          onClick={reset}
          className="w-full bg-theme-yellow text-white py-2 px-4 rounded hover:bg-theme-yellow/90 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
} 