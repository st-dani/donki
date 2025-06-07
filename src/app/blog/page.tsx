'use client';

import { useState } from 'react';
import BlogHero from '@/components/blog/BlogHero';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogList from '@/components/blog/BlogList';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <main className="min-h-screen bg-white pt-20">
      <BlogHero />
      <BlogCategories
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BlogList selectedCategory={selectedCategory} />
    </main>
  );
} 