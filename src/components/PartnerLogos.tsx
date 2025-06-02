'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const partners = [
  { name: '삼성전자', logo: '/images/partners/Samsung.png' },
  { name: 'SK', logo: '/images/partners/sk.png' },
  { name: '현대자동차', logo: '/images/partners/hyundai.png' },
  { name: 'LG', logo: '/images/partners/lg.png' },
  { name: '포스코', logo: '/images/partners/posco.jpg' },
  { name: '한화', logo: '/images/partners/hanwha.png' },
  { name: 'GS', logo: '/images/partners/gs.png' },
  { name: 'KT', logo: '/images/partners/kt.png' }
];

export default function PartnerLogos() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full py-4 border-t border-gray-100 relative z-50">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500 text-lg mb-4">함께 해주신 고객사</p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="w-32 h-16">
                <div className="relative h-full w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 