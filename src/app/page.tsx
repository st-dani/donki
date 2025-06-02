import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PartnerLogos from '@/components/PartnerLogos';
import BrandStories from '@/components/BrandStories';
import CTASection from '@/components/CTASection';
import Stats from '@/components/Stats';

export default function Home() {
  return (
    <main className="bg-white">
      <Navigation />
      <Hero />
      <BrandStories />
      <Stats />
      <CTASection />
      <PartnerLogos />

      {/* 푸터 */}
      <footer className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">© 2024 DONKI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
