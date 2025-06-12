'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import EstimateForm from '@/components/estimate/EstimateForm';
import { FaTruck } from 'react-icons/fa';

export default function Introduction() {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const portalRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ensure this runs only on the client
    portalRootRef.current = document.getElementById('modal-portal-root');
    if (!portalRootRef.current) {
      const portalDiv = document.createElement('div');
      portalDiv.id = 'modal-portal-root';
      document.body.appendChild(portalDiv);
      portalRootRef.current = portalDiv;
    }
  }, []);

  const openEstimate = () => {
    setIsEstimateOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeEstimate = () => {
    setIsEstimateOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const ModalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-start justify-center overflow-y-auto pt-20 pb-20">
      <div className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">상담 문의하기</h2>
          <button onClick={closeEstimate} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <EstimateForm />
      </div>
    </div>
  );
  return (
    <main className="bg-white min-h-screen">
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/service-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-[1920px] mx-auto px-4 md:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 overflow-hidden">
              <div className="flex flex-row flex-wrap">
                {['STORY', 'OF', 'US'].map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className="inline-block mr-2 last:mr-0"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 * wordIndex,
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  >
                    {word.split('').map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        className="inline-block tracking-wider"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.2 * wordIndex + 0.1 * letterIndex,
                          type: "spring",
                          stiffness: 100,
                          damping: 12
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.span>
                ))}
              </div>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              특별한 순간을 더욱 특별하게 만드는 프리미엄 푸드트럭 서비스
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <h2 className="text-4xl font-bold mb-8">
                우리의 이야기
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-24 shrink-0 text-theme-mint-600 font-bold leading-normal">2020</div>
                  <div>
                    <h3 className="font-bold mb-2 leading-normal">돈키호테 푸드트럭 설립</h3>
                    <p className="text-gray-600 leading-normal">새로운 푸드트럭 문화를 만들기 위한 첫 걸음을 시작했습니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-24 shrink-0 text-theme-mint-600 font-bold leading-normal">2021</div>
                  <div>
                    <h3 className="font-bold mb-2 leading-normal">프리미엄 푸드트럭 서비스 런칭</h3>
                    <p className="text-gray-600 leading-normal">고품격 케이터링 서비스를 시작으로 새로운 도약을 시작했습니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-24 shrink-0 text-theme-mint-600 font-bold leading-normal">2022</div>
                  <div>
                    <h3 className="font-bold mb-2 leading-normal">대형 행사 진출</h3>
                    <p className="text-gray-600 leading-normal">기업 행사, 페스티벌 등 대형 행사로 영역을 확장했습니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-24 shrink-0 text-theme-mint-600 font-bold leading-normal">2023</div>
                  <div>
                    <h3 className="font-bold mb-2 leading-normal">전국 서비스 확대</h3>
                    <p className="text-gray-600 leading-normal">전국 어디서나 만날 수 있는 돈키호테가 되었습니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-24 shrink-0 text-theme-mint-600 font-bold leading-normal">2024</div>
                  <div>
                    <h3 className="font-bold mb-2 leading-normal">케이터링, 도시락서비스 사업 확대</h3>
                    <p className="text-gray-600 leading-normal">돈키호테는 푸드트럭을 넘어, 고품격 케이터링과 맞춤형 도시락 서비스로 사업 영역을 확장하고 있습니다. 기업 행사부터 개인적인 특별한 날까지, 최상의 맛과 서비스로 고객 만족을 실현합니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden grid grid-cols-2 grid-rows-2 gap-2 p-2 bg-gray-100 w-full h-full">
                {[
                  { title: "현대자동차 후원행사", description: "성공적인 브랜드 경험을 위한 파트너, 돈키호테가 함께합니다.", imgNum: 1, altText: "현대자동차 후원행사 이미지" },
                  { title: "울산 국민통합 김장행사", description: "지역사회와 함께하는 따뜻한 나눔, 돈키호테가 정성을 더합니다.", imgNum: 2, altText: "울산 국민통합 김장행사 이미지" },
                  { title: "성남시 통 고구마 축제", description: "즐거운 축제의 순간, 돈키호테가 맛있는 추억을 선사합니다.", imgNum: 3, altText: "성남시 통 고구마 축제 이미지" },
                  { title: "바른손이엔씨 하정우 배우 및 영화스탭 서포트행사", description: "최고의 결과물을 위한 헌신, 돈키호테가 현장의 에너지를 책임집니다.", imgNum: 4, altText: "바른손이엔씨 영화스탭 서포트 이미지" }
                ].map((story, index) => (
                  <div key={index} className="relative w-full h-full group overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={`/images/imgdata/101/story-${story.imgNum}.jpg`}
                      alt={story.altText}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                      <h4 className="text-white text-sm font-semibold mb-0.5 leading-tight">{story.title}</h4>
                      <p className="text-white text-xs">{story.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
  <div className="max-w-[1920px] mx-auto px-4 md:px-8">
    <h2 className="text-4xl font-bold text-center mb-16">돈키호테만의 특별함</h2>
    <div className="grid md:grid-cols-2 gap-12">
      {/* 맞춤형 메뉴 구성 */}
      <div className="flex gap-6">
        <div className="w-12 h-12 bg-[#FF6F1B]/20 rounded-full flex items-center justify-center flex-shrink-0">
          {/* 메뉴판/셰프모자 아이콘 */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="16" rx="16" ry="16" fill="#FF6F1B" fillOpacity="0.08"/>
            <path d="M10 21V18C10 16.16 11.58 14.5 13.5 14.5H18.5C20.42 14.5 22 16.16 22 18V21" stroke="#FF6F1B" strokeWidth="1.7" strokeLinecap="round"/>
            <path d="M16 14.5C16 12.66 17.58 11 19.5 11C21.42 11 23 12.66 23 14.5" stroke="#FF6F1B" strokeWidth="1.7" strokeLinecap="round"/>
            <path d="M16 14.5C16 12.66 14.42 11 12.5 11C10.58 11 9 12.66 9 14.5" stroke="#FF6F1B" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">맞춤형 메뉴 구성</h3>
          <p className="text-gray-600">행사의 성격과 고객의 니즈에 맞춰 최적의 메뉴를 구성합니다. 특별한 요청사항도 적극 반영하여 맞춤형 서비스를 제공합니다.</p>
        </div>
      </div>
      {/* 전문 인력 서비스 */}
      <div className="flex gap-6">
        <div className="w-12 h-12 bg-[#FF6F1B]/20 rounded-full flex items-center justify-center flex-shrink-0">
          {/* 사람/유니폼 아이콘 */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="16" rx="16" ry="16" fill="#FF6F1B" fillOpacity="0.08"/>
            <circle cx="16" cy="11.5" r="4" stroke="#FF6F1B" strokeWidth="1.7"/>
            <path d="M10 24C10 19.72 13.36 16.5 16 16.5C18.64 16.5 22 19.72 22 24" stroke="#FF6F1B" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">전문 인력 서비스</h3>
          <p className="text-gray-600">숙련된 전문 인력이 친절하고 위생적으로 서비스를 제공합니다. 고객 만족을 최우선으로 생각하는 서비스 마인드를 갖추고 있습니다.</p>
        </div>
      </div>
      {/* 완벽한 위생 관리 */}
      <div className="flex gap-6">
        <div className="w-12 h-12 bg-[#FF6F1B]/20 rounded-full flex items-center justify-center flex-shrink-0">
          {/* 방패+체크 아이콘 */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="16" rx="16" ry="16" fill="#FF6F1B" fillOpacity="0.08"/>
            <path d="M16 8L22 10.5V16.5C22 22.42 16 25.5 16 25.5C16 25.5 10 22.42 10 16.5V10.5L16 8Z" stroke="#FF6F1B" strokeWidth="1.7"/>
            <path d="M13 17.5L15 19.5L20 14.5" stroke="#FF6F1B" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">완벽한 위생 관리</h3>
          <p className="text-gray-600">식품 안전을 최우선으로 생각합니다. 철저한 위생 관리와 정기적인 점검으로 안전한 먹거리를 제공합니다.</p>
        </div>
      </div>
      {/* 원스톱 솔루션 */}
      <div className="flex gap-6">
        <div className="w-12 h-12 bg-[#FF6F1B]/20 rounded-full flex items-center justify-center flex-shrink-0">
          {/* 체크리스트/플로우 아이콘 */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="16" rx="16" ry="16" fill="#FF6F1B" fillOpacity="0.08"/>
            <rect x="10" y="10" width="12" height="12" rx="2" stroke="#FF6F1B" strokeWidth="1.7"/>
            <path d="M13 17L15 19L19 14" stroke="#FF6F1B" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">원스톱 솔루션</h3>
          <p className="text-gray-600">메뉴 기획부터 행사 진행, 정리까지 모든 과정을 책임집니다. 고객은 결과만 확인하시면 됩니다.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">
              특별한 순간을 위한 선택
            </h2>
            <p className="text-gray-600 text-center max-w-2xl">
              "맛있는 음식이 있는 곳에 행복이 있습니다"<br /><br />
              돈키호테는 단순한 푸드트럭이 아닌,<br />
              특별한 순간을 더욱 특별하게 만드는 미식 경험을 선사합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden group">
              <Image
                src="/images/imgdata/101/hd-1.jpg"
                alt="기업 행사 현장"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/10 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">기업 행사</h3>
                  <p className="text-sm text-white/80">임직원들의 특별한 순간을 더욱 즐겁게</p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden group">
              <Image
                src="/images/imgdata/101/school-1.jpg"
                alt="학교 행사 현장"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/10 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">학교 행사</h3>
                  <p className="text-sm text-white/80">즐거운 학창 시절의 맛있는 추억</p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden group">
              <Image
                src="/images/imgdata/101/snam-1.jpg"
                alt="축제 현장"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/10 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">축제 & 이벤트</h3>
                  <p className="text-sm text-white/80">축제의 즐거움을 더하는 맛있는 경험</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600">
              돈키호테와 함께라면 어떤 행사든 특별해집니다.<br />
              지금 바로 문의하세요.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            자주 묻는 질문
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4">서비스 지역은 어디인가요?</h3>
              <p className="text-gray-600">
                전국 어디든 서비스가 가능합니다. 단, 지역에 따라 추가 비용이 발생할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4">최소 인원은 몇 명인가요?</h3>
              <p className="text-gray-600">
                최소 50인 이상부터 서비스가 가능합니다. 단, 행사의 성격에 따라 조정될 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4">예약은 언제까지 해야 하나요?</h3>
              <p className="text-gray-600">
                행사 2주 전까지 예약을 완료해 주시면 됩니다. 급한 행사의 경우 별도로 문의해 주세요.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4">메뉴 변경이 가능한가요?</h3>
              <p className="text-gray-600">
                네, 가능합니다. 행사의 성격과 고객님의 요구사항에 맞춰 메뉴 구성을 변경할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}