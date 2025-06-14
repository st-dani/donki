import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={post.link}>
      <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div className="relative h-48">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">{post.date}</span>
            <span className="text-sm text-theme-yellow-600 font-medium">
              {post.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
} 