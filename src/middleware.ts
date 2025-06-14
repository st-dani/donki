import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose'; // jsonwebtoken 대신 jose 사용

// 미들웨어가 실행될 경로 패턴 정의
export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest) {
  // 로그인 페이지는 인증 검사에서 제외
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production';

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // 토큰 검증을 위한 시크릿 키 설정 (텍스트를 바이트로 변환)
    const secretKey = new TextEncoder().encode(jwtSecret);
    
    // jose 라이브러리로 토큰 검증
    await jose.jwtVerify(token, secretKey);
    console.log('인증 성공: ', request.nextUrl.pathname);
    return NextResponse.next();
  } catch (error) {
    // 유효하지 않은 토큰인 경우 로그인 페이지로 리다이렉트
    console.error('인증 실패:', error);
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}
