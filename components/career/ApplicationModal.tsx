'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  onSubmit: (formData: any) => void;
}

export default function ApplicationModal({ isOpen, onClose, jobTitle, onSubmit }: ApplicationModalProps) {
  const [form, setForm] = useState({
    name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', portfolio: '', cover: ''
  });

  useEffect(() => {
    setForm(f => ({ ...f, job: jobTitle || '' }));
  }, [jobTitle]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
    setForm({ name: '', dob: '', gender: '', phone: '', email: '', job: jobTitle || '', experience: '', portfolio: '', cover: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors font-bold text-sm cursor-pointer">
          &times;
        </button>

        {/* Left info panel */}
        <div className="bg-[#050720] text-white p-10 md:p-12 w-full md:w-[38%] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,149,108,0.2) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }} />
          <div className="relative z-10">
            <span className="inline-block bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-3 py-1.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-6">
              Apply Now
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-black mb-3 leading-tight text-white">Apply for {jobTitle || 'this position'}</h3>
            <p className="text-[#acabcb] text-sm leading-relaxed font-medium">We'll respond on WhatsApp within 24h</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-6 md:p-10 w-full md:w-[62%] bg-white max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Full Name</label><input type="text" name="name" placeholder="Your full name" required value={form.name} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Date of Birth</label><input type="date" name="dob" required value={form.dob} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Gender</label><select name="gender" required value={form.gender} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm"><option value="">Select Gender</option><option>Female</option><option>Male</option><option>Other</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Phone Number</label><input type="tel" name="phone" placeholder="+91 12345 67890" required value={form.phone} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Email Address</label><input type="email" name="email" placeholder="you@example.com" required value={form.email} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Job Title</label><select name="job" required value={form.job} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm"><option value="">Select Job Title</option><option>Social Media Intern</option><option>Telecaller</option><option>Social Media Manager</option><option>Creative Designer</option><option>Video Editor</option><option>Ads Manager</option></select></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Years of Experience</label><select name="experience" required value={form.experience} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm"><option value="">Select Experience</option><option>0-1</option><option>1-2</option><option>2-3</option><option>3-4</option><option>4-5</option><option>5+</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Portfolio / Work Link (optional)</label><input type="url" name="portfolio" placeholder="https://myportfolio.com or Drive link" value={form.portfolio} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1 font-display">Cover Letter (optional)</label><textarea name="cover" rows={3} placeholder="Tell us why you'd be a great fit..." value={form.cover} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm"></textarea></div>
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg font-display font-black py-3.5 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 text-base shadow-lg cursor-pointer"><FaWhatsapp className="text-lg" /> Send Application via WhatsApp</motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
