'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSpring, useMotionValue } from 'framer-motion';

function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 12, mass: 0.4 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={e => {
        const r = ref.current; if (!r) return;
        const rect = r.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: any;
  onSubmit: (title: string, name: string, phone: string, message: string) => void;
}

export default function ServiceModal({ isOpen, onClose, service, onSubmit }: ServiceModalProps) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (service) {
      onSubmit(service.title, form.name, form.phone, form.message);
    }
    onClose();
    setForm({ name: '', phone: '', message: '' });
  }, [form, service, onSubmit, onClose]);

  if (!isOpen || !service) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto py-8" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="bg-darkPanel rounded-2xl w-full max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/10"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-[#030218] p-6 md:p-8 relative overflow-hidden border-r border-white/5">
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,137,118,0.15) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}
              className="relative z-10 w-full h-44 md:h-52 rounded-xl overflow-hidden shadow-lg border border-white/10">
              <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </motion.div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mt-5 mb-2 relative z-10">{service.title}</h3>
            <p className="text-[#acabcb] text-sm leading-relaxed relative z-10">{service.desc}</p>
          </div>
          <div className="md:w-1/2 p-6 md:p-8 rounded-b-2xl md:rounded-r-2xl md:rounded-l-none bg-darkPanel">
            <h4 className="font-display text-lg font-bold text-white mb-1">Get a Free Consult</h4>
            <p className="text-[#acabcb]/70 text-xs mb-4">We reply on WhatsApp in minutes.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" value={service.title} readOnly className="w-full p-2.5 bg-[#030218] border border-white/10 rounded-xl text-[#acabcb] text-sm font-display focus:outline-none" />
              <input type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} className="w-full p-2.5 bg-[#030218] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-peachAccent text-sm transition-colors" />
              <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} className="w-full p-2.5 bg-[#030218] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-peachAccent text-sm transition-colors" />
              <textarea name="message" placeholder="Requirements / Message" rows={3} required value={form.message} onChange={handleChange} className="w-full p-2.5 bg-[#030218] border border-white/10 rounded-xl text-white placeholder-white/20 resize-none focus:outline-none focus:border-peachAccent text-sm transition-colors" />
              <Magnetic strength={0.15}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                  className="w-full bg-[#25D366] hover:bg-green-600 text-darkBg font-display font-extrabold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg text-sm cursor-pointer">
                  Send on WhatsApp
                </motion.button>
              </Magnetic>
            </form>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#acabcb] hover:text-white transition-colors font-bold text-sm z-10 cursor-pointer">✕</button>
      </motion.div>
    </motion.div>
  );
}
