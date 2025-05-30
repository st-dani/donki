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
      title: '분식',
      description: '추억의 맛을 담은 길거리 분식 메뉴',
      href: '/menu/bunsik',
      image: '/images/menu/bunsik-category.jpg'
    },
    {
      title: '핫도그',
      description: '특별한 소스와 토핑으로 만드는 프리미엄 핫도그',
      href: '/menu/hotdog',
      image: '/images/menu/hotdog-category.jpg'
    },
    {
      title: '타코',
      description: '멕시칸과 한식의 퓨전 스타일 타코',
      href: '/menu/taco',
      image: '/images/menu/taco-category.jpg'
    },
    {
      title: '커피/음료',
      description: '갓 내린 커피와 시그니처 음료',
      href: '/menu/beverage',
      image: '/images/menu/beverage-category.jpg'
    }
  ];

  const popularItems = [
    {
      name: '치즈 떡볶이',
      description: '쫄깃한 떡과 특제 매콤달콤 소스의 만남',
      price: '5,000원',
      image: '/images/menu/cheese-tteokbokki.jpg'
    },
    {
      name: '크리스피 핫도그',
      description: '바삭한 튀김옷과 쫄깃한 소시지의 환상 조합',
      price: '4,000원',
      image: '/images/menu/crispy-hotdog.jpg'
    },
    {
      name: '불고기 타코',
      description: '매콤달콤한 불고기가 들어간 퓨전 타코',
      price: '6,000원',
      image: '/images/menu/bulgogi-taco.jpg'
    }
  ];

  const fullMenu = {
    bunsik: [
      {
        name: '치즈 떡볶이',
        price: '5,000원',
        description: '쫄깃한 떡과 특제 매콤달콤 소스의 만남'
      },
      {
        name: '라볶이',
        price: '6,000원',
        description: '라면과 떡볶이의 환상적인 조합'
      },
      {
        name: '튀김세트',
        price: '5,000원',
        description: '고구마, 오징어, 김말이 튀김'
      }
    ],
    hotdog: [
      {
        name: '크리스피 핫도그',
        price: '4,000원',
        description: '바삭한 튀김옷과 쫄깃한 소시지'
      },
      {
        name: '치즈 핫도그',
        price: '4,500원',
        description: '모짜렐라 치즈가 가득한 핫도그'
      },
      {
        name: '감자 핫도그',
        price: '4,500원',
        description: '감자가 듬뿍 들어간 핫도그'
      }
    ],
    taco: [
      {
        name: '불고기 타코',
        price: '6,000원',
        description: '매콤달콤한 불고기가 들어간 퓨전 타코'
      },
      {
        name: '닭갈비 타코',
        price: '6,000원',
        description: '매콤한 닭갈비와 채소의 조화'
      },
      {
        name: '새우 타코',
        price: '6,500원',
        description: '새우튀김과 특제 소스의 만남'
      }
    ],
    beverage: [
      {
        name: '아메리카노',
        price: '3,000원',
        description: '깊은 풍미의 블렌드 커피'
      },
      {
        name: '카페라떼',
        price: '3,500원',
        description: '부드러운 우유와 에스프레소'
      },
      {
        name: '딸기 스무디',
        price: '4,500원',
        description: '신선한 딸기로 만든 시원한 스무디'
      }
    ]
  };

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