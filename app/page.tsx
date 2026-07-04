'use client';

import { useState, useRef, useEffect } from 'react';
import {
  motion, useInView, AnimatePresence, Variants,
  useScroll, useTransform, useMotionValue, useSpring, animate,
} from 'framer-motion';
import Image from 'next/image';
import {
  FaArrowRight, FaWhatsapp, FaBrain, FaChevronUp,
  FaHeartbeat, FaLayerGroup, FaSync, FaChevronDown,
} from 'react-icons/fa';

/* ══════════════════════════════════════════════════════════
   VAAVE DIGITAL — BRAND PALETTE
   Navy      #0A0930  (deep background, matches logo backdrop)
   Navy-Deep #12103D  (secondary depth layer, gradients)
   Gold      #D18F5C  (primary copper/rose-gold accent)
   Gold-D    #B8714A  (darker copper — hovers, on-white text)
   Gold-L    #F0C9A0  (light gold tint — text/borders on navy)
   Teal      #34D2C7  (paper-plane accent — signature network)
   Cream     #FDFBF8  (warm light section background)
   Ink       #12103D  (cooler near-black for cream-section text)
══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════════════ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const slideL: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const slideR: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
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
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000] bg-gradient-to-r from-[#B8714A] via-[#D18F5C] to-[#F0C9A0]"
    />
  );
}

/* ══════════════════════════════════════════════════════════
   CURSOR SPOTLIGHT — subtle depth on dark panels
══════════════════════════════════════════════════════════ */
function useSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(480px circle at ${x}% ${y}%, rgba(217,159,154,0.14), transparent 55%)`;
  };
  const onMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.background = 'transparent';
  };
  return { containerRef, glowRef, onMouseMove, onMouseLeave };
}

/* ══════════════════════════════════════════════════════════
   MAGNETIC WRAPPER — for primary CTAs
══════════════════════════════════════════════════════════ */
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
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   CYCLING TYPEWRITER
══════════════════════════════════════════════════════════ */
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
    else { setDel(false); setWi(i => (i + 1) % WORDS.length); }
    return () => { if (t.current) clearTimeout(t.current); };
  }, [text, del, wi]);
  return (
    <span className="relative inline-block bg-gradient-to-r from-[#FBD9BE] via-[#F0C9A0] to-[#D18F5C] bg-clip-text text-transparent">
      {text}
      <span className="inline-block w-[4px] h-[0.8em] bg-[#F0C9A0] align-middle ml-1 animate-[blink_0.8s_step-end_infinite]" />
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   COUNT UP
══════════════════════════════════════════════════════════ */
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, { duration: 1.6, ease: 'easeOut', onUpdate: v => setN(Math.floor(v)) });
    return ctrl.stop;
  }, [inView, end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════
   ARC STAT — glassy ring with glow
══════════════════════════════════════════════════════════ */
function ArcStat({ pct, label, value }: { pct: number; label: string; value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, pct, { duration: 1.5, ease: 'easeOut', onUpdate: v => setProgress(v) });
    return ctrl.stop;
  }, [inView, pct]);
  const r = 44; const circ = 2 * Math.PI * r;
  const dash = (progress / 100) * circ;
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 group">
      <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
        <div className="absolute inset-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_0_24px_rgba(217,159,154,0.12)]" />
        <svg viewBox="0 0 100 100" className="relative w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(217,159,154,0.18)" strokeWidth="7" />
          <circle cx="50" cy="50" r={r} fill="none" stroke="#F0C9A0" strokeWidth="7"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px rgba(217,159,154,0.55))' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-data text-lg font-bold text-white">{value}</span>
        </div>
      </div>
      <span className="font-display text-xs font-semibold text-white/70 uppercase tracking-widest text-center leading-tight">{label}</span>
    </div>
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
        ry.set((px - 0.5) * 16);
        rx.set(-(py - 0.5) * 16);
        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(220px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.28), transparent 60%)`;
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
   FLIP CARD
══════════════════════════════════════════════════════════ */
function FlipCard({ front, back }: { front: React.ReactNode; back: React.ReactNode }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="relative"
      style={{ perspective: 1000, height: 420 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}>{front}</div>
        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}>{back}</div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROCESS CONNECTOR
══════════════════════════════════════════════════════════ */
function ProcessConnector() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="hidden md:flex items-center flex-1 px-2">
      <div className="w-full h-px bg-gray-200 relative overflow-hidden">
        <motion.div className="absolute inset-y-0 left-0 bg-[#D18F5C]"
          initial={{ width: 0 }} animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.3 }} />
      </div>
      <motion.div className="w-2 h-2 rounded-full bg-[#D18F5C] flex-shrink-0"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.4 }} />
    </div>
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
   SIGNATURE HERO CANVAS — "Neural Constellation"
   A living network of nodes (echoing the brand's AI story) that
   brightens near the cursor, threaded by a copper/teal courier
   that periodically traces the wordmark's paper-plane arc.
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

    const NODE_COUNT = 46;
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

    const rings = [280, 220, 160, 100, 50];
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 0.008;

      // Pulsing concentric rings (top right) — soft gold
      rings.forEach((r, i) => {
        const pulse = Math.sin(tick * 1.2 - i * 0.4) * 0.05 + 0.05;
        ctx.beginPath();
        ctx.arc(canvas.width - 60, -60, r + Math.sin(tick + i) * 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(217,159,154,${pulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // drift nodes
      nodes.forEach(n => {
        if (!reduced) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // connections — brighten near cursor
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

      // nodes
      nodes.forEach(n => {
        const mDist = Math.hypot(n.x - mouseRef.current.x, n.y - mouseRef.current.y);
        const near = Math.max(0, 1 - mDist / 180);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = near > 0.4 ? 'rgba(3,101,140,0.9)' : 'rgba(217,159,154,0.55)';
        ctx.fill();
      });

      // paper-plane courier along a curved path between two nodes
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

      // bottom-left glow blob — gold
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

/* ══════════════════════════════════════════════════════════
   PAGE COMPONENT — VAAVE DIGITAL
══════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [showModal, setShowModal] = useState(false);
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({ service: 'Social Media Marketing', name: '', contact: '', message: '' });

  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 60]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.3], [0, -2]);

  const fsSpot = useSpotlight();
  const adsSpot = useSpotlight();
  const footerSpot = useSpotlight();

  useEffect(() => {
    const fn = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const serviceOptions = [
    'Social Media Marketing', 'Website Creation & Management', 'Google Ads & Google My Business',
    'Pay Per Click Ads', 'Search Engine Optimization (SEO)', 'Content Marketing',
    'YouTube & Google Promotion', 'Campaign Ideas & Implementation', 'Others',
  ];

  const services = [
    { image: '/image/sm-img.webp', title: 'Social Media Marketing', tag: 'SMM', desc: 'Data-driven social strategies with AI insights to boost engagement, reach, and campaign performance across all platforms.', cta: 'Free Audit' },
    { image: '/image/wb.webp', title: 'Website Creation', tag: 'WEB', desc: 'Modern, responsive websites with AI-powered features and smart integrations tailored to your business goals.', cta: 'Chat with Dev', href: 'https://wa.me/917305821333' },
    { image: '/image/gmb.webp', title: 'Google My Business', tag: 'GMB', desc: 'Optimized business profiles with AI-powered insights to dominate local search and drive more foot traffic.', cta: 'Call for Local SEO', href: 'tel:+917305821333' },
    { image: '/image/seo.webp', title: 'Search Engine Optimization', tag: 'SEO', desc: 'Comprehensive SEO strategies that enhance visibility and drive sustained organic traffic for long-term growth.', cta: 'Request SEO Analysis' },
    { image: '/image/bcd.webp', title: 'Branding & Design', tag: 'BRD', desc: 'Creative branding solutions enhanced by AI-powered tools for faster ideation and impactful visual identities.', cta: 'Email Design Team', href: 'mailto:rmedia1123.info@gmail.com' },
  ];

  const uxSteps = [
    { image: '/image/uxui-1.webp', title: 'Research & Planning', desc: 'We learn about your business, users, and goals. AI helps us gather insights and find the best direction fast.' },
    { image: '/image/uxui-2.webp', title: 'Wireframes & Prototypes', desc: 'Clickable prototypes so you see exactly how your site or app works before a single line of code is written.' },
    { image: '/image/uxui-3.webp', title: 'Design & Improvement', desc: 'Beautiful, user-friendly screens refined with AI insights for better engagement and measurable results.' },
  ];

  const fullstackSteps = [
    { icon: '/image/fs-1.png', title: 'UI/UX Design', desc: 'Responsive interfaces built for seamless cross-device experiences.' },
    { icon: '/image/fs-2.png', title: 'App Development', desc: 'Secure APIs and server solutions engineered to scale reliably.' },
    { icon: '/image/fs-3.png', title: 'AI & Automation', desc: 'Smart chatbots and AI capabilities integrated into your platform.' },
    { icon: '/image/fs-4.png', title: 'Launch & Growth', desc: 'Cloud deployment, security hardening, and ongoing maintenance.' },
  ];

  const galleryProjects = [
    { id: 1, label: 'E-Commerce Revamp', category: 'Web Design' },
    { id: 2, label: 'Brand Campaign', category: 'Social Media' },
    { id: 3, label: 'SEO Growth 3×', category: 'SEO / Content' },
    { id: 4, label: 'Google Ads ROAS 8×', category: 'Paid Media' },
    { id: 5, label: 'App UI/UX', category: 'Design' },
    { id: 6, label: 'GMB Local Push', category: 'Local SEO' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Vaave Digital! AI Consultation%0AService: ${formData.service}%0AName: ${formData.name}%0AContact: ${formData.contact}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/917305821333?text=${encodeURIComponent(msg)}`, '_blank');
    setShowModal(false);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickSubmitted(true);
    window.open(`https://wa.me/917305821333?text=${encodeURIComponent(`Hi Vaave Digital, please call me back: ${quickPhone}`)}`, '_blank');
    setTimeout(() => { setQuickSubmitted(false); setQuickPhone(''); }, 2000);
  };

  return (
    <>
      {/* ─── GLOBAL STYLES ─────────────────────────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overscroll-behavior: none; scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #fff; }
        .font-display { font-family: 'Syne', sans-serif; }
        .font-data    { font-family: 'Space Grotesk', sans-serif; }

        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes marquee     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes spinSlow    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinSlowRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes pulse-ring  { 0%{transform:scale(0.9);opacity:0.8} 100%{transform:scale(1.6);opacity:0} }
        @keyframes shimmer     { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .animate-marquee    { animation: marquee 22s linear infinite; }
        .animate-floatY     { animation: floatY 5s ease-in-out infinite; }
        .animate-spinSlow   { animation: spinSlow 18s linear infinite; }
        .animate-spinSlowRev{ animation: spinSlowRev 24s linear infinite; }

        /* Glass */
        .glass { background:rgba(255,255,255,0.08); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.15); }

        /* Clip paths for section transitions */
        .clip-down { clip-path: polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%); padding-bottom: 5rem; }
        .clip-up   { clip-path: polygon(50% 0%, 100% 8%, 100% 100%, 0 100%, 0 8%); padding-top: 5rem; }
        .clip-wave { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }

        /* Hover border sweep */
        .sweep { position:relative; overflow:hidden; }
        .sweep::after { content:''; position:absolute; inset:0; border:2px solid #D18F5C; border-radius:inherit; opacity:0; transform:scale(0.95); transition:opacity .3s,transform .3s; }
        .sweep:hover::after { opacity:1; transform:scale(1); }

        /* Gallery hover overlay */
        .gallery-item .overlay {
          position:absolute; inset:0; background:rgba(7,8,38,0);
          display:flex; flex-direction:column; align-items:flex-start; justify-content:flex-end;
          padding:1.25rem; transition:background .4s ease;
        }
        .gallery-item:hover .overlay { background:rgba(7,8,38,0.86); }
        .gallery-item .overlay-text { opacity:0; transform:translateY(12px); transition:opacity .3s .1s, transform .3s .1s; }
        .gallery-item:hover .overlay-text { opacity:1; transform:translateY(0); }

        /* Shimmering CTA border sheen */
        .sheen { position:relative; overflow:hidden; }
        .sheen::before {
          content:''; position:absolute; inset:0; border-radius:inherit;
          background:linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 48%, transparent 66%);
          background-size:200% 100%; opacity:0; transition:opacity .25s;
        }
        .sheen:hover::before { opacity:1; animation: shimmer 1.1s ease; }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-floatY, .animate-spinSlow, .animate-spinSlowRev { animation: none !important; }
        }
      `}</style>

      <ScrollProgressBar />
      <GrainOverlay />

      <div className="bg-[#0A0930] min-h-screen" ref={containerRef}>

        {/* ══════════════════════════════════════════════════
            HERO — Deep Navy + Neural Constellation signature
        ══════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative bg-gradient-to-b from-[#0A0930] to-[#12103D] min-h-screen flex items-center overflow-hidden clip-wave">
          {/* Signature animated network background */}
          <NeuralHeroCanvas />

          {/* Spinning decorative rings */}
          <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[600px] h-[600px] border border-[#F0C9A0]/10 rounded-full animate-spinSlow" />
            <div className="absolute inset-[80px] border border-[#F0C9A0]/10 rounded-full animate-spinSlowRev" />
            <div className="absolute inset-[160px] border-2 border-[#F0C9A0]/10 rounded-full animate-spinSlow" />
          </div>

          {/* Corner frame accents */}
          <div className="absolute top-6 left-6 w-14 h-14 border-t-2 border-l-2 border-[#F0C9A0]/25 rounded-tl-lg" />
          <div className="absolute top-6 right-6 w-14 h-14 border-t-2 border-r-2 border-[#F0C9A0]/25 rounded-tr-lg" />
          <div className="absolute bottom-16 left-6 w-14 h-14 border-b-2 border-l-2 border-[#F0C9A0]/25 rounded-bl-lg" />
          <div className="absolute bottom-16 right-6 w-14 h-14 border-b-2 border-r-2 border-[#F0C9A0]/25 rounded-br-lg" />

          <motion.div style={{ y: heroY, rotate: heroRotate }} className="container mx-auto px-6 lg:px-16 relative z-10 py-32">
            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={stagger}>

              {/* Brand wordmark */}
              <motion.div variants={fadeUp} className="mb-6">
                <span className="font-display text-2xl md:text-3xl font-black tracking-[0.15em] bg-gradient-to-r from-[#F6C9AE] via-[#E8875A] to-[#B8714A] bg-clip-text text-transparent">
                  VAAVE <span className="font-light tracking-[0.4em]">DIGITAL</span>
                </span>
              </motion.div>

              {/* Pulsing live dot + eyebrow */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-[#34D2C7] opacity-60" />
                  <span className="relative rounded-full h-3 w-3 bg-[#34D2C7]" />
                </div>
                <span className="font-display text-white/80 text-xs tracking-[0.3em] uppercase font-semibold">
                  AI‑Integrated Digital Agency
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp}
                className="font-display text-white leading-[0.95] font-black mb-8"
                style={{ fontSize: 'clamp(3.2rem,8.5vw,8rem)', textShadow: '0 2px 0 rgba(217,159,154,0.15), 0 20px 60px rgba(0,0,0,0.45)' }}>
                Ready to<br />
                <CyclingTypewriter />
              </motion.h1>

              {/* Sub copy */}
              <motion.p variants={fadeUp}
                className="text-white/80 text-xl md:text-2xl max-w-xl mb-12 leading-relaxed font-light">
                Drive traffic, generate leads, and accelerate growth with strategies that deliver{' '}
                <span className="text-white font-semibold not-italic">real results.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-20">
                <Magnetic>
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setShowModal(true)}
                    className="sheen group bg-white text-[#B8714A] px-10 py-4 rounded-full font-display font-bold text-base flex items-center gap-2 shadow-2xl shadow-black/40">
                    Get Free AI Audit
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                      <FaArrowRight size={13} />
                    </motion.span>
                  </motion.button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <motion.a
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                    href="https://wa.me/917305821333" target="_blank"
                    className="glass text-white px-10 py-4 rounded-full font-display font-bold text-base flex items-center gap-2 hover:bg-white hover:text-[#B8714A] transition-all duration-300">
                    <FaWhatsapp size={17} /> WhatsApp Now
                  </motion.a>
                </Magnetic>
              </motion.div>

              {/* Arc stats */}
              <motion.div variants={stagger}
                className="flex flex-wrap gap-10 pt-6 border-t border-white/20">
                <ArcStat pct={98} label="Client Satisfaction" value="98%" />
                <ArcStat pct={75} label="Avg. Growth" value="3×" />
                <ArcStat pct={90} label="On‑Time Delivery" value="90%" />
                <ArcStat pct={100} label="Risk Free" value="100%" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
            <span className="font-display text-white/40 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-5 h-8 border border-white/25 rounded-full flex justify-center pt-1.5">
              <motion.div className="w-1 h-1 bg-white/60 rounded-full"
                animate={{ y: [0, 12, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
            </div>
          </motion.div>
        </section>

        {/* ── Bridge: Hero → Ticker ── */}
        <SectionBridge bgClass="bg-[#12103D]" />

        {/* ══════════════════════════════════════════════════
            TICKER — White, subtle 3D marquee strip
        ══════════════════════════════════════════════════ */}
        <div className="bg-white py-6 border-y border-gray-100 overflow-hidden" style={{ perspective: 800 }}>
          <div
            className="whitespace-nowrap"
            style={{
              transform: 'rotateX(6deg)',
              transformStyle: 'preserve-3d',
              maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <div className="inline-flex gap-12 animate-marquee">
              {['Social Media Marketing', 'SEO Optimization', 'Google Ads', 'Website Creation',
                'AI Automation', 'Branding & Design', 'YouTube Promotion', 'Content Strategy',
                'Social Media Marketing', 'SEO Optimization', 'Google Ads', 'Website Creation',
                'AI Automation', 'Branding & Design', 'YouTube Promotion', 'Content Strategy'].map((item, i) => (
                <span key={i} className="font-display text-gray-400 text-xs font-bold tracking-[0.2em] uppercase inline-flex items-center gap-4">
                  {item} <span className="text-[#D18F5C] text-sm">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bridge: Ticker → Intro ── */}
        <SectionBridge bgClass="bg-[#FDFBF8]" dark />

        {/* ══════════════════════════════════════════════════
                    INTRO — Warm Cream
                ══════════════════════════════════════════════════ */}
                <section className="bg-[#FDFBF8] py-24 relative overflow-hidden">
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 font-display font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: 'clamp(8rem,16vw,16rem)', color: 'rgba(10, 10, 41, 0.04)' }}>01</div>
                  <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
                      className="max-w-3xl">
                      <motion.span variants={fadeUp}
                        className="inline-block font-display text-[#B8714A] text-xs tracking-[0.35em] uppercase font-bold mb-5">
                        What We Do
                      </motion.span>
                      <motion.h2 variants={fadeUp}
                        className="font-display text-[#0A0930] font-extrabold leading-[1.05] mb-5"
                        style={{ fontSize: 'clamp(2rem,5vw,3.8rem)' }}>
                        Dominating the{' '}
                        <span className="relative inline-block text-[#B8714A]">
                          AI‑Powered
                          <motion.span className="absolute -bottom-1 left-0 h-1 bg-[#D18F5C]/30 w-full rounded-full"
                            initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.9 }} />
                        </span>{' '}
                        Digital Landscape
                      </motion.h2>
                      <motion.p variants={fadeUp}
                        className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-10">
                        We build complete digital ecosystems powered by predictive analytics, smart automation, and data‑driven creativity — driving relentless revenue and trust for brands across India.
                      </motion.p>
                      <motion.div variants={stagger} className="flex flex-wrap gap-3">
                        {['100% Risk‑Free', 'No Contracts', 'Fast 24h Setup', 'AI‑Powered', '500+ Clients'].map((b, i) => (
                          <motion.span key={i} variants={fadeUp}
                            whileHover={{ scale: 1.07, backgroundColor: '#D18F5C', color: '#fff', borderColor: '#D18F5C' }}
                            className="font-display text-xs font-bold uppercase tracking-widest border-2 border-gray-300 px-5 py-2.5 rounded-full text-gray-700 bg-white transition-all duration-200 cursor-default select-none">
                            {b}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </section>

        {/* ── Bridge ── */}
        <SectionBridge dark />

        {/* ══════════════════════════════════════════════════
            SERVICES — White, Flip Cards
        ══════════════════════════════════════════════════ */}
        <section className="bg-[#0A0930] py-24">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-14">
              <motion.span variants={fadeUp}
                className="inline-block font-display text-[#D18F5C] text-xs tracking-[0.35em] uppercase font-bold mb-3">
                Services
              </motion.span>
              <div className="flex items-end justify-between flex-wrap gap-4">
                <motion.h2 variants={fadeUp} className="font-display text-white font-extrabold"
                  style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
                  What We Offer
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-sm font-display uppercase tracking-widest">
                  Hover cards to explore →
                </motion.p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <FlipCard
                    front={
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-[#12103D] flex flex-col border border-white/10 shadow-sm">
                        <div className="flex-1 flex items-center justify-center bg-white/5 p-8">
                          <img src={s.image} alt={s.title} className="max-h-48 w-auto object-contain brightness-95" />
                        </div>
                        <div className="p-6 flex items-center justify-between border-t border-white/10">
                          <div>
                            <span className="font-data text-[10px] font-bold text-[#D18F5C] tracking-[0.3em] uppercase">{s.tag}</span>
                            <h3 className="font-display text-white font-bold text-lg mt-0.5">{s.title}</h3>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-[#D18F5C]/10 border border-[#D18F5C]/25 flex items-center justify-center flex-shrink-0">
                            <FaArrowRight size={11} className="text-[#D18F5C]" />
                          </div>
                        </div>
                      </div>
                    }
                    back={
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-[#12103D] flex flex-col justify-between p-8 shadow-xl shadow-black/30 border border-white/10">
                        <div>
                          <span className="font-data text-[10px] font-bold text-[#F0C9A0]/70 tracking-[0.3em] uppercase">{s.tag}</span>
                          <h3 className="font-display text-white font-bold text-2xl mt-2 mb-4 leading-tight">{s.title}</h3>
                          <p className="text-white/80 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                        {s.href ? (
                          <a href={s.href} target="_blank" rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 bg-white text-[#B8714A] px-6 py-3 rounded-full font-display font-bold text-sm mt-6 w-fit hover:bg-gray-100 transition-colors shadow-lg">
                            {s.cta} <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (
                          <button onClick={() => setShowModal(true)}
                            className="group inline-flex items-center gap-2 bg-white text-[#B8714A] px-6 py-3 rounded-full font-display font-bold text-sm mt-6 w-fit hover:bg-gray-100 transition-colors shadow-lg">
                            {s.cta} <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        )}
                      </div>
                    }
                  />
                </motion.div>
              ))}

              {/* Ghost +more card */}
              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ y: -6 }}
                  className="h-[420px] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-5 group hover:border-[#D18F5C]/40 transition-all duration-300 bg-[#12103D]/20">
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 rounded-full bg-[#12103D] group-hover:bg-[#D18F5C] flex items-center justify-center transition-colors duration-300">
                    <span className="font-display text-2xl font-black text-white/50 group-hover:text-white leading-none">+</span>
                  </motion.div>
                  <div className="text-center px-8">
                    <p className="font-display font-bold text-white/70 group-hover:text-white transition-colors text-lg">More Services</p>
                    <p className="text-sm text-white/40 mt-1 leading-relaxed">Custom solutions for any business need</p>
                  </div>
                  <button onClick={() => setShowModal(true)}
                    className="font-display text-xs font-bold tracking-widest uppercase text-white/40 group-hover:text-[#D18F5C] transition-colors">
                    Get in touch →
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Bridge ── */}
        <SectionBridge />

        {/* ══════════════════════════════════════════════════
            PROCESS — Cream, horizontal stepper + 3D tilt cards
        ══════════════════════════════════════════════════ */}
        <section className="bg-[#FDFBF8] py-24 relative overflow-hidden">
          <div className="absolute left-6 top-6 font-display font-black leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(8rem,14vw,14rem)', color: 'rgba(7, 8, 38, 0.04)' }}>02</div>
          <div className="container mx-auto px-6 lg:px-16 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
              <motion.span variants={fadeUp}
                className="inline-block font-display text-[#D18F5C] text-xs tracking-[0.35em] uppercase font-bold mb-3">
                How We Work
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display text-[#0A0930] font-extrabold"
                style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
                Our <span className="text-[#D18F5C]">Process</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 text-base mt-3 max-w-xl mx-auto">
                Human-centered design from research to launch — every step informed by data.
              </motion.p>
            </motion.div>

            {/* Step number connector row */}
            <div className="hidden md:flex items-center justify-between mb-10 px-12">
              {uxSteps.map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white border-2 border-[#D18F5C] flex items-center justify-center flex-shrink-0 font-data font-bold text-[#D18F5C] shadow-md"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.25, type: 'spring', stiffness: 300 }}>
                    {i + 1}
                  </motion.div>
                  {i < uxSteps.length - 1 && <ProcessConnector />}
                </div>
              ))}
            </div>

            {/* Tilt cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid md:grid-cols-3 gap-6">
              {uxSteps.map((step, i) => (
                <TiltCard key={i}>
                  <motion.div variants={fadeUp}
                    className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow duration-300 sweep border border-gray-100">
                    <div className="bg-[#FDFBF8] h-56 flex items-center justify-center p-6 overflow-hidden">
                      <img src={step.image} alt={step.title}
                        className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-7">
                      <div className="inline-block font-data text-[10px] font-bold text-[#D18F5C] tracking-[0.3em] uppercase bg-[#D18F5C]/10 px-3 py-1 rounded-full mb-4">
                        Step 0{i + 1}
                      </div>
                      <h3 className="font-display text-gray-900 text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Bridge ── */}
        <SectionBridge dark />

        {/* ══════════════════════════════════════════════════
            FULL‑STACK — Deep Navy, cursor spotlight
        ══════════════════════════════════════════════════ */}
        <section
          ref={fsSpot.containerRef}
          onMouseMove={fsSpot.onMouseMove}
          onMouseLeave={fsSpot.onMouseLeave}
          className="bg-[#0A0930] py-28 relative overflow-hidden"
        >
          {/* bg canvas dots */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(217,159,154,0.12) 1.5px, transparent 1.5px)',
            backgroundSize: '38px 38px',
          }} />
          {/* cursor spotlight */}
          <div ref={fsSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
          {/* spinning rings */}
          <div className="absolute left-[-160px] bottom-[-160px] pointer-events-none">
            <div className="w-[500px] h-[500px] border border-[#F0C9A0]/10 rounded-full animate-spinSlow" />
            <div className="absolute inset-[80px] border border-[#F0C9A0]/10 rounded-full animate-spinSlowRev" />
          </div>

          <div className="container mx-auto px-6 lg:px-16 relative z-10">
            {/* Top — headline + image */}
            <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideL} className="flex-1">
                <div className="inline-flex items-center gap-2 glass text-white/80 px-4 py-2 rounded-full text-xs font-display font-bold tracking-widest uppercase mb-6">
                  <FaBrain size={11} /> Engineering Excellence
                </div>
                <h2 className="font-display text-white font-extrabold leading-[1.0] mb-5"
                  style={{ fontSize: 'clamp(2rem,4.5vw,3.8rem)' }}>
                  AI‑Integrated<br />Full‑Stack Workflow
                </h2>
                <p className="text-white/80 text-lg max-w-md mb-8 leading-relaxed font-light">
                  Modern digital solutions with seamless AI integrations tailored precisely to your business needs.
                </p>
                <Magnetic strength={0.25}>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                    onClick={() => setShowModal(true)}
                    className="sheen bg-white text-[#B8714A] px-9 py-3.5 rounded-full font-display font-bold text-sm shadow-xl hover:shadow-2xl transition-shadow">
                    Build Your Project →
                  </motion.button>
                </Magnetic>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideR} className="flex-1 w-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl transform scale-95" />
                  <img src="/image/fsdw.webp" alt="Full Stack" className="relative rounded-2xl shadow-2xl w-full animate-floatY" />
                </div>
              </motion.div>
            </div>

            {/* Phase cards — 3D tilt */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {fullstackSteps.map((step, i) => (
                <TiltCard key={i}>
                  <motion.div variants={fadeUp}
                    className="glass rounded-2xl p-7 text-center group hover:bg-white/15 transition-all duration-300 h-full">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-white/15 group-hover:bg-white flex items-center justify-center mb-5 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                      <img src={step.icon} alt={step.title}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="font-data text-[9px] font-bold text-white/50 tracking-[0.25em] uppercase mb-2">Phase 0{i + 1}</div>
                    <h4 className="font-display text-white font-bold text-base mb-2">{step.title}</h4>
                    <p className="text-white/75 text-xs leading-relaxed">{step.desc}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Bridge ── */}
        <SectionBridge />

        {/* ══════════════════════════════════════════════════
            QUICK CONNECT — White
        ══════════════════════════════════════════════════ */}
        <section className="bg-[#0A0930] py-20">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* Left gold bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D18F5C]" />
              {/* Watermark */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 font-display font-black leading-none pointer-events-none select-none"
                style={{ fontSize: '14rem', color: 'rgba(7, 8, 38, 0.04)' }}>?</div>
              <div className="p-12 md:p-16 relative z-10">
                <div className="max-w-lg">
                  <span className="inline-block font-display text-[#D18F5C] text-xs tracking-[0.35em] uppercase font-bold mb-4">Let's Talk</span>
                  <h2 className="font-display text-[#0A0930] font-extrabold mb-3"
                    style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)' }}>
                    Ready to transform your ideas into reality?
                  </h2>
                  <p className="text-gray-600 text-base mb-10">
                    Leave your number — our AI strategist calls back within 24 hours.
                  </p>
                  <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input type="tel" value={quickPhone} onChange={e => setQuickPhone(e.target.value)}
                      placeholder="+91 your phone number…"
                      className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 bg-[#FDFBF8] text-gray-800 placeholder:text-gray-400 text-sm font-display focus:outline-none focus:border-[#D18F5C] transition-colors"
                      required />
                    <Magnetic strength={0.2}>
                      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} type="submit"
                        className="bg-[#D18F5C] text-white px-8 py-4 rounded-xl font-display font-bold text-sm hover:bg-[#B8714A] transition-colors whitespace-nowrap shadow-lg">
                        {quickSubmitted ? '✅ Sent!' : 'Call Me Back'}
                      </motion.button>
                    </Magnetic>
                  </form>
                  <AnimatePresence>
                    {quickSubmitted && (
                      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mt-4 text-green-700 font-display font-semibold text-sm">
                        ✅ Thanks! We'll call you back shortly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Bridge ── */}
        <SectionBridge />

        {/* ══════════════════════════════════════════════════
            GALLERY — Cream
        ══════════════════════════════════════════════════ */}
        <section className="bg-[#FDFBF8] py-24">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
              <motion.span variants={fadeUp}
                className="inline-block font-display text-[#D18F5C] text-xs tracking-[0.35em] uppercase font-bold mb-3">
                Our Work
              </motion.span>
              <div className="flex items-end justify-between flex-wrap gap-4">
                <motion.h2 variants={fadeUp} className="font-display text-[#0A0930] font-extrabold"
                  style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
                  Projects for Beloved Clients
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-sm font-display">
                  Hover to preview →
                </motion.p>
              </div>
            </motion.div>

            {/* 3×2 grid — every cell fixed 280px tall, image covers it perfectly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryProjects.map((proj, idx) => (
                <motion.div key={proj.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: idx * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="gallery-item group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
                  style={{ height: 280 }}
                >
                  {/* Image fills the fixed-height cell with cover — no gaps, no bleed */}
                  <img
                    src={`/image/oa-${proj.id}.webp`}
                    alt={proj.label}
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                    onError={e => { e.currentTarget.src = '/image/oa-1.webp'; }}
                  />

                  {/* Category pill — always visible top-left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 font-display text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                      {proj.category}
                    </span>
                  </div>

                  {/* Navy hover overlay with project name */}
                  <div className="overlay">
                    <div className="overlay-text">
                      <p className="font-display text-white font-bold text-base leading-tight">{proj.label}</p>
                      <p className="font-display text-[#F0C9A0] text-xs mt-1 flex items-center gap-1">
                        View case study <FaArrowRight size={9} />
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bridge ── */}
        <SectionBridge dark />

        {/* ══════════════════════════════════════════════════
            ADS — White, split panel, cursor spotlight on navy side
        ══════════════════════════════════════════════════ */}
        <section className="bg-[#0A0930] py-24 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
              {/* Left — Navy */}
              <motion.div
                ref={adsSpot.containerRef}
                onMouseMove={adsSpot.onMouseMove}
                onMouseLeave={adsSpot.onMouseLeave}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideL}
                className="bg-[#0A0930] p-12 md:p-16 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(217,159,154,0.09) 1.5px, transparent 1.5px)',
                  backgroundSize: '32px 32px',
                }} />
                <div ref={adsSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
                <div className="absolute right-[-60px] top-[-60px] w-64 h-64 border border-[#F0C9A0]/10 rounded-full animate-spinSlow pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 glass text-white/80 px-4 py-1.5 rounded-full text-[10px] font-display font-bold tracking-[0.3em] uppercase mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D2C7] animate-pulse" /> Scaling Results
                  </div>
                  <h2 className="font-display text-white font-black leading-[1.0] mb-5"
                    style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
                    Experts in<br />Digital Advertising
                  </h2>
                  <p className="text-white/80 text-base leading-relaxed mb-10 max-w-sm font-light">
                    Maximize returns with data‑backed targeting, iterative creative testing, and precision bid management.
                  </p>
                  <div className="space-y-3 mb-10">
                    {[
                      { icon: '🎯', t: 'Targeted Campaigns', d: 'Precision audience modeling to capture intent.' },
                      { icon: '📈', t: '2000+ Campaigns', d: 'Proven framework scaled across industries.' },
                      { icon: '⚡', t: 'Real‑Time Tracking', d: 'Continuous ROAS optimization at every step.' },
                    ].map((item, i) => (
                      <motion.div key={i} whileHover={{ x: 6 }}
                        className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/10 transition-all duration-200">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <p className="font-display text-white font-bold text-sm">{item.t}</p>
                          <p className="text-white/70 text-xs mt-0.5">{item.d}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Magnetic strength={0.25}>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setShowModal(true)}
                      className="sheen group bg-white text-[#B8714A] px-8 py-3.5 rounded-full font-display font-bold text-sm inline-flex items-center gap-2 shadow-xl">
                      Scale My Returns
                      <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Magnetic>
                </div>
              </motion.div>

              {/* Right — Cream */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideR}
                className="bg-[#FDFBF8] p-12 md:p-16 flex flex-col justify-center gap-8 border-l border-gray-100">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img src="/image/era.webp" alt="Dashboard Analytics" className="w-full h-auto" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[{ n: 500, s: '+', l: 'Clients' }, { n: 2000, s: '+', l: 'Campaigns' }, { n: 99, s: '%', l: 'Satisfaction' }]
                    .map((st, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                        <div className="font-data text-2xl font-bold text-gray-900">
                          <CountUp end={st.n} suffix={st.s} />
                        </div>
                        <div className="font-display text-[10px] text-gray-500 uppercase tracking-widest mt-1">{st.l}</div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Bridge ── */}
        <SectionBridge />

        {/* ════════════════════════════════════════════════════════
                    PREMIUM FOOTER CTA
════════════════════════════════════════════════════════ */}
<section
  ref={footerSpot.containerRef}
  onMouseMove={footerSpot.onMouseMove}
  onMouseLeave={footerSpot.onMouseLeave}
  className="relative overflow-hidden bg-[#0A0930] py-24"
>
  {/* Cursor Glow */}
  <div
    ref={footerSpot.glowRef}
    className="absolute inset-0 pointer-events-none transition-all duration-200"
  />

  {/* Dotted Background */}
  <div
    className="absolute inset-0 opacity-30"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
      backgroundSize: "34px 34px",
    }}
  />

  {/* Decorative Circles */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[750px] h-[750px] rounded-full border border-white/5 animate-[spin_45s_linear_infinite]" />

    <div className="absolute w-[520px] h-[520px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite_reverse]" />
  </div>

  {/* Top Left Accent */}
  <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full border border-[#F0C9A0]/10" />

  {/* Bottom Right Accent */}
  <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full border border-[#F0C9A0]/10" />

  <div className="container mx-auto px-6 lg:px-16 relative z-10">

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="text-center"
    >
      {/* Subtitle */}
      <motion.span
        variants={fadeUp}
        className="inline-block uppercase tracking-[0.35em] text-white/60 text-xs font-semibold mb-6"
      >
        START TODAY
      </motion.span>

      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        className="font-display font-black text-white leading-tight mb-12"
        style={{
          fontSize: "clamp(2.3rem,5vw,4rem)",
        }}
      >
        Let's Build Something
        <br />
        Great Together
      </motion.h2>

      {/* Buttons */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap justify-center items-center gap-6"
      >
        {/* Get Started */}
        <Magnetic strength={0.25}>
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => setShowModal(true)}
            className="
              w-[235px]
              h-[60px]
              rounded-full
              bg-white
              text-[#9C6734]
              text-lg
              font-semibold
              shadow-[0_10px_30px_rgba(255,255,255,0.12)]
              transition-all
              duration-300
              hover:shadow-[0_20px_45px_rgba(255,255,255,0.18)]
            "
          >
            Get Started Free
          </motion.button>
        </Magnetic>

        {/* WhatsApp */}
        <Magnetic strength={0.20}>
          <motion.a
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{
              scale: 0.96,
            }}
            href="https://wa.me/917305821333"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-center
              w-[235px]
              h-[60px]
              rounded-full
              border
              border-white/20
              bg-gradient-to-b
              from-[#23284B]
              to-[#161B39]
              text-white
              text-lg
              font-semibold
              transition-all
              duration-300
              hover:border-[#F0C9A0]
              hover:text-[#F0C9A0]
              hover:shadow-[0_15px_40px_rgba(217,159,154,0.18)]
            "
          >
            Chat on WhatsApp
          </motion.a>
        </Magnetic>
      </motion.div>
    </motion.div>
  </div>
</section>

      </div>

      {/* ── Back to Top ─────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-[#D18F5C] text-white p-4 rounded-full shadow-xl z-40 hover:bg-[#B8714A] transition-colors">
            <FaChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
            <motion.div
              initial={{ scale: 0.88, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
              <button onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors font-bold text-sm">
                ✕
              </button>

              {/* Left — Navy */}
              <div className="bg-[#0A0930] text-white p-10 md:p-12 w-full md:w-[44%] flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(217,159,154,0.08) 1.5px, transparent 1.5px)',
                  backgroundSize: '28px 28px',
                }} />
                <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-52 h-52 border border-[#F0C9A0]/10 rounded-full animate-spinSlow pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-block glass text-white/80 px-3 py-1.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-6">
                    Why Choose Us
                  </span>
                  <h2 className="font-display text-3xl font-black mb-4 leading-tight">Choose Us to Grow Your Business</h2>
                  <p className="text-white/80 text-sm leading-relaxed mb-8">AI‑integrated intelligence that drives results for your brand in the digital world.</p>
                  <div className="space-y-3">
                    {[
                      { icon: <FaHeartbeat size={12} />, l: 'Results‑Driven Strategy' },
                      { icon: <FaLayerGroup size={12} />, l: 'Multi‑Platform Expertise' },
                      { icon: <FaSync size={12} />, l: 'Continuous AI Optimization' },
                    ].map((it, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white text-[#B8714A] px-4 py-3 rounded-full text-xs font-display font-bold shadow-sm">
                        {it.icon} {it.l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="p-10 md:p-12 w-full md:w-[56%] bg-white flex flex-col justify-center">
                <div className="mb-8">
                  <Image src="/image/logo.webp" alt="Vaave Digital" width={150} height={38} />
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <select name="service" value={formData.service} onChange={handleChange}
                    className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-[#D18F5C] text-gray-800 bg-transparent text-sm font-display transition-colors">
                    {serviceOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                  {(['name', 'contact'] as const).map(field => (
                    <input key={field} type={field === 'contact' ? 'tel' : 'text'} name={field}
                      placeholder={field === 'name' ? 'Your Name' : 'Contact Number'}
                      value={formData[field]} onChange={handleChange}
                      className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-[#D18F5C] text-gray-800 placeholder:text-gray-400 text-sm font-display transition-colors"
                      required />
                  ))}
                  <textarea name="message" placeholder="Message / Requirements" value={formData.message}
                    onChange={handleChange} rows={2}
                    className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-[#D18F5C] text-gray-800 placeholder:text-gray-400 text-sm font-display resize-none transition-colors" />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                    className="w-full bg-[#D18F5C] text-white py-4 rounded-full font-display font-bold text-sm hover:bg-[#B8714A] transition-colors shadow-lg">
                    Submit & Get Started    →
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
