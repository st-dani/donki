export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  businessHours: string[];
  socialMedia: {
    id: string;
    name: string;
    url: string;
    icon: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const contactInfo: ContactInfo = {
  address: '서울특별시 강남구 테헤란로 123 돈키타워 4층',
  phone: '02-123-4567',
  email: 'contact@donki.com',
  businessHours: [
    '평일: 09:00 - 18:00',
    '토요일: 10:00 - 15:00',
    '일요일 및 공휴일: 휴무'
  ],
  socialMedia: [
    {
      id: 'instagram',
      name: '인스타그램',
      url: 'https://instagram.com/donki',
      icon: 'instagram'
    },
    {
      id: 'facebook',
      name: '페이스북',
      url: 'https://facebook.com/donki',
      icon: 'facebook'
    },
    {
      id: 'blog',
      name: '네이버 블로그',
      url: 'https://blog.naver.com/donki',
      icon: 'blog'
    }
  ]
}; 