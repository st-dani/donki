import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EstimateStatus } from '@/generated/prisma';
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

// 상태 메시지 한국어 변환
const getStatusMessage = (status: EstimateStatus): string => {
  switch (status) {
    case EstimateStatus.PENDING:
      return '문의대기';
    case EstimateStatus.CONFIRMED:
      return '확인되었습니다';
    case EstimateStatus.REPLIED:
      return '답변완료되었습니다';
    case EstimateStatus.IN_PROGRESS:
      return '행사 준비중입니다';
    case EstimateStatus.COMPLETED:
      return '행사가 완료되었습니다';
    default:
      return '상태가 변경되었습니다';
  }
};

// 이메일 알림 발송 함수
const sendStatusUpdateEmail = async (estimate: any, newStatus: EstimateStatus) => {
  // 고객 이메일이 없으면 발송하지 않음
  if (!estimate.email) return { emailSent: false };
  
  try {
    const statusMessage = getStatusMessage(newStatus);
    
    const customerEmailContent = `
안녕하세요, ${estimate.name}님

돈키호테 푸드트럭 상담문의의 상태가 변경되었습니다.

[상담문의 상태 변경]: ${statusMessage}

[접수하신 내용]
- 행사 종류: ${estimate.service}
- 행사 날짜: ${new Date(estimate.date).toLocaleDateString()}
- 예상 인원: ${estimate.attendees}명
- 행사 장소: ${estimate.location}

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
      to: estimate.email,
      subject: `[돈키호테] 상담문의 상태가 변경되었습니다 (${statusMessage})`,
      text: customerEmailContent,
    });
    
    return { emailSent: true };
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return { emailSent: false, error };
  }
};

interface PatchRequestBody {
  status?: EstimateStatus;
  adminNotes?: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: PatchRequestBody = await req.json();

    // status 또는 adminNotes만 업데이트 가능
    if (!body.status && body.adminNotes === undefined) {
      return NextResponse.json(
        { message: '유효하지 않은 업데이트 요청입니다.' },
        { status: 400 }
      );
    }

    // status가 유효한 EstimateStatus 값인지 확인
    if (body.status && !Object.values(EstimateStatus).includes(body.status)) {
      return NextResponse.json(
        { message: '유효하지 않은 상태값입니다.' },
        { status: 400 }
      );
    }

    // 기존 견적 데이터 조회 (이메일 알림용)
    const existingEstimate = await prisma.estimate.findUnique({
      where: { id },
    });

    if (!existingEstimate) {
      return NextResponse.json(
        { message: '견적을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const updateData: { status?: EstimateStatus; adminNotes?: string } = {};
    if (body.status) updateData.status = body.status;
    if (body.adminNotes !== undefined) updateData.adminNotes = body.adminNotes;

    const updatedEstimate = await prisma.estimate.update({
      where: { id },
      data: updateData,
    });

    // 상태가 변경되었으면 이메일 알림 발송
    let emailResult = { emailSent: false };
    if (body.status && existingEstimate.status !== body.status) {
      emailResult = await sendStatusUpdateEmail(updatedEstimate, body.status);
    }

    // 업데이트된 견적과 이메일 발송 결과 함께 응답
    return NextResponse.json({
      ...updatedEstimate,
      _emailResult: emailResult
    });
  } catch (error) {
    console.error('견적 업데이트 중 오류 발생:', error);
    return NextResponse.json(
      { message: '견적 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deletedEstimate = await prisma.estimate.delete({
      where: { id },
    });
    return NextResponse.json(deletedEstimate);
  } catch (error) {
    console.error(`Error deleting estimate ${id}:`, error);
    return NextResponse.json(
      { error: `Failed to delete estimate ${id}` },
      { status: 500 }
    );
  }
}
