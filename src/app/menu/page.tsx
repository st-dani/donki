import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MenuClient = dynamic(() => import('@/components/menu/MenuClient'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-theme-mint-600"></div>
    </div>
  ),
  ssr: false
});

export default function MenuPage() {
  return (
    <Suspense>
      <MenuClient />
    </Suspense>
  );
} 