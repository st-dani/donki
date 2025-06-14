import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MenuCategory } from '@/generated/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nameEn, description, category, tags, allergens, imageUrl } = body;

    if (!name || !description || !category) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다: name, description, category' }, { status: 400 });
    }
    
    // nameEn이 없으면 빈 문자열로 설정(선택적 필드)

    // 유효한 카테고리인지 확인
    const validCategories = ['BUNSIK', 'MEALS', 'DRINKS', 'HOTDOGS_BURGERS', 'SNACKS', 'DESSERTS'];
    if (!validCategories.includes(category)) {
        return NextResponse.json({ error: `잘못된 카테고리입니다: ${category}` }, { status: 400 });
    }
    
    // CategorySlug 자동 생성
    const getCategorySlug = (category: string): string => {
      const slugMap: Record<string, string> = {
        'BUNSIK': 'bunsik',
        'MEALS': 'meals',
        'DRINKS': 'drinks',
        'HOTDOGS_BURGERS': 'hotdogs-burgers',
        'SNACKS': 'snacks',
        'DESSERTS': 'desserts'
      };
      return slugMap[category] || category.toLowerCase().replace('_', '-');
    };

    const newMenu = await prisma.menu.create({
      data: {
        name,
        nameEn: nameEn || '', // nameEn이 없으면 빈 문자열로 설정
        description,
        category: category as MenuCategory,
        categorySlug: getCategorySlug(category),
        tags: tags || [],
        allergens: allergens || [],
        image: imageUrl || '/images/menu/default-menu.jpg',
      },
    });

    return NextResponse.json(newMenu, { status: 201 });

  } catch (error: any) {
    console.error('메뉴 생성 오류 상세:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (error instanceof Error && error.stack) {
        console.error('Stack trace:', error.stack);
    }
    return NextResponse.json({ 
        error: '메뉴 생성 중 서버에서 오류가 발생했습니다.', 
        details: errorMessage 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // 데이터를 있는 그대로 반환
    return NextResponse.json(menus);

  } catch (error: any) {
    console.error('메뉴 조회 오류 상세:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (error instanceof Error && error.stack) {
        console.error('Stack trace:', error.stack);
    }
    return NextResponse.json({ 
        error: '메뉴 조회 중 서버에서 오류가 발생했습니다.', 
        details: errorMessage 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, nameEn, description, category, tags, allergens, imageUrl } = body;

    if (!id) {
      return NextResponse.json({ error: '메뉴 ID가 누락되었습니다.' }, { status: 400 });
    }

    // 메뉴 업데이트용 데이터 객체 생성
    const updateData: any = {};

    // CategorySlug 자동 생성 함수
    const getCategorySlug = (category: string): string => {
      const slugMap: Record<string, string> = {
        'BUNSIK': 'bunsik',
        'MEALS': 'meals',
        'DRINKS': 'drinks',
        'HOTDOGS_BURGERS': 'hotdogs-burgers',
        'SNACKS': 'snacks',
        'DESSERTS': 'desserts'
      };
      return slugMap[category] || category.toLowerCase().replace('_', '-');
    };

    if (name !== undefined) {
        if (String(name).trim() === '') return NextResponse.json({ error: '이름은 비워둘 수 없습니다.' }, { status: 400 });
        updateData.name = String(name);
    }
    // nameEn은 선택적 필드로 처리
    if (nameEn !== undefined) {
        // 빈 문자열이라도 허용 (선택적 필드로 변경)
        updateData.nameEn = String(nameEn);
    }
    if (description !== undefined) {
        if (String(description).trim() === '') return NextResponse.json({ error: '설명은 비워둘 수 없습니다.' }, { status: 400 });
        updateData.description = String(description);
    }
    if (category !== undefined) {
        const validCategories = ['BUNSIK', 'MEALS', 'DRINKS', 'HOTDOGS_BURGERS', 'SNACKS', 'DESSERTS'];
        if (!validCategories.includes(category)) {
            return NextResponse.json({ error: `잘못된 카테고리입니다: ${category}` }, { status: 400 });
        }
        updateData.category = category as MenuCategory;
        updateData.categorySlug = getCategorySlug(category);
    }
    if (tags !== undefined) {
        if (!Array.isArray(tags)) return NextResponse.json({ error: '태그는 배열이어야 합니다.' }, { status: 400 });
        updateData.tags = tags.map(tag => String(tag).trim()).filter(tag => tag !== '');
    }
    if (allergens !== undefined) {
        if (!Array.isArray(allergens)) return NextResponse.json({ error: '알레르기 정보는 배열이어야 합니다.' }, { status: 400 });
        updateData.allergens = allergens.map(allergen => String(allergen).trim()).filter(allergen => allergen !== '');
    }
    // imageUrl 필드를 image로 변경
    if (Object.prototype.hasOwnProperty.call(body, 'imageUrl')) {
        // null은 기본 이미지로 처리하고, 항상 문자열로 처리
        updateData.image = imageUrl ? String(imageUrl) : '/images/menu/default-menu.jpg';
    }
    
    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ error: '업데이트할 내용이 없습니다. 모든 필수 필드가 제공되었는지 확인하세요.' }, { status: 400 });
    }

    const updatedMenu = await prisma.menu.update({
      where: { id: String(id) },
      data: updateData,
    });

    return NextResponse.json(updatedMenu, { status: 200 });

  } catch (error: any) {
    console.error('메뉴 업데이트 오류:', error);
    if (error.code === 'P2025') { // Prisma error code for "Record to update not found."
      return NextResponse.json({ error: '해당 ID의 메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json({ error: '메뉴 업데이트 중 서버에서 오류가 발생했습니다.', details: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: '메뉴 ID가 누락되었습니다.' }, { status: 400 });
    }

    await prisma.menu.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({ message: '메뉴가 성공적으로 삭제되었습니다.' }, { status: 200 });

  } catch (error: any) {
    console.error('메뉴 삭제 오류:', error);
    if (error.code === 'P2025') { // Prisma error code for "Record to delete not found."
      return NextResponse.json({ error: '삭제할 메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json({ error: '메뉴 삭제 중 서버에서 오류가 발생했습니다.', details: errorMessage }, { status: 500 });
  }
}