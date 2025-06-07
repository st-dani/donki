import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    console.log('=== Telegram Test API ===');
    
    // 환경변수 확인
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log('Environment Variables:');
    console.log('BOT_TOKEN exists:', !!botToken);
    console.log('BOT_TOKEN length:', botToken?.length);
    console.log('CHAT_ID:', chatId);

    // 테스트 메시지 전송
    const testMessage = `
<b>🔔 텔레그램 테스트</b>

이것은 테스트 메시지입니다.
시간: ${new Date().toLocaleString('ko-KR')}
    `.trim();

    const result = await sendTelegramMessage(testMessage);

    return NextResponse.json({
      success: result,
      environmentCheck: {
        hasBotToken: !!botToken,
        botTokenLength: botToken?.length,
        chatId: chatId
      }
    });
  } catch (error: any) {
    console.error('Test API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 