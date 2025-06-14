'use client';

import Image from 'next/image';

const partners = [
  { id: 1, name: '삼성전자', logo: '/partners/Samsung-logo.png' },
  { id: 2, name: 'SK 그룹', logo: '/partners/sk_group.png' },
  { id: 3, name: 'LG', logo: '/partners/lg.png' },
  { id: 4, name: '포스코', logo: '/partners/posco.png' },
  { id: 5, name: '한화오션', logo: '/partners/hanwha_ocean.png' },
  { id: 6, name: 'GS 칼텍스', logo: '/partners/gs_caltex.png' },
  { id: 7, name: '카카오', logo: '/partners/kakao.png' },
  { id: 8, name: 'CJ 그룹', logo: '/partners/cj_group.png' },
  { id: 9, name: '두산', logo: '/partners/doosan.png' },
  { id: 10, name: '대한항공', logo: '/partners/korean_air.png' },
  { id: 11, name: '롯데', logo: '/partners/lotte.png' }
];

interface PartnerLogosProps {
  className?: string;
}

export default function PartnerLogos({ className }: PartnerLogosProps) {
  return (
    <section className={`pt-4 pb-2 bg-white relative overflow-hidden ${className || ''}`} style={{ minHeight: 'auto' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-white opacity-70" />
        <div className="absolute -top-1/2 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute -bottom-1/2 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-2 relative z-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          "진심으로 함께해 주셔서 감사합니다"
        </h2>
      </div>

      <div className="relative overflow-hidden bg-white py-2">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white/50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/50 to-transparent z-10"></div>

        {/* Single row with continuous sliding */}
        <div className="flex">
          <div className="flex animate-slide-slower">
            {[...partners, ...partners, ...partners, ...partners, ...partners].map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="flex-none w-[200px] h-24 mx-6 flex items-center justify-center">
                <div className={`relative w-full h-full max-h-24 transition-all duration-300 rounded-lg overflow-hidden ${
                  partner.name.includes('카카오') ? 'scale-[1.2] grayscale hover:grayscale-0' :
                  partner.name.includes('포스코') ? 'scale-[2.2] grayscale hover:grayscale-0' :
                  partner.name.includes('대한항공') ? 'scale-[2.2] grayscale hover:grayscale-0' :
                  'hover:scale-105 hover:grayscale-0'
                }`}>
                  <div className="relative w-full h-full">
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain p-4" sizes="(max-width: 200px) 100vw, 200px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}