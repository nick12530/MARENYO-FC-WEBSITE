import React, { useState } from 'react';
import { Users, Search, Star, Trophy, Shield } from 'lucide-react';
import { PLAYERS } from '../data/clubData';

export const SquadSection: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const positions = ['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Coaching Staff'];

  const filteredPlayers = PLAYERS.filter((player) => {
    const matchesPos = selectedPosition === 'All' || player.position === selectedPosition;
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (player.nickname && player.nickname.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPos && matchesSearch;
  });

  return (
    <section id="squad" className="py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Declaration Snippet */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-[#FF6321] font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#FF6321]"></span> First Team & Staff
            </h3>
            <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-white">
              THE <span className="text-[#FF6321]">SQUAD</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-2xl">
              "For years, Marenyo FC has brought joy to its supporters, nurtured young talent, and provided a stage for rising stars to shine."
            </p>
          </div>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            Season 2024 / 2025
          </span>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#111111] p-4 rounded-2xl border border-white/5">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {positions.map((pos) => (
              <button
                key={pos}
                id={`filter-${pos.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedPosition(pos)}
                className={`px-4 py-2 text-xs font-black uppercase italic tracking-wider transition-all cursor-pointer ${
                  selectedPosition === pos
                    ? 'bg-[#FF6321] text-black'
                    : 'bg-[#0a0a0a] text-gray-400 border border-white/5 hover:text-white hover:border-[#FF6321]'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search squad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6321] transition-colors"
            />
          </div>
        </div>

        {/* Squad Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              id={`player-card-${player.id}`}
              className="group bg-[#111111] border border-white/5 p-4 rounded-2xl hover:border-[#FF6321]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 bg-[#0a0a0a] rounded-xl overflow-hidden mb-3">
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

                  {/* Jersey Number Tag */}
                  <div className="absolute top-2 left-2 bg-[#0a0a0a]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-black italic text-[#FF6321] text-xs">
                    #{player.number}
                  </div>

                  {/* Captain Badge */}
                  {player.isCaptain && (
                    <div className="absolute top-2 right-2 bg-[#FF6321] text-black px-2 py-0.5 font-black text-[9px] uppercase tracking-wider flex items-center gap-1 italic">
                      <Star className="w-3 h-3 fill-black" /> C
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#FF6321] font-bold uppercase tracking-wider">
                    {player.position} {player.number > 0 ? `#${player.number}` : ''}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase">
                    {player.birthplace}
                  </div>
                </div>

                <h3 className="text-base font-black italic uppercase tracking-tight text-white group-hover:text-[#FF6321] transition-colors mt-1">
                  {player.name}
                </h3>

                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {player.bio}
                </p>
              </div>

              {/* Quick Stats Line */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <div>
                  <span className="font-bold text-white italic">{player.stats.appearances}</span> Apps
                </div>
                <div>
                  <span className="font-bold text-[#FF6321] italic">{player.stats.goals}</span> Goals
                </div>
                <div>
                  <span className="font-bold text-gray-300 italic">{player.stats.assists}</span> Assists
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12 bg-[#111111] rounded-2xl border border-white/5">
            <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No players found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};
