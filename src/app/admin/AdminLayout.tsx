'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  IconDashboard, IconListDetails, IconMenu2, 
  IconUsers, IconShoppingCart, IconBell, 
  IconLogout, IconChevronRight, IconChevronDown, IconMenu
} from '@tabler/icons-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  hasChildren?: boolean;
  children?: React.ReactNode;
}

function SidebarItem({ href, icon, text, isActive, hasChildren, children }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return hasChildren ? (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 group ${isActive ? 'bg-gray-700' : ''}`}
      >
        <div className="mr-2">{icon}</div>
        <span className="flex-1 text-left">{text}</span>
        {isOpen ? 
          <IconChevronDown size={16} className="text-gray-400" /> : 
          <IconChevronRight size={16} className="text-gray-400" />
        }
      </button>
      {isOpen && (
        <div className="pl-8 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  ) : (
    <div className="mb-2">
      <Link 
        href={href}
        className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 group ${isActive ? 'bg-gray-700' : ''}`}
      >
        <div className="mr-2">{icon}</div>
        <span>{text}</span>
      </Link>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  // 화면 크기 변경시 모바일 사이드바 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 사이드바 (데스크톱) */}
      <aside className="fixed top-0 left-0 z-40 h-screen w-64 hidden md:block bg-gray-800 text-white transition-all">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="mb-5 px-2 flex items-center">
            <div className="text-xl font-bold">돈키호테 관리자</div>
          </div>
          
          <div className="space-y-2">
            <Link 
              href="/admin"
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin' ? 'bg-gray-700' : ''}`}
            >
              <IconDashboard size={20} className="mr-2" />
              <span>대시보드</span>
            </Link>
            
            <Link 
              href="/admin/estimates" 
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin/estimates' || pathname.startsWith('/admin/estimates/') ? 'bg-gray-700' : ''}`}
            >
              <IconListDetails size={20} className="mr-2" />
              <span>상담 관리</span>
            </Link>
            
            <Link 
              href="/admin/menu" 
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin/menu' || pathname.startsWith('/admin/menu/') ? 'bg-gray-700' : ''}`}
            >
              <IconMenu2 size={20} className="mr-2" />
              <span>메뉴 관리</span>
            </Link>
            
            <Link 
              href="/admin/users" 
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin/users' || pathname.startsWith('/admin/users/') ? 'bg-gray-700' : ''}`}
            >
              <IconUsers size={20} className="mr-2" />
              <span>회원 관리</span>
            </Link>
            

            
            <Link 
              href="/admin/orders" 
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin/orders' || pathname.startsWith('/admin/orders/') ? 'bg-gray-700' : ''}`}
            >
              <IconShoppingCart size={20} className="mr-2" />
              <span>주문 관리</span>
            </Link>
          </div>
          
          <div className="pt-4 mt-4 border-t border-gray-700">
            <Link 
              href="/admin/logout"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700"
            >
              <IconLogout size={20} className="mr-2" />
              <span>로그아웃</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* 모바일 사이드바 배경 오버레이 */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-30 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
      
      {/* 모바일 사이드바 */}
      <aside className={`fixed top-0 left-0 z-40 h-screen w-64 md:hidden bg-gray-800 text-white transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="mb-5 px-2 flex items-center">
            <div className="text-xl font-bold">돈키호테 관리자</div>
          </div>
          
          <div className="space-y-2">
            <Link 
              href="/admin"
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin' ? 'bg-gray-700' : ''}`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <IconDashboard size={20} className="mr-2" />
              <span>대시보드</span>
            </Link>
            
            {/* 다른 네비게이션 아이템은 데스크탑과 동일... */}
            <Link 
              href="/admin/estimates" 
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin/estimates' || pathname.startsWith('/admin/estimates/') ? 'bg-gray-700' : ''}`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <IconListDetails size={20} className="mr-2" />
              <span>상담 관리</span>
            </Link>
            
            <Link 
              href="/admin/menu" 
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin/menu' || pathname.startsWith('/admin/menu/') ? 'bg-gray-700' : ''}`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <IconMenu2 size={20} className="mr-2" />
              <span>메뉴 관리</span>
            </Link>
            
            <Link 
              href="/admin/users" 
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin/users' || pathname.startsWith('/admin/users/') ? 'bg-gray-700' : ''}`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <IconUsers size={20} className="mr-2" />
              <span>회원 관리</span>
            </Link>
            

            
            <Link 
              href="/admin/orders" 
              className={`flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700 ${pathname === '/admin/orders' || pathname.startsWith('/admin/orders/') ? 'bg-gray-700' : ''}`}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <IconShoppingCart size={20} className="mr-2" />
              <span>주문 관리</span>
            </Link>
          </div>
          
          <div className="pt-4 mt-4 border-t border-gray-700">
            <Link 
              href="/admin/logout"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-700"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <IconLogout size={20} className="mr-2" />
              <span>로그아웃</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <div className="md:ml-64 min-h-screen">
        {/* 헤더 */}
        <header className="bg-white shadow-sm py-3 px-4 md:px-6 flex items-center justify-between">
          <button
            type="button"
            className="md:hidden text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg p-2"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <IconMenu size={20} />
          </button>
          
          <div className="hidden md:block"></div>
          
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-700 hover:text-gray-900">
              <IconBell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="text-sm font-medium text-gray-700">관리자님</div>
          </div>
        </header>
        
        {/* 페이지 콘텐츠 */}
        <main className="p-4 md:p-6">
          {children}
        </main>
        
        {/* 푸터 */}
        <footer className="bg-white p-4 md:p-6 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 돈키호테 푸드트럭. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
