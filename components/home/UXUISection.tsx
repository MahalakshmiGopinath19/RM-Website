'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function UXUISection() {
  return (
    <section className="bg-white py-4 lg:py-6 relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">

          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="w-full lg:w-[50%] flex flex-col text-left lg:pr-6"
          >
            <motion.span variants={fadeUp}
              className="inline-block font-display text-xs tracking-[0.35em] uppercase font-bold mb-4"
              style={{ color: '#C9956C' }}>
              What We Do
            </motion.span>
            <motion.h2 variants={fadeUp}
              className="font-display font-extrabold leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5.8vw, 4.2rem)', color: '#0f172a' }}>
              Dominating the{' '}
              <span className="relative inline-block text-gradient-peach">
                AI‑Powered
                <motion.span className="absolute -bottom-1 left-0 h-1 bg-peachAccent/30 w-full rounded-full"
                  initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.9 }} />
              </span>{' '}
              Digital Landscape
            </motion.h2>
            <motion.p variants={fadeUp}
              className="text-xl leading-relaxed max-w-3xl mb-10 font-medium"
              style={{ color: '#475569' }}>
              We build complete digital ecosystems powered by predictive analytics, smart automation, and data‑driven creativity — driving relentless revenue and trust for brands across Globe.
            </motion.p>
            <motion.div variants={stagger} className="flex flex-wrap gap-3">
              {['AI‑Powered', 'Fast Setup', '3000+ Clients'].map((b, i) => (
                <motion.span key={i} variants={fadeUp}
                  whileHover={{ scale: 1.07, backgroundColor: '#ff8976', color: '#ffffff', borderColor: '#ff8976' }}
                  style={{ color: '#1e293b', borderColor: '#cbd5e1', backgroundColor: '#f1f5f9' }}
                  className="font-display text-xs font-bold uppercase tracking-widest border px-5 py-2.5 rounded-full transition-all duration-200 cursor-default select-none">
                  {b}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Glowing AI Human Image (Stable with premium radial aura) */}
          <div className="w-full lg:w-[50%] flex justify-center items-center relative lg:-translate-x-0">
            <div className="relative w-full max-w-[420px] aspect-square sm:max-w-[480px] md:max-w-[520px] lg:max-w-[760px] lg:w-[760px] lg:h-[550px] flex items-center justify-center">
              {/* 3D Glowing Aura Layer 1 (Counter-clockwise rotation & pulsing blur) */}
              <motion.div
                animate={{
                  scale: [0.92, 1.08, 0.92],
                  opacity: [0.4, 0.75, 0.4],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full blur-[60px] pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(201,149,108,0.25) 0%, rgba(61,43,142,0.1) 50%, transparent 70%)"
                }}
              />

              {/* 3D Glowing Aura Layer 2 (Clockwise rotation & pulsing blur) */}
              <motion.div
                animate={{
                  scale: [1.08, 0.92, 1.08],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-4 rounded-full blur-[50px] pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(0,214,255,0.2) 0%, rgba(13,13,43,0) 60%, transparent 80%)"
                }}
              />

              {/* AI Human Image with multi-layer drop-shadow and micro-scale breathing */}
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/image/AI_human.png"
                  alt="AI Human"
                  width={760}
                  height={760}
                  className="w-full h-auto object-contain drop-shadow-[0_15px_45px_rgba(201,149,108,0.35)] drop-shadow-[0_0_60px_rgba(0,214,255,0.25)]"
                  priority
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
