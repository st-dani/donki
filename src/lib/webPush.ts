// web-push 라이브러리 임시 제거 (향후 다시 활성화 예정)

// 임시 타입 정의
export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// 임시 비활성화된 푸시 알림 함수
export async function sendPushNotification(
  subscription: PushSubscription,
  payload: string
) {
  console.log('푸시 알림 기능이 임시로 비활성화되었습니다', {
    subscription,
    payload
  });
  return;
}