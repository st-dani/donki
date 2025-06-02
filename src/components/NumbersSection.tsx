'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  end: number;
  duration: number;
  suffix?: string;
}

function CountUp({ end, duration, suffix = '' }: CountUpProps) {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  
  const countRef = useRef(count);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!inView || !mounted) return;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = Math.floor(end * progress);
      setCount(currentCount);
      countRef.current = currentCount;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      startTimeRef.current = null;
    };
  }, [end, duration, inView, mounted]);

  // 초기 마운트 전에는 0을 표시
  if (!mounted) {
    return <span ref={ref} className="font-bold text-4xl md:text-5xl text-black">0{suffix}</span>;
  }

  return (
    <span ref={ref} className="font-bold text-4xl md:text-5xl text-black">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function NumbersSection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <CountUp end={20} duration={2000} suffix="만+" />
            <p className="text-xl text-gray-700">누적 고객 수</p>
          </div>
          <div className="space-y-4">
            <CountUp end={2000} duration={2000} suffix="+" />
            <p className="text-xl text-gray-700">누적 기업 수</p>
          </div>
          <div className="space-y-4">
            <CountUp end={6000} duration={2000} suffix="+" />
            <p className="text-xl text-gray-700">페스티벌/이벤트 참가 수</p>
          </div>
        </div>
      </div>
    </section>
  );
} 