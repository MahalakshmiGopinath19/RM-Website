'use client';

import { motion, Variants } from 'framer-motion';
import Stepper, { Step } from '@/components/ui/Stepper';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const uxSteps = [
  { image: '/image/process1.webp', title: 'Research & Development', desc: 'We understand your business, audience, and goals to create the right digital solution.' },
  { image: '/image/process2.webp', title: 'Competitive Analysis', desc: 'We study your competitors and market trends to identify opportunities and give your brand a competitive edge.' },
  { image: '/image/process3.webp', title: 'Strategic Planning', desc: 'We create a customized strategy that helps your business stand out and achieve measurable growth.' },
  { image: '/image/process4.webp', title: 'Tracking & Monitoring', desc: 'We continuously monitor performance, measure results, and optimize strategies for long-term success.' }
];

export default function FullStackSection() {
  return (
    <section className="bg-white pt-12 pb-4 lg:pt-16 lg:pb-6 relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.span variants={fadeUp}
            className="inline-block font-display text-xs tracking-[0.35em] uppercase font-bold mb-3"
            style={{ color: '#C9956C' }}>
            How We Work
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display font-extrabold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: '#0f172a' }}>
            Our <span className="text-gradient-peach">Process</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base mt-3 max-w-xl mx-auto font-medium"
            style={{ color: '#475569' }}>
            Human-centered design from research to launch — every step informed by data.
          </motion.p>
        </motion.div>

        <Stepper
          initialStep={1}
          autoPlay={true}
          autoPlayInterval={5000}
          backButtonText="← Previous"
          nextButtonText="Next Step →"
        >
          {uxSteps.map((step, i) => (
            <Step key={i}>
              <div className="flex flex-col md:flex-row gap-4 sm:gap-8 items-stretch">
                {/* Image */}
                <div className="w-full md:w-5/12 relative group">
                  <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-sm">
                    <img src={step.image} alt={step.title} className="w-full h-32 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-peachAccent flex items-center justify-center shadow-md">
                      <span className="font-data text-xs sm:text-sm font-black text-darkBg">0{i + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-7/12 flex flex-col justify-center">
                  <span className="font-data text-[9px] sm:text-[10px] font-bold text-peachAccent tracking-[0.3em] uppercase mb-2">Step 0{i + 1} of 04</span>
                  <h3 className="font-display text-white text-base sm:text-2xl font-bold mb-1.5 sm:mb-3 leading-tight font-display">{step.title}</h3>
                  <p className="text-[#acabcb]/85 text-[11px] sm:text-sm leading-relaxed mb-4 font-medium">{step.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {(i === 0
                      ? ['Business goals', 'Audience insights', 'Market research']
                      : i === 1
                      ? ['Competitor review', 'Market trends', 'Gap analysis']
                      : i === 2
                      ? ['Custom strategy', 'Brand positioning', 'Growth roadmap']
                      : ['Performance tracking', 'Data analytics', 'Continuous optimization']
                    ).map((tag, ti) => (
                      <span key={ti} className="inline-flex items-center gap-1 text-[9px] sm:text-xs text-peachAccent bg-peachAccent/10 border border-peachAccent/20 px-2.5 py-1 rounded-full font-semibold shadow-sm">
                        <svg className="w-2.5 h-2.5 text-peachAccent" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
    </section>
  );
}
