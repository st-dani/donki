import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 소개 - 돈키호테 푸드트럭",
  description: "새로운 방식의 푸드트럭 마케팅을 경험해보세요. 기업 행사, 복지 마케팅, 브랜드 프로모션을 위한 최고의 파트너, 돈키호테 푸드트럭입니다.",
  openGraph: {
    title: "서비스 소개 - 돈키호테 푸드트럭",
    description: "새로운 방식의 푸드트럭 마케팅을 경험해보세요. 기업 행사, 복지 마케팅, 브랜드 프로모션을 위한 최고의 파트너, 돈키호테 푸드트럭입니다.",
    images: [
      {
        url: "/service-og.jpg",
        width: 1200,
        height: 630,
        alt: "돈키호테 푸드트럭 서비스 소개"
      }
    ]
  }
};

export default function IntroductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 