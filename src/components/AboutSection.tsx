import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Award, Star, Users, MapPin, Sparkles, Trophy } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface AboutSectionProps {
  onOpenFanClubModal?: () => void;
  isDarkMode?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDarkMode = true }) => {
  return (
    <section
      id="about"
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-[#FF6321] font-bold uppercase text-xs tracking-widest mb-3 flex items-center gap-2 font-montserrat">
            <span className="w-4 h-[1px] bg-[#FF6321]"></span> Heritage & Community Mission
          </h3>
          <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter font-cinzel">
            ABOUT <span className="text-[#FF6321]">MARENYO FC</span>
          </h2>
          <p className={`mt-2 text-sm sm:text-base max-w-2xl ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Founded on community pride, athletic talent, and the spirit of Sagam, Gem, Kenya.
          </p>
        </motion.div>

        {/* Story Banner Card - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`border rounded-3xl p-6 sm:p-10 mb-12 backdrop-blur-xl shadow-xl transition-all ${
            isDarkMode
              ? 'bg-[#111111]/80 border-white/10'
              : 'bg-white/80 border-slate-200/80'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-500/20 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black border border-[#FF6321]/50 overflow-hidden flex items-center justify-center p-0.5 shadow-lg shadow-[#FF6321]/20 flex-shrink-0">
                <img src={CLUB_INFO.logoUrl} alt="Marenyo FC Crest" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase tracking-tight font-montserrat">
                  Our History & Heritage
                </h3>
                <p className="text-xs text-[#FF6321] font-bold uppercase tracking-wider font-montserrat">
                  Sagam • Gem • Siaya County, Kenya
                </p>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[#FF6321] font-black italic text-xs uppercase tracking-wider backdrop-blur-md ${
                isDarkMode ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FF6321]" />
              Unity • Pride • Hope
            </div>
          </div>

          {/* Clean Narrative Text - NO Pasted Declaration Code/Raw Block */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
              Nestled in the heart of <strong className="text-[#FF6321] italic font-black">Sagam, Gem</strong>, Marenyo Football Club is more than just a football team—it is a beacon of community spirit and sporting excellence. For years, Marenyo FC has brought joy to local supporters, nurtured young talent, and provided a stage for rising grassroots stars to shine.
            </p>

            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>
              Legends have worn the orange and black jersey, unforgettable derby moments have been created, and local tournament history has been written time and time again. Yet, the greatest chapters of our story are still ahead as we build toward higher league divisions and greater youth academy opportunities.
            </p>

            {/* Readability Key Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDarkMode
                    ? 'bg-black/40 border-white/10 text-gray-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-[#FF6321]" />
                  <h4 className="text-xs font-black uppercase italic tracking-wider">Heart of Sagam, Gem</h4>
                </div>
                <p className="text-xs leading-relaxed">
                  Marenyo FC serves as an anchor for local community unity, hosting matches that bring families and fans together at Sagam Stadium.
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDarkMode
                    ? 'bg-black/40 border-white/10 text-gray-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-[#FF6321]" />
                  <h4 className="text-xs font-black uppercase italic tracking-wider">A Family for Everyone</h4>
                </div>
                <p className="text-xs leading-relaxed">
                  Connecting supporters, former players, current senior stars, and future academy talents under one banner.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Pillars of Marenyo FC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`border p-6 rounded-2xl transition-all group backdrop-blur-xl hover:border-[#FF6321]/60 ${
              isDarkMode
                ? 'bg-[#111111]/80 border-white/10'
                : 'bg-white/80 border-slate-200/80 shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF6321]/10 text-[#FF6321] flex items-center justify-center mb-3 group-hover:bg-[#FF6321] group-hover:text-black transition-colors">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black italic uppercase tracking-wider mb-1">UNITY</h3>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Bringing families, fans, and neighbors together across Sagam, Gem, and the global diaspora.
            </p>
          </div>

          <div
            className={`border p-6 rounded-2xl transition-all group backdrop-blur-xl hover:border-[#FF6321]/60 ${
              isDarkMode
                ? 'bg-[#111111]/80 border-white/10'
                : 'bg-white/80 border-slate-200/80 shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF6321]/10 text-[#FF6321] flex items-center justify-center mb-3 group-hover:bg-[#FF6321] group-hover:text-black transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black italic uppercase tracking-wider mb-1">PRIDE</h3>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Honoring the legends who wore the Marenyo jersey and created unforgettable football moments.
            </p>
          </div>

          <div
            className={`border p-6 rounded-2xl transition-all group backdrop-blur-xl hover:border-[#FF6321]/60 ${
              isDarkMode
                ? 'bg-[#111111]/80 border-white/10'
                : 'bg-white/80 border-slate-200/80 shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF6321]/10 text-[#FF6321] flex items-center justify-center mb-3 group-hover:bg-[#FF6321] group-hover:text-black transition-colors">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black italic uppercase tracking-wider mb-1">HOPE</h3>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Nurturing young talent and providing a stage for rising grassroots stars to shine bright.
            </p>
          </div>

          <div
            className={`border p-6 rounded-2xl transition-all group backdrop-blur-xl hover:border-[#FF6321]/60 ${
              isDarkMode
                ? 'bg-[#111111]/80 border-white/10'
                : 'bg-white/80 border-slate-200/80 shadow-md'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF6321]/10 text-[#FF6321] flex items-center justify-center mb-3 group-hover:bg-[#FF6321] group-hover:text-black transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black italic uppercase tracking-wider mb-1">FAMILY</h3>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              A home where supporters, legends, current stars, and future talents unite under one flag.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
