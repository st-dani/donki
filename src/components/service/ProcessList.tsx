import ProcessStep from './ProcessStep';

const process = [
  {
    step: '01',
    title: '상담 및 견적',
    description: '행사의 성격, 규모, 예산을 고려한 맞춤형 제안을 드립니다.'
  },
  {
    step: '02',
    title: '메뉴 선정',
    description: '고객의 선호도와 행사 특성을 반영한 최적의 메뉴를 구성합니다.'
  },
  {
    step: '03',
    title: '현장 답사',
    description: '완벽한 서비스를 위해 행사 장소를 사전 답사합니다.'
  },
  {
    step: '04',
    title: '행사 진행',
    description: '전문 인력이 정성을 다해 서비스를 제공합니다.'
  }
];

export default function ProcessList() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          서비스 진행 과정
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <ProcessStep key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}