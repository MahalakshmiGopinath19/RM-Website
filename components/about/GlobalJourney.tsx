'use client';

import { motion, Variants } from 'framer-motion';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function GlobalJourney() {
  return (
    <section className="relative bg-[#020215] py-16 md:py-24 border-t border-white/5 overflow-hidden min-h-[500px] flex items-center">
      {/* Globe Image positioned absolutely on the right background and sized to fit the section */}
      <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full pointer-events-none z-0 opacity-30 lg:opacity-100 flex items-center justify-end">
        <img
          src="/image/Journey.png"
          alt="Vaave Digital Global Expansion"
          className="w-full h-full object-cover object-right select-none"
        />
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9956C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-start">

          {/* Left Column: Journey Narrative Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="w-full lg:w-[58%] relative z-10"
          >
            <div className="glass-panel bg-[#050720]/90 rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#C9956C]/30 transition-all duration-300 shadow-2xl">
              <span className="inline-block font-display text-xs tracking-[0.3em] uppercase font-extrabold text-[#C9956C] mb-3">
                Since 2018
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
                Our Global Journey
              </h2>
              <div className="w-16 h-1 bg-gradient-rosegold mb-8 rounded-full" />

              <div className="space-y-6 text-[#acabcb]/95 text-base sm:text-lg leading-relaxed font-medium">
                <p>
                  Since our inception in <strong>2018</strong>, Vaave Digital has pioneered end-to-end digital marketing, branding, AI-integrated customized software, and AI automation. We empower modern brands to expand their horizons through data-driven strategies, intelligent customer acquisition funnels, and premium digital architectures.
                </p>
                <p>
                  Our journey began with a bold vision to revolutionize local enterprises within <strong>India</strong>. By delivering exceptional, measurable ROI and building future-proof digital assets, we quickly established ourselves as industry leaders.
                </p>
                <p>
                  Today, Vaave Digital has scaled globally. We operate as a trusted performance agency accelerating growth for market leaders across <strong>India</strong>, and expanding our cross-border operations into the high-growth hubs <strong>Globally</strong>.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
