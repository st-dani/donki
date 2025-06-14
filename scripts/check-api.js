// API 응답 확인 스크립트
const https = require('https');
const http = require('http');

// API 호출 함수
async function fetchFromApi(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      
      // 데이터 수신
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      // 응답 완료
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// 메인 함수
async function main() {
  try {
    console.log('API에서 메뉴 데이터 가져오는 중...');
    const menuData = await fetchFromApi('http://localhost:3000/api/menu');
    
    console.log(`총 ${menuData.length}개 메뉴 항목 확인됨`);
    
    // 분식 카테고리 항목 필터링
    const bunsikItems = menuData.filter(item => 
      item.categorySlug === 'bunsik' || 
      item.category === 'BUNSIK' || 
      item.category === 'bunsik'
    );
    
    console.log(`\n분식 카테고리 항목 (${bunsikItems.length}개 발견):`);
    bunsikItems.forEach(item => {
      console.log(`\n항목 ID: ${item.id}`);
      console.log(`이름: ${item.name}`);
      console.log(`설명: ${item.description}`);
      console.log(`카테고리: ${item.category}`);
      console.log(`카테고리 슬러그: ${item.categorySlug}`);
      console.log(`이미지: ${item.image}`);
      console.log('원본 데이터:', JSON.stringify(item, null, 2));
    });
    
    // 이미지 필드 확인
    console.log('\n이미지 필드 확인:');
    const itemsWithImage = menuData.filter(item => item.image);
    const itemsWithImageUrl = menuData.filter(item => item.imageUrl);
    console.log(`image 필드 있는 항목: ${itemsWithImage.length}개`);
    console.log(`imageUrl 필드 있는 항목: ${itemsWithImageUrl.length}개`);
    
    // 김밥 있는지 확인
    const kimbapItems = menuData.filter(item => 
      item.name.includes('김밥')
    );
    console.log(`\n'김밥' 이름 포함 항목 (${kimbapItems.length}개):`);
    kimbapItems.forEach(item => {
      console.log('김밥 항목:', JSON.stringify(item, null, 2));
    });
    
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

// 실행
main();
