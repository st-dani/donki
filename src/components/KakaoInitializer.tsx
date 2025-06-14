'use client';

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoInitializer() {
  const initializeKakao = useCallback(() => {
    if (!window.Kakao) {
      console.warn('Kakao SDK not loaded');
      return false;
    }

    if (window.Kakao.isInitialized()) {
      console.log('Kakao SDK already initialized');
      return true;
    }

    const apiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    if (!apiKey) {
      console.error('NEXT_PUBLIC_KAKAO_API_KEY is not set');
      return false;
    }

    try {
      window.Kakao.init(apiKey);
      console.log('Kakao SDK initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Kakao SDK:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    if (document.readyState === 'complete') {
      initializeKakao();
    } else {
      const handleLoad = () => {
        const success = initializeKakao();
        if (success) {
          window.removeEventListener('load', handleLoad);
        }
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [initializeKakao]);

  return null;
} 