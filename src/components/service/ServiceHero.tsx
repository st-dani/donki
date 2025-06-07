'use client';

interface ServiceHeroProps {
  title?: string;
  description?: string;
}

import AnimatedText from './AnimatedText';

export default function ServiceHero({ 
  title = "서비스 소개", 
  description = "특별한 순간을 더욱 특별하게 만드는 프리미엄 푸드트럭 서비스" 
}: ServiceHeroProps) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText title={title} description={description} />
      </div>
    </section>
  );
}