import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

type AdminJwtPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function GET(request: NextRequest) {
  try {
    // 쿠키 혹은 Authorization 헤더에서 토큰 가져오기
    let token = request.cookies.get('adminToken')?.value;
    
    // 이전 쿠키 이름도 확인 (호환성을 위해)
    if (!token) {
      token = request.cookies.get('admin_token')?.value;
    }
    
    // 쿠키에 토큰이 없으면 Authorization 헤더 확인
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json(
        { 
          isAuthenticated: false, 
          message: '인증되지 않았습니다.' 
        },
        { status: 401 }
      );
    }

    try {
      // 토큰 검증
      const secretKey = new TextEncoder().encode(
        process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production'
      );
      
      const { payload } = await jose.jwtVerify(token, secretKey);
      const decoded = payload as unknown as AdminJwtPayload;

      return NextResponse.json(
        { 
          isAuthenticated: true, 
          user: {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role
          }
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { 
          isAuthenticated: false, 
          message: '유효하지 않은 토큰입니다.' 
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('인증 확인 중 오류 발생:', error);
    return NextResponse.json(
      { 
        isAuthenticated: false, 
        message: '인증 확인 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}
