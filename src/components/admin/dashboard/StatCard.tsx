'use client';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export default function StatCard({ title, value, icon, color, percentage, trend }: StatCardProps) {
  let bgColor = '';
  let textColor = '';
  
  switch (color) {
    case 'blue':
      bgColor = 'bg-blue-500';
      textColor = 'text-blue-700';
      break;
    case 'red':
      bgColor = 'bg-red-500';
      textColor = 'text-red-700';
      break;
    case 'green':
      bgColor = 'bg-green-500';
      textColor = 'text-green-700';
      break;
    case 'yellow':
      bgColor = 'bg-yellow-500';
      textColor = 'text-yellow-700';
      break;
    case 'purple':
      bgColor = 'bg-purple-500';
      textColor = 'text-purple-700';
      break;
    default:
      bgColor = 'bg-gray-500';
      textColor = 'text-gray-700';
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${bgColor} rounded-md p-3 text-white`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {percentage !== undefined && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                    {trend === 'up' ? (
                      <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : trend === 'down' ? (
                      <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : null}
                    <span className="sr-only">{trend === 'up' ? '증가' : trend === 'down' ? '감소' : '변화없음'}</span>
                    {percentage}%
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`bg-gray-50 px-5 py-3 ${textColor}`}>
        <div className="text-sm">
          <a href="#" className="font-medium hover:text-opacity-75">
            자세히 보기
          </a>
        </div>
      </div>
    </div>
  );
}
