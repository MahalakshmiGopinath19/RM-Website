'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform, useInView } from 'framer-motion';
import { FaHeartbeat, FaSpa, FaTshirt, FaGraduationCap, FaBuilding, FaUtensils, FaShoppingCart, FaCar, FaLaptopCode, FaPlus, FaCheckCircle, FaChevronRight, FaPaperPlane } from 'react-icons/fa';

import ServiceSlider from '@/components/services/ServiceSlider';
import OnlinePresence from '@/components/services/OnlinePresence';

/* ── Ambient layers ───────────────────────────────────────── */
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
    glow.style.background = `radial-gradient(480px circle at ${x}% ${y}%, rgba(255,137,118,0.12), transparent 55%)`;
  };
  const onMouseLeave = () => { if (glowRef.current) glowRef.current.style.background = 'transparent'; };
  return { containerRef, glowRef, onMouseMove, onMouseLeave };
}

/* ── Section bridge ───────────────────────────────────────── */
function SectionBridge() {
  const line = 'bg-slate-200';
  return (
    <div className={`flex justify-center py-5 bg-white`}>
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }} className="flex flex-col items-center gap-1">
        <div className={`w-px h-7 ${line}`} />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#C9956C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
          ctx.strokeStyle = `rgba(255,137,118,${(1 - d / 120) * 0.12})`; ctx.lineWidth = 1; ctx.stroke();
        }
      }
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,137,118,0.4)'; ctx.fill(); });
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

/* ── Service Modal ── */
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto py-8" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="bg-darkPanel rounded-2xl w-full max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/10"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-[#030218] p-6 md:p-8 relative overflow-hidden border-r border-white/5">
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,137,118,0.15) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}
              className="relative z-10 w-full h-44 md:h-52 rounded-xl overflow-hidden shadow-lg border border-white/10">
              <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </motion.div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mt-5 mb-2 relative z-10">{service.title}</h3>
            <p className="text-[#acabcb] text-sm leading-relaxed relative z-10">{service.desc}</p>
          </div>
          <div className="md:w-1/2 p-6 md:p-8 rounded-b-2xl md:rounded-r-2xl md:rounded-l-none bg-darkPanel">
            <h4 className="font-display text-lg font-bold text-white mb-1">Get a Free Consult</h4>
            <p className="text-[#acabcb]/70 text-xs mb-4">We reply on WhatsApp in minutes.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" value={service.title} readOnly className="w-full p-2.5 bg-[#030218] border border-white/10 rounded-xl text-[#acabcb] text-sm font-display focus:outline-none" />
              <input type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} className="w-full p-2.5 bg-[#030218] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-peachAccent text-sm transition-colors" />
              <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} className="w-full p-2.5 bg-[#030218] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-peachAccent text-sm transition-colors" />
              <textarea name="message" placeholder="Requirements / Message" rows={3} required value={form.message} onChange={handleChange} className="w-full p-2.5 bg-[#030218] border border-white/10 rounded-xl text-white placeholder-white/20 resize-none focus:outline-none focus:border-peachAccent text-sm transition-colors" />
              <Magnetic strength={0.15}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                  className="w-full bg-[#25D366] hover:bg-green-600 text-darkBg font-display font-extrabold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg text-sm">
                  Send on WhatsApp
                </motion.button>
              </Magnetic>
            </form>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#acabcb] hover:text-white transition-colors font-bold text-sm z-10">✕</button>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const heroSpot = useSpotlight();
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

  const openModal = useCallback((service: any) => { setSelectedService(service); setModalOpen(true); }, []);

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

      {/* HERO */}
      <div ref={heroRef} className="relative bg-gradient-to-b from-[#020215] to-[#030218] pt-10 md:pt-14 lg:pt-16 pb-12 md:pb-16 overflow-hidden"
        onMouseMove={heroSpot.onMouseMove} onMouseLeave={heroSpot.onMouseLeave}>
        <div ref={heroSpot.containerRef} className="absolute inset-0">
          <PulseCanvas />
          <div ref={heroSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
        </div>
        <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <div className="w-[420px] h-[420px] border border-white/5 rounded-full animate-spinSlow" />
          <div className="absolute inset-[60px] border border-white/5 rounded-full animate-[spinSlowRev_26s_linear_infinite]" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            initial="hidden" 
            animate={heroInView ? 'visible' : 'hidden'} 
            variants={stagger}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column — Text Content */}
            <div className="lg:col-span-6 text-center lg:text-left order-1">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold">
                <span className="w-2 h-2 bg-peachAccent rounded-full animate-pulse"></span>
                AI‑Integrated Digital Marketing Agency
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-display text-white font-black leading-[0.98] mb-4" style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
                Provide the best service with <span className="text-gradient-peach">out‑of‑the‑box AI‑powered</span> ideas
              </motion.h1>
              <motion.div variants={fadeUp} className="w-full max-w-2xl mx-auto lg:mx-0">
                <p className="text-[#acabcb]/85 text-base md:text-lg leading-relaxed font-medium">
                  We are a passionate team of AI-integrated digital marketing experts dedicated to helping businesses succeed in the digital world. With years of experience and a deep understanding of the ever-evolving online landscape, we stay at the forefront of AI‑integrated trends and technologies.
                </p>
              </motion.div>
            </div>

            {/* Right Column — Mascot Innovation Image (Big Size) */}
            <motion.div variants={fadeUp} className="lg:col-span-6 flex justify-center lg:justify-end order-2 overflow-visible">
              <motion.img
                src="/image/mascot_innovation.png"
                alt="Vaave Digital Mascot Innovation"
                className="w-[420px] sm:w-[560px] md:w-[700px] lg:w-[860px] xl:w-[980px] 2xl:w-[1080px] h-auto object-contain drop-shadow-[0_25px_60px_rgba(201,149,108,0.4)] select-none lg:-mr-16 xl:-mr-24"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ServiceSlider openModal={openModal} />

      <OnlinePresence openModal={openModal} />

      {/* BRIGHT IDEAS */}
      <div className="bg-[#050720] pt-28 pb-24 relative overflow-hidden border-t border-b border-white/5">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-stretch gap-8 lg:gap-12">
            
            {/* Left Content Column inside a White Card */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }} 
              className="md:w-1/2 w-full bg-white rounded-3xl p-8 md:p-12 lg:p-14 shadow-2xl border border-slate-100 flex flex-col justify-center"
            >
              <span className="inline-block font-display text-[#050720]/80 text-xs tracking-[0.35em] uppercase font-extrabold mb-3">Advanced Local & Global SEO</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[46px] font-black text-[#050720] leading-[1.12] mb-6 tracking-tight">Ideas That Actually <span className="bg-gradient-to-r from-[#C9956C] to-[#a86538] bg-clip-text text-transparent">Rank</span></h2>
              <div className="space-y-3.5">
                {[
                  'Result-oriented strategy, tech-enabled',
                  'Smarter targeting, faster acquisition',
                  'Affordable, transparent pricing',
                  "Chennai's top-rated local SEO team"
                ].map((text, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, x: 4, backgroundColor: '#090a2a' }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className="flex items-center gap-4 bg-[#020215] border border-white/10 p-4 rounded-xl transition-all duration-200 cursor-default shadow-md group"
                  >
                    <span className="w-6 h-6 bg-white/10 group-hover:bg-[#C9956C] rounded-full flex items-center justify-center text-[#C9956C] group-hover:text-[#020215] text-xs font-bold flex-shrink-0 transition-colors duration-200">✓</span>
                    <span className="text-white font-semibold text-sm md:text-base transition-colors duration-200">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image Column (No Card Wrapper, matching same height and positioned right) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }} 
              className="md:w-1/2 w-full flex items-center justify-end"
            >
              <div className="w-full h-full min-h-[400px] md:min-h-full flex items-center justify-center md:justify-end relative">
                <Image 
                  src="/image/thinking.png" 
                  alt="SEO ideas that rank" 
                  width={800} 
                  height={800} 
                  className="w-full h-full object-contain object-center md:object-right select-none max-h-[580px] scale-110 md:scale-115 -translate-y-6 md:-translate-y-8 transition-transform duration-300" 
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div id="cta" ref={ctaSpot.containerRef} onMouseMove={ctaSpot.onMouseMove} onMouseLeave={ctaSpot.onMouseLeave}
        className="relative overflow-hidden bg-gradient-rosegold py-24 border-t border-slate-100">
        <div ref={ctaSpot.glowRef} className="absolute inset-0 pointer-events-none transition-all duration-200" />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(5,7,32,0.15) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-[#050720]/10 animate-spinSlow" />
          <div className="absolute w-[420px] h-[420px] rounded-full border border-[#050720]/10 animate-[spinSlowRev_26s_linear_infinite]" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <h3 className="font-display text-3xl md:text-5xl font-black text-[#050720] mb-3">Let's Grow Your Business</h3>
            <p className="text-[#334155] text-sm md:text-base mb-10 max-w-md mx-auto font-bold">Free consultation with our Chennai team — no strings attached.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic strength={0.22}>
                <motion.a href="https://wa.me/917305821333" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                  className="bg-[#050720] hover:bg-[#0c0f3d] text-white px-8 py-4 rounded-full font-display font-extrabold shadow-xl inline-flex items-center justify-center gap-2 text-base transition-colors duration-300">
                  <FaPaperPlane size={12} />
                  WhatsApp Us
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <motion.a href="/contact" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                  className="bg-white border border-[#050720]/10 hover:bg-slate-50 text-[#050720] px-8 py-4 rounded-full font-display font-extrabold shadow-xl inline-flex items-center justify-center gap-2 text-base transition-colors duration-300">
                  Contact Us
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg p-3 rounded-full shadow-xl z-40 transition-colors text-base font-display font-bold">↑</motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && <ServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} service={selectedService} onSubmit={handleWhatsAppSubmit} />}
      </AnimatePresence>
    </div>
  );
}
