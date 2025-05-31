'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// 우리의 가치 데이터
const values = [
  {
    icon: '🌟',
    title: '맛의 모험',
    description: '현실에 안주하지 않고 새로운 맛과 즐거움을 찾아 떠나는 돈키호테처럼, 고객에게 최고의 경험을 선사합니다.'
  },
  {
    icon: '🤝',
    title: '정성과 신뢰',
    description: '신선한 재료 선택부터 정성 가득한 조리까지, 모든 과정에 우리의 진심을 담습니다.'
  },
  {
    icon: '🎨',
    title: '특별한 분위기',
    description: '단순한 음식 제공을 넘어, 즐거운 분위기와 특별한 경험을 연출합니다.'
  }
];

// 우리의 여정 데이터
const journey = [
  {
    year: '2020',
    title: '돈키호테의 시작',
    description: '맛있는 음식으로 사람들에게 행복을 전하겠다는 작은 꿈으로 시작했습니다.'
  },
  {
    year: '2021',
    title: '전국으로 확장',
    description: '수도권을 넘어 전국 각지의 행사장으로 찾아가는 서비스를 시작했습니다.'
  },
  {
    year: '2022',
    title: '메뉴 혁신',
    description: '한식과 세계 음식의 퓨전으로, 새로운 맛의 지평을 열었습니다.'
  },
  {
    year: '2023',
    title: '2000회 달성',
    description: '2000회 이상의 성공적인 행사 경험으로 더욱 성장했습니다.'
  }
];

export default function Introduction() {
  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/about-1.webp"
            alt="돈키호테 푸드트럭 소개"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            돈키호테 이야기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl"
          >
            현실에 안주하지 않고 새로운 맛과 즐거움을 찾아 떠나는 우리는,
            당신의 특별한 순간을 위한 맛있는 모험가입니다.
          </motion.p>
        </div>
      </section>

      {/* 우리의 가치 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            우리가 추구하는 가치
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 우리의 여정 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            우리의 여정
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            {journey.map((step, index) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start mb-12 last:mb-0"
              >
                <div className="w-24 flex-shrink-0">
                  <div className="text-2xl font-bold text-primary">{step.year}</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
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
            함께 특별한 순간을 만들어보세요
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl mb-12 max-w-2xl mx-auto"
          >
            돈키호테 푸드트럭이 여러분의 특별한 순간을 더욱 특별하게 만들어드립니다.
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
              견적 문의하기
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 