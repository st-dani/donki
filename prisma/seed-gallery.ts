import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.serviceGallery.deleteMany({});
  
  // 새 데이터 추가
  const galleries = await Promise.all([
    prisma.serviceGallery.create({
      data: {
        id: 'gal1',
        title: '푸드트럭 성공사례 1',
        description: '맛있는 음식으로 성공한 사례입니다.',
        image: '/images/gallery/food-1.jpg',
        order: 1,
      },
    }),
    prisma.serviceGallery.create({
      data: {
        id: 'gal2',
        title: '푸드트럭 성공사례 2',
        description: '특별한 메뉴로 인기를 얻은 사례입니다.',
        image: '/images/gallery/food-2.jpg',
        order: 2,
      },
    }),
    prisma.serviceGallery.create({
      data: {
        id: 'gal3',
        title: '푸드트럭 성공사례 3',
        description: '독특한 콘셉트로 주목 받은 푸드트럭입니다.',
        image: '/images/gallery/food-3.jpg',
        order: 3,
      },
    }),
    prisma.serviceGallery.create({
      data: {
        id: 'gal4',
        title: '푸드트럭 성공사례 4',
        description: '트렌디한 메뉴로 젊은 고객층을 사로잡은 사례입니다.',
        image: '/images/gallery/food-4.jpg',
        order: 4,
      },
    }),
    prisma.serviceGallery.create({
      data: {
        id: 'gal5',
        title: '푸드트럭 성공사례 5',
        description: '전통 음식을 현대적으로 재해석한 푸드트럭입니다.',
        image: '/images/gallery/food-5.jpg',
        order: 5,
      },
    }),
    prisma.serviceGallery.create({
      data: {
        id: 'gal6',
        title: '푸드트럭 성공사례 6',
        description: '시즌별 특색있는 메뉴로 꾸준히 인기있는 푸드트럭입니다.',
        image: '/images/gallery/food-6.jpg',
        order: 6,
      },
    }),
  ]);

  console.log('갤러리 테스트 데이터 추가 완료:', galleries.length);
}

main()
  .catch((e) => {
    console.error('갤러리 데이터 시드 오류:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
