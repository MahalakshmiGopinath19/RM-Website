'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const faqs = [
  {
    question: 'Is digital marketing important for my business?',
    answer: 'Yes, digital marketing is absolutely critical for modern business growth. It builds high-impact online visibility, targets ideal buyers actively looking for your solutions, and delivers highly measurable ROI. Without strategic online campaigns and search engine presence, your brand loses valuable market share to competitors.'
  },
  {
    question: 'How does digital marketing help my business grow and acquire customers?',
    answer: 'Through integrated tactics like Search Engine Optimization (SEO), localized and global PPC paid ads, and high-converting landing pages, we place your brand in front of high-intent searchers. This systematically converts online traffic into qualified sales leads and loyal customers.'
  },
  {
    question: 'How long does it take to see measurable results from SEO and digital campaigns?',
    answer: 'Paid advertising campaigns (such as Google and Meta PPC) can generate targeted traffic and new business inquiries within 24 to 48 hours. Strategic organic SEO and content marketing campaigns generally show measurable rank growth and traffic compounding in 3 to 6 months, acting as a highly cost-effective, long-term asset.'
  },
  {
    question: 'How do you measure the success and ROI of digital marketing campaigns?',
    answer: 'We deploy analytics and tracking infrastructure (like Google Analytics 4) to monitor real-time key performance indicators. We focus on transparent business metrics: conversion rates, cost per acquisition (CPA), return on ad spend (ROAS), organic keyword rankings, and direct revenue generation.'
  },
  {
    question: 'Why should I hire a digital marketing agency instead of doing it in-house?',
    answer: 'Hiring a digital marketing agency gives your business immediate access to a complete team of specialized experts in advanced SEO, copywriting, paid advertising, and conversion rate optimization (CRO). This eliminates the cost and training time required for in-house hires while deploying state-of-the-art AI-powered growth tools from day one.'
  },
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full py-6 flex justify-between items-center text-left text-white font-display font-bold text-lg md:text-xl hover:text-[#C9956C] transition group cursor-pointer"
      >
        <span className="group-hover:text-[#C9956C] transition pr-4">{question}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gradient-rosegold text-[#050720]' : 'bg-white/5 text-[#acabcb] group-hover:bg-[#030218] group-hover:text-[#C9956C]'}`}>
          {isOpen ? <FaMinus className="text-sm" /> : <FaPlus className="text-sm" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#acabcb]/90 leading-relaxed text-base md:text-lg font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-white py-16 md:py-24 border-t border-slate-100">
      {/* FAQ Schema for AI Search Engines & Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Centered FAQ Title and Description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#050720]/10 text-[#050720] text-sm font-display font-extrabold px-4 py-1.5 rounded-full border border-[#050720]/20 mb-4">
            <span className="w-2 h-2 bg-[#050720] rounded-full animate-pulse"></span>
            FAQ
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-black bg-gradient-to-r from-[#C9956C] to-[#EFD3C9] bg-clip-text text-transparent mb-4 tracking-tight">
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#334155] max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Find answers to the most common questions about our search engine optimization (SEO), digital advertising, and high-growth marketing services.
          </motion.p>
        </motion.div>

        {/* Stacked FAQ Items List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-[#050720] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === idx}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
