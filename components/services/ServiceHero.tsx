'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

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

const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

export default function ServiceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current; const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(480px circle at ${x}% ${y}%, rgba(255,137,118,0.12), transparent 55%)`;
  };
  const onMouseLeave = () => { if (glowRef.current) glowRef.current.style.background = 'transparent'; };

  return (
    <div ref={heroRef} className="relative bg-gradient-to-b from-[#020215] to-[#030218] pt-10 md:pt-14 lg:pt-16 pb-12 md:pb-16 overflow-hidden"
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div ref={containerRef} className="absolute inset-0">
        <PulseCanvas />
        <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
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
  );
}
