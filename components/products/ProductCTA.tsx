'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

export default function ProductCTA() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true });

  return (
    <section ref={ctaRef} className="py-24 relative overflow-hidden bg-[#030218]/30">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,137,118,0.1) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
      }} />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-panel py-8 px-8 md:py-10 md:px-12 rounded-3xl border border-white/10 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-peachAccent/5 rounded-full blur-2xl pointer-events-none" />
          
          <span className="inline-block bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-4">
            Get Started
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            One Vision. Many Solutions. <br />
            <span className="text-gradient-peach">Together.</span>
          </h2>

          <p className="text-[#acabcb] text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-medium">
            Want to request a custom API integration or request a clinical demo? Get in touch with our product team.
          </p>

          <motion.a
            href="https://wa.me/917305821333?text=Hi%20Vaave%20Digital!%20I%20would%20like%20to%20talk%20to%20your%20product%20team."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg px-8 py-4 rounded-full font-display font-extrabold text-sm tracking-wide shadow-lg shadow-peachAccent/10 transition-colors duration-300"
          >
            Talk to Our Team
            <FaArrowRight size={12} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
