import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify(parseString);

const NAVER_BLOG_RSS_URL = 'https://rss.blog.naver.com/kincv12.xml';

const CATEGORIES = [
  '전체',
  '기업행사',
  '연예인',
  '공공기관',
  '학교',
  '유치원',
  '행사축제'
] as const;

type Category = typeof CATEGORIES[number];

// 카테고리 키워드 매핑
const CATEGORY_KEYWORDS = {
  '기업행사': [
    '기업', '회사', '워크샵', '세미나', '케이터링', '출장', 
    '직원', '임직원', '사원', '팀빌딩', '단합', '회식', '연수',
    '신년회', '송년회', '기업행사', '사내행사', '연말행사'
  ],
  '연예인': [
    '연예인', '가수', '배우', '아이돌', '공연', '촬영', '방송',
    '축하공연', '사인회', '팬미팅', '쇼케이스', '콘서트',
    '연예기획', '엔터테인먼트', '스타', '셀럽'
  ],
  '공공기관': [
    '공공기관', '관공서', '시청', '구청', '군청', '행정', '정부',
    '공단', '공사', '협회', '기관', '센터', '복지관', '보건소',
    '주민센터', '공기업', '지자체', '공공', '관공'
  ],
  '학교': [
    '학교', '대학교', '고등학교', '중학교', '초등학교', '학원',
    '입학식', '졸업식', '축제', '체육대회', '학예회', '개강',
    '종강', '학생', '교직원', '학교행사', '대학', '캠퍼스'
  ],
  '유치원': [
    '유치원', '어린이집', '놀이방', '키즈', '아동', '어린이',
    '원아', '보육', '돌봄', '유아', '놀이', '체험학습',
    '재롱잔치', '발표회', '어린이날'
  ]
};

// 기본 이미지 목록
const DEFAULT_IMAGES = [
  '/images/brand-story-1.jpg',
  '/images/brand-story-2.jpg',
  '/images/welfare-service.jpg'
];

interface NaverBlogPost {
  title: string[];
  link: string[];
  description: string[];
  pubDate: string[];
}

interface RSSResponse {
  rss: {
    channel: [{
      item: NaverBlogPost[];
    }];
  };
}

// HTML 문자열에서 대표 이미지 URL을 추출하는 함수
function extractThumbnailUrl(html: string): string | null {
  try {
    // 1. 네이버 블로그 PostView 이미지 추출
    const postViewMatch = html.match(/https:\/\/postfiles\.pstatic\.net\/[^"'\s]+/);
    if (postViewMatch) {
      return postViewMatch[0];
    }

    // 2. 일반적인 img 태그에서 src 추출
    const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/);
    if (imgMatch && imgMatch[1]) {
      let imageUrl = imgMatch[1];
      
      // 상대 경로나 프로토콜이 없는 URL 처리
      if (imageUrl.startsWith('//')) {
        imageUrl = `https:${imageUrl}`;
      }
      
      return imageUrl;
    }

    // 3. og:image 메타 태그에서 추출
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/);
    if (ogImageMatch && ogImageMatch[1]) {
      return ogImageMatch[1];
    }

    return null;
  } catch (error) {
    console.error('이미지 URL 추출 실패:', error);
    return null;
  }
}

function determineCategory(title: string, description: string): string {
  const content = `${title} ${description}`.toLowerCase();
  
  // 각 카테고리별 키워드 매칭 점수 계산
  const scores = Object.entries(CATEGORY_KEYWORDS).map(([category, keywords]) => {
    const score = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    return { category, score };
  });

  // 가장 높은 점수의 카테고리 선택
  const bestMatch = scores.reduce((best, current) => 
    current.score > best.score ? current : best,
    { category: '행사축제', score: 0 }
  );

  return bestMatch.category;
}

// 샘플 포스트 데이터
const SAMPLE_POSTS = [
  {
    title: '대기업 임직원 단합대회 푸드트럭 케이터링 현장',
    link: '#',
    pubDate: new Date().toISOString(),
    thumbnail: '/images/brand-story-1.jpg',
    description: '대기업 임직원들을 위한 맞춤형 푸드트럭 케이터링 서비스를 진행했습니다. 다양한 메뉴와 특별한 이벤트로 직원들의 만족도를 높였습니다.',
    category: '기업행사'
  },
  {
    title: '인기 아이돌 팬미팅 푸드트럭 지원 후기',
    link: '#',
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    thumbnail: '/images/brand-story-2.jpg',
    description: '인기 아이돌 그룹의 팬미팅 행사에 푸드트럭을 지원했습니다. 팬들과 아티스트 모두가 즐거워한 특별한 케이터링 서비스였습니다.',
    category: '연예인'
  },
  {
    title: '시청 직원 복지 행사 푸드트럭 운영',
    link: '#',
    pubDate: new Date(Date.now() - 172800000).toISOString(),
    thumbnail: '/images/welfare-service.jpg',
    description: '시청 직원들을 위한 복지 행사에서 푸드트럭을 운영했습니다. 건강한 메뉴와 다양한 음료로 공무원들의 활력을 더했습니다.',
    category: '공공기관'
  },
  {
    title: '대학교 축제 푸드트럭 존 운영 성공사례',
    link: '#',
    pubDate: new Date(Date.now() - 259200000).toISOString(),
    thumbnail: '/images/brand-story-1.jpg',
    description: '대학교 축제 기간 동안 푸드트럭 존을 성공적으로 운영했습니다. 학생들의 취향을 저격한 메뉴 구성으로 큰 호응을 얻었습니다.',
    category: '학교'
  },
  {
    title: '어린이집 체육대회 간식 케이터링',
    link: '#',
    pubDate: new Date(Date.now() - 345600000).toISOString(),
    thumbnail: '/images/brand-story-2.jpg',
    description: '어린이집 체육대회에서 건강하고 맛있는 간식을 제공했습니다. 아이들의 눈높이에 맞춘 메뉴로 즐거운 시간을 만들었습니다.',
    category: '유치원'
  },
  {
    title: '지역 문화축제 대표 푸드트럭',
    link: '#',
    pubDate: new Date(Date.now() - 432000000).toISOString(),
    thumbnail: '/images/welfare-service.jpg',
    description: '지역 문화축제의 대표 푸드트럭으로 선정되어 다양한 메뉴를 선보였습니다. 방문객들에게 특별한 맛과 즐거움을 선사했습니다.',
    category: '행사축제'
  }
];

export async function GET() {
  try {
    const response = await fetch(NAVER_BLOG_RSS_URL);
    const xmlText = await response.text();
    const result = await parseXML(xmlText) as RSSResponse;
    
    if (!result.rss?.channel?.[0]?.item) {
      console.log('RSS feed not available, using sample data');
      return NextResponse.json({ posts: SAMPLE_POSTS });
    }

    const items = result.rss.channel[0].item;
    const posts = items.map((item, index) => {
      const description = item.description[0];
      const imageMatch = description.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/);
      const thumbnail = imageMatch ? imageMatch[1] : DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
      
      const title = item.title[0];
      const cleanDescription = description.replace(/<[^>]*>/g, '');
      const category = determineCategory(title, cleanDescription);

      return {
        title: title,
        link: item.link[0],
        pubDate: item.pubDate[0],
        thumbnail: thumbnail,
        description: cleanDescription.substring(0, 200) + '...',
        category: category
      };
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    console.log('Error occurred, using sample data');
    return NextResponse.json({ posts: SAMPLE_POSTS });
  }
} 