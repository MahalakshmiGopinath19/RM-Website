// app/services/page.tsx - FINAL VERSION
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function ServiceModal({ isOpen, onClose, service, onSubmit }: any) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  if (!isOpen) return null;
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(service.title, form.name, form.phone, form.message);
    onClose();
    setForm({ name: '', phone: '', message: '' });
  }, [form, service, onSubmit, onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl w-full max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-5 md:p-8">
            <div className="relative w-full h-48 md:h-56">
              <Image src={service.image} alt={service.title} fill className="object-cover rounded-xl shadow-md" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#D32F2F] mt-4 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{service.desc}</p>
          </div>
          <div className="md:w-1/2 bg-gray-50 p-5 md:p-8 rounded-b-2xl md:rounded-r-2xl md:rounded-l-none">
            <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1">Get a Free Consultation</h4>
            <p className="text-gray-500 text-xs md:text-sm mb-4">We’ll respond on WhatsApp within minutes.</p>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <input type="text" value={service.title} readOnly className="w-full p-2.5 md:p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 text-sm" />
              <input type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} className="w-full p-2.5 md:p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 text-sm placeholder:text-gray-600" />
              <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} className="w-full p-2.5 md:p-3 border border-gray-200 rounded-xl text-sm placeholder:text-gray-600" />
              <textarea name="message" placeholder="Tell us about your requirements" rows={3} required value={form.message} onChange={handleChange} className="w-full p-2.5 md:p-3 border border-gray-200 rounded-xl resize-none text-sm placeholder:text-gray-600"></textarea>
              <button type="submit" className="w-full bg-[#25D366] hover:bg-green-600 text-white font-semibold py-2.5 md:py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md text-sm md:text-base">
                <span className="fab fa-whatsapp text-base md:text-lg"></span> Send on WhatsApp
              </button>
            </form>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl md:text-2xl">&times;</button>
      </motion.div>
    </div>
  );
}

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setShowBackToTop(window.scrollY > 300), 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const marketingServices = useMemo(() => [
    { title: 'Social Media Marketing (SMM)', image: '/image/oms-1.webp', desc: 'AI‑assisted content ideation, hashtag analysis, and optimal posting schedules. Our human experts run authentic campaigns that build real engagement.' },
    { title: 'Search Engine Optimization (SEO)', image: '/image/oms-2.webp', desc: 'AI‑enhanced keyword discovery, competitor analysis, and content outlines. Our SEO specialists fine‑tune everything to rank you #1 organically.' },
    { title: 'Google Ads & PPC Management', image: '/image/oms-3.webp', desc: 'AI‑powered keyword research and bid recommendations, but every campaign is manually managed by our certified PPC experts for maximum ROI.' },
    { title: 'AI‑Assisted Content Creation', image: '/image/oms-4.webp', desc: 'Generate high‑quality blog posts, ad copies, and social captions 3x faster using AI, then polished by our editors to match your brand voice.' },
  ], []);

  const itServices = useMemo(() => [
    { title: 'AI‑Integrated Web Development', image: '/image/it-1.webp', desc: 'Custom, blazing‑fast websites with built‑in AI chatbots, predictive recommendations, and automated SEO meta‑tags.' },
    { title: 'AI‑Enhanced Mobile App Development', image: '/image/it-2.webp', desc: 'Sleek mobile apps with real‑time personalisation, smart notifications, and AI‑powered customer support.' },
  ], []);

  const openModal = useCallback((service: any) => {
    setSelectedService(service);
    setModalOpen(true);
  }, []);

  const handleWhatsAppSubmit = useCallback((title: string, name: string, phone: string, message: string) => {
    const whatsappNumber = '917305821333';
    const fullMsg = `Hello Rainbow Media! I am interested in your service: *${title}*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Requirements:* ${message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMsg)}`, '_blank');
  }, []);

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="relative bg-gradient-to-br from-white via-red-50 to-white pt-10 md:pt-12 pb-16 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeIn">
            <span className="inline-block bg-red-100 text-[#D32F2F] text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 rounded-full mb-3 md:mb-4 shadow-sm">AI‑Enhanced Digital Agency</span>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight max-w-4xl mx-auto px-2">
              Transform Your Digital Presence with <span className="text-[#D32F2F]">Chennai's Most Trusted Experts</span>
            </h1>
            <p className="text-gray-600 text-base md:text-xl max-w-2xl mx-auto mt-4 md:mt-6 px-2">
              Unlock 100% result‑oriented growth with our digital marketing and IT solutions – now enhanced with AI for faster insights and smarter execution.
            </p>
            <div className="mt-6 md:mt-8">
              <a href="#marketing-slider" className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] hover:shadow-xl text-white px-6 md:px-8 py-2.5 md:py-3.5 rounded-full font-semibold transition shadow-md inline-block text-sm md:text-base">
                Explore Our Services →
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 md:h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Marketing Slider */}
      <div id="marketing-slider" className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-800">Our 100% Result‑Driven Digital Marketing Services</h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mt-4 md:mt-5 rounded-full"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-3 md:mt-4 px-2">Powered by AI for smarter insights, delivered by experts for authentic results</p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 480: { slidesPerView: 1.2, spaceBetween: 16 }, 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 30 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          className="pb-10 md:pb-12"
          speed={800}
        >
          {marketingServices.map((service, idx) => (
            <SwiperSlide key={idx}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 h-full" onClick={() => openModal(service)}>
                <div className="relative w-full h-48 md:h-64 bg-gray-100">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{service.title}</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3">{service.desc}</p>
                  <button className="mt-3 md:mt-4 text-[#D32F2F] font-medium text-xs md:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <span>→</span></button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* IT Slider – Uniform Large Box Size */}
      <div className="bg-[#4A5568] py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl"> 
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Top‑Tier IT & Development</h2>
            <div className="w-20 h-1.5 bg-red-500 mx-auto mt-6 rounded-full shadow-lg"></div>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mt-3 md:mt-4 px-2">Intelligent websites and apps built with AI at the core</p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="!pb-16"
          >
            {itServices.map((service, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div 
                  className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer border border-white/10 h-full flex flex-col" 
                  onClick={() => openModal(service)}
                >
                  <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#D32F2F] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed mb-8 flex-1">
                      {service.desc}
                    </p>
                    <div className="inline-flex items-center text-[#D32F2F] font-bold text-sm uppercase tracking-widest gap-2">
                      Learn More <span>→</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Online Presence */}
      <div className="bg-[#D32F2F] text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="md:w-1/2 w-full">
              <Image src="/image/op-1.webp" alt="Online Presence" width={800} height={600} className="rounded-2xl shadow-xl w-full h-auto" loading="lazy" />
            </div>
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h2 className="text-2xl md:text-5xl font-bold">Build a Powerful Online Presence Worldwide</h2>
              <p className="mt-4 text-white/90 text-base md:text-lg leading-relaxed">
                On a mission to empower <b>D2C brands and local enterprises</b> to become industry leaders. As a highly trusted digital marketing team in Chennai, we deliver phenomenal, 100% result‑focused performance marketing strategies – now assisted by AI for deeper insights.
              </p>
              <p className="mt-4 text-lg md:text-xl font-semibold">Trusted by hundreds of successful global clients.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-6 md:mt-8">
                <Image src="/image/op_rev.webp" alt="5 stars" width={150} height={30} className="w-32 md:w-36 h-auto" loading="lazy" />
                <a href="#marketing-slider" className="bg-white text-[#D32F2F] px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-md text-sm md:text-base">Partner with the Best</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#4A5568] text-white py-3 md:py-4 text-center">
        <p className="text-xs md:text-base font-medium tracking-wide px-2">🚀 MORE THAN <span className="font-bold text-yellow-200">₹10 LAKHS AD BUDGET</span> SUCCESSFULLY MANAGED ACROSS 5+ GLOBAL PLATFORMS</p>
      </div>

      {/* Bright Ideas Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl md:text-5xl font-bold text-gray-800">Make Bright Ideas Happen with AI‑Assisted SEO Experts</h2>
            <ul className="mt-6 md:mt-8 space-y-2 md:space-y-3">
              {[
                "100% Result‑Oriented Strategies (AI‑enhanced research)",
                "Rise in Global Customer Value via data‑driven insights",
                "Affordable & Trustable Solutions (AI reduces manual effort)",
                "Massive Escalation in Acquisition with smarter targeting",
                "Top‑Rated Local SEO Experts in Chennai + AI tools"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2 md:gap-3 text-gray-700 text-sm md:text-lg">
                  <span className="w-5 h-5 md:w-6 md:h-6 bg-red-100 rounded-full flex items-center justify-center text-[#D32F2F] text-xs md:text-sm font-bold mt-0.5 flex-shrink-0">✓</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 w-full">
            <Image src="/image/mb.webp" alt="Make bright ideas happen" width={800} height={600} className="rounded-2xl shadow-xl w-full h-auto" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-3">Ready to Transform Your Business?</h3>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto">Get in touch with our Chennai team for a free consultation</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/917305821333" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#25D366] to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-2 text-base md:text-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.199-.347.223-.645.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.171-2.261.599.606-2.208-.147-.371a9.875 9.875 0 01-1.249-5.017c0-5.495 4.479-9.974 9.974-9.974 2.664 0 5.146 1.037 6.992 2.932 1.841 1.89 2.874 4.372 2.874 7.042-.003 5.495-4.482 9.974-9.977 9.974"/></svg>
              Chat on WhatsApp
            </a>
            <a href="#marketing-slider" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all shadow-md hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-2 text-base md:text-lg">View All Services →</a>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-[#D32F2F] text-white p-2 md:p-3 rounded-full shadow-lg z-40 hover:bg-[#B71C1C] transition-all text-sm md:text-base"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ServiceModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            service={selectedService}
            onSubmit={handleWhatsAppSubmit}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        html, body {
          overscroll-behavior: none;
        }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .swiper-pagination-bullet { background: #cbd5e1; opacity: 1; width: 6px; height: 6px; transition: all 0.2s; }
        .swiper-pagination-bullet-active { background: #d32f2f; width: 20px; border-radius: 3px; }
        @media (min-width: 768px) {
          .swiper-pagination-bullet { width: 8px; height: 8px; }
          .swiper-pagination-bullet-active { width: 24px; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}