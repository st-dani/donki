'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const menuItems = [
  { href: '/introduction', label: '회사소개' },
  { href: '/menu', label: '메뉴' },
  { href: '/service', label: '서비스' },
  { href: '/estimate', label: '견적문의' },
  { href: '/blog', label: '블로그' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <Link
            href="/"
            className={`text-2xl font-bold transition-colors ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}
          >
            돈키호테
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-lg font-medium transition-colors ${
                    isScrolled
                      ? 'text-gray-700 hover:text-primary'
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        isScrolled ? 'bg-primary' : 'bg-white'
                      }`}
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div
              className={`w-6 h-0.5 mb-1.5 transition-colors ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              }`}
            />
            <div
              className={`w-6 h-0.5 mb-1.5 transition-colors ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              }`}
            />
            <div
              className={`w-6 h-0.5 transition-colors ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`md:hidden bg-white border-t ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-3 text-lg font-medium ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 