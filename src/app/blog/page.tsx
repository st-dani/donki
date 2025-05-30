'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { BlogPost, BlogState, getBlogPosts } from '@/lib/blog';

const CATEGORIES = [
  '전체',
  '기업행사',
  '연예인',
  '공공기관',
  '학교',
  '유치원',
  '행사축제'
] as const;

function BlogPageContent() {
  const [blogState, setBlogState] = useState<BlogState>({
    posts: [],
    isLoading: true,
    error: null
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  useEffect(() => {
    async function fetchPosts() {
      const result = await getBlogPosts();
      setBlogState(result);
    }
    fetchPosts();
  }, []);

  const filteredPosts = blogState.posts.filter(post => 
    selectedCategory === '전체' || post.category === selectedCategory
  );

  if (blogState.isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-lg text-gray-600">블로그 포스트를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (blogState.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <div className="text-red-500 text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h2>
        <p className="text-gray-600 mb-4">{blogState.error}</p>
        <button
          onClick={() => {
            setBlogState(prev => ({ ...prev, isLoading: true, error: null }));
            getBlogPosts().then(setBlogState);
          }}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8"
        >
          돈키호테 이야기
        </motion.h1>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link href={post.link} target="_blank" rel="noopener noreferrer">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold line-clamp-2">
                      {post.title}
                    </h2>
                    <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description.replace(/<[^>]*>/g, '')}
                  </p>
                  <time className="text-sm text-gray-500">
                    {format(new Date(post.pubDate), 'PPP', { locale: ko })}
                  </time>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && !blogState.error && (
          <div className="text-center text-gray-600 py-20">
            <p>
              {selectedCategory === '전체'
                ? '아직 작성된 블로그 포스트가 없습니다.'
                : `${selectedCategory} 카테고리의 블로그 포스트가 없습니다.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-lg text-gray-600">블로그 페이지를 불러오는 중입니다...</p>
        </div>
      }
    >
      <BlogPageContent />
    </Suspense>
  );
} 