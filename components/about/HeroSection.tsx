'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

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

export default function HeroSection() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  return (
    <section ref={heroRef} className="relative bg-gradient-to-b from-[#020215] to-[#030218] pt-10 md:pt-14 lg:pt-16 pb-12 md:pb-16 overflow-hidden">
      <NeuralHeroCanvas />

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
          <div className="lg:col-span-7 text-center lg:text-left order-1">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-4 py-1.5 rounded-full text-xs font-display font-extrabold uppercase tracking-widest mb-4">
              Our Capabilities
            </motion.span>

            <motion.h1 variants={fadeUp}
              className="font-display font-black text-white leading-[0.98] mb-4"
              style={{ fontSize: 'clamp(2.8rem, 5.2vw, 5.2rem)', textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
              Chennai&apos;s Most Trusted{' '}
              <span className="text-gradient-peach relative">Digital Experts</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[#acabcb] text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed mb-6">
              Next-gen marketing and IT solutions, powered by tech, delivered by experts.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link href="/products">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="inline-block bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg px-7 py-3.5 rounded-full font-display font-black shadow-2xl text-sm md:text-base transition-colors duration-300 cursor-pointer">
                  Explore Our Products →
                </motion.span>
              </Link>
              <motion.a href="https://wa.me/917305821333?text=Hi%20Vaave%20Digital!%20I%20would%20like%20to%20get%20a%20free%20audit%20for%20my%20business." target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="inline-block border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white px-7 py-3.5 rounded-full font-display font-extrabold text-sm md:text-base transition-all">
                Get Free Consult
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column — Mascot Flying Image */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex justify-center lg:justify-end order-2 overflow-visible">
            <motion.img
              src="/image/mascot_flying.png"
              alt="Vaave Mascot Flying"
              className="w-80 sm:w-[480px] md:w-[540px] lg:w-[620px] xl:w-[700px] h-auto object-contain drop-shadow-[0_25px_60px_rgba(201,149,108,0.35)] select-none lg:-mr-12 xl:-mr-16"
              animate={{
                y: [-15, 15, -15],
                rotate: [-2, 2, -2]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
