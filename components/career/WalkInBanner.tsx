'use client';

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function WalkInBanner() {
  return (
    <div className="bg-[#050720] text-white py-14 relative overflow-hidden border-t border-slate-800/80">
      {/* Rose Gold Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(201,149,108,0.15)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, rgba(201,149,108,0.25) 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
      }} />
      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        <span className="inline-block bg-[#C9956C]/15 text-[#C9956C] border border-[#C9956C]/30 px-3.5 py-1 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-4">
          Direct Walk-ins
        </span>
        <h3 className="font-display text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r from-[#C9956C] via-[#EFD3C9] to-[#C9956C] bg-clip-text text-transparent">
          Direct Walk-in Interviews
        </h3>
        <p className="text-[#acabcb] text-base mb-8 font-medium">📍 Vaave Digital Office, Guindy, Chennai | 11:00 AM – 5:00 PM (Mon-Fri)</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="tel:+917305821333" className="flex items-center gap-2.5 bg-gradient-rosegold hover-bg-gradient-rosegold text-[#050720] px-7 py-3.5 rounded-full transition-all font-display font-black text-sm shadow-lg shadow-[#C9956C]/20">
            <FaPhoneAlt className="text-[#050720]" /> +91 73058 21333
          </a>
          <a href="mailto:info@vaavedigital.com" className="flex items-center gap-2.5 bg-gradient-rosegold hover-bg-gradient-rosegold text-[#050720] px-7 py-3.5 rounded-full transition-all font-display font-black text-sm shadow-lg shadow-[#C9956C]/20">
            <FaEnvelope className="text-[#050720]" /> info@vaavedigital.com
          </a>
        </div>
      </div>
    </div>
  );
}
