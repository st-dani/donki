'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoInitializer() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.min.js"
      strategy="afterInteractive"
    />
  );
} 