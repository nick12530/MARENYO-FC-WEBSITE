import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, CheckCircle2, Clock } from 'lucide-react';
import { FIXTURES } from '../data/clubData';

interface FixturesSectionProps {
  isDarkMode?: boolean;
}

export const FixturesSection: React.FC<FixturesSectionProps> = ({ isDarkMode = true }) => {
  return (
    <section
      id="fixtures"
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
            <span className="w-4 h-[1px] bg-[#FF6321]"></span> Official Match Schedule
          </h3>
          <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter font-cinzel">
            MATCHES & <span className="text-[#FF6321]">FIXTURES</span>
          </h2>
          <p className={`mt-2 text-xs sm:text-sm max-w-2xl ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Track upcoming derby clashes and recent league results for Marenyo FC at Sagam Stadium and across Siaya County.
          </p>
        </motion.div>

        {/* Fixtures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FIXTURES.map((match) => {
            const isCompleted = match.status === 'completed';
            return (
              <div
                key={match.id}
                className={`border rounded-3xl p-6 backdrop-blur-xl transition-all ${
                  isDarkMode
                    ? 'bg-[#111111]/80 border-white/10 hover:border-[#FF6321]/50'
                    : 'bg-white/80 border-slate-200/80 hover:border-[#FF6321] shadow-md'
                }`}
              >
                {/* Header status bar */}
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-4 pb-3 border-b border-gray-500/15">
                  <span className="text-[#FF6321] flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-[#FF6321]" />
                    {match.competition}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-black italic ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-[#FF6321]/10 text-[#FF6321] border border-[#FF6321]/20'
                  }`}>
                    {match.status}
                  </span>
                </div>

                {/* Score / Teams Row */}
                <div className="flex items-center justify-between font-black italic text-lg sm:text-xl my-4">
                  <span className={match.homeTeam.includes('MARENYO') ? 'text-[#FF6321]' : ''}>
                    {match.homeTeam}
                  </span>

                  {isCompleted ? (
                    <span className="px-4 py-1.5 rounded-full bg-[#FF6321] text-black font-black italic text-lg shadow-md">
                      {match.homeScore} - {match.awayScore}
                    </span>
                  ) : (
                    <span className={`px-3 py-1 rounded-full border text-xs font-mono italic ${
                      isDarkMode ? 'bg-black/40 border-white/10 text-gray-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      VS
                    </span>
                  )}

                  <span className={match.awayTeam.includes('MARENYO') ? 'text-[#FF6321]' : ''}>
                    {match.awayTeam}
                  </span>
                </div>

                {/* Match details */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 pt-2 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6321]" />
                    <span>{match.date} • {match.time}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                    <span>{match.venue}</span>
                  </div>
                </div>

                {/* Scorers info */}
                {match.scorers && match.scorers.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-500/15 text-xs">
                    <span className="text-[#FF6321] uppercase font-black text-[10px] tracking-wider block mb-1">
                      Goal Scorers:
                    </span>
                    <p className={`italic ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                      {match.scorers.join(', ')}
                    </p>
                  </div>
                )}

                {/* Match report */}
                {match.matchReport && (
                  <p className={`text-xs mt-3 leading-relaxed p-3 rounded-xl border ${
                    isDarkMode ? 'bg-black/40 border-white/5 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    {match.matchReport}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
