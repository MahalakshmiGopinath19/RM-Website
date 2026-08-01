'use client';

import { motion, Variants } from 'framer-motion';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const industries = [
  { icon: '/image/beach_access.png', name: 'Beauty & Cosmetic' },
  { icon: '/image/restaurant_menu.png', name: 'Food & Beverages' },
  { icon: '/image/laundry.png', name: 'Fashion & Apparels' },
  { icon: '/image/add_home.png', name: 'Real Estate' },
];

export default function Industries() {
  return (
    <div className="bg-[#030218]/50 border-y border-white/5 py-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,137,118,0.1) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
      }} />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={stagger}>
          <motion.h3 variants={fadeUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Our solutions keep you ahead</motion.h3>
          <motion.p variants={fadeUp} className="text-[#acabcb] mb-8 font-display">Industries we bring expertise in</motion.p>
          <motion.div variants={fadeUp} className="glass-panel rounded-2xl py-6 px-6 max-w-4xl mx-auto border border-white/5">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {industries.map((ind, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white group cursor-default">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-peachAccent/20 transition-colors">
                    <img src={ind.icon} alt={ind.name} className="w-6 h-6 filter brightness-110" />
                  </div>
                  <span className="text-sm md:text-base font-display font-medium text-[#acabcb] group-hover:text-white transition-colors">{ind.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
