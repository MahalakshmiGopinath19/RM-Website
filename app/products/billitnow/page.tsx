// app/products/billitnow/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaWhatsapp, FaRobot, FaChartLine, FaClock, FaShieldAlt, FaFileInvoice, FaUserFriends } from 'react-icons/fa';

// Demo modal (same as before)
function DemoModal({ isOpen, onClose, onSubmit }: any) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '' });
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
    setForm({ name: '', email: '', phone: '', business: '', message: '' });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#D18F5C] mb-2">Book a Free Demo</h3>
          <p className="text-gray-500 text-sm mb-4">Our AI billing expert will contact you on WhatsApp.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" required value={form.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
            <input type="email" name="email" placeholder="Email Address" required value={form.email} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
            <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
            <input type="text" name="business" placeholder="Type of Business" required value={form.business} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm" />
            <textarea name="message" placeholder="Message / Requirements" rows={3} value={form.message} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl resize-none text-sm"></textarea>
            <button type="submit" className="w-full bg-[#25D366] hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
              <FaWhatsapp /> Send on WhatsApp
            </button>
          </form>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </motion.div>
    </div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function BillitNowPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [activeTab, setActiveTab] = useState('invoice-summary');

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleWhatsAppSubmit = (data: any) => {
    const whatsappNumber = '917305821333';
    const msg = `Hello Rainbow Media! I'm interested in BILL IT NOW demo.%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Business:* ${data.business}%0A*Message:* ${data.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const plans = [
    { name: 'BASIC', priceINR: 14999, priceUSD: 155, renewalINR: 5999, renewalUSD: 72, features: ['Dashboard', 'Service', 'Product', 'Sale', 'Report (Basic)', 'Staff', 'Customer', 'Admin'], recommended: false },
    { name: 'STANDARD', priceINR: 17999, priceUSD: 180, renewalINR: 6999, renewalUSD: 84, features: ['Dashboard', 'Service', 'Product', 'Sale', 'Expense', 'Report (Advance)', 'Inventory', 'Staff', 'Customer', 'Admin'], recommended: true },
    { name: 'ADVANCE', priceINR: 24999, priceUSD: 240, renewalINR: 7999, renewalUSD: 96, features: ['Dashboard', 'Mini CRM', 'Service', 'Product', 'Sale', 'Expense', 'Report (Advance)', 'Inventory', 'Staff', 'Customer', 'Admin'], recommended: false }
  ];

  const featuresList = [
    { icon: FaRobot, title: 'AI‑Powered Data Capture', desc: 'Automatically extract invoice details from PDFs, emails, or scans – 95% faster.' },
    { icon: FaChartLine, title: 'Predictive Cash Flow', desc: 'AI forecasts payment delays and suggests optimal billing cycles.' },
    { icon: FaClock, title: '60% Time Savings', desc: 'Automate reconciliation, GST filing, recurring invoices, and reminders.' },
    { icon: FaShieldAlt, title: 'Bank‑Grade Security', desc: 'End‑to‑end encryption, role‑based access, and full audit trails.' },
    { icon: FaFileInvoice, title: 'Smart Invoice Recognition', desc: 'AI reads any invoice format and populates your system instantly.' },
    { icon: FaUserFriends, title: 'Staff Sales Tracking', desc: 'Monitor employee performance and generate sales reports with AI insights.' }
  ];

  const tabs = [
    { id: 'invoice-summary', name: 'Invoice summary', desc: 'A concise overview detailing total amount due, items/services rendered, payment terms, and invoice number.' },
    { id: 'invoice-detail', name: 'Invoice detail', desc: 'Comprehensive breakdown of individual items, quantities, unit prices, subtotals, taxes, and discounts.' },
    { id: 'staff-report', name: 'Staff report', desc: 'Employee performance metrics including sales targets, achievements, and customer interactions.' },
    { id: 'day-report', name: 'Day report', desc: 'Daily summary of sales, expenses, transactions, and customer interactions.' },
    { id: 'month-report', name: 'Month report', desc: 'Monthly overview of sales, expenses, profits, and customer trends.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">BillIT NOW: Your Ultimate BILLING Solution</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">Billing made simple – try it now!</h1>
            <p className="text-white/90 text-lg md:text-xl mt-6">The finest billing software designed to meet all your invoicing needs.</p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a href="#features" className="bg-white text-blue-900 px-6 py-2.5 rounded-full font-semibold transition shadow-md">VIEW MORE</a>
              <button onClick={() => setModalOpen(true)} className="border border-white hover:bg-white hover:text-blue-900 text-white px-6 py-2.5 rounded-full font-semibold transition">GET STARTED</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Intro placeholder */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="rounded-2xl shadow-2xl max-w-4xl mx-auto bg-gray-100 p-12 flex justify-center items-center">
          <span className="text-6xl">💻</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-8">Introducing our cutting-edge billing software solution</h2>
      </div>

      {/* Features Grid (simplified, no broken images) */}
      <div id="features" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[#D18F5C] font-semibold uppercase tracking-wide">Features</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">Empower your billing process with <span className="text-blue-600">next-gen</span> feature set</h2>
        </div>
        <div className="container mx-auto px-4 mt-12 space-y-8 max-w-5xl">
          <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800">Go Paperless</h3>
              <p className="text-gray-600 mt-2">Streamline your billing process with our cutting-edge paperless billing software. Say goodbye to paperwork and hello to efficiency.</p>
              <button onClick={() => setModalOpen(true)} className="mt-4 bg-[#D18F5C] text-white px-6 py-2 rounded-full">Book now</button>
            </div>
            <div className="md:w-1/2 bg-gray-100 h-40 rounded-xl flex items-center justify-center"><span className="text-3xl">📄➡️📱</span></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md text-center"><span className="text-3xl">📱</span><h4 className="text-xl font-bold mt-2">Mobile accessibility</h4><p className="text-gray-500 text-sm">Billing at your fingertips wherever you go!</p><button onClick={() => setModalOpen(true)} className="mt-3 text-[#D18F5C] font-semibold">Book now</button></div>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center"><span className="text-3xl">🤝</span><h4 className="text-xl font-bold mt-2">Instant customer integration</h4><p className="text-gray-500 text-sm">Seamless integration with your customer systems.</p><button onClick={() => setModalOpen(true)} className="mt-3 text-[#D18F5C] font-semibold">Book now</button></div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#D18F5C] font-semibold uppercase tracking-wide">Benefits</span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Key benefits of our billing software</h3>
              <div className="mt-6 space-y-2">
                {['User Friendly', 'Mobile Accessibility', 'Paperless Billing', 'Effortless Invoicing', 'Inventory Management', 'Customer Integration', 'Sales and expense Reports', 'Staff Sales Tracking'].map(b => <div key={b} className="flex items-center gap-2"><span className="text-green-500">✓</span><span>{b}</span></div>)}
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-12 text-center"><span className="text-5xl">🏆</span></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-yellow-300 font-semibold uppercase tracking-wide">Features</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">Everything you need for your business</h2>
        </div>
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-wrap justify-center gap-2 border-b border-white/30 pb-4">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${activeTab === tab.id ? 'bg-yellow-400 text-black' : 'text-white hover:bg-white/20'}`}>{tab.name}</button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold">{tabs.find(t => t.id === activeTab)?.name}</h3>
            <p className="mt-4 text-white/90 max-w-2xl mx-auto">{tabs.find(t => t.id === activeTab)?.desc}</p>
            <button onClick={() => setModalOpen(true)} className="mt-6 bg-white text-blue-900 px-6 py-2 rounded-full font-semibold shadow-md">Book now</button>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-yellow-300 text-sm uppercase tracking-wider">OUR PRICING</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">Pricing & <span className="text-blue-400">Plans</span></h2>
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-4 bg-white/10 rounded-full px-6 py-2">
              <span className={`font-semibold ${currency === 'INR' ? 'text-white' : 'text-gray-300'}`}>INR</span>
              <button onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')} className="relative w-14 h-7 bg-gray-600 rounded-full"><span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${currency === 'USD' ? 'translate-x-7' : ''}`} /></button>
              <span className={`font-semibold ${currency === 'USD' ? 'text-white' : 'text-gray-300'}`}>USD</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {plans.map((plan, idx) => {
              const price = currency === 'INR' ? plan.priceINR : plan.priceUSD;
              const symbol = currency === 'INR' ? '₹' : '$';
              return (
                <div key={idx} className={`relative w-80 bg-white rounded-2xl shadow-xl overflow-hidden ${plan.recommended ? 'ring-2 ring-yellow-400' : ''}`}>
                  {plan.recommended && <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">Recommended</div>}
                  <div className="p-6 text-gray-800">
                    <h3 className="text-xl font-bold uppercase">{plan.name}</h3>
                    <div className="mt-4"><span className="text-4xl font-bold">{symbol}{price.toLocaleString()}</span><span className="text-gray-500 text-sm">/year</span></div>
                    <ul className="mt-4 space-y-1 text-sm">{plan.features.map(f => <li key={f}>✓ {f}</li>)}</ul>
                    <button onClick={() => setModalOpen(true)} className="mt-6 w-full bg-[#D18F5C] hover:bg-[#B8714A] text-white py-2 rounded-full">Book Now</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[#D18F5C] font-semibold uppercase tracking-wide">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">Ready to get started?</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            {[
              { q: "What is billing software?", a: "Automates invoicing, payment processing, and financial tracking." },
              { q: "Why use billing software?", a: "Streamlines billing, reduces errors, and enhances efficiency." },
              { q: "Is it suitable for small businesses?", a: "Yes, it caters to businesses of all sizes." },
              { q: "What features does it offer?", a: "Invoicing, payment processing, expense tracking, reporting, customer management." },
              { q: "Is billing software secure?", a: "Yes, we use encryption and secure data storage." },
              { q: "Can I customize invoices?", a: "Yes, most billing software allows customization." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-md"><h3 className="font-bold">{faq.q}</h3><p className="text-gray-500 text-sm mt-2">{faq.a}</p></div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8">Haven’t got your answer? <span className="text-green-600 font-semibold cursor-pointer" onClick={() => setModalOpen(true)}>Contact our team now</span></p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h3 className="text-3xl font-bold">Book free demo with us</h3>
          <form className="flex flex-col sm:flex-row gap-3 justify-center mt-6" onSubmit={e => { e.preventDefault(); alert("Thank you! We'll contact you soon."); }}>
            <input type="email" placeholder="Your Email Address" className="px-4 py-2 rounded-full text-gray-800 w-64" required />
            <button type="submit" className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold">GET STARTED</button>
          </form>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop} className="fixed bottom-4 right-4 bg-[#D18F5C] text-white p-3 rounded-full shadow-lg z-40 hover:bg-[#B8714A] transition-all">↑</motion.button>}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && <DemoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleWhatsAppSubmit} />}
      </AnimatePresence>

      <style jsx global>{`html, body { overscroll-behavior: none; }`}</style>
    </div>
  );
}
