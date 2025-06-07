import Hero from '@/components/Hero';
import PartnerLogos from '@/components/PartnerLogos';
import BrandStories from '@/components/BrandStories';
import CTASection from '@/components/CTASection';
import NumbersSection from '@/components/NumbersSection';

export default function HomePage() {
  return (
    <main className="bg-white">
      <Hero />
      <PartnerLogos />
      <BrandStories />
      <NumbersSection />
      <CTASection />
    </main>
  );
}
