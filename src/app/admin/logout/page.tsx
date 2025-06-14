'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // 로그아웃 API 호출
        const response = await fetch('/api/admin/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('로그아웃 처리 중 오류가 발생했습니다.');
        }
        
        // 로그아웃 후 로그인 페이지로 리다이렉트
        router.push('/admin/login');
        router.refresh(); // 세션 상태가 변경되었으므로 라우터 갱신
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
        // 오류가 발생해도 로그인 페이지로 리다이렉트
        router.push('/admin/login');
      }
    };

    logout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">로그아웃 처리 중...</h2>
        <p className="text-gray-500 mt-2">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
