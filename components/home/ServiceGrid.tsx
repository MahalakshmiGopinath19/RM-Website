'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ── Rose Gold palette ── */
const CARD_BG   = 'linear-gradient(135deg, #C9956C 0%, #e8b090 50%, #b87040 100%)';
const CARD_BG_B = 'linear-gradient(135deg, #b86f3f 0%, #C9956C 60%, #e8b090 100%)';
const TEXT_DARK = '#3b1a08';   // deep brown — max contrast on rose gold
const TEXT_MID  = '#6b3520';   // medium brown for subtitles / tags
const ARROW_BG  = 'rgba(255,255,255,0.25)';
const ARROW_BORDER = 'rgba(255,255,255,0.4)';

/* ── Flip Card ── */
function FlipCard({ front, back }: { front: React.ReactNode; back: React.ReactNode }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="relative h-[250px] sm:h-[380px] w-full"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* Front */}
        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}>
          {front}
        </div>
        {/* Back */}
        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}>
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ServiceGridProps {
  setShowModal: (show: boolean) => void;
}

const services = [
  { image: '/image/sm-img.webp', title: 'Social Media Marketing', tag: 'SMM', desc: 'Data-driven social strategies with smart insights to boost engagement, reach, and campaign performance across all platforms.', cta: 'Free Audit' },
  { image: '/image/wb.webp', title: 'Website Creation', tag: 'WEB', desc: 'Modern, responsive websites with interactive features and smart integrations tailored to your business goals.', cta: 'Chat with Dev', href: 'https://wa.me/917305821333' },
  { image: '/image/gmb.webp', title: 'Google My Business', tag: 'GMB', desc: 'Optimized business profiles with data-driven insights to dominate local search and drive more foot traffic.', cta: 'Call for Local SEO', href: 'tel:+917305821333' },
  { image: '/image/seo.webp', title: 'Search Engine Optimization', tag: 'SEO', desc: 'Comprehensive SEO strategies that enhance visibility and drive sustained organic traffic for long-term growth.', cta: 'Request SEO Analysis' },
  { image: '/image/bcd.webp', title: 'Branding & Design', tag: 'BRD', desc: 'Creative branding solutions enhanced by modern tools for faster ideation and impactful visual identities.', cta: 'Email Design Team', href: 'mailto:rmedia1123.info@gmail.com' },
];

export default function ServiceGrid({ setShowModal }: ServiceGridProps) {
  return (
    <section className="py-10 lg:py-16 border-t border-white/5" style={{ backgroundColor: '#030218' }}>
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
          <motion.span variants={fadeUp}
            className="inline-block font-display text-xs tracking-[0.35em] uppercase font-bold mb-3"
            style={{ color: '#C9956C' }}>
            Services
          </motion.span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <motion.h2 variants={fadeUp} className="font-display font-extrabold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: '#ffffff' }}>
              What We <span className="text-gradient-peach">Offer</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-display text-xs md:text-sm uppercase tracking-widest font-semibold"
              style={{ color: '#acabcb' }}>
              Hover cards to explore →
            </motion.p>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <FlipCard
                front={
                  /* ── FRONT FACE ── */
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden flex flex-col border-2 border-transparent hover:border-white shadow-md hover:shadow-xl transition-all duration-300"
                    style={{ background: CARD_BG }}
                  >
                    <div className="flex-1 w-full relative overflow-hidden">
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 sm:p-5 flex items-center justify-between border-t border-white/20">
                      <div>
                        <span className="font-data text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                          style={{ color: TEXT_MID }}>{s.tag}</span>
                        <h3 className="font-display font-bold text-xs sm:text-lg mt-0.5 leading-tight"
                          style={{ color: TEXT_DARK }}>{s.title}</h3>
                      </div>
                      <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: ARROW_BG, border: `1px solid ${ARROW_BORDER}` }}>
                        <FaArrowRight style={{ color: TEXT_DARK }} className="text-[9px] sm:text-[11px]" />
                      </div>
                    </div>
                  </div>
                }
                back={
                  /* ── BACK FACE ── */
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-8 shadow-xl border-2 border-white/60 hover:border-white transition-all duration-300"
                    style={{ background: CARD_BG_B }}
                  >
                    {/* Centered background logo watermark on hover side only */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      <img
                        src="/image/logo_blue.png"
                        alt="Logo Background"
                        className="w-44 h-44 sm:w-64 sm:h-64 object-contain opacity-25 select-none"
                      />
                    </div>

                    <div className="relative z-10">
                      <span className="font-data text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                        style={{ color: TEXT_MID }}>{s.tag}</span>
                      <h3 className="font-display font-bold text-xs sm:text-2xl mt-1 sm:mt-2 mb-1 sm:mb-4 leading-tight"
                        style={{ color: TEXT_DARK }}>{s.title}</h3>
                      <p className="text-[10px] sm:text-sm leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none font-medium"
                        style={{ color: '#5a2e10' }}>{s.desc}</p>
                    </div>
                    <div className="relative z-10">
                      {s.href ? (
                        <a href={s.href} target="_blank" rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-display font-extrabold text-[9px] sm:text-sm mt-2 sm:mt-6 w-fit transition-all duration-300 shadow-md"
                          style={{ backgroundColor: TEXT_DARK, color: '#fdf6f0' }}>
                          {s.cta} <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[8px] sm:text-[11px]" />
                        </a>
                      ) : (
                        <button onClick={() => setShowModal(true)}
                          className="group inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-display font-extrabold text-[9px] sm:text-sm mt-2 sm:mt-6 w-fit transition-all duration-300 shadow-md"
                          style={{ backgroundColor: TEXT_DARK, color: '#fdf6f0' }}>
                          {s.cta} <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[8px] sm:text-[11px]" />
                        </button>
                      )}
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}

          {/* Ghost card — More Services */}
          <motion.div variants={fadeUp}>
            <motion.div whileHover={{ y: -6 }}
              className="h-[250px] sm:h-[380px] rounded-2xl border-2 border-dashed border-[#C9956C]/50 hover:border-white flex flex-col items-center justify-center gap-3 sm:gap-5 group transition-all duration-300"
              style={{ backgroundColor: '#fde8d8' }}>
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: 'rgba(201,149,108,0.2)', border: '1px solid #C9956C' }}>
                <span className="font-display text-sm sm:text-2xl font-black leading-none" style={{ color: '#3b1a08' }}>+</span>
              </motion.div>
              <div className="text-center px-2 sm:px-8">
                <p className="font-display font-bold text-xs sm:text-lg transition-colors" style={{ color: '#3b1a08' }}>More Services</p>
                <p className="text-[9px] sm:text-sm mt-0.5 sm:mt-1 leading-normal sm:leading-relaxed line-clamp-2 sm:line-clamp-none font-medium" style={{ color: '#7a4520' }}>
                  Custom solutions for any business need
                </p>
              </div>
              <button onClick={() => setShowModal(true)}
                className="font-display text-[9px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase hover:underline"
                style={{ color: '#C9956C' }}>
                Get in touch →
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
