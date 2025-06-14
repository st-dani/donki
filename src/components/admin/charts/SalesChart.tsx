'use client';

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesChartProps {
  title?: string;
}

export default function SalesChart({ title = '매출 추이' }: SalesChartProps) {
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

  // 차트 데이터 (샘플)
  const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월'];
  
  const data = {
    labels,
    datasets: [
      {
        label: '2025년',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
        fill: true,
      },
      {
        label: '2024년',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div style={{ height: '300px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
