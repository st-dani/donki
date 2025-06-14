import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { redirect } from 'next/navigation';

export type AdminJwtPayload = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  iat: number;
  exp: number;
};

/**
 * 서버 컴포넌트에서 관리자 인증 확인
 * @returns 인증된 관리자 정보 또는 리다이렉트
 */
export async function getAuthenticatedAdmin() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production'
    ) as AdminJwtPayload;

    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };
  } catch (error) {
    redirect('/admin/login');
  }
}

/**
 * 클라이언트 컴포넌트에서 관리자 인증 확인
 * @returns 인증 상태
 */
export async function checkAuthStatus() {
  try {
    const response = await fetch('/api/admin/auth/check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return { isAuthenticated: false, user: null };
    }

    const data = await response.json();
    return {
      isAuthenticated: data.isAuthenticated,
      user: data.user || null,
    };
  } catch (error) {
    console.error('인증 확인 중 오류:', error);
    return { isAuthenticated: false, user: null };
  }
}
