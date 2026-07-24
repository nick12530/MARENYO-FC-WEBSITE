import React from 'react';
import { Users, Calendar, ArrowDown, Shield, Shirt } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';
import { AnimatedCounter } from './AnimatedCounter';
import { Language, TRANSLATIONS } from '../data/translations';
import heroImg from '../assets/heroimage.jpeg';

interface HeroProps {
  onExploreSquad: () => void;
  isDarkMode?: boolean;
  language?: Language;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreSquad,
  isDarkMode = true,
  language = 'EN',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className={`relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? 'bg-[#0a0a0a] text-white'
          : 'bg-gradient-to-br from-slate-50 via-white to-amber-50/30 text-slate-900'
      }`}
    >
      {/* Background Image with Vignette & Glass overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Marenyo FC Team & Fans"
          className={`w-full h-full object-cover object-center filter contrast-125 scale-105 ${
            isDarkMode ? 'opacity-35' : 'opacity-15 mix-blend-multiply'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Gradients */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isDarkMode
              ? 'from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent'
              : 'from-slate-50 via-slate-50/90 to-transparent'
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isDarkMode
              ? 'from-[#0a0a0a] via-transparent to-[#0a0a0a]/70'
              : 'from-slate-50 via-transparent to-slate-50/70'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Tagline / Local Greeting */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md mb-4 shadow-lg ${
            isDarkMode
              ? 'bg-white/10 border-white/20 text-[#FF6321]'
              : 'bg-white border-slate-200 text-[#FF6321] shadow-slate-200/50'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6321] animate-pulse"></span>
            <span className="font-black italic uppercase tracking-widest text-xs">
              {t.welcome} — Sagam • Gem, Kenya
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.95] tracking-tight mb-6">
            <span className="font-gothic text-[#FF6321] text-6xl sm:text-8xl md:text-9xl block normal-case font-bold drop-shadow-[0_4px_25px_rgba(255,99,33,0.4)]">
              Marenyo Football Club
            </span>
          </h1>

          {/* Hero Subheadline */}
          <p className={`text-base sm:text-lg font-medium leading-relaxed max-w-2xl mb-8 border-l-2 border-[#FF6321] pl-4 ${
            isDarkMode ? 'text-gray-200' : 'text-slate-700 font-semibold'
          }`}>
            {t.heroSubtitle}
          </p>

          {/* Hero Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => scrollToSection('profiles')}
              className="bg-[#FF6321] text-black px-8 py-4 rounded-full font-black uppercase italic text-xs tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-xl shadow-[#FF6321]/30 hover:scale-105"
            >
              <Users className="w-4 h-4 text-black group-hover:text-white" />
              <span>{t.exploreSquad}</span>
            </button>

            <button
              onClick={() => scrollToSection('kits')}
              className={`px-8 py-4 rounded-full font-black uppercase italic text-xs tracking-wider backdrop-blur-md border transition-all cursor-pointer flex items-center gap-2 ${
                isDarkMode
                  ? 'bg-white/15 border-white/30 text-white hover:bg-[#FF6321] hover:text-black hover:border-[#FF6321]'
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-[#FF6321] hover:text-black hover:border-[#FF6321] shadow-md'
              }`}
            >
              <Shirt className="w-4 h-4 text-[#FF6321]" />
              <span>{t.officialKits}</span>
            </button>

            <button
              onClick={() => scrollToSection('fixtures')}
              className={`px-8 py-4 rounded-full font-black uppercase italic text-xs tracking-wider backdrop-blur-md border transition-all cursor-pointer flex items-center gap-2 ${
                isDarkMode
                  ? 'border-white/20 text-white hover:border-[#FF6321] hover:text-[#FF6321] hover:bg-white/10'
                  : 'border-slate-300 text-slate-700 hover:border-[#FF6321] hover:text-[#FF6321] hover:bg-slate-100 shadow-sm'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{t.fixtures}</span>
            </button>
          </div>

          {/* Animated Quick Stats Grid - Glassmorphism */}
          <div className={`mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-8 ${
            isDarkMode ? 'border-white/10' : 'border-slate-200'
          }`}>
            {CLUB_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all shadow-lg group ${
                  isDarkMode
                    ? 'bg-black/40 backdrop-blur-xl border-white/10 hover:border-[#FF6321]/50'
                    : 'bg-white/80 backdrop-blur-xl border-slate-200/80 hover:border-[#FF6321] shadow-slate-200/60'
                }`}
              >
                <div className={`text-2xl sm:text-3xl font-black italic flex items-center gap-1 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <AnimatedCounter value={stat.value} duration={2000} className="text-[#FF6321]" />
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center transition-colors cursor-pointer ${
          isDarkMode ? 'text-gray-400 hover:text-[#FF6321]' : 'text-slate-500 hover:text-[#FF6321]'
        }`}
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[9px] font-bold uppercase tracking-widest mb-1">Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#FF6321]" />
      </div>
    </section>
  );
};

