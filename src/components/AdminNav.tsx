import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(path) ? 'bg-gray-900' : '';
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold">
                New Donki
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/admin"
                  className={`${isActive(
                    '/admin'
                  )} text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                >
                  대시보드
                </Link>
                <Link
                  href="/admin/menu"
                  className={`${isActive(
                    '/admin/menu'
                  )} text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                >
                  메뉴 관리
                </Link>
                <Link
                  href="/admin/orders"
                  className={`${isActive(
                    '/admin/orders'
                  )} text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                >
                  주문 관리
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 