'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuClient() {
  const categories = [
    {
      title: '인기메뉴',
      description: '✨ 입소문 타고 대박난 돈키호테 스타메뉴! 안 먹으면 손해각✌️',
      href: '/menu/popular',
      image: '/images/menu/popular-category.webp',
      emoji: '⭐️'
    },
    {
      title: '분식',
      description: '🔥 추억의 맛을 현대적으로 재해석! 이 맛에 울컥~😋',
      href: '/menu/bunsik',
      image: '/images/menu/bunsik-category.webp',
      emoji: '🍜'
    },
    {
      title: '핫도그',
      description: '🌭 겉바속촉 신세계! 한입에 퐁당 빠지는 맛의 마법✨',
      href: '/menu/hotdog',
      image: '/images/menu/hotdog-category.webp',
      emoji: '🌭'
    },
    {
      title: '타코',
      description: '🌮 멕시코와 한국의 맛있는 케미! 이런 맛은 처음이지?😎',
      href: '/menu/taco',
      image: '/images/menu/taco-category.webp',
      emoji: '🌮'
    },
    {
      title: '커피/음료',
      description: '☕️ 달콤 쌉싸름 힐링 타임! 분위기 깡패 음료들 총집합~🎵',
      href: '/menu/beverage',
      image: '/images/menu/beverage-category.webp',
      emoji: '☕️'
    }
  ];

  const popularItems = [
    {
      name: '치즈 떡볶이',
      description: '🧀 쭉쭉 늘어나는 치즈에 빠진 떡볶이! 달콤매콤 소스랑 찰떡궁합 💕',
      price: '5,000원',
      image: '/images/menu/cheese-tteokbokki.webp',
      badge: '인기 TOP'
    },
    {
      name: '크리스피 핫도그',
      description: '✨ 바삭함이 9000% 터지는 겉바속촉의 신세계! 한번 먹으면 멈출 수 없어요 🌭',
      price: '4,000원',
      image: '/images/menu/crispy-hotdog.webp',
      badge: '주문 폭주'
    },
    {
      name: '불고기 타코',
      description: '🔥 멕시코가 들썩들썩! 불맛 가득 불고기와 타코의 찐 케미 폭발! 🌮',
      price: '6,000원',
      image: '/images/menu/bulgogi-taco.webp',
      badge: '신메뉴'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/menu/popular-category.webp"
            alt="돈키호테 푸드트럭 메뉴"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            돈키호테 메뉴
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto"
          >
            신선한 재료와 특별한 레시피로 만드는<br />
            맛있는 모험의 시작
          </motion.p>
        </div>
      </section>

      {/* 카테고리 목록 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            메뉴 카테고리
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
              >
                <Link href={category.href} className="block">
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">{category.emoji}</div>
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 메뉴 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            이번 주 인기 메뉴
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {popularItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {item.badge && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                    <Link
                      href={`/menu/popular#${item.name}`}
                      className="text-primary hover:text-primary-dark font-medium transition-colors"
                    >
                      자세히 보기 →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8"
          >
            특별한 메뉴가 필요하신가요?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl mb-12 max-w-2xl mx-auto"
          >
            행사의 성격과 규모에 맞는 맞춤형 메뉴를 제안해드립니다.
            지금 바로 문의해보세요.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/estimate"
              className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              맞춤 메뉴 문의
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 