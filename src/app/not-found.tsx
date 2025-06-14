import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <Link
          href="/"
          className="bg-theme-mint-600 text-white px-6 py-3 rounded-lg hover:bg-theme-mint-700 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
} 