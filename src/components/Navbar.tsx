import React, { useState, useEffect, useRef } from 'react';
import { Shield, Menu, X, Flame, Users, Calendar, Image, PhoneCall, Trophy, Sun, Moon, Lock, Globe, Shirt, ChevronDown, Check, User as UserIcon, LogOut } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { User } from '../types';
import { CLUB_INFO } from '../data/clubData';

interface NavbarProps {
  onOpenFanClubModal: () => void;
  onOpenAdminModal: () => void;
  onOpenRosterTab: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentUser?: User | null;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenFanClubModal,
  onOpenAdminModal,
  onOpenRosterTab,
  isDarkMode,
  onToggleTheme,
  language,
  onLanguageChange,
  currentUser,
  onOpenAuthModal,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const langRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'profiles', 'kits', 'fixtures', 'gallery', 'fanclub', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '#home', id: 'home', icon: Flame },
    { name: t.about, href: '#about', id: 'about', icon: Shield },
    { name: t.squad, href: '#profiles', id: 'profiles', icon: Users },
    { name: t.kits, href: '#kits', id: 'kits', icon: Shirt },
    { name: t.fixtures, href: '#fixtures', id: 'fixtures', icon: Calendar },
    { name: t.gallery, href: '#gallery', id: 'gallery', icon: Image },
    { name: t.fanclub, href: '#fanclub', id: 'fanclub', icon: Trophy },
    { name: t.contact, href: '#contact', id: 'contact', icon: PhoneCall },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl'
            : 'bg-white/90 backdrop-blur-2xl border-b border-slate-200 py-3 shadow-lg'
          : isDarkMode
          ? 'bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/10 py-4'
          : 'bg-white/70 backdrop-blur-xl border-b border-slate-200/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            id="nav-logo"
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF6321]/20 border border-[#FF6321] overflow-hidden flex items-center justify-center p-0.5 shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
              <img src={CLUB_INFO.logoUrl} alt="Marenyo FC Crest" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-black tracking-tighter uppercase italic group-hover:text-[#FF6321] transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                MARENYO <span className="text-[#FF6321]">FC</span>
              </span>
              <span className={`text-[9px] font-bold tracking-widest uppercase -mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                SAGAM • GEM • KENYA
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-5 text-[11px] uppercase tracking-widest font-bold">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`transition-all duration-200 py-1 border-b-2 ${
                    isActive
                      ? 'text-[#FF6321] border-[#FF6321]'
                      : isDarkMode
                      ? 'text-gray-300 border-transparent hover:text-[#FF6321]'
                      : 'text-slate-700 border-transparent hover:text-[#FF6321]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* CTA, Language & Theme Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Dropdown Icon */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-black uppercase italic transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#111111] text-gray-200 border-white/10 hover:border-[#FF6321]'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-[#FF6321] shadow-sm'
                }`}
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#FF6321]" />
                <span className="hidden sm:inline-block">{language === 'LUO' ? 'Dholuo' : language === 'SW' ? 'Swahili' : 'English'}</span>
                <span className="sm:hidden">{language}</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-40 rounded-2xl border p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
                    isDarkMode ? 'bg-[#111111] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="px-2 py-1 text-[9px] font-black uppercase tracking-wider text-gray-400 border-b border-white/10 mb-1">
                    Select Language
                  </div>
                  {[
                    { code: 'EN', name: 'English', detail: 'Global Standard' },
                    { code: 'LUO', name: 'Dholuo', detail: 'Sagam & Gem' },
                    { code: 'SW', name: 'Kiswahili', detail: 'National Language' },
                  ].map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        onLanguageChange(item.code as Language);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                        language === item.code
                          ? 'bg-[#FF6321] text-black'
                          : isDarkMode
                          ? 'hover:bg-white/10 text-gray-200'
                          : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-black italic uppercase leading-none">{item.name}</div>
                        <div className={`text-[9px] ${language === item.code ? 'text-black/80' : 'text-gray-400'}`}>
                          {item.detail}
                        </div>
                      </div>
                      {language === item.code && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Account / Sign In Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenAuthModal}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-black uppercase italic transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-[#111111] text-[#FF6321] border-[#FF6321]/40 hover:bg-[#FF6321] hover:text-black'
                      : 'bg-orange-50 text-[#FF6321] border-[#FF6321] hover:bg-[#FF6321] hover:text-white'
                  }`}
                  title="View Account Details"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline-block truncate max-w-[90px]">{currentUser.name.split(' ')[0]}</span>
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className={`p-2 rounded-full border text-gray-400 hover:text-red-400 transition-colors ${
                      isDarkMode ? 'bg-[#111111] border-white/10' : 'bg-slate-100 border-slate-300'
                    }`}
                    title="Log Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <button
                id="header-sign-in-btn"
                type="button"
                onClick={onOpenAuthModal}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-black uppercase italic transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#111111] text-gray-200 border-white/10 hover:border-[#FF6321] hover:text-[#FF6321]'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-[#FF6321] hover:text-[#FF6321] shadow-sm'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5 text-[#FF6321]" />
                <span className="hidden sm:inline-block">Sign In / Join</span>
              </button>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#111111] border-white/10 text-yellow-400 hover:bg-white/10'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark and Light Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full border ${
                isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF6321]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className={`lg:hidden border-b px-6 pt-3 pb-6 shadow-2xl backdrop-blur-2xl ${
            isDarkMode ? 'bg-[#0a0a0a]/95 border-white/10' : 'bg-white/95 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between py-2 border-b border-white/10 mb-3">
            <span className="text-[10px] font-bold uppercase text-gray-400">Select Language:</span>
            <div className="flex items-center gap-1.5">
              {(['EN', 'LUO', 'SW'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic ${
                    language === lang ? 'bg-[#FF6321] text-black' : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {/* Mobile Auth Button */}
            {currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-2xl border bg-[#FF6321]/10 border-[#FF6321]/30 mb-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[#FF6321]" />
                  <span className="text-xs font-black italic uppercase text-white truncate max-w-[150px]">
                    {currentUser.name}
                  </span>
                </div>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold"
                  >
                    Log Out
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  if (onOpenAuthModal) onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-full bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg mb-2 cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-black" />
                <span>Sign In / Join Fan Club</span>
              </button>
            )}

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-xs font-black uppercase tracking-widest italic transition-all ${
                    isActive
                      ? 'text-[#FF6321] bg-[#FF6321]/10 border border-[#FF6321]/40'
                      : isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF6321]' : 'text-gray-400'}`} />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

