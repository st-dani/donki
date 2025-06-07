'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/types/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <div key={link.title} className="relative group">
          <div className="flex items-center space-x-2">
            <Link
              href={link.items[0].href} // Always link to the first item
              className={`relative flex items-center space-x-2 ${
                isActive(link.items[0].href)
                  ? 'text-theme-orange font-medium bg-theme-orange/20 rounded-full px-2 shadow-sm'
                  : 'text-theme-black hover:text-orange-500'
              } transition-colors`}
            >
              <span>{link.title}</span>
              {link.items.length > 1 && (
                <svg
                  className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200"
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
              )}
            </Link>
          </div>
          {link.items.length > 1 && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0">
              <div className="py-2">
                {link.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-sm ${
                      isActive(item.href)
                        ? 'text-theme-orange bg-theme-orange/20 rounded-full shadow-sm'
                        : 'text-theme-black hover:bg-orange-500'
                    } transition-colors`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}