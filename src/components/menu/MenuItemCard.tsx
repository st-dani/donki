'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    className="bg-white rounded-lg shadow-md overflow-hidden group"
  >
    <div className="relative w-full h-48">
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {item.tags && (
        <div className="absolute top-2 left-2 flex space-x-1">
          {item.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold truncate">{item.name}</h3>
      <p className="text-sm text-gray-500 mb-2 truncate">{item.nameEn}</p>
      <p className="text-sm text-gray-700 mb-4 h-10 overflow-hidden">{item.description}</p>
    </div>
  </motion.div>
);

export default MenuItemCard;
