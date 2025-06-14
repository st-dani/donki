import { NextResponse } from 'next/server';

// Edge 런타임에서 사용 안함
// export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '이미지 준비중';
  const width = parseInt(searchParams.get('width') || '400');
  const height = parseInt(searchParams.get('height') || '300');
  
  // ImageResponse 대신 JSON으로 대체
  return NextResponse.json({
    message: text,
    dimensions: { width, height },
    info: '이미지 응답 대신 임시로 JSON 응답으로 대체되었습니다',
  });
}