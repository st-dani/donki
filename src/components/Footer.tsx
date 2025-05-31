'use client';

import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Footer() {
  const { trackEvent } = useAnalytics();

  const handleFooterLinkClick = (linkName: string) => {
    trackEvent('footer_link_click', { link: linkName });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold mb-4">돈키호테</h3>
            <ul className="space-y-2 text-gray-300">
              <li>대표: 김병현</li>
              <li>사업자등록번호: 587-44-00535</li>
              <li>주소: 경기도 수원시 권선구 서둔로 166</li>
              <li>
                전화:{' '}
                <a href="tel:010-4680-5447" className="hover:text-primary">
                  010-4680-5447
                </a>
              </li>
              <li>
                이메일:{' '}
                <a href="mailto:bgim6062@gmail.com" className="hover:text-primary">
                  bgim6062@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-xl font-bold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/introduction" className="text-gray-300 hover:text-primary">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-primary">
                  메뉴 안내
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-gray-300 hover:text-primary">
                  서비스 안내
                </Link>
              </li>
              <li>
                <Link href="/estimate" className="text-gray-300 hover:text-primary">
                  견적 문의
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-primary">
                  블로그
                </Link>
              </li>
            </ul>
          </div>

          {/* 소셜 및 문의 */}
          <div>
            <h3 className="text-xl font-bold mb-4">문의하기</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="http://pf.kakao.com/_xfSERG/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary"
                >
                  카카오톡 상담
                </a>
              </li>
              <li>
                <a
                  href="https://blog.naver.com/kincv12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary"
                >
                  네이버 블로그
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} 돈키호테. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 