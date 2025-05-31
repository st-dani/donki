'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// 핵심 서비스 데이터
const coreServices = [
  {
    icon: '🏢',
    title: '기업 행사',
    description: '워크숍부터 창립기념일까지, 특별한 순간을 함께합니다'
  },
  {
    icon: '🎬',
    title: '연예인 서포트',
    description: '촬영장에서 콘서트장까지, 달콤한 에너지를 전달합니다'
  },
  {
    icon: '🎓',
    title: '학교 행사',
    description: '입학식부터 축제까지, 즐거운 추억을 만듭니다'
  },
  {
    icon: '🎉',
    title: '축제 & 이벤트',
    description: '지역 축제부터 개인 파티까지, 특별한 분위기를 연출합니다'
  }
];

// 우리의 강점 데이터
const strengths = [
  {
    number: '2,000+',
    title: '행사 경험',
    description: '전국 방방곡곡의 특별한 순간'
  },
  {
    number: '98%',
    title: '고객 만족도',
    description: '맛과 서비스 모두 만족'
  },
  {
    number: '24/7',
    title: '맞춤 상담',
    description: '언제든 편하게 문의하세요'
  }
];

export default function Home() {
  return (
    <main>
      {/* 히어로 섹션 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.webp"
            alt="돈키호테 푸드트럭 메인 이미지"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            평범한 일상도 특별한 축제로!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            전국 어디든 달려가는 맛있는 모험, 돈키호테 푸드트럭
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/menu"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              메뉴 보기
            </Link>
            <Link
              href="/estimate"
              className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              견적 문의
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 핵심 서비스 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            특별한 순간을 더 특별하게
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 우리의 강점 섹션 */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{item.number}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-primary-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8"
          >
            새로운 맛의 모험을 시작하세요
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-12"
          >
            돈키호테 푸드트럭과 함께라면, 어떤 행사든 특별해집니다
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/introduction"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              돈키호테 이야기
            </Link>
            <Link
              href="/service"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              서비스 살펴보기
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
