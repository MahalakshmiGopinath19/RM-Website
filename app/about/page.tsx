// app/about/page.tsx – Restyled to match the Vaave Digital brand system (services/career pages)
// Content, data, and component logic are unchanged.
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, Variants, useMotionValue, useSpring } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaPlus, FaMinus, FaChartLine, FaRocket, FaGlobe, FaChevronDown, FaArrowRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';

/* ══════════════════════════════════════════════════════════
   VAAVE DIGITAL — BRAND PALETTE (shared with services/career pages)
   Navy #0A0930   Navy-Deep #12103D   Gold #D18F5C
   Gold-D #B8714A   Gold-L #F0C9A0   Cream #FDFBF8
══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════════════ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ══════════════════════════════════════════════════════════
   GLOBAL POLISH LAYERS — grain + scroll progress
══════════════════════════════════════════════════════════ */
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
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000] bg-gradient-to-r from-[#B8714A] via-[#D18F5C] to-[#F0C9A0]"
    />
  );
}

/* ══════════════════════════════════════════════════════════
   MAGNETIC WRAPPER — for primary CTAs
══════════════════════════════════════════════════════════ */
function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 12, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={e => {
        const r = ref.current;
        if (!r) return;
        const rect = r.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   3D TILT CARD — with light-glare sweep
══════════════════════════════════════════════════════════ */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 22 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={e => {
        const rect = ref.current!.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        ry.set((px - 0.5) * 10);
        rx.set(-(py - 0.5) * 10);
        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(220px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.2), transparent 60%)`;
        }
      }}
      onMouseLeave={() => {
        rx.set(0); ry.set(0);
        if (glareRef.current) glareRef.current.style.background = 'transparent';
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      <div ref={glareRef} className="absolute inset-0 rounded-2xl pointer-events-none transition-[background] duration-150" />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION BRIDGE (arrow connector between sections)
══════════════════════════════════════════════════════════ */
function SectionBridge({ dark = false, bgClass = '' }: { dark?: boolean; bgClass?: string }) {
  const bg = bgClass || (dark ? 'bg-[#FDFBF8]' : 'bg-[#0A0930]');
  const line = dark ? 'bg-gray-300' : 'bg-white/10';
  return (
    <div className={`flex justify-center py-6 ${bg}`}>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1"
      >
        <div className={`w-px h-8 ${line}`} />
        <FaChevronDown size={12} className="text-[#D18F5C]" />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SIGNATURE HERO CANVAS — "Neural Constellation" (shared signature)
══════════════════════════════════════════════════════════ */
function NeuralHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const NODE_COUNT = 40;
    const LINK_DIST = 130;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.8,
    }));

    let plane = { active: false, from: 0, to: 0, t: 0, speed: 0.005 };
    let planeTimer: ReturnType<typeof setTimeout>;
    const launchPlane = () => {
      const from = Math.floor(Math.random() * NODE_COUNT);
      let to = Math.floor(Math.random() * NODE_COUNT);
      if (to === from) to = (to + 1) % NODE_COUNT;
      plane = { active: true, from, to, t: 0, speed: 0.004 + Math.random() * 0.003 };
    };
    planeTimer = setTimeout(launchPlane, 1200);

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 0.008;

      nodes.forEach(n => {
        if (!reduced) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const mDist = Math.min(
              Math.hypot(a.x - mouseRef.current.x, a.y - mouseRef.current.y),
              Math.hypot(b.x - mouseRef.current.x, b.y - mouseRef.current.y)
            );
            const near = Math.max(0, 1 - mDist / 220);
            const op = (1 - d / LINK_DIST) * (0.05 + near * 0.35);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = near > 0.3 ? `rgba(3,101,140,${op})` : `rgba(217,159,154,${op})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        const mDist = Math.hypot(n.x - mouseRef.current.x, n.y - mouseRef.current.y);
        const near = Math.max(0, 1 - mDist / 180);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = near > 0.4 ? 'rgba(3,101,140,0.9)' : 'rgba(217,159,154,0.55)';
        ctx.fill();
      });

      if (plane.active) {
        plane.t += plane.speed;
        const a = nodes[plane.from], b = nodes[plane.to];
        const mx = (a.x + b.x) / 2 - (b.y - a.y) * 0.18;
        const my = (a.y + b.y) / 2 + (b.x - a.x) * 0.18;
        const t = plane.t;
        const px = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * mx + t * t * b.x;
        const py = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * my + t * t * b.y;
        ctx.beginPath();
        ctx.arc(px, py, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = '#34D2C7';
        ctx.shadowColor = '#34D2C7';
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.shadowBlur = 0;
        if (t >= 1) {
          plane.active = false;
          planeTimer = setTimeout(launchPlane, 2200 + Math.random() * 2600);
        }
      }

      const blobPulse = Math.sin(tick * 0.9) * 0.04 + 0.08;
      const gBlob = ctx.createRadialGradient(80, canvas.height - 80, 0, 80, canvas.height - 80, 300);
      gBlob.addColorStop(0, `rgba(217,159,154,${blobPulse})`);
      gBlob.addColorStop(1, 'rgba(217,159,154,0)');
      ctx.fillStyle = gBlob;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(planeTimer);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ------------------------------------------------------------
// FAQ Accordion Item – same logic, brand-system styling
// ------------------------------------------------------------
function FAQItem({ question, answer, isOpen, onClick }: any) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex justify-between items-center text-left text-gray-800 font-display font-semibold text-base md:text-lg hover:text-[#D18F5C] transition group"
      >
        <span className="group-hover:text-[#D18F5C] transition pr-4">{question}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#D18F5C] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-[#FDFBF8] group-hover:text-[#D18F5C]'}`}>
          {isOpen ? <FaMinus className="text-sm" /> : <FaPlus className="text-sm" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------------------
// Main About Page — same data & handlers, brand-system styling
// ------------------------------------------------------------
export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // --- Data (unchanged) ---
  const industries = [
    { icon: '/image/beach_access.png', name: 'Beauty & Cosmetic' },
    { icon: '/image/restaurant_menu.png', name: 'Food & Beverages' },
    { icon: '/image/laundry.png', name: 'Fashion & Apparels' },
    { icon: '/image/add_home.png', name: 'Real Estate' },
  ];

  const journeyMilestones = [
    { year: '2015', desc: 'Founded with a passion for AI-driven digital innovation' },
    { year: '2020', desc: 'Expanded services globally with 100+ AI-powered campaigns' },
    { year: '2023', desc: 'Awarded Best AI-Integrated Digital Marketing Agency' },
  ];

  const faqs = [
    {
      question: 'What makes your digital marketing approach different?',
      answer: 'We combine data-driven insights with creative strategies to deliver measurable results. Every campaign is tailored to your business goals, audience, and industry – ensuring maximum impact and ROI.'
    },
    {
      question: 'How do you help businesses grow online?',
      answer: 'We build a comprehensive strategy that includes SEO, social media, content marketing, and paid advertising. Our team continuously optimises your campaigns to attract more visitors, convert leads, and scale your business.'
    },
    {
      question: 'What kind of results can I expect?',
      answer: 'Results vary based on your goals and industry. Typically, SEO and content marketing show steady growth over 3-6 months, while paid campaigns can deliver immediate traffic. We provide regular reports to track your progress.'
    },
    {
      question: 'How do you measure campaign success?',
      answer: 'We track key performance indicators like website traffic, conversion rates, lead generation, and ROI. Using real-time analytics, we refine strategies to ensure your marketing budget is always working effectively.'
    },
  ];

  const testimonials = [
    {
      name: 'Alan Baker',
      role: 'CEO of ABC Corp',
      quote: 'Rainbow Media transformed our online presence and tripled our lead generation in just 6 months. Their strategies gave us insights we never had before. Unmatched expertise!',
      icon: '/image/icon1.png',
    },
    {
      name: 'John',
      role: 'Marketing Director at GlobalTech',
      quote: 'The team at Rainbow Media helped us expand our brand globally. Their approach delivered measurable growth and made us a market leader in our sector.',
      icon: '/image/icon2.png',
    },
    {
      name: 'Emily',
      role: 'Owner of Luxe Fashion',
      quote: 'Rainbow Media’s social campaigns boosted our engagement by 200%. Their creative use of data turned our brand into a trendsetter. Outstanding work!',
      icon: '/image/icon3.png',
    },
  ];

  return (
    <>
      {/* ─── GLOBAL STYLES ─────────────────────────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overscroll-behavior: none; scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        .font-data    { font-family: 'Space Grotesk', sans-serif; }

        @keyframes spinSlow    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinSlowRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes shimmer     { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .animate-spinSlow    { animation: spinSlow 18s linear infinite; }
        .animate-spinSlowRev { animation: spinSlowRev 24s linear infinite; }

        .glass { background:rgba(255,255,255,0.08); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.15); }

        .sweep { position:relative; overflow:hidden; }
        .sweep::after { content:''; position:absolute; inset:0; border:2px solid #D18F5C; border-radius:inherit; opacity:0; transform:scale(0.95); transition:opacity .3s,transform .3s; }
        .sweep:hover::after { opacity:1; transform:scale(1); }

        .sheen { position:relative; overflow:hidden; }
        .sheen::before {
          content:''; position:absolute; inset:0; border-radius:inherit;
          background:linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 48%, transparent 66%);
          background-size:200% 100%; opacity:0; transition:opacity .25s;
        }
        .sheen:hover::before { opacity:1; animation: shimmer 1.1s ease; }

        .testimonial-swiper .swiper-slide {
          transition: all 0.4s ease;
          opacity: 0.5;
          transform: scale(0.92);
          filter: blur(2px);
        }
        .testimonial-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1.04);
          filter: blur(0);
          z-index: 10;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 {
          background-color: #B8714A;
          color: white;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 p,
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 h5,
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .text-gray-500,
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .text-gray-700 {
          color: white !important;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .border-gray-100 {
          border-color: rgba(255,255,255,0.2) !important;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .text-red-200 {
          color: rgba(255,255,255,0.4) !important;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .ring-\\[\\#D18F5C\\]\\/20 {
          ring-color: rgba(255,255,255,0.4) !important;
        }
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          color: #B8714A;
          background: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .testimonial-swiper .swiper-button-next:after,
        .testimonial-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .testimonial-swiper .swiper-slide-active { transform: scale(1.02); }
          .testimonial-swiper .swiper-slide { filter: blur(1px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spinSlow, .animate-spinSlowRev { animation: none !important; }
        }
      `}</style>

      <ScrollProgressBar />
      <GrainOverlay />

      <div className="bg-white min-h-screen">

        {/* ══════════════════════════════════════════════════
            HERO — Deep Navy + Neural Constellation signature
        ══════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative bg-gradient-to-b from-[#0A0930] to-[#12103D] overflow-hidden">
          <NeuralHeroCanvas />

          <div className="absolute right-[-140px] top-1/3 pointer-events-none">
            <div className="w-[420px] h-[420px] border border-[#F0C9A0]/10 rounded-full animate-spinSlow" />
            <div className="absolute inset-[60px] border border-[#F0C9A0]/10 rounded-full animate-spinSlowRev" />
          </div>

          <div className="absolute top-6 left-6 w-14 h-14 border-t-2 border-l-2 border-[#F0C9A0]/25 rounded-tl-lg" />
          <div className="absolute top-6 right-6 w-14 h-14 border-t-2 border-r-2 border-[#F0C9A0]/25 rounded-tr-lg" />

          <div className="container mx-auto px-6 lg:px-16 relative z-10 pt-20 md:pt-28 pb-20 md:pb-24">
            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={stagger}
              className="flex flex-col md:flex-row gap-10 items-start">
              <div className="md:w-7/12">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass text-white/80 text-sm font-display font-semibold px-4 py-1.5 rounded-full mb-6">
                  <span className="w-2 h-2 bg-[#D18F5C] rounded-full animate-pulse"></span>
                  AI-Powered Agency
                </motion.div>
                <motion.h2 variants={fadeUp} className="font-display text-white font-black leading-tight" style={{ fontSize: 'clamp(2rem,4.5vw,3.4rem)' }}>
                  Provide the best service with <span className="text-[#F0C9A0]">out‑of‑the‑box AI‑powered</span> ideas
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} className="md:w-5/12">
                <p className="text-white/75 text-base md:text-lg leading-relaxed font-light">
                  We are a passionate team of digital marketing enthusiasts dedicated to helping businesses succeed in the digital world. With years of experience and a deep understanding of the ever-evolving online landscape, we stay at the forefront of AI‑integrated trends and technologies.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <SectionBridge />

        {/* ══════════════════════════════════════════════════
            STATS & MISSION/VISION — Cream
        ══════════════════════════════════════════════════ */}
        <div className="bg-[#FDFBF8] py-16 md:py-20">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
              className="grid md:grid-cols-3 gap-6">
              {/* Stats card – gradient + decor */}
              <motion.div variants={fadeUp} className="md:col-span-2">
                <TiltCard>
                  <div className="bg-gradient-to-br from-[#D18F5C] to-[#B8714A] rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition relative overflow-hidden h-full">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Leverage digital advertising</h2>
                        <p className="text-white/90 mb-6">With over 3000+ brand audits & 100+ performance marketing strategies, we understand what it takes to make your brand good & scalable.</p>
                      </div>
                      <FaRocket className="text-4xl text-white/20 flex-shrink-0" />
                    </div>
                    <div className="relative z-10 flex gap-12">
                      <div><div className="font-data text-3xl md:text-4xl font-bold">500+</div><p className="text-white/80 text-sm font-display">Projects Completed</p></div>
                      <div><div className="font-data text-3xl md:text-4xl font-bold">100+</div><p className="text-white/80 text-sm font-display">Trusted Brands</p></div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Mission & Vision – redesigned with left border accent */}
              <div className="space-y-5">
                <motion.div variants={fadeUp} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-[#D18F5C]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FDFBF8] flex items-center justify-center text-[#D18F5C] flex-shrink-0 group-hover:bg-[#D18F5C] group-hover:text-white transition-all duration-300">
                      <FaChartLine className="text-lg" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-gray-900">Mission</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mt-1">Empower businesses through innovative AI‑integrated digital marketing strategies that foster growth, engagement, and success.</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-[#D18F5C]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FDFBF8] flex items-center justify-center text-[#D18F5C] flex-shrink-0 group-hover:bg-[#D18F5C] group-hover:text-white transition-all duration-300">
                      <FaGlobe className="text-lg" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-gray-900">Vision</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mt-1">A future where every business has the expertise to thrive in the digital world.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <SectionBridge dark />

        {/* ══════════════════════════════════════════════════
            INDUSTRIES — Navy w/ gold glow, glass strip
        ══════════════════════════════════════════════════ */}
        <div className="bg-[#0A0930] py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(217,159,154,0.1) 1.5px, transparent 1.5px)',
            backgroundSize: '36px 36px',
          }} />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={stagger}>
              <motion.h3 variants={fadeUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Our solutions keep you ahead</motion.h3>
              <motion.p variants={fadeUp} className="text-white/60 mb-8 font-display">Industries we bring expertise in</motion.p>
              <motion.div variants={fadeUp} className="glass rounded-2xl py-6 px-6 max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                  {industries.map((ind, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white group cursor-default">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#D18F5C]/20 transition">
                        <img src={ind.icon} alt={ind.name} className="w-6 h-6" />
                      </div>
                      <span className="text-sm md:text-base font-display font-medium">{ind.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            TESTIMONIAL SLIDER — same Swiper config
        ══════════════════════════════════════════════════ */}
        <div className="relative bg-cover bg-center bg-no-repeat py-16 md:py-20" style={{ backgroundImage: "url('/image/testi.png')" }}>
          <div className="container mx-auto px-4 text-center">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold text-[#D18F5C] mb-10">What Our Clients Say</motion.h2>
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              centeredSlides={true}
              spaceBetween={30}
              navigation
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1.2, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              className="testimonial-swiper"
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-start text-left">
                    <svg className="w-8 h-8 text-red-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 1.151c-2.857 1.232-4.387 3.432-4.387 5.424h4.392v11.425h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 1.151c-2.857 1.232-4.387 3.432-4.387 5.424h4.392v11.425h-9.983z" />
                    </svg>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed italic flex-1">“{t.quote}”</p>
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100 w-full">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative flex-shrink-0 ring-2 ring-[#D18F5C]/20">
                        <img src={t.icon} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-display font-bold text-gray-900">{t.name}</h5>
                        <p className="text-sm text-gray-500 font-display">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            GLOBAL JOURNEY — glass card over background image
        ══════════════════════════════════════════════════ */}
        <div className="relative bg-cover bg-center bg-no-repeat py-16 md:py-20" style={{ backgroundImage: "url('/image/tesbanner.webp')" }}>
          <div className="absolute inset-0 bg-[#0A0930]/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
              className="max-w-3xl">
              <motion.div variants={fadeUp} className="glass rounded-2xl p-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Our Global Journey</h2>
                <p className="text-white/90 mb-0 leading-relaxed">At Rainbow Media, we believe in a data‑driven approach to innovation. Our global journey reflects the trust clients place in us, and we continue to push boundaries to ensure their success.</p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {journeyMilestones.map((milestone, idx) => (
                  <motion.div key={idx} variants={fadeUp}>
                    <TiltCard>
                      <div className="glass rounded-xl p-5 hover:bg-white/20 transition h-full">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 bg-[#D18F5C] rounded-full shadow-lg shadow-[#D18F5C]/30"></div>
                          <h4 className="font-data text-2xl font-bold text-white">{milestone.year}</h4>
                        </div>
                        <p className="text-white/80 mt-1 text-sm">{milestone.desc}</p>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <SectionBridge dark />

        {/* ══════════════════════════════════════════════════
            FAQ SECTION — Cream
        ══════════════════════════════════════════════════ */}
        <div className="bg-[#FDFBF8] py-16 md:py-20">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid md:grid-cols-5 gap-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
                className="md:col-span-2">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#D18F5C]/10 text-[#B8714A] text-sm font-display font-semibold px-4 py-1.5 rounded-full border border-[#D18F5C]/20 mb-4">
                  <span className="w-2 h-2 bg-[#D18F5C] rounded-full"></span>
                  FAQ
                </motion.div>
                <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-[#0A0930] mb-4">Frequently Asked Questions</motion.h2>
                <motion.p variants={fadeUp} className="text-gray-600 mb-6">Find answers to the most common questions about our digital marketing services.</motion.p>
                <motion.div variants={fadeUp}>
                  <Magnetic strength={0.2}>
                    <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="/contact"
                      className="sheen group inline-flex items-center gap-2 bg-[#B8714A] hover:bg-[#D18F5C] text-white px-6 py-3 rounded-full font-display font-semibold transition shadow-md hover:shadow-lg">
                      Contact Our Experts <FaArrowRight className="group-hover:translate-x-1 transition" size={13} />
                    </motion.a>
                  </Magnetic>
                </motion.div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
                className="md:col-span-3">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                  {faqs.map((faq, idx) => (
                    <FAQItem
                      key={idx}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaq === idx}
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ========== BACK TO TOP ========== */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-[#D18F5C] text-white p-3 rounded-full shadow-lg z-40 hover:bg-[#B8714A] transition-all hover:shadow-xl font-display font-bold"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}