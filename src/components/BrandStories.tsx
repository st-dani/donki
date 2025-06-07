'use client';

import Image from 'next/image';
import { useState } from 'react';

const stories = [
  {
    id: 1,
    image: '/images/imgdata/101/KakaoTalk_20240321_224705046_01.jpg',
    quote: '"대규모 행사도 돈키호테와 함께라면 완벽합니다"',
    author: '아모레퍼시픽 행사 담당자',
    description: '300명 규모 케이터링 진행'
  },
  {
    id: 2,
    image: '/images/imgdata/101/KakaoTalk_20240321_224705046_02.jpg',
    quote: '"촬영장의 분위기를 한층 더 즐겁게 만들어주셨어요"',
    author: '한선하 촬영장 매니저',
    description: '연예인 촬영장 푸드케어 서비스'
  },
  {
    id: 3,
    image: '/images/imgdata/101/KakaoTalk_20240321_224705046_03.jpg',
    quote: '"신선한 재료와 정갈한 음식으로 임직원들의 호평을 받았습니다"',
    author: '한국콜마 행사 담당자',
    description: '기업 연회 케이터링 서비스'
  }
];

export default function BrandStories() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-black">STORIES OF BRANDS</h2>
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
          <div className="flex flex-col gap-3 w-20">
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