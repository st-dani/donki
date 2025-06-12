import NotificationSubscribe from '@/components/NotificationSubscribe';
import NotificationSender from '@/components/NotificationSender';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">관리자 페이지</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">알림 설정</h2>
          <NotificationSubscribe />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">알림 전송</h2>
          <NotificationSender />
        </div>
      </div>
    </div>
  );
}