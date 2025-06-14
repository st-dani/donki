'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

export default function RootLayoutClient({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname ? pathname.startsWith('/admin') : false;

  return (
    <body className={className}>
      <ServiceWorkerRegistration />
      {!isAdminPage && <Navbar />}
      <div className={`flex-grow ${!isAdminPage ? 'pt-16' : 'pt-0'}`}>
        {children}
      </div>
      {!isAdminPage && <CTASection />}
      {!isAdminPage && <Footer />}
      <Toaster />
    </body>
  );
}