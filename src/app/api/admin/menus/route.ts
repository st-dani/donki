import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// 모든 메뉴 조회 (GET)
export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json(
      { error: '메뉴를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

// 새 메뉴 추가 (POST)
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('image') as unknown as File;

    let imagePath: string | undefined;

    if (file && typeof file.arrayBuffer === 'function') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const path = join(process.cwd(), 'public/images/menu', filename);
      
      await writeFile(path, buffer);
      imagePath = `/images/menu/${filename}`;
    }

    const name = data.get('name') as string;
    const description = data.get('description') as string;
    const price = Number(data.get('price'));
    const category = data.get('category') as string;
    const tags = data.getAll('tags') as string[];
    const allergens = data.getAll('allergens') as string[];

    if (!name || !description || isNaN(price) || !category) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    const newMenu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        category: category as any, // Enum 타입 임시 처리
        tags: tags || [],
        image: imagePath,
        allergens: allergens || [],
      },
    });

    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json(
      { error: '메뉴 생성 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}