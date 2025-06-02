'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  category: string;
  link: string;
}

// 블로그 포스트 데이터
const blogPosts = [
  {
    id: 1,
    title: '푸드트럭으로 특별한 기업 행사를 만드는 방법',
    excerpt: '기업 행사에 푸드트럭을 도입하면 직원들의 만족도가 크게 상승합니다. 오늘은 성공적인 기업 행사 케이터링 서비스에 대해 이야기해보려고 합니다.',
    date: '2024.03.15',
    imageUrl: '/images/blog/corporate-event.jpg',
    category: '기업 행사'
  },
  {
    id: 2,
    title: '2024년 트렌드, 야외 웨딩과 푸드트럭',
    excerpt: '코로나19 이후 야외 웨딩이 인기를 끌고 있습니다. 특히 푸드트럭과 함께하는 웨딩 파티는 신선하고 특별한 경험을 선사합니다.',
    date: '2024.03.10',
    imageUrl: '/images/blog/outdoor-wedding.jpg',
    category: '웨딩'
  },
  {
    id: 3,
    title: '봄맞이 페스티벌 준비하기',
    excerpt: '따뜻한 봄이 시작되면서 야외 페스티벌 시즌이 돌아왔습니다. 성공적인 페스티벌을 위한 푸드트럭 운영 노하우를 공개합니다.',
    date: '2024.03.05',
    imageUrl: '/images/blog/spring-festival.jpg',
    category: '페스티벌'
  },
  {
    id: 4,
    title: '돈키호테와 함께한 2000번째 행사 현장!',
    description: '🎉 드디어 달성한 2000번째 행사! 그동안 함께해주신 모든 분들께 감사드립니다. 특별했던 순간들을 돌아봅니다.',
    date: '2024-03-15',
    image: '/images/blog/event-2000.webp',
    category: '행사 스토리',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 5,
    title: '봄맞이 신메뉴 출시! 벚꽃 에디션 🌸',
    description: '봄의 향연을 담은 특별한 메뉴들을 소개합니다. 벚꽃 라떼부터 봄나물 타코까지, 입안 가득 봄이 찾아옵니다.',
    date: '2024-03-10',
    image: '/images/blog/spring-menu.webp',
    category: '신메뉴 소개',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 6,
    title: '기업 행사의 새로운 트렌드, 푸드트럭!',
    description: '🚚 MZ세대 직원들의 마음을 사로잡는 트렌디한 케이터링 서비스, 푸드트럭이 대세인 이유를 알아봅니다.',
    date: '2024-03-05',
    image: '/images/blog/corporate-event.webp',
    category: '트렌드',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 7,
    title: '돈키호테 푸드트럭의 위생 관리 비법',
    description: '✨ 고객님들께 안전한 음식을 제공하기 위한 우리의 노력을 소개합니다. HACCP 수준의 철저한 위생 관리!',
    date: '2024-02-28',
    image: '/images/blog/hygiene.webp',
    category: '품질 관리',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 8,
    title: '연예인도 반한 돈키호테의 인기 메뉴 TOP 5',
    description: '🌟 드라마, 예능 촬영장에서 스타들의 마음을 사로잡은 돈키호테 푸드트럭의 인기 메뉴를 공개합니다!',
    date: '2024-02-20',
    image: '/images/blog/celebrity.webp',
    category: '메뉴 스토리',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 9,
    title: '돈키호테와 함께하는 완벽한 행사 준비 가이드',
    description: '📋 성공적인 행사를 위한 체크리스트부터 꿀팁까지! 돈키호테의 노하우를 공유합니다.',
    date: '2024-02-15',
    image: '/images/blog/event-guide.webp',
    category: '행사 팁',
    link: 'https://blog.naver.com/kincv12'
  }
];

// 카테고리 데이터
const categories = [
  '전체',
  '기업행사',
  '촬영장',
  '연예인',
  '학교',
  '공공기관',
  '유치원',
  '축제',
  '기타행사'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        // 에러 발생 시 기본 데이터 사용
        setPosts([
          {
            id: '1',
            title: '푸드트럭으로 특별한 기업 행사를 만드는 방법',
            excerpt: '기업 행사에 푸드트럭을 도입하면 직원들의 만족도가 크게 상승합니다. 오늘은 성공적인 기업 행사 케이터링 서비스에 대해 이야기해보려고 합니다.',
            date: '2024.03.15',
            thumbnail: '/images/blog/corporate-event.jpg',
            category: '기업 행사',
            link: '/blog/corporate/1'
          },
          {
            id: '2',
            title: '2024년 트렌드, 야외 웨딩과 푸드트럭',
            excerpt: '코로나19 이후 야외 웨딩이 인기를 끌고 있습니다. 특히 푸드트럭과 함께하는 웨딩 파티는 신선하고 특별한 경험을 선사합니다.',
            date: '2024.03.10',
            thumbnail: '/images/blog/outdoor-wedding.jpg',
            category: '웨딩',
            link: '/blog/wedding/2'
          },
          {
            id: '3',
            title: '봄맞이 페스티벌 준비하기',
            excerpt: '따뜻한 봄이 시작되면서 야외 페스티벌 시즌이 돌아왔습니다. 성공적인 페스티벌을 위한 푸드트럭 운영 노하우를 공개합니다.',
            date: '2024.03.05',
            thumbnail: '/images/blog/spring-festival.jpg',
            category: '페스티벌',
            link: '/blog/festival/3'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 카테고리별 포스트 필터링
  const filteredPosts = selectedCategory === '전체'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* 블로그 헤더 */}
      <section className="bg-theme-yellow/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            돈키호테 푸드트럭 이야기
          </h1>
          <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto">
            맛있는 경험을 전하는 푸드트럭, 돈키호테의 다양한 이야기를 소개합니다.
            행사 현장 스토리부터 푸드트럭 운영 노하우까지 유익한 정보를 전해드립니다.
          </p>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-theme-yellow text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 블로그 포스트 그리드 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-theme-yellow"></div>
              <p className="mt-4 text-gray-600">포스트를 불러오는 중입니다...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="block group">
                  <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                    <div className="aspect-video relative">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-theme-yellow font-medium">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.date}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-theme-yellow transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Link href={post.link} className="mt-4 inline-block text-theme-yellow hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">© 2024 DONKI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 