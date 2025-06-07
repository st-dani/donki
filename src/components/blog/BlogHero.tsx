import Image from 'next/image';

export default function BlogHero() {
  return (
    <section className="relative bg-gradient-to-b from-orange-50/80 to-white py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blog/blog-hero.png"
          alt="Food Truck Illustration"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          돈키호테 푸드트럭 이야기
        </h1>
        <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto">
          맛있는 경험을 전하는 푸드트럭, 돈키호테의 다양한 이야기를 소개합니다.
          행사 현장 스토리부터 푸드트럭 운영 노하우까지 유익한 정보를 전해드립니다.
        </p>
      </div>
    </section>
  );
} 