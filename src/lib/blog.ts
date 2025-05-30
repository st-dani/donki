import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'thumbnail'],
      ['description', 'description'],
    ],
  },
});

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  category: string;
}

export interface BlogState {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
}

export async function getBlogPosts(): Promise<BlogState> {
  try {
    const response = await fetch('/api/blog');
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    
    const data = await response.json();
    return {
      posts: data.posts,
      isLoading: false,
      error: null
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      posts: [],
      isLoading: false,
      error: error instanceof Error ? error.message : '블로그 포스트를 가져오는 중 오류가 발생했습니다'
    };
  }
} 