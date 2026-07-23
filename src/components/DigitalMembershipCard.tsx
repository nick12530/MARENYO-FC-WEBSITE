import React from 'react';
import { Shield, MapPin, Download } from 'lucide-react';
import { FanTier } from '../types';

interface DigitalMembershipCardProps {
  name: string;
  tier: FanTier;
  memberId: string;
  village: string;
  joinedDate: string;
  avatarUrl?: string;
  onDownload?: () => void;
}

export const downloadPassCardImage = (
  name: string,
  tier: FanTier,
  memberId: string,
  village: string,
  joinedDate: string
) => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background Dark Gradient
  const grad = ctx.createLinearGradient(0, 0, 800, 500);
  grad.addColorStop(0, '#18181b');
  grad.addColorStop(0.5, '#0f0f12');
  grad.addColorStop(1, '#050507');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 500);

  // Border & Rounded Outer Card Frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, 780, 480);

  // Orange Top Accent Strip
  ctx.fillStyle = '#FF6321';
  ctx.fillRect(10, 10, 780, 12);

  // Corner Accent Glow Triangle
  ctx.fillStyle = 'rgba(255, 99, 33, 0.12)';
  ctx.beginPath();
  ctx.moveTo(800, 220);
  ctx.lineTo(800, 10);
  ctx.lineTo(580, 10);
  ctx.closePath();
  ctx.fill();

  // Header Logo Box ("M")
  ctx.fillStyle = '#FF6321';
  ctx.beginPath();
  ctx.roundRect(40, 50, 60, 60, 12);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.font = '900 italic 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('M', 70, 93);

  // Header Titles
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 italic 28px sans-serif';
  ctx.fillText('MARENYO FC', 120, 80);

  ctx.fillStyle = '#FF6321';
  ctx.font = '700 14px sans-serif';
  ctx.fillText('OFFICIAL FAN CLUB PASS • SAGAM, GEM', 120, 102);

  // Tier Badge Box
  let badgeText = 'SUPPORTER';
  if (tier === 'Former Player') badgeText = 'LEGEND';
  if (tier === 'Current Star') badgeText = 'STAR PLAYER';
  if (tier === 'Future Talent') badgeText = 'FUTURE TALENT';

  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#FF6321';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(580, 50, 180, 44, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FF6321';
  ctx.font = '900 italic 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(badgeText, 670, 78);

  // Separator Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 140);
  ctx.lineTo(760, 140);
  ctx.stroke();

  // Avatar / Shield Frame Box
  ctx.fillStyle = '#0a0a0c';
  ctx.strokeStyle = 'rgba(255, 99, 33, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(40, 170, 120, 120, 18);
  ctx.fill();
  ctx.stroke();

  // Shield Icon inside frame
  ctx.fillStyle = '#FF6321';
  ctx.font = '900 50px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🛡️', 100, 245);

  // Member Details Text
  ctx.textAlign = 'left';
  ctx.fillStyle = '#9ca3af';
  ctx.font = '700 13px sans-serif';
  ctx.fillText('OFFICIAL MEMBER NAME', 180, 190);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 italic 34px sans-serif';
  ctx.fillText((name || 'MARENYO SUPPORTER').toUpperCase(), 180, 230);

  ctx.fillStyle = '#FF6321';
  ctx.font = '700 18px sans-serif';
  ctx.fillText(`📍 ${village || 'Sagam, Gem, Kenya'}`, 180, 265);

  // Footer Separator Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.moveTo(40, 360);
  ctx.lineTo(760, 360);
  ctx.stroke();

  // Member ID
  ctx.fillStyle = '#9ca3af';
  ctx.font = '700 12px sans-serif';
  ctx.fillText('MEMBER ID NUMBER', 40, 395);

  ctx.fillStyle = '#FF6321';
  ctx.font = '900 monospace italic 26px sans-serif';
  ctx.fillText(memberId || 'MFC-2026-8841', 40, 430);

  // Joined Date
  ctx.textAlign = 'right';
  ctx.fillStyle = '#9ca3af';
  ctx.font = '700 12px sans-serif';
  ctx.fillText('DATE ISSUED', 760, 395);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 22px sans-serif';
  ctx.fillText(joinedDate || 'July 2026', 760, 430);

  // Bottom Watermark
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.font = '600 italic 11px sans-serif';
  ctx.fillText('MARENYO FOOTBALL CLUB • ONCE MARENYO, ALWAYS MARENYO • SAGAM, GEM', 400, 475);

  // Trigger Download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `MarenyoFC_Pass_${memberId.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const DigitalMembershipCard: React.FC<DigitalMembershipCardProps> = ({
  name,
  tier,
  memberId,
  village,
  joinedDate,
  avatarUrl,
  onDownload,
}) => {
  const getBadgeTitle = (t: FanTier) => {
    switch (t) {
      case 'Supporter':
        return 'SUPPORTER';
      case 'Former Player':
        return 'LEGEND';
      case 'Current Star':
        return 'STAR PLAYER';
      case 'Future Talent':
        return 'FUTURE TALENT';
    }
  };

  const handleSelfDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      downloadPassCardImage(name, tier, memberId, village, joinedDate);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md">
      <div
        id="digital-fan-card"
        className="relative w-full aspect-85/54 rounded-2xl p-6 bg-[#111111] border border-white/15 shadow-2xl overflow-hidden flex flex-col justify-between text-white font-sans select-none group"
      >
        {/* Accent corner tag */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6321]/15 rounded-bl-full pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF6321] text-black font-black italic flex items-center justify-center text-lg shadow-md">
              M
            </div>
            <div>
              <h4 className="font-black italic text-sm tracking-wider text-white uppercase">MARENYO FC</h4>
              <p className="text-[9px] text-[#FF6321] font-bold uppercase tracking-widest -mt-0.5">FAN CLUB PASS</p>
            </div>
          </div>

          <span className="px-3 py-1 bg-[#0a0a0a] border border-white/15 text-[9px] font-black italic uppercase tracking-wider text-[#FF6321] rounded-full">
            {getBadgeTitle(tier)}
          </span>
        </div>

        {/* Card Body */}
        <div className="relative z-10 my-2 flex items-center gap-4">
          {/* Avatar or Default Shield */}
          <div className="w-14 h-14 rounded-xl bg-[#0a0a0a] border border-white/15 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <Shield className="w-7 h-7 text-[#FF6321]" />
            )}
          </div>

          <div className="overflow-hidden">
            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Official Member</p>
            <h3 className="text-lg font-black italic text-white uppercase tracking-tight truncate">{name || 'Supporter Name'}</h3>
            <p className="text-xs text-[#FF6321] font-bold flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#FF6321]" /> {village || 'Sagam, Gem'}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-end justify-between">
          <div>
            <span className="block text-[8px] text-gray-400 uppercase font-bold tracking-widest">Member ID</span>
            <span className="font-mono font-black italic text-xs text-[#FF6321] tracking-wider">{memberId}</span>
          </div>

          <div className="text-right">
            <span className="block text-[8px] text-gray-400 uppercase font-bold tracking-widest">Joined</span>
            <span className="text-xs font-bold text-gray-300">{joinedDate}</span>
          </div>
        </div>
      </div>

      {/* Direct Download Card Button */}
      <button
        onClick={handleSelfDownload}
        className="w-full py-3 rounded-full bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#FF6321]/20 flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4 text-black" />
        <span>Download Player Pass Card (.PNG)</span>
      </button>
    </div>
  );
};
