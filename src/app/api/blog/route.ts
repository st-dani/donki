import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const NAVER_BLOG_RSS_URL = 'https://rss.blog.naver.com/kincv12.xml';

// 고정 카테고리 목록
const CATEGORIES = [
  '기업행사',
  '연예인',
  '공공기관',
  '학교',
  '유치원',
  '행사축제'
] as const;

type Category = typeof CATEGORIES[number];

// 카테고리별 키워드 정의
const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  '기업행사': [
    '기업', '회사', '워크샵', '세미나', '컨퍼런스', '신년회', '송년회',
    '기업행사', '사내행사', '연말행사', '시무식', '종무식', '발대식',
    '창립기념', '개업식', '오픈행사', '프로모션'
  ],
  '연예인': [
    '연예인', '가수', '배우', '아이돌', '공연', '촬영', '방송',
    '축하공연', '축하무대', '사인회', '팬미팅', '쇼케이스', '콘서트',
    '방송촬영', '연예기획'
  ],
  '공공기관': [
    '공공기관', '관공서', '시청', '구청', '군청', '행정', '정부',
    '공단', '공사', '협회', '기관', '센터', '복지관', '보건소',
    '주민센터', '공기업'
  ],
  '학교': [
    '학교', '대학교', '고등학교', '중학교', '초등학교', '학원',
    '입학식', '졸업식', '축제', '체육대회', '학예회', '개강',
    '종강', '학생', '교직원', '학교행사'
  ],
  '유치원': [
    '유치원', '어린이집', '놀이방', '키즈', '아동', '어린이',
    '원아', '보육', '돌봄', '유아', '놀이', '체험학습',
    '재롱잔치', '발표회'
  ],
  '행사축제': [
    '축제', '페스티벌', '박람회', '전시회', '마켓', '플리마켓',
    '문화행사', '지역행사', '거리축제', '음식축제', '마을축제',
    '불꽃축제', '야외행사', '이벤트'
  ]
};

const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'thumbnail'],
      ['description', 'description'],
      ['category', 'category'],
    ],
  },
});

// 카테고리별 기본 이미지
const CATEGORY_DEFAULT_IMAGES = {
  '기업행사': 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
  '연예인': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
  '공공기관': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
  '학교': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800',
  '유치원': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800',
  '행사축제': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800'
} as const;

// HTML 문자열에서 대표 이미지 URL을 추출하는 함수
function extractThumbnailUrl(html: string): string | null {
  try {
    // 네이버 블로그 PostView 이미지 추출 (첫 번째 이미지)
    const postViewMatch = html.match(/https:\/\/postfiles\.pstatic\.net\/[^"]+/);
    if (postViewMatch) {
      return postViewMatch[0];
    }

    // 일반적인 img 태그에서 첫 번째 이미지 URL 추출
    const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/);
    if (imgMatch && imgMatch[1]) {
      let imageUrl = imgMatch[1];
      
      // 상대 경로나 프로토콜이 없는 URL 처리
      if (imageUrl.startsWith('//')) {
        imageUrl = `https:${imageUrl}`;
      }
      
      return imageUrl;
    }

    return null;
  } catch (error) {
    console.error('이미지 URL 추출 실패:', error);
    return null;
  }
}

// 포스트 내용을 분석하여 적절한 카테고리 결정
function determineCategory(title: string, description: string): Category {
  // HTML 태그 제거 및 텍스트 추출
  const cleanDescription = description.replace(/<[^>]*>/g, '');
  const searchText = `${title} ${cleanDescription}`.toLowerCase();
  
  // 각 카테고리별 키워드 매칭 점수 계산
  const scores = Object.entries(CATEGORY_KEYWORDS).map(([category, keywords]) => {
    const score = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = searchText.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    return { category, score };
  });

  // 가장 높은 점수의 카테고리 선택
  const bestMatch = scores.reduce((best, current) => 
    current.score > best.score ? current : best
  );

  // 매칭되는 키워드가 없으면 '행사축제'를 기본값으로 사용
  return (bestMatch.score > 0 ? bestMatch.category : '행사축제') as Category;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const feed = await parser.parseURL(NAVER_BLOG_RSS_URL);
    
    let posts = feed.items.map(item => {
      // 포스트 내용 분석하여 카테고리 결정
      const postCategory = determineCategory(
        item.title || '',
        item.description || ''
      );

      // 본문에서 대표 이미지 URL 추출
      const thumbnail = item.description 
        ? extractThumbnailUrl(item.description)
        : null;

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        thumbnail: thumbnail || item['thumbnail'] || null,
        description: item.description?.replace(/<[^>]*>/g, '').slice(0, 200) + '...',
        category: postCategory
      };
    });

    // 카테고리 필터링
    if (category) {
      posts = posts.filter(post => post.category === category);
    }

    return NextResponse.json({
      posts,
      categories: CATEGORIES
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 