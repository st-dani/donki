import { prisma } from '@/lib/prisma';
import MenuPageClient from './MenuPageClient';

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const menus = await prisma.menu.findMany({
    orderBy: {
      category: 'asc',
    },
  });

  return <MenuPageClient initialMenus={menus} />;
} 