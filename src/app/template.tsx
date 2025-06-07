'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
  return (
    <>
      <Suspense>
        <LoadingProgress />
      </Suspense>
      <Navigation />
      <main className="flex-grow">
        <ClientLayout>
          <Suspense fallback={<LoadingProgress />}>
            {children}
          </Suspense>
        </ClientLayout>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <KakaoWrapper />
      </Suspense>
    </>
  );
} 