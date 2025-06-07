import Image from 'next/image';

export default function MenuHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/images/menu/don-quixote-hero.png"
          alt="돈키호테 메뉴 히어로 이미지"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-orange-50">
          돈키호테 메뉴
        </h1>
        <p className="text-xl md:text-2xl text-orange-50/90">
          신선한 재료와 특별한 레시피로 만드는<br />
          맛있는 모험의 시작
        </p>
      </div>
    </section>
  );
} 