'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-6 py-3 rounded-full text-lg font-medium
                    transition-colors duration-200 group
                    ${
                      isScrolled
                        ? 'text-gray-700 hover:text-primary'
                        : 'text-white hover:text-white'
                    }
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        isScrolled ? 'bg-primary' : 'bg-white'
                      }`}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <div
                    className={`
                      absolute inset-0 rounded-full opacity-0 
                      group-hover:opacity-10 transition-opacity
                      ${isScrolled ? 'bg-primary' : 'bg-white'}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 rounded-lg"
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block py-3 px-4 text-lg font-medium rounded-lg
                    ${
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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