// app/career/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import { FaWhatsapp, FaRocket, FaChartLine, FaUsers, FaPhoneAlt, FaLaptopCode } from 'react-icons/fa';

// ------------------------------------------------------------
// Application Modal (WhatsApp submission)
// ------------------------------------------------------------
function ApplicationModal({ isOpen, onClose, jobTitle, onSubmit }: any) {
  const [form, setForm] = useState({
    name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', cover: ''
  });
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
    setForm({ name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', cover: '' });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#D32F2F] mb-2">Apply for {jobTitle || 'this position'}</h3>
          <p className="text-gray-500 text-sm mb-4">Fill the form – we'll respond on WhatsApp.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Full Name" required value={form.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
              <input type="date" name="dob" placeholder="Date of Birth" required value={form.dob} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <select name="gender" required value={form.gender} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-700">
                <option value="" className="text-gray-500">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="email" name="email" placeholder="Email Address" required value={form.email} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
              <select name="job" required value={form.job} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-700">
                <option value="" className="text-gray-500">Select Job Title</option>
                <option value="Social Media Manager">Social Media Manager</option>
                <option value="Social Media Intern">Social Media Intern</option>
                <option value="Telecaller">Telecaller</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <select name="experience" required value={form.experience} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-700">
                <option value="" className="text-gray-500">Years of Experience</option>
                <option value="0-1">0-1 year</option>
                <option value="1-2">1-2 years</option>
                <option value="2-3">2-3 years</option>
                <option value="3-4">3-4 years</option>
                <option value="4-5">4-5 years</option>
                <option value="5+">5+ years</option>
              </select>
              <div className="flex items-center justify-center text-sm text-gray-500">Send resume to <span className="ml-1 text-[#D32F2F] font-medium">rmedia1123.info@gmail.com</span></div>
            </div>
            <textarea name="cover" placeholder="Cover Letter (optional)" rows={3} value={form.cover} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none"></textarea>
            <button type="submit" className="w-full bg-[#25D366] hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
              <FaWhatsapp /> Send Application via WhatsApp
            </button>
          </form>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </motion.div>
    </div>
  );
}

// ------------------------------------------------------------
// Animation variants
// ------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

// ------------------------------------------------------------
// Main Career Page
// ------------------------------------------------------------
export default function CareerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleWhatsAppSubmit = (formData: any) => {
    const whatsappNumber = '917305821333';
    const msg = `🌈 Rainbow Media Job Application%0A%0A*Position:* ${formData.job}%0A*Name:* ${formData.name}%0A*DOB:* ${formData.dob}%0A*Gender:* ${formData.gender}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Experience:* ${formData.experience} years%0A*Cover Letter:* ${formData.cover || 'Not provided'}%0A%0A📧 Resume sent to rmedia1123.info@gmail.com`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const openModalForJob = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setModalOpen(true);
  };

  const benefits = [
    { icon: FaRocket, title: 'Innovative Environment', desc: 'We foster creativity and innovation in everything we do. Work with forward-thinking individuals who embrace new challenges and trends.' },
    { icon: FaChartLine, title: 'Career Growth', desc: "We believe in growing together. You'll have endless opportunities to expand your skill set, take on exciting projects, and advance your career." },
    { icon: FaUsers, title: 'Flexible Work Environment', desc: 'We understand work-life balance. With flexible hours and hybrid options, you can thrive both personally and professionally.' }
  ];

  const jobs = [
    { title: 'Social Media Manager', image: '/image/carimage3.webp', desc: 'Manage multi‑platform social media campaigns, analyze performance, and grow engagement.', location: 'Chennai', experience: '3+ years', icon: FaLaptopCode },
    { title: 'Social Media Intern', image: '/image/carimage1.webp', desc: 'Assist in managing and creating engaging social media content across platforms. Work with the marketing team to increase audience engagement and brand visibility.', location: 'Chennai', experience: 'Freshers/0+ years', icon: FaChartLine },
    { title: 'Telecaller', image: '/image/carimage2.webp', desc: 'Engage with potential clients over the phone to promote our media services, schedule consultations, and follow up on warm leads.', location: 'Chennai', experience: 'Freshers/0+ years', icon: FaPhoneAlt }
  ];

  return (
    <div className="bg-[#FAF9F7] min-h-screen text-gray-900">
      
      {/* ========== CREATIVE HERO SECTION ========== */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative">
          
          {/* Floating Decorative Elements */}
          <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute -top-10 -left-10 w-48 h-48 bg-purple-200/50 rounded-tr-[100px] rounded-bl-[100px] -z-10" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-20 right-20 text-red-500/20 text-6xl">✦</motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
                  We make <br/>
                  <span className="bg-[#D32F2F] text-white px-4 inline-block transform -rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">creative</span> <br/>
                  things everyday
                </h1>
                <p className="text-xl text-gray-600 font-medium italic">Shape your future with Rainbow Media.</p>
                <button onClick={() => openModalForJob('General Application')} className="bg-[#D32F2F] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
                  Apply Now
                </button>
              </motion.div>
            </div>

            {/* Right Visuals - With actual image instead of placeholder */}
            <div className="flex-1 relative">
              <motion.div whileHover={{ scale: 1.02 }} className="relative bg-white/80 p-4 rounded-[2rem] shadow-2xl rotate-2 backdrop-blur-sm">
                <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src="/image/career.png"
                    alt="Creative team at work"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
              {/* WhatsApp Floating Badge - Functional & Animated */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -right-6 bg-[#25D366] text-white p-5 rounded-2xl shadow-xl flex items-center gap-3 cursor-pointer"
                onClick={() => openModalForJob('General Application')}
              >
                <FaWhatsapp className="text-2xl animate-pulse" />
                <span className="font-bold text-sm md:text-base">Join our team of innovators</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US (Benefits) ========== */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-8 border-2 border-gray-100 rounded-3xl hover:border-[#D32F2F] transition-colors group">
                <div className="text-4xl text-[#D32F2F] mb-6 group-hover:scale-110 transition-transform duration-300">{<benefit.icon />}</div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== CURRENT OPPORTUNITIES (Larger Job Cards) ========== */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800">Current Opportunities</h2>
          <p className="text-gray-500 text-lg mt-4">We're looking for talented individuals to join our growing team.</p>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-6 rounded-full"></div>
        </div>
        <div className="space-y-12 max-w-6xl mx-auto">
          {jobs.map((job, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row">
              <div className="md:w-2/5 h-80 md:h-auto bg-gray-100 relative overflow-hidden">
                <Image src={job.image} alt={job.title} fill className="object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
              </div>
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{job.title}</h3>
                <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">{job.desc}</p>
                <div className="flex flex-wrap gap-6 text-base text-gray-700 mb-8">
                  <span className="flex items-center gap-2"><span className="font-semibold text-lg">📍</span> {job.location}</span>
                  <span className="flex items-center gap-2"><span className="font-semibold text-lg">📘</span> {job.experience}</span>
                </div>
                <button onClick={() => openModalForJob(job.title)} className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-3 rounded-full font-semibold transition w-fit shadow-md text-base">Apply Now</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========== APPLICATION FORM SECTION ========== */}
      <div id="applyform" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-[#D32F2F]">Join Our Team – Apply Today</h2>
            <p className="text-gray-600 text-lg mt-3">Fill the form below, and we'll reach out on WhatsApp.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <form onSubmit={(e) => { e.preventDefault(); openModalForJob('General Application'); }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full p-4 border border-gray-200 rounded-xl text-base" required />
                <input type="date" placeholder="Date of Birth" className="w-full p-4 border border-gray-200 rounded-xl text-base" required />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <select className="w-full p-4 border border-gray-200 rounded-xl text-gray-700 text-base">
                  <option className="text-gray-500">Select Gender</option>
                  <option>Female</option>
                  <option>Male</option>
                </select>
                <input type="tel" placeholder="Phone Number" className="w-full p-4 border border-gray-200 rounded-xl text-base" required />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="email" placeholder="Email Address" className="w-full p-4 border border-gray-200 rounded-xl text-base" required />
                <select className="w-full p-4 border border-gray-200 rounded-xl text-gray-700 text-base">
                  <option className="text-gray-500">Select Job Title</option>
                  <option>Social Media Manager</option>
                  <option>Social Media Intern</option>
                  <option>Telecaller</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <select className="w-full p-4 border border-gray-200 rounded-xl text-gray-700 text-base">
                  <option className="text-gray-500">Years of Experience</option>
                  <option>0-1 year</option>
                  <option>1-2 years</option>
                  <option>2-3 years</option>
                  <option>3-4 years</option>
                  <option>4-5 years</option>
                  <option>5+ years</option>
                </select>
                <p className="text-base text-gray-500 flex items-center">Send resume to <span className="ml-1 text-[#D32F2F] font-medium">rmedia1123.info@gmail.com</span></p>
              </div>
              <textarea rows={4} placeholder="Cover Letter (optional)" className="w-full p-4 border border-gray-200 rounded-xl resize-none text-base"></textarea>
              <div className="text-center">
                <button type="submit" className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-4 rounded-full font-semibold transition shadow-md text-lg">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ========== BACK TO TOP BUTTON ========== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-[#D32F2F] text-white p-3 rounded-full shadow-lg z-40 hover:bg-[#B71C1C] transition-all"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* ========== APPLICATION MODAL ========== */}
      <AnimatePresence>
        {modalOpen && (
          <ApplicationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            jobTitle={selectedJob}
            onSubmit={handleWhatsAppSubmit}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        html, body { overscroll-behavior: none; }
        input::placeholder, textarea::placeholder { color: #9CA3AF; opacity: 1; }
      `}</style>
    </div>
  );
}