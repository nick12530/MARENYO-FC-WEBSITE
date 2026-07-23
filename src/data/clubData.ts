import { Player, MatchFixture, GalleryItem, NewsItem, StandingTeam, KitItem } from '../types';
import marenyoLogo from '../assets/marenyofclogo.jpeg';

// Kit Asset Imports
import kit1Front from '../assets/kit1.png';
import kit1Back from '../assets/kit1back.png';
import kit2Front from '../assets/kit2.png';
import kit3Front from '../assets/kit3.png';
import kit3Back from '../assets/kit3back.png';
import kit5Front from '../assets/kit5.png';
import kit6Front from '../assets/kit6.png';

// Gallery & Media Asset Imports
import AllanLegendImg from '../assets/Allanlegend.jpeg';
import AllanJoseImg from '../assets/allanjose.jpeg';
import MarenyoDayImg from '../assets/marenyoday.jpeg';
import MarenyoDay3Img from '../assets/marenyoday3.jpeg';
import MarenyoMatchdayImg from '../assets/IMG_4736.jpeg';
import CurrentTeamImg from '../assets/currentteam.jpeg';
import SeniorLegendsImg from '../assets/foundingseniorlegends.jpeg';
import HeroImageImg from '../assets/heroimage.jpeg';
import Legends2Img from '../assets/legends2.jpeg';
import LegendsDayImg from '../assets/legendsday.jpeg';
import LegendsOfficialImg from '../assets/legendsofficiial.jpeg';
import TeamMarenyoImg from '../assets/teammarenyo.jpeg';
import TrophyCollectionImg from '../assets/trophycollection.jpeg';
import UpcomingStarsImg from '../assets/upcomingstars.jpeg';

export const ALL_CLUB_ASSETS = [
  { id: 'hero-img', title: 'Official Team Hero Backdrop', url: HeroImageImg, category: 'general' },
  { id: 'current-team', title: 'Marenyo FC Current Senior Squad 2026', url: CurrentTeamImg, category: 'matches' },
  { id: 'senior-legends', title: 'Founding Senior Legends of Marenyo FC', url: SeniorLegendsImg, category: 'celebrations' },
  { id: 'trophy-collection', title: 'Marenyo FC Trophy & Cup Collection', url: TrophyCollectionImg, category: 'trophies' },
  { id: 'upcoming-stars', title: 'Rising Academy Stars & Youth Talents', url: UpcomingStarsImg, category: 'training' },
  { id: 'team-marenyo', title: 'Team Marenyo Matchday Squad', url: TeamMarenyoImg, category: 'matches' },
  { id: 'legends-official', title: 'Official Club Legends Roster', url: LegendsOfficialImg, category: 'fanclub' },
  { id: 'legends-day', title: 'Marenyo Legends Day Festivities', url: LegendsDayImg, category: 'celebrations' },
  { id: 'legends-2', title: 'Legends Pitch Action', url: Legends2Img, category: 'matches' },
  { id: 'marenyo-day', title: 'Marenyo Day Festival', url: MarenyoDayImg, category: 'celebrations' },
  { id: 'allan-jose', title: 'Allan & Jose Matchday Camaraderie', url: AllanJoseImg, category: 'matches' },
  { id: 'allan-legend', title: 'Allan Legend Classic Action', url: AllanLegendImg, category: 'matches' },
  { id: 'matchday-atmosphere', title: 'Sagam Stadium Matchday Crowd', url: MarenyoMatchdayImg, category: 'fanclub' },
  { id: 'marenyo-day-3', title: 'Community Unity in Gem', url: MarenyoDay3Img, category: 'celebrations' },
  { id: 'club-logo', title: 'Marenyo FC Official Logo Crest', url: marenyoLogo, category: 'general' },
];

export const EXACT_ABOUT_STORY = `𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐓𝐇𝐄 𝕄𝔸ℝ𝔼ℕ𝕐🇴 𝔽𝕆𝕆𝕋𝔹𝔸𝕃𝕃 ℂ𝕃𝕌𝔹 & 𝔽𝔸ℕ ℂ𝕃𝕌𝔹 ⚽🏅🏆🧡
𝙽𝚎𝚜𝚝𝚕𝚎𝚍 𝚒𝚗 𝚝𝚑𝚎 𝚑𝚎𝚊𝚛𝚝 𝚘𝚏 𝕾𝖆𝖌𝖆𝖒, 𝙶𝚎𝚖, 𝙼𝚊𝚛𝚎𝚗𝚢𝚘 𝙵𝚘𝚘𝚝𝚋𝚊𝚕𝚕 𝙲𝚕𝚞𝚋 𝚒𝚜 𝚖𝚘𝚛𝚎 𝚝𝚑𝚊𝚗 𝚓𝚞𝚜𝚝 𝚊 𝚏𝚘𝚘𝚝𝚋𝚊𝚕𝚕 𝚝𝚎𝚊𝚖—it 𝚒𝚜 𝚊 𝚜𝚢𝚖𝚋𝚘𝚕 𝚘𝚏 𝓤𝓷𝓲𝓽𝔂, 𝓟𝓻𝓲𝓭𝓮, 𝓪𝓷𝓭 𝓗𝓸怕𝓮 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚌𝚘𝚖𝚖𝚞𝚗𝚒𝚝𝚢. 🧡⚽
𝙵𝚘𝚛 𝚢𝚎𝚊𝚛𝚜, 𝙼𝚊𝚛𝚎𝚗𝚢𝚘 𝙵𝙲 𝚑𝚊𝚜 𝚋𝚛𝚘𝚞𝚐𝚑𝚝 𝚓𝚘𝚢 𝚝𝚘 𝚒𝚝𝚜 𝚜𝚞𝚙𝚙𝚘𝚛𝚝𝚎𝚛𝚜, 𝚗𝚞𝚛𝚝𝚞𝚛𝚎𝚍 𝚢𝚘𝚞𝚗𝚐 𝚝𝚊𝚕𝚎𝚗𝚝, 𝚊𝚗𝚍 𝚙𝚛𝚘𝚟𝚒𝚍𝚎𝚍 𝚊 𝚜𝚝𝚊𝚐𝚎 𝚏𝚘𝚛 𝚛𝚒𝚜𝚒𝚗𝚐 𝚜𝚝𝚊𝚛𝚜 𝚝𝚘 𝚜𝚑𝚒𝚗𝚎. 🌟
𝙻𝚎𝚐𝚎𝚗𝚍𝚜 𝚑𝚊𝚟𝚎 𝚠𝚘𝚛𝚗 𝚝𝚑𝚎 𝙼𝚊𝚛𝚎𝚗𝚢𝚘 𝚓𝚎𝚛𝚜𝚎𝚢, 𝚞𝚗𝚏𝚘𝚛𝚐𝚎𝚝𝚝𝚊𝚋𝚕𝚎 𝚖𝚘𝚖𝚎𝚗𝚝𝚜 𝚑𝚊𝚟𝚎 𝚋𝚎𝚎𝚗 𝚌𝚛𝚎𝚊𝚝𝚎𝚍, 𝚊𝚗𝚍 𝚑𝚒𝚜𝚝𝚘𝚛𝚢 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚠𝚛𝚒𝚝𝚝𝚎𝚗 𝚝𝚒𝚖𝚎 𝚊𝚗𝚍 𝚝𝚒𝚖𝚎 𝚊𝚐𝚊𝚒𝚗. 📖💯
Yet, 𝚝𝚑𝚎 𝚐𝚛𝚎𝚊𝚝𝚎𝚜𝚝 𝚌𝚑𝚊𝚙𝚝𝚎𝚛𝚜 𝚘𝚏 𝚘𝚞𝚛 𝚜𝚝𝚘𝚛𝚢 𝚊𝚛𝚎 𝚜𝚝𝚒𝚕𝚕 𝚊𝚑𝚎𝚊𝚍. 🏁🔱
This 𝚒𝚜 𝚖𝚘𝚛𝚎 𝚝𝚑𝚊𝚗 𝚊 𝚏𝚊𝚗 𝚌𝚕𝚞𝚋—it 𝚒𝚜 𝚊 𝙵𝙰𝙼𝙸🇱𝚈. A place where 𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐄𝐑𝐒, 𝐅𝐎𝐑𝐌𝐄𝐑 𝐏𝐋𝐀𝐘𝐄𝐑𝐒, 𝐂𝐔𝐑𝐑𝐄𝐍𝐓 𝐒𝐓𝐀𝐑𝐒, 𝐚𝐧𝐝 𝐅𝐔𝐓𝐔𝐑𝐄 𝐓𝐀𝐋𝐄𝐍𝐓𝐒 come together to celebrate the beautiful game, uphold our traditions, and build an even brighter future for Marenyo Football Club.
🧡⚽ Once Marenyo, Always Marenyo. Welcome Home! ⚽🧡`;

export const CLEAN_STORY_PARAGRAPHS = [
  "Nestled in the heart of Sagam, Gem, Marenyo Football Club is more than just a football team—it is a symbol of Unity, Pride, and Hope for the community.",
  "For years, Marenyo FC has brought joy to its supporters, nurtured young talent, and provided a stage for rising stars to shine.",
  "Legends have worn the Marenyo jersey, unforgettable moments have been created, and history has been written time and time again.",
  "Yet, the greatest chapters of our story are still ahead.",
  "This is more than a fan club—it is a FAMILY. A place where SUPPORTERS, FORMER PLAYERS, CURRENT STARS, and FUTURE TALENTS come together to celebrate the beautiful game, uphold our traditions, and build an even brighter future for Marenyo Football Club."
];

export const CLUB_INFO = {
  name: "MARENYO FC",
  logoUrl: marenyoLogo,
  motto: "Unity, Pride, and Hope",
  location: "Sagam, Gem, Kenya",
  founded: "2012",
  homeGround: "Sagam Stadium Grounds",
  colors: {
    primary: "#FF6600",
    secondary: "#111827",
    accent: "#F59E0B",
  },
  stats: [
    { label: "Community Pride", value: "100%", icon: "Heart" },
    { label: "Active Fan Members", value: "4,000+", icon: "Users" },
    { label: "Local Trophies Won", value: "14", icon: "Trophy" },
    { label: "Rising Talents Nurtured", value: "120+", icon: "Sparkles" },
  ],
};

// Live Dynamic Data Arrays (Managed & populated via the Admin Portal)
export const PLAYERS: Player[] = [];

export const FIXTURES: MatchFixture[] = [];

export const STANDINGS: StandingTeam[] = [
  { rank: 1, team: "MARENYO FC", played: 0, won: 0, drawn: 0, lost: 0, points: 0, goalDiff: 0, isMarenyo: true },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Marenyo FC Current Squad 2026',
    category: 'matches',
    imageUrl: CurrentTeamImg,
    caption: 'Official squad line-up defending the orange and black colors of Sagam.',
    date: 'July 2026',
    likes: 420,
  },
  {
    id: 'g-2',
    title: 'Marenyo FC Trophy & Cup Collection',
    category: 'trophies',
    imageUrl: TrophyCollectionImg,
    caption: 'Glorious silverware won across years of dedication, team spirit, and local tournaments.',
    date: 'July 2026',
    likes: 512,
  },
  {
    id: 'g-3',
    title: 'Founding Senior Legends of Marenyo',
    category: 'celebrations',
    imageUrl: SeniorLegendsImg,
    caption: 'Honoring the veterans who laid the cornerstone of Marenyo Football Club in Gem.',
    date: 'July 2026',
    likes: 388,
  },
  {
    id: 'g-4',
    title: 'Upcoming Academy Stars & Youth Talents',
    category: 'training',
    imageUrl: UpcomingStarsImg,
    caption: 'The future of Marenyo FC undergoing intensive training for upcoming seasons.',
    date: 'July 2026',
    likes: 290,
  },
  {
    id: 'g-5',
    title: 'Marenyo Legends Day Festivities',
    category: 'celebrations',
    imageUrl: LegendsDayImg,
    caption: 'Celebration of club history with legendary players and passionate supporters.',
    date: 'July 2026',
    likes: 345,
  },
  {
    id: 'g-6',
    title: 'Team Marenyo Matchday Squad',
    category: 'matches',
    imageUrl: TeamMarenyoImg,
    caption: 'United squad focused on victory ahead of kick-off at Sagam Stadium.',
    date: 'July 2026',
    likes: 276,
  },
  {
    id: 'g-7',
    title: 'Official Club Legends Roster',
    category: 'fanclub',
    imageUrl: LegendsOfficialImg,
    caption: 'The iconic icons who built the legacy of Marenyo Football Club.',
    date: 'July 2026',
    likes: 310,
  },
  {
    id: 'g-8',
    title: 'Allan & Jose Matchday Moments',
    category: 'matches',
    imageUrl: AllanJoseImg,
    caption: 'On-field action and camaraderie between club stalwarts at Sagam Stadium.',
    date: 'July 2026',
    likes: 215,
  },
  {
    id: 'g-9',
    title: 'Club Legend Allan In Action',
    category: 'matches',
    imageUrl: AllanLegendImg,
    caption: 'Displaying timeless skill, leadership, and dedication for Marenyo Football Club.',
    date: 'June 2026',
    likes: 198,
  },
  {
    id: 'g-10',
    title: 'Sagam Stadium Matchday Atmosphere',
    category: 'fanclub',
    imageUrl: MarenyoMatchdayImg,
    caption: 'Passionate home crowd cheering on Marenyo FC during a local derby.',
    date: 'July 2026',
    likes: 312,
  },
  {
    id: 'g-11',
    title: 'Marenyo FC Day Celebration at Sagam',
    category: 'celebrations',
    imageUrl: MarenyoDayImg,
    caption: 'Supporters and local community members celebrating Marenyo FC in full orange pride.',
    date: 'July 2026',
    likes: 184,
  },
  {
    id: 'g-12',
    title: 'Legends Pitch Battles',
    category: 'matches',
    imageUrl: Legends2Img,
    caption: 'Classic clash featuring veteran stars in action on the pitch.',
    date: 'July 2026',
    likes: 228,
  },
  {
    id: 'g-13',
    title: 'Community Unity in Gem',
    category: 'celebrations',
    imageUrl: MarenyoDay3Img,
    caption: 'Supporters and community members united in orange pride across Gem County.',
    date: 'July 2026',
    likes: 196,
  },
];

export const NEWS_ARTICLES: NewsItem[] = [];

export const FAN_TIERS_INFO = [
  {
    tier: "Supporter" as const,
    title: "Die-Hard Supporter",
    description: "For the passionate fans who fill the stands, sing the chants, and wear orange with pride.",
    color: "from-orange-500 to-amber-600",
    badge: "🧡 Supporter",
  },
  {
    tier: "Former Player" as const,
    title: "Club Legend / Former Player",
    description: "For the veterans and legends who wore the Marenyo jersey and built our history.",
    color: "from-amber-500 to-yellow-600",
    badge: "🏆 Club Legend",
  },
  {
    tier: "Current Star" as const,
    title: "Current Star Player",
    description: "For active squad members defending the colors on the field week in, week out.",
    color: "from-orange-600 to-red-600",
    badge: "⚽ Star Player",
  },
  {
    tier: "Future Talent" as const,
    title: "Future Talent / Youth Star",
    description: "For the next generation of rising stars training to write tomorrow's chapters.",
    color: "from-amber-400 to-orange-500",
    badge: "🌟 Future Talent",
  }
];

export const DEFAULT_KITS: KitItem[] = [
  {
    id: 'home-kit-2026',
    name: '2026 Official Home Kit',
    type: 'Home Kit',
    primaryColor: '#FF6600',
    secondaryColor: '#111827',
    badgeBg: '#FF6600',
    accentHex: '#FF6321',
    bgGradient: 'from-orange-950/50 via-black to-[#0a0a0a]',
    description: 'The iconic orange and black match strip representing Sagam, Gem pride.',
    defaultName: 'MARENYO',
    defaultNumber: 10,
    customFrontImage: kit1Front,
    customBackImage: kit1Back,
  },
  {
    id: 'away-kit-2026',
    name: '2026 Away Victory Kit',
    type: 'Away Kit',
    primaryColor: '#18181b',
    secondaryColor: '#FF6600',
    badgeBg: '#18181b',
    accentHex: '#FF6321',
    bgGradient: 'from-zinc-950/60 via-black to-[#0a0a0a]',
    description: 'Sleek black & orange away armor engineered for away match dominance.',
    defaultName: 'MARENYO',
    defaultNumber: 7,
    customFrontImage: kit2Front,
    customBackImage: null,
  },
  {
    id: 'third-kit-2026',
    name: '2026 Heritage Third Kit',
    type: 'Third Kit',
    primaryColor: '#059669',
    secondaryColor: '#FFFFFF',
    badgeBg: '#059669',
    accentHex: '#10b981',
    bgGradient: 'from-emerald-950/50 via-black to-[#0a0a0a]',
    description: 'Celebrating the green rolling hills and rich heritage of Sagam & Gem.',
    defaultName: 'SAGAM',
    defaultNumber: 9,
    customFrontImage: kit3Front,
    customBackImage: kit3Back,
  },
  {
    id: 'gk-kit-2026',
    name: '2026 Goalkeeper Shield Kit',
    type: 'Goalkeeper Kit',
    primaryColor: '#2563eb',
    secondaryColor: '#1e293b',
    badgeBg: '#2563eb',
    accentHex: '#3b82f6',
    bgGradient: 'from-blue-950/50 via-black to-[#0a0a0a]',
    description: 'Vibrant blue keeper uniform guarding the goal at Sagam Stadium.',
    defaultName: 'ONYANGO',
    defaultNumber: 1,
    customFrontImage: kit5Front,
    customBackImage: null,
  },
  {
    id: 'training-kit-2026',
    name: '2026 Academy & Training Kit',
    type: 'Training Kit',
    primaryColor: '#d97706',
    secondaryColor: '#111827',
    badgeBg: '#d97706',
    accentHex: '#f59e0b',
    bgGradient: 'from-amber-950/50 via-black to-[#0a0a0a]',
    description: 'Official high-performance training kit for players and rising youth stars.',
    defaultName: 'ACADEMY',
    defaultNumber: 22,
    customFrontImage: kit6Front,
    customBackImage: null,
  },
];
