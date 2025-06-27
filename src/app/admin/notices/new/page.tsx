'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Prisma 스키마와 동일한 팝업 타입 정의
enum PopupType {
  NOTICE = "NOTICE",
  EVENT = "EVENT"
}

export default function NewNoticePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목은 필수입니다.');
      return;
    }
    
    if (!content.trim()) {
      alert('내용은 필수입니다.');
      return;
    }

    setSubmitting(true);
    
    try {
      // 팝업 데이터 생성
      const newPopup = {
        title,
        content,
        type: PopupType.NOTICE, // enum 사용하여 정확한 타입 지정
        isActive,
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : null,
      };
      
      const res = await fetch('/api/admin/popups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPopup),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.log('서버 오류 응답:', errorData);
        throw new Error(`공지사항 생성에 실패했습니다. 응답: ${JSON.stringify(errorData)}`);
      }
      
      router.push('/admin/notices');
    } catch (error) {
      console.error('공지사항 생성 오류:', error);
      setError(error instanceof Error ? error.message : '공지사항 생성 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">새 공지사항 추가</h1>
        <Link
          href="/admin/notices"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          목록으로 돌아가기
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="공지사항 제목"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              rows={8}
              placeholder="공지사항 내용"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              게시 기간
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => date && setStartDate(date)}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="시작일"
                />
              </div>
              <span>~</span>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="종료일 (무기한일 경우 비워두세요)"
                  isClearable
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="mr-2 form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">활성화</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push('/admin/notices')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded mr-2"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded flex items-center"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  저장 중...
                </>
              ) : (
                '저장'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
