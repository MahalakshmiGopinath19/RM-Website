// app/products/page.tsx - restyled to match the richer-motion design system
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useInView, animate } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

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
      <div ref={glareRef} className="absolute inset-0 rounded-2xl pointer-events-none transition-[background] duration-150" />
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
    const N = 28;
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
   PAGE
══════════════════════════════════════════════════════════ */
export default function ProductsPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroSpot = useSpotlight();
  const ctaSpot = useSpotlight();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const features = ['Bill Smarter', 'Work Faster', 'Bill Efficiently', 'Customizable Billing'];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overscroll-behavior: none; scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #fff; }
        .font-display { font-family: 'Syne', sans-serif; }
        .font-data { font-family: 'Space Grotesk', sans-serif; }

        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinSlowRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .animate-spinSlow { animation: spinSlow 20s linear infinite; }
        .animate-spinSlowRev { animation: spinSlowRev 26s linear infinite; }

        .glass { background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); }

        .sheen { position: relative; overflow: hidden; }
        .sheen::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 48%, transparent 66%); background-size: 200% 100%; opacity: 0; transition: opacity .25s; }
        .sheen:hover::before { opacity: 1; animation: shimmer 1s ease; }

        .underline-hover { position: relative; }
        .underline-hover::after { content:''; position:absolute; left:0; bottom:-2px; width:100%; height:2px; background:#E0A36A; transform:scaleX(0); transform-origin:right; transition:transform .3s ease; }
        .underline-hover:hover::after { transform:scaleX(1); transform-origin:left; }

        @media (prefers-reduced-motion: reduce) {
          .animate-spinSlow, .animate-spinSlowRev { animation: none !important; }
        }
      `}</style>

      <GrainOverlay />

      <div className="bg-[#FDFBF8] min-h-screen">

        {/* ══════════════════════════════════════════════
            HERO — navy + pulse canvas + spotlight
        ══════════════════════════════════════════════ */}
        <div ref={heroRef} className="relative bg-gradient-to-b from-[#0A0930] to-[#12103D] pt-16 md:pt-20 pb-16 md:pb-20 overflow-hidden"
          onMouseMove={heroSpot.onMouseMove} onMouseLeave={heroSpot.onMouseLeave}>
          <div ref={heroSpot.containerRef} className="absolute inset-0">
            <PulseCanvas />
            <div ref={heroSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
          </div>
          {/* faint background image, tinted navy */}
          <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity" style={{ backgroundImage: "url('/image/prodsec.webp')" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0930] via-[#0A0930]/85 to-transparent" />

          <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
            <div className="w-[380px] h-[380px] border border-[#EFD3C9]/10 rounded-full animate-spinSlow" />
            <div className="absolute inset-[60px] border border-[#EFD3C9]/10 rounded-full animate-spinSlowRev" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={stagger} className="max-w-3xl">
              <motion.span variants={fadeUp} className="inline-flex items-center gap-2 glass text-white/85 text-xs font-display font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-[#E0A36A] opacity-60" />
                  <span className="relative rounded-full h-2 w-2 bg-[#E0A36A]" />
                </span>
                IT Products
              </motion.span>
              <motion.h1 variants={fadeUp} className="font-display lg:text-2xl md:text-3xl text-xl font-extrabold text-white leading-tight"
                style={{ textShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
                Innovative IT Solutions for Tomorrow's Businesses
              </motion.h1>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            FEATURE PILLS — cream, magnetic hover
        ══════════════════════════════════════════════ */}
        <div className="py-12 bg-[#FDFBF8] border-b border-gray-100">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-wrap justify-center gap-3">
              {features.map((feature, idx) => (
                <motion.span
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ scale: 1.06, backgroundColor: '#E0A36A', color: '#fff', borderColor: '#E0A36A' }}
                  className="px-6 py-2.5 text-[#0A0930] bg-white rounded-full text-sm md:text-base font-display font-semibold border-2 border-gray-200 transition-all duration-200 cursor-default select-none shadow-sm"
                >
                  {feature}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            PRODUCT SHOWCASE — tilt card + gold accents
        ══════════════════════════════════════════════ */}
        <div className="bg-[#FDFBF8] py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-14">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="md:w-1/2 w-full"
              >
                <TiltCard>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E0A36A]/10 to-transparent pointer-events-none" />
                    <img
                      src="/image/imageprod.webp"
                      alt="BILL IT NOW Dashboard"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="md:w-1/2 w-full text-center md:text-left"
              >
                <motion.div variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-[#0A0930] text-[#EFD3C9] text-xs font-display font-bold uppercase tracking-widest mb-4">
                  Smarter Automated Billing
                </motion.div>
                <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-extrabold text-[#0A0930] tracking-tight">BILL IT NOW —</motion.h2>
                <motion.p variants={fadeUp} className="text-xl text-gray-600 font-medium mt-2">Redefine Your Billing Experience</motion.p>
                <motion.ul variants={stagger} className="mt-8 space-y-3 text-gray-600">
                  {[
                    'Billing Made Seamless, Business Made Simple',
                    'Effortless Billing, Powerful Results',
                    'Your All-in-One Billing Solution',
                  ].map((text, idx) => (
                    <motion.li key={idx} variants={fadeUp} className="flex items-center gap-3 justify-center md:justify-start">
                      <FaCheckCircle className="text-[#E0A36A] text-lg flex-shrink-0" />
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div variants={fadeUp} className="mt-10">
                  <Magnetic strength={0.22}>
                    <motion.a
                      href="https://billitnow-productpage.rainbowmedia.co.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                      className="sheen group inline-flex items-center gap-2 bg-[#E0A36A] hover:bg-[#9C5B5A] text-white px-8 py-3.5 rounded-full font-display font-bold transition-colors duration-300 shadow-lg"
                    >
                      Explore Now <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  </Magnetic>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            CALL TO ACTION — navy, spotlight + decorative rings
        ══════════════════════════════════════════════ */}
        <div ref={ctaSpot.containerRef} onMouseMove={ctaSpot.onMouseMove} onMouseLeave={ctaSpot.onMouseLeave}
          className="relative overflow-hidden bg-[#0A0930] py-16 md:py-24">
          <div ref={ctaSpot.glowRef} className="absolute inset-0 pointer-events-none transition-all duration-200" />
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full border border-white/5 animate-spinSlow" />
            <div className="absolute w-[420px] h-[420px] rounded-full border border-white/5 animate-spinSlowRev" />
          </div>
          <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full border border-[#EFD3C9]/10 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full border border-[#EFD3C9]/10 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">Ready to Streamline Your Billing?</motion.h2>
                <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light">
                  Join hundreds of businesses already using BILL IT NOW to save time and reduce errors.
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Magnetic strength={0.22}>
                    <motion.a
                      href="https://wa.me/917305821333"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                      className="sheen group inline-flex items-center gap-2 bg-[#E0A36A] hover:bg-[#9C5B5A] text-white px-8 py-4 rounded-full font-display font-bold shadow-xl text-base"
                    >
                      Explore Now <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  </Magnetic>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BACK TO TOP
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-[#E0A36A] text-white p-2.5 md:p-3.5 rounded-full shadow-xl z-40 hover:bg-[#9C5B5A] transition-colors text-sm md:text-base"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
