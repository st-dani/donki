'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    // 페이지 뷰 트래킹
    trackPageView(url);
  }, [pathname, searchParams]);

  return {
    trackEvent: (eventName: string, properties?: Record<string, any>) => {
      // 이벤트 트래킹
      console.log(`[Analytics] Event: ${eventName}`, properties);
      // 실제 구현시 Google Analytics나 다른 분석 도구로 대체
    }
  };
}

function trackPageView(url: string) {
  console.log(`[Analytics] Page View: ${url}`);
  // 실제 구현시 Google Analytics나 다른 분석 도구로 대체
} 