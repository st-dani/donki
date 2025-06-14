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
    const contentType = request.headers.get('content-type') || '';
    let name: string;
    let nameEn: string = ''; // 영문명 추가
    let description: string;
    let category: string;
    let tags: string[] = [];
    let allergens: string[] = [];
    let imagePath: string | undefined;
    let imageUrl: string | undefined;

    // JSON 데이터 처리
    if (contentType.includes('application/json')) {
      const json = await request.json();
      name = json.name;
      nameEn = json.nameEn || ''; // 영문명 추출
      description = json.description;
      category = json.category;
      tags = json.tags || [];
      allergens = json.allergens || [];
      imageUrl = json.imageUrl;
    } 
    // FormData 처리
    else {
      const data = await request.formData();
      const file: File | null = data.get('image') as unknown as File;
      nameEn = data.get('nameEn') as string || ''; // FormData에서 영문명 추출

      if (file && typeof file.arrayBuffer === 'function') {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
        const path = join(process.cwd(), 'public/images/menu', filename);
        
        await writeFile(path, buffer);
        imagePath = `/images/menu/${filename}`;
      }

      name = data.get('name') as string;
      description = data.get('description') as string;
      category = data.get('category') as string;
      tags = data.getAll('tags') as string[];
      allergens = data.getAll('allergens') as string[];
    }

    if (!name || !description || !category) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    // imageUrl을 우선 사용하고, 없는 경우에는 기본 이미지 경로 사용
    // Prisma의 Menu 모델은 image가 nullable이 아닌 String 유형임
    const imageToSave = imageUrl || imagePath || '/images/menu/default-menu.jpg';
    
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

    const categorySlug = getCategorySlug(category);

    const newMenu = await prisma.menu.create({
      data: {
        name,
        nameEn, // 영문명 추가
        description,
        category: category as any, // Enum 타입 임시 처리
        categorySlug,
        tags: tags || [],
        image: imageToSave,
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