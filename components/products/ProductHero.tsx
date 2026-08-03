'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

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

export default function ProductHero() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const features = ['Easy to Start', 'Secure & Reliable', 'Built to Scale'];

  return (
    <>
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
    </>
  );
}
