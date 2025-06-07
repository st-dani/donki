import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 이메일 전송을 위한 설정
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'dkim13112@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});

async function sendToZapier(data: any) {
  const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL;

  try {
    console.log('[견적문의] Zapier 웹훅 전송 시작');
    const response = await fetch(ZAPIER_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('[견적문의] Zapier 웹훅 전송 성공:', result);
    return true;
  } catch (error) {
    console.error('[견적문의] Zapier 웹훅 전송 실패:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    console.log('[견적문의] 처리 시작');
    const data = await request.json();
    console.log('[견적문의] 받은 데이터:', data);
    
    // 관리자용 메시지 내용
    const adminContent = `
[새로운 견적 문의]

신청자 정보:
- 이름: ${data.name}
- 연락처: ${data.phone}
- 이메일: ${data.email || '미입력'}

행사 정보:
- 행사 종류: ${data.eventType}
- 행사 날짜: ${data.date}
- 예상 인원: ${data.attendees}명
- 행사 장소: ${data.location}

추가 요청사항:
${data.details || '없음'}

문의 시간: ${new Date().toLocaleString('ko-KR')}
    `.trim();

    // 고객용 이메일 내용
    const customerEmailContent = `
      안녕하세요, ${data.name}님

      돈키호테 푸드트럭 견적 문의를 접수해 주셔서 감사합니다.
      문의하신 내용이 정상적으로 접수되었으며, 빠른 시일 내에 연락드리도록 하겠습니다.

      [접수하신 내용]
      행사 종류: ${data.eventType}
      행사 날짜: ${data.date}
      예상 인원: ${data.attendees}명
      행사 장소: ${data.location}
      
      추가 요청사항:
      ${data.details || '없음'}

      문의사항이 있으시면 언제든 연락주세요:
      전화: 010-4680-5447
      카카오톡: @돈키호테

      감사합니다.
      돈키호테 푸드트럭 드림
    `;

    console.log('[견적문의] 이메일 전송 시작');
    
    // 관리자에게 이메일 전송
    await transporter.sendMail({
      from: {
        name: '돈키호테 견적문의',
        address: 'dkim13112@gmail.com'
      },
      to: 'dkim13112@gmail.com',
      subject: '[돈키호테] 새로운 견적 문의',
      text: adminContent,
    });

    console.log('[견적문의] 관리자 이메일 전송 완료');

    // 고객 이메일이 있는 경우에만 확인 메일 전송
    if (data.email) {
      console.log('[견적문의] 고객 이메일 전송 시작');
      await transporter.sendMail({
        from: {
          name: '돈키호테 푸드트럭',
          address: 'dkim13112@gmail.com'
        },
        to: data.email,
        subject: '[돈키호테] 견적 문의가 접수되었습니다',
        text: customerEmailContent,
      });
      console.log('[견적문의] 고객 이메일 전송 완료');
    }

    // Zapier로 데이터 전송
    const zapierResult = await sendToZapier({
      name: data.name,
      phone: data.phone,
      email: data.email,
      eventType: data.eventType,
      date: data.date,
      attendees: data.attendees,
      location: data.location,
      details: data.details,
      timestamp: new Date().toISOString()
    });

    console.log('[견적문의] 처리 완료');
    return NextResponse.json({ 
      success: true,
      emailSent: true,
      zapierSent: zapierResult
    });
  } catch (error) {
    console.error('[견적문의] 처리 중 오류:', error);
    return NextResponse.json(
      { success: false, error: '견적 문의 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 