'use client';

import { useEffect, useState } from 'react';

export default function NotificationSubscribe() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // 브라우저 지원 여부 확인
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setIsSupported(false);
      return;
    }

    // 현재 구독 상태 확인
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    return btoa(String.fromCharCode(...bytes));
  };

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;

      // 공개 키로 구독
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      // 서버에 구독 정보 저장
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          keys: {
            p256dh: arrayBufferToBase64(subscription.getKey('p256dh') || new ArrayBuffer(0)),
            auth: arrayBufferToBase64(subscription.getKey('auth') || new ArrayBuffer(0)),
          },
          userAgent: navigator.userAgent,
        }),
      });

      setIsSubscribed(true);
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={subscribe}
      disabled={isSubscribed}
      className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
        isSubscribed
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-indigo-600 hover:bg-indigo-700'
      }`}
    >
      {isSubscribed ? '알림 구독중' : '알림 구독하기'}
    </button>
  );
} 