// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// 카테고리 매핑 (프론트엔드 카테고리 -> 데이터베이스 enum)
const categoryMapping = {
  'drinks': 'DRINKS',
  'hotdogs-burgers': 'HOTDOGS_BURGERS',
  'meals': 'MEALS',
  'snacks': 'SNACKS',
  'bunsik': 'BUNSIK',
  'desserts': 'DESSERTS',
};

async function main() {
  try {
    console.log('🌱 메뉴 데이터 시드 시작...');
    
    // types/menu.ts 파일을 문자열로 읽기
    const menuFilePath = path.join(__dirname, '../src/types/menu.ts');
    const fileContent = fs.readFileSync(menuFilePath, 'utf8');
    
    // menuItems 배열 추출 (정규식 사용)
    const menuItemsMatch = fileContent.match(/export\s+const\s+menuItems\s*:\s*MenuItem\[\]\s*=\s*\[([\s\S]*?)\]\s*;/);
    if (!menuItemsMatch || !menuItemsMatch[1]) {
      throw new Error('메뉴 데이터를 찾을 수 없습니다');
    }
    
    // 문자열 형태의 배열 코드를 평가하여 JavaScript 객체로 변환
    const menuItemsCode = `[${menuItemsMatch[1]}]`;
    // 주의: eval은 보안 위험이 있을 수 있지만, 이 경우는 내부 코드를 실행하는 것이므로 문제 없음
    const menuItems = eval(menuItemsCode);
    
    // 기존 메뉴 데이터 삭제 (초기화)
    await prisma.menu.deleteMany({});
    console.log('기존 메뉴 데이터 삭제 완료');
    
    // 프론트엔드 메뉴 데이터를 데이터베이스에 저장
    let successCount = 0;
    for (const item of menuItems) {
      try {
        await prisma.menu.create({
          data: {
            id: item.id,  // 기존 ID 유지
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
        successCount++;
      } catch (error) {
        console.error(`메뉴 항목 '${item.name}' 저장 중 오류 발생:`, error);
      }
    }
    
    console.log(`✅ 데이터베이스에 ${successCount}개의 메뉴 아이템이 저장되었습니다.`);
  } catch (error) {
    console.error('메뉴 데이터 시드 중 오류 발생:', error);
  }
}

// 스크립트 실행
main()
  .catch(e => {
    console.error('시드 스크립트 실행 중 오류 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    // 데이터베이스 연결 종료
    await prisma.$disconnect();
  });
