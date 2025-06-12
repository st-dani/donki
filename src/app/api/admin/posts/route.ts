import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 모든 포스트 조회 (GET)
export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// 새 포스트 추가 (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, content, category, date, author, tags, images, hoverText } = body;

    // 필수 필드 유효성 검사
    if (!slug || !title || !content || !category || !date || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        slug,
        title,
        content,
        category,
        date: new Date(date),
        author,
        tags,
        images,
        hoverText,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
