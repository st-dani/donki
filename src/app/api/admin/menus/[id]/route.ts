import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { MenuCategory } from '@prisma/client';

// 특정 메뉴 조회 (GET)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const menu = await prisma.menu.findUnique({
      where: { id },
    });

    if (!menu) {
      return NextResponse.json({ error: '메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: '메뉴 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}


// 메뉴 수정 (PATCH)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.formData();
    const file: File | null = data.get('image') as unknown as File;

    const existingMenu = await prisma.menu.findUnique({
        where: { id },
    });

    if (!existingMenu) {
        return NextResponse.json({ error: '메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }
    
    let imagePath: string | null = existingMenu.image;

    // 새 파일이 업로드된 경우
    if (file && typeof file.arrayBuffer === 'function') {
      // 기존 이미지가 있으면 서버에서 삭제
      if (existingMenu.image) {
        const oldImagePath = join(process.cwd(), 'public', existingMenu.image);
        try {
          await unlink(oldImagePath);
        } catch (err) {
          console.error(`이전 이미지 삭제 실패: ${oldImagePath}`, err);
        }
      }

      // 새 파일 저장
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const newPath = join(process.cwd(), 'public/images/menu', filename);
      
      await writeFile(newPath, buffer);
      imagePath = `/images/menu/${filename}`; // DB에 저장될 새 경로
    }

    const name = data.get('name') as string;
    const description = data.get('description') as string;
    const price = Number(data.get('price'));
    const category = data.get('category') as MenuCategory;
    const tags = data.getAll('tags') as string[];
    const allergens = data.getAll('allergens') as string[];

    if (!name || !description || isNaN(price) || !category) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: {
        name,
        description,
        price,
        category,
        tags: tags || [],
        image: imagePath,
        allergens: allergens || [],
      },
    });

    return NextResponse.json(updatedMenu);
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json(
      { error: '메뉴 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 메뉴 삭제 (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const menuToDelete = await prisma.menu.findUnique({
        where: { id },
    });

    if (!menuToDelete) {
        return NextResponse.json({ error: '메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 연결된 이미지 파일이 있으면 삭제
    if (menuToDelete.image) {
        const imagePath = join(process.cwd(), 'public', menuToDelete.image);
        try {
            await unlink(imagePath);
        } catch (err) {
            console.error(`이미지 파일 삭제 실패: ${imagePath}`, err);
        }
    }

    await prisma.menu.delete({
      where: { id },
    });

    return NextResponse.json({ message: '메뉴가 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json(
      { error: '메뉴 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}