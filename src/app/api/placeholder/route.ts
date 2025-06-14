import { NextResponse } from 'next/server';

// 이미지 응답이 필요하지만 임시로 JSON 응답으로 대체
// Edge 런타임에서 JSX 구문 오류 방지
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '이미지 준비중';
  const width = parseInt(searchParams.get('width') || '400');
  const height = parseInt(searchParams.get('height') || '300');
  
  return NextResponse.json({
    message: text,
    dimensions: { width, height },
    info: '이미지 응답 대신 임시로 JSON 응답으로 대체되었습니다',
  });
}