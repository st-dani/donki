'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface KakaoChannelProps {
  type?: 'footer' | 'floating';
}

export default function KakaoChannel({ type = 'footer' }: KakaoChannelProps) {
  useEffect(() => {
    const loadKakaoSDK = async () => {
      try {
        if (window.Kakao) {
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
          }
          
          if (type === 'floating') {
            window.Kakao.Channel.chat({
              channelPublicId: '_xnzlJn'
            });
          }
        }
      } catch (error) {
        console.error('Kakao SDK 초기화 실패:', error);
      }
    };

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
    script.async = true;
    script.onload = loadKakaoSDK;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [type]);

  const handleStartChat = () => {
    if (window.Kakao) {
      window.Kakao.Channel.chat({
        channelPublicId: '_xnzlJn'
      });
    }
  };

  if (type === 'footer') {
    return (
      <button
        onClick={handleStartChat}
        className="text-gray-300 hover:text-yellow-400 transition-colors"
      >
        카카오톡 상담
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleStartChat}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 3C6.48 3 2 6.48 2 12C2 17.52 6.48 21 12 21C17.52 21 22 17.52 22 12C22 6.48 17.52 3 12 3ZM12 19C7.59 19 4 15.41 4 11C4 6.59 7.59 3 12 3C16.41 3 20 6.59 20 11C20 15.41 16.41 19 12 19Z" 
            fill="currentColor"
          />
          <path 
            d="M13 7H11V13H17V11H13V7Z" 
            fill="currentColor"
          />
        </svg>
        <span>채팅 상담</span>
      </button>
    </div>
  );
} 