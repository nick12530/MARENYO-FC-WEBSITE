import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Shield, Award, ChevronRight, Users, Maximize2, X, Filter, Crown } from 'lucide-react';
import { Player } from '../types';
import { PlayerModal } from './PlayerModal';

interface PlayerProfileSectionProps {
  players: Player[];
  isDarkMode?: boolean;
  isOpenFullRosterModal?: boolean;
  onToggleFullRosterModal?: (open: boolean) => void;
}

export const PlayerProfileSection: React.FC<PlayerProfileSectionProps> = ({
  players,
  isDarkMode = true,
  isOpenFullRosterModal,
  onToggleFullRosterModal,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<string>('All');
  const [rosterCategory, setRosterCategory] = useState<'all' | 'current' | 'legends'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [internalFullRosterOpen, setInternalFullRosterOpen] = useState(false);

  const isRosterModalOpen = isOpenFullRosterModal ?? internalFullRosterOpen;
  const setRosterModalOpen = (open: boolean) => {
    if (onToggleFullRosterModal) {
      onToggleFullRosterModal(open);
    } else {
      setInternalFullRosterOpen(open);
    }
  };

  const positions = ['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Coaching Staff'];

  const filteredPlayers = players.filter((player) => {
    const matchesPosition = selectedPosition === 'All' || player.position === selectedPosition;
    const matchesCategory =
      rosterCategory === 'all' ||
      (rosterCategory === 'current' && !player.isLegend) ||
      (rosterCategory === 'legends' && player.isLegend);
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (player.nickname && player.nickname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      player.birthplace.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesCategory && matchesSearch;
  });

  // Limit preview to 4 top players on homepage to keep page uncluttered
  const previewPlayers = filteredPlayers.slice(0, 4);

  return (
    <section
      id="profiles"
      className={`py-16 relative overflow-hidden transition-colors duration-300 border-t ${
        isDarkMode
          ? 'bg-[#0a0a0a] text-white border-white/5'
          : 'bg-slate-50 text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header & Roster Launcher Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6321]/10 text-[#FF6321] text-xs font-bold uppercase tracking-widest mb-2 font-montserrat">
              <Users className="w-3.5 h-3.5" /> Official Team Directory
            </div>
            <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter font-cinzel">
              PLAYERS & <span className="text-[#FF6321]">STAFF ROSTER</span>
            </h2>
            <p className={`mt-1 text-xs sm:text-sm max-w-xl ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Browse squad positions or open the full interactive squad tab for searching & detailed profiles.
            </p>
          </div>

          {/* Prominent Roster Tab Modal Launcher Button */}
          <div className="flex items-center gap-3">
            <button
              id="open-full-roster-tab-btn"
              onClick={() => setRosterModalOpen(true)}
              className="bg-[#FF6321] text-black px-6 py-3.5 rounded-full font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer flex items-center gap-2.5 shadow-xl shadow-[#FF6321]/20 hover:scale-105"
            >
              <Maximize2 className="w-4 h-4 text-black" />
              <span>Open Full Squad Tab ({players.length})</span>
            </button>
          </div>
        </motion.div>

        {/* Roster Type & Position Tab Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-3 border-b border-gray-500/10">
          {/* Current Squad vs Legends Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRosterCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer ${
                rosterCategory === 'all'
                  ? 'bg-[#FF6321] text-black shadow-md'
                  : isDarkMode ? 'bg-[#111111] text-gray-400 border border-white/10 hover:text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              All Members
            </button>
            <button
              onClick={() => setRosterCategory('current')}
              className={`px-4 py-2 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                rosterCategory === 'current'
                  ? 'bg-[#FF6321] text-black shadow-md'
                  : isDarkMode ? 'bg-[#111111] text-gray-400 border border-white/10 hover:text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-[#FF6321]" /> Current Squad
            </button>
            <button
              onClick={() => setRosterCategory('legends')}
              className={`px-4 py-2 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                rosterCategory === 'legends'
                  ? 'bg-[#FF6321] text-black shadow-md'
                  : isDarkMode ? 'bg-[#111111] text-gray-400 border border-white/10 hover:text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Club Legends
            </button>
          </div>

          {/* Position Tab Filters (Clean 1-Line Bar) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {positions.map((pos) => (
              <button
                key={pos}
                id={`homepage-pos-tab-${pos}`}
                onClick={() => setSelectedPosition(pos)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-black italic uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedPosition === pos
                    ? 'bg-white text-black shadow-md'
                    : isDarkMode
                    ? 'bg-[#111111]/80 text-gray-400 border border-white/10 hover:text-white'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Uncrowded 4-Card Spotlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewPlayers.map((player) => (
            <div
              key={player.id}
              onClick={() => setActivePlayer(player)}
              className={`group border rounded-3xl p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-xl ${
                isDarkMode
                  ? 'bg-[#111111]/70 border-white/10 hover:border-[#FF6321]/60 hover:shadow-[0_10px_30px_rgba(255,99,33,0.15)]'
                  : 'bg-white/80 border-slate-200/80 hover:border-[#FF6321] hover:shadow-xl'
              }`}
            >
              <div>
                {/* Photo frame */}
                <div className="relative h-60 bg-black/20 rounded-2xl overflow-hidden mb-3">
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* Jersey number */}
                  {player.number > 0 && (
                    <div className="absolute top-3 left-3 text-2xl font-black italic text-white/50 font-mono">
                      #{player.number}
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                    {player.isCaptain && (
                      <span className="px-2.5 py-1 bg-[#FF6321] text-black font-black italic text-[9px] uppercase tracking-wider rounded-full flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3 fill-black" /> Captain
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Header */}
                <div className="flex items-center justify-between text-xs text-[#FF6321] font-bold uppercase tracking-wider">
                  <span>{player.position}</span>
                  <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    {player.birthplace}
                  </span>
                </div>

                <h3 className="text-lg font-black italic uppercase tracking-tight group-hover:text-[#FF6321] transition-colors mt-1">
                  {player.name}
                </h3>

                <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  {player.bio}
                </p>
              </div>

              {/* Stats & CTA */}
              <div className="mt-4 pt-3 border-t border-gray-500/15 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 font-bold">
                  <div>
                    <span className="text-[#FF6321] font-mono italic">{player.stats.goals}</span>{' '}
                    <span className={`text-[10px] uppercase ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                      Goals
                    </span>
                  </div>
                  <div>
                    <span className="font-mono italic">{player.stats.assists}</span>{' '}
                    <span className={`text-[10px] uppercase ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                      Assists
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF6321]/10 group-hover:bg-[#FF6321] group-hover:text-black text-[#FF6321] font-bold text-[10px] uppercase italic transition-all">
                  Profile <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner to open full Tab when there are more players */}
        {filteredPlayers.length > 4 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setRosterModalOpen(true)}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-full border text-xs font-black uppercase italic tracking-wider transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#111111]/80 text-white border-white/10 hover:border-[#FF6321] hover:text-[#FF6321]'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-[#FF6321] hover:text-[#FF6321] shadow-sm'
              }`}
            >
              <span>Explore All {filteredPlayers.length} {selectedPosition} Profiles</span>
              <ChevronRight className="w-4 h-4 text-[#FF6321]" />
            </button>
          </div>
        )}
      </div>

      {/* FULL SQUAD & STAFF ROSTER TAB MODAL OVERLAY */}
      {isRosterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto">
          <div
            className={`relative w-full max-w-6xl border rounded-3xl overflow-hidden shadow-2xl my-8 transition-all ${
              isDarkMode ? 'bg-[#111111]/95 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-6 border-b flex items-center justify-between gap-4 ${
                isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF6321] text-black font-black italic flex items-center justify-center text-lg">
                  M
                </div>
                <div>
                  <h3 className="text-xl font-black italic uppercase tracking-tight">
                    MARENYO FC <span className="text-[#FF6321]">FULL ROSTER TAB</span>
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    Search & view all player profiles, positions, and coaching staff.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setRosterModalOpen(false)}
                className="p-2.5 rounded-full bg-black/10 hover:bg-[#FF6321] hover:text-black transition-all cursor-pointer"
                aria-label="Close roster tab"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search Toolbar inside Tab Modal */}
            <div className="p-6 pb-2 border-b border-gray-500/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {positions.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setSelectedPosition(pos)}
                    className={`px-4 py-2 rounded-full text-xs font-black italic uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      selectedPosition === pos
                        ? 'bg-[#FF6321] text-black shadow-md'
                        : isDarkMode
                        ? 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  placeholder="Search player name, nickname, village..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border rounded-full px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-[#FF6321] transition-colors ${
                    isDarkMode
                      ? 'bg-[#0a0a0a] border-white/10 text-white placeholder-gray-500'
                      : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Grid inside Tab Modal */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlayers.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => setActivePlayer(player)}
                    className={`group border rounded-3xl p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isDarkMode
                        ? 'bg-[#0a0a0a] border-white/10 hover:border-[#FF6321]'
                        : 'bg-slate-50 border-slate-200 hover:border-[#FF6321] shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="relative h-56 bg-black/20 rounded-2xl overflow-hidden mb-3">
                        <img
                          src={player.photoUrl}
                          alt={player.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        {player.number > 0 && (
                          <div className="absolute top-3 left-3 text-2xl font-black italic text-white/50 font-mono">
                            #{player.number}
                          </div>
                        )}

                        {player.isCaptain && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#FF6321] text-black font-black italic text-[9px] uppercase tracking-wider rounded-full">
                            Captain
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#FF6321] font-bold uppercase">
                        <span>{player.position}</span>
                        <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                          {player.birthplace}
                        </span>
                      </div>

                      <h3 className="text-base font-black italic uppercase tracking-tight group-hover:text-[#FF6321] transition-colors mt-1">
                        {player.name}
                      </h3>

                      <p className={`text-xs mt-1.5 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                        {player.bio}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-500/15 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-[11px]">
                        <span className="text-[#FF6321]">{player.stats.goals} Goals</span>
                        <span>•</span>
                        <span>{player.stats.assists} Assists</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FF6321] uppercase italic">
                        View Bio <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPlayers.length === 0 && (
                <div className="py-16 text-center">
                  <Shield className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="font-bold text-sm uppercase">No matching profiles found</p>
                  <p className="text-xs text-gray-500 mt-1">Try another search or select a different position tab.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Individual Player Profile Card Modal */}
      <PlayerModal player={activePlayer} onClose={() => setActivePlayer(null)} isDarkMode={isDarkMode} />
    </section>
  );
};
