import Image from 'next/image';

export default function Logo() {
  return (
    <div className="relative w-[200px] h-[50px]">
      <Image
        src="/images/logo/logo3.png"
        alt="돈키호테 푸드트럭 로고"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
} 