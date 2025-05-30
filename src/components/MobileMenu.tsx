'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Link from 'next/link';

const BLOG_CATEGORIES = [
  '기업행사',
  '연예인',
  '공공기관',
  '학교',
  '유치원',
  '행사축제'
] as const;

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const menuItems = [
    {
      title: '소개',
      href: '/introduction'
    },
    {
      title: '서비스',
      href: '/service',
      subItems: [
        { title: '복지 마케팅', href: '/service/welfare' },
        { title: '파트너십 마케팅', href: '/service/partnership' },
        { title: '브랜드 프로모션', href: '/service/brand' },
        { title: 'F&B 팝업', href: '/service/fnb' }
      ]
    },
    {
      title: '블로그',
      href: '/blog',
      subItems: [
        { title: '전체', href: '/blog' },
        ...BLOG_CATEGORIES.map(category => ({
          title: category,
          href: `/blog?category=${category}`
        }))
      ]
    },
    {
      title: '메뉴',
      href: '/menu',
      subItems: [
        { title: '인기메뉴', href: '/menu/popular' },
        { title: '음료', href: '/menu/beverage' },
        { title: '베이커리', href: '/menu/bakery' },
        { title: '간식', href: '/menu/snack' },
        { title: '식사', href: '/menu/meal' }
      ]
    }
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-primary"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 w-full bg-white shadow-lg"
          >
            <div className="p-4">
              {menuItems.map((item) => (
                <div key={item.title} className="py-2">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => setExpandedSection(
                          expandedSection === item.title ? null : item.title
                        )}
                        className="w-full flex justify-between items-center text-left"
                      >
                        <span className="text-gray-800 hover:text-primary">
                          {item.title}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            expandedSection === item.title ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {expandedSection === item.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-2 space-y-2">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className="block text-gray-600 hover:text-primary"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-gray-800 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t">
                <Link
                  href="/estimate"
                  className="block w-full bg-primary hover:bg-primary-dark text-white text-center px-6 py-2 rounded-full transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  간단 무료견적
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 