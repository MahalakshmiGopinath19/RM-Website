'use client';

import { useEffect, useRef, useState } from 'react';

export default function VaaveScrollPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [popupClosedThisVisit, setPopupClosedThisVisit] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !popupClosedThisVisit) {
        setIsOpen(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [popupClosedThisVisit]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => nameInputRef.current?.focus(), 150);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>('input, textarea, button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setPopupClosedThisVisit(true);
      setErrors({});
    }, 200);
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!formData.name.trim()) next.name = 'Please enter your name';
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) next.phone = 'Please enter your phone number';
    else if (phoneDigits.length < 10) next.phone = 'Enter a valid 10-digit number';
    if (!formData.message.trim()) next.message = 'Tell us how we can help';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const whatsappNumber = '917305821333';
    const messageText = `Hello! I would like to book a consultation.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      setIsSubmitting(false);
      setFormData({ name: '', phone: '', message: '' });
      closeModal();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#050415]/80 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100 animate-fadeIn'
        }`}
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 pointer-events-none"
        onClick={closeModal}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden pointer-events-auto transition-all duration-200 bg-[#0A0928] border border-[#C98F72]/20 shadow-[0_0_60px_-15px_rgba(201,143,114,0.35)] ${
            isClosing
              ? 'opacity-0 translate-y-4 sm:scale-95'
              : 'opacity-100 translate-y-0 sm:scale-100 animate-scaleUp'
          }`}
        >
          {/* Header */}
          <div className="relative px-6 pt-7 pb-6 overflow-hidden">
            {/* ambient glow */}
            <div className="pointer-events-none absolute -top-16 -right-10 w-48 h-48 rounded-full bg-[#5CD3F0]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-[#C98F72]/10 blur-3xl" />

            {/* swoosh accent, echoes the logo arc */}
            <svg
              className="absolute top-4 left-6 w-24 h-10 opacity-70"
              viewBox="0 0 100 40"
              fill="none"
            >
              <path
                d="M2 34C30 34 40 4 70 4"
                stroke="url(#arcGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="70" cy="4" r="3" fill="#5CD3F0">
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <defs>
                <linearGradient id="arcGradient" x1="0" y1="0" x2="100" y2="0">
                  <stop offset="0%" stopColor="#8B5A45" />
                  <stop offset="100%" stopColor="#E3B693" />
                </linearGradient>
              </defs>
            </svg>

            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-[#E3B693] text-lg leading-none hover:bg-white/10 hover:text-white transition"
            >
              &times;
            </button>

            <h4
              id="popup-title"
              className="mt-8 text-2xl font-bold tracking-tight bg-gradient-to-r from-[#E3B693] via-[#C98F72] to-[#8B5A45] bg-clip-text text-transparent"
            >
              Let's Build Something Great
            </h4>

            <div className="flex items-center gap-3 mt-2">
              <span className="h-px w-6 bg-[#C98F72]/40" />
              <p className="text-[11px] tracking-[0.2em] text-[#C98F72]/70 uppercase">
                Book a free consultation
              </p>
              <span className="h-px flex-1 bg-[#C98F72]/40" />
            </div>
          </div>

          {/* Form */}
          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
              <div>
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full bg-white/5 border rounded-md px-4 py-2.5 text-[#F5F0E6] placeholder:text-[#F5F0E6]/35 transition focus:outline-none focus:ring-1 ${
                    errors.name
                      ? 'border-red-400/60 focus:ring-red-400/60'
                      : 'border-white/10 focus:border-[#C98F72]/60 focus:ring-[#C98F72]/40'
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-300">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={`w-full bg-white/5 border rounded-md px-4 py-2.5 text-[#F5F0E6] placeholder:text-[#F5F0E6]/35 transition focus:outline-none focus:ring-1 ${
                    errors.phone
                      ? 'border-red-400/60 focus:ring-red-400/60'
                      : 'border-white/10 focus:border-[#C98F72]/60 focus:ring-[#C98F72]/40'
                  }`}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-red-300">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full bg-white/5 border rounded-md px-4 py-2.5 text-[#F5F0E6] placeholder:text-[#F5F0E6]/35 resize-none transition focus:outline-none focus:ring-1 ${
                    errors.message
                      ? 'border-red-400/60 focus:ring-red-400/60'
                      : 'border-white/10 focus:border-[#C98F72]/60 focus:ring-[#C98F72]/40'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-300">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-md py-3 font-semibold text-[#0A0928] transition disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(90deg, #E3B693, #C98F72 45%, #E3B693 90%)',
                  backgroundSize: '200% 100%',
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0A0928]/30 border-t-[#0A0928] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request Call Back
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                        <path d="M4 12h15M13 5l7 7-7 7" stroke="#0A0928" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-[position:100%_0] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:bg-[position:0_0] transition-all duration-500" />
              </button>

              <p className="text-center text-[11px] text-[#F5F0E6]/40">
                Opens WhatsApp with your details pre-filled
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleUp { animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn, .animate-scaleUp { animation: none; }
        }
      `}</style>
    </>
  );
}