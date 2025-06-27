import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '../../../../../generated/prisma';

const prisma = new PrismaClient();

// Prisma 스키마와 정확히 매칭되는 팝업 타입 상수
enum PopupType {
  NOTICE = "NOTICE",
  EVENT = "EVENT"
}

/**
 * 모든 팝업 목록 조회 (관리자용)
 */
export async function GET() {
  try {
    // 데이터베이스에서 모든 팝업 조회
    const popups = await prisma.popup.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    
    return NextResponse.json({ popups }, { status: 200 });
  } catch (error) {
    console.error('팝업 목록 조회 오류:', error);
    return NextResponse.json({ 
      error: '팝업 조회 중 오류가 발생했습니다.',
      popups: [] 
    }, { status: 500 });
  }
}

/**
 * 새 팝업 생성
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = JSON.parse(JSON.stringify(body));
    
    console.log('팝업 생성 요청 데이터:', JSON.stringify(data, null, 2));
    
    // EVENT 타입인 경우 이미지 필수 검증, NOTICE는 이미지 선택사항
    if (data.type === PopupType.EVENT && !data.imageUrl) {
      return NextResponse.json({
        error: '이미지 URL은 배너/이벤트 팝업에서 필수 필드입니다.'
      }, { status: 400 });
    }
    
    // 타입 처리 - 유효한 PopupType 값인지 확인
    let popupType;
    
    if (data.type) {
      const upperType = data.type.toUpperCase();
      
      // 타입이 유효한지 확인
      if (upperType === PopupType.NOTICE || upperType === PopupType.EVENT) {
        popupType = upperType as PopupType;
      } else {
        return NextResponse.json({
          error: `타입은 NOTICE 또는 EVENT 중 하나여야 합니다. 입력된 값: ${data.type}`
        }, { status: 400 });
      }
    } else {
      // 기본값 설정
      popupType = PopupType.NOTICE;
    }
    
    // 날짜 필드 처리
    let startDate = new Date();
    let endDate = null;
    
    try {
      if (data.startDate) {
        startDate = new Date(data.startDate);
      }
      
      if (data.endDate && data.endDate.trim() !== '') {
        endDate = new Date(data.endDate);
      }
    } catch (dateError) {
      console.error('날짜 파싱 오류:', dateError);
      return NextResponse.json({
        error: '유효하지 않은 날짜 형식입니다.'
      }, { status: 400 });
    }
    
    // 새 팝업 생성을 위한 데이터 구성
    const popupData = {
      // title은 NULL 가능
      title: data.title === '' || data.title === null ? null : data.title,
      // content는 NOT NULL 제약조건 때문에 반드시 빈 문자열로 설정
      content: data.content === '' || data.content === null ? '' : data.content,
      type: popupType, // PopupType enum과 정확히 매칭
      // NOTICE 타입에서 이미지가 없는 경우 null 허용
      imageUrl: data.imageUrl || (popupType === PopupType.NOTICE ? null : undefined),
      // linkUrl는 NULL 가능
      linkUrl: data.linkUrl === '' || data.linkUrl === null ? null : data.linkUrl,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      startDate,
      endDate,
      order: data.order !== undefined ? Number(data.order) || 0 : 0
    };
    
    console.log('생성할 팝업 데이터:', JSON.stringify(popupData, null, 2));
    
    // 새 팝업 생성 전 데이터 추가 확인
    console.log('생성 직전 팝업 데이터:', {
      title: popupData.title,
      contentLength: popupData.content ? popupData.content.length : 0,
      type: popupData.type,
      hasImage: !!popupData.imageUrl,
    });
    
    // Prisma로 새 팝업 생성 시도
    let newPopup;
    try {
      newPopup = await prisma.popup.create({
        data: {
          title: popupData.title,
          // content는 절대 null이 될 수 없도록 하기
          content: popupData.content || '',
          type: popupData.type,
          imageUrl: popupData.imageUrl,  // NOTICE에서는 null 가능, EVENT는 위에서 이미 필수 감증함
          linkUrl: popupData.linkUrl,
          isActive: popupData.isActive,
          startDate: popupData.startDate,
          endDate: popupData.endDate,
          order: popupData.order,
        }
      });
    } catch (error) {
      console.error('팝업 생성 중 오류:', error);
      return NextResponse.json({
        error: `팝업 생성 중 오류가 발생했습니다.: \n${error instanceof Error ? error.message : String(error)}`,
        originalData: JSON.stringify(data)
      }, { status: 500 });
    }
    
    console.log('생성된 팝업:', JSON.stringify(newPopup, null, 2));
    
    return NextResponse.json({
      message: '팝업이 성공적으로 생성되었습니다.',
      popup: newPopup
    }, { status: 201 });
  } catch (error: any) {
    console.error('팝업 생성 오류:', error);
    console.error('오류 상세 정보:', error.stack || error.message || error);
    
    return NextResponse.json({ 
      error: '팝업 생성 중 오류가 발생했습니다.' + (error.message ? `: ${error.message}` : '')
    }, { status: 500 });
  }
}
