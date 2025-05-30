'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const handleCtaClick = () => {
    console.log('CTA clicked');
  };

  const partners = [
    { name: 'KT', image: 'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_960_720.png', width: 120, height: 40 },
    { name: 'CJ', image: 'https://cdn.pixabay.com/photo/2015/04/13/17/45/icon-720944_960_720.png', width: 100, height: 40 },
    { name: 'Coupang', image: 'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_960_720.png', width: 140, height: 40 },
    { name: 'Shinsegae', image: 'https://cdn.pixabay.com/photo/2017/01/19/09/11/logo-1991872_960_720.png', width: 130, height: 40 },
    { name: 'DHL', image: 'https://cdn.pixabay.com/photo/2015/04/13/17/45/icon-720944_960_720.png', width: 100, height: 40 },
    { name: 'Naver', image: 'https://cdn.pixabay.com/photo/2017/01/19/09/11/logo-1991872_960_720.png', width: 110, height: 40 },
    { name: 'Musina', image: 'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_960_720.png', width: 120, height: 40 },
  ];

  const stories = [
    {
      title: '"푸드트럭의 새로운 기준을 보여줬어요"',
      role: '현대백화점 마케팅팀 과장',
      image: '/images/welfare-service.jpg'
    },
    {
      title: '"직원들 모두가 극찬한 케이터링"',
      role: '삼성전자 인사팀 팀장',
      image: '/images/brand-story-2.jpg'
    },
    {
      title: '"행사의 하이라이트였습니다"',
      role: '신세계 이벤트팀 매니저',
      image: '/images/brand-story-1.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/mainbener.png"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(1.1) contrast(0.95) saturate(1.05)' }}
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#ffd700]/10 mix-blend-soft-light" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-white"
        >
          <h1 className="text-7xl font-bold mb-8">
            HAPPINESS ON<br />WHEELS
          </h1>
          <p className="text-2xl mb-12 max-w-2xl">
            맛있는 행복을 전하는 푸드트럭<br />
            돈키호테와 함께하는 특별한 미식 여행
          </p>
          <Link
            href="/estimate"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-xl font-medium transition-colors"
            onClick={() => handleCtaClick()}
          >
            견적 문의하기
          </Link>
        </motion.div>
      </section>

      {/* 에너지 섹션 */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-5xl font-bold mb-8">
                DELICIOUS<br />
                MOMENTS,<br />
                ANYWHERE
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                도시의 모든 순간이 맛있어집니다<br />
                당신의 특별한 날에 찾아가는 미식 서비스
              </p>
              <Link
                href="/introduction"
                className="inline-block text-primary hover:text-primary-dark font-medium text-lg"
              >
                더 알아보기 →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="image-loading">
                <Image
                  src="/images/welfare-service.jpg"
                  alt="돈키호테 푸드트럭 서비스"
                  width={300}
                  height={400}
                  className="rounded-2xl object-cover"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="image-loading mt-8">
                <Image
                  src="/images/fun-student.png"
                  alt="돈키호테 푸드트럭 현장"
                  width={300}
                  height={520}
                  className="rounded-2xl object-cover"
                  style={{ width: '100%', height: 'auto', aspectRatio: '3/4' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 인터랙션 마케팅 섹션 */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="order-2 md:order-1">
              <div className="image-loading">
                <Image
                  src="/images/brand-story-1.jpg"
                  alt="돈키호테 인터랙션 마케팅"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-8">
                INTERACTION<br />
                MARKETING
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                단순한 푸드트럭 그 이상의 가치.<br />
                고객과 직접 소통하는 새로운 마케팅 채널을<br />
                돈키호테와 함께 만들어보세요.
              </p>
              <Link
                href="/service"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                서비스 알아보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 브랜드 스토리 섹션 */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            STORIES OF BRANDS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative h-64 image-loading overflow-hidden rounded-t-2xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                  <p className="text-gray-600">{story.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 파트너 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-7 gap-8 items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-full h-[40px] image-loading">
                  <Image
                    src={partner.image}
                    alt={`${partner.name} 로고`}
                    width={partner.width}
                    height={partner.height}
                    className="object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8">
              돈키호테와 함께<br />
              특별한 푸드트럭 경험을 만들어보세요
            </h2>
            <div className="flex justify-center gap-4">
              <Link
                href="/estimate"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                무료 견적 받기
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-white hover:bg-gray-50 text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
