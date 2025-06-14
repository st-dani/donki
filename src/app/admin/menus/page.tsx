import MenuList from './MenuList';
import { prisma } from '@/lib/prisma';

// 프리즈마 Menu 타입 직접 정의
interface Menu {
  id: string;
  name: string;
  nameEn: string | null;
  description: string;
  price: number;
  image: string;
  category: string;
  isPublished: boolean;
  tags: string[];
  allergens: string[];
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
    return menus;
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
