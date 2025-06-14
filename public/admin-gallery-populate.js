// 관리자 갤러리 API를 통해 데이터를 추가하는 스크립트
// 브라우저 콘솔에서 실행하세요

async function populateGallery() {
  const galleryItems = [
    {
      title: '푸드트럭 성공사례 1',
      description: '맛있는 음식으로 성공한 사례입니다.',
      image: '/images/gallery/food-1.jpg',
      order: 1,
    },
    {
      title: '푸드트럭 성공사례 2',
      description: '특별한 메뉴로 인기를 얻은 사례입니다.',
      image: '/images/gallery/food-2.jpg',
      order: 2,
    },
    {
      title: '푸드트럭 성공사례 3',
      description: '독특한 콘셉트로 주목 받은 푸드트럭입니다.',
      image: '/images/gallery/food-3.jpg',
      order: 3,
    },
    {
      title: '푸드트럭 성공사례 4',
      description: '트렌디한 메뉴로 젊은 고객층을 사로잡은 사례입니다.',
      image: '/images/gallery/food-4.jpg',
      order: 4,
    },
    {
      title: '푸드트럭 성공사례 5',
      description: '전통 음식을 현대적으로 재해석한 푸드트럭입니다.',
      image: '/images/gallery/food-5.jpg',
      order: 5,
    },
    {
      title: '푸드트럭 성공사례 6',
      description: '시즌별 특색있는 메뉴로 꾸준히 인기있는 푸드트럭입니다.',
      image: '/images/gallery/food-6.jpg',
      order: 6,
    }
  ];

  // 이미지 API 엔드포인트 확인
  console.log('갤러리 데이터 추가 시작');
  
  for (const item of galleryItems) {
    try {
      const mockFile = await createMockFile(item.image);
      
      // FormData 객체 생성
      const formData = new FormData();
      formData.append('title', item.title);
      formData.append('description', item.description);
      formData.append('order', item.order.toString());
      formData.append('image', mockFile, item.image.split('/').pop());
      
      // API 요청
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error(`항목 추가 실패: ${item.title}`, error);
        continue;
      }
      
      const result = await response.json();
      console.log(`항목 추가 성공: ${item.title}`, result);
    } catch (error) {
      console.error(`항목 처리 중 오류: ${item.title}`, error);
    }
  }
  
  console.log('갤러리 데이터 추가 완료');
}

// 이미지 경로로부터 mock File 객체 생성
async function createMockFile(imagePath) {
  try {
    // 이미지 가져오기
    const response = await fetch(imagePath);
    const blob = await response.blob();
    
    // 파일명 추출
    const fileName = imagePath.split('/').pop();
    
    // File 객체 생성 (type은 이미지 경로에서 추측)
    let fileType = 'image/jpeg'; // 기본값
    if (fileName.endsWith('.png')) fileType = 'image/png';
    if (fileName.endsWith('.gif')) fileType = 'image/gif';
    
    return new File([blob], fileName, { type: fileType });
  } catch (error) {
    console.error('이미지 파일 생성 실패:', imagePath, error);
    // 실패 시 테스트용 빈 파일 생성
    return new File([new Uint8Array(10)], 'test-image.jpg', { type: 'image/jpeg' });
  }
}

// 실행 함수
async function run() {
  console.log('서비스 갤러리 데이터 추가 스크립트 시작');
  await populateGallery();
  console.log('처리 완료. 관리자 페이지를 새로고침하여 결과를 확인하세요.');
}

// 스크립트 실행
run();
