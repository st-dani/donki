import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

// 모든 약관 목록 가져오기
export async function GET(request: NextRequest) {
  try {
    // 쿠키에서 토큰 읽기
    const cookieStore = cookies();
    const token = cookieStore.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }
    
    try {
      // JWT 토큰 검증
      verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch (err) {
      return NextResponse.json(
        { message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }
    
    // 약관 모든 목록 가져오기
    const terms = await prisma.terms.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json(terms);
  } catch (error) {
    console.error('GET admin terms error:', error);
    return NextResponse.json(
      { message: '약관 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 새 약관 생성
export async function POST(request: NextRequest) {
  try {
    // 쿠키에서 토큰 읽기
    const cookieStore = cookies();
    const token = cookieStore.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }
    
    try {
      // JWT 토큰 검증
      verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch (err) {
      return NextResponse.json(
        { message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }
    
    const { title, content, version, isActive } = await request.json();

    // 유효성 검사
    if (!title || !content) {
      return NextResponse.json(
        { message: '제목과 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    // 새 약관 생성
    const newTerm = await prisma.terms.create({
      data: {
        title,
        content,
        version: version || null,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    return NextResponse.json(newTerm, { status: 201 });
  } catch (error) {
    console.error('POST admin terms error:', error);
    return NextResponse.json(
      { message: '약관을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
