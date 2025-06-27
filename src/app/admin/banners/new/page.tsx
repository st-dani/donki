'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// 팝업 타입 정의 (Prisma 스키마와 일치)
enum PopupType {
  NOTICE = "NOTICE",
  EVENT = "EVENT"
}

export default function NewBanner() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일만 허용
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setImageFile(file);
    
    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert('이미지는 필수입니다.');
      return;
    }
    
    // 제목과 내용은 선택사항으로 변경

    setLoading(true);
    setError(null);
    
    try {
      // 1. 이미지 업로드
      const imageFormData = new FormData();
      imageFormData.append('file', imageFile);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: imageFormData,
      });
      
      if (!uploadRes.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }
      
      const { url: imageUrl } = await uploadRes.json();
      
      // 2. 팝업 데이터 생성
      const popupData = {
        title: title || "", // 제목이 비어있으면 빈 문자열
        content: content || "", // 내용은 NULL이 될 수 없으므로 빈 문자열 사용
        type: PopupType.EVENT, // 정확한 enum 값 사용
        imageUrl, // 이미지 URL은 필수
        linkUrl: linkUrl || "", // 링크가 비어있으면 빈 문자열
        isActive,
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : null,
        order: 0, // 기본 order 값 추가
      };
      
      console.log('서버로 전송할 데이터:', JSON.stringify(popupData, null, 2));
      
      const createRes = await fetch('/api/admin/popups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(popupData),
      });
      
      if (!createRes.ok) {
        // 응답 데이터 파싱 시도
        const errorData = await createRes.text();
        console.error('서버 오류 응답:', errorData);
        
        try {
          // JSON인 경우
          const errorJson = JSON.parse(errorData);
          throw new Error(
            errorJson.error || '이벤트/배너 생성에 실패했습니다.'
          );
        } catch (parseError) {
          // 파싱 오류이면 그냥 원본 텍스트 사용
          throw new Error(
            `이벤트/배너 생성에 실패했습니다. 응답: ${errorData.substring(0, 100)}...`
          );
        }
      }
      
      router.push('/admin/banners');
      
    } catch (error) {
      console.error('이벤트/배너 생성 오류:', error);
      setError(error instanceof Error ? error.message : '이벤트/배너 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">새 이벤트/배너 추가</h1>
        <Link
          href="/admin/banners"
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
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="이벤트/배너 제목 (선택사항)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              rows={4}
              placeholder="이벤트/배너 내용 (선택사항)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              이미지 <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="이미지 미리보기"
                  className="w-full max-h-48 object-contain"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="linkUrl">
              링크 URL
            </label>
            <input
              type="url"
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="https://example.com"
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
              onClick={() => router.push('/admin/banners')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded mr-2"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center"
            >
              {loading ? (
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
