import { prisma } from '@/lib/prisma';
import UserClient from '@/components/admin/users/UserClient';
import type { Admin } from '@/generated/prisma';

// 정적 생성 비활성화 - 빌드 시 데이터베이스 접근 방지
export const dynamic = 'force-dynamic';

// 클라이언트 컴포넌트로 전달하기 위해 Date 객체를 string으로 변환한 타입
export type SerializableAdmin = Omit<Admin, 'password' | 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

const AdminUsersPage = async () => {
  // 비밀번호 필드를 제외하고 모든 관리자 정보를 가져옵니다.
  const admins: Omit<Admin, 'password'>[] = await prisma.admin.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // 날짜 필드를 JSON으로 직렬화 가능한 문자열로 변환합니다.
  const serializableAdmins: SerializableAdmin[] = admins.map(admin => ({
    ...admin,
    createdAt: admin.createdAt.toISOString(),
    updatedAt: admin.updatedAt.toISOString(),
  }));

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
        <p className="text-sm text-gray-500 mt-1">사이트 운영자를 추가, 수정, 삭제할 수 있습니다.</p>
      </div>
      <UserClient initialAdmins={serializableAdmins} />
    </div>
  );
};

export default AdminUsersPage;
