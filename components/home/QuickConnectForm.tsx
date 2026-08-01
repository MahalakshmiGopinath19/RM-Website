'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, Variants, useMotionValue, useSpring, animate } from 'framer-motion';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';

/* ── Animation Variants ── */
const slideL: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const slideR: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ── Spotlight Glow ── */
function useSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(480px circle at ${x}% ${y}%, rgba(255,137,118,0.12), transparent 55%)`;
  };
  const onMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.background = 'transparent';
  };
  return { containerRef, glowRef, onMouseMove, onMouseLeave };
}

/* ── Magnetic CTA Wrapper ── */
function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 12, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={e => {
        const r = ref.current;
        if (!r) return;
        const rect = r.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Count Up ── */
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, { duration: 1.6, ease: 'easeOut', onUpdate: v => setN(Math.floor(v)) });
    return ctrl.stop;
  }, [inView, end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

interface QuickConnectFormProps {
  setShowModal: (show: boolean) => void;
}

export default function QuickConnectForm({ setShowModal }: QuickConnectFormProps) {
  const adsSpot = useSpotlight();
  const footerSpot = useSpotlight();

  return (
    <>
      {/* ADS — Split Panel */}
      <section className="bg-white pt-8 pb-16 lg:pt-10 lg:pb-24 overflow-hidden border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left — Dark Navy Details Panel */}
            <motion.div
              ref={adsSpot.containerRef}
              onMouseMove={adsSpot.onMouseMove}
              onMouseLeave={adsSpot.onMouseLeave}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideL}
              className="bg-[#050720] p-8 md:p-12 lg:p-14 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,137,118,0.06) 1.5px, transparent 1.5px)',
                backgroundSize: '32px 32px',
              }} />
              <div ref={adsSpot.glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-200" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-peachAccent/10 border border-peachAccent/20 text-peachAccent px-4 py-1.5 rounded-full text-[10px] font-display font-bold tracking-[0.3em] uppercase mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-peachAccent animate-pulse" /> Scaling Results
                </div>
                <h2 className="font-display text-white font-black leading-[1.05] mb-5 font-display"
                  style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
                  Experts in<br /><span className="text-gradient-peach">Digital Advertising</span>
                </h2>
                <p className="text-[#acabcb]/85 text-base leading-relaxed mb-10 max-w-md font-medium">
                  Maximize returns with data‑backed targeting, iterative creative testing, and precision bid management.
                </p>
                <div className="space-y-3.5 mb-10">
                  {[
                    { icon: '🎯', t: 'Targeted Campaigns', d: 'Precision audience modeling to capture intent.' },
                    { icon: '📈', t: '2000+ Campaigns', d: 'Proven framework scaled across industries.' },
                    { icon: '⚡', t: 'Real‑Time Tracking', d: 'Continuous ROAS optimization at every step.' },
                  ].map((item, i) => (
                    <motion.div key={i} whileHover={{ x: 6 }}
                      className="group relative overflow-hidden flex items-center gap-4 bg-white/5 hover:border-peachAccent/40 p-4 rounded-xl border border-white/10 transition-all duration-300 shadow-sm cursor-pointer">
                      {/* Rose Gold Gradient Hover Layer */}
                      <div className="absolute inset-0 bg-gradient-rosegold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <span className="text-xl relative z-10">{item.icon}</span>
                      <div className="relative z-10">
                        <p className="font-display text-white group-hover:text-[#030218] font-bold text-sm font-display transition-colors duration-300">{item.t}</p>
                        <p className="text-[#acabcb] group-hover:text-[#030218]/90 text-xs mt-0.5 font-medium transition-colors duration-300">{item.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Magnetic strength={0.25}>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setShowModal(true)}
                    className="group bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg px-8 py-3.5 rounded-full font-display font-extrabold text-sm inline-flex items-center gap-2 shadow-xl transition-colors duration-300">
                    Scale My Returns
                    <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Magnetic>
              </div>
            </motion.div>

            {/* Right — Image & Stats Panel */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideR}
              className="flex flex-col items-center justify-center p-2 lg:p-4">
              <div className="relative w-full max-w-[580px] lg:max-w-[620px] flex items-center justify-center mb-6">
                <motion.img
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  src="/image/ads.png"
                  alt="Digital Advertising AI Bot"
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 w-full max-w-[580px] lg:max-w-[620px]">
                {[{ n: 500, s: '+', l: 'Clients' }, { n: 2000, s: '+', l: 'Campaigns' }, { n: 99, s: '%', l: 'Satisfaction' }]
                  .map((st, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4, scale: 1.03 }}
                      className="group relative overflow-hidden bg-[#050720] border border-white/10 hover:border-peachAccent/40 rounded-xl p-4 text-center shadow-md cursor-pointer transition-all duration-300"
                    >
                      {/* Rose Gold Gradient Hover Layer */}
                      <div className="absolute inset-0 bg-gradient-rosegold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="font-data text-2xl font-bold text-white group-hover:text-[#030218] transition-colors duration-300">
                          <CountUp end={st.n} suffix={st.s} />
                        </div>
                        <div className="font-display text-[9px] text-[#acabcb] group-hover:text-[#030218]/90 uppercase tracking-widest mt-1 font-extrabold transition-colors duration-300">
                          {st.l}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREMIUM FOOTER CTA */}
      <section
        ref={footerSpot.containerRef}
        onMouseMove={footerSpot.onMouseMove}
        onMouseLeave={footerSpot.onMouseLeave}
        className="relative overflow-hidden py-24 border-t border-black/10"
        style={{ background: 'linear-gradient(135deg, #f7d3c0 0%, #e2a57e 30%, #C9956C 60%, #b3734a 100%)' }}
      >
        <div ref={footerSpot.glowRef} className="absolute inset-0 pointer-events-none transition-all duration-200" />

        {/* Dotted Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(3,2,24,0.12) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        {/* Decorative Circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[750px] h-[750px] rounded-full border border-[#030218]/15 animate-[spin_45s_linear_infinite]" />
          <div className="absolute w-[520px] h-[520px] rounded-full border border-[#030218]/15 animate-[spin_60s_linear_infinite_reverse]" />
        </div>

        <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full border border-[#030218]/15 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full border border-[#030218]/15 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.span variants={fadeUp} className="inline-block uppercase tracking-[0.35em] text-xs font-bold mb-6"
              style={{ color: '#030218' }}>
              START TODAY
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-display font-black leading-tight mb-12 font-display"
              style={{ fontSize: "clamp(2.3rem,5vw,4.5rem)", color: '#030218' }}
            >
              Let's Build Something
              <br />
              <span style={{ color: '#ffffff' }}>Great Together</span>
            </motion.h2>

            <div className="flex flex-wrap justify-center items-center gap-6">
              <Magnetic strength={0.25}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowModal(true)}
                  className="w-[235px] h-[60px] rounded-full text-lg font-extrabold transition-all duration-300 shadow-xl"
                  style={{ backgroundColor: '#030218', color: '#ffffff' }}
                >
                  Get Started Free
                </motion.button>
              </Magnetic>

              <Magnetic strength={0.20}>
                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://wa.me/917305821333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-[235px] h-[60px] rounded-full bg-white hover:bg-white/90 text-lg font-extrabold transition-all duration-300 shadow-md"
                  style={{ color: '#030218' }}
                >
                  Chat on WhatsApp
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
