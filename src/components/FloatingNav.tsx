import React, { useState, useEffect } from 'react';
import { Home, Info, Users, Calendar, Image, Heart, Mail, ShieldAlert, Sun, Moon } from 'lucide-react';

interface FloatingNavProps {
  onOpenAdmin: () => void;
  onOpenRosterTab: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  onOpenAdmin,
  onOpenRosterTab,
  isDarkMode,
  onToggleTheme,
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY + 20 && currentScrollY > 200) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      const sections = ['home', 'about', 'profiles', 'fixtures', 'gallery', 'fanclub', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'about', label: 'About', icon: Info, href: '#about' },
    { id: 'profiles', label: 'Roster', icon: Users, href: '#profiles' },
    { id: 'fixtures', label: 'Matches', icon: Calendar, href: '#fixtures' },
    { id: 'gallery', label: 'Gallery', icon: Image, href: '#gallery' },
    { id: 'fanclub', label: 'Fan Club', icon: Heart, href: '#fanclub' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full backdrop-blur-2xl border shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-[#111111]/85 border-white/10 shadow-black/80'
            : 'bg-white/85 border-slate-200/90 shadow-xl text-slate-800'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#FF6321] text-black shadow-md scale-105'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline italic uppercase tracking-wider text-[11px]">
                {item.label}
              </span>
            </a>
          );
        })}

        <div className="w-[1px] h-5 bg-gray-500/20 mx-1" />

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-full border transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-white/5 text-yellow-400 border-white/10 hover:bg-white/10'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
