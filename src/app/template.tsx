'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navigation from "@/components/Navigation";

import ClientLayout from "@/components/ClientLayout";

const LoadingProgress = dynamic(() => import('@/components/LoadingProgress'), {
  ssr: false
});

const KakaoWrapper = dynamic(() => import('@/components/KakaoWrapper'), {
  ssr: false
});

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname ? pathname.startsWith('/admin') : false;

  return (
    <>
      <Suspense>
        <LoadingProgress />
      </Suspense>
      {!isAdminPage && <Navigation />}
      <main className="flex-grow">
        <ClientLayout>
          <Suspense fallback={<LoadingProgress />}>
            {children}
          </Suspense>
        </ClientLayout>
      </main>

      <Suspense fallback={null}>
        <KakaoWrapper />
      </Suspense>
    </>
  );
} 