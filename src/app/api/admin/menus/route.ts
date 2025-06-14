import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// 로컬 파일 저장 관련 임포트 제거

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

    // JSON 데이터 처리 (이제 UploadThing으로 이미지 URL을 받아와서 사용)
    const json = await request.json();
    name = json.name;
    nameEn = json.nameEn || ''; // 영문명 추출
    description = json.description;
    category = json.category;
    tags = json.tags || [];
    allergens = json.allergens || [];
    imageUrl = json.imageUrl; // UploadThing에서 업로드된 이미지 URL

    if (!name || !description || !category) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    // UploadThing에서 제공하는 이미지 URL 사용, 없으면 기본 이미지 URL 사용
    // Prisma의 Menu 모델은 image가 nullable이 아닌 String 유형임
    const imageToSave = imageUrl || '/images/menu/default-menu.jpg';
    
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