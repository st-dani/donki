// web-push 모듈 오류 해결을 위한 수정
import * as webpush from 'web-push';

// 타입 정의
export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// VAPID 키 설정 (실제 환경에서는 .env 파일에서 가져와야 함)
const vapidPublicKey = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY || '';
const vapidPrivateKey = process.env.WEB_PUSH_PRIVATE_KEY || '';

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    'mailto:example@example.com',
    vapidPublicKey,
    vapidPrivateKey
  );
}

// 푸시 알림 함수
export async function sendPushNotification(
  subscription: PushSubscription,
  payload: string
) {
  try {
    if (!vapidPublicKey || !vapidPrivateKey) {
      console.log('VAPID 키가 설정되지 않아 푸시 알림이 비활성화되었습니다');
      return;
    }
    
    await webpush.sendNotification(
      subscription as webpush.PushSubscription,
      payload
    );
  } catch (error) {
    console.error('푸시 알림 전송 중 오류 발생:', error);
  }
  return;
}