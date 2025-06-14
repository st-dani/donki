'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  IconChevronDown, 
  IconChevronRight, 
  IconDashboard, 
  IconListDetails, 
  IconMenu2, 
  IconUsers, 
  IconShoppingCart, 
  IconBell, 
  IconLogout, 
  IconMenu 
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
    <div className="mb-1">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center text-sm py-3 px-4 rounded-lg transition-colors
          ${isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-grow">{text}</span>
        {isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
      </button>
      {isOpen && (
        <div className="pl-10 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  ) : (
    <Link href={href}
      className={`flex items-center text-sm py-3 px-4 rounded-lg transition-colors mb-1
        ${isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  // 인증 상태 확인
  useEffect(() => {
    // 로그인 페이지는 인증 검사에서 제외
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }
    
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/check');
        const data = await response.json();
        
        if (!data.isAuthenticated) {
          console.log('인증되지 않은 사용자, 로그인 페이지로 리다이렉트');
          router.push('/admin/login');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('인증 확인 중 오류 발생:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [pathname, router]);

  const isActive = (path: string): boolean => {
    if (!pathname) return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  useEffect(() => {
    // Close sidebar on mobile by default
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Run once on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 로그인 페이지일 경우
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-100">{children}</div>;
  }
  
  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // 인증 실패
  if (!isAuthenticated && pathname !== '/admin/login') {
    return null; // 로그인 페이지로 리다이렉트 중
  }
  
  // 인증 성공
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-gray-800 text-white transition-all duration-300 fixed md:static z-20 h-full md:h-screen
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo */}
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <Link href="/admin" className="flex items-center">
              <span className={`ml-2 text-lg font-bold ${!isSidebarOpen && 'md:hidden'}`}>돈키호테 관리자</span>
            </Link>
          </div>
          
          {/* Sidebar Menu */}
          <div className="flex-1 py-4 px-2 overflow-y-auto">
            <nav className="space-y-1">
              <SidebarItem 
                href="/admin" 
                icon={<IconDashboard size={20} />} 
                text="대시보드" 
                isActive={isActive('/admin')} 
              />
              <SidebarItem 
                href="/admin/estimates" 
                icon={<IconListDetails size={20} />} 
                text="상담 관리" 
                isActive={isActive('/admin/estimates')} 
              />
              <SidebarItem 
                href="/admin/menus" 
                icon={<IconMenu2 size={20} />} 
                text="메뉴 관리" 
                isActive={isActive('/admin/menus')} 
              />
              <SidebarItem 
                href="/admin/users" 
                icon={<IconUsers size={20} />} 
                text="회원 관리" 
                isActive={isActive('/admin/users')} 
              />
              <SidebarItem 
                href="/admin/gallery" 
                icon={<IconMenu size={20} />} 
                text="서비스 갤러리" 
                isActive={isActive('/admin/gallery')} 
              />
              {/* 주문 기능이 필요없어 주문 관리 메뉴 제거 */}
            </nav>
          </div>
          
          {/* User Info */}
          <div className="p-4 border-t border-gray-700">
            <Link href="/admin/logout" className="flex items-center text-sm text-gray-300 hover:text-white">
              <IconLogout size={18} className="mr-2" />
              <span className={!isSidebarOpen ? 'md:hidden' : ''}>로그아웃</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <IconMenu size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)} 
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <IconBell size={20} />
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
                      알림
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">새 견적 문의가 접수되었습니다.</p>
                        <p className="text-xs text-gray-500 mt-1">10분 전</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm text-gray-500">새로운 알림이 없습니다.</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 text-xs text-center text-blue-600 hover:text-blue-800 border-t border-gray-200">
                      <button>모든 알림 보기</button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">관리자</span>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  관
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} 돈키호테 푸드트럭. All rights reserved.</p>
        </footer>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}