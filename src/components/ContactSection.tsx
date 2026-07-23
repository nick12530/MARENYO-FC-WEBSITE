import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield } from 'lucide-react';

interface ContactSectionProps {
  isDarkMode?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDarkMode = true }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className={`py-20 relative overflow-hidden transition-colors duration-300 border-t ${
        isDarkMode
          ? 'bg-[#0a0a0a] text-white border-white/5'
          : 'bg-slate-50 text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-[#FF6321] font-black uppercase text-xs tracking-widest mb-2 flex items-center gap-2 font-montserrat">
            <span className="w-6 h-[2px] bg-[#FF6321]"></span> Get In Touch With Secretariat
          </h3>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-cinzel tracking-tight uppercase leading-none drop-shadow-lg">
            CONTACT <span className="text-[#FF6321] italic normal-case font-extrabold font-montserrat">MARENYO FC</span>
          </h2>
          <p className={`mt-3 text-sm max-w-2xl font-medium leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
            Have questions, partnership proposals, or fan inquiries? Reach out to our official club secretariat in Sagam, Gem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Details & Location Card */}
          <div className="space-y-4">
            <div
              className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-6 ${
                isDarkMode ? 'bg-[#111111]/80 border-white/10' : 'bg-white/80 border-slate-200/80 shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-[#FF6321] flex-shrink-0 ${
                    isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black italic uppercase">Home Ground & Clubhouse</h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    Sagam Stadium Grounds, Sagam Sub-location<br />
                    Gem Constituency, Siaya County, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-gray-500/15">
                <div
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-[#FF6321] flex-shrink-0 ${
                    isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black italic uppercase">Official Email Addresses</h3>
                  <p className="text-xs text-[#FF6321] font-mono mt-1">info@marenyofc.com</p>
                  <p className="text-xs text-[#FF6321] font-mono">fanclub@marenyofc.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-gray-500/15">
                <div
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-[#FF6321] flex-shrink-0 ${
                    isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black italic uppercase">Phone & WhatsApp Hotline</h3>
                  <p className={`text-xs font-mono mt-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                    +254 712 345 678 / +254 798 765 432
                  </p>
                  <p className={`text-[10px] uppercase mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>
                    Available Mon - Sat, 8:00 AM - 6:00 PM EAT
                  </p>
                </div>
              </div>
            </div>

            {/* Sagam Ground Map Visual Placeholder */}
            <div
              className={`p-5 rounded-3xl border text-center space-y-2 backdrop-blur-xl ${
                isDarkMode ? 'bg-[#111111]/80 border-white/10' : 'bg-white/80 border-slate-200/80 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-[#FF6321] uppercase tracking-widest">
                <Shield className="w-4 h-4" /> Sagam Community Hub
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Visitors and away team supporters are always welcome to Sagam Stadium.
              </p>
            </div>
          </div>

          {/* Interactive Form */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl ${
              isDarkMode ? 'bg-[#111111]/80 border-white/10' : 'bg-white/80 border-slate-200/80 shadow-md'
            }`}
          >
            <h3 className="text-2xl font-black italic uppercase mb-6">
              Send Us A <span className="text-[#FF6321]">Message</span>
            </h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-[#FF6321] transition-colors ${
                      isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white placeholder-gray-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-[#FF6321] transition-colors ${
                      isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white placeholder-gray-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-[#FF6321] transition-colors ${
                      isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Fan Club Membership">Fan Club Membership</option>
                    <option value="Sponsorship & Partnership">Sponsorship & Partnership</option>
                    <option value="Media & Press">Media & Press</option>
                    <option value="Youth Academy Trials">Youth Academy Trials</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-[#FF6321] transition-colors ${
                      isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white placeholder-gray-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#FF6321]/20"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FF6321]/20 text-[#FF6321] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black italic uppercase">Message Received!</h4>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  Thank you for reaching out to Marenyo FC. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-[#FF6321] text-xs font-black text-black uppercase italic cursor-pointer hover:bg-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
