'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import { blogPosts } from '@/types/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const category = params?.category as string;

  // null 체크와 존재하지 않는 포스트 처리
  if (!slug || !category) {
    notFound();
  }

  const post = blogPosts.find(p => p.link === `/blog/${category}/${slug}`);

  if (!post) {
    notFound();
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
              <Link href="/blog" className="text-theme-mint-600 hover:text-theme-mint-700">
                ← 블로그 목록으로
              </Link>
            </div>
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.category}</span>
              </div>
            </header>
            {post.image && (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="prose max-w-none">
              {post.content}
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