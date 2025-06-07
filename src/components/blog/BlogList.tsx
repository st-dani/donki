'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  selectedCategory: string;
}

const POSTS_PER_PAGE = 6;

export default function BlogList({ selectedCategory }: BlogListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        // 에러 발생 시 기본 데이터 사용
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 카테고리별 포스트 필터링
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // 카테고리가 변경될 때 첫 페이지로 리셋
    setCurrentPage(1);
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-xl" />
              <div className="p-6 bg-white rounded-b-xl">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-500 text-lg">
          해당 카테고리의 게시글이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
            }`}
          >
            이전
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === pageNum
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
            }`}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
} 