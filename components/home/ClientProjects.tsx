'use client';

import { motion, Variants } from 'framer-motion';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const galleryProjects = [
  { id: 1, label: 'E-Commerce Revamp' },
  { id: 2, label: 'Brand Campaign' },
  { id: 3, label: 'SEO Growth 3×' },
  { id: 4, label: 'Google Ads ROAS 8×' },
  { id: 5, label: 'App UI/UX'},
  { id: 6, label: 'GMB Local Push' },
];

export default function ClientProjects() {
  return (
    <section className="bg-[#020215] py-4 lg:py-6">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
          <motion.span variants={fadeUp}
            className="inline-block font-display text-peachAccent text-xs tracking-[0.35em] uppercase font-bold mb-3">
            Our Work
          </motion.span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <motion.h2 variants={fadeUp} className="font-display text-white font-extrabold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
              Projects for <span className="text-gradient-peach">Beloved Clients</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#acabcb]/70 text-sm font-display font-semibold">
              Creative outputs from our desk →
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryProjects.map((proj, idx) => (
            <motion.div key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.07 }}
              whileHover={{ y: -4 }}
              className="gallery-item group relative rounded-2xl overflow-hidden bg-darkPanel border border-white/5 shadow-sm hover:shadow-xl transition-shadow duration-300"
              style={{ height: 280 }}
            >
              <img
                src={`/image/oa-${proj.id}.webp`}
                alt={proj.label}
                className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                onError={e => { e.currentTarget.src = '/image/oa-1.webp'; }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
