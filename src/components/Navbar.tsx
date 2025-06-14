'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/donkilogo.svg"
              alt="돈키호테 푸드트럭"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-primary">돈키호테</span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/menu"
              className={`font-medium hover:text-primary transition-colors ${
                isActive('/menu') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              메뉴
            </Link>
            <Link
              href="/about"
              className={`font-medium hover:text-primary transition-colors ${
                isActive('/about') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              우리 이야기
            </Link>
            <Link
              href="/estimate"
              className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-[#E85A24] transition-colors"
            >
              견적 문의
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } pb-4`}
        >
          <Link
            href="/menu"
            className={`block py-2 font-medium hover:text-primary transition-colors ${
              isActive('/menu') ? 'text-primary' : 'text-gray-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            메뉴
          </Link>
          <Link
            href="/about"
            className={`block py-2 font-medium hover:text-primary transition-colors ${
              isActive('/about') ? 'text-primary' : 'text-gray-700'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            우리 이야기
          </Link>
          <Link
            href="/estimate"
            className="block py-2 font-medium text-primary hover:text-[#E85A24] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            견적 문의
          </Link>
        </div>
      </div>
    </nav>
  );
} 