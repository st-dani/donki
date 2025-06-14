import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const subscription = await request.json();
    const { endpoint, keys, userAgent } = subscription;

    // 알림: PushSubscription 모델이 현재 스키마에 정의되지 않음
    // TODO: Prisma 스키마에 다음 모델을 추가해야 함:
    // model PushSubscription {
    //   id        String   @id @default(cuid())
    //   endpoint  String
    //   p256dh    String
    //   auth      String
    //   userAgent String?
    //   createdAt DateTime @default(now())
    //   updatedAt DateTime @updatedAt
    // }
    
    // 임시 조치: 데이터베이스 작업 스킵
    // await prisma.pushSubscription.create({
    //   data: {
    //     endpoint,
    //     p256dh: keys.p256dh,
    //     auth: keys.auth,
    //     userAgent,
    //   },
    // });
    
    // 구독 정보를 생성하는 대신 로그만 출력
    console.log('Push subscription request received:', { endpoint, keys, userAgent });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving push subscription:', error);
    return NextResponse.json(
      { message: '구독 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 