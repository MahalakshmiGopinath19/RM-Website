'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

import ContactForm from '@/components/contact/ContactForm';

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? scrolled / height : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[1000] bg-peachAccent"
    />
  );
}

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

/* ── Interactive Particle Background ── */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 35;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.1 + 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 137, 118, 0.12)';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function ContactPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.15 });

  return (
    <div className="bg-[#020215] min-h-screen relative overflow-hidden select-none">
      <ScrollProgressBar />
      <ParticleBackground />

      {/* Decorative Blur Flares */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-peachAccent/5 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER SECTION */}
      <section ref={headerRef} className="relative pt-0 md:-mt-8 lg:-mt-12 pb-2 md:pb-4 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            initial="hidden" 
            animate={headerInView ? 'visible' : 'hidden'} 
            variants={stagger}
            className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center"
          >
            <div className="lg:col-span-6 text-center lg:text-left">
              <motion.span variants={fadeUp} className="inline-block bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-4 py-1.5 rounded-full text-xs font-display font-extrabold uppercase tracking-widest mb-3">
                Contact us
              </motion.span>
              
              <motion.h1 variants={fadeUp} className="font-display text-white font-black tracking-tight leading-[0.98] mb-4" style={{ fontSize: 'clamp(2.6rem, 5.2vw, 5.2rem)', textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
                <span className="whitespace-nowrap">Let's Build Something</span> <br />
                <span className="text-gradient-peach relative whitespace-nowrap">
                  Powerful Together.
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-peachAccent/10 rounded-full blur-[2px]" />
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[#acabcb] text-base md:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
                Have a digital marketing objective or IT product vision? Connect with our team to explore roadmap possibilities.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-6 flex justify-center lg:justify-end overflow-visible">
              <motion.img
                src="/image/mascot_calling.png"
                alt="Vaave Digital Mascot Calling"
                className="w-[400px] sm:w-[540px] md:w-[680px] lg:w-[840px] xl:w-[960px] h-auto object-contain drop-shadow-[0_25px_60px_rgba(201,149,108,0.4)] select-none lg:-mr-12 xl:-mr-20"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT DUAL COLUMN PANEL */}
      <section ref={contentRef} className="py-10 md:py-16 border-b border-white/5 bg-[#030218]/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
