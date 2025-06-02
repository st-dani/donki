# 버튼 효과 가이드 (HTML5)

이 문서는 HTML5 표준을 기반으로 웹사이트에서 사용되는 다양한 버튼 효과들의 구현 방법을 설명합니다.

## 기본 설정

### HTML5 문서 기본 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>버튼 효과 예제</title>
</head>
<body>
    <!-- 여기에 버튼 컴포넌트가 들어갑니다 -->
</body>
</html>
```

## 1. 왼쪽에서 오른쪽으로 채워지는 효과

### Next.js (React) 구현
```jsx
<Link 
  href="/estimate" 
  className="relative overflow-hidden group px-8 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-medium"
>
  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
    버튼 텍스트
  </span>
  <div className="absolute inset-0 w-full h-full bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
</Link>
```

### 순수 HTML5/CSS 구현
```html
<a href="/estimate" class="button-fill">
  <span>버튼 텍스트</span>
</a>
```

```css
.button-fill {
  position: relative;
  display: inline-block;
  padding: 0.75rem 2rem;
  border: 2px solid #f97316;
  border-radius: 9999px;
  color: #f97316;
  font-weight: 500;
  text-decoration: none;
  overflow: hidden;
}

.button-fill span {
  position: relative;
  z-index: 1;
  transition: color 0.3s;
}

.button-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f97316;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}

.button-fill:hover span {
  color: white;
}

.button-fill:hover::before {
  transform: scaleX(1);
}
```

### 스타일 설명
- `position: relative/absolute`: HTML5의 포지셔닝 컨텍스트 활용
- `transform`: HTML5/CSS3의 하드웨어 가속 변환 효과 사용
- `transition`: CSS3 트랜지션으로 부드러운 애니메이션 구현
- `::before`: CSS3 가상 요소를 활용한 배경 효과
- `border-radius`: CSS3 둥근 모서리 속성 사용

### 브라우저 지원
- Chrome 51+
- Firefox 54+
- Safari 10+
- Edge 15+

### 사용 방법
1. HTML5 문서에 CSS 스타일을 `<style>` 태그나 외부 스타일시트로 추가
2. HTML 구조를 복사하여 원하는 위치에 붙여넣기
3. 링크 주소(href)와 텍스트를 수정
4. 필요한 경우 색상 코드(#f97316)를 프로젝트에 맞게 변경

## 2. 물결 효과 (Wave Effect)

[물결 효과 코드도 여기에 추가 예정...]

---
마지막 업데이트: 2024-06-01 