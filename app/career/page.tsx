// app/career/page.tsx – Restyled to match the Vaave Digital brand system (services page)
// Content, form fields, job data, and submission logic are unchanged.
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  motion, AnimatePresence, Variants,
  useInView, useMotionValue, useSpring,
} from 'framer-motion';
import Image from 'next/image';
import {
  FaWhatsapp, FaRocket, FaChartLine, FaUsers, FaPhoneAlt, FaMapMarkerAlt,
  FaEnvelope, FaClock, FaCheckCircle, FaArrowRight, FaPaperPlane, FaUpload,
  FaChevronDown,
} from 'react-icons/fa';

/* ══════════════════════════════════════════════════════════
   VAAVE DIGITAL — BRAND PALETTE (shared with services page)
   Navy      #0A0930  Navy-Deep #12103D  Gold #D18F5C
   Gold-D    #B8714A  Gold-L    #F0C9A0  Cream #FDFBF8
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
        ry.set((px - 0.5) * 12);
        rx.set(-(py - 0.5) * 12);
        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(220px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 60%)`;
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

/* ══════════════════════════════════════════════════════════
   APPLICATION MODAL — same fields/logic, brand-system styling
══════════════════════════════════════════════════════════ */
function ApplicationModal({ isOpen, onClose, jobTitle, onSubmit }: any) {
  const [form, setForm] = useState({
    name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', cover: '', resume: null as File | null
  });
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, resume: e.target.files[0] });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp cannot send files, so we pass a note
    onSubmit({ ...form, resume: form.resume ? form.resume.name : 'Not uploaded' });
    onClose();
    setForm({ name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', cover: '', resume: null });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors font-bold text-sm">
          &times;
        </button>

        {/* Left — Navy info panel */}
        <div className="bg-[#0A0930] text-white p-10 md:p-12 w-full md:w-[38%] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(217,159,154,0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }} />
          <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-52 h-52 border border-[#F0C9A0]/10 rounded-full animate-[spin_18s_linear_infinite] pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 px-3 py-1.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-6">
              Apply Now
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-black mb-3 leading-tight">Apply for {jobTitle || 'this position'}</h3>
            <p className="text-white/80 text-sm leading-relaxed">We'll respond on WhatsApp within 24h</p>
          </div>
        </div>

        {/* Right — Form */}
        <div className="p-6 md:p-10 w-full md:w-[62%] bg-white max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Full Name</label><input type="text" name="name" placeholder="Your full name" required value={form.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Date of Birth</label><input type="date" name="dob" required value={form.dob} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Gender</label><select name="gender" required value={form.gender} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition"><option value="">Select Gender</option><option>Female</option><option>Male</option><option>Other</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Phone Number</label><input type="tel" name="phone" placeholder="+91 12345 67890" required value={form.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Email Address</label><input type="email" name="email" placeholder="you@example.com" required value={form.email} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Job Title</label><select name="job" required value={form.job} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition"><option value="">Select Job Title</option><option>Social Media Manager</option><option>Social Media Intern</option><option>Telecaller</option></select></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Years of Experience</label><select name="experience" required value={form.experience} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition"><option value="">Select Experience</option><option>0-1</option><option>1-2</option><option>2-3</option><option>3-4</option><option>4-5</option><option>5+</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Upload Resume (PDF/DOC)</label><div className="flex items-center gap-2"><input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FDFBF8] file:text-[#D18F5C] hover:file:bg-[#F0C9A0]/30 transition-colors" /></div></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Cover Letter (optional)</label><textarea name="cover" rows={3} placeholder="Tell us why you'd be a great fit..." value={form.cover} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition"></textarea></div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" className="w-full bg-gradient-to-r from-[#25D366] to-green-600 hover:shadow-xl text-white font-display font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-lg"><FaWhatsapp /> Send Application via WhatsApp</motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN CAREER PAGE — same data, handlers & fields, brand styling
══════════════════════════════════════════════════════════ */
export default function CareerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const opsSpot = useSpotlight();
  const formSpot = useSpotlight();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleWhatsAppSubmit = (formData: any) => {
    const whatsappNumber = '917305821333';
    let msg = `Rainbow Media Job Application%0A%0A*Position:* ${formData.job}%0A*Name:* ${formData.name}%0A*DOB:* ${formData.dob}%0A*Gender:* ${formData.gender}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Experience:* ${formData.experience} years%0A*Cover Letter:* ${formData.cover || 'Not provided'}%0A%0A📧 Resume file: ${formData.resume ? formData.resume : 'Send via email to rmedia1123.info@gmail.com'}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const openModalForJob = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setModalOpen(true);
  };

  const handleMainFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModalForJob('General Application');
  };

  const benefits = [
    { icon: FaRocket, title: 'Innovative Environment', desc: 'Work on creative campaigns with a team that encourages bold ideas and fast experimentation.' },
    { icon: FaChartLine, title: 'Career Growth', desc: 'Develop practical skills through real projects and clear growth opportunities.' },
    { icon: FaUsers, title: 'Supportive Team', desc: 'Collaborate with approachable teammates who value communication and learning.' },
  ];

  const jobs = [
    {
      title: 'Social Media Manager',
      image: '/image/carimage3.webp',
      desc: 'Manage multi‑platform social media campaigns, analyze performance, and grow engagement.',
      location: 'Chennai',
      experience: '3+ years',
      skills: ['Strategy', 'Analytics', 'Content', 'Team Management'],
      walkin: '11:00 AM - 1:00 PM',
      contact: '+91 73058 21333'
    },
    {
      title: 'Social Media Intern',
      image: '/image/carimage1.webp',
      desc: 'Assist in creating content, scheduling posts, and supporting the marketing team.',
      location: 'Chennai',
      experience: 'Freshers/0+ years',
      skills: ['Social Media', 'Content Writing', 'Communication', 'Quick Learning'],
      walkin: '11:00 AM - 1:00 PM',
      contact: '+91 73058 21333'
    },
    {
      title: 'Telecaller',
      image: '/image/carimage2.webp',
      desc: 'Engage with potential clients, explain services clearly, and schedule consultations.',
      location: 'Chennai',
      experience: 'Freshers/0+ years',
      skills: ['Communication', 'Active Listening', 'Problem-Solving', 'Persuasion'],
      walkin: '11:00 AM - 1:00 PM',
      contact: '+91 73058 21333'
    }
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

        @media (prefers-reduced-motion: reduce) {
          .animate-spinSlow, .animate-spinSlowRev { animation: none !important; }
        }
      `}</style>

      <ScrollProgressBar />
      <GrainOverlay />

      <div className="bg-white text-gray-900 min-h-screen">

        {/* ══════════════════════════════════════════════════
            HERO — Deep Navy + Neural Constellation signature
        ══════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative bg-gradient-to-b from-[#0A0930] to-[#12103D] overflow-hidden">
          <NeuralHeroCanvas />

          <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[480px] h-[480px] border border-[#F0C9A0]/10 rounded-full animate-spinSlow" />
            <div className="absolute inset-[70px] border border-[#F0C9A0]/10 rounded-full animate-spinSlowRev" />
          </div>

          <div className="absolute top-6 left-6 w-14 h-14 border-t-2 border-l-2 border-[#F0C9A0]/25 rounded-tl-lg" />
          <div className="absolute top-6 right-6 w-14 h-14 border-t-2 border-r-2 border-[#F0C9A0]/25 rounded-tr-lg" />
          <div className="absolute bottom-6 left-6 w-14 h-14 border-b-2 border-l-2 border-[#F0C9A0]/25 rounded-bl-lg" />
          <div className="absolute bottom-6 right-6 w-14 h-14 border-b-2 border-r-2 border-[#F0C9A0]/25 rounded-br-lg" />

          <div className="container mx-auto px-6 lg:px-16 relative z-10 py-20 md:py-28">
            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={stagger}
              className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

              <div className="flex-1 text-center lg:text-left">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass text-white/80 px-4 py-2 rounded-full text-sm font-display font-semibold mb-6">
                  🚀 Careers at Rainbow Media
                </motion.div>
                <motion.h1 variants={fadeUp}
                  className="font-display text-white font-black leading-[1.05] mb-6"
                  style={{ fontSize: 'clamp(2.6rem,6.5vw,5.5rem)', textShadow: '0 2px 0 rgba(217,159,154,0.15), 0 20px 60px rgba(0,0,0,0.45)' }}>
                  We make <br />
                  <span className="text-[#F0C9A0] relative inline-block">
                    creative
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                      <path d="M0 4 L200 4" stroke="#D18F5C" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4"/>
                    </svg>
                  </span> <br />
                  things everyday
                </motion.h1>
                <motion.p variants={fadeUp} className="text-white/80 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8 font-light">
                  Join our team of innovators and digital marketing experts.
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Magnetic>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                      onClick={() => openModalForJob('General Application')}
                      className="sheen group bg-white text-[#B8714A] px-7 py-3 rounded-full font-display font-bold text-base shadow-2xl shadow-black/40 flex items-center gap-2">
                      <FaWhatsapp /> Apply on WhatsApp
                      <FaArrowRight className="group-hover:translate-x-1 transition" size={13} />
                    </motion.button>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                      href="#opportunities"
                      className="glass text-white px-7 py-3 rounded-full font-display font-bold text-base hover:bg-white hover:text-[#B8714A] transition-all duration-300">
                      View Openings
                    </motion.a>
                  </Magnetic>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="flex-1 flex justify-center lg:justify-end w-full">
                <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl">
                  <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl transform scale-95" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <Image src="/image/career.png" alt="Creative team" width={1000} height={660} className="w-full h-auto object-cover" priority />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openModalForJob('General Application')}
                    className="absolute -bottom-3 -right-3 bg-gradient-to-r from-[#25D366] to-green-600 text-white p-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer hover:shadow-xl transition"
                  >
                    <FaWhatsapp className="text-lg" /><span className="font-display font-semibold text-sm">Join our team</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <SectionBridge />

        {/* ══════════════════════════════════════════════════
            WHY CHOOSE RAINBOW MEDIA — Cream, tilt cards
        ══════════════════════════════════════════════════ */}
        <section className="bg-[#FDFBF8] py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
              className="text-center max-w-2xl mx-auto mb-14">
              <motion.span variants={fadeUp} className="inline-block font-display text-[#B8714A] text-xs tracking-[0.35em] uppercase font-bold mb-4">
                Why Us
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display font-extrabold text-[#0A0930]" style={{ fontSize: 'clamp(1.9rem,4.2vw,3rem)' }}>
                Why Choose <span className="text-[#D18F5C]">Rainbow Media</span>?
              </motion.h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <TiltCard>
                    <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 sweep h-full">
                      <div className="w-16 h-16 rounded-xl bg-[#FDFBF8] border border-[#D18F5C]/20 flex items-center justify-center text-3xl text-[#D18F5C] mb-6 group-hover:bg-[#D18F5C] group-hover:text-white transition-colors duration-300">
                        <benefit.icon />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <SectionBridge dark />

        {/* ══════════════════════════════════════════════════
            CURRENT OPPORTUNITIES — Navy
        ══════════════════════════════════════════════════ */}
        <section
          id="opportunities"
          ref={opsSpot.containerRef}
          onMouseMove={opsSpot.onMouseMove}
          onMouseLeave={opsSpot.onMouseLeave}
          className="bg-[#0A0930] py-24 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(217,159,154,0.1) 1.5px, transparent 1.5px)',
            backgroundSize: '38px 38px',
          }} />
          <div ref={opsSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
          <div className="absolute left-[-160px] bottom-[-160px] pointer-events-none">
            <div className="w-[420px] h-[420px] border border-[#F0C9A0]/10 rounded-full animate-spinSlow" />
          </div>

          <div className="container mx-auto px-6 lg:px-16 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
              className="text-center max-w-3xl mx-auto mb-16">
              <motion.span variants={fadeUp} className="inline-block font-display text-[#D18F5C] text-xs tracking-[0.35em] uppercase font-bold mb-4">
                Open Roles
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display font-extrabold text-white mb-3" style={{ fontSize: 'clamp(1.9rem,4.2vw,3rem)' }}>
                Current Opportunities
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/70 text-base">
                We're always looking for talented individuals to join our team.
              </motion.p>
            </motion.div>

            <div className="space-y-10 max-w-6xl mx-auto">
              {jobs.map((job, idx) => (
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                >
                  <TiltCard>
                    <div className="group bg-[#12103D] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10 flex flex-col md:flex-row md:items-stretch">
                      <div className="md:w-1/2 bg-white/5 flex items-center justify-center md:self-stretch overflow-hidden">
                        <div className="relative w-full h-full min-h-[260px] md:min-h-[300px]">
                          <Image
                            src={job.image}
                            alt={job.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-between md:self-stretch">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="inline-flex items-center gap-1.5 bg-[#D18F5C]/10 text-[#F0C9A0] text-xs font-display font-semibold px-3 py-1 rounded-full">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D18F5C] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D18F5C]"></span>
                              </span>
                              Hiring Now
                            </span>
                            <span className="text-xs text-white/40 font-data">{job.experience}</span>
                          </div>
                          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-3 group-hover:text-[#F0C9A0] transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-white/70 text-sm md:text-base mb-5 leading-relaxed">{job.desc}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {job.skills.map((skill) => (
                              <span key={skill} className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-[#D18F5C]/20 hover:text-[#F0C9A0] transition-colors cursor-default font-display">
                                <FaCheckCircle className="text-[10px]" /> {skill}
                              </span>
                            ))}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-white/70 mb-8 p-4 bg-white/5 rounded-xl font-data">
                            <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#D18F5C] text-base" /> {job.location}</div>
                            <div className="flex items-center gap-2"><FaClock className="text-[#D18F5C] text-base" /> Walk-in: {job.walkin}</div>
                            <div className="flex items-center gap-2"><FaPhoneAlt className="text-[#D18F5C] text-base" /> {job.contact}</div>
                          </div>
                        </div>
                        <Magnetic strength={0.2}>
                          <motion.button
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            onClick={() => openModalForJob(job.title)}
                            className="sheen inline-flex items-center justify-center gap-2 bg-white text-[#B8714A] font-display font-bold px-6 py-3 rounded-full transition-all duration-300 w-fit shadow-lg"
                          >
                            <FaPaperPlane className="text-sm" /> Apply Now
                            <FaArrowRight className="text-sm" />
                          </motion.button>
                        </Magnetic>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionBridge />

        {/* ══════════════════════════════════════════════════
            APPLICATION FORM — Navy w/ floating white card
        ══════════════════════════════════════════════════ */}
        <section
          id="applyform"
          ref={formSpot.containerRef}
          onMouseMove={formSpot.onMouseMove}
          onMouseLeave={formSpot.onMouseLeave}
          className="bg-[#0A0930] py-20 relative overflow-hidden"
        >
          <div ref={formSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
          <div className="container mx-auto px-6 lg:px-16 relative z-10">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
              <div className="lg:w-2/5 bg-gradient-to-br from-[#D18F5C] to-[#B8714A] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1.5px, transparent 1.5px)',
                  backgroundSize: '28px 28px',
                }} />
                <div className="relative z-10">
                  <h2 className="font-display text-3xl font-black mb-4">Join Our Team</h2>
                  <p className="text-white/90 mb-6 text-sm leading-relaxed">Fill the application below and we'll reach out on WhatsApp within 24 hours.</p>
                  <div className="space-y-3 text-sm font-display">
                    <div className="flex items-center gap-2"><FaMapMarkerAlt /> Rainbow Media Office, Guindy</div>
                    <div className="flex items-center gap-2"><FaClock /> 11:00 AM – 1:00 PM (Mon-Fri)</div>
                    <div className="flex items-center gap-2"><FaPhoneAlt /> +91 73058 21333</div>
                    <div className="flex items-center gap-2"><FaEnvelope /> rmedia1123.info@gmail.com</div>
                  </div>
                </div>
                <div className="relative z-10 mt-6 pt-4 border-t border-white/20">
                  <div className="flex -space-x-2 overflow-hidden">
                    {['👩‍💻', '👨‍🎨', '🧑‍💼', '👩‍🔧'].map((emoji, i) => <div key={i} className="inline-block h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-lg">{emoji}</div>)}
                  </div>
                  <p className="text-xs text-white/70 mt-3 font-display">Join 50+ creative professionals</p>
                </div>
              </div>
              <div className="lg:w-3/5 bg-white p-8 md:p-10">
                <form onSubmit={handleMainFormSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="text" placeholder="Full Name" className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition" required />
                    <input type="date" placeholder="Date of Birth" className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <select className="w-full p-3.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition"><option>Select Gender</option><option>Female</option><option>Male</option><option>Other</option></select>
                    <input type="tel" placeholder="Phone Number" className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="email" placeholder="Email Address" className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition" required />
                    <select className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition"><option>Select Job Title</option><option>Social Media Manager</option><option>Social Media Intern</option><option>Telecaller</option></select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <select className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition"><option>Years of Experience</option><option>0-1</option><option>1-2</option><option>2-3</option><option>3-4</option><option>4-5</option><option>5+</option></select>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 bg-gray-50 rounded-xl p-3 text-sm text-gray-500 border border-gray-200 flex items-center gap-2 cursor-pointer hover:bg-[#FDFBF8] transition">
                        <FaUpload className="text-[#D18F5C]" /> Upload Resume
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => e.target.files && setUploadedFile(e.target.files[0])} />
                      </label>
                      {uploadedFile && <span className="text-xs text-green-600 truncate w-32">{uploadedFile.name}</span>}
                    </div>
                  </div>
                  <textarea rows={3} placeholder="Cover Letter (optional)" className="w-full p-3.5 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#D18F5C] focus:border-[#D18F5C] transition"></textarea>
                  <Magnetic strength={0.15}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" className="sheen w-full bg-gradient-to-r from-[#D18F5C] to-[#B8714A] hover:shadow-xl text-white font-display font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 group text-lg">Submit Application <FaPaperPlane className="group-hover:translate-x-1 transition" /></motion.button>
                  </Magnetic>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            WALK-IN BANNER — Gold gradient
        ══════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-r from-[#D18F5C] to-[#B8714A] text-white py-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1.5px, transparent 1.5px)',
            backgroundSize: '30px 30px',
          }} />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h3 className="font-display text-2xl font-bold mb-2">Direct Walk-in Interviews</h3>
            <p className="text-white/90 text-base mb-4 font-display">📍 Rainbow Media Office, Guindy | 11:00 AM – 1:00 PM (Mon-Fri)</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+917305821333" className="flex items-center gap-2 glass hover:bg-white/20 px-5 py-2.5 rounded-full transition font-display font-semibold"><FaPhoneAlt /> +91 73058 21333</a>
              <a href="mailto:rmedia1123.info@gmail.com" className="flex items-center gap-2 glass hover:bg-white/20 px-5 py-2.5 rounded-full transition font-display font-semibold"><FaEnvelope /> rmedia1123.info@gmail.com</a>
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
              className="fixed bottom-5 right-5 z-40 bg-[#D18F5C] text-white p-4 rounded-full shadow-xl hover:bg-[#B8714A] transition-all font-display font-bold"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>

        {/* ========== MODAL ========== */}
        <AnimatePresence>
          {modalOpen && (
            <ApplicationModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              jobTitle={selectedJob}
              onSubmit={handleWhatsAppSubmit}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}