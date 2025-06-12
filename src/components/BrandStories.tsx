'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const stories = [
  {
    id: 1,
    image: '/images/brand_stories/daebang_coal_service.jpg',
    quote: '"따뜻한 마음을 나누는 현장, 돈키호테가 함께했습니다."',
    author: '대방건설 연탄봉사팀',
    description: '훈훈한 봉사활동 지원'
  },
  {
    id: 2,
    image: '/images/brand_stories/wjsn_seola_shoot.jpg',
    quote: '"빛나는 스타의 촬영장, 돈키호테가 에너지를 더합니다."',
    author: '우주소녀 설아 촬영 스태프',
    description: '연예인 촬영장 활력 충전'
  },
  {
    id: 3,
    image: '/images/brand_stories/kolmar_event.jpg',
    quote: '"기업의 중요한 순간, 돈키호테가 품격을 높입니다."',
    author: '한국콜마 행사 담당자',
    description: '기업 행사 맞춤 케이터링'
  },
  {
    id: 4,
    image: '/images/brand_stories/suwon_daycare_catering.jpg',
    quote: '"우리 아이들의 즐거운 식사 시간, 돈키호테가 책임집니다."',
    author: '수원 서희 하린 어린이집 원장님',
    description: '어린이 맞춤 영양 간식 제공'
  },
  {
    id: 5,
    image: '/images/brand_stories/son_taejin_shoot.jpg',
    quote: '"열정의 무대 뒤편, 돈키호테가 든든한 지원군이 됩니다."',
    author: '손태진 촬영팀',
    description: '아티스트 촬영 현장 서포트'
  }
];

interface BrandStoriesProps {
  className?: string;
}

export default function BrandStories({ className }: BrandStoriesProps) {
  const [activeStory, setActiveStory] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`w-full py-16 bg-white ${className || ''}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-black">고객의 신뢰로 쌓아올린, 돈키호테 성공 스토리</h2>
        <div className="flex gap-6">
          {/* 메인 스토리 */}
          <div className="flex-grow relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={stories[activeStory].image}
              alt={stories[activeStory].quote}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-2xl font-bold text-white mb-2">
                {stories[activeStory].quote}
              </p>
              <p className="text-lg text-theme-yellow">
                {stories[activeStory].author}
              </p>
              <p className="text-sm text-gray-300">
                {stories[activeStory].description}
              </p>
            </div>
          </div>

          {/* 사이드 스토리 썸네일 */}
          <div className="flex flex-col gap-3 w-20 justify-between">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className={`relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer transition-all
                  ${index === activeStory ? 'opacity-100 ring-2 ring-theme-yellow' : 'opacity-50 hover:opacity-75'}`}
                onClick={() => setActiveStory(index)}
              >
                <Image
                  src={story.image}
                  alt={story.quote}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}