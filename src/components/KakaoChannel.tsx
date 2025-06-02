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
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }

        if (type === 'floating') {
          // 채팅 버튼 생성
          window.Kakao.Channel.createChatButton({
            container: '#kakao-chat-button',
            channelPublicId: '_xnzlJn',
            size: 'large',
            supportMultipleDensities: true
          });
        }
      }
    };
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
      <div id="kakao-chat-button"></div>
    </div>
  );
} 