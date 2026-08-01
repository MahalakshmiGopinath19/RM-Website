'use client';

import { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock, FaPaperPlane, FaUpload } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Magnetic CTA wrapper ── */
function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = (useRef(0)).current;
  const y = (useRef(0)).current;
  return (
    <motion.div ref={ref} style={{ display: 'inline-block' }} className="w-full">
      {children}
    </motion.div>
  );
}

interface GeneralFormProps {
  onSubmit: (formData: any) => void;
}

export default function GeneralForm({ onSubmit }: GeneralFormProps) {
  const [form, setForm] = useState({
    name: '', dob: '', gender: '', phone: '', email: '', job: '', experience: '', cover: '', resume: null as File | null
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setForm({ ...form, resume: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      resume: uploadedFile ? uploadedFile.name : 'Not uploaded'
    });
    setForm({ name: '', dob: '', gender: '', phone: '', email: '', job: '', experience: '', cover: '', resume: null });
    setUploadedFile(null);
  };

  return (
    <section id="applyform" className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          <div className="lg:w-2/5 bg-[#050720] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{
              backgroundImage: 'radial-gradient(circle, rgba(201,149,108,0.2) 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
            }} />
            <div className="relative z-10">
              <span className="inline-block bg-peachAccent/10 text-peachAccent border border-peachAccent/20 px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-4">
                Join Our Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight text-white">Application Form</h2>
              <p className="text-[#acabcb] mb-8 text-sm leading-relaxed font-medium">Fill out the application below and our HR team will reach out on WhatsApp within 24 hours.</p>
              <div className="space-y-4 text-sm font-display text-white/90">
                <div className="flex items-center gap-3"><FaMapMarkerAlt className="text-peachAccent" /> Vaave Digital Office, Guindy, Chennai</div>
                <div className="flex items-center gap-3"><FaClock className="text-peachAccent" /> 11:00 AM – 1:00 PM (Mon-Fri)</div>
                <div className="flex items-center gap-3"><FaPhoneAlt className="text-peachAccent" /> +91 73058 21333</div>
                <div className="flex items-center gap-3"><FaEnvelope className="text-peachAccent" /> info@vaavedigital.com</div>
              </div>
            </div>
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
              <div className="flex -space-x-2 overflow-hidden">
                {['👩‍💻', '👨‍🎨', '🧑‍💼', '👩‍🔧'].map((emoji, i) => <div key={i} className="inline-block h-10 w-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-lg">{emoji}</div>)}
              </div>
              <p className="text-xs text-[#acabcb] mt-3 font-display font-semibold">Join 50+ creative professionals</p>
            </div>
          </div>
          <div className="lg:w-3/5 bg-white p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm font-medium" required />
                <input type="date" name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm font-medium" required />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm font-medium" required>
                  <option value="">Select Gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm font-medium" required />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm font-medium" required />
                <select name="job" value={form.job} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm font-medium" required>
                  <option value="">Select Job Title</option>
                  <option>Social Media Manager</option>
                  <option>Social Media Intern</option>
                  <option>Telecaller</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <select name="experience" value={form.experience} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm font-medium" required>
                  <option value="">Years of Experience</option>
                  <option>0-1</option>
                  <option>1-2</option>
                  <option>2-3</option>
                  <option>3-4</option>
                  <option>4-5</option>
                  <option>5+</option>
                </select>
                <div className="flex items-center gap-2">
                  <label className="flex-1 bg-slate-50 rounded-xl p-3.5 text-sm text-slate-600 border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition font-medium">
                    <FaUpload className="text-peachAccent" /> Upload Resume
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                  </label>
                  {uploadedFile && <span className="text-xs text-emerald-600 font-bold truncate w-32">{uploadedFile.name}</span>}
                </div>
              </div>
              <textarea name="cover" value={form.cover} onChange={handleChange} rows={3} placeholder="Cover Letter (optional)" className="w-full p-3.5 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-peachAccent focus:border-peachAccent transition text-sm font-medium"></textarea>
              <Magnetic strength={0.15}>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-rosegold hover-bg-gradient-rosegold text-darkBg font-display font-black py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 group text-base shadow-lg">Submit Application <FaPaperPlane className="group-hover:translate-x-1 transition" /></motion.button>
              </Magnetic>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
