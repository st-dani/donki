'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function IntroductionPage() {
  const stats = [
    { number: '2,150', label: '누적 서비스 건수', plus: true },
    { number: '6,320', label: '누적 방문자 수', plus: true },
    { number: '108', label: '협력사', plus: false },
    { number: '180', label: '전문 인력', plus: true },
    { number: '80', label: '보유 차량', plus: true },
  ];

  const services = [
    {
      title: '복지 케이터링',
      description: '직원들을 위한 특별한 푸드트럭 케이터링',
      image: 'https://cdn.pixabay.com/photo/2019/11/14/11/13/food-truck-4625351_1280.jpg'
    },
    {
      title: '마케팅 이벤트',
      description: '브랜드를 위한 특별한 마케팅 솔루션',
      image: 'https://cdn.pixabay.com/photo/2017/06/29/20/09/food-2456038_1280.jpg'
    },
    {
      title: '브랜드 프로모션',
      description: '새로운 방식의 브랜드 프로모션',
      image: 'https://cdn.pixabay.com/photo/2019/06/25/13/59/city-4298285_1280.jpg'
    },
    {
      title: '기업 행사',
      description: '특별한 순간을 위한 푸드 솔루션',
      image: 'https://cdn.pixabay.com/photo/2019/09/15/14/35/festival-4477999_1280.jpg'
    }
  ];

  const advantages = [
    {
      icon: '🚚',
      title: '차별화된 푸드트럭',
      description: '최신 트렌드를 반영한 프리미엄 푸드트럭'
    },
    {
      icon: '📍',
      title: '전국 어디서나',
      description: '전국 각지 서비스 제공'
    },
    {
      icon: '🎁',
      title: '맞춤형 솔루션',
      description: '고객 맞춤형 서비스 제공'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://cdn.pixabay.com/photo/2019/11/14/11/13/food-truck-4625351_1280.jpg"
            alt="Interaction Marketing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            INTERACTION MARKETING
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            새로운 방식의 푸드트럭 마케팅을 경험해보세요
          </motion.p>
        </div>
      </section>

      {/* 편한 냉비 섹션 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-bold mb-8 relative">
              편한
              <span className="absolute top-1/2 w-16 h-0.5 bg-black ml-4"></span>
              냉비
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl">
              "맛있는 음식으로 당신의 브랜드를 살리다!"<br />
              특별한 순간을 더욱 특별하게 만드는 돈키호테만의 서비스
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Image
              src="https://cdn.pixabay.com/photo/2019/11/14/11/13/food-truck-4625351_1280.jpg"
              alt="Food Service 1"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <Image
              src="https://cdn.pixabay.com/photo/2017/06/29/20/09/food-2456038_1280.jpg"
              alt="Food Service 2"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <Image
              src="https://cdn.pixabay.com/photo/2019/06/25/13/59/city-4298285_1280.jpg"
              alt="Food Service 3"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <Image
              src="https://cdn.pixabay.com/photo/2019/09/15/14/35/festival-4477999_1280.jpg"
              alt="Food Service 4"
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">BY THE NUMBERS</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                  {stat.plus && '+'}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">OUR SERVICE</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-lg"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60">
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 장점 섹션 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">ADVANTAGES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-24 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            기프트카와 함께 할 준비가 되셨나요?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
          >
            문의하기
          </Link>
        </div>
      </section>
    </div>
  );
} 