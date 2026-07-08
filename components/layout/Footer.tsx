'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn,
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigate = ['Home', 'Services', 'Products', 'Career', 'About', 'Blog', 'Contact'];

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
    <footer className="relative bg-[#0A0930] text-white overflow-hidden">

      {/* Ambient copper glow, echoes the logo's light source — top right */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #E0A36A 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #E0A36A 0%, transparent 70%)' }}
      />

      <div className="relative z-10">

        {/* ── CTA band ───────────────────────────────────────────── */}
        <div className="container mx-auto px-6 pt-16 pb-12 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#EFD3C9]">
                Start a project
              </span>
              <h2 className="mt-3 text-3xl md:text-[2.6rem] font-extrabold leading-[1.1] tracking-tight">
                Have an idea? Let&apos;s turn it into{' '}
                <span className="bg-gradient-to-r from-[#EFD3C9] via-[#E0A36A] to-[#9C5B5A] bg-clip-text text-transparent italic">
                  results.
                </span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="tel:+917305821333"
                className="group flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 hover:border-[#EFD3C9]/50 transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#EFD3C9]">
                  <FaPhoneAlt size={13} />
                </span>
                <span className="text-sm">
                  <span className="block text-white/50 text-xs">Call us</span>
                  <span className="font-semibold">+91 73058 21333</span>
                </span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFD3C9] via-[#E0A36A] to-[#9C5B5A] text-[#0A0930] font-bold text-sm px-6 py-3.5 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/20"
              >
                Book a free consult
                <FaPaperPlane size={12} className="-rotate-45" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main grid ──────────────────────────────────────────── */}
        <div className="container mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Brand */}
            <div className="md:col-span-4 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/image/vaave-digital.webp" alt="Vaave Digital" width={180} height={50} className="w-auto h-12" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
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
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-[#0A0930] hover:bg-gradient-to-r hover:from-[#EFD3C9] hover:to-[#9C5B5A] hover:border-transparent transition-all duration-300"
                  >
                    <item.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigate */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
                Navigate
              </h4>
              <ul className="space-y-3 text-sm">
                {navigate.map((item) => (
                  <li key={item}>
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                      className="text-white/70 hover:text-[#EFD3C9] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
                Services
              </h4>
              <ul className="space-y-3 text-sm">
                {services.map((item) => (
                  <li key={item}>
                    <Link href="/services" className="text-white/70 hover:text-[#EFD3C9] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
                Visit us
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex gap-3">
                  <FaMapMarkerAlt className="text-[#EFD3C9] mt-0.5 flex-shrink-0" size={14} />
                  <span className="leading-relaxed">
                    2nd Floor, Manickam Lane, Anna Salai, Guindy, Chennai&nbsp;600032
                  </span>
                </li>
                <li className="flex gap-3">
                  <FaEnvelope className="text-[#EFD3C9] mt-0.5 flex-shrink-0" size={14} />
                  <a href="mailto:info@vaavedigital.com" className="hover:text-[#EFD3C9] transition-colors">
                    info@vaavedigital.com
                  </a>
                </li>
                <li className="flex gap-3">
                  <FaClock className="text-[#EFD3C9] mt-0.5 flex-shrink-0" size={14} />
                  <span>Mon – Sat, 9:30 AM – 6:30 PM</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 order-2 md:order-1">
              © {currentYear} Vaave Digital. All rights reserved.
            </p>

            <div className="flex items-center gap-6 order-1 md:order-2">
              <Link href="/privacy" className="text-xs text-white/40 hover:text-[#EFD3C9] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-white/40 hover:text-[#EFD3C9] transition-colors">
                Terms of Service
              </Link>

              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="group flex items-center gap-2 text-xs text-white/50 hover:text-[#EFD3C9] transition-colors"
              >
                Back to top
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 group-hover:border-[#EFD3C9]/50 transition-all duration-300 group-hover:-translate-y-1">
                  <FaPaperPlane size={11} className="-rotate-45" />
                </span>
              </button>
            </div>
          </div>

          {/* SEO line — quiet, single sentence instead of a badge wall */}
          <div className="container mx-auto px-6 pb-6">
            <p className="text-[11px] text-white/25 leading-relaxed">
              Trusted by growing businesses for{' '}
              {searchTerms.map((term, i) => (
                <span key={term}>
                  <Link href="/services" className="hover:text-white/50 transition-colors">
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
