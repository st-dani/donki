import Image from 'next/image';
import Link from 'next/link';

export default function FooterLogo() {
  return (
    <Link href="/" className="inline-block">
      <div className="relative w-[180px] h-[45px]">
        <Image
          src="/images/logo/donkilogo.svg"
          alt="돈키호테 푸드트럭 로고"
          fill
          className="object-contain brightness-0 invert" // 로고를 흰색으로 변환
          priority
        />
      </div>
    </Link>
  );
}
