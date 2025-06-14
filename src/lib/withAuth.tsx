'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function withAuth(Component: React.ComponentType<any>) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('/api/admin/auth/check');
          const data = await response.json();

          if (data.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            console.log('인증되지 않은 사용자, 로그인 페이지로 리다이렉트');
            router.push('/admin/login');
          }
        } catch (error) {
          console.error('인증 확인 중 오류 발생:', error);
          router.push('/admin/login');
        }
      };

      checkAuth();
    }, [router]);

    if (isAuthenticated === null) {
      // 로딩 상태
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-600"></div>
        </div>
      );
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
