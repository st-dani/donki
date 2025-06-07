import { companyInfo } from '@/types/footer';

export default function FooterInfo() {
  return (
    <div className="col-span-2">
      <h3 className="text-xl font-bold mb-4">{companyInfo.name}</h3>
      <ul className="space-y-2 text-gray-300">
        <li>대표: {companyInfo.ceo}</li>
        <li>사업자등록번호: {companyInfo.registrationNumber}</li>
        <li>주소: {companyInfo.address}</li>
        <li>
          전화:{' '}
          <a href={`tel:${companyInfo.phone}`} className="hover:text-primary">
            {companyInfo.phone}
          </a>
        </li>
        <li>
          이메일:{' '}
          <a href={`mailto:${companyInfo.email}`} className="hover:text-primary">
            {companyInfo.email}
          </a>
        </li>
      </ul>
    </div>
  );
} 