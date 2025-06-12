import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '우리 이야기 | 돈키호테 푸드트럭',
  description: '정성과 사랑으로 시작한 돈키호테 푸드트럭의 이야기를 소개합니다.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="/images/about/hero-bg.jpg"
            alt="돈키호테 푸드트럭 스토리"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              우리 이야기
            </h1>
            <p className="text-xl text-white">
              정성과 사랑으로 시작한 돈키호테의 여정
            </p>
          </div>
        </div>
      </section>

      {/* 스토리 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              작은 시작, 큰 꿈
            </h2>
            <div className="prose prose-lg mx-auto">
              <p className="mb-6">
                돈키호테 푸드트럭은 매일 아침 새벽부터 준비해서 출근하는 고객님들에게 
                소중한 한 끼를 제공하고자 하는 작은 꿈에서 시작되었습니다. 
                간단한 토스트로 시작한 우리의 여정은, 이제 다양한 메뉴와 
                특별한 서비스로 여러분의 소중한 순간을 함께하고 있습니다.
              </p>
              <p className="mb-6">
                처음 시작했던 그 마음 그대로, 우리는 정성과 사랑이 담긴 음식으로
                사람과 사람을 이어주는 다리가 되고자 합니다. 건강하고 맛있는 
                음식을 통해 여러분의 특별한 순간을 더욱 특별하게 만들어드리는 것,
                그것이 바로 돈키호테의 사명입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 가치 섹션 */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            돈키호테의 약속
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">정성을 다하는 준비</h3>
              <p className="text-gray-600">
                매일 새벽부터 신선한 재료로<br />
                정성껏 준비합니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">어디서나 만나는 서비스</h3>
              <p className="text-gray-600">
                시간과 장소에 구애받지 않고<br />
                찾아가는 맞춤형 서비스
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">마음을 전하는 음식</h3>
              <p className="text-gray-600">
                정성과 사랑이 담긴 음식으로<br />
                특별한 순간을 만듭니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            특별한 순간을 함께 만들어보세요
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            기업 행사, 축제, 학교 행사 등 어떤 순간이든<br />
            돈키호테와 함께라면 더욱 특별해집니다
          </p>
          <a
            href="/estimate"
            className="btn-primary"
          >
            상담 문의하기
          </a>
        </div>
      </section>
    </main>
  );
} 