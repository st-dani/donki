'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
  title: string;
  description: string;
}

export default function AnimatedText({ title, description }: AnimatedTextProps) {
  return (
    <div className="text-center">
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h1>
      
      <motion.p 
        className="max-w-3xl mx-auto text-xl text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {description}
      </motion.p>
    </div>
  );
}
