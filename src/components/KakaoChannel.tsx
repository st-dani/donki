import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoChannel() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleAddChannel = () => {
    if (window.Kakao) {
      window.Kakao.Channel.addChannel({
        channelPublicId: '_xnzlJn'
      });
    }
  };

  const handleStartChat = () => {
    if (window.Kakao) {
      window.Kakao.Channel.chat({
        channelPublicId: '_xnzlJn'
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4 items-center">
      <button
        onClick={handleAddChannel}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
      >
        <img 
          src="/images/kakao-logo.png" 
          alt="Kakao Logo" 
          className="w-6 h-6"
        />
        <span>채널 추가하기</span>
      </button>
      
      <button
        onClick={handleStartChat}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
      >
        <img 
          src="/images/kakao-logo.png" 
          alt="Kakao Logo" 
          className="w-6 h-6"
        />
        <span>채팅 시작하기</span>
      </button>
    </div>
  );
} 