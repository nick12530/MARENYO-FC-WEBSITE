import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Save,
  User,
  Calendar,
  Settings,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  Download,
  FileText,
  Sparkles,
  BarChart3,
  Flame,
  Check,
  Filter,
  Shirt,
  Upload,
  RefreshCw,
  Crown,
  Star,
  Image as ImageIcon,
} from 'lucide-react';
import { Player, MatchFixture, FanMember, NewsItem, KitItem } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  fixtures: MatchFixture[];
  clubInfo: any;
  kits: KitItem[];
  onSavePlayers: (updated: Player[]) => void;
  onSaveFixtures: (updated: MatchFixture[]) => void;
  onSaveClubInfo: (updated: any) => void;
  onSaveKits: (updated: KitItem[]) => void;
  isDarkMode?: boolean;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  players,
  fixtures,
  clubInfo,
  kits,
  onSavePlayers,
  onSaveFixtures,
  onSaveClubInfo,
  onSaveKits,
  isDarkMode = true,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'players' | 'fixtures' | 'kits' | 'members' | 'news' | 'settings'
  >('dashboard');

  // Kit Editing State
  const [editingKits, setEditingKits] = useState<KitItem[]>(kits);

  // Sync editingKits when props change
  React.useEffect(() => {
    setEditingKits(kits);
  }, [kits]);

  const handleKitImageUpload = (
    kitId: string,
    side: 'front' | 'back',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const updated = editingKits.map((k) => {
          if (k.id === kitId) {
            return side === 'front'
              ? { ...k, customFrontImage: result }
              : { ...k, customBackImage: result };
          }
          return k;
        });
        setEditingKits(updated);
        onSaveKits(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetKitImage = (kitId: string, side?: 'front' | 'back') => {
    const updated = editingKits.map((k) => {
      if (k.id === kitId) {
        if (side === 'front') return { ...k, customFrontImage: null };
        if (side === 'back') return { ...k, customBackImage: null };
        return { ...k, customFrontImage: null, customBackImage: null };
      }
      return k;
    });
    setEditingKits(updated);
    onSaveKits(updated);
  };

  // Player Editing State
  const [editingPlayer, setEditingPlayer] = useState<Partial<Player> | null>(null);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [playerFilterCategory, setPlayerFilterCategory] = useState<'all' | 'current' | 'legends'>('all');

  // Fixture Editing State
  const [editingFixture, setEditingFixture] = useState<Partial<MatchFixture> | null>(null);
  const [isAddingFixture, setIsAddingFixture] = useState(false);

  // Website Settings State
  const [siteSettings, setSiteSettings] = useState(clubInfo);

  // Fan Club Members Database State (4,000+ Active Members representation)
  const [memberSearch, setMemberSearch] = useState('');
  const [memberFilterTier, setMemberFilterTier] = useState('All');
  const [fanMembers, setFanMembers] = useState<FanMember[]>([
    {
      id: 'fm-1',
      name: "Joseph 'Key' Odhiambo",
      tier: 'Supporter',
      memberId: 'MFC-2026-8841',
      joinedDate: 'Jan 2024',
      village: 'Sagam, Gem',
      favoritePlayer: "Victor 'The Cannon' Otieno",
    },
    {
      id: 'fm-2',
      name: 'Achieng Mary Wandera',
      tier: 'Supporter',
      memberId: 'MFC-2026-1042',
      joinedDate: 'Feb 2024',
      village: 'Marenyo Central',
      favoritePlayer: "Emmanuel 'Engine' Omondi",
    },
    {
      id: 'fm-3',
      name: 'Elder Ochieng Aguta',
      tier: 'Former Player',
      memberId: 'MFC-2026-0004',
      joinedDate: 'May 2012',
      village: 'Sagam Stadium Area',
      favoritePlayer: "Dennis 'Wall of Sagam' Onyango",
    },
    {
      id: 'fm-4',
      name: "Kevin 'Lightning' Adhiambo",
      tier: 'Current Star',
      memberId: 'MFC-2026-[#11]',
      joinedDate: 'Jan 2022',
      village: 'Sagam Junction',
    },
    {
      id: 'fm-5',
      name: 'Brian Okoth Jr.',
      tier: 'Future Talent',
      memberId: 'MFC-2026-9031',
      joinedDate: 'Mar 2025',
      village: 'Gem Central',
    },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberVillage, setNewMemberVillage] = useState('Sagam, Gem');
  const [newMemberTier, setNewMemberTier] = useState<any>('Supporter');

  // News Items State
  const [newsList, setNewsList] = useState<NewsItem[]>([
    {
      id: 'n-1',
      title: 'Marenyo FC Triumphs in Sagam Derby Clash',
      summary: 'Victor Otieno scored a stunning late header as Marenyo FC secured 3 points at Sagam Stadium Grounds.',
      date: 'July 18, 2026',
      category: 'Match Report',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      author: 'Marenyo Press Office',
    },
    {
      id: 'n-2',
      title: 'Active Fan Members Pass 4,000 Threshold',
      summary: 'A landmark community achievement as supporters across Gem, Nairobi, and diaspora claim digital fan passes.',
      date: 'July 21, 2026',
      category: 'Community',
      imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80',
      author: 'Fan Club Secretariat',
    },
  ]);

  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsSummary, setNewNewsSummary] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<any>('Match Report');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passcode.trim() === 'marenyo2024' ||
      passcode.trim() === 'admin' ||
      passcode.trim() === ''
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin passcode. Try "marenyo2024" or leave empty for demo access.');
    }
  };

  // Player handlers
  const handlePlayerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingPlayer) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPlayer({
          ...editingPlayer,
          photoUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlayer || !editingPlayer.name) return;

    let updatedList: Player[];
    if (isAddingPlayer) {
      const newPlayer: Player = {
        id: `p-${Date.now()}`,
        name: editingPlayer.name || 'New Player',
        nickname: editingPlayer.nickname || '',
        number: Number(editingPlayer.number) || 0,
        position: (editingPlayer.position as any) || 'Forward',
        isLegend: editingPlayer.isLegend || false,
        photoUrl:
          editingPlayer.photoUrl ||
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        bio: editingPlayer.bio || 'Official Marenyo FC team member.',
        birthplace: editingPlayer.birthplace || 'Sagam, Gem',
        age: Number(editingPlayer.age) || 20,
        height: editingPlayer.height || '175 cm',
        preferredFoot: (editingPlayer.preferredFoot as any) || 'Right',
        joinedYear: Number(editingPlayer.joinedYear) || new Date().getFullYear(),
        stats: {
          appearances: Number(editingPlayer.stats?.appearances) || 0,
          goals: Number(editingPlayer.stats?.goals) || 0,
          assists: Number(editingPlayer.stats?.assists) || 0,
        },
        attributes: editingPlayer.attributes || {
          pace: 80,
          shooting: 80,
          passing: 80,
          dribbling: 80,
          defense: 75,
          physicality: 80,
        },
        quote: editingPlayer.quote || '',
      };
      updatedList = [newPlayer, ...players];
    } else {
      updatedList = players.map((p) =>
        p.id === editingPlayer.id ? ({ ...p, ...editingPlayer } as Player) : p
      );
    }

    onSavePlayers(updatedList);
    setEditingPlayer(null);
    setIsAddingPlayer(false);
  };

  const handleDeletePlayer = (id: string) => {
    if (confirm('Are you sure you want to delete this player profile?')) {
      const updated = players.filter((p) => p.id !== id);
      onSavePlayers(updated);
    }
  };

  // Fixture handlers
  const handleSaveFixture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFixture || !editingFixture.homeTeam) return;

    let updatedList: MatchFixture[];
    if (isAddingFixture) {
      const newFixture: MatchFixture = {
        id: `m-${Date.now()}`,
        homeTeam: editingFixture.homeTeam || 'MARENYO FC',
        awayTeam: editingFixture.awayTeam || 'Opposition FC',
        date: editingFixture.date || 'TBD 2026',
        time: editingFixture.time || '3:00 PM EAT',
        venue: editingFixture.venue || 'Sagam Stadium Grounds',
        competition: editingFixture.competition || 'Gem Community Cup',
        status: editingFixture.status || 'upcoming',
        homeScore: editingFixture.homeScore,
        awayScore: editingFixture.awayScore,
        matchReport: editingFixture.matchReport,
      };
      updatedList = [newFixture, ...fixtures];
    } else {
      updatedList = fixtures.map((f) =>
        f.id === editingFixture.id ? ({ ...f, ...editingFixture } as MatchFixture) : f
      );
    }

    onSaveFixtures(updatedList);
    setEditingFixture(null);
    setIsAddingFixture(false);
  };

  const handleDeleteFixture = (id: string) => {
    if (confirm('Are you sure you want to delete this match fixture?')) {
      const updated = fixtures.filter((f) => f.id !== id);
      onSaveFixtures(updated);
    }
  };

  // Member handlers
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newMember: FanMember = {
      id: `fm-${Date.now()}`,
      name: newMemberName,
      tier: newMemberTier,
      memberId: `MFC-2026-${randomNum}`,
      joinedDate: 'Jul 2026',
      village: newMemberVillage,
    };

    setFanMembers([newMember, ...fanMembers]);
    setNewMemberName('');
  };

  const exportMembersCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Name,Tier,MemberID,Joined,Village\n' +
      fanMembers
        .map((m) => `"${m.id}","${m.name}","${m.tier}","${m.memberId}","${m.joinedDate}","${m.village}"`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Marenyo_FC_40000_Fan_Members.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // News handler
  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle.trim()) return;

    const newArticle: NewsItem = {
      id: `n-${Date.now()}`,
      title: newNewsTitle,
      summary: newNewsSummary,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: newNewsCategory,
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      author: 'Official Club Secretariat',
    };

    setNewsList([newArticle, ...newsList]);
    setNewNewsTitle('');
    setNewNewsSummary('');
  };

  const filteredMembers = fanMembers.filter((m) => {
    const matchesTier = memberFilterTier === 'All' || m.tier === memberFilterTier;
    const matchesSearch =
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.memberId.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.village.toLowerCase().includes(memberSearch.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl overflow-y-auto">
      <div
        id="admin-portal-modal"
        className={`relative w-full max-w-5xl border rounded-3xl overflow-hidden shadow-2xl my-8 transition-colors duration-300 animate-in fade-in zoom-in ${
          isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-400/30'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`p-6 border-b flex items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6321] text-black font-black italic flex items-center justify-center text-lg shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black italic uppercase tracking-tight">
                MARENYO FC <span className="text-[#FF6321]">ADMIN PORTAL</span>
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Official Management Suite • Sagam, Gem, Siaya County
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              isDarkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-[#FF6321] hover:text-black' : 'bg-white border-slate-200 text-slate-700 hover:bg-[#FF6321] hover:text-black shadow-sm'
            }`}
            aria-label="Close admin modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FF6321]/15 border border-[#FF6321]/30 text-[#FF6321] flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-black italic uppercase">Secretariat Authentication</h4>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                Enter official passcode to access player roster controls, fixtures, and 40,000+ fan member directory.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Passcode (Default: marenyo2024)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className={`w-full border rounded-2xl px-4 py-3.5 text-xs text-center font-mono focus:outline-none focus:border-[#FF6321] transition-colors ${
                    isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white placeholder-gray-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#FF6321] text-black font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#FF6321]/20"
              >
                Authenticate Access
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Suite */
          <div className="p-6">
            {/* Admin Nav Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-500/15 pb-4 mb-6 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('players')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'players'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Players & Staff ({players.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('fixtures')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'fixtures'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Fixtures ({fixtures.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('kits')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'kits'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <Shirt className="w-4 h-4" />
                <span>Club Jerseys ({editingKits.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('members')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'members'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Fan Registry (4,000+)</span>
              </button>

              <button
                onClick={() => setActiveTab('news')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'news'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Club News</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black italic uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-[#FF6321] text-black shadow-md'
                    : isDarkMode
                    ? 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Club Info</span>
              </button>
            </div>

            {/* TAB 1: DASHBOARD & ANALYTICS */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Registered Fans</span>
                      <Users className="w-4 h-4 text-[#FF6321]" />
                    </div>
                    <div className="text-3xl font-black italic text-[#FF6321]">4,000+</div>
                    <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>+124 new passes this week</p>
                  </div>

                  <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Active Squad</span>
                      <User className="w-4 h-4 text-[#FF6321]" />
                    </div>
                    <div className="text-3xl font-black italic">{players.length} Players</div>
                    <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Senior & Youth Academy</p>
                  </div>

                  <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Matches Recorded</span>
                      <Calendar className="w-4 h-4 text-[#FF6321]" />
                    </div>
                    <div className="text-3xl font-black italic">{fixtures.length} Fixtures</div>
                    <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>78% Win Ratio at Sagam</p>
                  </div>

                  <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Fan Pass Tier Distribution</span>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-xs font-bold space-y-1">
                      <div className="flex justify-between"><span>Supporters:</span> <span className="text-[#FF6321]">3,240</span></div>
                      <div className="flex justify-between"><span>Former Legends:</span> <span>120</span></div>
                      <div className="flex justify-between"><span>Academy Stars:</span> <span>640</span></div>
                    </div>
                  </div>
                </div>

                {/* Regional Fan Distribution Chart */}
                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <h4 className="text-sm font-black italic uppercase mb-4">Regional Fan Member Spread (4,000+ Total)</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Sagam Sub-location & Gem</span>
                        <span className="text-[#FF6321]">1,850 Members (46%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6321] rounded-full" style={{ width: '46%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Siaya County & Western Kenya</span>
                        <span className="text-amber-400">1,220 Members (30%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '30%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Nairobi, Mombasa & Diaspora</span>
                        <span className="text-emerald-400">930 Members (24%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: '24%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PLAYERS & STAFF */}
            {activeTab === 'players' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-black italic uppercase">Manage Team Roster</h4>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                      Add, edit, or remove current squad members and club legends. Upload photos and bios.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsAddingPlayer(true);
                      setEditingPlayer({
                        name: '',
                        nickname: '',
                        number: 10,
                        position: 'Forward',
                        isLegend: false,
                        birthplace: 'Sagam, Gem',
                        age: 22,
                        bio: 'Marenyo FC team member.',
                        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
                        stats: { appearances: 10, goals: 2, assists: 1 },
                      });
                    }}
                    className="bg-[#FF6321] text-black px-4 py-2 rounded-full font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-[#FF6321]/20"
                  >
                    <Plus className="w-4 h-4" /> Add Player / Legend
                  </button>
                </div>

                {/* Filter Tabs in Admin Roster */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPlayerFilterCategory('all')}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase italic transition-all ${
                      playerFilterCategory === 'all'
                        ? 'bg-[#FF6321] text-black'
                        : isDarkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    All ({players.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlayerFilterCategory('current')}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase italic transition-all flex items-center gap-1.5 ${
                      playerFilterCategory === 'current'
                        ? 'bg-[#FF6321] text-black'
                        : isDarkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" /> Current Squad ({players.filter((p) => !p.isLegend).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlayerFilterCategory('legends')}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase italic transition-all flex items-center gap-1.5 ${
                      playerFilterCategory === 'legends'
                        ? 'bg-[#FF6321] text-black'
                        : isDarkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5" /> Club Legends ({players.filter((p) => p.isLegend).length})
                  </button>
                </div>

                {/* Player List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[42vh] overflow-y-auto pr-1">
                  {players
                    .filter((p) => {
                      if (playerFilterCategory === 'current') return !p.isLegend;
                      if (playerFilterCategory === 'legends') return p.isLegend;
                      return true;
                    })
                    .map((p) => (
                      <div
                        key={p.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                          p.isLegend
                            ? isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-300'
                            : isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={p.photoUrl}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-white/20"
                            referrerPolicy="no-referrer"
                          />
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2">
                              <h5 className="font-black italic uppercase text-sm truncate">{p.name}</h5>
                              {p.isLegend && (
                                <span className="px-2 py-0.5 rounded bg-amber-500 text-black text-[9px] font-black italic uppercase">
                                  Legend
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#FF6321] font-bold">
                              #{p.number} • {p.position} {p.birthplace ? `• ${p.birthplace}` : ''}
                            </p>
                            <p className={`text-[10px] truncate ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                              {p.bio}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingPlayer(false);
                              setEditingPlayer(p);
                            }}
                            className="p-2 rounded-lg bg-white/10 hover:bg-[#FF6321] hover:text-black transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePlayer(p.id)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-black transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Player Edit / Add Form Modal Subview */}
                {editingPlayer && (
                  <form
                    onSubmit={handleSavePlayer}
                    className={`p-6 rounded-2xl border space-y-4 ${
                      isDarkMode ? 'bg-[#0a0a0a] border-white/20' : 'bg-slate-100 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black italic uppercase text-[#FF6321]">
                        {isAddingPlayer ? 'Add New Player or Legend' : `Edit: ${editingPlayer.name}`}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingPlayer(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Category Radio: Current Player vs Legend */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400">
                        Player Roster Category *
                      </label>
                      <div className="flex items-center gap-4">
                        <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                          !editingPlayer.isLegend
                            ? 'bg-[#FF6321]/20 border-[#FF6321] text-white'
                            : isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-slate-300 text-slate-700'
                        }`}>
                          <input
                            type="radio"
                            name="isLegend"
                            checked={!editingPlayer.isLegend}
                            onChange={() => setEditingPlayer({ ...editingPlayer, isLegend: false })}
                            className="accent-[#FF6321]"
                          />
                          <Star className="w-4 h-4 text-[#FF6321]" />
                          <span className="text-xs font-bold uppercase italic">Current Squad Member</span>
                        </label>

                        <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                          editingPlayer.isLegend
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                            : isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-slate-300 text-slate-700'
                        }`}>
                          <input
                            type="radio"
                            name="isLegend"
                            checked={!!editingPlayer.isLegend}
                            onChange={() => setEditingPlayer({ ...editingPlayer, isLegend: true })}
                            className="accent-amber-500"
                          />
                          <Crown className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-bold uppercase italic">Club Legend / Hall of Fame</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={editingPlayer.name || ''}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                          className={`w-full border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Nickname</label>
                        <input
                          type="text"
                          placeholder="e.g. Mastermind, Golden Boot"
                          value={editingPlayer.nickname || ''}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, nickname: e.target.value })}
                          className={`w-full border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Jersey Number</label>
                        <input
                          type="number"
                          value={editingPlayer.number ?? 0}
                          onChange={(e) =>
                            setEditingPlayer({ ...editingPlayer, number: parseInt(e.target.value, 10) })
                          }
                          className={`w-full border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Position</label>
                        <select
                          value={editingPlayer.position || 'Forward'}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, position: e.target.value as any })}
                          className={`w-full border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        >
                          <option value="Forward">Forward</option>
                          <option value="Midfielder">Midfielder</option>
                          <option value="Defender">Defender</option>
                          <option value="Goalkeeper">Goalkeeper</option>
                          <option value="Coaching Staff">Coaching Staff</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Village / Birthplace</label>
                        <input
                          type="text"
                          value={editingPlayer.birthplace || ''}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, birthplace: e.target.value })}
                          className={`w-full border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Age</label>
                        <input
                          type="number"
                          value={editingPlayer.age ?? 22}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, age: parseInt(e.target.value, 10) })}
                          className={`w-full border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Photo Upload & URL Section */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase mb-1">Player Photo</label>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        {editingPlayer.photoUrl && (
                          <img
                            src={editingPlayer.photoUrl}
                            alt="Preview"
                            className="w-12 h-12 rounded-xl object-cover border border-white/20 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <input
                          type="text"
                          placeholder="Image URL or upload below..."
                          value={editingPlayer.photoUrl || ''}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, photoUrl: e.target.value })}
                          className={`flex-1 border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#FF6321] hover:text-black transition-colors text-xs font-bold uppercase cursor-pointer flex items-center gap-2 whitespace-nowrap">
                          <Upload className="w-4 h-4" /> Upload Picture
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePlayerImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Brief Bio Textarea */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase mb-1">Brief Bio & Career History</label>
                      <textarea
                        rows={3}
                        placeholder="Type a brief career bio and achievements..."
                        value={editingPlayer.bio || ''}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, bio: e.target.value })}
                        className={`w-full border rounded-xl p-2.5 text-xs ${
                          isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="bg-[#FF6321] text-black px-6 py-2.5 rounded-full font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer shadow-md"
                      >
                        Save Player Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPlayer(null)}
                        className="px-6 py-2.5 rounded-full border text-xs font-bold uppercase cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: FIXTURES */}
            {activeTab === 'fixtures' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black italic uppercase">Manage Matches & Results</h4>
                  <button
                    onClick={() => {
                      setIsAddingFixture(true);
                      setEditingFixture({
                        homeTeam: 'MARENYO FC',
                        awayTeam: 'Gem All-Stars',
                        date: 'Aug 12, 2026',
                        time: '3:00 PM EAT',
                        venue: 'Sagam Stadium Grounds',
                        competition: 'Gem Community League',
                        status: 'upcoming',
                      });
                    }}
                    className="bg-[#FF6321] text-black px-4 py-2 rounded-full font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Match Fixture
                  </button>
                </div>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                  {fixtures.map((f) => (
                    <div
                      key={f.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                        isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#FF6321]">{f.competition} • {f.date}</div>
                        <div className="text-sm font-black italic">
                          {f.homeTeam} {f.status === 'completed' ? `${f.homeScore} - ${f.awayScore}` : 'VS'} {f.awayTeam}
                        </div>
                        <div className="text-[10px] text-gray-500">{f.venue}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsAddingFixture(false);
                            setEditingFixture(f);
                          }}
                          className="p-2 rounded-lg bg-white/10 hover:bg-[#FF6321] hover:text-black transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFixture(f.id)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-black transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingFixture && (
                  <form
                    onSubmit={handleSaveFixture}
                    className={`p-6 rounded-2xl border space-y-4 ${
                      isDarkMode ? 'bg-[#0a0a0a] border-white/20' : 'bg-slate-100 border-slate-300'
                    }`}
                  >
                    <h4 className="text-sm font-black italic uppercase text-[#FF6321]">
                      {isAddingFixture ? 'Add New Match' : 'Edit Fixture Details'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Home Team</label>
                        <input
                          type="text"
                          required
                          value={editingFixture.homeTeam || ''}
                          onChange={(e) => setEditingFixture({ ...editingFixture, homeTeam: e.target.value })}
                          className={`w-full border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase mb-1">Away Team</label>
                        <input
                          type="text"
                          required
                          value={editingFixture.awayTeam || ''}
                          onChange={(e) => setEditingFixture({ ...editingFixture, awayTeam: e.target.value })}
                          className={`w-full border rounded-xl p-2.5 text-xs ${
                            isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="bg-[#FF6321] text-black px-6 py-2.5 rounded-full font-black uppercase italic text-xs tracking-wider"
                      >
                        Save Fixture
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingFixture(null)}
                        className="px-6 py-2.5 rounded-full border text-xs font-bold uppercase"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* KITS / JERSEYS MANAGEMENT TAB */}
            {activeTab === 'kits' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h4 className="text-lg font-black italic uppercase flex items-center gap-2">
                      <Shirt className="w-5 h-5 text-[#FF6321]" /> Club Jerseys & Official Kits Management
                    </h4>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                      Upload photos for the official Marenyo FC Home, Away, Third, and GK jerseys. These images will automatically rotate in the live website kit showcase.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onSaveKits(editingKits);
                      alert('Club Jerseys updated successfully!');
                    }}
                    className="bg-[#FF6321] text-black px-6 py-2.5 rounded-full font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#FF6321]/20 self-start sm:self-auto"
                  >
                    <Save className="w-4 h-4" /> Save All Kits Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-1">
                  {editingKits.map((kit) => (
                    <div
                      key={kit.id}
                      className={`p-5 rounded-3xl border space-y-4 shadow-xl transition-all ${
                        isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6321]">
                            {kit.type}
                          </span>
                          <h5 className="text-base font-black italic uppercase">{kit.name}</h5>
                        </div>
                        <div
                          className="w-5 h-5 rounded-full border border-white/30 shadow"
                          style={{ backgroundColor: kit.primaryColor }}
                        />
                      </div>

                      {/* FRONT & BACK IMAGE UPLOAD CARDS */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* FRONT PHOTO */}
                        <div className={`p-3 rounded-2xl border text-center space-y-2 ${
                          isDarkMode ? 'bg-[#111111] border-white/10' : 'bg-white border-slate-200'
                        }`}>
                          <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                            Front Photo
                          </div>

                          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                            {kit.customFrontImage ? (
                              <img
                                src={kit.customFrontImage}
                                alt={`${kit.name} Front`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-2 text-gray-500">
                                <Shirt className="w-8 h-8 mx-auto mb-1 opacity-40 text-[#FF6321]" />
                                <span className="text-[9px] font-bold block uppercase">No Photo</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5 pt-1">
                            <label className="w-full py-1.5 px-2 rounded-xl bg-[#FF6321] text-black text-[10px] font-black uppercase italic tracking-wider hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-sm">
                              <Upload className="w-3 h-3" />
                              <span>{kit.customFrontImage ? 'Change Front' : 'Upload Front'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleKitImageUpload(kit.id, 'front', e)}
                                className="hidden"
                              />
                            </label>

                            {kit.customFrontImage && (
                              <button
                                onClick={() => handleResetKitImage(kit.id, 'front')}
                                className="text-[9px] font-bold text-red-400 hover:underline"
                              >
                                Remove Front
                              </button>
                            )}
                          </div>
                        </div>

                        {/* BACK PHOTO */}
                        <div className={`p-3 rounded-2xl border text-center space-y-2 ${
                          isDarkMode ? 'bg-[#111111] border-white/10' : 'bg-white border-slate-200'
                        }`}>
                          <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                            Back Photo
                          </div>

                          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                            {kit.customBackImage ? (
                              <img
                                src={kit.customBackImage}
                                alt={`${kit.name} Back`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-2 text-gray-500">
                                <Shirt className="w-8 h-8 mx-auto mb-1 opacity-40 text-blue-400" />
                                <span className="text-[9px] font-bold block uppercase">No Photo</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5 pt-1">
                            <label className="w-full py-1.5 px-2 rounded-xl bg-white/15 border border-white/20 text-white text-[10px] font-black uppercase italic tracking-wider hover:bg-[#FF6321] hover:text-black hover:border-[#FF6321] transition-colors cursor-pointer flex items-center justify-center gap-1">
                              <Upload className="w-3 h-3" />
                              <span>{kit.customBackImage ? 'Change Back' : 'Upload Back'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleKitImageUpload(kit.id, 'back', e)}
                                className="hidden"
                              />
                            </label>

                            {kit.customBackImage && (
                              <button
                                onClick={() => handleResetKitImage(kit.id, 'back')}
                                className="text-[9px] font-bold text-red-400 hover:underline"
                              >
                                Remove Back
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* EDITABLE DETAILS */}
                      <div className="space-y-3 pt-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">
                              Kit Title
                            </label>
                            <input
                              type="text"
                              value={kit.name}
                              onChange={(e) => {
                                const updated = editingKits.map((k) =>
                                  k.id === kit.id ? { ...k, name: e.target.value } : k
                                );
                                setEditingKits(updated);
                              }}
                              className={`w-full border rounded-xl p-2 text-xs font-bold ${
                                isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">
                              Primary Hex Color
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={kit.primaryColor}
                                onChange={(e) => {
                                  const updated = editingKits.map((k) =>
                                    k.id === kit.id ? { ...k, primaryColor: e.target.value, badgeBg: e.target.value, accentHex: e.target.value } : k
                                  );
                                  setEditingKits(updated);
                                }}
                                className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                              />
                              <input
                                type="text"
                                value={kit.primaryColor}
                                onChange={(e) => {
                                  const updated = editingKits.map((k) =>
                                    k.id === kit.id ? { ...k, primaryColor: e.target.value } : k
                                  );
                                  setEditingKits(updated);
                                }}
                                className={`w-full border rounded-xl p-2 text-xs font-mono ${
                                  isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">
                            Description / Story
                          </label>
                          <textarea
                            rows={2}
                            value={kit.description}
                            onChange={(e) => {
                              const updated = editingKits.map((k) =>
                                k.id === kit.id ? { ...k, description: e.target.value } : k
                              );
                              setEditingKits(updated);
                            }}
                            className={`w-full border rounded-xl p-2 text-xs ${
                              isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">
                              Default Name
                            </label>
                            <input
                              type="text"
                              value={kit.defaultName}
                              onChange={(e) => {
                                const updated = editingKits.map((k) =>
                                  k.id === kit.id ? { ...k, defaultName: e.target.value } : k
                                );
                                setEditingKits(updated);
                              }}
                              className={`w-full border rounded-xl p-2 text-xs uppercase font-black ${
                                isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">
                              Default Number
                            </label>
                            <input
                              type="number"
                              value={kit.defaultNumber}
                              onChange={(e) => {
                                const updated = editingKits.map((k) =>
                                  k.id === kit.id ? { ...k, defaultNumber: Number(e.target.value) } : k
                                );
                                setEditingKits(updated);
                              }}
                              className={`w-full border rounded-xl p-2 text-xs font-black ${
                                isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: FAN MEMBER REGISTRY (40,000+ Active Members) */}
            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-black italic uppercase">40,000+ Fan Member Registry</h4>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                      Search registered fan passes, issue new passes, or download database backup.
                    </p>
                  </div>

                  <button
                    onClick={exportMembersCSV}
                    className="bg-[#FF6321] text-black px-5 py-2.5 rounded-full font-black uppercase italic text-xs tracking-wider hover:bg-white transition-all cursor-pointer flex items-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4" /> Export Directory (CSV)
                  </button>
                </div>

                {/* Filter and Search controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Search member name, ID, village..."
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      className={`w-full border rounded-full px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-[#FF6321] ${
                        isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase">Filter Tier:</span>
                    <select
                      value={memberFilterTier}
                      onChange={(e) => setMemberFilterTier(e.target.value)}
                      className={`border rounded-full px-4 py-2 text-xs font-bold ${
                        isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="All">All Tiers</option>
                      <option value="Supporter">Supporter</option>
                      <option value="Former Player">Former Player</option>
                      <option value="Current Star">Current Star</option>
                      <option value="Future Talent">Future Talent</option>
                    </select>
                  </div>
                </div>

                {/* Member Table */}
                <div className="border rounded-2xl overflow-hidden max-h-[40vh] overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className={`border-b text-[10px] font-black uppercase tracking-wider ${
                        isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}>
                        <th className="p-3">Member ID</th>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Tier Pass</th>
                        <th className="p-3">Village / Location</th>
                        <th className="p-3">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-500/10 font-medium">
                      {filteredMembers.map((m) => (
                        <tr key={m.id} className={isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                          <td className="p-3 font-mono font-bold text-[#FF6321]">{m.memberId}</td>
                          <td className="p-3 font-black italic">{m.name}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full text-[9px] font-black italic bg-[#FF6321]/15 text-[#FF6321] uppercase">
                              {m.tier}
                            </span>
                          </td>
                          <td className="p-3">{m.village}</td>
                          <td className="p-3 text-gray-400">{m.joinedDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quickly issue new member pass */}
                <form onSubmit={handleAddMember} className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-3 ${
                  isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <input
                    type="text"
                    required
                    placeholder="New Fan Name"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className={`flex-1 border rounded-xl px-4 py-2 text-xs ${
                      isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Village / Location"
                    value={newMemberVillage}
                    onChange={(e) => setNewMemberVillage(e.target.value)}
                    className={`w-44 border rounded-xl px-4 py-2 text-xs ${
                      isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    type="submit"
                    className="bg-[#FF6321] text-black px-5 py-2 rounded-xl font-black uppercase italic text-xs tracking-wider cursor-pointer whitespace-nowrap"
                  >
                    Issue Member Pass
                  </button>
                </form>
              </div>
            )}

            {/* TAB 5: NEWS & ANNOUNCEMENTS */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <h4 className="text-lg font-black italic uppercase">Manage Club News & Releases</h4>

                <div className="space-y-3 max-h-[40vh] overflow-y-auto">
                  {newsList.map((n) => (
                    <div key={n.id} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between text-xs font-bold text-[#FF6321] mb-1">
                        <span>{n.category} • {n.date}</span>
                        <span>By {n.author}</span>
                      </div>
                      <h5 className="font-black italic text-base uppercase">{n.title}</h5>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{n.summary}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNews} className={`p-4 rounded-2xl border space-y-3 ${
                  isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h5 className="text-xs font-black uppercase text-[#FF6321]">Publish New Official Announcement</h5>
                  <input
                    type="text"
                    required
                    placeholder="Article Headline / Title"
                    value={newNewsTitle}
                    onChange={(e) => setNewNewsTitle(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2 text-xs ${
                      isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Article Summary / Press release text..."
                    value={newNewsSummary}
                    onChange={(e) => setNewNewsSummary(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2 text-xs ${
                      isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    type="submit"
                    className="bg-[#FF6321] text-black px-6 py-2.5 rounded-full font-black uppercase italic text-xs tracking-wider cursor-pointer"
                  >
                    Publish News Article
                  </button>
                </form>
              </div>
            )}

            {/* TAB 6: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h4 className="text-lg font-black italic uppercase">Club Info & Settings</h4>

                <div className={`p-6 rounded-2xl border space-y-4 ${
                  isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase mb-1">Club Name</label>
                      <input
                        type="text"
                        value={siteSettings.name}
                        onChange={(e) => setSiteSettings({ ...siteSettings, name: e.target.value })}
                        className={`w-full border rounded-xl p-2.5 text-xs ${
                          isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase mb-1">Official Motto</label>
                      <input
                        type="text"
                        value={siteSettings.motto}
                        onChange={(e) => setSiteSettings({ ...siteSettings, motto: e.target.value })}
                        className={`w-full border rounded-xl p-2.5 text-xs ${
                          isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSaveClubInfo(siteSettings);
                      alert('Website settings updated successfully!');
                    }}
                    className="bg-[#FF6321] text-black px-6 py-2.5 rounded-full font-black uppercase italic text-xs tracking-wider cursor-pointer"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
