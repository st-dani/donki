import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 'main-dishes',
    name: '든든한 한끼 식사',
    description: '컵밥/덮밥류, 초밥류, 면류, 시그니처 메인',
    image: '/images/menu/categories/main-dishes.jpg'
  },
  {
    id: 'street-food',
    name: '길거리 간식',
    description: '분식류, 핫도그/버거, 토스트/샌드위치, 인기 간식',
    image: '/images/menu/categories/street-food.jpg'
  },
  {
    id: 'desserts-drinks',
    name: '디저트 & 음료',
    description: '디저트, 음료',
    image: '/images/menu/categories/desserts-drinks.jpg'
  }
];

export default function MenuCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">메뉴 카테고리</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`#${category.id}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 