export interface CompanyInfo {
  name: string;
  ceo: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
}

export interface FooterLink {
  id: string;
  name: string;
  href: string;
}

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
}

export const companyInfo: CompanyInfo = {
  name: '돈키호테',
  ceo: '김병현',
  registrationNumber: '587-44-00535',
  address: '경기도 수원시 권선구 서둔로 166',
  phone: '010-4680-5447',
  email: 'bgim6062@gmail.com'
};

export const footerLinks: FooterLink[] = [
  { id: 'introduction', name: '회사 소개', href: '/introduction' },
  { id: 'menu', name: '메뉴 안내', href: '/menu' },
  { id: 'service', name: '서비스 안내', href: '/service' },
  { id: 'estimate', name: '견적 문의', href: '/estimate' },
  { id: 'blog', name: '블로그', href: '/blog' }
];

export const socialLinks: SocialLink[] = [
  {
    id: 'kakao',
    name: '카카오톡 채널',
    href: '#',
    icon: 'kakao'
  },
  {
    id: 'blog',
    name: '네이버 블로그',
    href: 'https://blog.naver.com/kincv12',
    icon: 'blog',
    isExternal: true
  }
]; 