'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function Home() {
  const { trackEvent } = useAnalytics();

  const partners = [
    { name: 'KT', image: 'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_960_720.png' },
    { name: 'CJ', image: 'https://cdn.pixabay.com/photo/2015/04/13/17/45/icon-720944_960_720.png' },
    { name: 'Coupang', image: 'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_960_720.png' },
    { name: 'Shinsegae', image: 'https://cdn.pixabay.com/photo/2017/01/19/09/11/logo-1991872_960_720.png' },
    { name: 'DHL', image: 'https://cdn.pixabay.com/photo/2015/04/13/17/45/icon-720944_960_720.png' },
    { name: 'Naver', image: 'https://cdn.pixabay.com/photo/2017/01/19/09/11/logo-1991872_960_720.png' },
    { name: 'Musina', image: 'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_960_720.png' },
  ];

  const stories = [
    {
      title: '"푸드트럭의 새로운 기준을 보여줬어요"',
      role: '현대백화점 마케팅팀 과장',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/08/29/people-2563491_960_720.jpg'
    },
    {
      title: '"직원들 모두가 극찬한 케이터링"',
      role: '삼성전자 인사팀 팀장',
      image: 'https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_960_720.jpg'
    },
    {
      title: '"행사의 하이라이트였습니다"',
      role: '신세계 이벤트팀 매니저',
      image: 'https://cdn.pixabay.com/photo/2017/08/06/20/36/people-2595862_960_720.jpg'
    }
  ];

  const handleCtaClick = () => {
    trackEvent('cta_click', { location: 'hero_section' });
  };

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/mainbener.png"
            alt="돈키호테 푸드트럭 인터랙션 마케팅"
            fill
            className="object-contain"
            sizes="100vw"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-white"
        >
          <h1 className="text-7xl font-bold mb-8">
            LIVE WITH<br />ENERGY
          </h1>
          <p className="text-2xl mb-12 max-w-2xl">
            고객의 일상에 특별한 에너지를 불어넣는<br />
            돈키호테만의 프리미엄 푸드트럭 서비스
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
                WHEREVER,<br />
                WHENEVER,<br />
                EVERY MOMENTS
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                언제 어디서나 고객과 함께하는<br />
                돈키호테의 특별한 푸드트럭 경험
              </p>
              <Link
                href="/introduction"
                className="inline-block text-primary hover:text-primary-dark font-medium text-lg"
                onClick={() => trackEvent('link_click', { location: 'energy_section' })}
              >
                더 알아보기 →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="image-loading">
                <Image
                  src="https://cdn.pixabay.com/photo/2019/01/29/18/05/burger-3962996_960_720.jpg"
                  alt="Moment 1"
                  width={300}
                  height={400}
                  className="rounded-2xl"
                />
              </div>
              <div className="image-loading mt-8">
                <Image
                  src="https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_960_720.jpg"
                  alt="Moment 2"
                  width={300}
                  height={400}
                  className="rounded-2xl"
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
                  src="https://cdn.pixabay.com/photo/2017/08/06/20/36/people-2595862_960_720.jpg"
                  alt="Interactive Marketing"
                  width={600}
                  height={400}
                  className="rounded-2xl"
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
                onClick={() => trackEvent('link_click', { location: 'marketing_section' })}
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
                <div className="relative h-64 image-loading">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
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
              >
                <div className="image-loading">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={120}
                    height={40}
                    className="grayscale hover:grayscale-0 transition-all"
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
                onClick={() => trackEvent('cta_click', { location: 'bottom_section' })}
              >
                무료 견적 받기
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-white hover:bg-gray-50 text-primary px-8 py-3 rounded-full text-lg font-medium transition-colors"
                onClick={() => trackEvent('contact_click', { location: 'bottom_section' })}
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
