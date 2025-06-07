export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  subCategory: string;
  isPopular?: boolean;
  isNew?: boolean;
  spicyLevel?: number; // 0-3
  isVegetarian?: boolean;
  allergens?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  subCategories: {
    id: string;
    name: string;
  }[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'main-dishes',
    name: '든든한 한끼 식사',
    description: '돈키호테의 정성이 담긴 메인 요리',
    image: '/images/menu/categories/main-dishes.jpg',
    subCategories: [
      { id: 'rice-bowls', name: '컵밥/덮밥류' },
      { id: 'sushi', name: '초밥류' },
      { id: 'noodles', name: '면류' },
      { id: 'main-others', name: '시그니처 메인' }
    ]
  },
  {
    id: 'street-food',
    name: '길거리 간식',
    description: '추억의 맛을 현대적으로 재해석한 길거리 음식',
    image: '/images/menu/categories/street-food.jpg',
    subCategories: [
      { id: 'korean-street', name: '분식류' },
      { id: 'hotdogs-burgers', name: '핫도그/버거' },
      { id: 'toast-sandwich', name: '토스트/샌드위치' },
      { id: 'snacks', name: '인기 간식' }
    ]
  },
  {
    id: 'desserts-drinks',
    name: '디저트 & 음료',
    description: '달콤한 디저트와 시원한 음료',
    image: '/images/menu/categories/desserts-drinks.jpg',
    subCategories: [
      { id: 'desserts', name: '디저트' },
      { id: 'beverages', name: '음료' }
    ]
  }
];

export const menuItems: MenuItem[] = [
  // 컵밥/덮밥류
  {
    id: 'bulgogi-cupbap',
    name: '불고기 컵밥',
    description: '부드러운 불고기와 신선한 채소의 조화',
    price: 8900,
    category: 'main-dishes',
    subCategory: 'rice-bowls',
    isPopular: true,
    isNew: true,
    image: '/images/menu/bulgogi-taco.webp' // 임시로 불고기 타코 이미지 사용
  },
  {
    id: 'dakgalbi-cupbap',
    name: '닭갈비 컵밥',
    description: '매콤달콤한 닭갈비와 채소',
    price: 8900,
    category: 'main-dishes',
    subCategory: 'rice-bowls',
    spicyLevel: 2,
    image: '/images/menu/dakgalbi-taco.webp' // 임시로 닭갈비 타코 이미지 사용
  },
  // 초밥류
  {
    id: 'signature-sushi',
    name: '시그니처 초밥',
    description: '신선한 재료로 만든 특선 초밥',
    price: 12900,
    category: 'main-dishes',
    subCategory: 'sushi',
    isPopular: true,
    isNew: true
  },
  // 면류
  {
    id: 'jjajang-noodle',
    name: '특제 짜장면',
    description: '돈키호테만의 특별한 짜장 소스',
    price: 8900,
    category: 'main-dishes',
    subCategory: 'noodles',
    isPopular: true
  },
  // 분식류
  {
    id: 'cheese-tteokbokki',
    name: '치즈 떡볶이',
    description: '쫄깃한 떡과 특제 매콤달콤 소스의 만남',
    price: 6900,
    category: 'street-food',
    subCategory: 'korean-street',
    isPopular: true,
    spicyLevel: 2,
    image: '/images/menu/cheese-tteokbokki.webp'
  },
  {
    id: 'rabokki',
    name: '라볶이',
    description: '라면과 떡볶이의 환상적인 조합',
    price: 7900,
    category: 'street-food',
    subCategory: 'korean-street',
    spicyLevel: 2,
    image: '/images/menu/rabokki.webp'
  },
  {
    id: 'tempura-set',
    name: '모듬튀김',
    description: '바삭한 튀김 모듬 세트',
    price: 8900,
    category: 'street-food',
    subCategory: 'korean-street',
    image: '/images/menu/tempura-set.webp'
  },
  // 핫도그/버거
  {
    id: 'crispy-hotdog',
    name: '크리스피 핫도그',
    description: '바삭한 튀김옷과 쫄깃한 소시지',
    price: 4500,
    category: 'street-food',
    subCategory: 'hotdogs-burgers',
    isPopular: true,
    image: '/images/menu/crispy-hotdog.webp'
  },
  {
    id: 'cheese-hotdog',
    name: '치즈 핫도그',
    description: '모짜렐라 치즈가 가득한 핫도그',
    price: 4900,
    category: 'street-food',
    subCategory: 'hotdogs-burgers',
    image: '/images/menu/cheese-hotdog.webp'
  },
  {
    id: 'potato-hotdog',
    name: '감자 핫도그',
    description: '감자가 듬뿍 들어간 핫도그',
    price: 4900,
    category: 'street-food',
    subCategory: 'hotdogs-burgers',
    image: '/images/menu/potato-hotdog.webp'
  },
  // 타코
  {
    id: 'bulgogi-taco',
    name: '불고기 타코',
    description: '매콤달콤한 불고기가 들어간 퓨전 타코',
    price: 6900,
    category: 'street-food',
    subCategory: 'snacks',
    isPopular: true,
    image: '/images/menu/bulgogi-taco.webp'
  },
  {
    id: 'dakgalbi-taco',
    name: '닭갈비 타코',
    description: '매콤한 닭갈비와 채소의 조화',
    price: 6900,
    category: 'street-food',
    subCategory: 'snacks',
    spicyLevel: 2,
    image: '/images/menu/dakgalbi-taco.webp'
  },
  {
    id: 'shrimp-taco',
    name: '새우 타코',
    description: '새우튀김과 특제 소스의 만남',
    price: 7400,
    category: 'street-food',
    subCategory: 'snacks',
    image: '/images/menu/shrimp-taco.webp'
  },
  // 음료
  {
    id: 'americano',
    name: '아메리카노',
    description: '깊은 풍미의 블렌드 커피',
    price: 3500,
    category: 'desserts-drinks',
    subCategory: 'beverages',
    image: '/images/menu/americano.webp'
  },
  {
    id: 'cafe-latte',
    name: '카페라떼',
    description: '부드러운 우유와 에스프레소',
    price: 4000,
    category: 'desserts-drinks',
    subCategory: 'beverages',
    image: '/images/menu/cafe-latte.webp'
  },
  {
    id: 'strawberry-smoothie',
    name: '딸기 스무디',
    description: '신선한 딸기로 만든 시원한 스무디',
    price: 5500,
    category: 'desserts-drinks',
    subCategory: 'beverages',
    isNew: true,
    image: '/images/menu/strawberry-smoothie.webp'
  }
];

// 추천 메뉴 (인기 메뉴 중에서 선별)
export const recommendedItems = menuItems.filter(item => item.isPopular); 