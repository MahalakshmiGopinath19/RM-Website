'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaUser, FaRegEnvelope, FaMobileAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'Web Design',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const whatsappNumber = '917305821333';
    const lines = [
      'Hi! I would like to make an enquiry regarding your digital services:',
      '',
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Service Interested In: ${formData.service}`,
      `Message: ${formData.message || 'Not provided'}`
    ];
    const message = lines.join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', service: 'Web Design', message: '' });
  };

  const contactInfo = [
    { icon: FaPhoneAlt, text: '+91 73058 21333', href: 'tel:+917305821333', label: 'Phone', detail: 'Mon–Sat, 9:30am–6:30pm' },
    { icon: FaEnvelope, text: 'info@vaavedigital.com', href: 'mailto:info@vaavedigital.com', label: 'Email', detail: 'We reply within 24h' },
    { icon: FaMapMarkerAlt, text: 'Guindy, Chennai', href: 'https://maps.google.com/?q=Rainbow+Media+Guindy+Chennai', label: 'Office Address', detail: 'Manickam Lane, Anna Salai, Chennai-600032' },
  ];

  const serviceOptions = [
    'Web Design',
    'Social Media',
    'Google Ads/SEO',
    'SaaS Product Design',
    'Other'
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch w-full">
      {/* Left Card: Contact Form */}
      <motion.div 
        variants={fadeUp}
        className="lg:col-span-7 glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden shadow-xl flex flex-col justify-between"
      >
        <h3 className="text-2xl font-bold font-display text-white mb-2">Send Us a Message</h3>
        <p className="text-sm text-[#acabcb] mb-8 font-medium">Fill out the details and we'll instantly connect with you on WhatsApp.</p>

        {submitted && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-sm">
            <FaCheckCircle /> Thank you! Message prepared. Redirecting to WhatsApp...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-2">First Name *</label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter first name"
                  className="w-full bg-[#030218] pl-10 pr-4 py-3.5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-peachAccent transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-2">Last Name *</label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter last name"
                  className="w-full bg-[#030218] pl-10 pr-4 py-3.5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-peachAccent transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-2">Email Address *</label>
              <div className="relative">
                <FaRegEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                  className="w-full bg-[#030218] pl-10 pr-4 py-3.5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-peachAccent transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-2">Phone Number *</label>
              <div className="relative">
                <FaMobileAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter contact number"
                  className="w-full bg-[#030218] pl-10 pr-4 py-3.5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-peachAccent transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-3">Service Required</label>
            <div className="flex flex-wrap gap-2.5">
              {serviceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleServiceChange(opt)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                    formData.service === opt
                      ? 'bg-gradient-rosegold text-darkBg border-transparent shadow-lg'
                      : 'bg-[#030218] text-[#acabcb] border-white/10 hover:border-white/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#acabcb] uppercase tracking-wider mb-2">Message *</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us about your digital objectives..."
              className="w-full bg-[#030218] p-4 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 resize-none focus:outline-none focus:border-peachAccent transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center justify-center gap-3 w-full bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg py-4 rounded-full font-display font-extrabold text-sm tracking-wide transition-colors duration-300 disabled:opacity-75"
          >
            {isSubmitting ? 'Processing...' : 'Send Message'} <FaPaperPlane size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      </motion.div>

      {/* Right Card: Contact Details + Embed Map */}
      <motion.div 
        variants={fadeUp}
        className="lg:col-span-5 flex flex-col gap-6"
      >
        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
          <h3 className="text-2xl font-bold font-display text-white">Get in Touch</h3>
          <div className="w-12 h-[2px] bg-peachAccent rounded-full" />

          <div className="space-y-5">
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.href}
                target={info.icon === FaMapMarkerAlt ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-peachAccent text-sm flex-shrink-0 group-hover:border-peachAccent/30 transition-colors">
                  <info.icon />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-white/35 uppercase tracking-widest mb-1">{info.label}</span>
                  <span className="block text-white font-bold font-display leading-tight">{info.text}</span>
                  <span className="block text-xs text-[#acabcb]/70 mt-1">{info.detail}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Map frame panel */}
        <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden flex-1 min-h-[260px] relative shadow-lg group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.6977851573574!2d80.21177628845118!3d13.010463110183538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267245a3ed16f%3A0xe21d6ed23645a3c1!2sRainbow%20Media!5e0!3m2!1sen!2sin!4v1734426470562!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full transition-opacity"
          />
          <div className="absolute bottom-4 right-4 z-10">
            <a
              href="https://maps.google.com/?q=Rainbow+Media+Guindy+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#020215]/90 border border-white/10 hover:border-peachAccent/30 text-white hover:text-peachAccent px-4 py-2 rounded-full text-xs font-semibold shadow-md transition-all duration-200"
            >
              Get Directions <FaArrowRight size={8} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
