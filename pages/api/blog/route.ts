import { NextApiRequest, NextApiResponse } from 'next';
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
    '직원', '임직원', '사원', '팀빌딩', '단합', '회식'
  ],
  '촬영장': [
    '촬영', '방송', '드라마', '영화', '예능', '광고', 
    '연예인', '아이돌', '스태프', '제작진'
  ],
  '공공기관': [
    '공공기관', '관공서', '시청', '구청', '군청', '행정', 
    '공단', '공사', '협회', '센터'
  ],
  '학교': [
    '학교', '대학교', '고등학교', '중학교', '초등학교',
    '학원', '축제', '체육대회', '학예회'
  ],
  '유치원': [
    '유치원', '어린이집', '놀이방', '키즈', '아동',
    '어린이', '원아', '보육'
  ],
  '축제': [
    '축제', '페스티벌', '행사', '이벤트', '공연',
    '박람회', '전시회', '마켓'
  ],
  '이벤트': [
    '이벤트', '프로모션', '행사', '파티', '모임',
    '런칭', '오픈', '기념'
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
    { category: '기타모든행사', score: 0 }
  );

  return bestMatch.category;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const category = req.query.category as string || '전체';

    console.log('Fetching RSS feed...');
    const response = await fetch(NAVER_BLOG_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error('RSS feed fetch failed:', response.status);
      return res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
    
    const xmlText = await response.text();
    console.log('RSS feed length:', xmlText.length);
    
    const result = await parseXML(xmlText) as RSSResponse;
    
    if (!result.rss?.channel?.[0]?.item) {
      console.error('Invalid RSS feed structure');
      return res.status(500).json({ error: 'Invalid RSS feed structure' });
    }

    const posts = result.rss.channel[0].item.map((post: NaverBlogPost) => {
      const title = post.title[0];
      const description = post.description[0];
      const link = post.link[0];
      const pubDate = post.pubDate[0];
      const id = link.split('/').pop() || '';
      
      const thumbnail = extractThumbnailUrl(description) || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
      const postCategory = determineCategory(title, description);
      
      return {
        id,
        title,
        excerpt: description.replace(/<[^>]+>/g, '').substring(0, 200) + '...',
        date: pubDate,
        thumbnail,
        category: postCategory,
        link
      };
    });

    const filteredPosts = category === '전체' 
      ? posts 
      : posts.filter(post => post.category === category);

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ posts: filteredPosts });
  } catch (error) {
    console.error('Error processing blog posts:', error);
    res.status(500).json({ error: 'Failed to process blog posts' });
  }
} 