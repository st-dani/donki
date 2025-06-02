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
        className="bg-[#FFE812] hover:bg-[#FFE200] text-black px-4 py-2 rounded-full shadow-lg flex items-center space-x-1.5 font-medium"
        style={{
          minWidth: '100px',
          borderRadius: '100px'
        }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M2 8.5C2 4.5 5.5 1 10 1C14.5 1 18 4.5 18 8.5C18 12.5 14.5 16 10 16L8.5 19L7 16C4.2 15 2 12 2 8.5Z" 
            fill="black"
          />
        </svg>
        <span className="text-black font-medium">문의</span>
      </button>
    </div>
  );
} 