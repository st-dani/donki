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

// 카카오톡 메시지 전송 함수
async function sendKakaoMessage(content: string) {
  try {
    console.log('=== 카카오톡 메시지 전송 디버깅 시작 ===');
    console.log('환경변수 체크:');
    console.log('- KAKAO_CHANNEL_ID:', process.env.KAKAO_CHANNEL_ID);
    console.log('- KAKAO_REST_API_KEY 길이:', process.env.KAKAO_REST_API_KEY?.length);
    
    if (!process.env.KAKAO_CHANNEL_ID) {
      throw new Error('카카오 채널 ID가 설정되지 않았습니다.');
    }

    if (!process.env.KAKAO_REST_API_KEY) {
      throw new Error('카카오 REST API 키가 설정되지 않았습니다.');
    }
    
    // 메시지 데이터
    const messageData = {
      channel_id: process.env.KAKAO_CHANNEL_ID,
      template_object: JSON.stringify({
        object_type: 'feed',
        content: {
          title: '새로운 견적 문의가 도착했습니다',
          description: content.substring(0, 200), // 최대 200자로 제한
          image_url: 'https://donki-sepia.vercel.app/images/logo.png',
          link: {
            web_url: 'https://donki-sepia.vercel.app',
            mobile_web_url: 'https://donki-sepia.vercel.app'
          }
        },
        buttons: [
          {
            title: '웹사이트로 이동',
            link: {
              web_url: 'https://donki-sepia.vercel.app',
              mobile_web_url: 'https://donki-sepia.vercel.app'
            }
          }
        ]
      })
    };
    
    console.log('API 요청 데이터:');
    console.log(JSON.stringify(messageData, null, 2));
    
    console.log('API 호출 시작...');
    const response = await fetch('https://kapi.kakao.com/v1/api/talk/channel/message/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
      },
      body: new URLSearchParams({
        channel_id: messageData.channel_id,
        template_object: messageData.template_object
      }),
    });

    console.log('API 응답 받음:');
    console.log('- 상태 코드:', response.status);
    console.log('- 상태 텍스트:', response.statusText);
    
    const responseText = await response.text();
    console.log('- 응답 텍스트:', responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('- 응답 데이터:', JSON.stringify(responseData, null, 2));
    } catch (error: any) {
      console.log('- JSON 파싱 실패:', error.message);
    }

    if (!response.ok) {
      throw new Error(`카카오톡 메시지 전송 실패: ${response.status} ${response.statusText}\n응답: ${responseText}`);
    }

    console.log('카카오톡 메시지 전송 성공');
    console.log('=== 카카오톡 메시지 전송 디버깅 종료 ===');
    return true;
  } catch (error) {
    console.error('카카오톡 메시지 전송 중 오류 발생:');
    console.error(error);
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
이름: ${data.name}
연락처: ${data.phone}
이메일: ${data.email}

행사 정보:
행사 종류: ${data.eventType}
행사 날짜: ${data.date}
예상 인원: ${data.attendees}명
행사 장소: ${data.location}

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

    // 카카오톡으로 관리자에게 알림 전송
    console.log('[견적문의] 카카오톡 알림 전송 시작');
    if (process.env.KAKAO_REST_API_KEY) {
      const kakaoResult = await sendKakaoMessage(adminContent);
      if (!kakaoResult) {
        console.error('[견적문의] 카카오톡 메시지 전송 실패');
      } else {
        console.log('[견적문의] 카카오톡 메시지 전송 성공');
      }
    } else {
      console.error('[견적문의] 카카오톡 REST API 키가 설정되지 않았습니다.');
    }

    console.log('[견적문의] 처리 완료');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[견적문의] 처리 중 오류:', error);
    return NextResponse.json(
      { error: '견적 문의 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 