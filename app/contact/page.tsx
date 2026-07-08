// app/contact/page.tsx – Hero left-aligned, contact panel fully red
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaUser, FaRegEnvelope, FaMobileAlt, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ContactPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const whatsappNumber = '917305821333';
    const msg = `Hello! Enquiry from website%0A%0AName: ${formData.firstName} ${formData.lastName}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0A%0AService Needed: ${formData.service}%0A%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });
  };

  const contactInfo = [
    { icon: FaPhoneAlt, text: '+91 73058 21333', href: 'tel:+917305821333', label: 'PHONE', detail: 'Mon–Fri, 9am–6pm' },
    { icon: FaEnvelope, text: 'rmedia1123.info@gmail.com', href: 'mailto:rmedia1123.info@gmail.com', label: 'EMAIL', detail: 'We reply within 24h' },
    { icon: FaMapMarkerAlt, text: 'Guindy, Chennai', href: 'https://maps.google.com/?q=Guindy+Chennai', label: 'OFFICE', detail: 'Tamil Nadu, India' },
  ];

  const serviceOptions = [
    'Web Design',
    'App/Product Design',
    'Graphic Design',
    'Digital Marketing',
    'Other'
  ];

  return (
    <div className="bg-[#FDFBF8] min-h-screen">
      
      {/* ========== HERO – text moved up slightly ========== */}
<div className="relative w-full h-90 md:h-[700px] overflow-hidden">
  <Image
    src="/image/con-ban1.webp"
    alt="Contact Rainbow Media"
    fill
    className="object-cover object-center"
    priority
  />
  {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div> */}
  {/* Changed from justify-center to justify-start with padding-top */}
  {/* <div className="absolute inset-0 flex flex-col justify-start pt-24 md:pt-28 px-6 md:px-12 lg:px-20">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-2xl leading-tight tracking-tight">
        Get in Touch
      </h1>
      <p className="text-white text-lg md:text-xl mt-4 max-w-lg drop-shadow-md font-medium">
        We'd love to hear from you. Reach out to us anytime.
      </p>
    </motion.div>
  </div> */}
</div>

      {/* ========== CONTACT SECTION – red left panel, white form ========== */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* LEFT: Contact Information – FULL RED BACKGROUND */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-gradient-to-br from-[#E0A36A] to-[#9C5B5A] rounded-2xl shadow-xl overflow-hidden text-white"
            >
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Contact Information</h2>
                  <div className="w-12 h-1 bg-white/50 rounded-full"></div>
                  <p className="text-white/80 text-sm mt-4">Reach out through any of the channels below – we'd love to hear from you.</p>
                </div>
                <div className="space-y-5">
                  {contactInfo.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      target={item.icon === FaMapMarkerAlt ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group hover:bg-white/10 p-3 rounded-xl transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-red-600 transition-all duration-200">
                        <item.icon className="text-lg" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">{item.label}</p>
                        <p className="text-white font-medium text-base md:text-lg">{item.text}</p>
                        <p className="text-white/70 text-sm mt-1">{item.detail}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <FaClock className="text-lg" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">OFFICE HOURS</p>
                      <p className="text-white font-medium">Monday – Saturday: 10:00 AM – 6:00 PM</p>
                      <p className="text-white/70 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Contact Form – white card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
                <p className="text-gray-500 text-sm mt-1">Fill the form and we'll respond on WhatsApp.</p>
              </div>
              {submitted && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
                  <FaCheckCircle /> Thank you! We'll contact you shortly.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="First Name"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:border-[#E0A36A] focus:ring-2 focus:ring-[#FDFBF8] transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Last Name"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:border-[#E0A36A] focus:ring-2 focus:ring-[#FDFBF8] transition"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <FaRegEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:border-[#E0A36A] focus:ring-2 focus:ring-[#FDFBF8] transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <FaMobileAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 12345 67890"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:border-[#E0A36A] focus:ring-2 focus:ring-[#FDFBF8] transition"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What service do you need?</label>
                  <div className="flex flex-wrap gap-3">
                    {serviceOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                          formData.service === opt
                            ? 'bg-[#9C5B5A] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-[#FDFBF8] hover:text-red-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={opt}
                          checked={formData.service === opt}
                          onChange={() => handleRadioChange(opt)}
                          className="hidden"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-500 resize-none focus:border-[#E0A36A] focus:ring-2 focus:ring-[#FDFBF8] transition"
                  />
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-[#9C5B5A] hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <FaPaperPlane />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========== MAP SECTION ========== */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Location</h2>
            <div className="w-16 h-1 bg-[#E0A36A] mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-600 mt-4">Visit us at our office in Guindy – we'd love to meet you in person.</p>
          </div>
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="relative h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.6977851573574!2d80.21177628845118!3d13.010463110183538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267245a3ed16f%3A0xe21d6ed23645a3c1!2sRainbow%20Media!5e0!3m2!1sen!2sin!4v1734426470562!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://maps.google.com/?q=Rainbow+Media+Guindy+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-[#9C5B5A] hover:text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-200"
                >
                  <FaExternalLinkAlt className="text-xs" /> Get Directions
                </a>
              </div>
            </div>
            <div className="p-4 bg-gray-50 text-center text-gray-600 border-t border-gray-100">
              <p className="flex items-center justify-center gap-2"><FaMapMarkerAlt className="text-[#E0A36A]" /> Rainbow Media, Old No.83, New no.112, 2nd floor, Anna salai, Manickam lane, Guindy, Chennai-600032</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-[#9C5B5A] text-white p-3 rounded-full shadow-lg z-40 hover:bg-red-700 transition-all"
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
