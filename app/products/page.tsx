// app/products/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function ProductsPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-white via-red-50 to-white py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight">
              Innovative IT Solutions for <span className="text-[#D32F2F]">Tomorrow's Businesses</span>
            </h1>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Feature Pills */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {['Bill Smarter', 'Work Faster', 'Bill Efficiently', 'Customizable Billing'].map((label, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-6 py-2.5 bg-white text-[#D32F2F] rounded-full text-sm font-semibold shadow-sm border border-red-100 hover:bg-red-50 transition cursor-pointer"
              >
                {label}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Product Showcase */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-red-100 to-red-200 h-80 flex items-center justify-center">
              {/* Fallback placeholder – replace with your actual image */}
              <div className="text-center p-8">
                <span className="text-6xl">🧾</span>
                <p className="text-gray-600 mt-4 font-semibold">BILL IT NOW Dashboard Preview</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">BILL IT NOW – <span className="text-[#D32F2F]">AI‑Integrated Billing</span></h2>
            <p className="text-[#D32F2F] font-semibold mt-2">Redefine Your Billing Experience</p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-gray-700"><span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-[#D32F2F] text-xs font-bold mt-0.5">✓</span> Billing Made Seamless, Business Made Simple</li>
              <li className="flex items-start gap-3 text-gray-700"><span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-[#D32F2F] text-xs font-bold mt-0.5">✓</span> Effortless Billing, Powerful Results</li>
              <li className="flex items-start gap-3 text-gray-700"><span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-[#D32F2F] text-xs font-bold mt-0.5">✓</span> Your All-in-One Billing Solution</li>
            </ul>
            <div className="mt-8">
              <Link
                href="/products/billitnow"
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-3 rounded-full font-semibold transition shadow-md inline-flex items-center gap-2"
              >
                Explore Now <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-[#D32F2F] text-white p-3 rounded-full shadow-lg z-40 hover:bg-[#B71C1C] transition-all"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        html, body { overscroll-behavior: none; }
      `}</style>
    </div>
  );
}