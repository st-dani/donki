'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoInitializer() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.Kakao && !isInitialized) {
        console.log('Kakao SDK found, initializing...');
        const apiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
        if (apiKey) {
          window.Kakao.init(apiKey);
          console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
          setIsInitialized(true);
        } else {
          console.error('NEXT_PUBLIC_KAKAO_API_KEY is not set');
        }
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [isInitialized]);

  if (!isInitialized) {
    return null;
  }

  const addChannel = () => {
    if (window.Kakao) {
      window.Kakao.Channel.addChannel({
        channelPublicId: '_xfSERG'
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={addChannel}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
      >
        <img src="/images/kakao-icon.png" alt="Kakao" className="w-6 h-6" />
        <span>카카오톡 채널 추가</span>
      </button>
    </div>
  );
} 