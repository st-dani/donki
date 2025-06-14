import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EstimateStatus } from '@/generated/prisma';
import type { SerializedEstimate } from '@/app/admin/estimates/EstimateList';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: SerializedEstimate;
  onStatusChange: (status: EstimateStatus) => void;
  onDelete: () => void;
  // 메모 저장 후 부모 컴포넌트의 상태를 업데이트하기 위한 콜백
  onUpdateEstimate?: (updatedEstimate: SerializedEstimate) => void;
}

export default function EstimateModal({
  isOpen,
  onClose,
  estimate,
  onStatusChange,
  onDelete,
  onUpdateEstimate,
}: EstimateModalProps) {
  const [adminNotes, setAdminNotes] = useState(estimate.adminNotes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const handleSaveNotes = async () => {
    if (adminNotes === estimate.adminNotes) return; // 변경이 없으면 저장하지 않음

    setIsSavingNotes(true);
    try {
      const response = await fetch(`/api/admin/estimates/${estimate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes }),
      });

      if (!response.ok) {
        throw new Error('관리자 메모 저장에 실패했습니다.');
      }

      // 응답에서 업데이트된 견적 데이터 추출
      const updatedEstimate: SerializedEstimate = await response.json();
      
      // 부모 컴포넌트에 업데이트된 견적 데이터 전달
      if (onUpdateEstimate) {
        onUpdateEstimate(updatedEstimate);
      }
      
      alert('관리자 메모가 저장되었습니다.');
    } catch (error) {
      console.error('메모 저장 중 오류 발생:', error);
      alert('메모 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSavingNotes(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      상담 상세 정보
                    </Dialog.Title>
                    <div className="mt-5 border-t border-gray-200">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            신청자
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {estimate.name}
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            연락처
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {estimate.phone}
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            이메일
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {estimate.email}
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            서비스
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {estimate.service}
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            희망 날짜
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {estimate.date ? new Date(estimate.date).toLocaleDateString() : '미정'}
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            행사 장소
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {estimate.location}
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            참석 인원
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {estimate.attendees}명
                          </dd>
                        </div>
                        {estimate.details && (
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              상세 내용
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {estimate.details}
                            </dd>
                          </div>
                        )}
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            상태
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <select
                              value={estimate.status}
                              onChange={(e) => onStatusChange(e.target.value as EstimateStatus)}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value={EstimateStatus.PENDING}>문의대기</option>
                              <option value={EstimateStatus.CONFIRMED}>확인</option>
                              <option value={EstimateStatus.REPLIED}>답변완료</option>
                              <option value={EstimateStatus.IN_PROGRESS}>행사진행중</option>
                              <option value={EstimateStatus.COMPLETED}>행사완료</option>
                            </select>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            관리자 메모
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <div className="flex flex-col">
                              <textarea
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                rows={4}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="내부용 메모를 입력하세요"
                              />
                              <button
                                type="button"
                                onClick={handleSaveNotes}
                                disabled={isSavingNotes || adminNotes === estimate.adminNotes}
                                className="mt-2 self-end inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                              >
                                {isSavingNotes ? '저장중...' : '메모 저장'}
                              </button>
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={onClose}
                  >
                    닫기
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={onDelete}
                  >
                    삭제
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 