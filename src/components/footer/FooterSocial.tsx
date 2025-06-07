'use client';

import { socialLinks } from '@/types/footer';
import KakaoChannel from '../KakaoChannel';

export default function FooterSocial() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">문의하기</h3>
      <ul className="space-y-2">
        {socialLinks.map((link) => (
          <li key={link.id}>
            {link.id === 'kakao' ? (
              <KakaoChannel />
            ) : (
              <a
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="text-gray-300 hover:text-primary"
              >
                {link.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 