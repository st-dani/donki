import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import KakaoInitializer from '@/components/KakaoInitializer';
import Script from 'next/script';

const LoadingProgress = dynamic(() => import('@/components/LoadingProgress'), {
  ssr: false
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

declare global {
  interface Window {
    Kakao: any;
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E6A600' },
    { media: '(prefers-color-scheme: dark)', color: '#E6A600' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://donquixote.com'),
  title: {
    default: '돈키호테 푸드트럭 - 프리미엄 푸드트럭 서비스',
    template: '%s | 돈키호테 푸드트럭'
  },
  description: '특별한 푸드트럭 경험을 제공하는 돈키호테 푸드트럭. 기업 행사, 복지 마케팅, 브랜드 프로모션을 위한 최고의 파트너입니다.',
  keywords: ['푸드트럭', '케이터링', '기업행사', '복지마케팅', '브랜드프로모션', '푸드서비스'],
  authors: [{ name: '돈키호테 푸드트럭' }],
  creator: '돈키호테 푸드트럭',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://donquixote.com',
    siteName: '돈키호테 푸드트럭',
    title: '돈키호테 푸드트럭 - 프리미엄 푸드트럭 서비스',
    description: '특별한 푸드트럭 경험을 제공하는 돈키호테 푸드트럭. 기업 행사, 복지 마케팅, 브랜드 프로모션을 위한 최고의 파트너입니다.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '돈키호테 푸드트럭'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '돈키호테 푸드트럭 - 프리미엄 푸드트럭 서비스',
    description: '특별한 푸드트럭 경험을 제공하는 돈키호테 푸드트럭. 기업 행사, 복지 마케팅, 브랜드 프로모션을 위한 최고의 파트너입니다.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="text/javascript"
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          async
        ></script>
      </head>
      <body className={`${notoSansKr.className} antialiased min-h-screen flex flex-col`}>
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
        <KakaoInitializer />
      </body>
    </html>
  );
}
