'use client';

import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'estimate' | 'order' | 'review' | 'user';
  title: string;
  description: string;
  timestamp: Date;
  status?: string;
  statusColor?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  title?: string;
}

export default function RecentActivity({ activities, title = '최근 활동' }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'estimate':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
      case 'order':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        );
      case 'review':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        );
      case 'user':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getStatusBadge = (status: string, color: string = 'gray') => {
    let bgColor = '';
    let textColor = '';

    switch(color) {
      case 'red':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
      case 'yellow':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      case 'green':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'blue':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'purple':
        bgColor = 'bg-purple-100';
        textColor = 'text-purple-800';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
    }

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="p-2 max-h-[400px] overflow-y-auto">
        <ul role="list" className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="py-4 px-4 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.description}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <p className="text-xs text-gray-500">
                    {format(activity.timestamp, 'MM/dd HH:mm')}
                  </p>
                  {activity.status && (
                    <div>{getStatusBadge(activity.status, activity.statusColor)}</div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 px-6 py-3">
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          모든 활동 보기
        </a>
      </div>
    </div>
  );
}
