import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Play, Volume2, Shield, Lock, UserPlus, LogIn } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FanTier, User } from '../types';
import { DigitalMembershipCard } from './DigitalMembershipCard';

interface FanClubSectionProps {
  isDarkMode?: boolean;
  currentUser?: User | null;
  onOpenAuthModal?: () => void;
}

export const FanClubSection: React.FC<FanClubSectionProps> = ({
  isDarkMode = true,
  currentUser,
  onOpenAuthModal,
}) => {
  const [memberName, setMemberName] = useState('');
  const [memberTier, setMemberTier] = useState<FanTier>('Supporter');
  const [village, setVillage] = useState('Sagam, Gem');
  const [joined, setJoined] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [authRequiredNotice, setAuthRequiredNotice] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!memberName) setMemberName(currentUser.name);
      if (currentUser.village && village === 'Sagam, Gem') setVillage(currentUser.village);
      setAuthRequiredNotice(false);
    }
  }, [currentUser]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Check optional sign up requirement
    if (!currentUser) {
      setAuthRequiredNotice(true);
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }

    if (!memberName.trim()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = currentUser.memberId || `MFC-2026-${randomNum}`;
    setMemberId(newId);
    setJoined(true);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6321', '#F59E0B', '#111827'],
    });
  };

  const toggleAnthem = () => {
    setIsPlayingAnthem(!isPlayingAnthem);
  };

  return (
    <section
      id="fanclub"
      className={`py-20 relative overflow-hidden transition-colors duration-300 border-t ${
        isDarkMode
          ? 'bg-[#0a0a0a] text-white border-white/5'
          : 'bg-slate-100 text-slate-900 border-slate-200'
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
          <h3 className="text-[#FF6321] font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2 font-montserrat">
            <span className="w-4 h-[1px] bg-[#FF6321]"></span> The Marenyo Family
          </h3>
          <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter font-cinzel">
            MARENYO <span className="text-[#FF6321]">FAN CLUB</span>
          </h2>
          <p className={`mt-2 text-xs sm:text-sm max-w-2xl ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Join thousands of supporters in Sagam, Gem, and across the globe. Sign up to issue and download your official digital membership pass!
          </p>
        </motion.div>

        {/* Interactive Fan Membership Pass Generator Form */}
        <div
          id="fan-registration-form"
          className={`border rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-xl ${
            isDarkMode ? 'bg-[#111111]/80 border-white/10' : 'bg-white/80 border-slate-200/80'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Form Column */}
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[#FF6321] font-bold text-xs uppercase tracking-widest mb-3 ${
                  isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" /> Digital Fan Pass Generator
              </div>
              <h3 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tight mb-3">
                Claim Your <span className="text-[#FF6321]">Official Fan Pass</span>
              </h3>
              <p className={`text-xs sm:text-sm mb-6 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Be recognized as an official Marenyo FC member. Account registration unlocks pass generation and high-res PNG downloading.
              </p>

              {/* Login Status Banner */}
              {!currentUser && (
                <div className={`p-4 rounded-2xl border mb-6 flex items-center justify-between gap-4 ${
                  isDarkMode ? 'bg-[#0a0a0a] border-amber-500/30' : 'bg-amber-50 border-amber-300 text-slate-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase italic">Sign Up or Log In Required</h4>
                      <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                        Only registered members can generate and save official player passes.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAuthModal}
                    className="px-4 py-2 rounded-full bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer whitespace-nowrap shadow-md"
                  >
                    Sign In / Register
                  </button>
                </div>
              )}

              {currentUser && (
                <div className={`p-3.5 rounded-2xl border mb-6 flex items-center justify-between gap-3 ${
                  isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold italic">Logged in as {currentUser.name} ({currentUser.email})</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold text-[#FF6321]">{currentUser.memberId}</span>
                </div>
              )}

              {!joined ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-slate-500'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Joseph Odhiambo"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      className={`w-full border rounded-full px-5 py-3 text-xs focus:outline-none focus:border-[#FF6321] transition-colors ${
                        isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white placeholder-gray-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-500'
                      }`}>
                        Category Role
                      </label>
                      <select
                        value={memberTier}
                        onChange={(e) => setMemberTier(e.target.value as FanTier)}
                        className={`w-full border rounded-full px-5 py-3 text-xs focus:outline-none focus:border-[#FF6321] transition-colors ${
                          isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="Supporter">Supporter / Fan</option>
                        <option value="Former Player">Former Player / Legend</option>
                        <option value="Current Star">Current Star Player</option>
                        <option value="Future Talent">Future Talent / Youth</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-500'
                      }`}>
                        Village / Location
                      </label>
                      <input
                        type="text"
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        placeholder="e.g. Marenyo, Sagam"
                        className={`w-full border rounded-full px-5 py-3 text-xs focus:outline-none focus:border-[#FF6321] transition-colors ${
                          isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#FF6321]/20 flex items-center justify-center gap-2"
                  >
                    {!currentUser ? (
                      <>
                        <Lock className="w-4 h-4 text-black" />
                        <span>Sign Up / Log In To Generate Official Pass</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-black" />
                        <span>Generate Official Fan Pass ⚽</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                  isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-[#FF6321]/20 text-[#FF6321] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black italic uppercase">Welcome to the Family!</h4>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                      Your official Marenyo FC Fan Pass has been issued! Use the button on the right to download your card.
                    </p>
                  </div>
                  <button
                    onClick={() => setJoined(false)}
                    className="px-5 py-2.5 rounded-full bg-[#FF6321] text-xs font-black text-black uppercase italic cursor-pointer hover:bg-white transition-colors"
                  >
                    Update / Re-issue Pass Details
                  </button>
                </div>
              )}
            </div>

            {/* Live Preview Card Column with PNG Downloader */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Official Digital Pass Card Preview
              </span>

              <DigitalMembershipCard
                name={memberName || (currentUser ? currentUser.name : 'Your Name')}
                tier={memberTier}
                memberId={memberId || (currentUser ? currentUser.memberId || 'MFC-2026-8942' : 'MFC-2026-8942')}
                village={village || 'Sagam, Gem'}
                joinedDate="July 2026"
              />
            </div>
          </div>
        </div>

        {/* Fan Chant & Anthem Audio Player Card */}
        <div className={`mt-12 border p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl ${
          isDarkMode ? 'bg-[#111111]/80 border-white/10' : 'bg-white/80 border-slate-200/80 shadow-md'
        }`}>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAnthem}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isPlayingAnthem
                  ? 'bg-[#FF6321] text-black shadow-lg shadow-[#FF6321]/30 scale-105'
                  : isDarkMode
                  ? 'bg-[#0a0a0a] text-[#FF6321] border border-white/10'
                  : 'bg-slate-100 text-[#FF6321] border border-slate-300'
              }`}
              aria-label="Play Fan Anthem"
            >
              {isPlayingAnthem ? <Volume2 className="w-6 h-6 animate-pulse" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF6321] block">
                The Sound of Sagam • Official Anthem
              </span>
              <h4 className="text-lg font-black italic uppercase">"The Pride of Marenyo" Chant</h4>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                {isPlayingAnthem ? '🎶 Playing: Drums of Sagam & Supporters Chorus...' : 'Click play to hear the chant.'}
              </p>
            </div>
          </div>

          <div className={`px-5 py-3 rounded-full border text-xs font-mono text-[#FF6321] italic max-w-md text-center ${
            isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            "Sagam biro! Marenyo biro! Pride of Gem, Champions of the heart! ⚽"
          </div>
        </div>
      </div>
    </section>
  );
};
