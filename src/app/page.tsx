import Hero from '@/components/Hero';
import PartnerLogos from '@/components/PartnerLogos';
import BrandStories from '@/components/BrandStories';
// import NumbersSection from '@/components/NumbersSection'; // 일반 import 주석 처리
import dynamic from 'next/dynamic';

const NumbersSection = dynamic(() => import('@/components/NumbersSection'), {
  ssr: false,
  loading: () => <p>Loading Numbers...</p>,
});

export default function HomePage() {
  return (
    <main className="bg-white flex flex-col">
      <Hero />
      <PartnerLogos className="mt-2" />
      <BrandStories className="mt-20" />
      <NumbersSection className="mt-12" />
    </main>
  );
}
