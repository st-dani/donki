export interface EventType {
  id: string;
  label: string;
  description: string;
}

export interface EstimateFormData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  attendees: string;
  details: string;
}

export const eventTypes: EventType[] = [
  { id: 'corporate', label: '기업 행사', description: '워크숍, 창립기념일, 체육대회 등' },
  { id: 'entertainment', label: '연예인 서포트', description: '촬영장, 콘서트장 케이터링' },
  { id: 'school', label: '학교 행사', description: '입학식, 졸업식, 축제 등' },
  { id: 'festival', label: '지역 축제', description: '지역 행사, 페스티벌 등' },
  { id: 'private', label: '개인 행사', description: '결혼식, 생일파티, 가족 모임 등' },
  { id: 'other', label: '기타', description: '그 외 모든 행사' }
]; 