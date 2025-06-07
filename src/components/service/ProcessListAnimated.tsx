'use client';

import { motion } from 'framer-motion';
import ProcessList from './ProcessList';

export default function ProcessListAnimated() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ProcessList />
    </motion.div>
  );
}
