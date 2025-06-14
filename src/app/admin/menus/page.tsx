import MenuList from './MenuList';
import { prisma } from '@/lib/prisma';

// MenuList.tsx와 동일한 MenuCategory enum 정의 사용
enum MenuCategory {
  MAIN = 'MAIN',
  SIDE = 'SIDE',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE'
}

interface Menu {
  id: string;
  name: string;
  nameEn: string | null;
  description: string;
  category: MenuCategory;
  categorySlug: string;
  tags: string[];
  isPopular: boolean;
  spicyLevel: number | null;
  isNew: boolean;
  isVegetarian: boolean;
  allergens: string[];
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

async function getMenus(): Promise<Menu[]> {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    // 타입 단언을 사용하여 Prisma에서 반환하는 데이터를 우리가 정의한 Menu 타입으로 변환
    return menus as unknown as Menu[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const revalidate = 0;

export default async function MenuAdminPage() {
  const menus = await getMenus();
  
  const serializedMenus = menus.map(menu => ({
    ...menu,
    createdAt: menu.createdAt.toISOString(),
    updatedAt: menu.updatedAt.toISOString(),
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">메뉴 관리</h1>
      <MenuList initialMenus={serializedMenus} />
    </div>
  );
}
