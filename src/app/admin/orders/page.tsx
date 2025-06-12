'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menu: MenuItem;
}

interface Order {
  id: string;
  createdAt: string;
  status: 'PENDING' | 'PREPARING' | 'COMPLETED' | 'CANCELLED';
  items: OrderItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerRequest?: string;
  tableNumber?: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('주문 목록을 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: '오류',
        description: '주문 목록을 불러오는데 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('주문 상태 업데이트에 실패했습니다.');
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );

      toast({
        title: '성공',
        description: '주문 상태가 업데이트되었습니다.',
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: '오류',
        description: '주문 상태 업데이트에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PREPARING':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return '대기중';
      case 'PREPARING':
        return '준비중';
      case 'COMPLETED':
        return '완료';
      case 'CANCELLED':
        return '취소됨';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">주문 관리</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">
                  주문 #{order.id.slice(-6)}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">주문 정보</h3>
              <p>고객명: {order.customerName}</p>
              <p>연락처: {order.customerPhone}</p>
              {order.tableNumber && <p>테이블 번호: {order.tableNumber}</p>}
              {order.customerRequest && (
                <p>요청사항: {order.customerRequest}</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">주문 항목</h3>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.menu.name} x {item.quantity}
                    </span>
                    <span>{item.price.toLocaleString()}원</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-medium">
                <span>총 금액</span>
                <span>{order.totalAmount.toLocaleString()}원</span>
              </div>
            </div>

            {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
              <div className="border-t border-gray-200 pt-4 flex gap-2">
                {order.status === 'PENDING' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    준비 시작
                  </button>
                )}
                {order.status === 'PREPARING' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    완료 처리
                  </button>
                )}
                <button
                  onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  주문 취소
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 