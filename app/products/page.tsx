'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import ProductHero from '@/components/products/ProductHero';
import ProductGrid from '@/components/products/ProductGrid';
import ProductCTA from '@/components/products/ProductCTA';

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? scrolled / height : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000] bg-peachAccent"
    />
  );
}

export default function ProductsPage() {
  return (
    <div className="bg-[#020215] min-h-screen relative overflow-hidden select-none">
      <ScrollProgressBar />

      {/* 1. HERO SECTION */}
      <ProductHero />

      {/* 2. PRODUCT SHOWCASE GRID */}
      <section className="py-24 border-b border-white/5 bg-[#030218]/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <ProductGrid />
        </div>
      </section>

      {/* 3. FOOTER BANNER CTA */}
      <ProductCTA />
    </div>
  );
}
