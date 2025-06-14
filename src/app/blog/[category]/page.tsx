import { Metadata } from 'next';
import { categories } from '@/types/blog';
import BlogCategoryPageClient from '@/components/blog/BlogCategoryPage';

export async function generateStaticParams() {
  return categories
    .filter(category => category.id !== 'all')
    .map(category => ({ category: category.id }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = categories.find(cat => cat.id === params.category);
  return {
    title: category ? `${category.name} | 돈키호테 푸드트럭` : '블로그 | 돈키호테 푸드트럭',
    description: category ? category.description : '돈키호테 푸드트럭의 블로그입니다.',
  };
}

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  return <BlogCategoryPageClient selectedCategory={category} />;
}
