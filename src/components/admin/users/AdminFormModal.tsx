"use client";

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Role } from '@/generated/prisma';
import { SerializableAdmin } from '@/app/admin/users/page';

export interface AdminFormData {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
}

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminFormData) => void;
  initialData?: SerializableAdmin | null;
  loading: boolean;
}

const AdminFormModal: React.FC<AdminFormModalProps> = ({ isOpen, onClose, onSubmit, initialData, loading }) => {
  const [formData, setFormData] = useState<AdminFormData>({ name: '', email: '', password: '', role: Role.ADMIN });

  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        password: '',
      });
    } else {
      setFormData({ name: '', email: '', password: '', role: 'ADMIN' as Role });
    }
  }, [initialData, isEditing, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {isEditing ? '관리자 수정' : '새 관리자 추가'}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      비밀번호 {isEditing && <span className="text-xs text-gray-500">(변경할 경우에만 입력)</span>}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required={!isEditing}
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">역할</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value={Role.ADMIN}>Admin</option>
                      <option value={Role.SUPER_ADMIN}>Super Admin</option>
                    </select>
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500">취소</button>
                    <button type="submit" disabled={loading} className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-400">
                      {loading ? '저장 중...' : (isEditing ? '수정' : '추가')}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AdminFormModal;
