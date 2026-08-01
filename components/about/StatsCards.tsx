'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { FaRocket, FaChartPie, FaAward } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

/* ── 3D Tilt Card ── */
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
        ry.set((px - 0.5) * 6);
        rx.set(-(py - 0.5) * 6);
        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(350px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.25), transparent 70%)`;
        }
      }}
      onMouseLeave={() => {
        rx.set(0); ry.set(0);
        if (glareRef.current) glareRef.current.style.background = 'transparent';
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      <div ref={glareRef} className="absolute inset-0 rounded-3xl pointer-events-none transition-[background] duration-150" />
    </motion.div>
  );
}

export default function StatsCards() {
  return (
    <motion.div variants={fadeUp} className="w-full max-w-5xl mx-auto">
      <TiltCard>
        <div className="bg-gradient-rosegold rounded-3xl p-8 sm:p-12 lg:p-14 text-darkBg shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(201,149,108,0.4)] transition-all duration-300 relative overflow-hidden">
          {/* Subtle Ambient Background Accents */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-[#030218]/10 border border-[#030218]/20 text-[#030218] px-4 py-1.5 rounded-full text-xs font-display font-black tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#030218] animate-pulse" />
                Performance & Growth
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black mb-5 text-[#030218] leading-[1.1] tracking-tight">
                Leverage Digital Advertising
              </h2>
              <p className="text-[#030218]/85 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                With over 3000+ brand audits & 100+ performance marketing strategies, we understand what it takes to make your brand good & scalable in today's dynamic digital economy.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#030218] text-[#f7d3c0] flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                <FaRocket className="text-4xl sm:text-5xl" />
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 pt-8 border-t border-[#030218]/15 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#030218]/10 flex items-center justify-center text-[#030218]">
                <FaAward size={22} />
              </div>
              <div>
                <div className="font-data text-3xl sm:text-4xl font-black text-[#030218] tracking-tight">500+</div>
                <p className="text-[#030218]/80 text-xs sm:text-sm font-display font-bold uppercase tracking-wider mt-0.5">Projects Completed</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#030218]/10 flex items-center justify-center text-[#030218]">
                <FaChartPie size={22} />
              </div>
              <div>
                <div className="font-data text-3xl sm:text-4xl font-black text-[#030218] tracking-tight">100+</div>
                <p className="text-[#030218]/80 text-xs sm:text-sm font-display font-bold uppercase tracking-wider mt-0.5">Trusted Brands</p>
              </div>
            </div>

            <div className="flex items-center gap-4 col-span-2 sm:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-[#030218]/10 flex items-center justify-center text-[#030218]">
                <FaRocket size={22} />
              </div>
              <div>
                <div className="font-data text-3xl sm:text-4xl font-black text-[#030218] tracking-tight">3000+</div>
                <p className="text-[#030218]/80 text-xs sm:text-sm font-display font-bold uppercase tracking-wider mt-0.5">Brand Audits</p>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
