import Link from 'next/link';
import { footerLinks } from '@/types/footer';

export default function FooterLinks() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">바로가기</h3>
      <ul className="space-y-2">
        {footerLinks.map((link) => (
          <li key={link.id}>
            <Link href={link.href} className="text-gray-300 hover:text-primary">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 