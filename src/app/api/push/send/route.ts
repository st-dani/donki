import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPushNotification, type PushSubscription } from '@/lib/webPush';

// 데이터베이스 PushSubscription 타입 정의
type DbPushSubscription = {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function POST(request: Request) {
  try {
    const { title, body, url } = await request.json();

    // 모든 구독자 가져오기
    const subscriptions = await prisma.pushSubscription.findMany();

    // 각 구독자에게 알림 전송
    const notifications = subscriptions.map((sub: DbPushSubscription) => {
      // 데이터베이스 객체를 웹푸시 라이브러리 형식으로 변환
      const subscription: PushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      return sendPushNotification(
        subscription,
        JSON.stringify({
          title,
          body,
          url,
        })
      );
    });

    await Promise.all(notifications);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending push notifications:', error);
    return NextResponse.json(
      { message: '알림 전송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 