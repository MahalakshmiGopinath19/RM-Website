'use client';

import { motion, Variants } from 'framer-motion';
import { FaRocket, FaBrain, FaChartLine, FaClock, FaGraduationCap, FaLightbulb } from 'react-icons/fa';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function CareerBenefits() {
  const benefits = [
    {
      icon: FaRocket,
      title: 'Work on Exciting Projects',
      desc: 'Build high-impact digital solutions, dynamic brand campaigns, and creative work that makes a real difference.',
    },
    {
      icon: FaBrain,
      title: 'Learn AI-Powered Technologies',
      desc: 'Gain hands-on expertise with cutting-edge AI tools, automated workflows, and next-generation digital innovations.',
    },
    {
      icon: FaChartLine,
      title: 'Growth Opportunities',
      desc: 'Fast-track your career with clear growth pathways, mentorship, and leadership advancement opportunities.',
    },
    {
      icon: FaClock,
      title: 'Flexible Work Environment',
      desc: 'Enjoy an adaptable, modern work structure that respects work-life balance and encourages autonomy.',
    },
    {
      icon: FaGraduationCap,
      title: 'Continuous Learning',
      desc: 'Expand your skill set through ongoing workshops, industry certifications, and regular knowledge sharing.',
    },
    {
      icon: FaLightbulb,
      title: 'Innovation-First Mindset',
      desc: 'Challenge the status quo, experiment with bold ideas, and help pioneer futuristic digital strategies.',
    },
  ];

  return (
    <section className="bg-white py-12 md:py-24 relative overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <motion.span variants={fadeUp} className="inline-block font-display text-[#050720] text-xs tracking-[0.35em] uppercase font-extrabold mb-3">
            Why Us
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl lg:text-[50px] font-black tracking-tight bg-gradient-to-r from-[#C9956C] via-[#EFD3C9] to-[#C9956C] bg-clip-text text-transparent">
            Why Choose Vaave Digital?
          </motion.h2>
          <motion.div variants={fadeUp} className="w-14 h-1 bg-gradient-to-r from-[#C9956C] to-[#EFD3C9] mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} className="h-full">
              <div className="relative bg-[#050720] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-800 h-full flex flex-col justify-between hover:border-[#C9956C]/40 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9956C]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#C9956C]/30 flex items-center justify-center text-lg sm:text-2xl text-[#C9956C] mb-3 sm:mb-6 transition-colors duration-300">
                    <benefit.icon />
                  </div>
                  <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#C9956C] transition-colors duration-300">{benefit.title}</h3>
                  <p className="text-[#acabcb] text-xs sm:text-sm leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
