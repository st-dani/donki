'use client';

import Image from 'next/image';

const partners = [
  { id: 1, name: '삼성전자', logo: '/images/partners/Samsung.png' },
  { id: 2, name: 'SK', logo: '/images/partners/sk.png' },
  { id: 3, name: '현대자동차', logo: '/images/partners/hyundai.png' },
  { id: 4, name: 'LG', logo: '/images/partners/lg.png' },
  { id: 5, name: '포스코', logo: '/images/partners/posco.jpg' },
  { id: 6, name: '한화', logo: '/images/partners/hanwha.png' },
  { id: 7, name: 'GS', logo: '/images/partners/gs.png' },
  { id: 8, name: 'KT', logo: '/images/partners/kt.png' }
];

export default function PartnerLogos() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          신뢰할 수 있는 파트너
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          수많은 기업들이 돈키호테와 함께하고 있습니다
        </p>
      </div>

      <div className="relative overflow-hidden bg-white py-8">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* First row */}
        <div className="flex animate-slide">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-none w-[200px] mx-8 flex items-center justify-center"
            >
              <div className="relative w-full h-16 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second row sliding in opposite direction */}
        <div className="flex animate-slide-reverse mt-8">
          {[...partners.reverse(), ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}-reverse`}
              className="flex-none w-[200px] mx-8 flex items-center justify-center"
            >
              <div className="relative w-full h-16 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 