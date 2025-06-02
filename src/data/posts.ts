interface Post {
  title: string;
  content: string;
  date: string;
  category: string;
  image?: string;
}

export const posts: Record<string, Post> = {
  'first-post': {
    title: '첫 번째 블로그 포스트',
    content: '블로그의 첫 번째 포스트입니다.',
    date: '2024-03-21',
    category: '일반',
  },
  // 추가 포스트는 여기에 작성
}; 