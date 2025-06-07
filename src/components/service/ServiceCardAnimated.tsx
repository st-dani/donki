'use client';

import { motion } from 'framer-motion';

interface ServiceCardAnimatedProps {
  children: React.ReactNode;
  index: number;
}

export default function ServiceCardAnimated({ children, index }: ServiceCardAnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-lg"
    >
      {children}
    </motion.div>
  );
}
