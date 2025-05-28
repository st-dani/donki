'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function FnBService() {
  const benefits = [
    {
      title: '공간 활용',
      description: '특별한 공간을 활용한 독특한 다이닝 경험을 제공합니다.',
      icon: '🏠'
    },
    {
      title: '메뉴 개발',
      description: '공간과 브랜드에 어울리는 특별한 메뉴를 개발합니다.',
      icon: '🍽️'
    },
    {
      title: '운영 관리',
      description: '전문적인 운영 관리로 안정적인 서비스를 제공합니다.',
      icon: '⚙️'
    }
  ];

  const process = [
    {
      step: 1,
      title: '공간 기획',
      description: '브랜드 컨셉에 맞는 최적의 공간을 기획합니다.'
    },
    {
      step: 2,
      title: '메뉴 개발',
      description: '공간과 타겟에 맞는 특별한 메뉴를 개발합니다.'
    },
    {
      step: 3,
      title: '인테리어 설계',
      description: '브랜드 아이덴티티를 반영한 공간을 디자인합니다.'
    },
    {
      step: 4,
      title: '운영 관리',
      description: '전문 인력을 통한 안정적인 운영을 지원합니다.'
    }
  ];

  return (
    <div className="pt-32">
      {/* 서비스 소개 */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-8">F&B 팝업 서비스</h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              특별한 공간에서 진행되는 프리미엄 팝업 스토어,<br />
              돈키호테 푸드트럭과 함께 시작하세요.
            </p>
            {/* 히어로 이미지 */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src="/images/welfare-service.jpg"
                alt="F&B 팝업 서비스"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 서비스 혜택 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">기대 효과</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 프로세스 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">진행 과정</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex items-start"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-primary text-white rounded-full text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">지금 바로 시작하세요</h2>
            <p className="text-xl text-gray-600 mb-8">
              특별한 공간에서 새로운 F&B 경험을 만들어보세요.
            </p>
            <Link
              href="/estimate"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              무료 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 