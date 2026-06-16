// app/career/page.tsx – Added resume file upload field
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaRocket, FaChartLine, FaUsers, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock, FaCheckCircle, FaArrowRight, FaPaperPlane, FaUpload } from 'react-icons/fa';

// ------------------------------------------------------------
// Application Modal with file upload
// ------------------------------------------------------------
function ApplicationModal({ isOpen, onClose, jobTitle, onSubmit }: any) {
  const [form, setForm] = useState({
    name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', cover: '', resume: null as File | null
  });
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, resume: e.target.files[0] });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp cannot send files, so we pass a note
    onSubmit({ ...form, resume: form.resume ? form.resume.name : 'Not uploaded' });
    onClose();
    setForm({ name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', cover: '', resume: null });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] px-6 py-5 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">Apply for {jobTitle || 'this position'}</h3>
              <p className="text-sm text-white/80 mt-1">We'll respond on WhatsApp within 24h</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-3xl leading-none">&times;</button>
          </div>
        </div>
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" name="name" placeholder="Your full name" required value={form.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 transition" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label><input type="date" name="dob" required value={form.dob} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Gender</label><select name="gender" required value={form.gender} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl"><option value="">Select Gender</option><option>Female</option><option>Male</option><option>Other</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="tel" name="phone" placeholder="+91 12345 67890" required value={form.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="email" name="email" placeholder="you@example.com" required value={form.email} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label><select name="job" required value={form.job} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl"><option value="">Select Job Title</option><option>Social Media Manager</option><option>Social Media Intern</option><option>Telecaller</option></select></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label><select name="experience" required value={form.experience} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl"><option value="">Select Experience</option><option>0-1</option><option>1-2</option><option>2-3</option><option>3-4</option><option>4-5</option><option>5+</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF/DOC)</label><div className="flex items-center gap-2"><input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-[#D32F2F] hover:file:bg-red-100" /></div></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (optional)</label><textarea name="cover" rows={3} placeholder="Tell us why you'd be a great fit..." value={form.cover} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl resize-none"></textarea></div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#25D366] to-green-600 hover:shadow-xl text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-lg"><FaWhatsapp /> Send Application via WhatsApp</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ------------------------------------------------------------
// Main Career Page – same as before, but added file upload to the main form
// ------------------------------------------------------------
export default function CareerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleWhatsAppSubmit = (formData: any) => {
    const whatsappNumber = '917305821333';
    let msg = `Rainbow Media Job Application%0A%0A*Position:* ${formData.job}%0A*Name:* ${formData.name}%0A*DOB:* ${formData.dob}%0A*Gender:* ${formData.gender}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Experience:* ${formData.experience} years%0A*Cover Letter:* ${formData.cover || 'Not provided'}%0A%0A📧 Resume file: ${formData.resume ? formData.resume : 'Send via email to rmedia1123.info@gmail.com'}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const openModalForJob = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setModalOpen(true);
  };

  const handleMainFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModalForJob('General Application');
  };

  const benefits = [
    { icon: FaRocket, title: 'Innovative Environment', desc: 'Work on creative campaigns with a team that encourages bold ideas and fast experimentation.' },
    { icon: FaChartLine, title: 'Career Growth', desc: 'Develop practical skills through real projects and clear growth opportunities.' },
    { icon: FaUsers, title: 'Supportive Team', desc: 'Collaborate with approachable teammates who value communication and learning.' },
  ];

  const jobs = [
    {
      title: 'Social Media Manager',
      image: '/image/carimage3.webp',
      desc: 'Manage multi‑platform social media campaigns, analyze performance, and grow engagement.',
      location: 'Chennai',
      experience: '3+ years',
      skills: ['Strategy', 'Analytics', 'Content', 'Team Management'],
      walkin: '11:00 AM - 1:00 PM',
      contact: '+91 73058 21333'
    },
    {
      title: 'Social Media Intern',
      image: '/image/carimage1.webp',
      desc: 'Assist in creating content, scheduling posts, and supporting the marketing team.',
      location: 'Chennai',
      experience: 'Freshers/0+ years',
      skills: ['Social Media', 'Content Writing', 'Communication', 'Quick Learning'],
      walkin: '11:00 AM - 1:00 PM',
      contact: '+91 73058 21333'
    },
    {
      title: 'Telecaller',
      image: '/image/carimage2.webp',
      desc: 'Engage with potential clients, explain services clearly, and schedule consultations.',
      location: 'Chennai',
      experience: 'Freshers/0+ years',
      skills: ['Communication', 'Active Listening', 'Problem-Solving', 'Persuasion'],
      walkin: '11:00 AM - 1:00 PM',
      contact: '+91 73058 21333'
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-white pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-100 text-[#D32F2F] text-sm font-semibold px-4 py-2 rounded-full mb-4 shadow-sm">🚀 Careers at Rainbow Media</div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 leading-[1.1]">
                We make <br />
                <span className="text-[#D32F2F] relative inline-block">
                  creative
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M0 4 L200 4" stroke="#D32F2F" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4"/>
                  </svg>
                </span> <br />
                things everyday
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mt-4 max-w-lg mx-auto lg:mx-0">Join our team of innovators and digital marketing experts.</p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                <button onClick={() => openModalForJob('General Application')} className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition flex items-center gap-2 group"><FaWhatsapp /> Apply on WhatsApp <FaArrowRight className="group-hover:translate-x-1 transition" /></button>
                <a href="#opportunities" className="border-2 border-gray-300 text-gray-700 hover:border-[#D32F2F] hover:text-[#D32F2F] px-6 py-2.5 rounded-full font-semibold transition">View Openings</a>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image src="/image/career.png" alt="Creative team" width={1000} height={660} className="w-full h-auto object-cover" priority />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openModalForJob('General Application')}
                  className="absolute -bottom-3 -right-3 bg-gradient-to-r from-[#25D366] to-green-600 text-white p-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer hover:shadow-xl transition"
                >
                  <FaWhatsapp className="text-lg" /><span className="font-semibold text-sm">Join our team</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE RAINBOW MEDIA ========== */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose <span className="text-[#D32F2F]">Rainbow Media</span>?</h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-5xl text-[#D32F2F] mb-5 group-hover:scale-110 transition-transform duration-300">{<benefit.icon />}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* ========== CURRENT OPPORTUNITIES – Image fully covers the box ========== */}
<div id="opportunities" className="container mx-auto px-4 py-16">
  <div className="text-center max-w-3xl mx-auto mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-red-800">Current Opportunities</h2>
    <p className="text-gray-600 text-base mt-3">We're always looking for talented individuals to join our team.</p>
    <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
  </div>
  <div className="space-y-10 max-w-6xl mx-auto">
    {jobs.map((job, idx) => (
      <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row hover:-translate-y-1 md:items-stretch">
        {/* Image Container – no padding, fully covered */}
        <div className="md:w-1/2 bg-red-100 flex items-center justify-center md:self-stretch overflow-hidden">
          <div className="relative w-full h-full min-h-[280px] md:min-h-[320px]">
            <Image
              src={job.image}
              alt={job.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
        {/* Content Area */}
        <div className="md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-between md:self-stretch">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-[#D32F2F] text-xs font-semibold px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Hiring Now
              </span>
              <span className="text-xs text-gray-400">{job.experience}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 group-hover:text-[#D32F2F] transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-5 leading-relaxed">{job.desc}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.map((skill) => (
                <span key={skill} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-red-100 hover:text-[#D32F2F] transition-colors cursor-default">
                  <FaCheckCircle className="text-[10px]" /> {skill}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-8 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#D32F2F] text-base" /> {job.location}</div>
              <div className="flex items-center gap-2"><FaClock className="text-[#D32F2F] text-base" /> Walk-in: {job.walkin}</div>
              <div className="flex items-center gap-2"><FaPhoneAlt className="text-[#D32F2F] text-base" /> {job.contact}</div>
            </div>
          </div>
          <button
            onClick={() => openModalForJob(job.title)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] hover:shadow-xl text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 group/btn w-fit"
          >
            <FaPaperPlane className="text-sm group-hover/btn:translate-x-1 transition-transform" /> Apply Now
            <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* ========== APPLICATION FORM – with file upload ========== */}
      <div id="applyform" className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="lg:w-2/5 bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] p-8 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="text-white/90 mb-6 text-sm leading-relaxed">Fill the application below and we'll reach out on WhatsApp within 24 hours.</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2"><FaMapMarkerAlt /> Rainbow Media Office, Guindy</div>
                  <div className="flex items-center gap-2"><FaClock /> 11:00 AM – 1:00 PM (Mon-Fri)</div>
                  <div className="flex items-center gap-2"><FaPhoneAlt /> +91 73058 21333</div>
                  <div className="flex items-center gap-2"><FaEnvelope /> rmedia1123.info@gmail.com</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex -space-x-2 overflow-hidden">
                  {['👩‍💻', '👨‍🎨', '🧑‍💼', '👩‍🔧'].map((emoji, i) => <div key={i} className="inline-block h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-lg">{emoji}</div>)}
                </div>
                <p className="text-xs text-white/70 mt-3">Join 50+ creative professionals</p>
              </div>
            </div>
            <div className="lg:w-3/5 bg-white p-8">
              <form onSubmit={handleMainFormSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input type="text" placeholder="Full Name" className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 transition" required />
                  <input type="date" placeholder="Date of Birth" className="w-full p-3.5 border border-gray-200 rounded-xl" required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <select className="w-full p-3.5 border border-gray-200 rounded-xl bg-white"><option>Select Gender</option><option>Female</option><option>Male</option><option>Other</option></select>
                  <input type="tel" placeholder="Phone Number" className="w-full p-3.5 border border-gray-200 rounded-xl" required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <input type="email" placeholder="Email Address" className="w-full p-3.5 border border-gray-200 rounded-xl" required />
                  <select className="w-full p-3.5 border border-gray-200 rounded-xl"><option>Select Job Title</option><option>Social Media Manager</option><option>Social Media Intern</option><option>Telecaller</option></select>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <select className="w-full p-3.5 border border-gray-200 rounded-xl"><option>Years of Experience</option><option>0-1</option><option>1-2</option><option>2-3</option><option>3-4</option><option>4-5</option><option>5+</option></select>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 bg-gray-50 rounded-xl p-3 text-sm text-gray-500 border border-gray-200 flex items-center gap-2 cursor-pointer hover:bg-red-50 transition">
                      <FaUpload className="text-[#D32F2F]" /> Upload Resume
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => e.target.files && setUploadedFile(e.target.files[0])} />
                    </label>
                    {uploadedFile && <span className="text-xs text-green-600 truncate w-32">{uploadedFile.name}</span>}
                  </div>
                </div>
                <textarea rows={3} placeholder="Cover Letter (optional)" className="w-full p-3.5 border border-gray-200 rounded-xl resize-none"></textarea>
                <button type="submit" className="w-full bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] hover:shadow-xl text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 group text-lg">Submit Application <FaPaperPlane className="group-hover:translate-x-1 transition" /></button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ========== WALK-IN BANNER ========== */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Direct Walk-in Interviews</h3>
          <p className="text-white/90 text-base mb-3">📍 Rainbow Media Office, Guindy | 11:00 AM – 1:00 PM (Mon-Fri)</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+917305821333" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-full transition"><FaPhoneAlt /> +91 73058 21333</a>
            <a href="mailto:rmedia1123.info@gmail.com" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-full transition"><FaEnvelope /> rmedia1123.info@gmail.com</a>
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
            className="fixed bottom-5 right-5 z-40 bg-[#D32F2F] text-white p-3 rounded-full shadow-xl hover:bg-[#B71C1C] transition-all"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* ========== MODAL ========== */}
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
        html, body { overscroll-behavior: none; scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}