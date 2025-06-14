'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MenuCategory, MenuItem } from '@/types/menu';
import MenuItemCard from '@/components/menu/MenuItemCard';

interface CategoryPageClientProps {
  categoryId: string;
  categoryInfo: MenuCategory;
  filteredItems: MenuItem[];
  allCategories: MenuCategory[];
}

const CategoryPageClient = ({
  categoryId,
  categoryInfo,
  filteredItems,
  allCategories,
}: CategoryPageClientProps) => {
  return (
    <div className="pt-24 md:pt-32">
      {/* 카테고리 헤더 */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-2">{categoryInfo.name}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {categoryInfo.description || `돈키호테의 맛있는 ${categoryInfo.name} 메뉴를 만나보세요.`}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* 다른 카테고리로 이동을 위한 필터 (네비게이션 역할) */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {allCategories.map((category) => {
            const href = category.id === 'all' ? '/menu' : `/menu/${category.id}`;
            return (
              <Link
                key={category.id}
                href={href}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                  categoryId === category.id
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {category.name}
              </Link>
            )
          })}
        </div>
        
        {/* 메뉴 아이템 목록 */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">이 카테고리에는 아직 메뉴가 없습니다.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPageClient;
