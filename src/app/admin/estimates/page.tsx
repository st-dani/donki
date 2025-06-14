import { prisma } from '@/lib/prisma';
import EstimateList from './EstimateList';

// Ensure the page is dynamically rendered to fetch the latest data on each request.
export const dynamic = 'force-dynamic';

async function getEstimates() {
  const estimates = await prisma.estimate.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return estimates;
}

export default async function AdminEstimatesPage() {
  const estimates = await getEstimates();

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">상담 관리</h1>
          <p className="mt-2 text-sm text-gray-500">
            접수된 상담 문의 목록입니다. 상태를 변경하여 관리하세요.
          </p>
        </div>
      </div>
      <EstimateList initialEstimates={JSON.parse(JSON.stringify(estimates))} />
    </div>
  );
}