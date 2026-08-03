'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

import HeroSection from '@/components/about/HeroSection';
import AboutOverview from '@/components/about/AboutOverview';
import StatsCards from '@/components/about/StatsCards';
import MissionVision from '@/components/about/MissionVision';
import Testimonials from '@/components/about/Testimonials';
import GlobalJourney from '@/components/about/GlobalJourney';
import FAQSection from '@/components/about/FAQSection';

/* ── Global Polish Layers ── */
function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[999] pointer-events-none opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

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

/* ── Section Bridge ── */
function SectionBridge() {
  return (
    <div className="flex justify-center py-6 bg-[#020215]">
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-px h-8 bg-white/5" />
        <FaChevronDown size={12} className="text-peachAccent" />
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-[#020215] min-h-screen text-[#acabcb]">
      <ScrollProgressBar />
      <GrainOverlay />

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. ABOUT OVERVIEW */}
      <AboutOverview />

      {/* 3. LEVERAGE DIGITAL ADVERTISING */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 border border-[#C9956C]/15 rounded-full pointer-events-none z-0" />
        <div className="absolute -top-12 -left-12 w-52 h-52 border border-[#C9956C]/15 rounded-full pointer-events-none z-0" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 border border-[#C9956C]/15 rounded-full pointer-events-none z-0" />
        <div className="absolute -bottom-12 -right-12 w-52 h-52 border border-[#C9956C]/15 rounded-full pointer-events-none z-0" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <StatsCards />
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="bg-[#020215] py-16 md:py-24 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <MissionVision />
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <Testimonials />

      {/* 6. GLOBAL JOURNEY */}
      <GlobalJourney />

      <SectionBridge />

      {/* 7. FAQ SECTION */}
      <FAQSection />

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg p-3 rounded-full shadow-lg z-40 transition-all font-display font-bold"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
