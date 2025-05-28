'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function PartnershipService() {
  const benefits = [
    {
      title: '브랜드 시너지',
      description: '양사의 강점을 결합한 시너지 효과를 창출합니다.',
      icon: '🤝'
    },
    {
      title: '마케팅 효과',
      description: '새로운 고객층 확보와 브랜드 인지도를 향상시킵니다.',
      icon: '📈'
    },
    {
      title: '비용 효율성',
      description: '공동 마케팅을 통한 비용 절감 효과를 얻습니다.',
      icon: '💰'
    }
  ];

  const process = [
    {
      step: 1,
      title: '파트너 미팅',
      description: '양사의 비전과 목표를 공유하고 협력 방안을 논의합니다.'
    },
    {
      step: 2,
      title: '전략 수립',
      description: '구체적인 협력 방안과 마케팅 전략을 수립합니다.'
    },
    {
      step: 3,
      title: '콘텐츠 제작',
      description: '협업을 통한 특별한 메뉴와 프로모션을 기획합니다.'
    },
    {
      step: 4,
      title: '프로모션 진행',
      description: '공동 마케팅 활동을 통해 시너지를 창출합니다.'
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
            <h1 className="text-4xl font-bold mb-8">파트너십 마케팅 서비스</h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              브랜드 가치를 높이는 특별한 협력 마케팅,<br />
              돈키호테 푸드트럭과 함께 시작하세요.
            </p>
            {/* 히어로 이미지 */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl mb-12">
              <Image
                src="/images/제목 없음 (1200 x 800 px) (1).jpg"
                alt="파트너십 마케팅 서비스"
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
              특별한 협력을 통해 새로운 가치를 만들어보세요.
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