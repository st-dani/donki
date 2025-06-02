'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Introduction() {
  return (
    <main className="bg-white min-h-screen">
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/imgdata/101/KakaoTalk_20240321_224705046.jpg"
            alt="돈키호테 푸드트럭 현장"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-[1920px] mx-auto px-4 md:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              INTERACTION MARKETING
            </h1>
            <p className="text-xl text-white/90 mb-8">
              맛있는 경험을 전하는 푸드트럭 서비스
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-8">
                우리의 이야기
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-24 text-theme-mint-600 font-bold">2020</div>
                  <div>
                    <h3 className="font-bold mb-2">돈키호테 푸드트럭 설립</h3>
                    <p className="text-gray-600">새로운 푸드트럭 문화를 만들기 위한 첫 걸음을 시작했습니다.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-theme-mint-600 font-bold">2021</div>
                  <div>
                    <h3 className="font-bold mb-2">프리미엄 푸드트럭 서비스 런칭</h3>
                    <p className="text-gray-600">고품격 케이터링 서비스를 시작으로 새로운 도약을 시작했습니다.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-theme-mint-600 font-bold">2022</div>
                  <div>
                    <h3 className="font-bold mb-2">대형 행사 진출</h3>
                    <p className="text-gray-600">기업 행사, 페스티벌 등 대형 행사로 영역을 확장했습니다.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-theme-mint-600 font-bold">2023</div>
                  <div>
                    <h3 className="font-bold mb-2">전국 서비스 확대</h3>
                    <p className="text-gray-600">전국 어디서나 만날 수 있는 돈키호테가 되었습니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/imgdata/101/KakaoTalk_20240321_224705046_04.jpg"
                  alt="돈키호테의 역사"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            우리의 핵심 가치
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-theme-mint-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4">최고의 품질</h3>
              <p className="text-gray-600">
                신선한 재료와 정성스러운 조리로 최고의 맛을 선사합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-theme-mint-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-4">신뢰와 약속</h3>
              <p className="text-gray-600">
                고객과의 약속을 최우선으로 생각하며, 신뢰를 바탕으로 서비스를 제공합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-theme-mint-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">💫</span>
              </div>
              <h3 className="text-xl font-bold mb-4">특별한 경험</h3>
              <p className="text-gray-600">
                단순한 음식 제공을 넘어 특별한 순간을 만드는 경험을 선사합니다.
              </p>
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
                src="/images/imgdata/101/KakaoTalk_20240321_224705046_01.jpg"
                alt="기업 행사 현장"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">기업 행사</h3>
                  <p className="text-sm text-white/80">임직원들의 특별한 순간을 더욱 즐겁게</p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden group">
              <Image
                src="/images/imgdata/101/KakaoTalk_20240321_224705046_02.jpg"
                alt="학교 행사 현장"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">학교 행사</h3>
                  <p className="text-sm text-white/80">즐거운 학창 시절의 맛있는 추억</p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden group">
              <Image
                src="/images/imgdata/101/KakaoTalk_20240321_224705046_03.jpg"
                alt="축제 현장"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
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
            돈키호테만의 특별함
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-theme-mint-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">맞춤형 메뉴 구성</h3>
                <p className="text-gray-600">
                  행사의 성격과 고객의 니즈에 맞춰 최적의 메뉴를 구성합니다. 
                  특별한 요청사항도 적극 반영하여 맞춤형 서비스를 제공합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-theme-mint-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">전문 인력 서비스</h3>
                <p className="text-gray-600">
                  숙련된 전문 인력이 친절하고 위생적으로 서비스를 제공합니다.
                  고객 만족을 최우선으로 생각하는 서비스 마인드를 갖추고 있습니다.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-theme-mint-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">완벽한 위생 관리</h3>
                <p className="text-gray-600">
                  식품 안전을 최우선으로 생각합니다. 철저한 위생 관리와 
                  정기적인 점검으로 안전한 먹거리를 제공합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-theme-mint-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">원스톱 솔루션</h3>
                <p className="text-gray-600">
                  메뉴 기획부터 행사 진행, 정리까지 모든 과정을 책임집니다.
                  고객은 결과만 확인하시면 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 행사 진행 절차 섹션 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            행사 진행 절차
          </h2>
          <div className="relative">
            {/* 연결선 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-theme-mint-200 -translate-x-1/2 hidden md:block" />
            
            {/* 절차 아이템들 */}
            <div className="space-y-12 relative">
              {/* 1단계 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2 md:text-right order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">1. 상담 문의</h3>
                  <p className="text-gray-600">
                    전화, 이메일, 홈페이지를 통해 상담을 신청해주세요.<br />
                    행사의 규모, 성격, 희망 메뉴 등을 함께 알려주시면 더욱 상세한 상담이 가능합니다.
                  </p>
                </div>
                <div className="w-16 h-16 bg-theme-mint-500 rounded-full flex items-center justify-center z-10 order-1 md:order-2">
                  <span className="text-2xl text-white">1</span>
                </div>
                <div className="w-full md:w-1/2 order-3" />
              </div>

              {/* 2단계 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2" />
                <div className="w-16 h-16 bg-theme-mint-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-2xl text-white">2</span>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">2. 맞춤 견적 제안</h3>
                  <p className="text-gray-600">
                    행사 성격과 규모에 맞는 최적의 메뉴와 서비스를 제안드립니다.<br />
                    예산과 선호도를 고려한 맞춤형 견적을 작성해드립니다.
                  </p>
                </div>
              </div>

              {/* 3단계 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2 md:text-right order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">3. 현장 분석</h3>
                  <p className="text-gray-600">
                    도면과 현장 자료를 바탕으로 최적의 설치 위치를 분석합니다.<br />
                    전기, 급배수 등 필수 시설과 동선을 고려하여 서비스 계획을 수립합니다.
                  </p>
                </div>
                <div className="w-16 h-16 bg-theme-mint-500 rounded-full flex items-center justify-center z-10 order-1 md:order-2">
                  <span className="text-2xl text-white">3</span>
                </div>
                <div className="w-full md:w-1/2 order-3" />
              </div>

              {/* 4단계 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2" />
                <div className="w-16 h-16 bg-theme-mint-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-2xl text-white">4</span>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">4. 계약 체결</h3>
                  <p className="text-gray-600">
                    최종 견적과 서비스 내용을 확정하고 계약을 진행합니다.<br />
                    계약금 입금 후 행사 일정이 확정됩니다.
                  </p>
                </div>
              </div>

              {/* 5단계 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2 md:text-right order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">5. 행사 준비</h3>
                  <p className="text-gray-600">
                    식자재 준비부터 인력 배치까지 꼼꼼하게 준비합니다.<br />
                    위생 점검과 품질 관리를 철저히 진행합니다.
                  </p>
                </div>
                <div className="w-16 h-16 bg-theme-mint-500 rounded-full flex items-center justify-center z-10 order-1 md:order-2">
                  <span className="text-2xl text-white">5</span>
                </div>
                <div className="w-full md:w-1/2 order-3" />
              </div>

              {/* 6단계 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2" />
                <div className="w-16 h-16 bg-theme-mint-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-2xl text-white">6</span>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">6. 행사 진행 및 마무리</h3>
                  <p className="text-gray-600">
                    전문 인력이 정성을 다해 서비스를 제공합니다.<br />
                    행사 종료 후 철저한 정리 정돈으로 마무리합니다.
                  </p>
                </div>
              </div>
            </div>
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

      <section className="py-24 bg-theme-mint-500">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            지금 바로 문의하세요
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-white">
            특별한 순간을 더욱 특별하게 만들어드립니다.
            돈키호테와 함께 잊지 못할 추억을 만들어보세요.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/estimate"
              className="bg-theme-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-900 transition-colors"
            >
              상담 문의하기
            </Link>
            <Link 
              href="/service"
              className="bg-white text-theme-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              서비스 더 알아보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 