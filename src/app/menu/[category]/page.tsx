import { menuItems, menuFilterCategories } from '@/types/menu';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';

// Next.js가 빌드 시점에 각 카테고리 페이지를 미리 생성하도록 돕는 함수입니다.
export async function generateStaticParams() {
  // 'all'과 'popular'는 실제 카테고리 페이지가 아니므로 제외합니다.
  return menuFilterCategories
    .filter(cat => cat.id !== 'all' && cat.id !== 'popular')
    .map((category) => ({
      category: category.id,
    }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category: categoryId } = params;

  const categoryInfo = menuFilterCategories.find(cat => cat.id === categoryId);

  // URL의 카테고리 ID가 유효하지 않으면 404 페이지를 보여줍니다.
  if (!categoryInfo || categoryId === 'all' || categoryId === 'popular') {
    notFound();
  }

  const filteredItems = menuItems.filter(item => item.category === categoryId);

  // 데이터는 서버에서 준비하고, 렌더링은 클라이언트 컴포넌트에 위임합니다.
  return (
    <CategoryPageClient 
      categoryId={categoryId}
      categoryInfo={categoryInfo}
      filteredItems={filteredItems}
      allCategories={menuFilterCategories}
    />
  );
}