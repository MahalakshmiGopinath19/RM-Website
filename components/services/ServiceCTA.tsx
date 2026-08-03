'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 12, mass: 0.4 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={e => {
        const r = ref.current; if (!r) return;
        const rect = r.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

export default function ServiceCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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
    <div id="cta" ref={containerRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      className="relative overflow-hidden bg-gradient-rosegold py-24 border-t border-slate-100">
      <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-all duration-200" />
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(5,7,32,0.15) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[#050720]/10 animate-spinSlow" />
        <div className="absolute w-[420px] h-[420px] rounded-full border border-[#050720]/10 animate-[spinSlowRev_26s_linear_infinite]" />
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="font-display text-3xl md:text-5xl font-black text-[#050720] mb-3">Let's Grow Your Business</h3>
          <p className="text-[#334155] text-sm md:text-base mb-10 max-w-md mx-auto font-bold">Free consultation with our Chennai team — no strings attached.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Magnetic strength={0.22}>
              <motion.a href="https://wa.me/917305821333" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                className="bg-[#050720] hover:bg-[#0c0f3d] text-white px-8 py-4 rounded-full font-display font-extrabold shadow-xl inline-flex items-center justify-center gap-2 text-base transition-colors duration-300">
                <FaPaperPlane size={12} />
                WhatsApp Us
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <motion.a href="/contact" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                className="bg-white border border-[#050720]/10 hover:bg-slate-50 text-[#050720] px-8 py-4 rounded-full font-display font-extrabold shadow-xl inline-flex items-center justify-center gap-2 text-base transition-colors duration-300">
                Contact Us
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
