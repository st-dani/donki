'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  isPopular?: boolean;
  isNew?: boolean;
  allergens?: string[];
}

interface CategoryData {
  title: string;
  description: string;
  items: MenuItem[];
}

const menuCategories: Record<string, CategoryData> = {
  popular: {
    title: '인기메뉴',
    description: '고객들이 가장 사랑하는 돈키호테의 시그니처 메뉴',
    items: [
      {
        name: '트러플 포테이토',
        description: '트러플 오일과 파마산 치즈가 어우러진 감자튀김',
        price: '8,000원',
        isPopular: true,
        allergens: ['유제품']
      },
      {
        name: '스모크 치킨 샌드위치',
        description: '훈제 닭가슴살과 신선한 채소가 들어간 샌드위치',
        price: '12,000원',
        isPopular: true,
        allergens: ['글루텐', '계란']
      },
      {
        name: '시그니처 아메리카노',
        description: '특별한 블렌딩으로 만든 프리미엄 커피',
        price: '5,000원',
        isPopular: true
      }
    ]
  },
  beverage: {
    title: '음료',
    description: '특별한 레시피로 만든 시그니처 음료',
    items: [
      {
        name: '시그니처 아메리카노',
        description: '특별한 블렌딩으로 만든 프리미엄 커피',
        price: '5,000원'
      },
      {
        name: '바닐라 라떼',
        description: '부드러운 바닐라 시럽이 들어간 라떼',
        price: '6,000원',
        allergens: ['유제품']
      },
      {
        name: '청귤 에이드',
        description: '상큼한 청귤로 만든 시원한 에이드',
        price: '6,000원',
        isNew: true
      }
    ]
  },
  // 다른 카테고리 데이터...
};

export default function MenuCategory() {
  const params = useParams();
  const category = params.category as string;
  const categoryData = menuCategories[category];

  if (!categoryData) {
    return (
      <div className="pt-32 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold mb-8">메뉴를 찾을 수 없습니다.</h1>
          <Link href="/menu" className="text-primary hover:text-primary-dark">
            메뉴 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{categoryData.title}</h1>
            <p className="text-xl text-gray-600 mb-12">{categoryData.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              {categoryData.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      {item.isPopular && (
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                          인기
                        </span>
                      )}
                      {item.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-end">
                      <p className="text-primary font-bold">{item.price}</p>
                      {item.allergens && item.allergens.length > 0 && (
                        <p className="text-gray-500 text-sm">
                          알레르기: {item.allergens.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/menu"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                전체 메뉴 보기
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 