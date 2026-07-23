export type PlayerPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward' | 'Coaching Staff';

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets?: number;
  tackles?: number;
  passAccuracy?: number;
}

export interface PlayerAttributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defense: number;
  physicality: number;
}

export interface Player {
  id: string;
  name: string;
  nickname?: string;
  number: number;
  position: PlayerPosition;
  photoUrl: string;
  bio: string;
  birthplace: string;
  age: number;
  height: string;
  preferredFoot: 'Right' | 'Left' | 'Both';
  joinedYear: number;
  stats: PlayerStats;
  attributes: PlayerAttributes;
  quote?: string;
  isCaptain?: boolean;
  isKeyPlayer?: boolean;
  isLegend?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  village?: string;
  joinedDate?: string;
  avatarUrl?: string;
  memberId?: string;
}

export interface MatchFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: 'upcoming' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
  matchReport?: string;
  scorers?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'matches' | 'celebrations' | 'fanclub' | 'training' | 'trophies';
  imageUrl: string;
  caption: string;
  date: string;
  likes: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Match Report' | 'Community' | 'Transfer' | 'Academy';
  imageUrl: string;
  author: string;
}

export type FanTier = 'Supporter' | 'Former Player' | 'Current Star' | 'Future Talent';

export interface FanMember {
  id: string;
  name: string;
  tier: FanTier;
  memberId: string;
  joinedDate: string;
  village: string;
  favoritePlayer?: string;
  avatarUrl?: string;
}

export interface StandingTeam {
  rank: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalDiff: number;
  isMarenyo?: boolean;
}

export interface KitItem {
  id: string;
  name: string;
  type: string;
  primaryColor: string;
  secondaryColor: string;
  badgeBg: string;
  accentHex: string;
  bgGradient: string;
  description: string;
  defaultName: string;
  defaultNumber: number;
  customFrontImage?: string | null;
  customBackImage?: string | null;
}
