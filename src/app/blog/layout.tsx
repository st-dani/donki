import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 - 돈키호테 푸드트럭",
  description: "돈키호테 푸드트럭의 최신 소식과 푸드트럭 산업의 트렌드, 그리고 다양한 이벤트 소식을 전해드립니다.",
  openGraph: {
    title: "블로그 - 돈키호테 푸드트럭",
    description: "돈키호테 푸드트럭의 최신 소식과 푸드트럭 산업의 트렌드, 그리고 다양한 이벤트 소식을 전해드립니다.",
    images: [
      {
        url: "/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "돈키호테 푸드트럭 블로그"
      }
    ]
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 