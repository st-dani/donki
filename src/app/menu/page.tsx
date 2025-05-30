'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Menu() {
  const categories = [
    {
      title: '인기메뉴',
      description: '고객들이 가장 사랑하는 돈키호테의 시그니처 메뉴',
      href: '/menu/popular',
      image: '/images/menu/popular-category.jpg'
    },
    {
      title: '음료',
      description: '특별한 레시피로 만든 시그니처 음료',
      href: '/menu/beverage',
      image: '/images/menu/beverage-category.jpg'
    },
    {
      title: '베이커리',
      description: '매일 아침 갓 구운 신선한 베이커리',
      href: '/menu/bakery',
      image: '/images/menu/bakery-category.jpg'
    },
    {
      title: '간식',
      description: '출출할 때 즐기는 맛있는 간식',
      href: '/menu/snack',
      image: '/images/menu/snack-category.jpg'
    },
    {
      title: '식사',
      description: '든든한 한 끼를 책임지는 메인 메뉴',
      href: '/menu/meal',
      image: '/images/menu/meal-category.jpg'
    }
  ];

  const popularItems = [
    {
      name: '트러플 포테이토',
      description: '트러플 오일과 파마산 치즈가 어우러진 감자튀김',
      price: '8,000원',
      image: '/images/menu/truffle-potato.jpg'
    },
    {
      name: '스모크 치킨 샌드위치',
      description: '훈제 닭가슴살과 신선한 채소가 들어간 샌드위치',
      price: '12,000원',
      image: '/images/menu/chicken-sandwich.jpg'
    },
    {
      name: '시그니처 아메리카노',
      description: '특별한 블렌딩으로 만든 프리미엄 커피',
      price: '5,000원',
      image: '/images/menu/signature-americano.jpg'
    }
  ];

  return (
    <div className="pt-32">
      {/* 메뉴 소개 */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-8">메뉴 소개</h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              신선한 재료와 특별한 레시피로 만든<br />
              돈키호테 푸드트럭의 다양한 메뉴를 만나보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 카테고리 목록 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
                  <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link
                    href={category.href}
                    className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors"
                  >
                    메뉴 보기
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 메뉴 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">인기 메뉴</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {popularItems.map((item, index) => (
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

      {/* CTA 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">특별한 메뉴가 필요하신가요?</h2>
            <p className="text-xl text-gray-600 mb-8">
              행사에 맞는 맞춤형 메뉴를 제안해드립니다.
            </p>
            <Link
              href="/estimate"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              메뉴 상담 받기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 