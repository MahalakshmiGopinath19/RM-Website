'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function AboutOverview() {
  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-slate-100">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-[#C9956C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] bg-[#a86538]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-6xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
          className="text-center max-w-4xl mx-auto">
          
          <motion.span variants={fadeUp} className="inline-block bg-[#050720]/5 text-[#050720] border border-[#050720]/15 px-4 py-1.5 rounded-full text-xs font-display font-extrabold uppercase tracking-widest mb-4">
            VAAVE DIGITAL Journey
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.1] text-slate-900 mb-8">
            Building Businesses for the{' '}
            <span className="bg-gradient-to-r from-[#C9956C] via-[#EFD3C9] to-[#C9956C] bg-clip-text text-transparent">
              Digital Future
            </span>
          </motion.h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 text-left mb-8 sm:mb-10">
            <motion.div variants={fadeUp} className="bg-slate-50/80 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm hover:border-[#C9956C]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#C9956C]/10 flex items-center justify-center text-[#C9956C] font-bold text-xs sm:text-lg mb-2 sm:mb-4">01</div>
                <p className="text-slate-700 text-xs sm:text-base md:text-lg leading-relaxed font-medium">
                  <strong className="text-slate-900 font-bold">VAAVE DIGITAL</strong> is an AI-integrated digital solutions company helping businesses transform, automate, and scale through technology, creativity, and intelligent marketing.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-slate-50/80 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm hover:border-[#C9956C]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#C9956C]/10 flex items-center justify-center text-[#C9956C] font-bold text-xs sm:text-lg mb-2 sm:mb-4">02</div>
                <p className="text-slate-700 text-xs sm:text-base md:text-lg leading-relaxed font-medium">
                  We believe digital transformation isn’t about using more tools—it’s about creating smarter systems that help businesses grow consistently.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mission Highlight Card */}
          <motion.div variants={fadeUp} className="relative bg-[#050720] rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 text-white overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#C9956C]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 max-w-xl">
              <p className="text-[#acabcb] text-xs font-display font-extrabold uppercase tracking-widest mb-2">Our Core Mission</p>
              <h3 className="font-display text-lg sm:text-xl text-slate-300 font-bold mb-1">
                From startups to growing enterprises, our mission is simple:
              </h3>
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-[#C9956C] via-[#EFD3C9] to-[#C9956C] bg-clip-text text-transparent leading-tight mt-2">
                &quot;Create digital experiences that generate measurable business results.&quot;
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-rosegold text-[#050720] px-6 py-3.5 rounded-full font-display font-black text-sm shadow-xl hover:brightness-110 transition-all">
                Partner With Us <FaArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
