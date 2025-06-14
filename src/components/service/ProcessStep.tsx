'use client';

import { motion } from 'framer-motion';

interface ProcessStepProps {
  step: {
    step: string;
    title: string;
    description: string;
  };
  index: number;
}

export default function ProcessStep({ step, index }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-primary mb-4">{step.step}</div>
      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>
    </motion.div>
  );
} 