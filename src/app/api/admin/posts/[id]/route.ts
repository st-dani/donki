import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 특정 포스트 조회 (GET)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch post ${id}` },
      { status: 500 }
    );
  }
}

// 특정 포스트 수정 (PATCH)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body = await request.json();
    const { slug, title, content, category, date, author, tags, images, hoverText } = body;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        slug,
        title,
        content,
        category,
        date: date ? new Date(date) : undefined,
        author,
        tags,
        images,
        hoverText,
      },
    });
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    return NextResponse.json(
      { error: `Failed to update post ${id}` },
      { status: 500 }
    );
  }
}

// 특정 포스트 삭제 (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.post.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    return NextResponse.json(
      { error: `Failed to delete post ${id}` },
      { status: 500 }
    );
  }
}
