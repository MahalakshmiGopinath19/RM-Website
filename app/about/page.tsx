'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import { FaPlus, FaMinus, FaChevronDown, FaArrowRight } from 'react-icons/fa';

import StatsCards from '@/components/about/StatsCards';
import MissionVision from '@/components/about/MissionVision';
import Testimonials from '@/components/about/Testimonials';
import GlobalJourney from '@/components/about/GlobalJourney';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

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
    <div className="flex justify-center py-6 bg-[#020215]">
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

/* ── Neural Hero Canvas ── */
function NeuralHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let planeTimer: NodeJS.Timeout;

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
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const N = 40;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.5 + 0.8,
    }));

    const LINK_DIST = 125;
    const plane = { active: false, from: 0, to: 0, t: 0, speed: 0.015 };

    const launchPlane = () => {
      if (nodes.length < 2) return;
      let f = Math.floor(Math.random() * nodes.length);
      let t = Math.floor(Math.random() * nodes.length);
      while (f === t) {
        t = Math.floor(Math.random() * nodes.length);
      }
      plane.from = f;
      plane.to = t;
      plane.t = 0;
      plane.speed = 0.012 + Math.random() * 0.008;
      plane.active = true;
    };

    planeTimer = setTimeout(launchPlane, 1500);

    let tick = 0;
    const draw = () => {
      tick += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i];
          const b = nodes[j];
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
            ctx.strokeStyle = near > 0.3 ? `rgba(255,137,118,${op})` : `rgba(255,137,118,${op * 0.5})`;
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
        ctx.fillStyle = near > 0.4 ? 'rgba(255,137,118,0.9)' : 'rgba(255,137,118,0.45)';
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
        ctx.fillStyle = '#ff8976';
        ctx.shadowColor = '#ff8976';
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
      gBlob.addColorStop(0, `rgba(255,137,118,${blobPulse})`);
      gBlob.addColorStop(1, 'rgba(255,137,118,0)');
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

/* ── FAQ Accordion Item ── */
function FAQItem({ question, answer, isOpen, onClick }: any) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left text-white font-display font-bold text-lg md:text-xl hover:text-[#C9956C] transition group"
      >
        <span className="group-hover:text-[#C9956C] transition pr-4">{question}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gradient-rosegold text-[#050720]' : 'bg-white/5 text-[#acabcb] group-hover:bg-[#030218] group-hover:text-[#C9956C]'}`}>
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
            <p className="pb-6 text-[#acabcb]/90 leading-relaxed text-base md:text-lg font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── About Page ── */
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

  const faqs = [
    {
      question: 'Is digital marketing important for my business?',
      answer: 'Yes, digital marketing is absolutely critical for modern business growth. It builds high-impact online visibility, targets ideal buyers actively looking for your solutions, and delivers highly measurable ROI. Without strategic online campaigns and search engine presence, your brand loses valuable market share to competitors.'
    },
    {
      question: 'How does digital marketing help my business grow and acquire customers?',
      answer: 'Through integrated tactics like Search Engine Optimization (SEO), localized and global PPC paid ads, and high-converting landing pages, we place your brand in front of high-intent searchers. This systematically converts online traffic into qualified sales leads and loyal customers.'
    },
    {
      question: 'How long does it take to see measurable results from SEO and digital campaigns?',
      answer: 'Paid advertising campaigns (such as Google and Meta PPC) can generate targeted traffic and new business inquiries within 24 to 48 hours. Strategic organic SEO and content marketing campaigns generally show measurable rank growth and traffic compounding in 3 to 6 months, acting as a highly cost-effective, long-term asset.'
    },
    {
      question: 'How do you measure the success and ROI of digital marketing campaigns?',
      answer: 'We deploy analytics and tracking infrastructure (like Google Analytics 4) to monitor real-time key performance indicators. We focus on transparent business metrics: conversion rates, cost per acquisition (CPA), return on ad spend (ROAS), organic keyword rankings, and direct revenue generation.'
    },
    {
      question: 'Why should I hire a digital marketing agency instead of doing it in-house?',
      answer: 'Hiring a digital marketing agency gives your business immediate access to a complete team of specialized experts in advanced SEO, copywriting, paid advertising, and conversion rate optimization (CRO). This eliminates the cost and training time required for in-house hires while deploying state-of-the-art AI-powered growth tools from day one.'
    },
  ];

  return (
    <div className="bg-[#020215] min-h-screen text-[#acabcb]">
      <ScrollProgressBar />
      <GrainOverlay />

      {/* HERO */}
      <section ref={heroRef} className="relative bg-gradient-to-b from-[#020215] to-[#030218] overflow-hidden">
        <NeuralHeroCanvas />

        <div className="absolute right-[-140px] top-1/3 pointer-events-none">
          <div className="w-[420px] h-[420px] border border-white/5 rounded-full animate-spinSlow" />
          <div className="absolute inset-[60px] border border-white/5 rounded-full animate-[spinSlowRev_24s_linear_infinite]" />
        </div>

        <div className="absolute top-6 left-6 w-14 h-14 border-t-2 border-l-2 border-white/5 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-14 h-14 border-t-2 border-r-2 border-white/5 rounded-tr-lg" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10 pt-20 md:pt-28 pb-20 md:pb-24">
          <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={stagger}
            className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold">
              <span className="w-2 h-2 bg-peachAccent rounded-full animate-pulse"></span>
              AI-Powered Agency
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-white font-black leading-[0.95] mb-6" style={{ fontSize: 'clamp(3.2rem,7vw,5.5rem)', textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
              Provide the best service with <span className="text-gradient-peach">out‑of‑the‑box AI‑powered</span> ideas
            </motion.h2>
            <motion.div variants={fadeUp} className="w-full max-w-2xl">
              <p className="text-[#acabcb]/85 text-base md:text-lg leading-relaxed font-medium">
                We are a passionate team of digital marketing enthusiasts dedicated to helping businesses succeed in the digital world. With years of experience and a deep understanding of the ever-evolving online landscape, we stay at the forefront of AI‑integrated trends and technologies.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: LEVERAGE DIGITAL ADVERTISING (WHITE BACKGROUND) */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        {/* Top-Left Circular Outlines */}
        <div className="absolute -top-24 -left-24 w-80 h-80 border border-[#C9956C]/15 rounded-full pointer-events-none z-0" />
        <div className="absolute -top-12 -left-12 w-52 h-52 border border-[#C9956C]/15 rounded-full pointer-events-none z-0" />

        {/* Bottom-Right Circular Outlines */}
        <div className="absolute -bottom-24 -right-24 w-80 h-80 border border-[#C9956C]/15 rounded-full pointer-events-none z-0" />
        <div className="absolute -bottom-12 -right-12 w-52 h-52 border border-[#C9956C]/15 rounded-full pointer-events-none z-0" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <StatsCards />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: MISSION & VISION WITH AI HAND (DARK NAVY BACKGROUND) */}
      <section className="bg-[#020215] py-16 md:py-24 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <MissionVision />
        </div>
      </section>

      <Testimonials />

      <GlobalJourney />

      <SectionBridge />

      {/* FAQ SECTION */}
      <div className="bg-white py-16 md:py-24 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-16">
          
          {/* Centered FAQ Title and Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#050720]/10 text-[#050720] text-sm font-display font-extrabold px-4 py-1.5 rounded-full border border-[#050720]/20 mb-4">
              <span className="w-2 h-2 bg-[#050720] rounded-full animate-pulse"></span>
              FAQ
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-black bg-gradient-to-r from-[#C9956C] to-[#EFD3C9] bg-clip-text text-transparent mb-4 tracking-tight">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#334155] max-w-2xl mx-auto text-base sm:text-lg font-medium">
              Find answers to the most common questions about our search engine optimization (SEO), digital advertising, and high-growth marketing services.
            </motion.p>
          </motion.div>

          {/* Stacked FAQ Items List */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-[#050720] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
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
