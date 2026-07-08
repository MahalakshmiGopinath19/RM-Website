// app/blog/page.tsx – Premium animated blog hub matching Vaave Digital brand system
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight, FaFeatherAlt } from 'react-icons/fa';

/* ──────────────────────────────────────────────
   GRAIN OVERLAY
   ────────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  );
}

/* ──────────────────────────────────────────────
   TILT CARD
   ────────────────────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.01,1.01,1.01)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)'; };
  return <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ transition: 'transform .35s ease', willChange: 'transform' }}>{children}</div>;
}

/* ──────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ──────────────────────────────────────────────
   BLOG TYPE
   ────────────────────────────────────────────── */
interface Blog {
  id: string;
  title: string;
  banner_image: string;
  meta_description: string;
  created_at: string;
}

/* ══════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════ */
export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(r => r.json())
      .then(data => { setBlogs(data.blogs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <GrainOverlay />

      <div className="bg-[#FDFBF8] min-h-screen">

        {/* ══════════════════════════════════════════════
            HERO — Navy with parallax & floating orbs
        ══════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-[#050821] to-[#0B0F33] text-center py-20 md:py-28 px-4 border-b border-white/10">
          {/* Dot grid pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(224,163,106,0.08) 1.5px, transparent 1.5px)', backgroundSize: '38px 38px' }} />

          {/* Floating orbs */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-16 -right-16 w-72 h-72 bg-[#E0A36A]/8 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#9C5B5A]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#EFD3C9]/5 rounded-full blur-2xl"
          />

          {/* Decorative ring */}
          <div className="absolute right-[-100px] top-[-100px] pointer-events-none hidden md:block">
            <div className="w-[300px] h-[300px] border border-[#E0A36A]/10 rounded-full animate-spin" style={{ animationDuration: '40s' }} />
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm text-[#E0A36A] text-xs font-display font-bold uppercase tracking-[0.3em] px-5 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-[#E0A36A] rounded-full animate-pulse" />
              Case Studies & Insights
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
            >
              Our Insights &{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #EFD3C9 0%, #E0A36A 50%, #9C5B5A 100%)' }}
              >
                Blogs
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 text-base md:text-lg max-w-lg mx-auto font-light leading-relaxed"
            >
              Explore creative development breakthroughs and targeted web methodologies from our workspace desk.
            </motion.p>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-1 bg-gradient-to-r from-[#E0A36A] to-[#9C5B5A] mx-auto mt-6 rounded-full origin-left"
            />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════
            BLOG GRID — Animated staggered cards
        ══════════════════════════════════════════════ */}
        <section className="py-14 md:py-16 bg-[#FDFBF8] relative">
          {/* Background number watermark */}
          <div className="absolute right-6 top-10 font-display font-black leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(6rem,12vw,12rem)', color: 'rgba(10,10,41,0.03)' }}>
            BLOG
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {loading ? (
              /* Loading skeleton */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                    <div className="h-32 sm:h-60 bg-gray-100" />
                    <div className="p-3 sm:p-6 space-y-3">
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length > 0 ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={stagger}
                className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
              >
                {blogs.map((blog) => (
                  <motion.div key={blog.id} variants={fadeUp}>
                    <TiltCard>
                      <Link href={`/blog/${blog.id}`} className="block h-full">
                        <motion.div
                          whileHover={{ y: -6 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                          className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#E0A36A]/40 flex flex-col h-full group"
                        >
                          {/* Image */}
                          <div className="relative bg-gray-50/80 flex items-center justify-center p-3 h-32 sm:h-60 border-b border-gray-100 overflow-hidden">
                            <Image
                              src={`/uploads/${blog.banner_image}`}
                              alt={blog.title}
                              width={400}
                              height={240}
                              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Content */}
                          <div className="p-3 sm:p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-1 sm:gap-2 text-gray-500 text-[10px] sm:text-sm font-medium mb-1.5 sm:mb-3">
                              <FaCalendarAlt className="text-[#E0A36A] text-[9px] sm:text-xs" />
                              {new Date(blog.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>

                            <h5 className="text-xs sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 transition-colors group-hover:text-[#E0A36A] line-clamp-2 font-display">
                              {blog.title}
                            </h5>

                            <p className="text-gray-600 text-[10px] sm:text-sm leading-normal sm:leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                              {blog.meta_description}
                            </p>

                            <div className="mt-auto font-bold text-[9px] sm:text-sm text-[#9C5B5A] inline-flex items-center gap-1 sm:gap-2 w-fit font-display uppercase tracking-wider">
                              Read Article
                              <FaArrowRight className="transition-transform group-hover:translate-x-1 text-[8px] sm:text-xs" />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-full text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-sm"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaFeatherAlt className="text-5xl text-[#E0A36A]/30 mx-auto mb-4" />
                </motion.div>
                <p className="text-gray-500 text-lg font-display">No corporate case studies published yet.</p>
                <p className="text-gray-400 text-sm mt-1">Check back soon for fresh insights.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            BOTTOM CTA — Newsletter / contact strip
        ══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#050821] to-[#0B0F33] py-14 md:py-16">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(224,163,106,0.06) 1.5px, transparent 1.5px)', backgroundSize: '38px 38px' }} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="container mx-auto px-4 text-center relative z-10"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-2xl md:text-4xl font-extrabold text-white mb-3"
            >
              Want to Grow Your{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #EFD3C9, #E0A36A, #9C5B5A)' }}>
                Brand Online?
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/60 text-sm md:text-base mb-8 max-w-md mx-auto font-light">
              Let&apos;s build a data-driven strategy for your business. Free consultation — no strings attached.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#E0A36A] to-[#9C5B5A] hover:shadow-lg hover:shadow-[#E0A36A]/20 text-white px-8 py-3.5 rounded-full font-display font-bold transition-all duration-300 shadow-lg text-sm"
              >
                Get Free Consultation
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 border border-white/20 hover:border-[#E0A36A]/40 text-white/80 hover:text-white px-8 py-3.5 rounded-full font-display font-bold transition-all duration-300 text-sm"
              >
                Our Services
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </>
  );
}
