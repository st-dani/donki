import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '이미지 준비중';
  
  // 임시로 간단한 텍스트 응답으로 대체
  return NextResponse.json({
    message: text,
    info: '이미지 응답 대신 임시로 텍스트 응답으로 대체되었습니다',
  });
}