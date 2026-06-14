'use client';

import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';

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
    <footer 
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: `url('/image/footbanner.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Darker overlay with gradient for better depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D32F2F]/95 to-[#B71C1C]/95 z-0"></div>

      <div className="container mx-auto px-6 relative z-10 pt-16 pb-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 mb-14">
          
          {/* Logo & Bio */}
          <div className="space-y-5">
            <p className="text-white/80 text-sm leading-relaxed">
              Experience digital excellence crafted with elegance, modern strategies, and result‑oriented solutions for everyone.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaWhatsapp, href: "https://wa.me/917305821333", label: "WhatsApp" },
                { icon: FaPhone, href: "tel:+917305821333", label: "Call" },
                { icon: FaEnvelope, href: "mailto:rainbowmedia@gmail.com", label: "Email" }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  aria-label={item.label}
                  className="w-10 h-10 flex items-center justify-center border border-white/30 rounded-full hover:bg-white hover:text-[#D32F2F] transition-all duration-300 hover:scale-110 hover:border-transparent"
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore - shifted exactly 1 inch (96px) to the right */}
          <div className="md:ml-24">
            <h4 className="font-bold uppercase tracking-wider text-lg mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-red-300">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              {['About Us', 'Services', 'Products', 'Career', 'Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '')}`} 
                    className="hover:text-white hover:pl-1 transition-all duration-200 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Centers */}
          <div className="md:col-span-2">
            <h4 className="font-bold uppercase tracking-wider text-lg mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-red-300">
              Experience Centers
            </h4>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="text-red-300 mt-1 flex-shrink-0" size={14} />
                  <p className="text-white/80 leading-relaxed">
                    Old.No. 83, New no.112, 2nd floor, Anna salai, Manickam lane, Guindy, Chennai-600032
                  </p>
                </div>
                <div className="flex gap-3">
                  <FaEnvelope className="text-red-300 mt-1 flex-shrink-0" size={14} />
                  <a href="mailto:rainbowmedia@gmail.com" className="text-white/80 hover:text-white transition-colors">
                    rainbowmedia@gmail.com
                  </a>
                </div>
              </div>
              <div className="border-l border-white/20 pl-6 space-y-3">
                <div className="flex gap-3">
                  <FaRegClock className="text-red-300 mt-1" size={14} />
                  <div>
                    <p className="text-white/80 text-lg uppercase tracking-wider">Guindy</p>
                    <a href="tel:+917305821333" className="text-2xl font-bold hover:text-red-200 transition-colors block">
                      +91 73058 21333
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties Badges */}
        <div className="mb-14">
          <h4 className="font-bold uppercase tracking-wider text-lg text-center mb-6 opacity-80">
            Our Specialties
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {specialities.map((item, idx) => (
              <Link 
                href="/services" 
                key={idx} 
                className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium hover:bg-white hover:text-[#D32F2F] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-6 border-t border-white/15 text-xs text-white/60 uppercase tracking-wider">
          <p>© Copyright © 2024 Rainbow media. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}