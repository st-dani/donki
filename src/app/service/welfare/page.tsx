'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function WelfareService() {
  const benefits = [
    {
      title: '직원 만족도 향상',
      description: '특별한 푸드 서비스로 직원들의 만족도를 높입니다.',
      icon: '😊'
    },
    {
      title: '업무 효율성 증대',
      description: '간편하고 맛있는 식사로 업무 집중도를 향상시킵니다.',
      icon: '📈'
    },
    {
      title: '기업 이미지 제고',
      description: '임직원을 위한 투자로 기업의 이미지를 향상시킵니다.',
      icon: '🏢'
    }
  ];

  const process = [
    {
      step: 1,
      title: '상담 및 니즈 파악',
      description: '기업의 상황과 직원들의 니즈를 정확히 파악합니다.'
    },
    {
      step: 2,
      title: '맞춤형 제안',
      description: '예산과 선호도를 고려한 최적의 서비스를 제안합니다.'
    },
    {
      step: 3,
      title: '시범 운영',
      description: '소규모 시범 운영을 통해 서비스를 검증합니다.'
    },
    {
      step: 4,
      title: '정기 서비스 시작',
      description: '피드백을 반영한 정기적인 서비스를 시작합니다.'
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
            <h1 className="text-4xl font-bold mb-8">복지 마케팅 서비스</h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              직원들의 만족도를 높이는 특별한 복지 솔루션,<br />
              돈키호테 푸드트럭과 함께 시작하세요.
            </p>
            {/* 히어로 이미지 */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src="/images/welfare-service.jpg"
                alt="복지 마케팅 서비스 - 직원들이 커피를 즐기는 모습"
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
              특별한 복지 혜택으로 직원들에게 새로운 경험을 선사하세요.
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