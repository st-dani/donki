import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://donquixote.com';

  // 정적 페이지 목록
  const staticPages = [
    '',
    '/introduction',
    '/service',
    '/service/welfare',
    '/service/partnership',
    '/service/brand',
    '/service/fnb',
    '/menu',
    '/menu/popular',
    '/menu/beverage',
    '/menu/bakery',
    '/menu/snack',
    '/menu/meal',
    '/blog',
    '/blog/reference',
    '/blog/insight',
    '/blog/newsroom',
    '/estimate'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8
  }));

  // 블로그 포스트 목록 (실제로는 데이터베이스나 CMS에서 가져와야 함)
  const blogPosts = [
    {
      slug: 'trend-2024',
      category: 'insight',
      lastModified: '2024-03-15'
    },
    {
      slug: 'hyundai-event',
      category: 'reference',
      lastModified: '2024-03-10'
    },
    {
      slug: 'eco-packaging',
      category: 'newsroom',
      lastModified: '2024-03-05'
    }
  ].map((post) => ({
    url: `${baseUrl}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(post.lastModified).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  return [...staticPages, ...blogPosts];
} 