'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaChevronRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } }
};

/* ── Spotlight Glow ── */
function useSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current; const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(480px circle at ${x}% ${y}%, rgba(255,137,118,0.12), transparent 55%)`;
  };
  const onMouseLeave = () => { if (glowRef.current) glowRef.current.style.background = 'transparent'; };
  return { containerRef, glowRef, onMouseMove, onMouseLeave };
}

/* ── 3D tilt wrapper ── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 22 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22 });
  return (
    <motion.div ref={ref}
      onMouseMove={e => {
        const rect = ref.current!.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        ry.set((px - 0.5) * 12); rx.set(-(py - 0.5) * 12);
        if (glareRef.current) glareRef.current.style.background = `radial-gradient(220px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.15), transparent 60%)`;
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); if (glareRef.current) glareRef.current.style.background = 'transparent'; }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`relative ${className}`}>
      {children}
      <div ref={glareRef} className="absolute inset-0 rounded-3xl pointer-events-none transition-[background] duration-150" />
    </motion.div>
  );
}

/* ── Magnetic CTA wrapper ── */
function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 12, mass: 0.4 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={e => {
        const r = ref.current; if (!r) return;
        const rect = r.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

const itServices = [
  { title: 'Custom Web Development', image: '/image/it-1.webp', desc: 'Fast sites with smart search performance and integrations.' },
  { title: 'Custom Mobile App Development', image: '/image/it-2.webp', desc: 'Personalized, responsive apps that feel effortless.' },
];

interface OnlinePresenceProps {
  openModal: (service: any) => void;
}

export default function OnlinePresence({ openModal }: OnlinePresenceProps) {
  const itSpot = useSpotlight();

  return (
    <>
      {/* IT & Development Section */}
      <div ref={itSpot.containerRef} onMouseMove={itSpot.onMouseMove} onMouseLeave={itSpot.onMouseLeave}
        className="bg-white pt-8 md:pt-12 pb-16 md:pb-20 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute right-6 top-10 font-display font-black leading-none select-none pointer-events-none text-[#050720]/25"
          style={{ fontSize: 'clamp(6rem,12vw,12rem)' }}>02</div>
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(201,149,108,0.15) 1.5px, transparent 1.5px)', backgroundSize: '38px 38px' }} />
        <div ref={itSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
        <div className="absolute left-[-160px] bottom-[-160px] pointer-events-none hidden md:block">
          <div className="w-[440px] h-[440px] border border-slate-200 rounded-full animate-spinSlow" />
        </div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-block font-display text-[#050720] text-xs tracking-[0.35em] uppercase font-extrabold mb-3">IT & Development</motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl lg:text-[50px] font-black tracking-tight bg-gradient-to-r from-[#a86538] via-[#C9956C] to-[#e8c3b5] bg-clip-text text-transparent">Built With Modern Technology & Strategy</motion.h2>
            <motion.div variants={fadeUp} className="w-16 h-1.5 bg-gradient-to-r from-[#C9956C] to-[#a86538] mx-auto mt-5 rounded-full" />
          </motion.div>
          
          <Swiper modules={[Autoplay, Pagination]} spaceBetween={40} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 } }}
            autoplay={{ delay: 3500, disableOnInteraction: false }} pagination={{ clickable: true }} className="!pb-14 it-swiper">
            {itServices.map((service, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <TiltCard>
                  <div className="group bg-[#050720] rounded-3xl overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col" onClick={() => openModal(service)}>
                    <div className="relative w-full h-52 bg-gray-900 overflow-hidden">
                      <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#C9956C] transition-colors">{service.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                      <div className="inline-flex items-center text-[#C9956C] font-display font-extrabold text-xs uppercase tracking-widest gap-2 w-fit group-hover:underline">
                        Learn More <FaChevronRight className="text-[9px]" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
