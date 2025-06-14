import { NextResponse } from 'next/server';
import { parseString, ParserOptions } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify<string, ParserOptions, RSSResponse>(parseString);

// XML 파싱 옵션
const XML_PARSE_OPTIONS = {
  trim: true,
  normalize: true,
  explicitArray: true,
  normalizeTags: false,
  attrkey: 'attributes',
  tagNameProcessors: [(name: string) => name.toLowerCase()],
  valueProcessors: [(value: string) => {
    // HTML 엔티티 디코딩
    return value
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');
  }]
};

const NAVER_BLOG_RSS_URL = 'https://rss.blog.naver.com/kincv12.xml';

const CATEGORIES = [
  '전체',
  '기업행사',
  '촬영장',
  '연예인',
  '학교',
  '공공기관',
  '유치원',
  '축제',
  '기타행사'
] as const;

type Category = typeof CATEGORIES[number];

// 카테고리 키워드 매핑
const CATEGORY_KEYWORDS = {
  'corporate': [
    '기업', '회사', '워크샵', '세미나', '임직원', '직원', 
    '팀빌딩', '단합', '회식', '복지', '기업행사', '사내행사'
  ],
  'entertainment': [
    '촬영', '방송', '드라마', '영화', '예능', '광고', 
    '스태프', '제작진', '촬영장', '스튜디오', '현장',
    '연예인', '아이돌', '배우', '가수', '셀럽', '스타', 
    '팬미팅', '팬사인회', '쇼케이스', '방송인'
  ],
  'education': [
    '학교', '대학교', '고등학교', '중학교', '초등학교',
    '학원', '교직원', '선생님', '학생', '교육', '축제',
    '입학식', '졸업식', '학교행사',
    '유치원', '어린이집', '놀이방', '키즈', '아동',
    '어린이', '원아', '보육'
  ],
  'public': [
    '공공기관', '관공서', '시청', '구청', '군청', '행정', 
    '공단', '공사', '협회', '센터', '공무원', '정부'
  ],
  'festival': [
    '축제', '페스티벌', '행사', '공연', '박람회', 
    '전시회', '마켓', '점등식', '지역축제', '문화제'
  ],
  'private': [
    '결혼식', '생일', '파티', '홈파티', '기념일', '특별',
    '이벤트', '모임', '출장', '케이터링', '프라이빗'
  ],
  'review': [
    '후기', '리뷰', '이용후기', '고객후기', '추천',
    '만족도', '평가', '소감'
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
  pubDate?: string[];  // Optional as it might be pubdate
  pubdate?: string[];  // Optional lowercase variant
}

interface RSSResponse {
  rss: {
    channel: [{
      item: NaverBlogPost[];
    }];
  };
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  category: string;
  link: string;
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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function determineCategory(title: string, description: string): string {
  const content = `${title} ${description}`.toLowerCase();
  
  // 각 카테고리별 키워드 매칭 점수 계산
  const scores = Object.entries(CATEGORY_KEYWORDS).map(([category, keywords]) => {
    const score = keywords.reduce((count, keyword) => {
      // 제목에서 발견된 키워드는 가중치 2배
      const titleScore = (title.toLowerCase().match(new RegExp(keyword, 'gi')) || []).length * 2;
      // 본문에서 발견된 키워드는 가중치 1배
      const descScore = (description.toLowerCase().match(new RegExp(keyword, 'gi')) || []).length;
      return count + titleScore + descScore;
    }, 0);
    return { category, score };
  });

  // 가장 높은 점수의 카테고리 선택
  const bestMatch = scores.reduce((best, current) => 
    current.score > best.score ? current : best,
    { category: '기타모든행사', score: 0 }
  );

  return bestMatch.category;
}

function cleanText(text: string): string {
  // HTML 태그 제거
  const withoutTags = text.replace(/<[^>]+>/g, '');
  // HTML 엔티티 디코딩
  const decoded = withoutTags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  // 연속된 공백 제거
  return decoded.replace(/\s+/g, ' ').trim();
}

// 샘플 포스트 데이터
const SAMPLE_POSTS = [
  {
    title: '대기업 임직원 단합대회 푸드트럭 케이터링 현장',
    link: '#',
    pubDate: new Date().toISOString(),
    thumbnail: '/images/brand-story-1.jpg',
    description: '대기업 임직원들을 위한 맞춤형 푸드트럭 케이터링 서비스를 진행했습니다. 다양한 메뉴와 특별한 이벤트로 직원들의 만족도를 높였습니다.',
    category: 'corporate'
  },
  {
    title: '인기 아이돌 팬미팅 푸드트럭 지원 후기',
    link: '#',
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    thumbnail: '/images/brand-story-2.jpg',
    description: '인기 아이돌 그룹의 팬미팅 행사에 푸드트럭을 지원했습니다. 팬들과 아티스트 모두가 즐거워한 특별한 케이터링 서비스였습니다.',
    category: 'entertainment'
  },
  {
    title: '시청 직원 복지 행사 푸드트럭 운영',
    link: '#',
    pubDate: new Date(Date.now() - 172800000).toISOString(),
    thumbnail: '/images/welfare-service.jpg',
    description: '시청 직원들을 위한 복지 행사에서 푸드트럭을 운영했습니다. 건강한 메뉴와 다양한 음료로 공무원들의 활력을 더했습니다.',
    category: 'public'
  },
  {
    title: '대학교 축제 푸드트럭 존 운영 성공사례',
    link: '#',
    pubDate: new Date(Date.now() - 259200000).toISOString(),
    thumbnail: '/images/brand-story-1.jpg',
    description: '대학교 축제 기간 동안 푸드트럭 존을 성공적으로 운영했습니다. 학생들의 취향을 저격한 메뉴 구성으로 큰 호응을 얻었습니다.',
    category: 'education'
  },
  {
    title: '어린이집 체육대회 간식 케이터링',
    link: '#',
    pubDate: new Date(Date.now() - 345600000).toISOString(),
    thumbnail: '/images/brand-story-2.jpg',
    description: '어린이집 체육대회에서 건강하고 맛있는 간식을 제공했습니다. 아이들의 눈높이에 맞춘 메뉴로 즐거운 시간을 만들었습니다.',
    category: 'education'
  },
  {
    title: '지역 문화축제 대표 푸드트럭',
    link: '#',
    pubDate: new Date(Date.now() - 432000000).toISOString(),
    thumbnail: '/images/welfare-service.jpg',
    description: '지역 문화축제의 대표 푸드트럭으로 선정되어 다양한 메뉴를 선보였습니다. 방문객들에게 특별한 맛과 즐거움을 선사했습니다.',
    category: 'festival'
  }
];

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '전체';

    console.log('Fetching RSS feed...');
    const response = await fetch(NAVER_BLOG_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/xml; charset=utf-8'
      }
    });
    
    if (!response.ok) {
      console.error('RSS feed fetch failed:', response.status, response.statusText);
      return NextResponse.json(
        { error: `Failed to fetch RSS feed: ${response.status} ${response.statusText}` },
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );
    }
    
    const xmlText = await response.text();
    console.log('RSS feed content (first 500 chars):', xmlText.substring(0, 500));
    
    try {
      const result = await parseXML(xmlText, XML_PARSE_OPTIONS) as RSSResponse;
      console.log('Parsed RSS structure:', JSON.stringify(result.rss?.channel?.[0]?.item?.[0], null, 2));
      
      if (!result.rss?.channel?.[0]?.item) {
        console.error('Invalid RSS feed structure:', result);
        return NextResponse.json(
          { error: 'Invalid RSS feed structure' },
          { 
            status: 500,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }
        );
      }

      const posts = result.rss.channel[0].item.map((post: NaverBlogPost) => {
        try {
          // 필수 필드가 없는 경우 건너뛰기
          if (!post.title?.[0] || !post.link?.[0]) {
            console.warn('Missing required fields in post:', JSON.stringify(post));
            return null;
          }

          const title = cleanText(post.title[0]);
          const description = post.description?.[0] || '';
          const link = post.link[0];
          // pubDate 또는 pubdate 필드 사용
          const pubDate = (post.pubDate?.[0] || post.pubdate?.[0] || new Date().toISOString());
          const id = link.split('/').pop() || '';
          
          // 썸네일 이미지 추출 시도
          let thumbnail = extractThumbnailUrl(description);
          if (!thumbnail) {
            // description에서 이미지를 찾지 못한 경우 기본 이미지 사용
            thumbnail = DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
          }

          const postCategory = determineCategory(title, description);
          
          return {
            id,
            title,
            excerpt: cleanText(description).substring(0, 200) + '...',
            date: formatDate(pubDate),
            thumbnail,
            category: postCategory,
            link
          };
        } catch (postError) {
          console.error('Error processing post:', JSON.stringify(post), postError);
          return null;
        }
      }).filter(Boolean);

      if (posts.length === 0) {
        console.error('No valid posts found after processing');
        // 샘플 포스트로 폴백
        return NextResponse.json(
          { posts: SAMPLE_POSTS },
          {
            headers: {
              'Cache-Control': 'no-store',
              'Content-Type': 'application/json; charset=utf-8'
            }
          }
        );
      }

      const filteredPosts = category === '전체' 
        ? posts 
        : posts.filter((post) => post && post.category === category);

      return NextResponse.json(
        { posts: filteredPosts },
        {
          headers: {
            'Cache-Control': 'no-store',
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );
    } catch (parseError) {
      console.error('Error parsing XML:', parseError);
      console.log('XML content:', xmlText);
      return NextResponse.json(
        { error: 'Failed to parse RSS feed' },
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );
    }
  } catch (error) {
    console.error('Error processing blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to process blog posts' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    );
  }
} 