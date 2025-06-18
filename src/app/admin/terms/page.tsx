'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// AdminLayout은 app/admin/layout.tsx에 정의되어 있으므로 import가 필요 없음

interface Term {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  version?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminTermsPage() {
  const router = useRouter();
  const [terms, setTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 쿠키를 통한 인증 확인
        const response = await fetch('/api/admin/auth/check');
        const data = await response.json();
        
        if (!data.isAuthenticated) {
          // 인증되지 않았으면 로그인 페이지로 이동
          router.push('/admin/login');
          return;
        }
        
        // localStorage에 토큰이 있는지도 확인 (이전 버전과의 호환성을 위해)
        const token = localStorage.getItem('adminToken');
        setAdminToken(token);
      } catch (error) {
        console.error('인증 확인 중 오류:', error);
        router.push('/admin/login');
      }
    };
    
    checkAuth();
  }, [router]);

  // 약관 목록 가져오기
  useEffect(() => {
    const fetchTerms = async () => {
      if (!adminToken) return;
      
      try {
        setIsLoading(true);
        
        // 쿠키 기반 인증 사용 - 헤더 제거
        const response = await fetch('/api/admin/terms', {
          // credentials: 'include' 옵션을 추가하면 쿠키가 함께 전송됨
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('약관을 불러오는데 실패했습니다.');
        }
        
        const data = await response.json();
        setTerms(data);
      } catch (err) {
        console.error('Error fetching terms:', err);
        setError(err instanceof Error ? err.message : '약관을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, [adminToken]); // adminToken이 설정되면 재실행

  const handleEditTerm = (id: string) => {
    router.push(`/admin/terms/edit/${id}`);
  };

  const handleCreateTerm = () => {
    router.push('/admin/terms/create');
  };

  const handleDeleteTerm = async (id: string) => {
    if (!window.confirm('정말로 이 약관을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/terms/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      if (!response.ok) {
        throw new Error('약관 삭제에 실패했습니다.');
      }

      // 성공적으로 삭제되면 목록에서 제거
      setTerms(terms.filter(term => term.id !== id));
    } catch (err) {
      console.error('Error deleting term:', err);
      setError('약관 삭제 중 오류가 발생했습니다.');
    }
  };

  const toggleTermStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/terms/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (!response.ok) {
        throw new Error('약관 상태 변경에 실패했습니다.');
      }

      // 상태 업데이트
      setTerms(terms.map(term => 
        term.id === id ? { ...term, isActive: !term.isActive } : term
      ));
    } catch (err) {
      console.error('Error toggling term status:', err);
      alert(err instanceof Error ? err.message : '약관 상태 변경에 실패했습니다.');
    }
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">약관 관리</h1>
          <p className="mt-2 text-sm text-gray-700">
            웹사이트에 표시되는 이용약관 및 개인정보처리방침을 관리합니다.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleCreateTerm}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            새 약관 등록
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="mt-8 flex justify-center">
          <div className="loader">로딩 중...</div>
        </div>
      ) : error ? (
        <div className="mt-8 bg-red-50 p-4 rounded-md">
          <div className="text-red-700">{error}</div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        제목
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        버전
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        상태
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        마지막 수정일
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {terms.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-center">
                          등록된 약관이 없습니다. 새 약관을 등록해주세요.
                        </td>
                      </tr>
                    ) : (
                      terms.map((term) => (
                        <tr key={term.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {term.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {term.version || '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                term.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {term.isActive ? '활성화' : '비활성화'}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDate(term.updatedAt)}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => toggleTermStatus(term.id, term.isActive)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                {term.isActive ? '비활성화' : '활성화'}
                              </button>
                              <button
                                onClick={() => handleEditTerm(term.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDeleteTerm(term.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                삭제
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
