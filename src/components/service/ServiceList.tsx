import ServiceCard from './ServiceCard';

const services = [
  {
    title: '브랜드',
    description: '고객사 브랜드와 맞는 맞춤형 메뉴와 서비스를 제공합니다. 브랜드 이미지와 일치하는 특별한 케이터링을 선사합니다.',
    features: [
      '브랜드 맞춤 메뉴',
      '특색 있는 디자인',
      '프리미엄 서비스',
      '고객 맞춤형 솔루션'
    ],
    image: '/images/about-1.webp'
  },
  {
    title: 'F&B',
    description: '다양한 음식과 음료를 제공하는 프리미엄 케이터링 서비스를 제공합니다. 품질과 위생을 최우선으로 고려합니다.',
    features: [
      '품질 보장',
      '다양한 메뉴',
      '위생 관리',
      '고객 맞춤형 메뉴'
    ],
    image: '/images/about-2.webp'
  },
  {
    title: '파트너십',
    description: '다양한 업체들과의 파트너십을 통해 특별한 서비스를 제공합니다. 협력업체와의 협업으로 더 나은 서비스를 제공합니다.',
    features: [
      '다양한 파트너십',
      '특화된 서비스',
      '협력업체 협업',
      '맞춤형 솔루션'
    ],
    image: '/images/about-1.webp'
  },
  {
    title: '복지',
    description: '직원들의 복지를 위한 특별한 케이터링 서비스를 제공합니다. 직원들의 만족도를 높이는 특별한 식사 경험을 제공합니다.',
    features: [
      '직원 맞춤형 메뉴',
      '위생적 환경',
      '품질 보장',
      '고객 만족도'
    ],
    image: '/images/about-2.webp'
  }
];

export default function ServiceList() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          맞춤형 서비스
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 