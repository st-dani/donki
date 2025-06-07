import Image from 'next/image';
import { menuItems } from '@/types/menu';

export default function MenuList() {
  // 메뉴 아이템을 카테고리별로 그룹화
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <div key={category} id={category} className="mb-16">
            <h2 className="text-3xl font-bold mb-8">
              {category === 'main-dishes' && '든든한 한끼 식사'}
              {category === 'street-food' && '길거리 간식'}
              {category === 'desserts-drinks' && '디저트 & 음료'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image || '/images/menu/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {item.isPopular && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                        인기
                      </div>
                    )}
                    {item.isNew && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        신메뉴
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    {item.spicyLevel && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: item.spicyLevel }).map((_, index) => (
                          <span key={index} className="text-red-500">🌶️</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 