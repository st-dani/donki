import Link from 'next/link';
import { footerLinks } from '@/types/footer';

export default function FooterLinks() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">HELP</h3>
      <ul className="space-y-2 text-gray-300">
        <li>고객센타: 010-4680-5447</li>
        <li>(상담시간 09:00 ~ 22:00)</li>
        <li>고객문의: help@donki.kr</li>
        <li>제휴문의: business@donki.kr</li>
      </ul>
    </div>
  );
}