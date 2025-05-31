'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// 블로그 포스트 데이터
const blogPosts = [
  {
    id: 1,
    title: '돈키호테와 함께한 2000번째 행사 현장!',
    description: '🎉 드디어 달성한 2000번째 행사! 그동안 함께해주신 모든 분들께 감사드립니다. 특별했던 순간들을 돌아봅니다.',
    date: '2024-03-15',
    image: '/images/blog/event-2000.webp',
    category: '행사 스토리',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 2,
    title: '봄맞이 신메뉴 출시! 벚꽃 에디션 🌸',
    description: '봄의 향연을 담은 특별한 메뉴들을 소개합니다. 벚꽃 라떼부터 봄나물 타코까지, 입안 가득 봄이 찾아옵니다.',
    date: '2024-03-10',
    image: '/images/blog/spring-menu.webp',
    category: '신메뉴 소개',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 3,
    title: '기업 행사의 새로운 트렌드, 푸드트럭!',
    description: '🚚 MZ세대 직원들의 마음을 사로잡는 트렌디한 케이터링 서비스, 푸드트럭이 대세인 이유를 알아봅니다.',
    date: '2024-03-05',
    image: '/images/blog/corporate-event.webp',
    category: '트렌드',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 4,
    title: '돈키호테 푸드트럭의 위생 관리 비법',
    description: '✨ 고객님들께 안전한 음식을 제공하기 위한 우리의 노력을 소개합니다. HACCP 수준의 철저한 위생 관리!',
    date: '2024-02-28',
    image: '/images/blog/hygiene.webp',
    category: '품질 관리',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 5,
    title: '연예인도 반한 돈키호테의 인기 메뉴 TOP 5',
    description: '🌟 드라마, 예능 촬영장에서 스타들의 마음을 사로잡은 돈키호테 푸드트럭의 인기 메뉴를 공개합니다!',
    date: '2024-02-20',
    image: '/images/blog/celebrity.webp',
    category: '메뉴 스토리',
    link: 'https://blog.naver.com/kincv12'
  },
  {
    id: 6,
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
  '행사 스토리',
  '신메뉴 소개',
  '트렌드',
  '품질 관리',
  '메뉴 스토리',
  '행사 팁'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredPosts = selectedCategory === '전체'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/blog/blog-hero.webp"
            alt="돈키호테 푸드트럭 블로그"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            돈키호테 이야기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto"
          >
            맛있는 모험의 현장 스토리와<br />
            특별한 순간들을 공유합니다
          </motion.p>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 블로그 포스트 목록 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
              >
                <Link href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-gray-500 mb-2 block">
                      {new Date(post.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.description}
                    </p>
                    <span className="text-primary font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                      자세히 보기
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 뉴스레터 구독 섹션 */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              돈키호테 소식 받아보기
            </h2>
            <p className="text-lg mb-8">
              신메뉴 소식부터 특별 할인 이벤트까지,<br />
              돈키호테의 특별한 소식을 가장 먼저 받아보세요!
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="이메일 주소를 입력해주세요"
                className="px-6 py-3 rounded-full text-gray-900 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-colors"
              >
                구독하기
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 