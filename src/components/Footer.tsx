'use client';

import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Footer() {
  const { trackEvent } = useAnalytics();

  const handleFooterLinkClick = (linkName: string) => {
    trackEvent('footer_link_click', { link: linkName });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">돈키호테 푸드트럭</h3>
            <p className="mb-4">고객의 일상에 특별한 에너지를 불어넣는 프리미엄 푸드트럭 서비스</p>
            <div className="space-y-2 text-sm">
              <p>사업자등록번호: 123-45-67890</p>
              <p>대표: 홍길동</p>
              <p>주소: 서울특별시 강남구 테헤란로 123</p>
              <p>이메일: contact@donquixote.com</p>
              <p>전화: 02-1234-5678</p>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">서비스</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/service" 
                  className="hover:text-primary transition-colors"
                  onClick={() => handleFooterLinkClick('service')}
                >
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link 
                  href="/estimate" 
                  className="hover:text-primary transition-colors"
                  onClick={() => handleFooterLinkClick('estimate')}
                >
                  견적 문의
                </Link>
              </li>
              <li>
                <Link 
                  href="/portfolio" 
                  className="hover:text-primary transition-colors"
                  onClick={() => handleFooterLinkClick('portfolio')}
                >
                  포트폴리오
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">고객지원</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/faq" 
                  className="hover:text-primary transition-colors"
                  onClick={() => handleFooterLinkClick('faq')}
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-primary transition-colors"
                  onClick={() => handleFooterLinkClick('contact')}
                >
                  문의하기
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="hover:text-primary transition-colors"
                  onClick={() => handleFooterLinkClick('privacy')}
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="hover:text-primary transition-colors"
                  onClick={() => handleFooterLinkClick('terms')}
                >
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} 돈키호테 푸드트럭. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 