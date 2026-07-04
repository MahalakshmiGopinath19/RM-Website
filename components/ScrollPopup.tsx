'use client';

import { useEffect, useState } from 'react';

export default function ScrollPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [popupClosedThisVisit, setPopupClosedThisVisit] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !popupClosedThisVisit) {
        setIsOpen(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [popupClosedThisVisit]);

  const closeModal = () => {
    setIsOpen(false);
    setPopupClosedThisVisit(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '917305821333';
    const messageText = `Hello! I would like to book a consultation.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappURL, '_blank');
    closeModal();
    setFormData({ name: '', phone: '', message: '' });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300"
        onClick={closeModal}
      />
      {/* Modal - centered with flex, no transform conflicts */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto animate-scaleUp"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src="/image/bcp.webp"
            alt="Consultation"
            className="w-full h-40 object-cover"
          />
          <div className="bg-[#0A0930] text-white px-6 py-3 flex justify-between items-center">
            <h4 className="text-xl font-semibold">Book a Consultation</h4>
            <button
              onClick={closeModal}
              className="text-2xl leading-none hover:text-gray-200 transition"
            >
              &times;
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D18F5C]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D18F5C]"
              />
              <textarea
                name="message"
                placeholder="How can we help you?"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D18F5C] resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#D18F5C] text-white font-bold py-3 rounded-md hover:bg-[#B8714A] transition shadow-md"
              >
                Request Call Back on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
