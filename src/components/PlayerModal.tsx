import React, { useState } from 'react';
import { X, Star, Flame, CheckCircle2, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Player } from '../types';

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose, isDarkMode = true }) => {
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(248);

  if (!player) return null;

  const handleVote = () => {
    if (!voted) {
      setVoted(true);
      setVoteCount((prev) => prev + 1);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF6321', '#F59E0B', '#FFFFFF'],
      });
    }
  };

  const getPositionBadgeColor = (pos: string) => {
    switch (pos) {
      case 'Forward':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'Midfielder':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'Defender':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'Goalkeeper':
        return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
      default:
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl overflow-y-auto">
      <div
        id="player-modal-card"
        className={`relative w-full max-w-3xl border rounded-3xl overflow-hidden shadow-2xl my-8 transition-colors duration-300 animate-in fade-in zoom-in ${
          isDarkMode
            ? 'bg-[#111111] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-400/30'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full border transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-[#0a0a0a]/80 text-gray-400 hover:text-white hover:bg-[#FF6321] hover:text-black border-white/10'
              : 'bg-white/90 text-slate-600 hover:bg-[#FF6321] hover:text-black border-slate-200 shadow-md'
          }`}
          aria-label="Close player profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-64 sm:h-80 bg-slate-900 overflow-hidden">
          <img
            src={player.photoUrl}
            alt={player.name}
            className="w-full h-full object-cover object-top filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Jersey Number Overlay */}
          {player.number > 0 && (
            <div className="absolute top-4 left-6 text-6xl sm:text-8xl font-black text-[#FF6321]/20 font-mono select-none italic">
              #{player.number}
            </div>
          )}

          {/* Player Title Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getPositionBadgeColor(player.position)}`}>
                  {player.position}
                </span>
                {player.isLegend && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black flex items-center gap-1 shadow-md italic">
                    <Crown className="w-3 h-3 fill-black" /> Club Legend
                  </span>
                )}
                {player.isCaptain && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF6321] text-black flex items-center gap-1 shadow-md italic">
                    <Star className="w-3 h-3 fill-black" /> Captain
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-4xl font-black italic text-white uppercase tracking-tight">
                {player.name}
              </h3>
              <p className="text-[#FF6321] font-bold text-xs mt-0.5">
                {player.nickname ? `"${player.nickname}" • ` : ''}Born in {player.birthplace}
              </p>
            </div>

            {/* Vote Action */}
            <button
              onClick={handleVote}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-black italic text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer ${
                voted
                  ? 'bg-emerald-500 text-black cursor-default'
                  : 'bg-[#FF6321] hover:bg-white text-black hover:scale-105'
              }`}
            >
              {voted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Voted Fan Favorite ({voteCount})
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4" /> Vote Fan Favorite ({voteCount})
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Bio & Quote */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF6321] mb-2">Player Biography</h4>
            <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              {player.bio}
            </p>
            {player.quote && (
              <blockquote className={`mt-4 p-4 rounded-2xl border-l-4 border-[#FF6321] italic text-xs sm:text-sm ${
                isDarkMode ? 'bg-[#0a0a0a]/80 text-amber-200' : 'bg-orange-50 text-slate-800'
              }`}>
                "{player.quote}"
              </blockquote>
            )}
          </div>

          {/* Quick Info Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border ${
            isDarkMode ? 'bg-[#0a0a0a]/80 border-white/5' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Age / Height</span>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{player.age} yrs • {player.height}</span>
            </div>
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Preferred Foot</span>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{player.preferredFoot}</span>
            </div>
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Joined Marenyo</span>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{player.joinedYear}</span>
            </div>
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Club Status</span>
              <span className="text-xs font-bold text-[#FF6321]">Active Star</span>
            </div>
          </div>

          {/* Key Stats Row */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF6321] mb-3">Marenyo FC Career Stats</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              <div className={`p-3 rounded-xl border text-center ${
                isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`block text-xl font-black font-mono italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{player.stats.appearances}</span>
                <span className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Appearances</span>
              </div>
              <div className={`p-3 rounded-xl border text-center ${
                isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="block text-xl font-black text-[#FF6321] font-mono italic">{player.stats.goals}</span>
                <span className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Goals</span>
              </div>
              <div className={`p-3 rounded-xl border text-center ${
                isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`block text-xl font-black font-mono italic ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{player.stats.assists}</span>
                <span className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Assists</span>
              </div>
              {player.stats.cleanSheets !== undefined && (
                <div className={`p-3 rounded-xl border text-center ${
                  isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`block text-xl font-black font-mono italic ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{player.stats.cleanSheets}</span>
                  <span className={`text-[9px] uppercase font-bold ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Clean Sheets</span>
                </div>
              )}
            </div>
          </div>

          {/* Player Attributes Rating Breakdown */}
          {player.attributes && (
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF6321] mb-3">Attribute Ratings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(player.attributes).map(([attr, val]) => (
                  <div key={attr} className="space-y-1">
                    <div className={`flex justify-between text-xs font-bold uppercase ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                      <span>{attr}</span>
                      <span className="text-[#FF6321] font-mono">{val}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden border ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-[#FF6321] to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
