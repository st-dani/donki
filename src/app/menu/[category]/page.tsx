'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const menuData = {
  bunsik: {
    title: '분식',
    description: '추억의 맛을 담은 길거리 분식 메뉴',
    items: [
      {
        name: '치즈 떡볶이',
        description: '쫄깃한 떡과 특제 매콤달콤 소스의 만남',
        price: '5,000원',
        image: '/images/menu/cheese-tteokbokki.webp'
      },
      {
        name: '라볶이',
        description: '라면과 떡볶이의 환상적인 조합',
        price: '6,000원',
        image: '/images/menu/rabokki.webp'
      },
      {
        name: '튀김세트',
        description: '고구마, 오징어, 김말이 튀김',
        price: '5,000원',
        image: '/images/menu/tempura-set.webp'
      }
    ]
  },
  hotdog: {
    title: '핫도그',
    description: '특별한 소스와 토핑으로 만드는 프리미엄 핫도그',
    items: [
      {
        name: '크리스피 핫도그',
        description: '바삭한 튀김옷과 쫄깃한 소시지',
        price: '4,000원',
        image: '/images/menu/crispy-hotdog.webp'
      },
      {
        name: '치즈 핫도그',
        description: '모짜렐라 치즈가 가득한 핫도그',
        price: '4,500원',
        image: '/images/menu/cheese-hotdog.webp'
      },
      {
        name: '감자 핫도그',
        description: '감자가 듬뿍 들어간 핫도그',
        price: '4,500원',
        image: '/images/menu/potato-hotdog.webp'
      }
    ]
  },
  taco: {
    title: '타코',
    description: '멕시칸과 한식의 퓨전 스타일 타코',
    items: [
      {
        name: '불고기 타코',
        description: '매콤달콤한 불고기가 들어간 퓨전 타코',
        price: '6,000원',
        image: '/images/menu/bulgogi-taco.webp'
      },
      {
        name: '닭갈비 타코',
        description: '매콤한 닭갈비와 채소의 조화',
        price: '6,000원',
        image: '/images/menu/dakgalbi-taco.webp'
      },
      {
        name: '새우 타코',
        description: '새우튀김과 특제 소스의 만남',
        price: '6,500원',
        image: '/images/menu/shrimp-taco.webp'
      }
    ]
  },
  beverage: {
    title: '커피/음료',
    description: '갓 내린 커피와 시그니처 음료',
    items: [
      {
        name: '아메리카노',
        description: '깊은 풍미의 블렌드 커피',
        price: '3,000원',
        image: '/images/menu/americano.webp'
      },
      {
        name: '카페라떼',
        description: '부드러운 우유와 에스프레소',
        price: '3,500원',
        image: '/images/menu/cafe-latte.webp'
      },
      {
        name: '딸기 스무디',
        description: '신선한 딸기로 만든 시원한 스무디',
        price: '4,500원',
        image: '/images/menu/strawberry-smoothie.webp'
      }
    ]
  }
};

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category') || 'bunsik';
  const data = menuData[category as keyof typeof menuData];

  if (!data) {
    notFound();
  }

  return (
    <div className="pt-32">
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-8">{data.title}</h1>
            <p className="text-xl text-gray-600 mb-12">{data.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {data.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
                  <h3 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                    {item.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-primary font-bold">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 