'use client';

import { motion } from 'framer-motion';
import ServiceList from './ServiceList';

export default function ServiceListAnimated() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ServiceList />
    </motion.div>
  );
}
