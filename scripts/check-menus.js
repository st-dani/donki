const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // 모든 메뉴를 가져오기
    const menus = await prisma.menu.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log('총 메뉴 수:', menus.length);
    console.log('메뉴 목록:');
    menus.forEach(menu => {
      console.log('------------------------------');
      console.log(`ID: ${menu.id}`);
      console.log(`이름: ${menu.name}`);
      console.log(`설명: ${menu.description}`);
      console.log(`카테고리: ${menu.category}`);
      console.log(`카테고리슬러그: ${menu.categorySlug}`);
      console.log(`이미지: ${menu.image}`);
      console.log(`태그: ${menu.tags.join(', ')}`);
      console.log(`알레르기정보: ${menu.allergens.join(', ')}`);
      console.log(`생성일: ${menu.createdAt}`);
    });
  } catch (error) {
    console.error('에러 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
