'use client';

export function useAnalytics() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // 이벤트 트래킹
    console.log(`[Analytics] Event: ${eventName}`, properties);
  };

  return { trackEvent };
} 