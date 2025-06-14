import FooterInfo from './footer/FooterInfo';
import FooterLinks from './footer/FooterLinks';
import FooterSocial from './footer/FooterSocial';
import FooterLogo from './footer/FooterLogo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* 로고 중앙 배치 */}
        <div className="flex justify-center mb-10">
          <FooterLogo />
        </div>

        {/* 링크 메뉴 상단 배치 및 가운데 정렬 */}
        <div className="flex justify-center space-x-6 mb-10">
          <a href="/about" className="hover:text-white">이용약관</a>
          <a href="/privacy" className="hover:text-white">개인정보처리방침</a>
          <a href="/instagram" className="hover:text-white">INSTAGRAM</a>
          <a href="/blog" className="hover:text-white">BLOG</a>
          <a href="/youtube" className="hover:text-white">YOUTUBE</a>
        </div>
        
        {/* 회사 정보 섬션 */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center gap-4 mb-10">
          <FooterInfo />
          <div className="md:flex gap-12">
            <FooterLinks />
            <FooterSocial />
          </div>
        </div>

        {/* 코피라이트 */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-gray-400">
          <div className="flex justify-center items-center">
            <div>
              © Donki.Inc {new Date().getFullYear()} All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 