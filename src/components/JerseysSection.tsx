import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shirt,
  RotateCw,
  Sparkles,
  RefreshCw,
  Palette,
  Shield,
  Layers,
  ChevronRight,
  Flame,
  Pause,
  Play,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { KitItem } from '../types';
import { DEFAULT_KITS } from '../data/clubData';

interface JerseysSectionProps {
  kits?: KitItem[];
  isDarkMode?: boolean;
  language?: Language;
}

export const JerseysSection: React.FC<JerseysSectionProps> = ({
  kits = DEFAULT_KITS,
  isDarkMode = true,
  language = 'EN',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  const [selectedKitId, setSelectedKitId] = useState<string>(kits[0]?.id || 'home-kit');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('MARENYO');
  const [customNumber, setCustomNumber] = useState<number>(10);
  const [numberColor, setNumberColor] = useState<string>('#FFFFFF');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  const fallbackKit: KitItem = {
    id: 'default-kit',
    name: 'Marenyo FC Kit',
    type: 'Match Kit',
    primaryColor: '#FF6600',
    secondaryColor: '#111827',
    badgeBg: '#FF6600',
    accentHex: '#FF6321',
    bgGradient: 'from-orange-950/40 via-amber-950/20 to-[#0a0a0a]',
    description: 'Official Marenyo FC Match Kit.',
    defaultName: 'MARENYO',
    defaultNumber: 10,
    customFrontImage: null,
    customBackImage: null,
  };

  const activeKitIndex = kits.findIndex((k) => k.id === selectedKitId);
  const activeKit = kits.length > 0 ? (kits[activeKitIndex >= 0 ? activeKitIndex : 0] || kits[0]) : fallbackKit;

  // Auto Rotation effect
  useEffect(() => {
    if (!isAutoRotating || kits.length <= 1) return;

    const timer = setInterval(() => {
      setSelectedKitId((currentId) => {
        const currentIndex = kits.findIndex((k) => k.id === currentId);
        const nextIndex = (currentIndex + 1) % kits.length;
        return kits[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoRotating, kits]);

  const handleNextKit = () => {
    const nextIdx = (activeKitIndex + 1) % kits.length;
    setSelectedKitId(kits[nextIdx].id);
  };

  const handlePrevKit = () => {
    const prevIdx = (activeKitIndex - 1 + kits.length) % kits.length;
    setSelectedKitId(kits[prevIdx].id);
  };

  return (
    <section
      id="kits"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white'
          : 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 text-slate-900'
      }`}
    >
      {/* Background Subtle Glows */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: activeKit.primaryColor }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: activeKit.accentHex }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6321]/15 border border-[#FF6321]/30 text-[#FF6321] text-xs font-black uppercase tracking-widest mb-4 shadow-sm"
          >
            <Shirt className="w-4 h-4 animate-bounce" />
            <span>{t.clubJerseys || 'OFFICIAL CLUB JERSEYS'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight font-cinzel mb-4"
          >
            SAGAM <span className="text-[#FF6321]">ARMOR & KITS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-gray-400' : 'text-slate-600'
            }`}
          >
            Explore Marenyo FC&apos;s official match kits uploaded directly by the Secretariat.
            Watch the rotating kit roster and interactive 3D jersey display.
          </motion.p>
        </div>

        {/* Main Content Layout: Rotating Display Column (Left) + 3D Interactive Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT COLUMN: ROTATING JERSEY DISPLAY COLUMN */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6321] font-montserrat flex items-center gap-2">
                <Layers className="w-4 h-4" /> Rotating Kit Roster
              </h3>

              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  isAutoRotating
                    ? 'bg-[#FF6321] text-black border-[#FF6321]'
                    : isDarkMode
                    ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                {isAutoRotating ? (
                  <>
                    <Pause className="w-3 h-3" /> Auto Rotating
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" /> Paused
                  </>
                )}
              </button>
            </div>

            {/* ROTATING DISPLAY COLUMN CARDS */}
            <div className="space-y-3">
              {kits.length === 0 ? (
                <div className={`p-6 rounded-2xl border text-center ${
                  isDarkMode ? 'bg-[#111111]/80 border-white/5 text-gray-400' : 'bg-white/80 border-slate-200 text-slate-600'
                }`}>
                  <Shirt className="w-8 h-8 text-[#FF6321] mx-auto mb-2 opacity-60" />
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FF6321]">Default Club Armor Active</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Upload custom kit designs and photos in the Admin Portal to populate this roster.
                  </p>
                </div>
              ) : (
                kits.map((kit, idx) => {
                  const isActive = kit.id === selectedKitId;
                  return (
                    <motion.button
                      key={kit.id}
                      onClick={() => {
                        setSelectedKitId(kit.id);
                        setIsFlipped(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group flex items-center justify-between gap-4 ${
                        isActive
                          ? isDarkMode
                            ? 'bg-[#181818] border-[#FF6321] shadow-xl shadow-[#FF6321]/10'
                            : 'bg-white border-[#FF6321] shadow-lg shadow-[#FF6321]/10'
                          : isDarkMode
                          ? 'bg-[#111111]/80 border-white/5 hover:border-white/20'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Active Accent Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeBar"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF6321]"
                        />
                      )}

                      <div className="flex items-center gap-3">
                        {/* Thumbnail photo or color badge */}
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex-shrink-0 relative flex items-center justify-center">
                          {kit.customFrontImage ? (
                            <img
                              src={kit.customFrontImage}
                              alt={kit.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{ backgroundColor: kit.primaryColor }}
                            >
                              <Shirt className="w-6 h-6 text-white drop-shadow" />
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6321]">
                            {kit.type}
                          </span>
                          <h4 className="text-sm font-black italic uppercase font-montserrat tracking-tight">
                            {kit.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            Default: #{kit.defaultNumber} {kit.defaultName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FF6321] text-black text-[9px] font-black uppercase italic animate-pulse">
                            Active
                          </span>
                        )}
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isActive ? 'text-[#FF6321] translate-x-1' : 'text-gray-500'
                          }`}
                        />
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Quick Admin Note */}
            <div
              className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
                isDarkMode ? 'bg-[#111111] border-white/10 text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <Info className="w-5 h-5 text-[#FF6321] flex-shrink-0" />
              <span>
                Jersey photo uploads and kit management are restricted to the{' '}
                <strong className="text-[#FF6321]">Admin Portal</strong>.
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D INTERACTIVE JERSEY SHOWCASE & PERSONALIZATION */}
          <div className="lg:col-span-8 flex flex-col items-center">
            {/* 3D Jersey Display Area */}
            <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[1/1] flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeKit.id}-${isFlipped ? 'back' : 'front'}`}
                  initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0, scale: 0.9 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, type: 'spring', damping: 20 }}
                  className="w-full h-full relative flex items-center justify-center p-4"
                >
                  {/* Jersey Card Container */}
                  <div
                    className={`relative w-full max-w-sm h-full max-h-[460px] rounded-3xl border p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden transition-all duration-500 ${
                      isDarkMode
                        ? 'bg-[#111111]/90 border-white/15 shadow-black'
                        : 'bg-white border-slate-200 shadow-slate-300'
                    }`}
                  >
                    {/* Top Watermark & Badge */}
                    <div className="w-full flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: activeKit.primaryColor }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6321]">
                          MARENYO FC • {activeKit.type}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider">
                        {isFlipped ? 'BACK VIEW' : 'FRONT VIEW'}
                      </span>
                    </div>

                    {/* JERSEY IMAGE / VECTOR SHOWCASE */}
                    <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden rounded-2xl bg-black/20 p-2 border border-white/5">
                      {/* Check if custom front/back image was uploaded in Admin */}
                      {!isFlipped && activeKit.customFrontImage ? (
                        <img
                          src={activeKit.customFrontImage}
                          alt={`${activeKit.name} Front`}
                          className="w-full h-full object-contain max-h-[320px] rounded-xl shadow-lg animate-in fade-in"
                        />
                      ) : isFlipped && activeKit.customBackImage ? (
                        <img
                          src={activeKit.customBackImage}
                          alt={`${activeKit.name} Back`}
                          className="w-full h-full object-contain max-h-[320px] rounded-xl shadow-lg animate-in fade-in"
                        />
                      ) : (
                        /* HIGH-FIDELITY VECTOR JERSEY RENDERING */
                        <div className="relative w-64 h-80 flex flex-col items-center justify-center">
                          <svg
                            viewBox="0 0 200 240"
                            className="w-full h-full drop-shadow-2xl"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <linearGradient
                                id={`jerseyGrad-${activeKit.id}`}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor={activeKit.primaryColor} />
                                <stop offset="100%" stopColor={activeKit.secondaryColor || '#111'} />
                              </linearGradient>
                            </defs>

                            {/* Jersey Body Path */}
                            <path
                              d="M60 20 L40 50 L10 40 L25 110 L50 100 L50 220 L150 220 L150 100 L175 110 L190 40 L160 50 L140 20 C120 35 80 35 60 20 Z"
                              fill={`url(#jerseyGrad-${activeKit.id})`}
                              stroke="rgba(255,255,255,0.2)"
                              strokeWidth="2"
                            />

                            {/* Collar Accent */}
                            <path
                              d="M60 20 C80 35 120 35 140 20 L130 35 C110 45 90 45 70 35 Z"
                              fill={activeKit.accentHex}
                            />

                            {/* Sleeve Trims */}
                            <path d="M10 40 L25 110 L35 105 L22 43 Z" fill={activeKit.accentHex} />
                            <path d="M190 40 L175 110 L165 105 L178 43 Z" fill={activeKit.accentHex} />

                            {/* Front Design vs Back Printing */}
                            {!isFlipped ? (
                              <>
                                {/* Club Crest Emblem */}
                                <circle cx="125" cy="70" r="12" fill="#FF6321" />
                                <text
                                  x="125"
                                  y="74"
                                  fill="#000"
                                  fontSize="9"
                                  fontWeight="900"
                                  textAnchor="middle"
                                >
                                  MFC
                                </text>

                                {/* Sponsor Logo */}
                                <text
                                  x="100"
                                  y="130"
                                  fill="#FFFFFF"
                                  fontSize="14"
                                  fontWeight="900"
                                  letterSpacing="2"
                                  textAnchor="middle"
                                >
                                  SAGAM GEM
                                </text>
                                <text
                                  x="100"
                                  y="145"
                                  fill="#FF6321"
                                  fontSize="8"
                                  fontWeight="800"
                                  letterSpacing="3"
                                  textAnchor="middle"
                                >
                                  SIAYA COUNTY
                                </text>
                              </>
                            ) : (
                              /* Back Custom Name & Number Printing */
                              <>
                                <text
                                  x="100"
                                  y="85"
                                  fill={numberColor}
                                  fontSize="16"
                                  fontWeight="900"
                                  letterSpacing="2"
                                  textAnchor="middle"
                                  className="uppercase font-montserrat"
                                >
                                  {customName || activeKit.defaultName}
                                </text>
                                <text
                                  x="100"
                                  y="160"
                                  fill={numberColor}
                                  fontSize="60"
                                  fontWeight="900"
                                  textAnchor="middle"
                                  className="font-montserrat"
                                >
                                  {customNumber}
                                </text>
                              </>
                            )}
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Bottom Flip Button & Details */}
                    <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-white/10">
                      <div>
                        <h4 className="text-base font-black italic uppercase font-montserrat">
                          {activeKit.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 max-w-[200px] line-clamp-1">
                          {activeKit.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="px-4 py-2 rounded-full bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Jersey</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Streamlined Kit Details Info */}
            <div
              className={`w-full max-w-lg p-5 rounded-3xl border flex items-center justify-between shadow-lg ${
                isDarkMode ? 'bg-[#111111]/80 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: activeKit.primaryColor }}
                />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider font-montserrat">
                    {activeKit.name}
                  </h4>
                  <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    {activeKit.description}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FF6321]/15 text-[#FF6321] text-[10px] font-black uppercase italic">
                Official Armor
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
