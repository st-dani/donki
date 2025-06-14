'use client';

import { socialLinks } from '@/types/footer';
import KakaoChannel from '../KakaoChannel';
import { SiNaver } from 'react-icons/si';
import { FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function FooterSocial() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">SNS</h3>
      <div className="flex space-x-4 items-center mb-6">
        {/* 카카오톡 채널 */}
        <div className="text-gray-300 hover:text-yellow-400">
          <KakaoChannel />
        </div>
        
        {/* 네이버 블로그 */}
        <a 
          href="https://blog.naver.com/kincv12" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-green-500"
          aria-label="네이버 블로그"
        >
          <SiNaver size={20} />
        </a>

        {/* 인스타그램 */}
        <a 
          href="/instagram" 
          className="text-gray-300 hover:text-pink-500"
          aria-label="인스타그램"
        >
          <FaInstagram size={22} />
        </a>

        {/* 트위터 X */}
        <a 
          href="/twitter" 
          className="text-gray-300 hover:text-white"
          aria-label="X (트위터)"
        >
          <FaXTwitter size={20} />
        </a>

        {/* 유튜브 */}
        <a 
          href="/youtube" 
          className="text-gray-300 hover:text-red-500"
          aria-label="유튜브"
        >
          <FaYoutube size={22} />
        </a>
      </div>
    </div>
  );
}