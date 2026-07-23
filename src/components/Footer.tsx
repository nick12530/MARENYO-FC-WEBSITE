import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, ArrowUp, Lock, Users, Shield } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenRosterTab: () => void;
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenRosterTab, isDarkMode = true }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className={`border-t transition-colors duration-500 py-16 relative ${
        isDarkMode
          ? 'bg-[#0a0a0a] border-white/10 text-gray-400'
          : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-500/20">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black border border-[#FF6321] overflow-hidden flex items-center justify-center p-0.5 shadow-md shadow-[#FF6321]/30 flex-shrink-0">
                <img src={CLUB_INFO.logoUrl} alt="Marenyo FC Crest" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="font-black italic text-2xl tracking-tighter text-white uppercase">
                MARENYO <span className="text-[#FF6321]">FC</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-md">
              Nestled in the heart of Sagam, Gem, Marenyo Football Club is a symbol of Unity, Pride, and Hope for over 40,000 active fans across Kenya and the diaspora.
            </p>
            <div className="text-xs text-[#FF6321] font-bold uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#FF6321]" />
              Sagam • Gem • Siaya County, Kenya
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black italic text-white uppercase tracking-widest mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase italic text-gray-300">
              <li><a href="#home" className="hover:text-[#FF6321] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#FF6321] transition-colors">About Us</a></li>
              <li><a href="#profiles" className="hover:text-[#FF6321] transition-colors">Players & Staff</a></li>
              <li><a href="#fixtures" className="hover:text-[#FF6321] transition-colors">Fixtures & Results</a></li>
              <li><a href="#gallery" className="hover:text-[#FF6321] transition-colors">Media Gallery</a></li>
              <li><a href="#fanclub" className="hover:text-[#FF6321] transition-colors">Fan Club</a></li>
              <li className="pt-2 border-t border-gray-500/20">
                <button
                  id="footer-admin-link"
                  onClick={onOpenAdmin}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left uppercase italic font-bold cursor-pointer text-[#FF6321]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Portal Management</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Official Squad Roster Access */}
          <div>
            <h4 className="text-xs font-black italic text-white uppercase tracking-widest mb-4">Club Portal & Roster</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Explore Marenyo FC full squad roster, stats, and player attributes.
            </p>
            
            <button
              id="footer-open-roster-btn"
              onClick={onOpenRosterTab}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#FF6321] hover:bg-white text-black font-black italic text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#FF6321]/20"
            >
              <Users className="w-4 h-4 text-black" />
              <span>Full Squad Roster View</span>
            </button>
          </div>
        </div>

        {/* Connect & Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold uppercase">
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 border border-white/10 text-gray-300 hover:text-black hover:bg-[#FF6321] transition-colors rounded-full" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 border border-white/10 text-gray-300 hover:text-black hover:bg-[#FF6321] transition-colors rounded-full" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 border border-white/10 text-gray-300 hover:text-black hover:bg-[#FF6321] transition-colors rounded-full" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 border border-white/10 text-gray-300 hover:text-black hover:bg-[#FF6321] transition-colors rounded-full" aria-label="YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <span className="text-gray-400 text-[11px] ml-2">© {new Date().getFullYear()} MARENYO FC. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="p-2.5 bg-white/10 text-gray-200 hover:text-black hover:bg-[#FF6321] transition-all border border-white/15 rounded-full cursor-pointer flex items-center gap-1.5 text-xs font-black italic uppercase"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
