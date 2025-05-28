'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Service() {
  const services = [
    {
      title: '복지 마케팅',
      description: '임직원 복지를 위한 맞춤형 푸드트럭 서비스',
      href: '/service/welfare',
      features: ['정기적 방문 서비스', '맞춤형 메뉴 구성', '직원 만족도 조사']
    },
    {
      title: '파트너십 마케팅',
      description: '브랜드 가치를 높이는 협력 마케팅',
      href: '/service/partnership',
      features: ['브랜드 콜라보레이션', '공동 프로모션', '마케팅 효과 분석']
    },
    {
      title: '브랜드 프로모션',
      description: '특별한 브랜드 경험을 제공하는 프로모션',
      href: '/service/brand',
      features: ['맞춤형 브랜딩', '이벤트 기획', '미디어 노출']
    },
    {
      title: 'F&B 팝업',
      description: '특별한 공간에서 진행되는 팝업 스토어',
      href: '/service/fnb',
      features: ['공간 디자인', '메뉴 개발', '운영 관리']
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
            <h1 className="text-4xl font-bold mb-8">서비스 소개</h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              돈키호테 푸드트럭은 다양한 형태의 프리미엄 푸드트럭 서비스를 제공합니다.<br />
              각 서비스는 고객의 니즈에 맞춰 최적화된 솔루션을 제공합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 서비스 목록 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={`/images/${service.title === '복지 마케팅' ? 'welfare-service.jpg' : 
                          service.title === '파트너십 마케팅' ? '제목 없음 (1200 x 800 px) (1).jpg' :
                          service.title === '브랜드 프로모션' ? '한국직원들이 푸드트럭앞에서 즐겁게 커피마시는 이미지를 생성해줘 (1).jpg' :
                          'welfare-service.jpg'}`}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
                  <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={service.href}
                    className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors"
                  >
                    자세히 보기
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">맞춤 견적 문의</h2>
            <p className="text-xl text-gray-600 mb-8">
              프로젝트에 맞는 최적의 서비스를 제안해드립니다.
            </p>
            <Link
              href="/estimate"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              무료 견적 받기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 