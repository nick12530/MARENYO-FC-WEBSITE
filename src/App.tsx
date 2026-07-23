import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PlayerProfileSection } from './components/PlayerProfileSection';
import { JerseysSection } from './components/JerseysSection';
import { FixturesSection } from './components/FixturesSection';
import { GallerySection } from './components/GallerySection';
import { FanClubSection } from './components/FanClubSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingNav } from './components/FloatingNav';
import { AdminModal } from './components/AdminModal';
import { AuthModal } from './components/AuthModal';
import { PLAYERS, FIXTURES, CLUB_INFO, DEFAULT_KITS } from './data/clubData';
import { Player, MatchFixture, KitItem, User } from './types';
import { Language } from './data/translations';

export default function App() {
  // Theme Toggle State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('marenyo_theme');
    return saved ? saved === 'dark' : true;
  });

  // Language Toggle State (EN, LUO, SW)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('marenyo_lang');
    return (saved as Language) || 'EN';
  });

  // Optional Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('marenyo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('marenyo_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('marenyo_lang', language);
  }, [language]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // State with LocalStorage persistence for Admin edits
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('marenyo_players');
    return saved ? JSON.parse(saved) : PLAYERS;
  });

  const [fixtures, setFixtures] = useState<MatchFixture[]>(() => {
    const saved = localStorage.getItem('marenyo_fixtures');
    return saved ? JSON.parse(saved) : FIXTURES;
  });

  const [clubInfo, setClubInfo] = useState(() => {
    const saved = localStorage.getItem('marenyo_clubinfo');
    return saved ? JSON.parse(saved) : CLUB_INFO;
  });

  const [kits, setKits] = useState<KitItem[]>(() => {
    const saved = localStorage.getItem('marenyo_kits');
    return saved ? JSON.parse(saved) : DEFAULT_KITS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFullRosterModalOpen, setIsFullRosterModalOpen] = useState(false);

  const handleSavePlayers = (updated: Player[]) => {
    setPlayers(updated);
    localStorage.setItem('marenyo_players', JSON.stringify(updated));
  };

  const handleSaveFixtures = (updated: MatchFixture[]) => {
    setFixtures(updated);
    localStorage.setItem('marenyo_fixtures', JSON.stringify(updated));
  };

  const handleSaveClubInfo = (updated: any) => {
    setClubInfo(updated);
    localStorage.setItem('marenyo_clubinfo', JSON.stringify(updated));
  };

  const handleSaveKits = (updated: KitItem[]) => {
    setKits(updated);
    localStorage.setItem('marenyo_kits', JSON.stringify(updated));
  };

  const scrollToFanClub = () => {
    const element = document.getElementById('fanclub');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRosterTab = () => {
    const element = document.getElementById('profiles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsFullRosterModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen font-sans selection:bg-[#FF6321] selection:text-black transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0a0a0a] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Floating Glassmorphism Navigation */}
      <FloatingNav
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRosterTab={handleOpenRosterTab}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Top Header Navigation */}
      <Navbar
        onOpenFanClubModal={scrollToFanClub}
        onOpenAdminModal={() => setIsAdminOpen(true)}
        onOpenRosterTab={handleOpenRosterTab}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        language={language}
        onLanguageChange={setLanguage}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          localStorage.removeItem('marenyo_user');
          setCurrentUser(null);
        }}
      />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreSquad={handleOpenRosterTab}
          isDarkMode={isDarkMode}
          language={language}
        />

        {/* About Section */}
        <AboutSection
          onOpenFanClubModal={scrollToFanClub}
          isDarkMode={isDarkMode}
        />

        {/* Player Profile Segment */}
        <PlayerProfileSection
          players={players}
          isDarkMode={isDarkMode}
          isOpenFullRosterModal={isFullRosterModalOpen}
          onToggleFullRosterModal={setIsFullRosterModalOpen}
        />

        {/* Club Jerseys Showcase Section */}
        <JerseysSection
          kits={kits}
          isDarkMode={isDarkMode}
          language={language}
        />

        {/* Fixtures & Results Section */}
        <FixturesSection isDarkMode={isDarkMode} />

        {/* Picture Gallery Section */}
        <GallerySection isDarkMode={isDarkMode} />

        {/* Fan Club Section */}
        <FanClubSection
          isDarkMode={isDarkMode}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Contact Hotline & Map Section */}
        <ContactSection isDarkMode={isDarkMode} />
      </main>

      {/* Footer with Admin Portal Link */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} isDarkMode={isDarkMode} />

      {/* Optional Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(u) => {
          setCurrentUser(u);
        }}
        isDarkMode={isDarkMode}
      />

      {/* Admin Portal Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        players={players}
        fixtures={fixtures}
        clubInfo={clubInfo}
        kits={kits}
        onSavePlayers={handleSavePlayers}
        onSaveFixtures={handleSaveFixtures}
        onSaveClubInfo={handleSaveClubInfo}
        onSaveKits={handleSaveKits}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

