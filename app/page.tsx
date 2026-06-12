  // app/services/page.tsx
  'use client';

  import { useState, useRef, useEffect } from 'react';
  import { motion, useInView, AnimatePresence, Variants, useScroll, useTransform } from 'framer-motion';
  import { 
    FaArrowRight, FaWhatsapp, FaChartLine, FaRobot, FaBrain, 
    FaChevronUp 
  } from 'react-icons/fa';

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const fadeUpFast: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  export default function ServicesPage() {
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
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

    useEffect(() => {
      const handleScroll = () => setShowBackToTop(window.scrollY > 500);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
      'Social Media Marketing (AI Optimized)',
      'AI Website Creation & Management',
      'Google Ads + AI Bidding',
      'AI Powered SEO',
      'Content Marketing with GPT',
      'YouTube & Google Promotion',
      'Custom AI Chatbots',
      'Others'
    ];

    // Services with large images (no black backgrounds)
    const services = [
      { image: '/image/sm-img.webp', title: 'AI Social Media Marketing', desc: 'Algorithm‑optimized organic growth + hyper‑targeted ads using predictive analytics.', cta: 'Free Audit', link: true },
      { image: '/image/wb.webp', title: 'AI Website Creation', desc: 'Self‑optimizing websites that learn from user behavior and convert 24/7.', cta: 'Chat with Dev', link: false, href: 'https://wa.me/917305821333?text=AI%20Website%20Inquiry' },
      { image: '/image/gmb.webp', title: 'Google My Business', desc: 'AI‑driven profile optimization & review sentiment analysis for local domination.', cta: 'Call for Local SEO', link: false, href: 'tel:+917305821333' },
      { image: '/image/seo.webp', title: 'Search Engine Optimization', desc: 'Machine learning for keyword prediction, content generation, and ranking.', cta: 'Request SEO Analysis', link: true },
      { image: '/image/bcd.webp', title: 'AI Branding & Design', desc: 'Generative AI for logos, visuals, and brand strategies that stick forever.', cta: 'Email Design Team', link: false, href: 'mailto:rmedia1123.info@gmail.com' },
    ];

    // UX Steps with large images (light backgrounds only)
    const uxSteps = [
      { image: '/image/uxui-1.webp', title: '1. Research & Ideation', desc: 'We dive deep into understanding your users and business goals through competitor analysis and innovative brainstorming.', tags: ['User Journey Map', 'Competitor Analysis'] },
      { image: '/image/uxui-2.webp', title: '2. Wireframes & Prototyping', desc: 'We map out the user journey and core functionality, visualizing the blueprint before adding the final paint.', tags: ['Low fidelity wireframe', 'Wireframe & Prototyping'] },
      { image: '/image/uxui-3.webp', title: '3. Design & Testing', desc: 'We finalize the high-fidelity visuals and test the UI with real users, guaranteeing it meets exact business objectives.', tags: ['High-fidelity UI designs', 'Design & Testing'] }
    ];

    const fullstackSteps = [
      { icon: '/image/fs-1.png', title: '1. AI Crafted Interfaces', desc: 'Generative UI components + responsive design.' },
      { icon: '/image/fs-2.png', title: '2. Intelligent Backend', desc: 'Auto‑scaling APIs & AI database optimization.' },
      { icon: '/image/fs-3.png', title: '3. Autonomous QA', desc: 'AI test suites that catch bugs before deploy.' },
      { icon: '/image/fs-4.png', title: '4. Smart Launch', desc: 'Predictive scaling & self‑healing infrastructure.' },
    ];
    return (

      <div className="bg-white min-h-screen">
        <main
          ref={containerRef}
          className="overflow-hidden bg-white"
        >
          {/* Hero Section */}
          <section ref={heroRef} className="relative bg-gradient-to-br from-white via-red-50 to-white pt-6 pb-28 md:pt-10 md:pb-32">
            <div className="container mx-auto px-4">
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeUp}
                className="flex flex-col lg:flex-row items-center gap-12"
              >
                <div className="flex-1 text-center lg:text-left z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center gap-2 bg-red-100 text-[#D32F2F] px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                  >
                    <FaRobot className="animate-pulse" /> AI Integrated Digital & IT Agency
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight">
                    <span className="text-gray-800">Rainbow</span>{' '}
                    <span className="text-[#D32F2F]">Media</span>
                  </h1>
                  <p className="text-2xl md:text-3xl font-semibold text-gray-700 mt-2">
                    AI‑Driven Digital Marketing
                  </p>
                  <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto lg:mx-0">
                    We blend creativity with artificial intelligence to build ecosystems that capture attention,
                    predict trends, and multiply your revenue.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 30px -10px rgba(211,47,47,0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(true)}
                      className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 group"
                    >
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" /> Free AI Audit
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.05, backgroundColor: '#D32F2F', color: 'white' }}
                      whileTap={{ scale: 0.98 }}
                      href="https://wa.me/917305821333"
                      target="_blank"
                      className="border-2 border-[#D32F2F] text-[#D32F2F] px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2"
                    >
                      <FaWhatsapp /> WhatsApp Now
                    </motion.a>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                  animate={heroInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 0.8, type: 'spring', delay: 0.3 }}
                  className="flex-1"
                  style={{ y: heroY, opacity: heroOpacity }}
                >
                  <img src="/image/newbanner.webp" alt="AI Digital Marketing" className="w-full rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105" />
                </motion.div>
              </motion.div>
            </div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
          </section>

          {/* Dominating the Digital Landscape */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="container mx-auto px-4 py-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800">
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
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mt-4">
              We build complete digital ecosystems powered by predictive analytics, smart automation,
              and data‑driven creativity — driving relentless revenue and trust.
            </p>
          </motion.section>

          {/* Services Grid – Large Images */}
          <section ref={servicesRef} className="container mx-auto px-4 py-8 pb-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((s, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all group"
                >
                  <div className="w-full bg-gray-50 flex items-center justify-center p-6">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-auto max-h-56 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{s.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                    {s.link ? (
                      <button onClick={() => setShowModal(true)} className="text-[#D32F2F] font-semibold mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        {s.cta} <FaArrowRight size={12} />
                      </button>
                    ) : (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[#D32F2F] font-semibold mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        {s.cta} <FaArrowRight size={12} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* UX/UI Process – Large Images */}
          <section ref={uxRef} className="bg-gradient-to-br from-red-50 to-white py-20 relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-40"></div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center max-w-3xl mx-auto mb-12"
              >
                <span className="inline-block bg-red-100 text-[#D32F2F] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">The Science of Beauty + AI</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Our AI‑Enhanced UX/UI Process</h2>
                <p className="text-gray-600 text-lg mt-2">Human‑centered design accelerated by artificial intelligence.</p>
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
              >
                {uxSteps.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all"
                  >
                    <div className="w-full bg-gray-50 flex items-center justify-center p-4">
                      <img src={item.image} alt={item.title} className="w-full h-auto max-h-64 object-contain" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                      {item.tags && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs bg-red-50 text-[#D32F2F] px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Full‑Stack Development – bright red gradient (no black) */}
          <section ref={fullstackRef} className="relative bg-gradient-to-r from-[#E53935] to-[#FF6B6B] text-white py-20 my-10" style={{ clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)' }}>
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row gap-12 items-center pb-16 border-b border-white/20 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1"
                >
                  <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-3 backdrop-blur-sm">
                    <FaBrain /> Engineering Excellence
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold">AI‑Integrated Full‑Stack Workflow</h2>
                  <p className="text-white/90 text-lg mt-3">Secure, scalable applications with AI copilots at every stage.</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)} 
                    className="mt-6 bg-white text-[#E53935] px-6 py-3 rounded-full font-bold shadow-md hover:shadow-xl transition-all"
                  >
                    Architect Your Platform →
                  </motion.button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
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
                className="grid md:grid-cols-4 gap-8 text-center md:text-left"
              >
                {fullstackSteps.map((step, idx) => (
                  <motion.div key={idx} variants={fadeUp} whileHover={{ y: -5 }}>
                    <img src={step.icon} className="w-20 h-20 mx-auto md:mx-0 mb-4" alt="step" />
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <p className="text-white/80 text-sm">{step.desc}</p>
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
            className="container mx-auto px-4 py-16"
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-xl border border-red-100 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Ready to transform your ideas into reality?</h2>
                <p className="text-gray-600 text-lg mt-2">Leave your number – our AI strategist will call back within 24h.</p>
                <form onSubmit={handleQuickSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <input
                    type="tel"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    placeholder="Enter your phone number..."
                    className="px-6 py-3 rounded-full border border-gray-300 flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-[#D32F2F] transition placeholder:text-gray-500"
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
            </div>
          </motion.section>

          {/* Project Gallery */}
          <section ref={galleryRef} className="container mx-auto px-4 py-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-10"
            >
              <span className="inline-block bg-red-100 text-[#D32F2F] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">The Proof Is in the Pixels</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Projects Created for Beloved Clients</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <img src={`/image/oa-${i}.webp`} alt={`Project ${i}`} className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105" />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Ads Expertise */}
          <section ref={adsRef} className="container mx-auto px-4 py-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl shadow-xl border-t-4 border-[#D32F2F] p-8 md:p-12 flex flex-col lg:flex-row gap-10 items-center"
            >
              <div className="flex-1">
                <span className="inline-block bg-red-100 text-[#D32F2F] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Scaling Success with AI</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">We Are Experts in AI‑Driven Ads</h2>
                <p className="text-gray-600 text-lg mt-2">Maximize ROI with predictive targeting, automated creative testing, and real‑time bid adjustments.</p>
                <div className="mt-6 space-y-4 border-l-4 border-[#D32F2F] pl-5">
                  {[
                    { emoji: '🎯', title: 'AI Targeted Campaigns', desc: 'Deep learning models that find your ideal audience.' },
                    { emoji: '📈', title: '2000+ AI‑Optimized Campaigns', desc: 'Proven across competitive industries.' },
                    { emoji: '⚡', title: 'Real‑Time AI Tracking', desc: 'Continuous optimization for maximum ROAS.' }
                  ].map((item, idx) => (
                    <motion.div key={idx} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <h4 className="font-bold text-[#D32F2F]">{item.emoji} {item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 30px -10px rgba(211,47,47,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(true)} 
                  className="mt-8 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-6 py-3 rounded-full font-bold shadow-md flex items-center gap-2 group"
                >
                  <FaChartLine /> Scale My Ad Returns <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={14} />
                </motion.button>
              </div>
              <div className="flex-1 flex flex-row justify-center items-center gap-6 flex-wrap">
                <img src="/image/era.webp" alt="AI Ads" className="rounded-xl shadow-lg max-w-[200px] w-full" />
                <img src="/image/soc_link.webp" alt="Social Platforms" className="max-w-[180px] w-full" />
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
              className="fixed bottom-8 right-8 bg-[#D32F2F] text-white p-3 rounded-full shadow-lg z-40 transition-all"
            >
              <FaChevronUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Consultation Modal – Lighter backdrop (no black) */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/20 backdrop-blur-sm p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 20 }}
                className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row"
              >
                <div className="bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] text-white p-8 md:p-10 w-full md:w-2/5 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                      Let's talk <br /> about your <span className="underline decoration-white/30">AI vision</span>.
                    </h2>
                    <p className="text-white/80 text-sm">Fill the form – we'll respond via WhatsApp within minutes.</p>
                  </div>
                  <div className="mt-8 space-y-3 text-sm">
                    <div className="flex items-center gap-2"><FaRobot /> AI‑powered strategy</div>
                    <div className="flex items-center gap-2">⚡ Instant WhatsApp reply</div>
                    <div className="flex items-center gap-2">🚀 No obligation, just advice</div>
                  </div>
                </div>
                <div className="p-8 md:p-10 w-full md:w-3/5 bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Request a consultation</h3>
                      <p className="text-gray-400 text-xs mt-1">We'll message you on WhatsApp</p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-600 transition text-xl leading-none">✕</button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">What AI service do you need?</label>
                      <select name="service" value={formData.service} onChange={handleChange} className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#D32F2F] transition">
                        {serviceOptions.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Your name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#D32F2F] transition" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">WhatsApp number</label>
                        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="+91 98765 43210" className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#D32F2F] transition" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Message (optional)</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Tell us about your goals..." className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#D32F2F] transition resize-none" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2"
                    >
                      Submit & Get Started <FaArrowRight size={14} />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
          </AnimatePresence>
      </div>
    );
  }