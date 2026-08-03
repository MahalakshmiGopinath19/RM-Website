'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

/* ── Clean 3D Tilt Image Wrapper (No Card / No Background / No Box Glare) ── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 22 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        ry.set((px - 0.5) * 12);
        rx.set(-(py - 0.5) * 12);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`relative cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function ProductGrid() {
  return (
    <div className="space-y-16">
      {/* 1. BILL IT NOW (Blue Accent Dashboard) */}
      <motion.div
        variants={fadeUp}
        className="glass-panel rounded-3xl border border-white/5 py-6 px-8 md:py-8 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300"
      >
        {/* Radial Blue Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

        <div className="w-full lg:w-1/2 space-y-4">
          <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-widest">
            Billing Software
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            Billing Simplified. <br />
            <span className="text-gradient-peach">Business Amplified.</span>
          </h2>
          <p className="text-[#acabcb] text-base md:text-lg leading-relaxed font-medium">
            The all-in-one billing and business management software built for retailers, salons, clinics, restaurants, and growing businesses.
          </p>
          <p className="text-[#acabcb]/80 text-sm md:text-base leading-relaxed font-normal">
            Create GST invoices, manage inventory, track expenses, monitor sales, and access powerful reports—all from one easy-to-use platform.
          </p>
          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => window.open('https://wa.me/917305821333?text=Hi%20Vaave%20Digital!%20I%20want%20to%20Start%20a%20Free%20Trial%20for%20Billing%20Software', '_blank')}
              className="inline-flex items-center gap-2 bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg px-6 py-3 rounded-full font-display font-extrabold text-xs md:text-sm tracking-wider transition-all shadow-lg shadow-peachAccent/10 cursor-pointer"
            >
              Start Free Trial <FaArrowRight size={11} />
            </button>
            <button
              onClick={() => window.open('https://wa.me/917305821333?text=Hi%20Vaave%20Digital!%20I%20want%20to%20Book%20a%20Demo%20for%20Billing%20Software', '_blank')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 px-6 py-3 rounded-full font-display font-extrabold text-xs md:text-sm tracking-wider transition-all cursor-pointer"
            >
              Book a Demo
            </button>
          </div>
        </div>

        {/* Real Product Screenshot - Clean 3D Tilt Image without Card/Glare */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <TiltCard className="w-full max-w-xl flex justify-center">
            <Image
              src="/image/bill-it.png"
              alt="Bill It Now"
              width={800}
              height={500}
              className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              priority
            />
          </TiltCard>
        </div>
      </motion.div>

      {/* 2. PHYSIODESK (Teal Accent Mobile View) */}
      <motion.div
        variants={fadeUp}
        className="glass-panel rounded-3xl border border-white/5 py-6 px-8 md:py-8 md:px-12 flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center relative overflow-hidden group hover:border-teal-500/20 transition-all duration-300"
      >
        {/* Radial Teal Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/10 transition-colors" />

        <div className="w-full lg:w-1/2 space-y-4">
          <span className="inline-block bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-widest">
            Clinic Management Software
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">PhysioDesk</h2>
          <p className="text-[#acabcb] text-base md:text-lg leading-relaxed font-medium">
            The complete system built for physical therapists. Manage patient bookings, chart clinical progress notes, invoice sessions, and organize medical records automatically.
          </p>
          <div className="pt-2">
            <button
              onClick={() => window.open('https://wa.me/917305821333?text=Interested%20in%20PhysioDesk%20Clinic%20Software', '_blank')}
              className="inline-flex items-center gap-2.5 bg-teal-500 hover:bg-teal-600 text-white px-7 py-3.5 rounded-full font-display font-extrabold text-sm md:text-base tracking-wider transition-colors shadow-lg shadow-teal-500/10"
            >
              Explore PhysioDesk <FaArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Real Product Screenshot - Clean 3D Tilt Image without Card/Glare */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <TiltCard className="w-full max-w-xl flex justify-center">
            <Image
              src="/image/physio-care.png"
              alt="PhysioDesk"
              width={800}
              height={500}
              className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              priority
            />
          </TiltCard>
        </div>
      </motion.div>
    </div>
  );
}
