export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  category: string;
  link: string;
  image?: string;
  content: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'all',
    name: '전체',
    description: '모든 게시글'
  },
  {
    id: 'corporate',
    name: '기업행사',
    description: '기업 행사, 워크샵, 세미나 등 기업 관련 케이터링 서비스'
  },
  {
    id: 'festival',
    name: '축제/이벤트',
    description: '지역 축제, 마켓, 야외 행사 등 대규모 이벤트'
  },
  {
    id: 'private',
    name: '프라이빗',
    description: '결혼식, 생일파티, 홈파티 등 개인 행사'
  },
  {
    id: 'education',
    name: '교육기관',
    description: '학교, 유치원, 어린이집 등 교육기관 행사'
  },
  {
    id: 'public',
    name: '공공기관',
    description: '관공서, 지자체 등 공공기관 행사'
  },
  {
    id: 'entertainment',
    name: '방송/연예',
    description: '방송 촬영, 연예인 행사, 미디어 관련 행사'
  },
  {
    id: 'review',
    name: '이용후기',
    description: '고객님들의 생생한 후기'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '푸드트럭으로 특별한 기업 행사를 만드는 방법',
    excerpt: '기업 행사에 푸드트럭을 도입하면 직원들의 만족도가 크게 상승합니다. 오늘은 성공적인 기업 행사 케이터링 서비스에 대해 이야기해보려고 합니다.',
    date: '2024.03.15',
    thumbnail: '/images/blog/corporate-event.jpg',
    category: 'corporate',
    link: '/blog/corporate/1',
    image: '/images/blog/corporate-event.jpg',
    content: `기업 행사에 푸드트럭을 도입하면 직원들의 만족도가 크게 상승합니다. 
    오늘은 성공적인 기업 행사 케이터링 서비스에 대해 이야기해보려고 합니다.
    
    ## 기업 행사의 특징
    - 직원들의 만족도 증가
    - 비용 효율성
    - 다양한 메뉴 선택 가능
    
    ## 성공 사례
    - 대기업 신년회
    - 기업 워크샵
    - 사내 행사를 위한 푸드트럭 운영`,
    tags: ['기업행사', '케이터링', '푸드트럭']
  },
  {
    id: '2',
    title: '드라마 촬영장의 푸드트럭 이야기',
    excerpt: '드라마 촬영장에서 푸드트럭이 어떻게 활용되고 있는지, 촬영 스태프들의 반응과 만족도를 공유합니다.',
    date: '2024.03.10',
    thumbnail: '/images/blog/filming-set.jpg',
    category: 'entertainment',
    link: '/blog/entertainment/2',
    image: '/images/blog/filming-set.jpg',
    content: `드라마 촬영장에서 푸드트럭이 어떻게 활용되고 있는지, 촬영 스태프들의 반응과 만족도를 공유합니다.
    
    ## 촬영장 특성
    - 긴 촬영 시간
    - 다양한 메뉴 요구
    - 신속한 서비스 필요
    
    ## 성공 사례
    - 인기 드라마 촬영장
    - 영화 촬영장
    - CF 촬영장`,
    tags: ['촬영장', '케이터링', '푸드트럭']
  },
  {
    id: '3',
    title: '연예인 팬미팅에서의 푸드트럭 활용',
    excerpt: '연예인 팬미팅에서 푸드트럭이 어떻게 활용되고 있는지, 팬들의 반응과 관리 노하우를 공유합니다.',
    date: '2024.03.05',
    thumbnail: '/images/blog/celebrity-event.jpg',
    category: 'entertainment',
    link: '/blog/entertainment/3',
    image: '/images/blog/celebrity-event.jpg',
    content: `연예인 팬미팅에서 푸드트럭이 어떻게 활용되고 있는지, 팬들의 반응과 관리 노하우를 공유합니다.
    
    ## 팬미팅 특성
    - 대규모 인원
    - 다양한 메뉴 필요
    - 안전한 서비스 제공
    
    ## 성공 사례
    - 팬사인회
    - 팬미팅
    - 팬클럽 행사`,
    tags: ['연예인', '팬미팅', '케이터링']
  },
  {
    id: '4',
    title: '학교 축제에서의 푸드트럭 운영',
    excerpt: '학교 축제에서 푸드트럭이 어떻게 활용되고 있는지, 학생들과 교직원들의 반응을 공유합니다.',
    date: '2024.03.01',
    thumbnail: '/images/blog/school-festival.jpg',
    category: 'education',
    link: '/blog/education/4',
    image: '/images/blog/school-festival.jpg',
    content: `학교 축제에서 푸드트럭이 어떻게 활용되고 있는지, 학생들과 교직원들의 반응을 공유합니다.
    
    ## 학교 축제 특성
    - 학생 중심 서비스
    - 안전한 음식 제공
    - 다양한 메뉴 선택
    
    ## 성공 사례
    - 학교 축제
    - 문화제
    - 학예회`,
    tags: ['학교', '축제', '푸드트럭']
  },
  {
    id: '5',
    title: '공공기관 행사에서의 푸드트럭 서비스',
    excerpt: '공공기관 행사에서 푸드트럭이 어떻게 활용되고 있는지, 관리와 운영 노하우를 공유합니다.',
    date: '2024.02.25',
    thumbnail: '/images/blog/public-event.jpg',
    category: 'public',
    link: '/blog/public/5',
    image: '/images/blog/public-event.jpg',
    content: `공공기관 행사에서 푸드트럭이 어떻게 활용되고 있는지, 관리와 운영 노하우를 공유합니다.
    
    ## 공공기관 특성
    - 대규모 행사
    - 안전한 서비스 제공
    - 다양한 메뉴 필요
    
    ## 성공 사례
    - 지자체 행사
    - 공공기관 워크샵
    - 공공행사`,
    tags: ['공공기관', '행사', '케이터링']
  },
  {
    id: '6',
    title: '유치원 축제의 특별한 푸드트럭',
    excerpt: '유치원 축제에서 푸드트럭이 어떻게 활용되고 있는지, 어린이들을 위한 특별한 메뉴와 서비스를 공유합니다.',
    date: '2024.02.20',
    thumbnail: '/images/blog/kindergarten-festival.jpg',
    category: 'education',
    link: '/blog/education/6',
    image: '/images/blog/kindergarten-festival.jpg',
    content: `유치원 축제에서 푸드트럭이 어떻게 활용되고 있는지, 어린이들을 위한 특별한 메뉴와 서비스를 공유합니다.
    
    ## 유치원 특성
    - 어린이 맞춤 메뉴
    - 안전한 음식 제공
    - 재미있는 서비스
    
    ## 성공 사례
    - 유치원 축제
    - 어린이날 행사
    - 가족 축제`,
    tags: ['유치원', '축제', '푸드트럭']
  },
  {
    id: '7',
    title: '봄맞이 페스티벌 준비하기',
    excerpt: '따뜻한 봄이 시작되면서 야외 페스티벌 시즌이 돌아왔습니다. 성공적인 페스티벌을 위한 푸드트럭 운영 노하우를 공개합니다.',
    date: '2024.02.15',
    thumbnail: '/images/blog/spring-festival.jpg',
    category: 'festival',
    link: '/blog/festival/7',
    image: '/images/blog/spring-festival.jpg',
    content: `따뜻한 봄이 시작되면서 야외 페스티벌 시즌이 돌아왔습니다. 
    성공적인 페스티벌을 위한 푸드트럭 운영 노하우를 공개합니다.
    
    ## 페스티벌 특성
    - 대규모 인원
    - 다양한 메뉴 필요
    - 신속한 서비스
    
    ## 성공 사례
    - 봄 축제
    - 음악 페스티벌
    - 문화 페스티벌`,
    tags: ['페스티벌', '축제', '푸드트럭']
  },
  {
    id: '8',
    title: '특별한 행사의 푸드트럭',
    excerpt: '특별한 행사에서 푸드트럭이 어떻게 활용되고 있는지, 다양한 사례와 노하우를 공유합니다.',
    date: '2024.02.10',
    thumbnail: '/images/blog/special-event.jpg',
    category: 'private',
    link: '/blog/private/8',
    image: '/images/blog/special-event.jpg',
    content: `특별한 행사에서 푸드트럭이 어떻게 활용되고 있는지, 다양한 사례와 노하우를 공유합니다.
    
    ## 특별한 행사 특성
    - 독특한 메뉴 필요
    - 특별한 서비스 제공
    - 맞춤형 케이터링
    
    ## 성공 사례
    - 웨딩
    - 기념일
    - 특별한 행사`,
    tags: ['특별한행사', '케이터링', '푸드트럭']
  }
];