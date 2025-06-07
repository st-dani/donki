export interface NavItem {
  title: string;
  href: string;
}

export interface NavLink {
  title: string;
  items: NavItem[];
}

export const navLinks: NavLink[] = [
  {
    title: '소개',
    items: [
      { title: '회사 소개', href: '/introduction' } // '/vision' removed
    ]
  },
  {
    title: '서비스',
    items: [
      { title: '서비스 소개', href: '/service' }
    ]
  },
  {
    title: '메뉴',
    items: [
      { title: '전체 메뉴', href: '/menu' },
      { title: '시그니처', href: '/menu/signature' },
      { title: '신메뉴', href: '/menu/new' }
    ]
  },
  {
    title: '블로그',
    items: [
      { title: '전체', href: '/blog' },
      { title: '기업행사', href: '/blog/corporate' },
      { title: '촬영장', href: '/blog/filming' },
      { title: '연예인', href: '/blog/celebrity' },
      { title: '학교', href: '/blog/school' },
      { title: '공공기관', href: '/blog/public' },
      { title: '유치원', href: '/blog/kindergarten' },
      { title: '축제', href: '/blog/festival' },
      { title: '기타행사', href: '/blog/other' }
    ]
  }
];