'use client';

import { useCallback, useState } from 'react';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface KakaoChannelProps {
  type?: 'floating' | 'inline';
  channelPublicId?: string;
}

export default function KakaoChannel({ 
  type = 'inline',
  channelPublicId = '_xfSERG'  // 기본값 제공
}: KakaoChannelProps) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = () => {
      if (window.Kakao?.Channel && window.Kakao.isInitialized()) {
        setIsAvailable(true);
      }
    };

    checkAvailability();
    window.addEventListener('load', checkAvailability);
    
    return () => window.removeEventListener('load', checkAvailability);
  }, []);

  const addChannel = useCallback(() => {
    if (!isAvailable) {
      console.warn('Kakao SDK not ready');
      return;
    }

    try {
      window.Kakao.Channel.addChannel({
        channelPublicId
      });
    } catch (error) {
      console.error('Failed to add Kakao channel:', error);
    }
  }, [channelPublicId, isAvailable]);

  if (!isAvailable) return null;

  if (type === 'floating') {
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

  return (
    <button
      onClick={addChannel}
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center space-x-2"
    >
      <img src="/images/kakao-icon.png" alt="Kakao" className="w-6 h-6" />
      <span>카카오톡 채널 추가</span>
    </button>
  );
} 