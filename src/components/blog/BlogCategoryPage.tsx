'use client';

import { useRouter } from 'next/navigation';
import BlogHero from '@/components/blog/BlogHero';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogList from '@/components/blog/BlogList';

interface BlogCategoryPageProps {
  selectedCategory: string;
}

export default function BlogCategoryPageClient({ selectedCategory }: BlogCategoryPageProps) {
  const router = useRouter();

  const handleCategoryChange = (newCategory: string) => {
    router.push(`/blog/${newCategory}`);
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      <BlogHero />
      <BlogCategories selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <BlogList selectedCategory={selectedCategory} />
    </main>
  );
}
