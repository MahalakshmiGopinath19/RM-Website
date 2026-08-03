'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowRight, FaPhoneAlt, FaEnvelope, FaHeartbeat, FaLayerGroup, FaSync } from 'react-icons/fa';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
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
    const lines = [
      'Hi! I would like to book a consultation with Vaave Digital. Here are my details:',
      '',
      `Service: ${formData.service}`,
      `Name: ${formData.name}`,
      `Contact: ${formData.contact}`,
      `Message: ${formData.message || 'Not provided'}`
    ];
    const text = lines.join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setShowModal(false);
    setFormData({ service: 'Social Media Marketing', name: '', contact: '', message: '' });
  };

  const serviceOptions = [
    'Social Media Marketing', 'Website Creation & Management', 'Google Ads & Google My Business',
    'Pay Per Click Ads', 'Search Engine Optimization (SEO)', 'Content Marketing',
    'YouTube & Google Promotion', 'Campaign Ideas & Implementation', 'Others'
  ];

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Journey', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Careers', href: '/career' },
    { name: 'Contact', href: '/contact' }
  ];

  // Helper to check if item is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false; // anchor link
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#020215]/95 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-[#020215]/80 backdrop-blur-sm'}`}>
        
        {/* Top Contact Bar */}
        <div className="border-b border-white/10 bg-black/40 py-1.5 px-6 lg:px-12 text-xs font-display text-[#acabcb]">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="tel:+917305821333" className="flex items-center gap-1.5 hover:text-peachAccent transition-colors">
                <FaPhoneAlt size={10} className="text-peachAccent" />
                <span className="font-semibold">+91 73058 21333</span>
              </a>
              <a href="mailto:info@vaavedigital.com" className="flex items-center gap-1.5 hover:text-peachAccent transition-colors">
                <FaEnvelope size={10} className="text-peachAccent" />
                <span className="font-semibold">info@vaavedigital.com</span>
              </a>
            </div>
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-white/40">
              AI-Integrated Digital Agency
            </span>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-6 lg:px-12 py-2 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transform transition duration-300 hover:opacity-90">
            <Image
              src="/image/vaave-digital.png"
              alt="Vaave Digital Logo"
              width={280}
              height={77}
              className="w-auto h-[50px] md:h-[66px]"
              priority
            />
          </Link>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-display text-sm font-semibold tracking-wide transition-colors duration-200 py-1 ${active ? 'text-peachAccent' : 'text-[#acabcb] hover:text-white'}`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-peachAccent rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setShowModal(true)}
              className="group flex items-center gap-3 rounded-full border border-white/10 hover:border-peachAccent/40 bg-white/5 hover:bg-white/10 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 shadow-md"
            >
              Free Consultation
              <span className="flex w-6 h-6 rounded-full bg-gradient-rosegold items-center justify-center text-darkBg text-xs group-hover:translate-x-0.5 transition-transform duration-300">
                <FaArrowRight />
              </span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white focus:outline-none text-2xl"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#020215]/95 backdrop-blur-md shadow-2xl border-t border-white/5 z-40 p-6 animate-slideDown">
            <div className="flex flex-col space-y-4">
              {menuItems.map(item => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-semibold transition-colors font-display ${active ? 'text-peachAccent' : 'text-[#acabcb] hover:text-white'}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={() => { setShowModal(true); setMobileMenuOpen(false); }}
                className="mt-2 group flex items-center justify-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-full py-3 text-sm font-bold text-white transition-all duration-300"
              >
                Free Consultation
                <span className="flex w-6 h-6 rounded-full bg-gradient-rosegold items-center justify-center text-darkBg text-xs">
                  <FaArrowRight />
                </span>
              </button>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5 text-xs font-display text-[#acabcb]">
                <a href="tel:+917305821333" className="flex items-center gap-2 hover:text-peachAccent transition-colors">
                  <FaPhoneAlt size={11} className="text-peachAccent" />
                  <span>+91 73058 21333</span>
                </a>
                <a href="mailto:info@vaavedigital.com" className="flex items-center gap-2 hover:text-peachAccent transition-colors">
                  <FaEnvelope size={11} className="text-peachAccent" />
                  <span>info@vaavedigital.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to push content below fixed header */}
      <div className="h-[96px] md:h-[110px]"></div>

      {/* Consultation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 overflow-y-auto py-6 sm:py-8 animate-fadeIn"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-darkPanel rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slideUp relative border border-white/10 my-auto max-h-[90vh] md:max-h-none overflow-y-auto">

            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#acabcb] hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Left side: branding/reasons panel */}
            <div className="bg-[#030218] p-6 sm:p-8 md:p-12 w-full md:w-[44%] relative flex flex-col justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,137,118,0.15) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }} />
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-52 h-52 border border-peachAccent/5 rounded-full animate-rotate-ring pointer-events-none" />

              <div className="relative z-10 pt-2 sm:pt-0">
                <span className="inline-block bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-3 sm:mb-6">
                  Why Choose us
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white mb-3 sm:mb-6 leading-tight">
                  Accelerate Your Digital Success
                </h2>
                <p className="mb-4 sm:mb-8 text-[#acabcb] text-xs sm:text-sm leading-relaxed">
                  We integrate predictive analytics, smart automation, and creative strategies to help your brand lead and scale in the digital world.
                </p>

                <div className="space-y-2.5 sm:space-y-4">
                  <div className="flex items-center gap-3 bg-white/5 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full text-xs font-semibold border border-white/5">
                    <span className="text-peachAccent"><FaHeartbeat /></span> Results-Driven AI Strategy
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full text-xs font-semibold border border-white/5">
                    <span className="text-peachAccent"><FaLayerGroup /></span> Multi-Platform Excellence
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full text-xs font-semibold border border-white/5">
                    <span className="text-peachAccent"><FaSync /></span> Continuous Growth Optimization
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="p-6 sm:p-8 md:p-12 w-full md:w-[56%] bg-darkPanel flex flex-col justify-center">
              <div className="mb-4 sm:mb-8">
                <Image src="/image/vaave-digital.webp" alt="Vaave Digital" width={140} height={38} />
              </div>
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-1.5 sm:mb-2">Service Interested In</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#030218] border border-white/10 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-white focus:outline-none focus:border-peachAccent text-xs sm:text-sm transition-colors"
                  >
                    {serviceOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-1.5 sm:mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#030218] border border-white/10 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-white placeholder-white/30 focus:outline-none focus:border-peachAccent text-xs sm:text-sm transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-1.5 sm:mb-2">Contact Number</label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Enter your phone number"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full bg-[#030218] border border-white/10 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-white placeholder-white/30 focus:outline-none focus:border-peachAccent text-xs sm:text-sm transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-1.5 sm:mb-2">Message / Requirements</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your requirements"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#030218] border border-white/10 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-white placeholder-white/30 focus:outline-none focus:border-peachAccent text-xs sm:text-sm resize-none transition-colors"
                    rows={2}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg py-3.5 sm:py-4 rounded-full font-display font-extrabold text-xs sm:text-sm transition-colors duration-300 shadow-lg"
                >
                  Submit & Get Started
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-slideDown { animation: slideDown 0.25s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.25s ease-out; }
      `}</style>
    </>
  );
}
