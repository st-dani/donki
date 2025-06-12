import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '관리자 대시보드 - 돈키호테 푸드트럭',
  description: '돈키호테 푸드트럭 관리자 대시보드',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 dark">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/admin" className="text-xl font-bold hover:text-yellow-400 transition-colors">
            돈키호테 관리자
          </Link>
          <nav>
            <Link href="/admin/estimates" className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              상담 관리
            </Link>
            <Link href="/admin/menu" className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              메뉴 관리
            </Link>
          </nav>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 