'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter, FaArrowRight, FaHeartbeat, FaLayerGroup, FaSync } from 'react-icons/fa';

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
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'}`}>
        {/* Top Banner - Updated to #FF0000 */}
        <div className="bg-[#FF0000] text-white text-center py-2.5 text-sm font-medium tracking-wide">
          <div className="container mx-auto px-4">
            ✨ Limited Time Offer: Boost Your Business with 20% Off Our Marketing Packages!
            <Link href="#" className="ml-3 underline font-semibold hover:text-gray-100 transition">Get early access →</Link>
          </div>
        </div>

        <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0 transform transition duration-300 hover:scale-105">
            <Image src="/image/logo.webp" alt="Rainbow Media" width={200} height={60} className="w-auto h-14 lg:h-16 brightness-110 contrast-125 drop-shadow-lg" priority />
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {['Home', 'Services', 'Products', 'Career', 'About', 'Blog', 'Contact'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="relative text-[#FF0000] font-medium group text-sm xl:text-base">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF0000] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4 xl:space-x-5">
            <div className="flex items-center space-x-3 border-r border-gray-200 pr-4 xl:pr-5 text-gray-500">
              <a href="https://www.facebook.com/p/Rainbow-Media-100091745963846/" target="_blank" className="hover:text-[#FF0000] transition transform hover:scale-110"><FaFacebookF /></a>
              <a href="https://www.instagram.com/rainbowmedia_digital/" target="_blank" className="hover:text-[#FF0000] transition transform hover:scale-110"><FaInstagram /></a>
              <a href="#" target="_blank" className="hover:text-[#FF0000] transition transform hover:scale-110"><FaYoutube /></a>
              <a href="https://www.linkedin.com/company/rainbow-media/" target="_blank" className="hover:text-[#FF0000] transition transform hover:scale-110"><FaLinkedinIn /></a>
              <a href="https://x.com/rmedia_digital" target="_blank" className="hover:text-[#FF0000] transition transform hover:scale-110"><FaTwitter /></a>
            </div>
            <button onClick={() => setShowModal(true)} className="bg-[#FF0000] text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600">
              Get started
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-2xl text-[#FF0000] focus:outline-none">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t z-40 p-5 animate-slideDown">
            <div className="flex flex-col space-y-3">
              {['Home', 'Services', 'Products', 'Career', 'About', 'Blog', 'Contact'].map(i => (
                <Link key={i} href={i === 'Home' ? '/' : `/${i.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-[#FF0000] hover:text-red-600">{i}</Link>
              ))}
              <button onClick={() => { setShowModal(true); setMobileMenuOpen(false); }} className="mt-2 bg-[#FF0000] text-white py-2.5 rounded-full font-semibold hover:bg-red-600 transition">
                Get started
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="h-[108px] lg:h-[124px]"></div>

      {/* Improved modal – clean, modern, brand-consistent */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="bg-white rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slideUp relative">
            
            {/* Close button */}
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black text-xl">✕</button>

            {/* Left side: Red panel - Updated to #FF0000 */}
            <div className="bg-[#FF0000] text-white p-10 md:p-12 w-full md:w-[48%] relative flex flex-col justify-center overflow-hidden">
              {/* Diagonal slash - color matched */}
              <div className="absolute top-0 right-0 w-24 h-full bg-[#FF0000] transform skew-x-[-20deg] translate-x-12 hidden md:block pointer-events-none z-0"></div>

              <div className="relative z-10 flex flex-col h-full justify-center">
                <div className="bg-white/20 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest inline-block mb-6 self-start border border-white/20">
                  Why Choose us
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Choose Us to Grow Your Business</h2>
                <p className="mb-8 text-white/90 text-sm leading-relaxed">
                  From boosting your online presence to driving targeted traffic, we deliver results that help your business thrive in the <strong>DIGITAL WORLD</strong> with AI-integrated intelligence.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white text-[#FF0000] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                    <FaHeartbeat /> Results-Driven AI Strategy
                  </div>
                  <div className="flex items-center gap-3 bg-white text-[#FF0000] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                    <FaLayerGroup /> Expertise in Multi-Platform IT
                  </div>
                  <div className="flex items-center gap-3 bg-white text-[#FF0000] px-4 py-3 rounded-full text-sm font-bold shadow-sm">
                    <FaSync /> Continuous AI Optimization
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="p-10 md:p-12 w-full md:w-[52%] bg-white flex flex-col justify-center">
              <div className="mb-8 self-end md:self-start">
                <Image src="/image/logo.webp" alt="Logo" width={160} height={40} />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange} 
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#FF0000] text-gray-900 bg-transparent text-sm font-medium"
                >
                  {serviceOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>

                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange} 
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#FF0000] text-gray-900 placeholder:text-gray-400 text-sm" 
                  required 
                />

                <input 
                  type="tel" 
                  name="contact" 
                  placeholder="Contact no" 
                  value={formData.contact}
                  onChange={handleChange} 
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#FF0000] text-gray-900 placeholder:text-gray-400 text-sm" 
                  required 
                />

                <textarea 
                  name="message" 
                  placeholder="Message/Requirements" 
                  value={formData.message}
                  onChange={handleChange} 
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#FF0000] text-gray-900 placeholder:text-gray-400 text-sm resize-none" 
                  rows={1} 
                />
                
                <button type="submit" className="w-full bg-[#FF0000] text-white py-3 rounded font-bold hover:bg-red-600 transition text-sm">
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