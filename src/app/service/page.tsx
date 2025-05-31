'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// 서비스 데이터
const services = [
  {
    title: '기업 행사',
    description: '워크숍, 창립기념일, 체육대회 등 기업의 특별한 날을 더욱 특별하게 만들어드립니다. 행사 규모와 성격에 맞는 맞춤형 메뉴와 서비스를 제공합니다.',
    features: [
      '맞춤형 메뉴 구성',
      '현수막 및 배너 제작 지원',
      '행사장 분위기에 맞는 데코레이션',
      '위생적인 식사 제공 시스템'
    ],
    image: '/images/about-1.webp'
  },
  {
    title: '연예인 서포트',
    description: '촬영장, 콘서트장에서 스태프와 아티스트를 위한 든든한 서포트를 제공합니다. 빠른 서비스와 품격 있는 메뉴로 특별한 케이터링을 선사합니다.',
    features: [
      '24시간 긴급 출동 가능',
      '고급 메뉴 라인업',
      '위생적인 개별 포장',
      '맞춤형 시간 조율'
    ],
    image: '/images/about-2.webp'
  },
  {
    title: '학교 행사',
    description: '입학식, 졸업식, 축제 등 학교의 중요한 행사를 더욱 즐겁게 만들어드립니다. 학생들의 취향을 고려한 다양한 메뉴로 즐거운 추억을 선사합니다.',
    features: [
      '단체 주문 할인',
      '이벤트 게임 진행',
      '포토존 설치',
      '안전한 식품 관리'
    ],
    image: '/images/about-1.webp'
  },
  {
    title: '지역 축제',
    description: '각종 지역 축제와 행사에서 맛있는 음식과 함께 즐거운 분위기를 만들어드립니다. 지역 특색을 반영한 특별 메뉴도 준비할 수 있습니다.',
    features: [
      '대규모 인원 수용',
      '지역 특산물 활용 가능',
      '축제 분위기 연출',
      '위생 점검 완료'
    ],
    image: '/images/about-2.webp'
  }
];

// 서비스 프로세스
const process = [
  {
    step: '01',
    title: '상담 및 견적',
    description: '행사의 성격, 규모, 예산을 고려한 맞춤형 제안을 드립니다.'
  },
  {
    step: '02',
    title: '메뉴 선정',
    description: '고객의 선호도와 행사 특성을 반영한 최적의 메뉴를 구성합니다.'
  },
  {
    step: '03',
    title: '현장 답사',
    description: '완벽한 서비스를 위해 행사 장소를 사전 답사합니다.'
  },
  {
    step: '04',
    title: '행사 진행',
    description: '전문 인력이 정성을 다해 서비스를 제공합니다.'
  }
];

export default function Service() {
  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/about-1.webp"
            alt="돈키호테 푸드트럭 서비스"
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
            서비스 소개
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl"
          >
            어떤 순간이든 돈키호테와 함께라면 특별해집니다.
            당신의 행사에 맞는 최고의 서비스를 제공합니다.
          </motion.p>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            맞춤형 서비스
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <span className="text-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 프로세스 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            서비스 진행 과정
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-4">{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
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
            지금 바로 문의하세요
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl mb-12 max-w-2xl mx-auto"
          >
            돈키호테 푸드트럭이 여러분의 특별한 순간을 책임지겠습니다.
            지금 바로 견적을 문의해보세요.
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