// app/services/page.tsx - Fixed overscroll + responsive
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence, Variants, useScroll, useTransform, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { 
  FaArrowRight, FaWhatsapp, FaChartLine, FaRobot, FaBrain, 
  FaChevronUp, FaHeartbeat, FaLayerGroup, FaSync
} from 'react-icons/fa';

// Animation variants (unchanged)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let i = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700 mt-4 block">
      {displayText}
      {displayText.length < text.length && <span className="animate-pulse ml-1">|</span>}
    </span>
  );
};

export default function ServicesPage() {
  // ... (all state and refs exactly as in your original code)
  const [showModal, setShowModal] = useState(false);
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    service: 'Social Media Marketing (AI Optimized)',
    name: '',
    contact: '',
    message: ''
  });

  const [serviceIndex, setServiceIndex] = useState(0);
  const serviceDragX = useMotionValue(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const containerRefServices = useRef<HTMLDivElement>(null);

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const uxRef = useRef(null);
  const fullstackRef = useRef(null);
  const galleryRef = useRef(null);
  const adsRef = useRef(null);
  const containerRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const uxInView = useInView(uxRef, { once: true, amount: 0.2 });
  const fullstackInView = useInView(fullstackRef, { once: true, amount: 0.2 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.1 });
  const adsInView = useInView(adsRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    if (containerRefServices.current) {
      const resizeObserver = new ResizeObserver(() => {
        setTrackWidth(containerRefServices.current?.offsetWidth || 0);
      });
      resizeObserver.observe(containerRefServices.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '917305821333';
    const text = `Hello! AI Consultation Request%0A%0AService: ${formData.service}%0AName: ${formData.name}%0AContact: ${formData.contact}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setShowModal(false);
    setFormData({ service: 'Social Media Marketing (AI Optimized)', name: '', contact: '', message: '' });
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickSubmitted(true);
    const msg = `Hi Rainbow Media! Please call me back: ${quickPhone}`;
    window.open(`https://wa.me/917305821333?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => {
      setQuickSubmitted(false);
      setQuickPhone('');
    }, 1500);
  };

  const serviceOptions = [
    'Social Media Marketing',
    'Website Creation & Management',
    'Google Ads & Google My Business',
    'Pay Per Click Ads',
    'Search Engine Optimization (SEO)',
    'Content Marketing',
    'YouTube & Google Promotion',
    'Campaign Ideas & Implementation',
    'Others'
  ];

  const services = [
    { image: '/image/sm-img.webp', title: 'AI Social Media Marketing', desc: 'Algorithm‑optimized organic growth + hyper‑targeted ads using predictive analytics.', cta: 'Free Audit', link: true },
    { image: '/image/wb.webp', title: 'AI Website Creation', desc: 'Self‑optimizing websites that learn from user behavior and convert 24/7.', cta: 'Chat with Dev', link: false, href: 'https://wa.me/917305821333?text=AI%20Website%20Inquiry' },
    { image: '/image/gmb.webp', title: 'Google My Business', desc: 'AI‑driven profile optimization & review sentiment analysis for local domination.', cta: 'Call for Local SEO', link: false, href: 'tel:+917305821333' },
    { image: '/image/seo.webp', title: 'Search Engine Optimization', desc: 'Machine learning for keyword prediction, content generation, and ranking.', cta: 'Request SEO Analysis', link: true },
    { image: '/image/bcd.webp', title: 'AI Branding & Design', desc: 'Generative AI for logos, visuals, and brand strategies that stick forever.', cta: 'Email Design Team', link: false, href: 'mailto:rmedia1123.info@gmail.com' },
  ];

  const uxSteps = [
    { image: '/image/uxui-1.webp', title: 'Research & Planning', desc: 'We learn about your business, users, and goals. AI helps us gather insights and find the best design direction faster.' },
    { image: '/image/uxui-2.webp', title: 'Wireframes & Prototypes', desc: 'We create simple layouts and clickable prototypes to show how your website or app will work before development begins.' },
    { image: '/image/uxui-3.webp', title: 'Design & Improvement', desc: 'We design beautiful, user-friendly screens and use AI insights to improve the experience for better engagement and results.' }
  ];

  const fullstackSteps = [
    { icon: '/image/fs-1.png', title: '1. AI Crafted Interfaces', desc: 'Generative UI components + responsive design.', bgColor: 'bg-red-100', iconBg: 'bg-white' },
    { icon: '/image/fs-2.png', title: '2. Intelligent Backend', desc: 'Auto‑scaling APIs & AI database optimization.', bgColor: 'bg-red-100', iconBg: 'bg-white' },
    { icon: '/image/fs-3.png', title: '3. Autonomous QA', desc: 'AI test suites that catch bugs before deploy.', bgColor: 'bg-red-100', iconBg: 'bg-white' },
    { icon: '/image/fs-4.png', title: '4. Smart Launch', desc: 'Predictive scaling & self‑healing infrastructure.', bgColor: 'bg-red-100', iconBg: 'bg-white' },
  ];

  const cardWidth = 520;
  const gap = 24;
  const visibleCards = trackWidth > 0 ? Math.floor((trackWidth + gap) / (cardWidth + gap)) : 1;
  const maxIndex = Math.max(0, services.length - visibleCards);
  const dragConstraints = { left: -maxIndex * (cardWidth + gap), right: 0 };

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 100;
    if (offset < -threshold || velocity < -500) {
      setServiceIndex(prev => Math.min(prev + 1, maxIndex));
    } else if (offset > threshold || velocity > 500) {
      setServiceIndex(prev => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    serviceDragX.set(-serviceIndex * (cardWidth + gap));
  }, [serviceIndex, serviceDragX]);

  return (
    <div className="bg-white min-h-screen">
      <main ref={containerRef} className="overflow-hidden bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative bg-white pt-5 md:pt-8 pb-6 md:pb-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="flex flex-col items-center gap-1 md:gap-2"
            >
              <div className="text-center max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center gap-2 bg-red-100 text-[#D32F2F] px-4 py-1.5 rounded-full text-sm md:text-base font-semibold mb-3"
                >
                  <FaRobot className="animate-pulse" /> AI Integrated Digital & IT Agency
                </motion.div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
                  <span className="text-gray-800">Rainbow</span>{' '}
                  <span className="text-[#D32F2F]">Media</span>
                </h1>
                <div className="mt-2">
                  <Typewriter text="IT Integrated Digital Marketing Agency" />
                </div>
                <p className="text-gray-600 text-base md:text-lg lg:text-xl mt-3 max-w-4xl mx-auto leading-relaxed">
                  Our Rainbow Media is a dynamic and innovative design agency that brings creative ideas to life.
                  We work with a wide range of clients to develop unique and effective branding, web design, and graphic design solutions.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  className="flex flex-wrap gap-4 justify-center mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 25px 35px -12px rgba(211,47,47,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 group text-base md:text-lg"
                  >
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" /> Free AI Audit
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.05, backgroundColor: '#D32F2F', color: 'white', borderColor: '#D32F2F' }}
                    whileTap={{ scale: 0.98 }}
                    href="https://wa.me/917305821333"
                    target="_blank"
                    className="border-2 border-[#D32F2F] text-[#D32F2F] px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 text-base md:text-lg"
                  >
                    <FaWhatsapp /> WhatsApp Now
                  </motion.a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full mt-2"
                style={{ y: heroY, opacity: heroOpacity }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/image/newbanner.webp" 
                    alt="AI Digital Marketing" 
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Dominating the Digital Landscape */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="container mx-auto px-4 py-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-800">
            Dominating the <span className="text-[#D32F2F] relative inline-block">
              AI‑Powered
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-red-200 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ originX: 0 }}
              />
            </span> Digital Landscape
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mt-4 leading-relaxed">
            We build complete digital ecosystems powered by predictive analytics, smart automation,
            and data‑driven creativity — driving relentless revenue and trust.
          </p>
        </motion.section>

        {/* Services Carousel (unchanged) */}
        <section ref={servicesRef} className="container mx-auto px-4 py-8 pb-20 overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Our AI‑Driven Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-2">Explore our range of intelligent marketing solutions</p>
          </motion.div>
          <div ref={containerRefServices} className="relative">
            <div className="overflow-hidden">
              <motion.div
                drag="x"
                dragConstraints={dragConstraints}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{ x: -serviceIndex * (cardWidth + gap) }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex gap-6 cursor-grab active:cursor-grabbing"
                style={{ width: services.length * (cardWidth + gap) }}
              >
                {services.map((s, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-shrink-0 w-[520px] bg-red-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-white p-4 flex justify-center items-center h-96">
                      <img src={s.image} alt={s.title} className="max-h-80 w-auto object-contain" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{s.title}</h3>
                      <p className="text-white/90 text-base md:text-lg leading-relaxed">{s.desc}</p>
                      {s.link ? (
                        <button onClick={() => setShowModal(true)} className="text-white font-bold mt-5 inline-flex items-center gap-2 hover:gap-3 transition-all text-base md:text-lg border-b-2 border-white/50 pb-1">
                          {s.cta} <FaArrowRight size={14} />
                        </button>
                      ) : (
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white font-bold mt-5 inline-flex items-center gap-2 hover:gap-3 transition-all text-base md:text-lg border-b-2 border-white/50 pb-1">
                          {s.cta} <FaArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {maxIndex > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setServiceIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${serviceIndex === idx ? 'w-8 bg-[#D32F2F]' : 'w-2 bg-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* UX/UI Process */}
        <section ref={uxRef} className="bg-gray-50 py-16 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-200 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-300 rounded-full blur-3xl opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">The Science of Beauty + AI</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Our AI‑Enhanced <span className="text-red-500">UX/UI Process</span></h2>
              <p className="text-gray-600 text-base md:text-lg mt-3 max-w-2xl mx-auto">Human‑centered design accelerated by artificial intelligence — from research to testing.</p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {uxSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-400"
                >
                  <div className="bg-gray-100 flex items-center justify-center p-4">
                    <img src={step.image} alt={step.title} className="w-full h-auto max-h-52 object-contain transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-red-500 font-mono text-sm font-bold">0{i+1}</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-red-400 to-transparent"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Full‑Stack Section */}
        <section ref={fullstackRef} className="relative bg-gradient-to-r from-[#E53935] to-[#FF6B6B] text-white py-20 my-10" style={{ clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)' }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-center pb-16 border-b border-white/20 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex-1 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-3 bg-white/20 text-white px-5 py-2 rounded-full text-base font-bold mb-5 backdrop-blur-sm">
                  <FaBrain /> Engineering Excellence
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">AI‑Integrated<br />Full‑Stack Workflow</h2>
                <p className="text-white/90 text-xl mt-4 max-w-lg">Secure, scalable applications with AI copilots at every stage.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(true)} 
                  className="mt-8 bg-white text-[#E53935] px-8 py-3 rounded-full font-bold shadow-md hover:shadow-xl transition-all text-lg"
                >
                  Architect Your Platform →
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex-1"
              >
                <img src="/image/fsdw.webp" alt="Full Stack AI" className="rounded-2xl shadow-2xl w-full" />
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
            >
              {fullstackSteps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUp} 
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group"
                >
                  <div className={`${step.iconBg} w-24 h-24 mx-auto rounded-2xl shadow-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-110`}>
                    <img src={step.icon} className="w-16 h-16 object-contain" alt="step" />
                  </div>
                  <h4 className="font-extrabold text-xl md:text-2xl mb-2">{step.title}</h4>
                  <p className="text-white/80 text-sm md:text-base">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quick Connect Banner */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-10 shadow-xl border border-red-100 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Ready to transform your ideas into reality?</h2>
            <p className="text-gray-600 text-lg mt-2">Leave your number – our AI strategist will call back within 24h.</p>
            <form onSubmit={handleQuickSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="tel"
                value={quickPhone}
                onChange={(e) => setQuickPhone(e.target.value)}
                placeholder="Enter your phone number..."
                className="px-6 py-3 rounded-full border border-gray-300 text-black flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-[#D32F2F] text-base placeholder:text-gray-700"
                required
              />
              <button type="submit" className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D32F2F] transition-all hover:scale-105">
                Call Me Back
              </button>
            </form>
            <AnimatePresence>
              {quickSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-green-600 font-semibold"
                >
                  ✅ Thanks! We'll call you shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Project Gallery */}
        <section ref={galleryRef} className="container mx-auto px-4 py-8 rounded-2xl bg-gray-800">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-8"
          >
            <span className="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">The Proof Is in the Pixels</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Projects Created for Beloved Clients</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i, idx) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden"
              >
                <div className="relative w-full pt-[75%] leading-[0]">
                  <img
                    src={`/image/oa-${i}.webp`}
                    alt={`Project ${i}`}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.currentTarget.src = '/image/oa-1.webp'; }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ads Section */}
        <section ref={adsRef} className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-white/50 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-100/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10 p-8 md:p-12 lg:p-20">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-red-100 shadow-sm mb-6">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-bold text-red-600 tracking-wider uppercase">Scaling Results</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
                      Experts in <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Digital Advertising</span>
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">Maximize your returns with data-backed targeting, iterative creative testing, and precision bid management.</p>
                  </motion.div>
                  <div className="space-y-4">
                    {[
                      { icon: '🎯', title: 'Targeted Campaigns', desc: 'Precision audience modeling to capture high-intent users.' },
                      { icon: '📈', title: '2000+ Optimized Campaigns', desc: 'A proven framework scaled across global industries.' },
                      { icon: '⚡', title: 'Real‑Time Tracking', desc: 'Continuous performance adjustments for peak ROAS.' }
                    ].map((item, idx) => (
                      <motion.div key={idx} whileHover={{ x: 8 }} className="group flex items-center gap-6 p-5 rounded-2xl bg-white/60 border border-white hover:border-red-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                          <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowModal(true)} className="mt-10 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 text-lg hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                    Scale My Returns <FaArrowRight size={16} />
                  </motion.button>
                </div>
                <div className="flex-1 w-full">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="relative rounded-3xl overflow-hidden shadow-2xl border border-white p-2 bg-white">
                    <img src="/image/era.webp" alt="Dashboard Analytics" className="w-full h-auto rounded-2xl" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(211,47,47,0.5)' }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-[#D32F2F] text-white p-3 rounded-full shadow-lg z-40 hover:bg-[#B71C1C] transition-all"
          >
            <FaChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Consultation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black text-xl">✕</button>
              <div className="bg-[#B71C1C] text-white p-10 md:p-12 w-full md:w-[48%] relative flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-full bg-[#B71C1C] transform skew-x-[-20deg] translate-x-12 hidden md:block pointer-events-none z-0"></div>
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="bg-white/20 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest inline-block mb-6 self-start border border-white/20">
                    Why Choose us
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Choose Us to Grow Your Business</h2>
                  <p className="mb-8 text-white/90 text-sm leading-relaxed">
                    From boosting your online presence to driving targeted traffic, we deliver results that help your business thrive in the DIGITAL WORLD with AI-integrated intelligence.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white text-[#B71C1C] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                      <FaHeartbeat /> Results-Driven Strategy
                    </div>
                    <div className="flex items-center gap-3 bg-white text-[#B71C1C] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                      <FaLayerGroup /> Expertise in Multi-Platform IT
                    </div>
                    <div className="flex items-center gap-3 bg-white text-[#B71C1C] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                      <FaSync /> Continuous AI Optimization
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 md:p-12 w-full md:w-[52%] bg-white flex flex-col justify-center">
                <div className="mb-8 self-end md:self-start">
                  <Image src="/image/logo.webp" alt="Logo" width={160} height={40} />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <select name="service" value={formData.service} onChange={handleChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#B71C1C] text-gray-900 bg-transparent text-sm font-medium">
                    {serviceOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                  <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#B71C1C] text-gray-900 placeholder:text-gray-400 text-sm" required />
                  <input type="tel" name="contact" placeholder="Contact no" value={formData.contact} onChange={handleChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#B71C1C] text-gray-900 placeholder:text-gray-400 text-sm" required />
                  <textarea name="message" placeholder="Message/Requirements" value={formData.message} onChange={handleChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#B71C1C] text-gray-900 placeholder:text-gray-400 text-sm resize-none" rows={1} />
                  <button type="submit" className="w-full bg-[#FF5252] text-white py-3 rounded font-bold hover:bg-red-800 transition text-sm">
                    Submit & Get Started
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global style to prevent black drag/overscroll */}
      <style jsx global>{`
        html, body {
          overscroll-behavior: none;
        }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}