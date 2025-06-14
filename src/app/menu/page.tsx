import MenuPageClient from '@/components/menu/MenuPageClient';

// 페이지 캐시 비활성화
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MenuPage = () => {
  return (
    <main>
      <MenuPageClient />
    </main>
  );
};

export default MenuPage;