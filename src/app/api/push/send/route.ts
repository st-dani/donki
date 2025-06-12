import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPushNotification } from '@/lib/webPush';
import { PushSubscription } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const { title, body, url } = await request.json();

    // 모든 구독자 가져오기
    const subscriptions = await prisma.pushSubscription.findMany();

    // 각 구독자에게 알림 전송
    const notifications = subscriptions.map((sub: PushSubscription) => {
      const subscription = {
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