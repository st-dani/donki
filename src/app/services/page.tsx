'use client';

import { useState } from 'react';
import Image from 'next/image';
import HeroSlider from '@/components/services/HeroSlider';

const serviceCards = [
  {
    title: '푸드트럭 창업 컨설팅',
    description: '초기 창업자를 위한 맞춤형 컨설팅 서비스를 제공합니다.',
    icon: '🚚'
  },
  {
    title: '메뉴 기획 및 레시피',
    description: '트렌디한 메뉴 기획과 차별화된 레시피를 제공합니다.',
    icon: '🍽️'
  },
  {
    title: '마케팅 전략 수립',
    description: '효과적인 마케팅 전략으로 매출 증대를 지원합니다.',
    icon: '📈'
  }
];

const features = [
  {
    title: '전문 컨설팅',
    description: '10년 이상의 푸드트럭 운영 노하우를 바탕으로 한 전문적인 컨설팅',
    icon: '💡'
  },
  {
    title: '맞춤형 솔루션',
    description: '각 상황에 맞는 최적의 솔루션 제공으로 빠른 성장 지원',
    icon: '🎯'
  },
  {
    title: '지속적인 관리',
    description: '오픈 이후에도 지속적인 관리와 피드백으로 안정적인 운영 지원',
    icon: '📊'
  }
];

const galleryImages = [
  '/images/gallery/food-1.jpg',
  '/images/gallery/food-2.jpg',
  '/images/gallery/food-3.jpg',
  '/images/gallery/food-4.jpg',
  '/images/gallery/food-5.jpg',
  '/images/gallery/food-6.jpg',
];

const priceDetails = [
  '푸드트럭 창업 전문 컨설팅',
  '메뉴 기획 및 레시피 제공',
  '마케팅 전략 수립',
  '위치 선정 컨설팅',
  '인허가 관련 행정 지원',
  '초기 운영 교육',
];

const reviews = [
  {
    name: '김창업',
    business: '타코 푸드트럭',
    rating: 5,
    content: '전문적인 컨설팅 덕분에 안정적으로 오픈할 수 있었습니다. 특히 메뉴 기획과 마케팅 전략이 큰 도움이 되었어요.',
    image: '/images/reviews/review-1.jpg'
  },
  {
    name: '이성공',
    business: '버거 푸드트럭',
    rating: 5,
    content: '처음부터 끝까지 세세한 부분까지 신경써주셔서 감사합니다. 덕분에 매출이 꾸준히 상승하고 있어요!',
    image: '/images/reviews/review-2.jpg'
  },
  {
    name: '박만족',
    business: '핫도그 푸드트럭',
    rating: 5,
    content: '인허가부터 운영까지 모든 과정을 도와주셔서 큰 어려움 없이 창업할 수 있었습니다.',
    image: '/images/reviews/review-3.jpg'
  }
];

export default function ServicePage() {
  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-[500px]">
        <HeroSlider />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto px-4 py-12 relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              푸드트럭 신규 오픈 1위 솔루션
            </h1>
            <div className="flex items-center mb-6">
              <div className="flex text-orange-500">
                {'★'.repeat(5)}
              </div>
              <span className="ml-2 text-white">(5.0)</span>
            </div>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors">
              무료상담 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* 핵심 서비스 섹션 */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            푸드트럭 창업, 이렇게 도와드립니다
          </h2>
          <p className="text-gray-600 text-center mb-12">
            전문가의 노하우로 성공적인 창업을 지원합니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((card) => (
              <div key={card.title} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 특징 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            왜 우리 서비스일까요?
          </h2>
          <p className="text-gray-600 text-center mb-12">
            10년 이상의 노하우로 검증된 전문 서비스를 제공합니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            우리의 푸드트럭 성공사례
          </h2>
          <p className="text-gray-600 text-center mb-12">
            실제 고객들의 성공 스토리를 확인해보세요
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, index) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가격 정보 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">컨설팅 비용 안내</h2>
              <div className="text-center mb-8">
                <div className="text-5xl font-bold mb-2">
                  <span className="text-orange-500">￦4,900,000</span>
                </div>
                <p className="text-gray-400">부가세 별도</p>
              </div>
              <div className="space-y-4 mb-8">
                {priceDetails.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-orange-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors">
                무료 상담 신청하기
              </button>
              <p className="text-sm text-gray-400 text-center mt-4">
                * 상담 후 맞춤형 견적 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 리뷰 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            고객 후기
          </h2>
          <p className="text-gray-600 text-center mb-12">
            실제 고객님들의 생생한 후기를 확인해보세요
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.name} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.business}</p>
                  </div>
                </div>
                <div className="flex text-orange-500 mb-3">
                  {'★'.repeat(review.rating)}
                </div>
                <p className="text-gray-600">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            전문가와 함께라면 푸드트럭 창업이 어렵지 않습니다.
            지금 무료 상담을 신청하고 성공적인 창업을 시작하세요.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors">
            무료 상담 신청하기
          </button>
        </div>
      </section>
    </main>
  );
} 