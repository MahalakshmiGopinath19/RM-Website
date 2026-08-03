'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaHeartbeat, FaLayerGroup, FaSync } from 'react-icons/fa';

import HeroBanner from '@/components/home/HeroBanner';
import UXUISection from '@/components/home/UXUISection';
import ServiceGrid from '@/components/home/ServiceGrid';
import FullStackSection from '@/components/home/FullStackSection';
import ClientProjects from '@/components/home/ClientProjects';
import QuickConnectForm from '@/components/home/QuickConnectForm';

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
  const line = 'bg-white/5';
  return (
    <div className="flex justify-center py-2 bg-[#020215]">
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1"
      >
        <div className={`w-px h-8 ${line}`} />
        <FaChevronDown size={12} className="text-peachAccent" />
      </motion.div>
    </div>
  );
}

/* ── Consultation Modal ── */
function ConsultModal({ isOpen, onClose, onSubmit, serviceOptions, formData, handleChange }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto py-8" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.88, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="bg-darkPanel border border-white/10 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#acabcb] hover:text-white transition-colors font-bold text-sm">
          ✕
        </button>

        {/* Left Side */}
        <div className="bg-[#030218] text-white p-10 md:p-12 w-full md:w-[44%] flex flex-col justify-center relative overflow-hidden border-r border-white/5">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,137,118,0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }} />
          <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-52 h-52 border border-white/5 rounded-full animate-[spinSlow_18s_linear_infinite] pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block bg-peachAccent/10 border border-peachAccent/20 text-peachAccent px-3 py-1.5 rounded-full text-[10px] font-display font-extrabold uppercase tracking-widest mb-6">
              Why Choose Us
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-black mb-4 leading-tight">Choose Us to Grow Your Business</h2>
            <p className="text-[#acabcb]/85 text-xs md:text-sm leading-relaxed mb-8">AI‑integrated intelligence that drives results for your brand in the digital world.</p>
            <div className="space-y-3">
              {[
                { icon: <FaHeartbeat size={12} />, l: 'Results‑Driven Strategy' },
                { icon: <FaLayerGroup size={12} />, l: 'Multi‑Platform Expertise' },
                { icon: <FaSync size={12} />, l: 'Continuous Campaign Optimization' },
              ].map((it, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 text-white px-4 py-3 rounded-full text-xs font-display font-bold shadow-sm">
                  <span className="text-peachAccent">{it.icon}</span> {it.l}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10 md:p-12 w-full md:w-[56%] bg-darkPanel flex flex-col justify-center">
          <div className="mb-6">
            <span className="text-white font-display text-xl font-black tracking-[0.1em]">VAAVE <span className="font-light tracking-[0.2em] text-[#acabcb]">DIGITAL</span></span>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <select name="service" value={formData.service} onChange={handleChange}
              className="w-full bg-[#030218] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-peachAccent text-[#acabcb] text-sm font-display transition-colors">
              {serviceOptions.map((o: string) => <option key={o} className="bg-darkBg">{o}</option>)}
            </select>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}
              className="w-full bg-[#030218] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-peachAccent text-white placeholder-white/20 text-sm font-display transition-colors" required />
            <input type="tel" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange}
              className="w-full bg-[#030218] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-peachAccent text-white placeholder-white/20 text-sm font-display transition-colors" required />
            <textarea name="message" placeholder="Message / Requirements" value={formData.message} onChange={handleChange} rows={2}
              className="w-full bg-[#030218] border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-peachAccent text-white placeholder-white/20 text-sm font-display resize-none transition-colors" />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
              className="w-full bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg py-3.5 rounded-xl font-display font-extrabold text-sm transition-colors shadow-lg">
              Submit & Get Started
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Homepage ── */
export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({ service: 'Social Media Marketing', name: '', contact: '', message: '' });

  useEffect(() => {
    const fn = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const serviceOptions = [
    'Social Media Marketing', 'Website Creation & Management', 'Google Ads & Google My Business',
    'Pay Per Click Ads', 'Search Engine Optimization (SEO)', 'Content Marketing',
    'YouTube & Google Promotion', 'Campaign Ideas & Implementation', 'Others',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      'Hi! I would like to book a consultation with Vaave Digital. Here are my details:',
      '',
      `Service Interested In: ${formData.service}`,
      `Name: ${formData.name}`,
      `Contact: ${formData.contact}`,
      `Message: ${formData.message || 'Not provided'}`
    ];
    const message = lines.join('\n');
    window.open(`https://wa.me/917305821333?text=${encodeURIComponent(message)}`, '_blank');
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-[#020215] min-h-screen text-[#acabcb] overflow-x-hidden">
      <ScrollProgressBar />
      <GrainOverlay />

      <HeroBanner setShowModal={setShowModal} />

      <UXUISection />

      <ServiceGrid setShowModal={setShowModal} />

      <FullStackSection />

      <SectionBridge />

      <ClientProjects />

      <SectionBridge />

      <QuickConnectForm setShowModal={setShowModal} />

      {/* ── Back to Top ── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg p-4 rounded-full shadow-xl z-40 transition-colors">
            <FaChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <ConsultModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            serviceOptions={serviceOptions}
            formData={formData}
            handleChange={handleChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
