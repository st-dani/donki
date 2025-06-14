import { Metadata } from 'next';
import { categories } from '@/types/blog';

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
  const categoryData = categories.find(cat => cat.id === category) || { name: category, description: '' };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">{categoryData.name} 블로그</h1>
      <p className="text-lg mb-8">{categoryData.description}</p>
      <div className="p-8 bg-gray-100 rounded-lg text-center">
        <p className="text-xl">블로그 카테고리 페이지가 곧 준비될 예정입니다.</p>
      </div>
    </div>
  );
}
