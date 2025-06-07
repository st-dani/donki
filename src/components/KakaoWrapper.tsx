'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// const KakaoInitializer = dynamic(() => import('@/components/KakaoInitializer'), {
//   ssr: false
// });

// const KakaoChannel = dynamic(() => import('@/components/KakaoChannel'), {
//   ssr: false
// });

// const KakaoScript = dynamic(() => import('@/components/KakaoScript'), {
//   ssr: false
// });

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoWrapper() {
  return (
    <>
      {/* <KakaoScript /> */}
      <Suspense fallback={null}>
        {/* <KakaoInitializer /> */}
        {/* <KakaoChannel 
          type="floating"
          channelPublicId="_xfSERG"
        /> */}
      </Suspense>
    </>
  );
} 