'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ── Cycling Typewriter ── */
const WORDS = ['Dominate.', 'Convert.', 'Grow.', 'Innovate.'];
function CyclingTypewriter() {
  const [wi, setWi] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const w = WORDS[wi];
    if (!del && text.length < w.length)
      t.current = setTimeout(() => setText(w.slice(0, text.length + 1)), 75);
    else if (!del && text.length === w.length)
      t.current = setTimeout(() => setDel(true), 1800);
    else if (del && text.length > 0)
      t.current = setTimeout(() => setText(text.slice(0, -1)), 38);
    else {
      setDel(false);
      setWi(i => (i + 1) % WORDS.length);
    }
    return () => {
      if (t.current) clearTimeout(t.current);
    };
  }, [text, del, wi]);

  return (
    <span className="relative inline-block text-gradient-peach font-black">
      {text}
      <span className="inline-block w-[4px] h-[0.8em] bg-peachAccent align-middle ml-1 animate-[blink_0.8s_step-end_infinite]" />
    </span>
  );
}

/* ── Magnetic CTA Wrapper ── */
function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
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
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Neural Hero Canvas ── */
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
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const NODE_COUNT = 36;
    const LINK_DIST = 130;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
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
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
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
            ctx.strokeStyle = near > 0.3 ? `rgba(255,137,118,${op})` : `rgba(255,255,255,${op * 0.15})`;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function CosmicOrbits({ uid = 'orb' }: { uid?: string }) {
  const gradId = `orbit-gradient-${uid}`;
  const animName = `orbit-flow-${uid}`;
  return (
    <div className="relative w-full max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1280px] aspect-[1000/720] flex items-center justify-center select-none mx-auto">
      {/* Dynamic inline styles for the traveling comet path keyframe */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ${animName} {
          0% { stroke-dashoffset: 2420; }
          100% { stroke-dashoffset: 0; }
        }
      `}} />

      {/* SVG Background Orbits */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
        <svg viewBox="0 0 1000 720" className="w-full h-full overflow-visible">
          <defs>
            {/* Orbit Gradient: Rose Gold to Blue */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff8976" stopOpacity="1" />
              <stop offset="45%" stopColor="#3d2b8e" stopOpacity="0.6" />
              <stop offset="55%" stopColor="#3d2b8e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Outer Ellipse Orbit */}
          <path
            d="M 85 320 A 415 355 0 1 1 915 320 A 415 355 0 1 1 85 320"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            opacity="0.85"
          />

          {/* Inner Ellipse Orbit (Dashed) */}
          <path
            d="M 125 320 A 375 315 0 1 1 875 320 A 375 315 0 1 1 125 320"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          {/* Traveling energy line (Comet along the outer orbit) */}
          <path
            d="M 85 320 A 415 355 0 1 1 915 320 A 415 355 0 1 1 85 320"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2.0"
            strokeDasharray="100 2320"
            strokeDashoffset="2420"
            style={{ animation: `${animName} 8s linear infinite` }}
          />

          {/* Glowing points along the orbit */}
          <circle cx="500" cy="-55" r="3.5" fill="#ff8976" className="animate-pulse shadow-[0_0_8px_#ff8976]" />
          <circle cx="500" cy="675" r="3.5" fill="#06b6d4" className="animate-pulse shadow-[0_0_8px_#06b6d4]" />
          <circle cx="141" cy="142.5" r="2.5" fill="#ff8976" className="opacity-80" />
          <circle cx="859" cy="142.5" r="2.5" fill="#06b6d4" className="opacity-80" />
          <circle cx="141" cy="497.5" r="2.5" fill="#ff8976" className="opacity-80" />
          <circle cx="859" cy="497.5" r="2.5" fill="#06b6d4" className="opacity-80" />
        </svg>
      </div>

      {/* 3D Mascot Centerpiece in Big Size with kinetic glowing aura */}
      <div className="absolute left-1/2 top-[44.4%] -translate-x-1/2 -translate-y-1/2 w-[65%] sm:w-[55%] md:w-[50%] lg:w-[52%] max-w-[500px] aspect-square flex items-center justify-center z-20 pointer-events-none">
        {/* Glow halo */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-peachAccent/35 via-electricCyan/25 to-peachAccent/35 blur-3xl animate-pulse" />

        {/* Outer clockwise ring */}
        <div className="absolute inset-[10%] rounded-full p-[2.5px] overflow-hidden opacity-80">
          <div
            className="absolute inset-[-50%] rounded-full animate-[spin_8s_linear_infinite]"
            style={{
              background: 'conic-gradient(from 0deg, #ff8976, #3d2b8e, #06b6d4, #ff8976)',
            }}
          />
          <div className="absolute inset-[2.5px] bg-[#020215] rounded-full" />
        </div>

        {/* Inner counter-clockwise ring */}
        <div className="absolute inset-[16%] rounded-full p-[2px] overflow-hidden opacity-85">
          <div
            className="absolute inset-[-50%] rounded-full animate-[spin_12s_linear_infinite_reverse]"
            style={{
              background: 'conic-gradient(from 0deg, #06b6d4, #3d2b8e, #ff8976, #06b6d4)',
            }}
          />
          <div className="absolute inset-[2px] bg-[#060928]/80 rounded-full" />
        </div>

        {/* Vbot Speech Bubble Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 200 }}
          className="absolute -top-12 sm:-top-16 right-0 sm:right-4 md:right-8 z-40 pointer-events-auto"
        >
          <div className="relative bg-[#050720]/95 border border-peachAccent/40 hover:border-peachAccent shadow-[0_0_25px_rgba(201,149,108,0.3)] backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 max-w-[210px] sm:max-w-[260px] text-left transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-peachAccent animate-ping" />
              <span className="font-display font-black text-xs sm:text-sm text-peachAccent">
                Vanakkam! 🙏
              </span>
            </div>
            <p className="text-white text-[11px] sm:text-xs font-semibold font-display leading-snug">
              I'm <span className="text-peachAccent font-extrabold">Vbot</span>, your AI Digital Partner at Vaave Digital! 🤖✨
            </p>

            {/* Speech Bubble Tail Pointer */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-[#050720] border-r border-b border-peachAccent/40 transform rotate-45" />
          </div>
        </motion.div>

        {/* Big 3D Mascot Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-auto">
          <Image
            src="/image/mascot_vanakam.png"
            alt="Vaave Digital AI Mascot Vbot"
            width={600}
            height={720}
            className="w-auto h-[105%] max-h-[380px] sm:max-h-[460px] md:max-h-[520px] lg:max-h-[580px] object-contain drop-shadow-[0_15px_45px_rgba(255,137,118,0.45)] drop-shadow-[0_0_60px_rgba(6,182,212,0.35)] hover:scale-105 transition-transform duration-500 cursor-pointer"
            priority
          />
        </div>
      </div>
    </div>
  );
}

interface HeroBannerProps {
  setShowModal: (show: boolean) => void;
}

export default function HeroBanner({ setShowModal }: HeroBannerProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, 4]);

  return (
    <>
      <section ref={heroRef} className="relative bg-gradient-to-b from-[#020215] to-[#030218] overflow-hidden pt-16 lg:pt-0 pb-0 md:pb-8 lg:pb-10 border-b border-white/5">
        <NeuralHeroCanvas />

        {/* Decorative corner lines */}
        <div className="absolute top-6 left-6 w-14 h-14 border-t-2 border-l-2 border-white/5 rounded-tl-lg mt-4" />
        <div className="absolute top-6 right-6 w-14 h-14 border-t-2 border-r-2 border-white/5 rounded-tr-lg mt-4" />
        <div className="absolute bottom-12 left-6 w-14 h-14 border-b-2 border-l-2 border-white/5 rounded-bl-lg" />
        <div className="absolute bottom-12 right-6 w-14 h-14 border-b-2 border-r-2 border-white/5 rounded-tr-lg" />

        {/* ── MOBILE LAYOUT (< lg) ── */}
        <div className="lg:hidden container mx-auto px-4 sm:px-6 relative z-10 pt-2 flex flex-col items-center text-center">

          {/* Mobile Text */}
          <motion.div
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="w-full flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-3">
              <span className="font-display text-2xl font-black tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-t from-peachAccent to-[#EFD3C9]">
                VAAVE <span className="font-light tracking-[0.4em] text-[#acabcb]">DIGITAL</span>
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4 justify-center">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-electricCyan opacity-60" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-electricCyan" />
              </div>
              <span className="font-display text-white/85 text-[10px] tracking-[0.3em] uppercase font-bold">
                AI‑Integrated Digital Marketing Agency
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="font-display text-white leading-[0.95] font-black mb-4"
              style={{ fontSize: 'clamp(2.8rem, 11vw, 4rem)', textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
              Ready to<br />
              <CyclingTypewriter />
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-[#acabcb]/90 text-sm max-w-xs mb-6 leading-relaxed font-medium">
              Drive traffic, generate leads, and accelerate growth with strategies that deliver{' '}
              <span className="text-white font-bold">real results.</span>
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 w-full max-w-xs">
              <a
                href="https://wa.me/917305821333"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden rounded-full p-[1px] w-full focus:outline-none transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,137,118,0.15)] hover:shadow-[0_0_25px_rgba(255,137,118,0.25)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-peachAccent via-[#ffbfa3] to-electricCyan rounded-full animate-pulse" />
                <div className="relative px-8 py-3.5 bg-[#020215] rounded-full text-white font-display text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 transition-colors duration-300 group-hover:bg-transparent">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  WhatsApp Now
                  <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Mobile Orbital */}
          <div className="w-full max-w-[440px] sm:max-w-xl mx-auto flex justify-center items-center relative overflow-visible my-4">
            <CosmicOrbits uid="mob" />
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (lg+) ── */}
        <div className="hidden lg:block container mx-auto px-16 relative z-10 lg:pt-6 xl:pt-10">
          <div className="flex flex-row items-center gap-8">

            {/* Left Column */}
            <motion.div
              style={{ y: heroY, rotate: heroRotate }}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              variants={stagger}
              className="w-6/12 xl:w-5/12 flex flex-col text-left relative z-20"
            >
              <motion.div variants={fadeUp} className="mb-4">
                <span className="font-display text-3xl font-black tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-t from-peachAccent to-[#EFD3C9]">
                  VAAVE <span className="font-light tracking-[0.4em] text-[#acabcb]">DIGITAL</span>
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-electricCyan opacity-60" />
                  <span className="relative rounded-full h-3 w-3 bg-electricCyan" />
                </div>
                <span className="font-display text-white/85 text-xs tracking-[0.3em] uppercase font-bold">
                  AI‑Integrated Digital Agency
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp}
                className="font-display text-white leading-[0.95] font-black mb-6"
                style={{ fontSize: 'clamp(3.2rem,7vw,5.5rem)', textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
                Ready to<br />
                <CyclingTypewriter />
              </motion.h1>

              <motion.p variants={fadeUp}
                className="text-[#acabcb]/90 text-xl max-w-xl mb-10 leading-relaxed font-medium">
                Drive traffic, generate leads, and accelerate growth with strategies that deliver{' '}
                <span className="text-white font-bold">real results.</span>
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-row items-center gap-4">
                <Magnetic>
                  <a
                    href="https://wa.me/917305821333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,137,118,0.15)] hover:shadow-[0_0_25px_rgba(255,137,118,0.25)] block"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-peachAccent via-[#ffbfa3] to-electricCyan rounded-full animate-pulse" />
                    <div className="relative px-8 py-4 bg-[#020215] rounded-full text-white font-display text-sm font-bold tracking-wide flex items-center justify-center gap-3 transition-colors duration-300 group-hover:bg-transparent">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                      WhatsApp Now
                      <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <div className="w-6/12 xl:w-7/12 flex justify-center items-center relative min-h-[700px] lg:-mr-10 xl:-mr-16 lg:translate-y-6 xl:translate-y-10">
              <CosmicOrbits uid="dsk" />
            </div>

          </div>
        </div>
      </section>

      {/* TICKER — Marquee Strip */}
      <div
        className="py-5 overflow-hidden border-y border-[#c07a4a]/30"
        style={{ perspective: 800, background: 'linear-gradient(90deg, #C9956C 0%, #e8b090 40%, #C9956C 70%, #b07550 100%)' }}
      >
        <div
          className="whitespace-nowrap"
          style={{
            transform: 'rotateX(6deg)',
            transformStyle: 'preserve-3d',
            maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          }}
        >
          {/* Two identical sets — the animation translates -50% so the second set seamlessly replaces the first */}
          <div className="inline-flex gap-12 animate-marquee">
            {['Social Media Marketing', 'SEO Optimization', 'Google Ads', 'Website Creation',
              'Web Development', 'Branding & Design', 'YouTube Promotion', 'Content Strategy',
              'Social Media Marketing', 'SEO Optimization', 'Google Ads', 'Website Creation',
              'Web Development', 'Branding & Design', 'YouTube Promotion', 'Content Strategy'].map((item, i) => (
                <span key={i} className="font-display text-xs font-bold tracking-[0.2em] uppercase inline-flex items-center gap-4" style={{ color: '#4a1c05' }}>
                  {item} <span style={{ color: '#7a3510' }}>◆</span>
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
