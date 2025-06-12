"use client";

import { useState } from 'react';
import { SerializableAdmin } from '@/app/admin/users/page';
import { format } from 'date-fns';
import AdminFormModal, { AdminFormData } from './AdminFormModal';
import { useToast } from '@/components/ui/use-toast';

interface UserClientProps {
  initialAdmins: SerializableAdmin[];
}

const UserClient: React.FC<UserClientProps> = ({ initialAdmins }) => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<SerializableAdmin[]>(initialAdmins);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<SerializableAdmin | null>(null);
  const [loading, setLoading] = useState(false);

  const openModal = (admin: SerializableAdmin | null = null) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAdmin(null);
    setIsModalOpen(false);
  };

  const refreshAdmins = async () => {
    try {
      const response = await fetch('/api/admin/admins');
      if (!response.ok) throw new Error('Failed to fetch admins');
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '오류',
        description: '관리자 목록을 새로고침하는데 실패했습니다.',
      });
    }
  };

  const handleFormSubmit = async (data: AdminFormData) => {
    setLoading(true);
    const isEditing = !!selectedAdmin;
    const url = isEditing ? `/api/admin/admins/${selectedAdmin.id}` : '/api/admin/admins';
    const method = isEditing ? 'PATCH' : 'POST';

    // 수정 시 비밀번호가 비어있으면 전송 데이터에서 제외
    if (isEditing && !data.password) {
      delete data.password;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = `관리자 ${isEditing ? '수정' : '추가'} 중 오류가 발생했습니다.`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // response.json()이 실패하면, 서버가 JSON이 아닌 응답을 보낸 경우입니다.
          // 이 경우 response.text()로 내용을 확인해볼 수 있습니다.
          console.error('Failed to parse error response as JSON:', await response.text());
        }
        throw new Error(errorMessage);
      }

      toast({
        title: '성공',
        description: `관리자가 성공적으로 ${isEditing ? '수정' : '추가'}되었습니다.`,
      });
      closeModal();
      await refreshAdmins();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: '오류',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말로 이 관리자를 삭제하시겠습니까?')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/admins/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete admin');
        }

        toast({ title: '성공', description: '관리자가 삭제되었습니다.' });
        await refreshAdmins();
      } catch (error) {
        toast({ variant: 'destructive', title: '오류', description: '관리자 삭제 중 오류가 발생했습니다.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">관리자 목록</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          새로 만들기
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">역할</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${admin.role === 'SUPER_ADMIN' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {admin.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(new Date(admin.createdAt), 'yyyy-MM-dd')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openModal(admin)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {admins.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">등록된 관리자가 없습니다.</p>
        </div>
      )}
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        initialData={selectedAdmin}
        loading={loading}
      />
    </div>
  );
};

export default UserClient;
