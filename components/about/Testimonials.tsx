'use client';

import { motion, Variants } from 'framer-motion';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const testimonials = [
  {
    name: 'Alan Baker',
    role: 'CEO of ABC Corp',
    quote: 'Vaave Digital transformed our online presence and tripled our lead generation in just 6 months. Their AI-driven strategies gave us insights we never had before. Unmatched expertise!',
  },
  {
    name: 'Johnathan Davis',
    role: 'Marketing Director at GlobalTech',
    quote: 'The team at Vaave Digital helped us expand our brand globally. Their data-first performance marketing delivered measurable ROI and made us a market leader in our sector.',
  },
  {
    name: 'Emily Watson',
    role: 'Founder of Luxe Fashion',
    quote: 'Vaave Digital’s social campaigns boosted our engagement by 200%. Their creative use of AI and data turned our brand into an industry trendsetter. Outstanding work!',
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Growth at Nexus SaaS',
    quote: 'Working with Vaave Digital was a game-changer. They streamlined our acquisition funnels and increased our monthly recurring revenue by 140% within two quarters.',
  },
  {
    name: 'Sophia Martinez',
    role: 'VP of Digital at Apex Logistics',
    quote: 'Professional, proactive, and exceptionally skilled. Vaave Digital’s UI/UX redesign and campaign strategies elevated our digital experience beyond expectations.',
  },
  {
    name: 'David Miller',
    role: 'Managing Director at Horizon Capital',
    quote: 'The ROI we achieved with Vaave Digital surpassed all previous agency benchmarks. Their AI-powered marketing engine is truly state-of-the-art.',
  },
];

// Duplicate array for seamless infinite marquee loop
const infiniteTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-12 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="inline-block font-display text-xs tracking-[0.3em] uppercase font-extrabold text-[#050720] mb-3">
            Client Feedback
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black bg-gradient-to-r from-[#C9956C] to-[#EFD3C9] bg-clip-text text-transparent tracking-tight">
            What Our Clients Say
          </h2>
          <div className="w-16 h-1 bg-gradient-rosegold mx-auto mt-4 rounded-full" />
        </motion.div>
      </div>

      {/* Infinite Continuous Marquee Container */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear',
          }}
          className="flex gap-6 w-max py-4"
        >
          {infiniteTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[380px] md:w-[420px] bg-[#050720] rounded-2xl p-7 md:p-8 shadow-xl border border-white/10 hover:border-[#C9956C]/40 transition-all duration-300 flex flex-col justify-between flex-shrink-0 group hover:-translate-y-1"
            >
              <div>
                <svg className="w-8 h-8 text-[#C9956C]/40 mb-4 group-hover:text-[#C9956C] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 1.151c-2.857 1.232-4.387 3.432-4.387 5.424h4.392v11.425h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 1.151c-2.857 1.232-4.387 3.432-4.387 5.424h4.392v11.425h-9.983z" />
                </svg>
                <p className="text-[#acabcb] text-sm md:text-base leading-relaxed italic font-medium">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <h5 className="font-display font-black text-white text-base md:text-lg group-hover:text-peachAccent transition-colors">
                  {t.name}
                </h5>
                <p className="text-xs md:text-sm text-[#C9956C] font-display font-semibold mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
