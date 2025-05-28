'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: '소개',
      href: '/introduction'
    },
    {
      title: '서비스',
      href: '/service'
    },
    {
      title: '블로그',
      href: '/blog'
    },
    {
      title: '메뉴',
      href: '/menu'
    }
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-primary"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-50"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-primary">돈키호테</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-primary"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-6">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-xl hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </a>
                ))}
                <a
                  href="/estimate"
                  className="block text-xl text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  간단 무료견적
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 