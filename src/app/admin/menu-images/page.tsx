import MenuBulkUploader from '@/components/MenuBulkUploader';

// 동적 렌더링 사용 - 관리자 페이지는 서버 컴포넌트이지만 데이터베이스 연결이 필요함
export const dynamic = 'force-dynamic';

export default async function MenuImageBulkUploadPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">메뉴 이미지 일괄 업로드</h1>
      <p className="mb-6 text-gray-600">
        이 페이지에서 메뉴 이미지를 UploadThing으로 일괄 업로드하고, 
        데이터베이스의 메뉴 정보와 연결할 수 있습니다. 
        이미지 파일명은 메뉴 이름과 일치해야 합니다.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <MenuBulkUploader />
      </div>
    </div>
  );
}
