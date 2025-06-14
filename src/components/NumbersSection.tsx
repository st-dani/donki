'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description?: string;
}

const stats: StatItem[] = [
  {
    label: '돈키호테 고객사',
    value: 1100,
    suffix: '여곳',
    description: '다양한 기업과 함께한 경험'
  },
  {
    label: '돈키호테 진행 행사',
    value: 2040,
    suffix: '건',
    description: '성공적으로 완료된 프로젝트'
  },
  {
    label: '모빌리티 합업 진행',
    value: 305,
    suffix: '건',
    description: '다양한 파트너십'
  },
  {
    label: '브랜드 고객 경험',
    value: 30,
    suffix: '만명',
    description: '행복한 고객들'
  },
  {
    label: '바이럴 최대 효과',
    value: 10,
    suffix: '배 이상',
    description: '마케팅 효과 극대화'
  },
  {
    label: '서비스 재이용률',
    value: 85,
    suffix: '% 이상',
    description: '높은 고객 만족도'
  }
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transform: "translateY(0)",
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, transform: "translateY(20px)" }}
      animate={controls}
      className="flex items-baseline justify-center"
    >
      <motion.span
        className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {value.toLocaleString()}
      </motion.span>
      <span className="ml-1 text-2xl text-orange-500">{suffix}</span>
    </motion.div>
  );
};

interface NumbersSectionProps {
  className?: string;
}

export default function NumbersSection({ className }: NumbersSectionProps) {
  return (
    <section className={`py-24 bg-white relative overflow-hidden ${className || ''}`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-white opacity-70" />
        <div className="absolute -top-1/2 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute -bottom-1/2 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
            Numbers That Define Us
          </h2>
          <p className="text-black font-semibold tracking-wider mb-6">
            우리의 성과는 숫자로 증명됩니다. 매 순간 최선을 다해 만들어온 결과입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative group text-center hover:bg-gray-50"
            >
              <div className="relative">
                <h3 className="text-gray-600 mb-4 font-medium">{stat.label}</h3>
                <Counter value={stat.value} suffix={stat.suffix} />
                {stat.description && (
                  <p className="mt-3 text-gray-500 text-sm">{stat.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}