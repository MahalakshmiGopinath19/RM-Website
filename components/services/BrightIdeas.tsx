'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BrightIdeas() {
  return (
    <div className="bg-[#050720] pt-28 pb-24 relative overflow-hidden border-t border-b border-white/5">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-stretch gap-8 lg:gap-12">
          
          {/* Left Content Column inside a White Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="md:w-1/2 w-full bg-white rounded-3xl p-8 md:p-12 lg:p-14 shadow-2xl border border-slate-100 flex flex-col justify-center"
          >
            <span className="inline-block font-display text-[#050720]/80 text-xs tracking-[0.35em] uppercase font-extrabold mb-3">Advanced Local & Global SEO</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[46px] font-black text-[#050720] leading-[1.12] mb-6 tracking-tight">Ideas That Actually <span className="bg-gradient-to-r from-[#C9956C] to-[#a86538] bg-clip-text text-transparent">Rank</span></h2>
            <div className="space-y-3.5">
              {[
                'Result-oriented strategy, tech-enabled',
                'Smarter targeting, faster acquisition',
                'Affordable, transparent pricing',
                "Chennai's top-rated local SEO team"
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, x: 4, backgroundColor: '#090a2a' }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="flex items-center gap-4 bg-[#020215] border border-white/10 p-4 rounded-xl transition-all duration-200 cursor-default shadow-md group"
                >
                  <span className="w-6 h-6 bg-white/10 group-hover:bg-[#C9956C] rounded-full flex items-center justify-center text-[#C9956C] group-hover:text-[#020215] text-xs font-bold flex-shrink-0 transition-colors duration-200">✓</span>
                  <span className="text-white font-semibold text-sm md:text-base transition-colors duration-200">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="md:w-1/2 w-full flex items-center justify-end"
          >
            <div className="w-full h-full min-h-[400px] md:min-h-full flex items-center justify-center md:justify-end relative">
              <Image 
                src="/image/thinking.png" 
                alt="SEO ideas that rank" 
                width={800} 
                height={800} 
                className="w-full h-full object-contain object-center md:object-right select-none max-h-[580px] scale-110 md:scale-115 -translate-y-6 md:-translate-y-8 transition-transform duration-300" 
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
