'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Opportunities from '@/components/career/Opportunities';
import CareerHero from '@/components/career/CareerHero';
import CareerBenefits from '@/components/career/CareerBenefits';
import WalkInBanner from '@/components/career/WalkInBanner';
import ApplicationModal from '@/components/career/ApplicationModal';

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
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000] bg-gradient-to-r from-[#9C5B5A] via-[#E0A36A] to-[#EFD3C9]"
    />
  );
}

export default function CareerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleWhatsAppSubmit = (formData: any) => {
    const whatsappNumber = '917305821333';
    const lines = [
      `Hi! I am interested in applying for the ${formData.job} role at Vaave Digital. Here are my details:`,
      '',
      `Position: ${formData.job}`,
      `Name: ${formData.name}`,
      `Date of Birth: ${formData.dob}`,
      `Gender: ${formData.gender}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      `Experience: ${formData.experience}`,
      `Portfolio / Work Link: ${formData.portfolio || 'Not provided'}`,
      `Cover Letter: ${formData.cover || 'Not provided'}`
    ];
    const message = lines.join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openModalForJob = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setModalOpen(true);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes spinSlow    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinSlowRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        .animate-spinSlow    { animation: spinSlow 18s linear infinite; }
        .animate-spinSlowRev { animation: spinSlowRev 24s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-spinSlow, .animate-spinSlowRev { animation: none !important; }
        }
      `}</style>

      <ScrollProgressBar />
      <GrainOverlay />

      <div className="bg-white text-gray-900 min-h-screen">
        {/* 1. HERO SECTION */}
        <CareerHero onOpenModal={openModalForJob} />

        {/* 2. WHY CHOOSE VAAVE DIGITAL */}
        <CareerBenefits />

        {/* 3. CURRENT OPPORTUNITIES */}
        <Opportunities onApply={openModalForJob} />

        {/* 4. WALK-IN BANNER */}
        <WalkInBanner />

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
              className="fixed bottom-5 right-5 z-40 bg-[#E0A36A] text-white p-4 rounded-full shadow-xl hover:bg-[#9C5B5A] transition-all font-display font-bold cursor-pointer"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>

        {/* APPLICATION MODAL */}
        <AnimatePresence>
          {modalOpen && (
            <ApplicationModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              jobTitle={selectedJob}
              onSubmit={handleWhatsAppSubmit}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
