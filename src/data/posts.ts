export interface Post {
  title: string;
  category: string;
  date: string;
  content: string;
  author: string;
  tags: string[];
  image?: string;
}

export interface Posts {
  [key: string]: Post;
}

export const posts: Posts = {
  'first-post': {
    title: '첫 번째 블로그 포스트',
    content: '블로그의 첫 번째 포스트입니다.',
    date: '2024-03-21',
    category: '일반',
    author: '',
    tags: [],
  },
  // 추가 포스트는 여기에 작성
}; 