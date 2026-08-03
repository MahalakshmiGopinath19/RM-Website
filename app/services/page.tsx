'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

import ServiceSlider from '@/components/services/ServiceSlider';
import OnlinePresence from '@/components/services/OnlinePresence';
import ServiceHero from '@/components/services/ServiceHero';
import BrightIdeas from '@/components/services/BrightIdeas';
import ServiceCTA from '@/components/services/ServiceCTA';
import ServiceModal from '@/components/services/ServiceModal';

function GrainOverlay() {
  return (
    <div aria-hidden className="fixed inset-0 z-[999] pointer-events-none opacity-[0.035] mix-blend-overlay"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000] bg-peachAccent" />;
}

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    let t: NodeJS.Timeout;
    const onScroll = () => { clearTimeout(t); t = setTimeout(() => setShowBackToTop(window.scrollY > 300), 100); };
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openModal = useCallback((service: any) => {
    setSelectedService(service);
    setModalOpen(true);
  }, []);

  const handleWhatsAppSubmit = useCallback((title: string, name: string, phone: string, message: string) => {
    const whatsappNumber = '917305821333';
    const lines = [
      `Hi! I am interested in your service: ${title}`,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Requirements: ${message || 'Not provided'}`
    ];
    const fullMsg = lines.join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMsg)}`, '_blank');
  }, []);

  return (
    <div className="relative bg-[#020215] min-h-screen" ref={containerRef}>
      <ScrollProgressBar />
      <GrainOverlay />

      {/* 1. HERO SECTION */}
      <ServiceHero />

      {/* 2. SERVICES SLIDER */}
      <ServiceSlider openModal={openModal} />

      {/* 3. ONLINE PRESENCE & INDUSTRIES */}
      <OnlinePresence openModal={openModal} />

      {/* 4. BRIGHT IDEAS / SEO SECTION */}
      <BrightIdeas />

      {/* 5. FINAL CTA BANNER */}
      <ServiceCTA />

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
            className="fixed bottom-6 right-6 bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg p-3 rounded-full shadow-xl z-40 transition-colors text-base font-display font-bold cursor-pointer"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* SERVICE MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <ServiceModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            service={selectedService}
            onSubmit={handleWhatsAppSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
