import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { EstimateStatus } from '@/generated/prisma';

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



export async function POST(request: Request) {
  console.log('[상담문의] 처리 시작');
  try {
    const data = await request.json();
    console.log('[상담문의] 받은 데이터:', data);

    // --- 데이터베이스 저장 로직 시작 --- 
    const { name, phone, service, date, location, attendees, details, email } = data;

    // --- 데이터 검증 로직 ---
    if (!name || !phone || !service || !date || !location || !attendees) {
      console.error('[상담문의] 필수 필드 누락:', { name, phone, service, date, location, attendees, email, details });
      return new Response('필수 입력 항목이 누락되었습니다.', { status: 400, headers: { 'Content-Type': 'text/plain' } });
    }

    const attendeesNumber = parseInt(attendees, 10);
    if (isNaN(attendeesNumber)) {
      console.error('[상담문의] 잘못된 인원 수:', attendees);
      return new Response('예상 인원은 숫자로 입력해야 합니다.', { status: 400, headers: { 'Content-Type': 'text/plain' } });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        console.error('[상담문의] 잘못된 날짜 형식:', date);
        return new Response('유효하지 않은 날짜 형식입니다.', { status: 400, headers: { 'Content-Type': 'text/plain' } });
    }
    // --- 데이터 검증 로직 끝 ---

    const newEstimate = await prisma.estimate.create({
      data: {
        name,
        phone,
        email: email || null,
        service: service,
        date: parsedDate,
        location,
        attendees: attendeesNumber,
        details: details || null,
        status: EstimateStatus.PENDING,
      },
    });
    console.log('[상담문의] 데이터베이스 저장 성공:', newEstimate);

    // --- 이메일 전송 로직 (별도 try-catch로 분리) ---
    try {
      if (!process.env.EMAIL_PASS) {
        console.log('[상담문의] 이메일 비밀번호가 설정되지 않아 전송을 건너뜁니다.');
      } else {
        const adminContent = `
[새로운 상담문의]

신청자 정보:
- 이름: ${name}
- 연락처: ${phone}
- 이메일: ${email || '미입력'}

행사 정보:
- 행사 종류: ${service}
- 행사 날짜: ${date}
- 예상 인원: ${attendees}명
- 행사 장소: ${location}

추가 요청사항:
${details || '없음'}

문의 시간: ${new Date().toLocaleString('ko-KR')}
        `.trim();

        await transporter.sendMail({
          from: {
            name: '돈키호테 상담문의',
            address: 'dkim13112@gmail.com'
          },
          to: 'dkim13112@gmail.com',
          subject: '[돈키호테] 새로운 상담문의',
          text: adminContent,
        });
        console.log('[상담문의] 관리자 이메일 전송 완료');

        if (email) {
          const customerEmailContent = `
안녕하세요, ${name}님

돈키호테 푸드트럭 상담문의를 접수해 주셔서 감사합니다.
문의하신 내용이 정상적으로 접수되었으며, 빠른 시일 내에 연락드리도록 하겠습니다.

[접수하신 내용]
- 행사 종류: ${service}
- 행사 날짜: ${date}
- 예상 인원: ${attendees}명
- 행사 장소: ${location}

추가 요청사항:
${details || '없음'}

문의사항이 있으시면 언제든 연락주세요:
전화: 010-4680-5447
카카오톡: @돈키호테

감사합니다.
돈키호테 푸드트럭 드림
          `;
          await transporter.sendMail({
            from: {
              name: '돈키호테 푸드트럭',
              address: 'dkim13112@gmail.com'
            },
            to: email,
            subject: '[돈키호테] 상담 문의가 접수되었습니다',
            text: customerEmailContent,
          });
          console.log('[상담문의] 고객 이메일 전송 완료');
        }
      }
    } catch (emailError) {
      console.error('[상담문의] 이메일 전송 실패:', emailError);
      // 이메일 전송 실패는 클라이언트에게 오류로 응답하지 않음.
      // 데이터베이스 저장은 성공했으므로 성공으로 간주.
    }

    return NextResponse.json({ 
      message: '상담문의가 성공적으로 처리되었습니다.',
      success: true,
    });
  } catch (error) {
    console.error('[상담문의] 처리 중 심각한 오류 발생:', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      { message: '상담문의 처리 중 오류가 발생했습니다.', success: false },
      { status: 500 }
    );
  }
}