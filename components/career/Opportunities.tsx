'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaArrowRight, FaPaperPlane } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

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

const jobs = [
  {
    title: 'Social Media Intern',
    image: '/image/carimage1.webp',
    desc: 'Assist in creating content, scheduling posts, and supporting the marketing team.',
    location: 'Chennai',
    experience: 'Freshers/0+ years',
    skills: ['Social Media', 'Content Writing', 'Communication', 'Quick Learning'],
    walkin: '11:00 AM - 5:00 PM',
    contact: '+91 73058 21333'
  },
  {
    title: 'Telecaller',
    image: '/image/carimage2.webp',
    desc: 'Engage with potential clients, explain services clearly, and schedule consultations.',
    location: 'Chennai',
    experience: 'Freshers/0+ years',
    skills: ['Communication', 'Active Listening', 'Problem-Solving', 'Persuasion'],
    walkin: '11:00 AM - 5:00 PM',
    contact: '+91 73058 21333'
  },
  {
    title: 'Social Media Manager',
    image: '/image/carimage3.webp',
    desc: 'Manage multi‑platform social media campaigns, analyze performance, and grow engagement.',
    location: 'Chennai',
    experience: '3+ years',
    skills: ['Strategy', 'Analytics', 'Content', 'Team Management'],
    walkin: '11:00 AM - 5:00 PM',
    contact: '+91 73058 21333'
  },
  {
    title: 'Creative Designer',
    image: '/image/uxui-1.webp',
    desc: 'Design engaging brand assets, social media graphics, banners, and promotional visual content.',
    location: 'Chennai',
    experience: '1+ years',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'Branding'],
    walkin: '11:00 AM - 5:00 PM',
    contact: '+91 73058 21333'
  },
  {
    title: 'Video Editor',
    image: '/image/video-editor.jpg',
    desc: 'Create high-impact marketing videos, reels, motion graphics, and engaging social edits.',
    location: 'Chennai',
    experience: '1+ years',
    skills: ['Premiere Pro', 'After Effects', 'Reels Editing', 'Storytelling'],
    walkin: '11:00 AM - 5:00 PM',
    contact: '+91 73058 21333'
  },
  {
    title: 'Ads Manager',
    image: '/image/ads-manager.jpg',
    desc: 'Plan, run, and optimize targeted Meta and Google Ad campaigns for maximum growth & ROI.',
    location: 'Chennai',
    experience: '2+ years',
    skills: ['Meta Ads', 'Google Ads', 'PPC Strategy', 'ROI Optimization'],
    walkin: '11:00 AM - 5:00 PM',
    contact: '+91 73058 21333'
  }
];

interface OpportunitiesProps {
  onApply: (jobTitle: string) => void;
}

export default function Opportunities({ onApply }: OpportunitiesProps) {
  const opsSpot = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = opsSpot.current;
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

  return (
    <section
      id="opportunities"
      ref={opsSpot}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-slate-100"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{
        backgroundImage: 'radial-gradient(circle, rgba(201,149,108,0.15) 1.5px, transparent 1.5px)',
        backgroundSize: '38px 38px',
      }} />
      <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
          className="text-center max-w-3xl mx-auto mb-16">
          <motion.span variants={fadeUp} className="inline-block font-display text-[#050720] text-xs tracking-[0.35em] uppercase font-extrabold mb-3">
            Open Roles
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl lg:text-[50px] font-black tracking-tight bg-gradient-to-r from-[#a86538] via-[#C9956C] to-[#e8c3b5] bg-clip-text text-transparent">
            Current Opportunities
          </motion.h2>
          <motion.div variants={fadeUp} className="w-14 h-1 bg-gradient-to-r from-[#C9956C] to-[#a86538] mx-auto mt-4 rounded-full" />
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
                <div className="group bg-[#050720] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-800 flex flex-col md:flex-row md:items-stretch">
                  <div className="md:w-1/2 bg-white/5 flex items-center justify-center md:self-stretch overflow-hidden relative group/img">
                    <div className="relative w-full h-full min-h-[260px] md:min-h-[300px] overflow-hidden">
                      <Image
                        src={job.image}
                        alt={job.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                        loading="lazy"
                      />
                      {/* Subtle hover overlay glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050720]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-between md:self-stretch">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1.5 bg-peachAccent/10 text-peachAccent text-xs font-display font-bold px-3 py-1 rounded-full border border-peachAccent/20">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-peachAccent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-peachAccent"></span>
                          </span>
                          Hiring Now
                        </span>
                        <span className="text-xs text-[#acabcb]/70 font-semibold">{job.experience}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-3 group-hover:text-peachAccent transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-[#acabcb] text-sm md:text-base mb-5 leading-relaxed font-medium">{job.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.skills.map((skill) => (
                          <span key={skill} className="bg-white/5 text-white/80 border border-white/10 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 hover:border-peachAccent/30 transition-colors cursor-default font-display font-medium">
                            <FaCheckCircle className="text-peachAccent text-[10px]" /> {skill}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#acabcb] mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 font-medium"><FaMapMarkerAlt className="text-peachAccent text-sm" /> {job.location}</div>
                        <div className="flex items-center gap-2 font-medium"><FaClock className="text-peachAccent text-sm" /> Walk-in: {job.walkin}</div>
                        <div className="flex items-center gap-2 font-medium"><FaPhoneAlt className="text-peachAccent text-sm" /> {job.contact}</div>
                      </div>
                    </div>
                    <Magnetic strength={0.2}>
                      <button
                        onClick={() => onApply(job.title)}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg font-display font-black text-sm px-7 py-3.5 rounded-full transition-all duration-300 w-fit shadow-lg"
                      >
                        <FaPaperPlane className="text-xs" /> Apply Now
                        <FaArrowRight className="text-xs" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
