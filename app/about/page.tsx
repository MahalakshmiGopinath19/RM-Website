// app/about/page.tsx – Complete UI redesign (content unchanged)
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaPlus, FaMinus, FaChartLine, FaRocket, FaGlobe } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';

// ------------------------------------------------------------
// Animation variants
// ------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// ------------------------------------------------------------
// FAQ Accordion Item – redesigned with plus/minus
// ------------------------------------------------------------
function FAQItem({ question, answer, isOpen, onClick }: any) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex justify-between items-center text-left text-gray-800 font-semibold text-base md:text-lg hover:text-red-600 transition group"
      >
        <span className="group-hover:text-red-600 transition pr-4">{question}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#D32F2F] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-[#D32F2F]'}`}>
          {isOpen ? <FaMinus className="text-sm" /> : <FaPlus className="text-sm" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------------------
// Main About Page
// ------------------------------------------------------------
export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // --- Data (unchanged) ---
  const industries = [
    { icon: '/image/beach_access.png', name: 'Beauty & Cosmetic' },
    { icon: '/image/restaurant_menu.png', name: 'Food & Beverages' },
    { icon: '/image/laundry.png', name: 'Fashion & Apparels' },
    { icon: '/image/add_home.png', name: 'Real Estate' },
  ];

  const journeyMilestones = [
    { year: '2015', desc: 'Founded with a passion for AI-driven digital innovation' },
    { year: '2020', desc: 'Expanded services globally with 100+ AI-powered campaigns' },
    { year: '2023', desc: 'Awarded Best AI-Integrated Digital Marketing Agency' },
  ];

  const faqs = [
    {
      question: 'What makes your digital marketing approach different?',
      answer: 'We combine data-driven insights with creative strategies to deliver measurable results. Every campaign is tailored to your business goals, audience, and industry – ensuring maximum impact and ROI.'
    },
    {
      question: 'How do you help businesses grow online?',
      answer: 'We build a comprehensive strategy that includes SEO, social media, content marketing, and paid advertising. Our team continuously optimises your campaigns to attract more visitors, convert leads, and scale your business.'
    },
    {
      question: 'What kind of results can I expect?',
      answer: 'Results vary based on your goals and industry. Typically, SEO and content marketing show steady growth over 3-6 months, while paid campaigns can deliver immediate traffic. We provide regular reports to track your progress.'
    },
    {
      question: 'How do you measure campaign success?',
      answer: 'We track key performance indicators like website traffic, conversion rates, lead generation, and ROI. Using real-time analytics, we refine strategies to ensure your marketing budget is always working effectively.'
    },
  ];

  const testimonials = [
    {
      name: 'Alan Baker',
      role: 'CEO of ABC Corp',
      quote: 'Rainbow Media transformed our online presence and tripled our lead generation in just 6 months. Their strategies gave us insights we never had before. Unmatched expertise!',
      icon: '/image/icon1.png',
    },
    {
      name: 'John',
      role: 'Marketing Director at GlobalTech',
      quote: 'The team at Rainbow Media helped us expand our brand globally. Their approach delivered measurable growth and made us a market leader in our sector.',
      icon: '/image/icon2.png',
    },
    {
      name: 'Emily',
      role: 'Owner of Luxe Fashion',
      quote: 'Rainbow Media’s social campaigns boosted our engagement by 200%. Their creative use of data turned our brand into a trendsetter. Outstanding work!',
      icon: '/image/icon3.png',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* ========== HERO – redesigned with floating decor ========== */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20"></div>
        <div className="container mx-auto px-4 pt-12 md:pt-16 pb-16 md:pb-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="md:w-7/12">
              <div className="inline-flex items-center gap-2 bg-[#D32F2F]/10 text-[#D32F2F] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#D32F2F]/20 backdrop-blur-sm mb-5">
                <span className="w-2 h-2 bg-[#D32F2F] rounded-full animate-pulse"></span>
                AI-Powered Agency
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Provide the best service with <span className="text-[#D32F2F]">out‑of‑the‑box AI‑powered</span> ideas
              </h2>
            </div>
            <div className="md:w-5/12">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We are a passionate team of digital marketing enthusiasts dedicated to helping businesses succeed in the digital world. With years of experience and a deep understanding of the ever-evolving online landscape, we stay at the forefront of AI‑integrated trends and technologies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== STATS & MISSION/VISION – redesigned cards ========== */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Stats card – gradient + decor */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Leverage digital advertising</h2>
                <p className="text-white/90 mb-6">With over 3000+ brand audits & 100+ performance marketing strategies, we understand what it takes to make your brand good & scalable.</p>
              </div>
              <FaRocket className="text-4xl text-white/20 flex-shrink-0" />
            </div>
            <div className="relative z-10 flex gap-12">
              <div><div className="text-3xl md:text-4xl font-bold">500+</div><p className="text-white/80 text-sm">Projects Completed</p></div>
              <div><div className="text-3xl md:text-4xl font-bold">100+</div><p className="text-white/80 text-sm">Trusted Brands</p></div>
            </div>
          </div>

          {/* Mission & Vision – redesigned with left border accent */}
          <div className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-[#D32F2F]/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#D32F2F] flex-shrink-0 group-hover:bg-[#D32F2F] group-hover:text-white transition-all duration-300">
                  <FaChartLine className="text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Mission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">Empower businesses through innovative AI‑integrated digital marketing strategies that foster growth, engagement, and success.</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-[#D32F2F]/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#D32F2F] flex-shrink-0 group-hover:bg-[#D32F2F] group-hover:text-white transition-all duration-300">
                  <FaGlobe className="text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Vision</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">A future where every business has the expertise to thrive in the digital world.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== INDUSTRIES – redesigned container ========== */}
      <div className="bg-[#D32F2F] py-16 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Our solutions keep you ahead</h3>
          <p className="text-white/80 mb-8">Industries we bring expertise in</p>
          <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl py-6 px-6 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {industries.map((ind, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white group cursor-default">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition">
                    <img src={ind.icon} alt={ind.name} className="w-6 h-6" />
                  </div>
                  <span className="text-sm md:text-base font-medium">{ind.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== TESTIMONIAL SLIDER – redesigned cards ========== */}
      <div className="relative bg-cover bg-center bg-no-repeat py-16 md:py-20" style={{ backgroundImage: "url('/image/testi.png')" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-10">What Our Clients Say</h2>
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={30}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-start text-left">
                  <svg className="w-8 h-8 text-red-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 1.151c-2.857 1.232-4.387 3.432-4.387 5.424h4.392v11.425h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 1.151c-2.857 1.232-4.387 3.432-4.387 5.424h4.392v11.425h-9.983z" />
                  </svg>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed italic flex-1">“{t.quote}”</p>
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100 w-full">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative flex-shrink-0 ring-2 ring-[#D32F2F]/20">
                      <img src={t.icon} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900">{t.name}</h5>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-slide {
          transition: all 0.4s ease;
          opacity: 0.5;
          transform: scale(0.92);
          filter: blur(2px);
        }
        .testimonial-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1.04);
          filter: blur(0);
          z-index: 10;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 {
          background-color: #B71C1C;
          color: white;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 p,
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 h5,
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .text-gray-500,
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .text-gray-700 {
          color: white !important;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .border-gray-100 {
          border-color: rgba(255,255,255,0.2) !important;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .text-red-200 {
          color: rgba(255,255,255,0.4) !important;
        }
        .testimonial-swiper .swiper-slide-active .bg-white\\/95 .ring-[#D32F2F]/20 {
          ring-color: rgba(255,255,255,0.4) !important;
        }
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          color: #B71C1C;
          background: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .testimonial-swiper .swiper-button-next:after,
        .testimonial-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .testimonial-swiper .swiper-slide-active { transform: scale(1.02); }
          .testimonial-swiper .swiper-slide { filter: blur(1px); }
        }
      `}</style>

      {/* ========== GLOBAL JOURNEY – redesigned with glass card ========== */}
      <div className="relative bg-cover bg-center bg-no-repeat py-16 md:py-20" style={{ backgroundImage: "url('/image/tesbanner.webp')" }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Global Journey</h2>
              <p className="text-white/90 mb-8">At Rainbow Media, we believe in a data‑driven approach to innovation. Our global journey reflects the trust clients place in us, and we continue to push boundaries to ensure their success.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {journeyMilestones.map((milestone, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/20 transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-[#D32F2F] rounded-full shadow-lg shadow-red-500/30"></div>
                    <h4 className="text-2xl font-bold text-white">{milestone.year}</h4>
                  </div>
                  <p className="text-white/80 mt-1 text-sm">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== FAQ SECTION – redesigned layout ========== */}
      <div className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 bg-[#D32F2F]/10 text-[#D32F2F] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#D32F2F]/20 mb-4">
                <span className="w-2 h-2 bg-[#D32F2F] rounded-full"></span>
                FAQ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-6">Find answers to the most common questions about our digital marketing services.</p>
              <a href="/contact" className="inline-flex items-center gap-2 bg-[#B71C1C] hover:bg-[#D32F2F] text-white px-6 py-3 rounded-full font-semibold transition shadow-md hover:shadow-lg">
                Contact Our Experts <span className="group-hover:translate-x-1 transition">→</span>
              </a>
            </div>
            <div className="md:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                {faqs.map((faq, idx) => (
                  <FAQItem
                    key={idx}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaq === idx}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== BACK TO TOP ========== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-[#D32F2F] text-white p-3 rounded-full shadow-lg z-40 hover:bg-[#B71C1C] transition-all hover:shadow-xl"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        html, body { overscroll-behavior: none; scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}