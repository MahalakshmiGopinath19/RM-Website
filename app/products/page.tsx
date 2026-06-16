// app/products/page.tsx – Compact hero banner
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function ProductsPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const features = ['Bill Smarter', 'Work Faster', 'Bill Efficiently', 'Customizable Billing'];

  return (
    <div className="bg-white min-h-screen">
      
      {/* ========== HERO SECTION – ultra compact, left aligned ========== */}
      <div className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/image/prodsec.webp')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="lg:text-2xl font-extrabold text-white leading-tight drop-shadow-lg">
              Innovative IT Solutions for Tomorrow's Businesses
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ========== FEATURE PILLS ========== */}
      <div className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-6 py-2.5 text-gray-700 bg-gray-50 rounded-full text-sm md:text-base font-medium border border-gray-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer shadow-sm"
              >
                {feature}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* ========== PRODUCT SHOWCASE ========== */}
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-14">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2 w-full"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
                <div className="absolute inset-0 bg-gradient-to-t from-red-100/20 to-transparent pointer-events-none"></div>
                <img
                  src="/image/imageprod.webp"
                  alt="BILL IT NOW Dashboard"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2 w-full text-center md:text-left"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-4 shadow-sm">
                AI‑Powered Billing
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">BILL IT NOW –</h2>
              <p className="text-xl text-gray-700 font-medium mt-2">Redefine Your Billing Experience</p>
              <ul className="mt-8 space-y-3 text-gray-600">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <FaCheckCircle className="text-red-500 text-lg flex-shrink-0" />
                  <span>Billing Made Seamless, Business Made Simple</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <FaCheckCircle className="text-red-500 text-lg flex-shrink-0" />
                  <span>Effortless Billing, Powerful Results</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <FaCheckCircle className="text-red-500 text-lg flex-shrink-0" />
                  <span>Your All-in-One Billing Solution</span>
                </li>
              </ul>
              <div className="mt-10">
                <a
                  href="https://billitnow-productpage.rainbowmedia.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore Now <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    {/* ========== CALL TO ACTION – only card has light red background ========== */}
<div className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 text-center border border-red-200"
      >
        {/* Subtle decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/30 to-transparent pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-200 rounded-full blur-3xl opacity-30"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Ready to streamline your billing?</h2>
          <p className="text-gray-700 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of businesses already using BILL IT NOW to save time and reduce errors.
          </p>
          <div className="mt-10">
                <a
                  href="https://wa.me/917305821333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore Now <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
        </div>
      </motion.div>
    </div>
  </div>
</div>

      {/* ========== BACK TO TOP ========== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-md z-40 hover:bg-red-700 transition-all"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        html, body { overscroll-behavior: none; scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}