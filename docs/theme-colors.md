# 사이트 테마 색상 가이드

## 메인 색상 팔레트

### CSS 변수 정의
```css
:root {
  /* 기본 색상 */
  --color-white: #ffffff;
  --color-black: #000000;
  --color-yellow: #FFD700;     /* 진한 노란색 */
  --color-red: #FF0000;        /* 빨간색 */
  
  /* 색상 변형 */
  --color-yellow-light: #FFE44D;  /* 밝은 노란색 */
  --color-yellow-dark: #CCAC00;   /* 어두운 노란색 */
  --color-red-light: #FF3333;     /* 밝은 빨간색 */
  --color-red-dark: #CC0000;      /* 어두운 빨간색 */
  
  /* 배경색 */
  --bg-primary: var(--color-white);
  --bg-secondary: var(--color-yellow-light);
  --bg-accent: var(--color-red);
  
  /* 텍스트 색상 */
  --text-primary: var(--color-black);
  --text-secondary: var(--color-yellow-dark);
  --text-accent: var(--color-red);
  --text-light: var(--color-white);
}
```

### Tailwind CSS 설정
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'theme-white': '#ffffff',
        'theme-black': '#000000',
        'theme-yellow': {
          DEFAULT: '#FFD700',
          light: '#FFE44D',
          dark: '#CCAC00',
        },
        'theme-red': {
          DEFAULT: '#FF0000',
          light: '#FF3333',
          dark: '#CC0000',
        },
      },
    },
  },
}
```

## 색상 사용 가이드라인

### 주요 사용 영역
1. **흰색 (#FFFFFF)**
   - 메인 배경색
   - 네비게이션 바 배경
   - 카드 컴포넌트 배경

2. **진한 노란색 (#FFD700)**
   - 강조 버튼
   - 중요 섹션 헤더
   - 호버 효과
   - 아이콘 강조

3. **검정색 (#000000)**
   - 주요 텍스트
   - 헤더 텍스트
   - 테두리 선

4. **빨간색 (#FF0000)**
   - 경고 메시지
   - 특별 강조 요소
   - 중요 알림
   - 액션 버튼

### 접근성 고려사항
- 텍스트 가독성을 위해 배경색과 텍스트 색상의 대비율 최소 4.5:1 유지
- 중요 정보는 색상에만 의존하지 않고 아이콘이나 텍스트로 보완
- 색맹/색약 사용자를 위한 충분한 명도 대비 확보

### 사용 예시
```html
<!-- 버튼 예시 -->
<button class="bg-theme-yellow hover:bg-theme-yellow-dark text-theme-black">
  확인
</button>

<!-- 경고 메시지 예시 -->
<div class="bg-theme-red-light text-theme-white p-4 rounded">
  주의: 필수 입력 항목입니다
</div>

<!-- 섹션 헤더 예시 -->
<h2 class="text-theme-black border-b-2 border-theme-yellow">
  서비스 소개
</h2>
```

## 색상 조합 추천
1. 기본 버튼
   - 배경: 흰색
   - 테두리: 진한 노란색
   - 텍스트: 검정색
   - 호버: 진한 노란색 배경

2. 강조 버튼
   - 배경: 진한 노란색
   - 텍스트: 검정색
   - 호버: 어두운 노란색

3. 경고 버튼
   - 배경: 빨간색
   - 텍스트: 흰색
   - 호버: 어두운 빨간색

---
마지막 업데이트: 2024-06-01 