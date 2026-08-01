'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn,
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigate = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Careers', href: '/career' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    'Social Media Marketing',
    'SEO & Local Search',
    'Google Ads & PPC',
    'Website Design',
    'Content Marketing',
    'Google My Business',
  ];

  const searchTerms = [
    'Digital marketing agency in Chennai', 'SEO company in Guindy',
    'Social media marketing Guindy', 'GMB & local SEO experts', 'PPC agency Chennai',
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#020215] text-[#acabcb] overflow-hidden border-t border-white/5">

      {/* Ambient peach glow, echoes the branding light source */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ff8976 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-3xl"
        style={{ background: 'radial-gradient(circle, #ff8976 0%, transparent 70%)' }}
      />

      <div className="relative z-10">



        {/* ── Main grid ──────────────────────────────────────────── */}
        <div className="container mx-auto px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Brand */}
            <div className="md:col-span-4 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/image/vaave-digital.webp" alt="Vaave Digital" width={180} height={50} className="w-auto h-11" />
              </div>
              <p className="text-[#acabcb]/70 text-sm leading-relaxed max-w-xs">
                A Chennai-based digital marketing studio helping brands grow with
                strategy, creative, and performance — all under one roof.
              </p>
              <div className="flex gap-3 pt-1">
                {[
                  { icon: FaFacebookF, href: 'https://www.facebook.com/', label: 'Facebook' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/', label: 'Instagram' },
                  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
                  { icon: FaWhatsapp, href: 'https://wa.me/917305821333', label: 'WhatsApp' },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    aria-label={item.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-darkBg hover:bg-peachAccent hover:border-transparent transition-all duration-300"
                  >
                    <item.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigate */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-5 font-display">
                Navigate
              </h4>
              <ul className="space-y-3 text-sm">
                {navigate.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[#acabcb]/80 hover:text-peachAccent transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-5 font-display">
                Services
              </h4>
              <ul className="space-y-3 text-sm">
                {services.map((item) => (
                  <li key={item}>
                    <Link href="/services" className="text-[#acabcb]/80 hover:text-peachAccent transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-5 font-display">
                Visit us
              </h4>
              <ul className="space-y-4 text-sm text-[#acabcb]/80">
                <li className="flex gap-3">
                  <FaMapMarkerAlt className="text-peachAccent mt-0.5 flex-shrink-0" size={14} />
                  <span className="leading-relaxed">
                    2nd Floor, Manickam Lane, Anna Salai, Guindy, Chennai&nbsp;600032
                  </span>
                </li>
                <li className="flex gap-3">
                  <FaEnvelope className="text-peachAccent mt-0.5 flex-shrink-0" size={14} />
                  <a href="mailto:info@vaavedigital.com" className="hover:text-peachAccent transition-colors duration-200">
                    info@vaavedigital.com
                  </a>
                </li>
                <li className="flex gap-3">
                  <FaClock className="text-peachAccent mt-0.5 flex-shrink-0" size={14} />
                  <span>Mon – Sat, 9:30 AM – 6:30 PM</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div className="border-t border-white/5">
          <div className="container mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20 order-2 md:order-1">
              © {currentYear} Vaave Digital. All rights reserved.
            </p>

            <div className="flex items-center gap-6 order-1 md:order-2">
              <Link href="/privacy" className="text-xs text-white/20 hover:text-peachAccent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-white/20 hover:text-peachAccent transition-colors">
                Terms of Service
              </Link>

              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="group flex items-center gap-2 text-xs text-white/30 hover:text-peachAccent transition-colors"
              >
                Back to top
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 group-hover:border-peachAccent/30 transition-all duration-300 group-hover:-translate-y-1">
                  <FaPaperPlane size={11} className="-rotate-45" />
                </span>
              </button>
            </div>
          </div>

          {/* SEO line — quiet, single sentence instead of a badge wall */}
          <div className="container mx-auto px-6 lg:px-12 pb-6">
            <p className="text-[11px] text-white/10 leading-relaxed">
              Trusted by growing businesses for{' '}
              {searchTerms.map((term, i) => (
                <span key={term}>
                  <Link href="/services" className="hover:text-white/30 transition-colors">
                    {term.toLowerCase()}
                  </Link>
                  {i < searchTerms.length - 1 ? ' · ' : '.'}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
