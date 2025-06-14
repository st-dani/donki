'use client';

import { motion } from 'framer-motion';
import EstimateForm from '@/components/estimate/EstimateForm';

export default function Estimate() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            견적 문의
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 text-center mb-12"
          >
            돈키호테 푸드트럭과 함께 특별한 순간을 만들어보세요.<br />
            상세한 정보를 입력해 주시면 맞춤 견적을 제안해드립니다.
          </motion.p>

          <EstimateForm />
        </div>
      </div>
    </main>
  );
} 