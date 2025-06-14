import { PrismaClient } from '../src/generated/prisma';
import { menuItems } from '../src/types/menu';

const prisma = new PrismaClient();

// 카테고리 매핑 (프론트엔드 카테고리 -> 데이터베이스 enum)
const categoryMapping: Record<string, any> = {
  'drinks': 'DRINKS',
  'hotdogs-burgers': 'HOTDOGS_BURGERS',
  'meals': 'MEALS',
  'snacks': 'SNACKS',
  'bunsik': 'BUNSIK',
  'desserts': 'DESSERTS',
};

async function main() {
  console.log('🌱 메뉴 데이터 시드 시작...');
  
  // 기존 메뉴 데이터 삭제 (초기화)
  await prisma.menu.deleteMany({});
  console.log('기존 메뉴 데이터 삭제 완료');
  
  // 프론트엔드 메뉴 데이터를 데이터베이스에 저장
  const menuPromises = menuItems.map(item => {
    return prisma.menu.create({
      data: {
        id: item.id,  // 기존 ID 유지
        name: item.name,
        nameEn: item.nameEn,
        description: item.description,
        category: categoryMapping[item.category] as any,
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
  });
  
  // 모든 메뉴 아이템 생성 대기
  await Promise.all(menuPromises);
  
  console.log(`✅ 데이터베이스에 ${menuPromises.length}개의 메뉴 아이템이 저장되었습니다.`);
}

// 스크립트 실행
main()
  .catch(e => {
    console.error('메뉴 데이터 시드 중 오류 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    // 데이터베이스 연결 종료
    await prisma.$disconnect();
  });
