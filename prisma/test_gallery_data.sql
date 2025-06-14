-- 테스트 갤러리 데이터 추가
INSERT INTO "ServiceGallery" ("id", "title", "description", "image", "order", "createdAt", "updatedAt")
VALUES 
('gal1', '푸드트럭 성공사례 1', '맛있는 음식으로 성공한 사례입니다.', '/images/gallery/food-1.jpg', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('gal2', '푸드트럭 성공사례 2', '특별한 메뉴로 인기를 얻은 사례입니다.', '/images/gallery/food-2.jpg', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('gal3', '푸드트럭 성공사례 3', '독특한 콘셉트로 주목 받은 푸드트럭입니다.', '/images/gallery/food-3.jpg', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('gal4', '푸드트럭 성공사례 4', '트렌디한 메뉴로 젊은 고객층을 사로잡은 사례입니다.', '/images/gallery/food-4.jpg', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('gal5', '푸드트럭 성공사례 5', '전통 음식을 현대적으로 재해석한 푸드트럭입니다.', '/images/gallery/food-5.jpg', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('gal6', '푸드트럭 성공사례 6', '시즌별 특색있는 메뉴로 꾸준히 인기있는 푸드트럭입니다.', '/images/gallery/food-6.jpg', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
