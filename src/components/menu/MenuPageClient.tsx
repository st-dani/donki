'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { menuFilterCategories, menuSections } from '@/types/menu';
import { MenuItem } from '@/types/menu'; // 타입만 가져오기
import MenuItemCard from './MenuItemCard'; // 분리된 카드 컴포넌트 import

const MenuPageClient = () => {
  // 서버에서 가져온 메뉴 데이터 상태
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // API에서 메뉴 데이터 가져오기
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');
        
        if (!response.ok) {
          throw new Error('메뉴를 가져오는데 문제가 발생했습니다');
        }
        
        // API에서 받은 메뉴 데이터 처리
        const originalData = await response.json();
        
        // 로그로 확인
        console.log('원본 API 데이터:', originalData);
        
        // 카테고리 데이터 전처리 및 특수 케이스 처리
        const processedData = originalData.map((item: any) => {
          // 카테고리 슬러그 처리
          let categorySlug = item.categorySlug;
          
          // categorySlug가 없으면 category에서 자동 생성
          if (!categorySlug && item.category) {
            categorySlug = item.category.toLowerCase().replace('_', '-');
          }
          
          // 데이터가 준비되었음을 확인
          const result = {
            ...item,
            categorySlug,
          };
          
          return result;
        });
        
        // 특정 항목 확인
        const kimbap = processedData.find((item: MenuItem) => item.name === '김밥');
        const jjajangmyeon = processedData.find((item: MenuItem) => item.name === '짜장면');
        console.log('김밥 메뉴 데이터:', kimbap);
        console.log('짜장면 메뉴 데이터:', jjajangmyeon);
        
        // 전체 메뉴를 상태로 세팅
        setMenuItems(processedData);
        setError(null);
      } catch (err) {
        console.error('메뉴 로드 오류:', err);
        setError('메뉴를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenus();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <>
      {/* === 새로운 히어로 섹션 시작 === */}
      <section className="relative bg-gray-900 overflow-hidden h-[300px]"> {/* 기본 어두운 배경으로 이미지 로딩 실패 시 대비 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/menu/don-quixote-hero.png" // 요청하신 이미지
            alt="돈키호테 메뉴 배경"
            fill
            className="object-cover opacity-40" // 이미지 투명도 조절 (필요에 따라 30~60 사이로 조절)
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }} // 텍스트 그림자로 가독성 향상
          >
            돈키호테 스페셜 메뉴
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }} // 텍스트 그림자로 가독성 향상
          >
            푸드트럭에서 만나는 특별한 맛의 향연! 돈키호테가 자신있게 선보이는<br className="hidden sm:block" />다양한 메뉴들을 지금 바로 확인하세요.
          </motion.p>
        </div>
      </section>
      {/* === 새로운 히어로 섹션 끝 === */}

      <div className="container mx-auto px-4 py-8 md:py-16">        
        {/* 로딩 상태 */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            <span className="ml-3 text-lg">메뉴를 불러오는 중...</span>
          </div>
        )}
        
        {/* 오류 상태 */}
        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
            <p className="font-bold">오류 발생</p>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            >
              다시 시도
            </button>
          </div>
        )}
        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {menuFilterCategories.map((category) => {
            const href = category.id === 'all' ? '/menu' : `/menu/${category.id}`;
            const isActive = category.id === 'all'; // 메인 페이지에서는 '전체메뉴'만 활성화

            return (
              <Link
                key={category.id}
                href={href}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>

        {/* === 비디오 섹션 시작 === */}
        <section className="my-12 md:my-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* 비디오 1: 든든한 식사 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group aspect-w-16 aspect-h-9">
              <video
                src="/videos/menu-video1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                <h3 className="text-2xl font-bold text-white">든든한 식사</h3>
                <p className="text-sm text-gray-200 mt-2">푸짐하고 맛있는 돈키호테의 식사 메뉴로 든든한 하루를 완성하세요.</p>
              </div>
            </div>
            {/* 비디오 2: 추억의 분식 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group aspect-w-16 aspect-h-9">
              <video
                src="/videos/menu-video2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                <h3 className="text-2xl font-bold text-white">추억의 분식</h3>
                <p className="text-sm text-gray-200 mt-2">어릴 적 즐겨 먹던 바로 그 맛, 돈키호테가 재현한 추억의 분식을 만나보세요.</p>
              </div>
            </div>
            {/* 비디오 3: 디저트&음료 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group aspect-w-16 aspect-h-9">
              <video
                src="/videos/menu-video3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                <h3 className="text-2xl font-bold text-white">디저트&음료</h3>
                <p className="text-sm text-gray-200 mt-2">식사의 마무리를 완벽하게, 달콤한 디저트와 시원한 음료가 준비되어 있습니다.</p>
              </div>
            </div>
          </div>
        </section>
        {/* === 비디오 섹션 끝 === */}

        {/* Menu Sections and Items */}
        <div className="space-y-16">
          {menuSections.map((section) => {
            let displayItems: MenuItem[] = [];
            
            if (section.id === 'all') {
              // 전체 메뉴 표시
              displayItems = [...menuItems];
            } else {
              // 해당 섹션에 맞는 메뉴만 필터링
              displayItems = menuItems.filter((item: MenuItem) => {
                // 특별 예외처리: 김밥은 무조건 분식 카테고리에 표시
                if (section.id === 'bunsik' && item.name === '김밥') {
                  return true;
                }
                
                // 짜장면은 식사(meals) 카테고리에 표시
                if (section.id === 'meals' && item.name === '짜장면') {
                  return true;
                }
                
                // 일반적인 경우: categorySlug가 섹션 ID와 일치할 경우에만 표시
                return item.categorySlug === section.id;
              });
            }
            
            // 개발용 디버깅 로그 - 분식 카테고리
            if (section.id === 'bunsik') {
              const names = displayItems.map(item => item.name);
              console.log('분식 카테고리 해결 후 출력되는 아이템들:', names);
              const kimbapItem = displayItems.find(item => item.name === '김밥');
              console.log('분식에 김밥이 포함되어 있는지:', !!kimbapItem);
            }

            if (displayItems.length === 0) return null;

            return (
              <section key={section.id} id={section.id}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-800">{section.name}</h2>
                  {section.description && <p className="text-md text-gray-500 mt-2">{section.description}</p>}
                </div>
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {displayItems.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </motion.div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenuPageClient;
