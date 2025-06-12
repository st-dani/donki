import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="bg-[#FFFBF6] py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">지금 바로 상담문의하세요</h2>
      <p className="text-gray-600 mb-8">
        행사의 성격과 규모에 맞는 최적의 서비스를 제안해드립니다. 특별한 순간을 더욱 특별하게 만들어드리는 돈키호테와 함께하세요.
      </p>
      <Link 
        href="/contact" 
        className="inline-block bg-[#FF6B00] text-white px-8 py-3 rounded-md font-medium hover:bg-[#E65000] transition-colors"
      >
        상담 문의하기
      </Link>
    </section>
  );
};

export default CTASection; 