'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const specialities = [
    "Best digital marketing agencies in Chennai", "Top 10 best digital marketing agencies in guindy chennai",
    "Best digital marketing agencies in guindy Chennai", "Top digital marketing companies",
    "Best social media marketing agency in Guindy", "Best social media content creation services in guindy",
    "Top GMB marketing experts in Guindy", "Best seo smm and digital marketing in Guindy",
    "Best seo and smm service in Guindy", "Top social media marketing companies in Guindy",
    "Top social media marketing agency in Chennai", "Affordable on-page seo optimization in Guindy",
    "Top 5 Digital marketing agencies in Guindy", "Top 15 Best Digital Marketing Agencies in Chennai",
    "Top GMB and local SEO services in Guindy"
  ];

  return (
    <footer className="bg-white text-gray-900 py-16 border-t border-gray-200">
      <div className="container mx-auto px-6">
        
        {/* Main Grid: Added gap-x-16 to create more separation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-16 mb-16">
          
          {/* Logo & Bio */}
          <div className="md:col-span-1">
            <Image src="/logo.webp" alt="Rainbow Media" width={160} height={50} className="mb-6" />
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
              Experience digital excellence crafted with elegance, modern AI‑driven strategies, and result‑oriented solutions for everyone.
            </p>
            {/* Social Icons: Reduced size (p-2.5) */}
            <div className="flex gap-3 mt-8">
              {[FaFacebookF, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope].map((Icon, i) => (
                <div key={i} className="p-2.5 bg-gray-50 border border-gray-200 rounded-full hover:bg-[#D32F2F] hover:text-white transition-all duration-300 cursor-pointer text-[#D32F2F]">
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[#D32F2F] font-bold text-sm uppercase tracking-[0.2em] mb-8">Explore</h4>
            <ul className="space-y-4 text-gray-800 font-semibold text-sm">
              {['About Us', 'Services', 'Products', 'Career', 'Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-[#D32F2F] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Centers */}
          <div className="md:col-span-2">
            <h4 className="text-[#D32F2F] font-bold text-sm uppercase tracking-[0.2em] mb-8">Experience Centers</h4>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="text-gray-700 text-sm space-y-4 max-w-sm">
                <p className="flex items-start gap-3"><span className="text-[#D32F2F] font-bold">📍</span> Old.No. 83, New no.112, 2nd floor, Anna salai, Manickam lane, Guindy, Chennai-600032</p>
                <p className="flex items-center gap-3"><span className="text-[#D32F2F] font-bold">📧</span> rainbowmedia@gmail.com</p>
              </div>
              <div className="border-l border-gray-200 pl-8 space-y-2 text-sm font-bold text-gray-900">
                <div className="flex justify-between w-48"><span>GUINDY</span> <span className="text-[#D32F2F]">+91 73058 21333</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties Box */}
        <div className="border-t border-b border-gray-200 py-10 mb-12">
          <h4 className="text-gray-900 text-center text-xs font-bold tracking-[0.2em] mb-8 uppercase">Discover our specialities</h4>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-500 text-[11px] font-medium uppercase tracking-wider">
            {specialities.map((item, idx) => (
              <span key={idx} className="hover:text-[#D32F2F] transition-colors cursor-default">{item}</span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          <p>© Copyright {currentYear} Rainbow Media. All rights reserved. India (IN)</p>
        </div>
      </div>
    </footer>
  );
}