import { menuFilterCategories } from '@/types/menu';
import { MenuItem } from '@/types/menu';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';
import { prisma } from '@/lib/prisma';

// 페이지 캐시 비활성화
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Next.js가 빌드 시점에 각 카테고리 페이지를 미리 생성하도록 돕는 함수입니다.
export async function generateStaticParams() {
  // 'all'과 'popular'는 실제 카테고리 페이지가 아니므로 제외합니다.
  return menuFilterCategories
    .filter(cat => cat.id !== 'all' && cat.id !== 'popular')
    .map((category) => ({
      category: category.id,
    }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category: categoryId } = params;

  const categoryInfo = menuFilterCategories.find(cat => cat.id === categoryId);

  // URL의 카테고리 ID가 유효하지 않으면 404 페이지를 보여줍니다.
  if (!categoryInfo || categoryId === 'all' || categoryId === 'popular') {
    notFound();
  }

  // 데이터베이스에서 메뉴 가져오기
  const dbMenus = await prisma.menu.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // categorySlug가 categoryId와 일치하는 항목만 필터링하고 MenuItem 타입으로 매핑
  const filteredItems = dbMenus
    .filter(item => {
      // 특별 케이스 처리: 김밥과 같은 아이템들
      if (categoryId === 'bunsik' && item.name === '김밥') {
        return true;
      }
      
      // categorySlug를 기준으로 필터링 (API에서 사용하는 방식)
      return item.categorySlug === categoryId;
    })
    .map(item => ({
      id: item.id,
      name: item.name,
      nameEn: item.nameEn || '', // nameEn이 없을 경우 빈 문자열 제공
      description: item.description,
      category: item.category,
      categorySlug: item.categorySlug,
      tags: item.tags as any,
      allergens: item.allergens,
      image: item.image,
      imageUrl: item.image, // image를 imageUrl로도 사용
      isPopular: item.isPopular,
      isNew: item.isNew,
      isVegetarian: item.isVegetarian,
      spicyLevel: item.spicyLevel
    })) as MenuItem[];

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