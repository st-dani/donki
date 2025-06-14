import Image from 'next/image';

export default function IntroHero() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/imgdata/101/KakaoTalk_20240321_224705046.jpg"
          alt="돈키호테 푸드트럭 현장"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative max-w-[1920px] mx-auto px-4 md:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            INTERACTION MARKETING
          </h1>
          <p className="text-xl text-white/90 mb-8">
            맛있는 경험을 전하는 푸드트럭 서비스
          </p>
        </div>
      </div>
    </section>
  );
} 