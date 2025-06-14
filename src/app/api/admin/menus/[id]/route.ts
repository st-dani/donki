import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { MenuCategory } from '@/generated/prisma';

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
    const contentType = request.headers.get('content-type') || '';
    let name: string;
    let nameEn: string | undefined;
    let description: string;
    let category: MenuCategory;
    let tags: string[] = [];
    let allergens: string[] = [];
    let imageUrl: string | undefined;
    let imagePath: string | null;

    const existingMenu = await prisma.menu.findUnique({
        where: { id },
    });

    if (!existingMenu) {
        return NextResponse.json({ error: '메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }
    
    imagePath = existingMenu.image;

    // JSON 요청 처리
    if (contentType.includes('application/json')) {
      const json = await request.json();
      name = json.name;
      nameEn = json.nameEn;
      description = json.description;
      category = json.category as MenuCategory;
      tags = json.tags || [];
      allergens = json.allergens || [];
      imageUrl = json.imageUrl;

      // imageUrl 처리 개선 - 이미지 변경 가능성 3가지
      // 1. imageUrl이 undefined: 기존 이미지 유지(불변)
      // 2. imageUrl이 null: 기본 이미지로 설정(이미지 제거)
      // 3. imageUrl이 문자열: 새 URL로 이미지 업데이트
      if (imageUrl !== undefined) {
        if (imageUrl === null) {
          // 사용자가 이미지를 지우려는 경우
          imagePath = '/images/menu/default-menu.jpg';
        } else {
          // 사용자가 새 이미지 URL을 제공한 경우
          imagePath = imageUrl;
        }
      }
      // imageUrl이 undefined면 기존 이미지 유지
    }
    // FormData 요청 처리
    else {
      const data = await request.formData();
      const file: File | null = data.get('image') as unknown as File;

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

      name = data.get('name') as string;
      nameEn = data.get('nameEn') as string;
      description = data.get('description') as string;
      category = data.get('category') as MenuCategory;
      tags = data.getAll('tags') as string[];
      allergens = data.getAll('allergens') as string[];
    }

    if (!name || !description || !category) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    // 기본 업데이트 데이터 설정
    const updateData: any = {
      name,
      description,
      category,
      tags: tags || [],
      allergens: allergens || [],
    };

    // 영문명 업데이트 (선택적 필드)
    if (nameEn !== undefined) {
      updateData.nameEn = nameEn;
    }

    // JSON 요청이고 imageUrl이 지정된 경우에만 이미지 업데이트
    if (contentType.includes('application/json')) {
      if (imageUrl !== undefined) {
        updateData.image = imagePath;
      }
    } 
    // FormData 요청의 경우, 파일이 이미 위에서 처리되었다면 imagePath가 업데이트됨
    else if (!contentType.includes('application/json') && imagePath !== existingMenu.image) {
      updateData.image = imagePath;
    }

    // 영문명 업데이트 (선택적 필드)
    if (nameEn !== undefined) {
      updateData.nameEn = nameEn;
    }

    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: updateData,
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