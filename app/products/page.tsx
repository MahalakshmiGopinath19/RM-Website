'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

import ProductGrid from '@/components/products/ProductGrid';

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

export default function ProductsPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true });

  const features = ['Easy to Start', 'Secure & Reliable', 'Built to Scale'];

  return (
    <div className="bg-[#020215] min-h-screen relative overflow-hidden select-none">
      <ScrollProgressBar />
      <ParticleBackground />

      {/* Decorative Blur Flares */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-[450px] h-[450px] bg-peachAccent/5 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER SECTION */}
      <section ref={headerRef} className="relative pt-10 md:pt-4 lg:pt-0 pb-10 md:pb-14 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            initial="hidden" 
            animate={headerInView ? 'visible' : 'hidden'} 
            variants={stagger}
            className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Left Side — Mascot Pointing Image */}
            <motion.div variants={fadeUp} className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1 lg:-ml-10 xl:-ml-16">
              <motion.img
                src="/image/mascot_pointing.png"
                alt="Vaave Digital Mascot Pointing"
                className="w-80 sm:w-[440px] md:w-[500px] lg:w-[580px] xl:w-[660px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(201,149,108,0.3)] select-none"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Right Side — Content */}
            <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2 lg:-ml-8 xl:-ml-12">
              <motion.span variants={fadeUp} className="inline-block bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-4 py-1.5 rounded-full text-xs font-display font-extrabold uppercase tracking-widest mb-3">
                Our Products
              </motion.span>
              
              <motion.h1 variants={fadeUp} className="font-display text-white font-black tracking-tight leading-[0.98] mb-4" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)', textShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
                <span className="whitespace-nowrap">Powerful Products.</span> <br />
                <span className="text-gradient-peach relative whitespace-nowrap">
                  Built for Real Impact.
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-peachAccent/10 rounded-full blur-[2px]" />
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[#acabcb] text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6 font-medium">
                We design and operate cloud products that streamline complex operations, clinical workflows, and customer communication.
              </motion.p>

              {/* Benefit Bullets */}
              <motion.div variants={stagger} className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                {features.map((feat) => (
                  <motion.div key={feat} variants={fadeUp} className="flex items-center gap-2 text-white/95 text-sm md:text-base font-semibold">
                    <FaCheckCircle className="text-peachAccent text-base sm:text-lg" />
                    {feat}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE GRID */}
      <section ref={gridRef} className="py-24 border-b border-white/5 bg-[#030218]/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <ProductGrid />
          </motion.div>
        </div>
      </section>

      {/* FOOTER BANNER CTA */}
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
              href="/contact"
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
    </div>
  );
}
