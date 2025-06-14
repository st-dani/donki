'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaPhone } from 'react-icons/fa';
import { companyInfo } from '@/types/footer';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative z-0 min-h-screen bg-white text-black overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-white opacity-70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-48 pb-12 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start min-h-[calc(100vh-180px)] gap-12">
          {/* Left: Text area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 pr-8 z-10"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-black font-semibold tracking-wider mb-6"
            >
              PREMIUM FOOD TRUCK SERVICE
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight"
            >
              <span className="text-orange-500">돈키호테</span><br />
              새로운 맛의 여정!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-600 mb-12 leading-relaxed"
            >
              상상만 했던 최고의 맛, 이제 현실이 됩니다.<br />
              돈키호테 푸드트럭은 모든 순간을 잊을 수 없는 미식의 여정으로 만들어 드립니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/service"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-theme-white rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                서비스 알아보기
              </Link>
              <a
                href={`tel:${companyInfo.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-theme-white rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <FaPhone className="w-4 h-4 mr-2" />
                전화문의
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right: Video area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block w-1/2"
          >
            <div className="relative w-full pt-[56.25%] group">
              {/* Border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-300/20 p-0.5 shadow-2xl">
                <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white">
                  {/* Video */}
                  <video 
                    className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-[1.02] transition-transform duration-700"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src="/videos/vod1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Glowing corner effects */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400/40 to-transparent rounded-tl-3xl blur-2xl group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-400/40 to-transparent rounded-br-3xl blur-2xl group-hover:opacity-75 transition-opacity duration-500"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 