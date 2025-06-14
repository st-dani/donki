// SQL을 사용하여 갤러리 데이터를 직접 추가하는 스크립트
require('dotenv').config();
const { Pool } = require('pg');

// 환경 변수에서 데이터베이스 연결 정보를 가져옵니다
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const client = await pool.connect();
  
  try {
    console.log('갤러리 데이터 추가 시작');
    
    // 기존 데이터 삭제
    await client.query('DELETE FROM "ServiceGallery"');
    console.log('기존 갤러리 데이터 삭제 완료');
    
    // 새 데이터 추가
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
      },
    ];
    
    // 현재 시간을 ISO 형식으로 가져옵니다
    const now = new Date().toISOString();
    
    for (const gallery of galleries) {
      await client.query(
        `INSERT INTO "ServiceGallery" (id, title, description, image, "order", "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [gallery.id, gallery.title, gallery.description, gallery.image, gallery.order, now, now]
      );
      console.log(`갤러리 항목 추가됨: ${gallery.title}`);
    }
    
    console.log('갤러리 데이터 추가 완료:', galleries.length);
  } catch (error) {
    console.error('갤러리 데이터 추가 중 오류 발생:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
