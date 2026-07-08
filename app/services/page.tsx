// app/services/page.tsx - v3: refined UI + richer motion
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

/* ══════════════════════════════════════════════════════════
   PALETTE — Navy #0A0930 · Gold #E0A36A · Gold-D #9C5B5A
   Gold-L #EFD3C9 · Teal #E0A36A · Cream #FDFBF8
══════════════════════════════════════════════════════════ */

/* ── Ambient layers ───────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div aria-hidden className="fixed inset-0 z-[999] pointer-events-none opacity-[0.035] mix-blend-overlay"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000] bg-gradient-to-r from-[#9C5B5A] via-[#E0A36A] to-[#EFD3C9]" />;
}

/* ── Magnetic CTA wrapper ─────────────────────────────────── */
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

/* ── Cursor spotlight ─────────────────────────────────────── */
function useSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current; const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(480px circle at ${x}% ${y}%, rgba(217,159,154,0.16), transparent 55%)`;
  };
  const onMouseLeave = () => { if (glowRef.current) glowRef.current.style.background = 'transparent'; };
  return { containerRef, glowRef, onMouseMove, onMouseLeave };
}

/* ── 3D tilt wrapper ──────────────────────────────────────── */
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
        if (glareRef.current) glareRef.current.style.background = `radial-gradient(220px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 60%)`;
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); if (glareRef.current) glareRef.current.style.background = 'transparent'; }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`relative ${className}`}>
      {children}
      <div ref={glareRef} className="absolute inset-0 rounded-3xl pointer-events-none transition-[background] duration-150" />
    </motion.div>
  );
}

/* ── Count-up stat ─────────────────────────────────────────── */
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, { duration: 1.5, ease: 'easeOut', onUpdate: v => setN(Math.floor(v)) });
    return ctrl.stop;
  }, [inView, end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ── Section bridge ───────────────────────────────────────── */
function SectionBridge({ dark = false, bgClass = '' }: { dark?: boolean; bgClass?: string }) {
  const bg = bgClass || (dark ? 'bg-[#FDFBF8]' : 'bg-[#0A0930]');
  const line = dark ? 'bg-gray-300' : 'bg-white/10';
  return (
    <div className={`flex justify-center py-5 ${bg}`}>
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }} className="flex flex-col items-center gap-1">
        <div className={`w-px h-7 ${line}`} />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#E0A36A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </motion.div>
    </div>
  );
}

/* ── Minimal drifting-node canvas for the hero ───────────── */
function PulseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const N = 32;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, r: Math.random() * 1.4 + 0.7,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        if (!reduced) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(217,159,154,${(1 - d / 120) * 0.16})`; ctx.lineWidth = 1; ctx.stroke();
        }
      }
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(240,201,160,0.55)'; ctx.fill(); });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ── Variants ─────────────────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

/* ══════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════ */
function ServiceModal({ isOpen, onClose, service, onSubmit }: any) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  if (!isOpen) return null;
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(service.title, form.name, form.phone, form.message);
    onClose(); setForm({ name: '', phone: '', message: '' });
  }, [form, service, onSubmit, onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="bg-white rounded-2xl w-full max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-[#0A0930] p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(217,159,154,0.10) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}
              className="relative w-full h-44 md:h-52 rounded-xl overflow-hidden shadow-lg">
              <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </motion.div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-[#EFD3C9] mt-5 mb-2 relative z-10">{service.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed relative z-10">{service.desc}</p>
          </div>
          <div className="md:w-1/2 bg-[#FDFBF8] p-6 md:p-8 rounded-b-2xl md:rounded-r-2xl md:rounded-l-none">
            <h4 className="font-display text-lg font-bold text-[#0A0930] mb-1">Get a Free Consult</h4>
            <p className="text-gray-500 text-xs mb-4">We reply on WhatsApp in minutes.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" value={service.title} readOnly className="w-full p-2.5 bg-white border-2 border-gray-100 rounded-xl text-gray-600 text-sm font-display" />
              <input type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} className="w-full p-2.5 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#E0A36A] text-sm placeholder:text-gray-400 bg-white transition-colors" />
              <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} className="w-full p-2.5 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#E0A36A] text-sm placeholder:text-gray-400 bg-white transition-colors" />
              <textarea name="message" placeholder="Requirements" rows={3} required value={form.message} onChange={handleChange} className="w-full p-2.5 border-2 border-gray-100 rounded-xl resize-none focus:outline-none focus:border-[#E0A36A] text-sm placeholder:text-gray-400 bg-white transition-colors" />
              <Magnetic strength={0.15}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                  className="w-full bg-[#25D366] hover:bg-green-600 text-white font-display font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg text-sm">
                  Send on WhatsApp
                </motion.button>
              </Magnetic>
            </form>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors font-bold text-sm z-10">✕</button>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const heroSpot = useSpotlight();
  const itSpot = useSpotlight();
  const ctaSpot = useSpotlight();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  useEffect(() => {
    let t: NodeJS.Timeout;
    const onScroll = () => { clearTimeout(t); t = setTimeout(() => setShowBackToTop(window.scrollY > 300), 100); };
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Services data with crisp copy
  const marketingServices = useMemo(() => [
    { title: 'Social Media Marketing', image: '/image/oms-1.webp', desc: 'Data-driven content that turns followers into customers.' },
    { title: 'SEO', image: '/image/oms-2.webp', desc: 'Advanced keyword research, expert execution — you rank #1.' },
    { title: 'Google Ads & PPC', image: '/image/oms-3.webp', desc: 'Smart bidding, hands-on management, real ROI.' },
    { title: 'Creative Content Marketing', image: '/image/oms-4.webp', desc: 'Blogs, ads, captions — fast, on-brand, human-polished.' },
  ], []);

  const itServices = useMemo(() => [
    { title: 'Custom Web Development', image: '/image/it-1.webp', desc: 'Fast sites with smart search performance and integrations.' },
    { title: 'Custom Mobile App Development', image: '/image/it-2.webp', desc: 'Personalized, responsive apps that feel effortless.' },
  ], []);

  const openModal = useCallback((service: any) => { setSelectedService(service); setModalOpen(true); }, []);

  const handleWhatsAppSubmit = useCallback((title: string, name: string, phone: string, message: string) => {
    const whatsappNumber = '917305821333';
    const fullMsg = `Hello Rainbow Media! I am interested in your service: *${title}*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Requirements:* ${message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMsg)}`, '_blank');
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overscroll-behavior: none; scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #fff; }
        .font-display { font-family: 'Syne', sans-serif; }
        .font-data { font-family: 'Space Grotesk', sans-serif; }

        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinSlowRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .animate-floatY { animation: floatY 5s ease-in-out infinite; }
        .animate-spinSlow { animation: spinSlow 20s linear infinite; }
        .animate-spinSlowRev { animation: spinSlowRev 26s linear infinite; }

        .glass { background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); }

        .sheen { position: relative; overflow: hidden; }
        .sheen::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 48%, transparent 66%); background-size: 200% 100%; opacity: 0; transition: opacity .25s; }
        .sheen:hover::before { opacity: 1; animation: shimmer 1s ease; }

        .underline-hover { position: relative; }
        .underline-hover::after { content:''; position:absolute; left:0; bottom:-2px; width:100%; height:2px; background:#E0A36A; transform:scaleX(0); transform-origin:right; transition:transform .3s ease; }
        .underline-hover:hover::after { transform:scaleX(1); transform-origin:left; }

        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .swiper-pagination-bullet { background: rgba(209,143,92,0.35); opacity: 1; width: 6px; height: 6px; transition: all 0.2s; }
        .swiper-pagination-bullet-active { background: #E0A36A; width: 20px; border-radius: 3px; }
        .it-swiper .swiper-pagination-bullet { background: rgba(240,201,160,0.3); }
        .it-swiper .swiper-pagination-bullet-active { background: #EFD3C9; }
        @media (min-width: 768px) { .swiper-pagination-bullet { width: 8px; height: 8px; } .swiper-pagination-bullet-active { width: 24px; } }

        @media (prefers-reduced-motion: reduce) {
          .animate-floatY, .animate-spinSlow, .animate-spinSlowRev { animation: none !important; }
        }
      `}</style>

      <ScrollProgressBar />
      <GrainOverlay />

      <div className="bg-[#FDFBF8]" ref={containerRef}>

        {/* ══════════════════════════════════════════════
            HERO — refined with better typography & glow
        ══════════════════════════════════════════════ */}
        <div ref={heroRef} className="relative bg-gradient-to-b from-[#0A0930] to-[#12103D] pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden"
          onMouseMove={heroSpot.onMouseMove} onMouseLeave={heroSpot.onMouseLeave}>
          <div ref={heroSpot.containerRef} className="absolute inset-0">
            <PulseCanvas />
            <div ref={heroSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
          </div>
          <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
            <div className="w-[420px] h-[420px] border border-[#EFD3C9]/10 rounded-full animate-spinSlow" />
            <div className="absolute inset-[60px] border border-[#EFD3C9]/10 rounded-full animate-spinSlowRev" />
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 text-center relative z-10">
            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={stagger}>
              {/* <motion.span variants={fadeUp} className="inline-flex items-center gap-2 glass text-white/85 text-xs font-display font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-[#E0A36A] opacity-60" />
                  <span className="relative rounded-full h-2 w-2 bg-[#E0A36A]" />
                </span>
                Next-Gen Digital Marketing & Dev Studio
              </motion.span> */}

              <motion.h1 variants={fadeUp}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.03] max-w-3xl mx-auto"
                style={{ textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
                Chennai's Most Trusted{' '}
                <span className="bg-gradient-to-r from-[#F6C9AE] via-[#E8875A] to-[#9C5B5A] bg-clip-text text-transparent">Digital Experts</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg max-w-lg mx-auto mt-5 font-light">
                Next-gen marketing and IT solutions, powered by tech, delivered by experts.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Magnetic>
                  <motion.a href="#marketing-slider" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                    className="sheen inline-block bg-white text-[#9C5B5A] px-7 py-3.5 rounded-full font-display font-bold shadow-2xl shadow-black/40 text-sm md:text-base">
                    Explore Services →
                  </motion.a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <motion.a href="#cta" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                    className="inline-block border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-7 py-3.5 rounded-full font-display font-bold text-sm md:text-base transition-all">
                    Get Free Consult
                  </motion.a>
                </Magnetic>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════
            MARKETING SLIDER — enhanced with better cards
        ══════════════════════════════════════════════ */}
        <div id="marketing-slider" className="bg-[#FDFBF8] py-14 md:py-20 relative overflow-hidden">
          <div className="absolute right-6 top-10 font-display font-black leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(6rem,12vw,12rem)', color: 'rgba(10,10,41,0.04)' }}>01</div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
              <motion.span variants={fadeUp} className="inline-block font-display text-[#9C5B5A] text-xs tracking-[0.35em] uppercase font-bold mb-3">Marketing</motion.span>
              <motion.h2 variants={fadeUp} className="font-display text-2xl md:text-4xl font-extrabold text-[#0A0930]">Results-Driven Marketing</motion.h2>
              <motion.div variants={fadeUp} className="w-14 h-1 bg-[#E0A36A] mx-auto mt-4 rounded-full" />
            </motion.div>
            <Swiper modules={[Autoplay, Pagination]} spaceBetween={20} slidesPerView={1}
              breakpoints={{ 480: { slidesPerView: 1.2, spaceBetween: 16 }, 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 30 } }}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }} pagination={{ clickable: true }} className="pb-10" speed={800}>
              {marketingServices.map((service, idx) => (
                <SwiperSlide key={idx}>
                  <TiltCard>
                    <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-100 h-full"
                      onClick={() => openModal(service)}>
                      <div className="relative w-full h-44 md:h-56 bg-gray-100 overflow-hidden">
                        <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-base md:text-lg font-bold text-[#0A0930] mb-1.5 line-clamp-2">{service.title}</h3>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{service.desc}</p>
                        <button className="underline-hover mt-3 text-[#9C5B5A] font-display font-bold text-xs inline-flex items-center gap-1 uppercase tracking-wider">
                          Learn More <span>→</span>
                        </button>
                      </div>
                    </motion.div>
                  </TiltCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <SectionBridge />

        {/* ══════════════════════════════════════════════
            IT SLIDER — enhanced with better visuals
        ══════════════════════════════════════════════ */}
        <div ref={itSpot.containerRef} onMouseMove={itSpot.onMouseMove} onMouseLeave={itSpot.onMouseLeave}
          className="bg-[#0A0930] py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(217,159,154,0.10) 1.5px, transparent 1.5px)', backgroundSize: '38px 38px' }} />
          <div ref={itSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
          <div className="absolute left-[-160px] bottom-[-160px] pointer-events-none hidden md:block">
            <div className="w-[440px] h-[440px] border border-[#EFD3C9]/10 rounded-full animate-spinSlow" />
          </div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
              <motion.span variants={fadeUp} className="inline-block font-display text-[#E0A36A] text-xs tracking-[0.35em] uppercase font-bold mb-3">IT & Development</motion.span>
              <motion.h2 variants={fadeUp} className="font-display text-2xl md:text-4xl font-black text-white">Built With Modern Technology & Strategy</motion.h2>
              <motion.div variants={fadeUp} className="w-16 h-1.5 bg-[#E0A36A] mx-auto mt-5 rounded-full" />
            </motion.div>
            <Swiper modules={[Autoplay, Pagination]} spaceBetween={40} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 } }}
              autoplay={{ delay: 3500, disableOnInteraction: false }} pagination={{ clickable: true }} className="!pb-14 it-swiper">
              {itServices.map((service, idx) => (
                <SwiperSlide key={idx} className="h-auto">
                  <TiltCard>
                    <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-shadow duration-500 cursor-pointer border border-white/10 h-full flex flex-col" onClick={() => openModal(service)}>
                      <div className="relative w-full h-52 bg-gray-50 overflow-hidden">
                        <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-7 flex flex-col flex-1">
                        <h3 className="font-display text-xl font-bold text-[#0A0930] mb-2 group-hover:text-[#9C5B5A] transition-colors">{service.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                        <div className="underline-hover inline-flex items-center text-[#9C5B5A] font-display font-bold text-xs uppercase tracking-widest gap-2 w-fit">Learn More <span>→</span></div>
                      </div>
                    </div>
                  </TiltCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            ONLINE PRESENCE — refined layout
        ══════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-[#E0A36A] to-[#9C5B5A] text-white py-14 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:w-1/2 w-full">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image src="/image/op-1.webp" alt="Online Presence" width={800} height={600} className="w-full h-auto" loading="lazy" />
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:w-1/2 w-full text-center md:text-left">
                <h2 className="font-display text-2xl md:text-4xl font-extrabold">Grow Your Global Presence</h2>
                <p className="mt-3 text-white/90 text-sm md:text-base leading-relaxed">Trusted by hundreds of D2C brands and local businesses across Chennai and beyond.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-6">
                  <Image src="/image/op_rev.webp" alt="5 stars" width={140} height={28} className="w-28 md:w-32 h-auto" loading="lazy" />
                  <Magnetic strength={0.2}>
                    <motion.a href="#marketing-slider" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="bg-white text-[#9C5B5A] px-6 py-2.5 rounded-full font-display font-bold shadow-lg text-sm inline-block">Partner With Us</motion.a>
                  </Magnetic>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            BRIGHT IDEAS — enhanced with better visuals
        ══════════════════════════════════════════════ */}
        <div className="bg-[#FDFBF8] py-14 md:py-20 relative overflow-hidden">
          <div className="absolute left-6 bottom-6 font-display font-black leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(6rem,12vw,12rem)', color: 'rgba(10,10,41,0.04)' }}>02</div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:w-1/2 w-full">
                <span className="inline-block font-display text-[#9C5B5A] text-xs tracking-[0.35em] uppercase font-bold mb-4">Advanced Local & Global SEO</span>
                <h2 className="font-display text-2xl md:text-4xl font-extrabold text-[#0A0930] leading-tight">Ideas That Actually Rank</h2>
                <ul className="mt-6 space-y-2.5">
                  {['Result-oriented strategy, tech-enabled', 'Smarter targeting, faster acquisition', 'Affordable, transparent pricing', "Chennai's top-rated local SEO team"].map((text, idx) => (
                    <motion.li key={idx} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07, duration: 0.4 }}
                      className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                      <span className="w-5 h-5 bg-[#E0A36A]/10 rounded-full flex items-center justify-center text-[#9C5B5A] text-xs font-bold mt-0.5 flex-shrink-0">✓</span>
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:w-1/2 w-full">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <Image src="/image/mb.webp" alt="Make bright ideas happen" width={800} height={600} className="w-full h-auto" loading="lazy" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <SectionBridge />

        {/* ══════════════════════════════════════════════
            FINAL CTA — enhanced with better motion
        ══════════════════════════════════════════════ */}
        <div id="cta" ref={ctaSpot.containerRef} onMouseMove={ctaSpot.onMouseMove} onMouseLeave={ctaSpot.onMouseLeave}
          className="relative overflow-hidden bg-[#0A0930] py-16 md:py-20">
          <div ref={ctaSpot.glowRef} className="absolute inset-0 pointer-events-none transition-all duration-200" />
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full border border-white/5 animate-spinSlow" />
            <div className="absolute w-[420px] h-[420px] rounded-full border border-white/5 animate-spinSlowRev" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h3 variants={fadeUp} className="font-display text-2xl md:text-4xl font-black text-white mb-3">Let's Grow Your Business</motion.h3>
              <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base mb-8 max-w-md mx-auto font-light">Free consultation with our Chennai team — no strings attached.</motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic strength={0.22}>
                  <motion.a href="https://wa.me/917305821333" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                    className="bg-gradient-to-r from-[#25D366] to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-display font-bold shadow-xl inline-flex items-center justify-center gap-2 text-base">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.199-.347.223-.645.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.171-2.261.599.606-2.208-.147-.371a9.875 9.875 0 01-1.249-5.017c0-5.495 4.479-9.974 9.974-9.974 2.664 0 5.146 1.037 6.992 2.932 1.841 1.89 2.874 4.372 2.874 7.042-.003 5.495-4.482 9.974-9.977 9.974"/></svg>
                    WhatsApp Us
                  </motion.a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <motion.a href="#marketing-slider" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                    className="sheen bg-white text-[#0A0930] hover:bg-gray-50 px-8 py-4 rounded-full font-display font-bold shadow-xl inline-flex items-center justify-center gap-2 text-base">
                    View Services →
                  </motion.a>
                </Magnetic>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-[#E0A36A] text-white p-2.5 md:p-3.5 rounded-full shadow-xl z-40 hover:bg-[#9C5B5A] transition-colors text-sm md:text-base">↑</motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && <ServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} service={selectedService} onSubmit={handleWhatsAppSubmit} />}
      </AnimatePresence>
    </>
  );
}
