'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Post {
  title: string;
  category: string;
  date: string;
  content: string;
  author: string;
  tags: string[];
}

interface Posts {
  [key: string]: Post;
}

// 임시 데이터
const posts: Posts = {
  'trend-2024': {
    title: '2024년 푸드트럭 트렌드 전망',
    category: 'insight',
    date: '2024.03.15',
    content: `
      2024년, 푸드트럭 산업은 새로운 변화의 바람이 불고 있습니다.
      
      1. 건강한 로컬 푸드
      - 지역 농산물을 활용한 메뉴 개발
      - 친환경 식재료 사용 증가
      
      2. 테크놀로지 융합
      - 모바일 주문 시스템 도입
      - 데이터 기반 메뉴 최적화
      
      3. 맞춤형 서비스
      - 기업 복지 연계 프로그램
      - 개인화된 메뉴 제안
      
      4. 지속가능성 강화
      - 친환경 패키징 도입
      - 음식물 쓰레기 저감 노력
    `,
    author: '김푸드 매니저',
    tags: ['푸드트럭', '트렌드', '2024', '전망']
  },
  // 다른 포스트 데이터...
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="pt-32 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold mb-8">포스트를 찾을 수 없습니다.</h1>
          <Link href="/blog" className="text-primary hover:text-primary-dark">
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen">
      <article className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              <h1 className="text-4xl font-bold mt-4 mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-600 text-sm">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((line: string, index: number) => (
                <p key={index} className="mb-4">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-bold mb-4">태그</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/blog"
                className="text-primary hover:text-primary-dark font-medium"
              >
                ← 블로그 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
} 