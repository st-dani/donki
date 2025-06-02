'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-theme-white/80 backdrop-blur-md border-b border-theme-yellow/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="group hover:opacity-80 transition-opacity"
          >
            <Logo />
          </Link>
          <div className="flex items-center space-x-6">
            <Link 
              href="/introduction" 
              className={`${
                isActive('/introduction') 
                  ? 'text-theme-yellow font-medium' 
                  : 'text-theme-black hover:text-theme-yellow'
              } transition-colors`}
            >
              소개
            </Link>
            <Link 
              href="/menu" 
              className={`${
                isActive('/menu') 
                  ? 'text-theme-yellow font-medium' 
                  : 'text-theme-black hover:text-theme-yellow'
              } transition-colors`}
            >
              메뉴
            </Link>
            <Link 
              href="/service" 
              className={`${
                isActive('/service') 
                  ? 'text-theme-yellow font-medium' 
                  : 'text-theme-black hover:text-theme-yellow'
              } transition-colors`}
            >
              서비스
            </Link>
            <Link 
              href="/blog" 
              className={`${
                isActive('/blog') 
                  ? 'text-theme-yellow font-medium' 
                  : 'text-theme-black hover:text-theme-yellow'
              } transition-colors`}
            >
              블로그
            </Link>
            <Link 
              href="/estimate" 
              className="group relative inline-flex items-center px-6 pr-10 py-2.5 text-sm font-medium text-theme-white rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              상담문의
              <svg 
                className="absolute right-4 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 