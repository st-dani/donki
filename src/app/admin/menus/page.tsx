import MenuList from './MenuList';
import { prisma } from '@/lib/prisma';
import { Menu } from '@/generated/prisma/client';

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
