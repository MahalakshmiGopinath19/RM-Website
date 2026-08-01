'use client';

import { motion, Variants } from 'framer-motion';
import { FaChartLine, FaGlobe } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function MissionVision() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0 relative">
        {/* Mission Card (LEFT - Slides in from left on scroll) */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full lg:w-[38%] glass-panel bg-[#050720]/90 rounded-2xl p-7 md:p-8 shadow-xl border border-white/10 hover:border-peachAccent/30 transition-all duration-300 group relative z-10 lg:-left-[20px]"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-peachAccent/10 border border-peachAccent/20 flex items-center justify-center text-peachAccent flex-shrink-0 group-hover:bg-gradient-rosegold group-hover:text-darkBg transition-all duration-300">
              <FaChartLine className="text-2xl" />
            </div>
            <div>
              <h3 className="font-display font-black text-2xl md:text-3xl bg-gradient-to-r from-[#C9956C] to-[#EFD3C9] bg-clip-text text-transparent mb-2 tracking-tight">Mission</h3>
              <p className="text-[#acabcb]/90 text-base md:text-lg leading-relaxed font-medium">
                Empower businesses through innovative AI‑integrated digital marketing strategies that foster growth, engagement, and long-term success.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Center AI Hand Image (Appears in center on scroll) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[30%] flex items-center justify-center my-4 lg:my-0 lg:-mx-6 z-20 relative top-[50px]"
        >
          <motion.img
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            src="/image/AI_hand.png"
            alt="Human and AI Hand Connection"
            className="w-56 sm:w-64 lg:w-[328px] h-auto object-contain drop-shadow-[0_15px_35px_rgba(255,137,118,0.25)] scale-[1.04] hover:scale-105 transition-transform duration-500 pointer-events-none"
          />
        </motion.div>

        {/* Vision Card (RIGHT - Slides in from right on scroll) */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full lg:w-[38%] glass-panel bg-[#050720]/90 rounded-2xl p-7 md:p-8 shadow-xl border border-white/10 hover:border-peachAccent/30 transition-all duration-300 group relative z-10 lg:-right-[20px]"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-peachAccent/10 border border-peachAccent/20 flex items-center justify-center text-peachAccent flex-shrink-0 group-hover:bg-gradient-rosegold group-hover:text-darkBg transition-all duration-300">
              <FaGlobe className="text-2xl" />
            </div>
            <div>
              <h3 className="font-display font-black text-2xl md:text-3xl bg-gradient-to-r from-[#C9956C] to-[#EFD3C9] bg-clip-text text-transparent mb-2 tracking-tight">Vision</h3>
              <p className="text-[#acabcb]/90 text-base md:text-lg leading-relaxed font-medium">
                Pioneer a digital future where every business seamlessly leverages intelligent AI strategies, cutting-edge expertise, and modern technology to achieve sustainable growth and lasting global impact.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
