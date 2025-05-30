'use client';

import Link from 'next/link';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

const BLOG_CATEGORIES = [
  '기업행사',
  '연예인',
  '공공기관',
  '학교',
  '유치원',
  '행사축제'
] as const;

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex space-x-8">
            <Link href="/introduction" className="hover:text-primary">소개</Link>
            <div className="relative group">
              <Link href="/service" className="hover:text-primary">서비스</Link>
              <div className="absolute hidden group-hover:block w-40 bg-white shadow-md rounded-lg mt-1 py-1 transform -translate-x-2">
                <div className="absolute h-2 w-full -top-2"></div>
                <Link href="/service/welfare" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">복지 마케팅</Link>
                <Link href="/service/partnership" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">파트너십 마케팅</Link>
                <Link href="/service/brand" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">브랜드 프로모션</Link>
                <Link href="/service/fnb" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">F&B 팝업</Link>
              </div>
            </div>
            <div className="relative group">
              <Link href="/blog" className="hover:text-primary">블로그</Link>
              <div className="absolute hidden group-hover:block w-32 bg-white shadow-md rounded-lg mt-1 py-1 transform -translate-x-2">
                <div className="absolute h-2 w-full -top-2"></div>
                <Link href="/blog" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">전체</Link>
                {BLOG_CATEGORIES.map((category) => (
                  <Link 
                    key={category}
                    href={`/blog?category=${category}`} 
                    className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative group">
              <Link href="/menu" className="hover:text-primary">메뉴</Link>
              <div className="absolute hidden group-hover:block w-28 bg-white shadow-md rounded-lg mt-1 py-1 transform -translate-x-2">
                <div className="absolute h-2 w-full -top-2"></div>
                <Link href="/menu/popular" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">인기메뉴</Link>
                <Link href="/menu/beverage" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">음료</Link>
                <Link href="/menu/bakery" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">베이커리</Link>
                <Link href="/menu/snack" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">간식</Link>
                <Link href="/menu/meal" className="block px-3 py-2 text-sm hover:bg-gray-50 transition-colors">식사</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/estimate" className="hidden md:block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full text-sm transition-colors">
              간단 무료견적
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .group:hover .group-hover\\:block {
          display: block;
          animation: fadeIn 0.15s ease-out;
        }
        
        .group .group-hover\\:block {
          display: none;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group:hover .absolute {
          padding-top: 0.25rem;
          margin-top: -0.25rem;
        }
      `}</style>
    </nav>
  );
} 