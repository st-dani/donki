'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/types/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  // 개선된 isActive 함수: 현재 경로가 해당 섹션에 속하는지 확인
  const isActive = (link: typeof navLinks[0]) => {
    // pathname이 null인 경우 처리
    if (!pathname) return false;
    
    // 정확히 일치하는 경우
    if (link.items.some(item => item.href === pathname)) {
      return true;
    }
    
    // 하위 경로인 경우 (예: /menu/signature -> /menu)
    return link.items.some(item => {
      const mainPath = item.href;
      return pathname.startsWith(mainPath + '/') && mainPath !== '/';
    });
  };

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <div key={link.title} className="relative">
          <div className="flex items-center space-x-2">
            <Link
              href={link.items[0].href} // Always link to the first item
              className={`relative flex items-center space-x-2 ${
                isActive(link)
                  ? 'text-theme-orange-700 font-medium bg-theme-orange-700/20 rounded-full px-2 shadow-sm'
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