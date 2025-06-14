import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 응답 객체 생성
    const response = NextResponse.json(
      { message: '로그아웃되었습니다.' },
      { status: 200 }
    );

    // 쿠키 삭제
    response.cookies.set({
      name: 'admin_token',
      value: '',
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('로그아웃 처리 중 오류 발생:', error);
    return NextResponse.json(
      { message: '로그아웃 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
