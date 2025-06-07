import MenuHero from '@/components/menu/MenuHero';
import MenuCategories from '@/components/menu/MenuCategories';
import MenuList from '@/components/menu/MenuList';

// 페이지 캐시 비활성화
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MenuPage() {
  return (
    <main>
      <MenuHero />
      <MenuCategories />
      <MenuList />
    </main>
  );
} 