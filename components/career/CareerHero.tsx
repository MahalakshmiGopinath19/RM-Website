'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useSpring, useMotionValue, Variants } from 'framer-motion';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';

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
            ctx.strokeStyle = near > 0.3 ? `rgba(224,163,106,${op})` : `rgba(217,159,154,${op})`;
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
        ctx.fillStyle = near > 0.4 ? 'rgba(224,163,106,0.9)' : 'rgba(217,159,154,0.55)';
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
        ctx.fillStyle = '#E0A36A';
        ctx.shadowColor = '#E0A36A';
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
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

interface CareerHeroProps {
  onOpenModal: (jobTitle: string) => void;
}

export default function CareerHero({ onOpenModal }: CareerHeroProps) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });

  return (
    <section ref={heroRef} className="relative bg-[#020215] overflow-hidden py-16 md:py-24 border-b border-white/5">
      <NeuralHeroCanvas />

      <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[480px] h-[480px] border border-[#C9956C]/10 rounded-full animate-spinSlow" />
        <div className="absolute inset-[70px] border border-[#C9956C]/10 rounded-full animate-spinSlowRev" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={stagger}
          className="grid lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.span variants={fadeUp} className="inline-block bg-[#C9956C]/10 text-[#C9956C] border border-[#C9956C]/20 px-4 py-1.5 rounded-full text-xs font-display font-extrabold uppercase tracking-widest mb-4">
              Join VAAVE DIGITAL
            </motion.span>

            <motion.h1 variants={fadeUp}
              className="font-display text-white font-black leading-[1.05] mb-6 tracking-tight"
              style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
              Build the Future with{' '}
              <span className="bg-gradient-to-r from-[#C9956C] via-[#EFD3C9] to-[#C9956C] bg-clip-text text-transparent relative inline-block">
                AI, Creativity & Innovation
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#acabcb] text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-3 font-medium leading-relaxed">
              We’re always looking for passionate individuals who love solving problems, learning new technologies, and creating meaningful digital experiences.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#acabcb] text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 font-medium leading-relaxed">
              If you’re excited about AI, design, development, marketing, and innovation—we’d love to meet you.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Magnetic>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  onClick={() => onOpenModal('General Application')}
                  className="bg-gradient-rosegold text-[#020215] px-7 py-3.5 rounded-full font-display font-black text-sm md:text-base shadow-2xl flex items-center gap-2 transition-colors duration-300 cursor-pointer">
                  <FaWhatsapp className="text-lg" /> Apply on WhatsApp
                  <FaArrowRight size={13} />
                </motion.button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  href="#opportunities"
                  className="border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white px-7 py-3.5 rounded-full font-display font-extrabold text-sm md:text-base transition-all flex items-center justify-center">
                  View Openings
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl">
              <div className="absolute inset-0 bg-[#C9956C]/10 rounded-3xl blur-3xl transform scale-95" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image src="/image/career.png" alt="Creative team" width={1000} height={660} className="w-full h-auto object-cover" priority />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onOpenModal('General Application')}
                className="absolute -bottom-3 -right-3 bg-gradient-rosegold text-[#020215] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer font-display font-bold text-xs sm:text-sm"
              >
                <FaWhatsapp className="text-[#020215] text-lg" /><span>Join our team</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
