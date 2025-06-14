'use client';

import Script from 'next/script';

export default function KakaoScript() {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.min.js"
      strategy="beforeInteractive"
    />
  );
} 