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

const marketingServices = [
  { title: 'Social Media Marketing', image: '/image/oms-1.webp', desc: 'Data-driven content and social campaigns that turn followers into loyal customers.' },
  { title: 'Branding', image: '/image/bcd.webp', desc: 'Strategic brand identity, visual guidelines, positioning and logo design.' },
  { title: 'Creative Designing', image: '/image/Hero-Stack.webp', desc: 'Eye-catching graphic assets, banners and high-converting marketing collateral.' },
  { title: 'Video Editing', image: '/image/v_edit.webp', desc: 'Professional short-form reels, promos & long-form video storytelling.' },
  { title: 'Google My Business', image: '/image/gmb.webp', desc: 'Local map pack optimization, reviews strategy & local customer acquisition.' },
  { title: 'Google Ads', image: '/image/oms-3.webp', desc: 'Targeted Search, Display & Shopping PPC campaigns with maximum ROI.' },
  { title: 'Meta Ads', image: '/image/meta.jpg', desc: 'Precision Facebook & Instagram ad funnels engineered for scale.' },
  { title: 'SEO', image: '/image/seo.webp', desc: 'Organic search engine optimization, technical audits & top keyword rankings.' },
  { title: 'AEO', image: '/image/aeo.jpg', desc: 'Answer Engine Optimization for voice search, Siri, Alexa & featured snippets.' },
  { title: 'GEO', image: '/image/geo.webp', desc: 'Generative Engine Optimization to get recommendations in ChatGPT, Perplexity & Gemini.' },
];

interface ServiceSliderProps {
  openModal: (service: any) => void;
}

export default function ServiceSlider({ openModal }: ServiceSliderProps) {
  return (
    <div id="marketing-slider" className="bg-white pt-14 md:pt-20 pb-6 md:pb-8 relative overflow-hidden border-b border-slate-100">
      <div className="absolute right-6 top-10 font-display font-black leading-none select-none pointer-events-none text-[#050720]/25"
        style={{ fontSize: 'clamp(6rem,12vw,12rem)' }}>01</div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.span variants={fadeUp} className="inline-block font-display text-[#050720] text-xs tracking-[0.35em] uppercase font-extrabold mb-3">Marketing</motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl lg:text-[50px] font-black tracking-tight bg-gradient-to-r from-[#a86538] via-[#C9956C] to-[#e8c3b5] bg-clip-text text-transparent">Results-Driven Marketing</motion.h2>
          <motion.div variants={fadeUp} className="w-14 h-1 bg-gradient-to-r from-[#C9956C] to-[#a86538] mx-auto mt-4 rounded-full" />
        </motion.div>

        <Swiper modules={[Autoplay, Pagination]} spaceBetween={20} slidesPerView={1}
          breakpoints={{ 480: { slidesPerView: 1.2, spaceBetween: 16 }, 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 30 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }} pagination={{ clickable: true }} className="pb-10" speed={800}>
          {marketingServices.map((service, idx) => (
            <SwiperSlide key={idx}>
              <TiltCard>
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="group bg-[#050720] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-800 h-full"
                  onClick={() => openModal(service)}>
                  <div className="relative w-full h-44 md:h-56 bg-gray-900 overflow-hidden">
                    <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-base md:text-lg font-bold text-white mb-2 transition-colors group-hover:text-[#C9956C]">{service.title}</h3>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{service.desc}</p>
                    <button className="mt-4 text-[#C9956C] font-display font-extrabold text-xs inline-flex items-center gap-1.5 uppercase tracking-wider group-hover:underline">
                      Learn More <FaChevronRight className="text-[9px]" />
                    </button>
                  </div>
                </motion.div>
              </TiltCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
