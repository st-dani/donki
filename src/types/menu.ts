export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  category: string; // Corresponds to the section id
  tags?: ('NEW' | 'BEST' | 'MD추천')[];
  isPopular?: boolean;
}

export interface MenuCategory { // This is for filter buttons
  id: string;
  name: string;
  description?: string; // 카테고리 페이지 상단에 표시될 설명
}

export interface MenuSection { // This is for page sections
  id: string;
  name: string;
  description?: string;
}

// For the filter buttons on top of the menu page
export const menuFilterCategories: MenuCategory[] = [
  { id: 'all', name: '전체메뉴', description: '돈키호테의 모든 메뉴를 확인하세요.' },
  { id: 'popular', name: '인기메뉴', description: '고객님들이 가장 많이 찾으시는 베스트 메뉴입니다.' },
  { id: 'drinks', name: '음료', description: '식사와 디저트에 어울리는 다양한 음료가 준비되어 있습니다.' },
  { id: 'hotdogs-burgers', name: '핫도그&버거류', description: '특별한 레시피로 만든 돈키호테만의 수제 핫도그입니다.' },
  { id: 'meals', name: '식사', description: '든든한 한 끼를 책임질 돈키호테의 식사 메뉴입니다.' },
  { id: 'snacks', name: '간식', description: '출출할 때 생각나는 맛있는 간식!' },
  { id: 'bunsik', name: '분식', description: '언제 먹어도 맛있는 추억의 분식 메뉴를 즐겨보세요.' },
  { id: 'desserts', name: '디저트', description: '달콤한 디저트로 식사를 완벽하게 마무리하세요.' },
];

// To define the sections on the menu page
export const menuSections: MenuSection[] = [
  {
    id: 'drinks',
    name: '음료',
    description: '시원하고 맛있는 다양한 음료를 즐겨보세요!',
  },
  {
    id: 'hotdogs-burgers',
    name: '핫도그 & 버거류',
    description: '간편하지만 든든한 핫도그와 버거!',
  },
  {
    id: 'meals',
    name: '식사',
    description: '든든한 한 끼 식사 메뉴입니다.',
  },
  {
    id: 'snacks',
    name: '간식',
    description: '출출할 때 생각나는 맛있는 간식!',
  },
  {
    id: 'bunsik',
    name: '분식',
    description: '언제 먹어도 맛있는 다양한 분식 메뉴!',
  },
  {
    id: 'desserts',
    name: '디저트',
    description: '달콤한 즐거움, 다양한 디저트를 만나보세요!',
  },
];

export const menuItems: MenuItem[] = [
  // Category: 디저트 (Desserts)
  {
    id: 'churros',
    name: '츄러스',
    nameEn: 'Churros',
    description: '시나몬 슈가 솔솔, 달콤한 초코 소스에 찍어 먹는 스페인 디저트.',
    price: 4500,
    image: '/images/menu/churros.png',
    category: 'desserts',
    tags: ['BEST'],
    isPopular: true,
  },
  {
    id: 'waffle',
    name: '와플',
    nameEn: 'Waffle',
    description: '바삭한 와플 위에 달콤한 시럽과 생크림이 듬뿍',
    price: 0,
    image: '/images/menu/waffle.png',
    category: 'desserts',
    tags: ['NEW'],
  },
  {
    id: 'cookie',
    name: '쿠키',
    nameEn: 'Cookie',
    description: '직접 구운 수제 쿠키의 깊은 풍미',
    price: 0,
    image: '/images/menu/cookie.png',
    category: 'desserts',
    tags: ['NEW'],
  },
  {
    id: 'macaron',
    name: '마카롱',
    nameEn: 'Macaron',
    description: '쫀득한 꼬끄와 달콤한 필링의 조화로운 디저트',
    price: 0,
    image: '/images/menu/macaron.png',
    category: 'desserts',
    tags: ['NEW'],
  },
  {
    id: 'soft-ice-cream',
    name: '소프트 아이스크림',
    nameEn: 'Soft Ice Cream',
    description: '부드럽고 시원한 우유 소프트 아이스크림',
    price: 0,
    image: '/images/menu/soft_ice_cream.png',
    category: 'desserts',
    tags: ['NEW'],
  },
  {
    id: 'fruit-cup',
    name: '과일컵',
    nameEn: 'Fruit Cup',
    description: '신선한 제철 과일을 한 컵에 담아 간편하게',
    price: 0,
    image: '/images/menu/fruit_cup.png',
    category: 'desserts',
    tags: ['NEW'],
  },
  {
    id: 'patbingsu',
    name: '팥빙수',
    nameEn: 'Patbingsu',
    description: '시원한 얼음과 달콤한 팥, 쫄깃한 떡이 어우러진 여름 별미',
    price: 0,
    image: '/images/menu/patbingsu.png',
    category: 'desserts',
    tags: ['NEW'],
  },

  // Category: 음료 (Drinks)

  {
    id: 'americano',
    name: '아메리카노',
    nameEn: 'Americano',
    description: '깊고 진한 풍미의 클래식 아메리카노',
    price: 0, // 가격 없음 요청 반영
    image: '/images/menu/americano.png',
    category: 'drinks',
  },
  {
    id: 'latte',
    name: '라떼',
    nameEn: 'Cafe Latte',
    description: '부드러운 우유와 에스프레소의 완벽한 조화',
    price: 0, // 가격 없음 요청 반영
    image: '/images/menu/cafe_latte.png',
    category: 'drinks',
  },
  {
    id: 'ade',
    name: '에이드',
    nameEn: 'Ade',
    description: '상큼함이 터지는 다양한 과일 에이드 (청포도, 자몽, 레몬, 제주청귤 등 선택 가능)',
    price: 0, // 가격 없음 요청 반영
    image: '/images/menu/ade.png',
    category: 'drinks',
  },
  {
    id: 'iced-tea',
    name: '아이스티',
    nameEn: 'Iced Tea',
    description: '갈증을 시원하게 날려줄 달콤한 아이스티 (복숭아/레몬 선택 가능)',
    price: 0, // 가격 없음 요청 반영
    image: '/images/menu/iced_tea.png',
    category: 'drinks',
  },
  {
    id: 'yuja-tea',
    name: '유자차',
    nameEn: 'Yuja Tea (Citron Tea)',
    description: '향긋한 유자의 풍미를 느낄 수 있는 따뜻한 전통차',
    price: 0, // 가격 없음 요청 반영
    image: '/images/menu/yuja_tea.png',
    category: 'drinks',
  },
  {
    id: 'hot-chocolate',
    name: '핫초코',
    nameEn: 'Hot Chocolate',
    description: '달콤하고 진한 초콜릿의 따뜻한 위로',
    price: 0, // 가격 없음 요청 반영
    image: '/images/menu/hot_chocolate.png',
    category: 'drinks',
  },

  // Category: 핫도그 & 버거류 (Hotdogs & Burgers)

  {
    id: 'new-york-hot-dog',
    name: '뉴욕 핫도그',
    nameEn: 'New York Hot Dog',
    description: '클래식한 맛의 정수, 뉴욕 스타일 핫도그',
    price: 0,
    image: '/images/menu/new_york_hot_dog.png',
    category: 'hotdogs-burgers',
    tags: ['NEW'],
  },
  {
    id: 'handmade-burger',
    name: '수제 버거',
    nameEn: 'Handmade Burger',
    description: '육즙 가득한 패티와 신선한 야채가 어우러진 프리미엄 수제 버거',
    price: 0,
    image: '/images/menu/handmade_burger.png',
    category: 'hotdogs-burgers',
    tags: ['NEW'],
  },
  {
    id: 'potato-hot-dog',
    name: '감자 핫도그',
    nameEn: 'Potato Hot Dog',
    description: '바삭한 감자 조각이 붙어있어 더욱 고소하고 든든한 핫도그',
    price: 0,
    image: '/images/menu/potato_hot_dog.png',
    category: 'hotdogs-burgers',
    tags: ['NEW'],
  },
  {
    id: 'old-fashioned-hot-dog',
    name: '옛날 핫도그',
    nameEn: 'Old-fashioned Hot Dog',
    description: '설탕과 케첩으로 완성하는 추억의 그 맛, 옛날 핫도그',
    price: 0,
    image: '/images/menu/Old-fashioned_Hot_Dog.png',
    category: 'hotdogs-burgers',
    tags: ['NEW'],
  },
  {
    id: 'street-toast',
    name: '길거리 토스트',
    nameEn: 'Street Toast',
    description: '달콤한 소스와 아삭한 양배추가 가득, 든든한 길거리 토스트',
    price: 0,
    image: '/images/menu/street_toast.png',
    category: 'hotdogs-burgers',
    tags: ['NEW'],
  },
  {
    id: 'taiwanese-sandwich',
    name: '대만 샌드위치',
    nameEn: 'Taiwanese Sandwich',
    description: '부드러운 식빵과 단짠단짠 속재료의 조화, 대만식 샌드위치',
    price: 0,
    image: '/images/menu/taiwanese_sandwich.png',
    category: 'hotdogs-burgers',
    tags: ['NEW'],
  },
  {
    id: 'club-sandwich',
    name: '클럽 샌드위치',
    nameEn: 'Club Sandwich',
    description: '신선한 재료를 층층이 쌓아올린 푸짐하고 클래식한 샌드위치',
    price: 0,
    image: '/images/menu/club_sandwich.png',
    category: 'hotdogs-burgers',
    tags: ['NEW'],
  },

  // Category: 식사 (Meals)

  // Sub-category: 컵밥/덮밥류
  {
    id: 'steak-cup-rice',
    name: '스테이크 컵밥',
    nameEn: 'Steak Cup Rice',
    description: '육즙 가득한 스테이크가 올라간 든든한 컵밥',
    price: 0,
    image: '/images/menu/steak_cup_rice.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'shrimp-cup-rice',
    name: '쉬림프 컵밥',
    nameEn: 'Shrimp Cup Rice',
    description: '탱글탱글한 새우와 특제 소스가 어우러진 컵밥',
    price: 0,
    image: '/images/menu/shrimp_cup_rice.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'chadol-cup-rice',
    name: '차돌박이 컵밥',
    nameEn: 'Beef Brisket Cup Rice',
    description: '고소한 차돌박이가 듬뿍 들어간 컵밥',
    price: 0,
    image: '/images/menu/beef_brisket_cup_rice.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'bulgogi-rice-bowl',
    name: '불고기 덮밥',
    nameEn: 'Bulgogi Rice Bowl',
    description: '한국의 맛, 달콤짭짤한 불고기 덮밥',
    price: 0,
    image: '/images/menu/bulgogi_rice_bowl.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'jeyuk-rice-bowl',
    name: '제육 덮밥',
    nameEn: 'Spicy Pork Rice Bowl',
    description: '매콤한 제육볶음으로 입맛을 돋우는 덮밥',
    price: 0,
    image: '/images/menu/spicy_pork_rice_bowl.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'chicken-rice-bowl',
    name: '치킨 덮밥',
    nameEn: 'Chicken Rice Bowl',
    description: '남녀노소 좋아하는 데리야끼 치킨 덮밥',
    price: 0,
    image: '/images/menu/chicken_rice_bowl.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'tuna-mayo-rice-bowl',
    name: '참치마요 덮밥',
    nameEn: 'Tuna Mayo Rice Bowl',
    description: '고소하고 부드러운 참치마요 덮밥',
    price: 0,
    image: '/images/menu/tuna_mayo_rice_bowl.png',
    category: 'meals',
    tags: ['NEW'],
  },

  // Sub-category: 초밥류
  {
    id: 'torched-sushi',
    name: '불초밥',
    nameEn: 'Torched Sushi',
    description: '직화로 구워 불맛을 살린 초밥',
    price: 0,
    image: '/images/menu/torched_sushi.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'assorted-sushi',
    name: '모듬 초밥',
    nameEn: 'Assorted Sushi',
    description: '다양한 종류의 신선한 초밥을 한번에',
    price: 0,
    image: '/images/menu/assorted-sushi.png',
    category: 'meals',
    tags: ['NEW'],
  },

  // Sub-category: 면류
  {
    id: 'pho',
    name: '쌀국수',
    nameEn: 'Pho (Rice Noodles)',
    description: '진한 육수가 일품인 베트남 쌀국수',
    price: 0,
    image: '/images/menu/pho.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'pasta',
    name: '파스타',
    nameEn: 'Pasta',
    description: '취향에 따라 선택하는 파스타 (크림, 토마토 등)',
    price: 0,
    image: '/images/menu/pasta.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'pad-thai',
    name: '팟타이',
    nameEn: 'Pad Thai',
    description: '새콤달콤한 태국식 볶음 쌀국수',
    price: 0,
    image: '/images/menu/pad_thai.png',
    category: 'meals',
    tags: ['NEW'],
  },
  {
    id: 'udon',
    name: '우동',
    nameEn: 'Udon',
    description: '따끈한 국물과 쫄깃한 면발의 일본식 우동',
    price: 0,
    image: '/images/menu/udon.png',
    category: 'meals',
    tags: ['NEW'],
  },

  // Category: 간식 (Snacks)

  {
    id: 'dak-kkochi',
    name: '닭꼬치',
    nameEn: 'Dak-kkochi (Chicken Skewer)',
    description: '소금, 양념, 데리야끼 등 다양한 맛의 닭꼬치.',
    price: 4500,
    image: '/images/menu/Dak_kkochi.png',
    category: 'snacks',
    tags: ['MD추천'],
    isPopular: true,
  },
  {
    id: 'sotteok-sotteok',
    name: '소떡소떡',
    nameEn: 'Sotteok-Sotteok',
    description: '소시지와 떡을 번갈아 꽂은 환상의 짝꿍.',
    price: 4000,
    image: '/images/menu/Sotteok_Sotteok.png',
    category: 'bunsik',
    tags: ['BEST'],
    isPopular: true,
  },
  {
    id: 'tornado-potato',
    name: '회오리 감자',
    nameEn: 'Tornado Potato',
    description: '바삭하게 튀겨낸 통감자를 회오리 모양으로 즐기는 길거리 간식의 왕',
    price: 0,
    image: '/images/menu/tornado_potato.png',
    category: 'snacks',
    tags: ['NEW'],
  },
  {
    id: 'takoyaki',
    name: '타코야끼',
    nameEn: 'Takoyaki',
    description: '문어 조각이 쏙쏙! 가쓰오부시가 춤추는 오사카의 명물 간식',
    price: 0,
    image: '/images/menu/takoyaki.png',
    category: 'snacks',
    tags: ['NEW'],
  },
  {
    id: 'cheese-ball',
    name: '치즈볼',
    nameEn: 'Cheese Ball',
    description: '한 입 베어 물면 쫀득한 치즈가 쭈욱 늘어나는 마성의 간식',
    price: 0,
    image: '/images/menu/cheese_ball.png',
    category: 'snacks',
    tags: ['NEW'],
  },
  {
    id: 'cup-chicken',
    name: '컵치킨',
    nameEn: 'Cup Chicken',
    description: '간편하게 즐기는 순살치킨과 떡의 매콤달콤한 조화',
    price: 0,
    image: '/images/menu/cup_chicken.png',
    category: 'snacks',
    tags: ['NEW'],
  },
  {
    id: 'dakgangjeong',
    name: '닭강정',
    nameEn: 'Sweet Crispy Chicken',
    description: '바삭한 튀김옷에 달콤한 특제 소스를 버무린 남녀노소 최애 간식',
    price: 0,
    image: '/images/menu/sweet_crispy_chicken.png',
    category: 'snacks',
    tags: ['NEW'],
  },
  {
    id: 'bbq-ribs',
    name: '바비큐 갈비',
    nameEn: 'BBQ Ribs',
    description: '뜯고 맛보고 즐기는 재미! 특제 바비큐 소스를 바른 부드러운 갈비',
    price: 0,
    image: '/images/menu/bbq_ribs.png',
    category: 'snacks',
    tags: ['NEW'],
  },
  {
    id: 'taco',
    name: '타코',
    nameEn: 'Taco',
    description: '신선한 채소와 다채로운 소스가 어우러진 멕시코의 맛',
    price: 0,
    image: '/images/menu/taco.png',
    category: 'snacks',
    tags: ['NEW'],
  },
  {
    id: 'okonomiyaki',
    name: '오꼬노미야끼',
    nameEn: 'Okonomiyaki',
    description: '양배추와 해물이 듬뿍! 철판에서 지글지글 만들어지는 일본식 빈대떡',
    price: 0,
    image: '/images/menu/okonomiyaki.png',
    category: 'snacks',
    tags: ['NEW'],
  },


  // Category: 분식 (Bunsik)

  {
    id: 'tteokbokki',
    name: '떡볶이',
    nameEn: 'Tteokbokki',
    description: '매콤달콤한 양념에 쫄깃한 떡이 일품인 국민 간식',
    price: 0,
    image: '/images/menu/tteokbokki.png',
    category: 'bunsik',
    tags: ['NEW'],
  },
  {
    id: 'sundae',
    name: '순대',
    nameEn: 'Sundae',
    description: '다양한 속재료로 꽉 채운 쫄깃한 한국식 소시지',
    price: 0,
    image: '/images/menu/sundae.png',
    category: 'bunsik',
    tags: ['NEW'],
  },
  {
    id: 'eomuk',
    name: '어묵',
    nameEn: 'Eomuk (Fish Cake)',
    description: '따끈한 국물과 함께 즐기는 다양한 모양의 어묵 꼬치',
    price: 0,
    image: '/images/menu/eomuk.png',
    category: 'bunsik',
    tags: ['NEW'],
  },
  {
    id: 'twigim',
    name: '튀김',
    nameEn: 'Twigim (Assorted Fries)',
    description: '바삭바삭한 튀김옷을 입은 야채, 해산물 등 모듬 튀김',
    price: 0,
    image: '/images/menu/twigim.png',
    category: 'bunsik',
    tags: ['NEW'],
  },
  // Note: '핫도그&버거류' (hotdogs-burgers) category is defined but has no items yet.
]; 