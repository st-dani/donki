import { companyInfo } from '@/types/footer';

export default function FooterInfo() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">COMPANY INFORMATION</h3>
      <ul className="space-y-2 text-gray-300">
        <li>본사: {companyInfo.address}</li>
        <li>센터: {companyInfo.center || '경기도 안산시 상록구 건건동 삼천리2길 11-5'}</li>
        <li>사업자등록번호: {companyInfo.registrationNumber}</li>
        <li>대표이사: {companyInfo.ceo}</li>
      </ul>
    </div>
  );
} 