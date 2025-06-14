'use client';

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-r from-theme-mint-900 to-theme-mint-800 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl opacity-90 animate-fade-in-delayed">
            돈키호테와 함께할 준비가 되셨나요?<br />
            궁금하신 점이나 문의사항이 있으시다면 언제든 연락주세요.
          </p>
        </div>
      </div>
    </section>
  );
} 