// app/career/page.tsx – Restyled to match the Vaave Digital brand system (services page)
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  motion, AnimatePresence, Variants,
  useInView, useMotionValue, useSpring,
} from 'framer-motion';
import Image from 'next/image';
import {
  FaWhatsapp, FaRocket, FaChartLine, FaUsers, FaPhoneAlt,
  FaEnvelope, FaCheckCircle, FaArrowRight, FaBrain, FaClock, FaGraduationCap, FaLightbulb,
} from 'react-icons/fa';
import Opportunities from '@/components/career/Opportunities';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
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
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000] bg-gradient-to-r from-[#9C5B5A] via-[#E0A36A] to-[#EFD3C9]"
    />
  );
}

/* ── Magnetic CTA wrapper ── */
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

/* ── 3D TILT CARD ── */
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

/* ── Application Modal ── */
function ApplicationModal({ isOpen, onClose, jobTitle, onSubmit }: any) {
  const [form, setForm] = useState({
    name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', portfolio: '', cover: ''
  });
  useEffect(() => {
    setForm(f => ({ ...f, job: jobTitle || '' }));
  }, [jobTitle]);
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
    setForm({ name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', portfolio: '', cover: '' });
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

        {/* Left info panel */}
        <div className="bg-[#050720] text-white p-10 md:p-12 w-full md:w-[38%] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,149,108,0.2) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }} />
          <div className="relative z-10">
            <span className="inline-block bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-3 py-1.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-6">
              Apply Now
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-black mb-3 leading-tight text-white">Apply for {jobTitle || 'this position'}</h3>
            <p className="text-[#acabcb] text-sm leading-relaxed font-medium">We'll respond on WhatsApp within 24h</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-6 md:p-10 w-full md:w-[62%] bg-white max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Full Name</label><input type="text" name="name" placeholder="Your full name" required value={form.name} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Date of Birth</label><input type="date" name="dob" required value={form.dob} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Gender</label><select name="gender" required value={form.gender} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm"><option value="">Select Gender</option><option>Female</option><option>Male</option><option>Other</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Phone Number</label><input type="tel" name="phone" placeholder="+91 12345 67890" required value={form.phone} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Email Address</label><input type="email" name="email" placeholder="you@example.com" required value={form.email} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Job Title</label><select name="job" required value={form.job} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm"><option value="">Select Job Title</option><option>Social Media Manager</option><option>Creative Designer</option><option>Video Editor</option><option>Ads Manager</option><option>Social Media Intern</option><option>Telecaller</option></select></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Years of Experience</label><select name="experience" required value={form.experience} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm"><option value="">Select Experience</option><option>0-1</option><option>1-2</option><option>2-3</option><option>3-4</option><option>4-5</option><option>5+</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Portfolio / Work Link (optional)</label><input type="url" name="portfolio" placeholder="https://myportfolio.com or Drive link" value={form.portfolio} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Cover Letter (optional)</label><textarea name="cover" rows={3} placeholder="Tell us why you'd be a great fit..." value={form.cover} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm"></textarea></div>
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg font-display font-black py-3.5 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 text-base shadow-lg"><FaWhatsapp className="text-lg" /> Send Application via WhatsApp</motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function CareerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleWhatsAppSubmit = (formData: any) => {
    const whatsappNumber = '917305821333';
    const lines = [
      `Hi! I am interested in applying for the ${formData.job} role at Vaave Digital. Here are my details:`,
      '',
      `Position: ${formData.job}`,
      `Name: ${formData.name}`,
      `Date of Birth: ${formData.dob}`,
      `Gender: ${formData.gender}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      `Experience: ${formData.experience}`,
      `Portfolio / Work Link: ${formData.portfolio || 'Not provided'}`,
      `Cover Letter: ${formData.cover || 'Not provided'}`
    ];
    const message = lines.join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openModalForJob = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setModalOpen(true);
  };

  const benefits = [
    {
      icon: FaRocket,
      title: 'Work on Exciting Projects',
      desc: 'Build high-impact digital solutions, dynamic brand campaigns, and creative work that makes a real difference.',
    },
    {
      icon: FaBrain,
      title: 'Learn AI-Powered Technologies',
      desc: 'Gain hands-on expertise with cutting-edge AI tools, automated workflows, and next-generation digital innovations.',
    },
    {
      icon: FaUsers,
      title: 'Collaborative Culture',
      desc: 'Work alongside supportive, passionate teammates in an inclusive environment driven by teamwork and shared goals.',
    },
    {
      icon: FaChartLine,
      title: 'Growth Opportunities',
      desc: 'Fast-track your career with clear growth pathways, mentorship, and leadership advancement opportunities.',
    },
    {
      icon: FaClock,
      title: 'Flexible Work Environment',
      desc: 'Enjoy an adaptable, modern work structure that respects work-life balance and encourages autonomy.',
    },
    {
      icon: FaGraduationCap,
      title: 'Continuous Learning',
      desc: 'Expand your skill set through ongoing workshops, industry certifications, and regular knowledge sharing.',
    },
    {
      icon: FaLightbulb,
      title: 'Innovation-First Mindset',
      desc: 'Challenge the status quo, experiment with bold ideas, and help pioneer futuristic digital strategies.',
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes spinSlow    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinSlowRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        .animate-spinSlow    { animation: spinSlow 18s linear infinite; }
        .animate-spinSlowRev { animation: spinSlowRev 24s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-spinSlow, .animate-spinSlowRev { animation: none !important; }
        }
      `}</style>

      <ScrollProgressBar />
      <GrainOverlay />

      <div className="bg-white text-gray-900 min-h-screen">

        {/* HERO */}
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
                      onClick={() => openModalForJob('General Application')}
                      className="bg-gradient-rosegold text-[#020215] px-7 py-3.5 rounded-full font-display font-black text-sm md:text-base shadow-2xl flex items-center gap-2 transition-colors duration-300">
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
                    onClick={() => openModalForJob('General Application')}
                    className="absolute -bottom-3 -right-3 bg-gradient-rosegold text-[#020215] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer font-display font-bold text-xs sm:text-sm"
                  >
                    <FaWhatsapp className="text-[#020215] text-lg" /><span>Join our team</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE VAAVE DIGITAL */}
        <section className="bg-white py-12 md:py-24 relative overflow-hidden border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
              className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <motion.span variants={fadeUp} className="inline-block font-display text-[#050720] text-xs tracking-[0.35em] uppercase font-extrabold mb-3">
                Why Us
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl lg:text-[50px] font-black tracking-tight bg-gradient-to-r from-[#C9956C] via-[#EFD3C9] to-[#C9956C] bg-clip-text text-transparent">
                Why Choose Vaave Digital?
              </motion.h2>
              <motion.div variants={fadeUp} className="w-14 h-1 bg-gradient-to-r from-[#C9956C] to-[#EFD3C9] mx-auto mt-4 rounded-full" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
              {benefits.map((benefit, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} className="h-full">
                  <div className="relative bg-[#050720] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-800 h-full flex flex-col justify-between hover:border-[#C9956C]/40 transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C9956C]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#C9956C]/30 flex items-center justify-center text-lg sm:text-2xl text-[#C9956C] mb-3 sm:mb-6 transition-colors duration-300">
                        <benefit.icon />
                      </div>
                      <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#C9956C] transition-colors duration-300">{benefit.title}</h3>
                      <p className="text-[#acabcb] text-xs sm:text-sm leading-relaxed font-medium">{benefit.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Opportunities onApply={openModalForJob} />

        {/* WALK-IN BANNER */}
        <div className="bg-[#050720] text-white py-14 relative overflow-hidden border-t border-slate-800/80">
          {/* Rose Gold Radial Glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(201,149,108,0.15)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,149,108,0.25) 1.5px, transparent 1.5px)',
            backgroundSize: '30px 30px',
          }} />
          <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
            <span className="inline-block bg-[#C9956C]/15 text-[#C9956C] border border-[#C9956C]/30 px-3.5 py-1 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-4">
              Direct Walk-ins
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r from-[#C9956C] via-[#EFD3C9] to-[#C9956C] bg-clip-text text-transparent">
              Direct Walk-in Interviews
            </h3>
            <p className="text-[#acabcb] text-base mb-8 font-medium">📍 Vaave Digital Office, Guindy, Chennai | 11:00 AM – 1:00 PM (Mon-Fri)</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+917305821333" className="flex items-center gap-2.5 bg-gradient-rosegold hover-bg-gradient-rosegold text-[#050720] px-7 py-3.5 rounded-full transition-all font-display font-black text-sm shadow-lg shadow-[#C9956C]/20">
                <FaPhoneAlt className="text-[#050720]" /> +91 73058 21333
              </a>
              <a href="mailto:info@vaavedigital.com" className="flex items-center gap-2.5 bg-gradient-rosegold hover-bg-gradient-rosegold text-[#050720] px-7 py-3.5 rounded-full transition-all font-display font-black text-sm shadow-lg shadow-[#C9956C]/20">
                <FaEnvelope className="text-[#050720]" /> info@vaavedigital.com
              </a>
            </div>
          </div>
        </div>

        {/* BACK TO TOP */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-5 right-5 z-40 bg-[#E0A36A] text-white p-4 rounded-full shadow-xl hover:bg-[#9C5B5A] transition-all font-display font-bold"
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>

        {/* MODAL */}
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
