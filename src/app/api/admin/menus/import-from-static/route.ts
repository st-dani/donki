import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { menuItems } from '../../../../../types/menu';

// 카테고리 매핑 (프론트엔드 카테고리 -> 데이터베이스 enum)
const categoryMapping: Record<string, any> = {
  'drinks': 'DRINKS',
  'hotdogs-burgers': 'HOTDOGS_BURGERS',
  'meals': 'MEALS',
  'snacks': 'SNACKS',
  'bunsik': 'BUNSIK',
  'desserts': 'DESSERTS',
};

// 프론트 정적 데이터 가져와 DB에 저장하는 API (POST)
export async function POST() {
  try {
    console.log('🌱 정적 메뉴 데이터를 DB로 가져오기 시작...');
    
    // 가져온 항목과 실패한 항목 카운트
    let successCount = 0;
    let failCount = 0;
    const failedItems: string[] = [];
    
    // 각 메뉴 항목마다 데이터베이스에 저장 시도
    for (const item of menuItems) {
      try {
        // 기존 항목이 있는지 확인
        const existingMenu = await prisma.menu.findUnique({
          where: { id: item.id },
        });
        
        if (existingMenu) {
          // 기존 항목 업데이트
          await prisma.menu.update({
            where: { id: item.id },
            data: {
              name: item.name,
              nameEn: item.nameEn || "",
              description: item.description,
              category: categoryMapping[item.category],
              categorySlug: item.category,
              tags: item.tags || [],
              isPopular: item.isPopular || false,
              spicyLevel: item.spicyLevel || null,
              isNew: item.isNew || false,
              isVegetarian: item.isVegetarian || false,
              allergens: item.allergens || [],
              image: item.image,
            }
          });
        } else {
          // 새 항목 생성
          await prisma.menu.create({
            data: {
              id: item.id,
              name: item.name,
              nameEn: item.nameEn || "",
              description: item.description,
              category: categoryMapping[item.category],
              categorySlug: item.category,
              tags: item.tags || [],
              isPopular: item.isPopular || false,
              spicyLevel: item.spicyLevel || null,
              isNew: item.isNew || false,
              isVegetarian: item.isVegetarian || false,
              allergens: item.allergens || [],
              image: item.image,
            }
          });
        }
        successCount++;
      } catch (error) {
        console.error(`메뉴 항목 '${item.name}' 저장 중 오류 발생:`, error);
        failCount++;
        failedItems.push(item.name);
      }
    }
    
    return NextResponse.json({
      message: '정적 메뉴 데이터 가져오기 완료',
      totalItems: menuItems.length,
      successCount,
      failCount,
      failedItems: failedItems.length > 0 ? failedItems : undefined
    });
  } catch (error) {
    console.error('메뉴 데이터 가져오기 중 오류 발생:', error);
    return NextResponse.json(
      { error: '메뉴 데이터 가져오기 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
