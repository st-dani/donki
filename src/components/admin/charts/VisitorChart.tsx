'use client';

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VisitorChartProps {
  title?: string;
}

export default function VisitorChart({ title = '일일 방문자 통계' }: VisitorChartProps) {
  // 차트 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  };

  // 최근 7일 데이터 생성
  const today = new Date();
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
  }
  
  const data = {
    labels,
    datasets: [
      {
        label: '방문자 수',
        data: [340, 285, 425, 365, 490, 520, 450],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderRadius: 4,
      },
      {
        label: '페이지뷰',
        data: [540, 485, 625, 565, 690, 720, 650],
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div style={{ height: '300px' }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
