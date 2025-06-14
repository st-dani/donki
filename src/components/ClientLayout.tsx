'use client';

import { Suspense } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-theme-mint-600"></div>
      </div>
    }>
      {children}
    </Suspense>
  );
} 