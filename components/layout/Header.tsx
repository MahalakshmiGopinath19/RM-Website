'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter, FaHeartbeat, FaLayerGroup, FaSync } from 'react-icons/fa';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    service: 'Social Media Marketing',
    name: '',
    contact: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917305821333';
    const text = `Hello! Consultation Request%0A%0AService: ${formData.service}%0AName: ${formData.name}%0AContact: ${formData.contact}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setShowModal(false);
    setFormData({ service: 'Social Media Marketing', name: '', contact: '', message: '' });
  };

  const serviceOptions = [
    'Social Media Marketing', 'Website Creation & Management', 'Google Ads & Google My Business',
    'Pay Per Click Ads', 'Search Engine Optimization (SEO)', 'Content Marketing',
    'YouTube & Google Promotion', 'Campaign Ideas & Implementation', 'Others'
  ];

  return (
    <>
      {/*
        VAAVE DIGITAL THEME TOKENS
        --navy:      #0A0930   deep navy (now the TOP promo strip)
        --navy-2:    #12103D   slightly lighter navy for panels
        --copper-1:  #EFD3C9   light rose-gold (gradient top) — now the MAIN nav bg
        --copper-2:  #E0A36A   mid copper
        --copper-3:  #9C5B5A   deep copper (gradient bottom)
        --sky:       #E0A36A   accent blue from the paper-plane icon
      */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
        {/* Top Banner — solid navy */}
        {/* <div className="bg-[#050821] text-[#E0A36A] text-center py-2.5 text-sm font-medium tracking-wide border-b border-white/5">
          <div className="container mx-auto px-4">
            ✨ Limited Time Offer: Boost Your Business with 20% Off Our Marketing Packages!
            <Link href="#" className="ml-3 underline font-semibold text-[#E0A36A] hover:text-white transition">Get early access →</Link>
          </div>
        </div> */}

        {/* Main nav — solid navy to blend with logo */}
        <div className={`bg-gradient-to-r from-[#EFD3C9] via-[#E0A36A] to-[#9C5B5A] border-b border-black/10 transition-all duration-300 shadow-md`}>
          <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
            <Link href="/" className="flex-shrink-0 transform transition duration-300 hover:scale-105">
              <Image src="/image/vaave-digital.webp" alt="Vaave Digital" width={240} height={70} className="w-auto h-16 lg:h-20" priority />
            </Link>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {['Home', 'Services', 'Products', 'Career', 'About', 'Blog', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="relative text-[#050821] font-semibold group text-sm xl:text-base transition-colors duration-250"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#050821] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4 xl:space-x-5">
              <div className="flex items-center space-x-3 border-r border-[#050821]/20 pr-4 xl:pr-5 text-[#050821]/80">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition transform hover:scale-110"><FaFacebookF /></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition transform hover:scale-110"><FaInstagram /></a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition transform hover:scale-110"><FaYoutube /></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition transform hover:scale-110"><FaLinkedinIn /></a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition transform hover:scale-110"><FaTwitter /></a>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#050821] hover:bg-[#12103D] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Get started
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-2xl text-[#050821] focus:outline-none">
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#050821]/95 backdrop-blur-md shadow-xl border-t border-white/10 z-40 p-5 animate-slideDown">
            <div className="flex flex-col space-y-3">
              {['Home', 'Services', 'Products', 'Career', 'About', 'Blog', 'Contact'].map(i => (
                <Link
                  key={i}
                  href={i === 'Home' ? '/' : `/${i.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#EFD3C9] font-medium transition-colors"
                >
                  {i}
                </Link>
              ))}
              <button
                onClick={() => { setShowModal(true); setMobileMenuOpen(false); }}
                className="mt-2 bg-gradient-to-r from-[#EFD3C9] via-[#E0A36A] to-[#9C5B5A] text-[#0A0930] py-2.5 rounded-full font-bold transition hover:brightness-110"
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="h-[108px] lg:h-[124px]"></div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slideUp relative">

            {/* Close button */}
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black text-xl">✕</button>

            {/* Left side: Navy panel */}
            <div className="bg-[#050821] text-white p-10 md:p-12 w-full md:w-[48%] relative flex flex-col justify-center overflow-hidden">
              {/* Diagonal slash */}
              <div className="absolute top-0 right-0 w-24 h-full bg-[#12103D] transform skew-x-[-20deg] translate-x-12 hidden md:block pointer-events-none z-0"></div>

              <div className="relative z-10 flex flex-col h-full justify-center">
                <div className="bg-white/10 text-[#EFD3C9] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest inline-block mb-6 self-start border border-[#EFD3C9]/30">
                  Why Choose us
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Choose Us to Grow Your Business
                </h2>
                <p className="mb-8 text-white/80 text-sm leading-relaxed">
                  From boosting your online presence to driving targeted traffic, we deliver results that help your business thrive in the <strong className="text-[#EFD3C9]">DIGITAL WORLD</strong> with AI-integrated intelligence.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#EFD3C9] to-[#E0A36A] text-[#0A0930] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                    <FaHeartbeat /> Results-Driven AI Strategy
                  </div>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#EFD3C9] to-[#E0A36A] text-[#0A0930] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                    <FaLayerGroup /> Expertise in Multi-Platform IT
                  </div>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#EFD3C9] to-[#E0A36A] text-[#0A0930] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                    <FaSync /> Continuous AI Optimization
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="p-10 md:p-12 w-full md:w-[52%] bg-white flex flex-col justify-center">
              <div className="mb-8 self-end md:self-start">
                <Image src="/image/vaave-digital.webp" alt="Vaave Digital" width={160} height={40} />
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#E0A36A] text-gray-900 bg-transparent text-sm font-medium transition-colors"
                >
                  {serviceOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#E0A36A] text-gray-900 placeholder:text-gray-400 text-sm transition-colors"
                  required
                />

                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact no"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#E0A36A] text-gray-900 placeholder:text-gray-400 text-sm transition-colors"
                  required
                />

                <textarea
                  name="message"
                  placeholder="Message/Requirements"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#E0A36A] text-gray-900 placeholder:text-gray-400 text-sm resize-none transition-colors"
                  rows={1}
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#EFD3C9] via-[#E0A36A] to-[#9C5B5A] text-[#0A0930] py-3 rounded font-bold hover:brightness-110 transition text-sm shadow-md hover:shadow-lg"
                >
                  Submit & Get Started
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </>
  );
}
