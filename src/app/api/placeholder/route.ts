import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '이미지 준비중';
  const width = parseInt(searchParams.get('width') || '400');
  const height = parseInt(searchParams.get('height') || '300');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          background: '#f3f4f6',
          color: '#6b7280',
        }}
      >
        {text}
      </div>
    ),
    {
      width,
      height,
    }
  );
} 