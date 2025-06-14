// 수동으로 갤러리 데이터를 추가하는 스크립트
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // 기존 데이터 삭제
    console.log('기존 갤러리 데이터 삭제 중...');
    await prisma.serviceGallery.deleteMany({});
    
    // 새 데이터 추가
    console.log('새 갤러리 데이터 추가 중...');
    const galleries = [
      {
        id: 'gal1',
        title: '푸드트럭 성공사례 1',
        description: '맛있는 음식으로 성공한 사례입니다.',
        image: '/images/gallery/food-1.jpg',
        order: 1,
      },
      {
        id: 'gal2',
        title: '푸드트럭 성공사례 2',
        description: '특별한 메뉴로 인기를 얻은 사례입니다.',
        image: '/images/gallery/food-2.jpg',
        order: 2,
      },
      {
        id: 'gal3',
        title: '푸드트럭 성공사례 3',
        description: '독특한 콘셉트로 주목 받은 푸드트럭입니다.',
        image: '/images/gallery/food-3.jpg',
        order: 3,
      },
      {
        id: 'gal4',
        title: '푸드트럭 성공사례 4',
        description: '트렌디한 메뉴로 젊은 고객층을 사로잡은 사례입니다.',
        image: '/images/gallery/food-4.jpg',
        order: 4,
      },
      {
        id: 'gal5',
        title: '푸드트럭 성공사례 5',
        description: '전통 음식을 현대적으로 재해석한 푸드트럭입니다.',
        image: '/images/gallery/food-5.jpg',
        order: 5,
      },
      {
        id: 'gal6',
        title: '푸드트럭 성공사례 6',
        description: '시즌별 특색있는 메뉴로 꾸준히 인기있는 푸드트럭입니다.',
        image: '/images/gallery/food-6.jpg',
        order: 6,
      }
    ];
    
    for (const gallery of galleries) {
      await prisma.serviceGallery.create({
        data: gallery
      });
      console.log(`갤러리 항목 추가됨: ${gallery.title}`);
    }
    
    console.log('갤러리 테스트 데이터 추가 완료:', galleries.length);
  } catch (error) {
    console.error('갤러리 데이터 시드 오류:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
