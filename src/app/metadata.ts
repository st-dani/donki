import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL('https://donquixote.com'),
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
    url: 'https://donquixote.com',
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