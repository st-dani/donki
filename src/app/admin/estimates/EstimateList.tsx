'use client';

import { useState } from 'react';
import { EstimateStatus } from '@/generated/prisma';
import { format } from 'date-fns';
import EstimateModal from '@/components/EstimateModal';

// Define a single, consistent type for the serialized estimate data
export type SerializedEstimate = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  date: string; // Serialized from DateTime
  location: string;
  attendees: number;
  details: string | null;
  status: EstimateStatus;
  createdAt: string; // Serialized from DateTime
  updatedAt: string; // Serialized from DateTime
};

// Props for the component
interface EstimateListProps {
  initialEstimates: SerializedEstimate[];
}

// Korean translations for status
const statusToKorean: { [key in EstimateStatus]: string } = {
  PENDING: '문의대기',
  CONFIRMED: '확인',
  REPLIED: '답변완료',
  IN_PROGRESS: '행사진행중',
  COMPLETED: '행사완료',
};

// Style mapping for status
const getStatusStyle = (status: EstimateStatus) => {
  switch (status) {
    case EstimateStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case EstimateStatus.CONFIRMED:
      return 'bg-green-100 text-green-800';
    case EstimateStatus.REPLIED:
      return 'bg-blue-100 text-blue-800';
    case EstimateStatus.IN_PROGRESS:
      return 'bg-purple-100 text-purple-800';
    case EstimateStatus.COMPLETED:
      return 'bg-gray-100 text-gray-800';
    default:
      return '';
  }
};

export default function EstimateList({ initialEstimates }: EstimateListProps) {
  const [estimates, setEstimates] = useState<SerializedEstimate[]>(initialEstimates);
  const [selectedEstimate, setSelectedEstimate] = useState<SerializedEstimate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (estimate: SerializedEstimate) => {
    setSelectedEstimate(estimate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEstimate(null);
  };

  const handleDelete = async () => {
    if (!selectedEstimate) return;

    if (window.confirm('정말로 이 상담 내역을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const response = await fetch(`/api/admin/estimates/${selectedEstimate.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '삭제에 실패했습니다.');
        }

        setEstimates((prev) => prev.filter((est) => est.id !== selectedEstimate.id));
        handleCloseModal();
        alert('상담 내역이 삭제되었습니다.');
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        alert((error as Error).message);
      }
    }
  };

  const handleStatusChange = async (newStatus: EstimateStatus) => {
    if (!selectedEstimate) return;

    try {
      const response = await fetch(`/api/admin/estimates/${selectedEstimate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('상태 변경에 실패했습니다.');
      }

      const updatedEstimate: SerializedEstimate = await response.json();
      
      // Update the list in the background
      setEstimates((prev) =>
        prev.map((est) => (est.id === updatedEstimate.id ? updatedEstimate : est))
      );
      
      // Update the estimate shown in the modal
      setSelectedEstimate(updatedEstimate);

    } catch (error) {
      console.error('상태 변경 중 오류 발생:', error);
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  if (!estimates || estimates.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">접수된 상담 문의가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">신청자명</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">연락처</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">서비스</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">행사일</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">인원</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">상태</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">접수일</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">상세보기</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {estimates.map((estimate) => (
                    <tr key={estimate.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleRowClick(estimate)}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{estimate.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{estimate.phone}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{estimate.service}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(new Date(estimate.date), 'yy/MM/dd')}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{estimate.attendees}명</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(estimate.status)}`}>
                          {statusToKorean[estimate.status]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(new Date(estimate.createdAt), 'yy/MM/dd HH:mm')}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button type="button" onClick={(e) => { e.stopPropagation(); handleRowClick(estimate); }} className="text-indigo-600 hover:text-indigo-900">
                          상세보기<span className="sr-only">, {estimate.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedEstimate && (
        <EstimateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          estimate={selectedEstimate}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </>
  );
} 