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
        <div key={link.title} className="relative">
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
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}