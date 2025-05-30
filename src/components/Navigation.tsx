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
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2 py-2">
                <Link href="/service/welfare" className="block px-4 py-2 hover:bg-gray-50">복지 마케팅</Link>
                <Link href="/service/partnership" className="block px-4 py-2 hover:bg-gray-50">파트너십 마케팅</Link>
                <Link href="/service/brand" className="block px-4 py-2 hover:bg-gray-50">브랜드 프로모션</Link>
                <Link href="/service/fnb" className="block px-4 py-2 hover:bg-gray-50">F&B 팝업</Link>
              </div>
            </div>
            <div className="relative group">
              <Link href="/blog" className="hover:text-primary">블로그</Link>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2 py-2">
                <Link href="/blog" className="block px-4 py-2 hover:bg-gray-50">전체</Link>
                {BLOG_CATEGORIES.map((category) => (
                  <Link 
                    key={category}
                    href={`/blog?category=${category}`} 
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative group">
              <Link href="/menu" className="hover:text-primary">메뉴</Link>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2 py-2">
                <Link href="/menu/popular" className="block px-4 py-2 hover:bg-gray-50">인기메뉴</Link>
                <Link href="/menu/beverage" className="block px-4 py-2 hover:bg-gray-50">음료</Link>
                <Link href="/menu/bakery" className="block px-4 py-2 hover:bg-gray-50">베이커리</Link>
                <Link href="/menu/snack" className="block px-4 py-2 hover:bg-gray-50">간식</Link>
                <Link href="/menu/meal" className="block px-4 py-2 hover:bg-gray-50">식사</Link>
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
    </nav>
  );
} 