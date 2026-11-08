/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CricketProvider, useCricket } from './context/CricketContext';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { SearchModal } from './components/layout/SearchModal';
import { HomeView } from './components/views/HomeView';
import { MatchesView } from './components/views/MatchesView';
import { MatchCenter } from './components/match/MatchCenter';
import { TournamentsView } from './components/views/TournamentsView';
import { RankingsView } from './components/views/RankingsView';
import { StatsView } from './components/views/StatsView';
import { PlayersView } from './components/views/PlayersView';
import { TeamsView } from './components/views/TeamsView';
import { NewsView } from './components/views/NewsView';
import { VideosView } from './components/views/VideosView';

import { StatguruEngine } from './components/features/StatguruEngine';
import { FantasyXIBuilder } from './components/features/FantasyXIBuilder';
import { DlsCalculator } from './components/features/DlsCalculator';
import { FanPollsPredictor } from './components/features/FanPollsPredictor';
import { HistoricalArchives } from './components/features/HistoricalArchives';
import { StickyLiveScoreTicker } from './components/layout/StickyLiveScoreTicker';
import { MatchRemindersModal } from './components/features/MatchRemindersModal';
import { ToastNotification } from './components/layout/ToastNotification';

const AppContent: React.FC = () => {
  const { activeNavTab, selectedMatch, setActiveNavTab } = useCricket();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-white pb-14">
      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-16">
        {activeNavTab === 'home' && <HomeView />}
        {activeNavTab === 'matches' && <MatchesView />}
        {activeNavTab === 'match-center' && selectedMatch && (
          <MatchCenter match={selectedMatch} onBack={() => setActiveNavTab('matches')} />
        )}
        {activeNavTab === 'tournaments' && <TournamentsView />}
        {activeNavTab === 'statguru' && <StatguruEngine />}
        {activeNavTab === 'fantasy' && <FantasyXIBuilder />}
        {activeNavTab === 'polls' && <FanPollsPredictor />}
        {activeNavTab === 'dls' && <DlsCalculator />}
        {activeNavTab === 'archives' && <HistoricalArchives />}
        {activeNavTab === 'rankings' && <RankingsView />}
        {activeNavTab === 'stats' && <StatsView />}
        {activeNavTab === 'players' && <PlayersView />}
        {activeNavTab === 'teams' && <TeamsView />}
        {activeNavTab === 'news' && <NewsView />}
        {activeNavTab === 'videos' && <VideosView />}
      </main>

      {/* Sticky Cricbuzz Live Score Ticker & Audio Bar */}
      <StickyLiveScoreTicker />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white font-athletic tracking-wider text-sm">
              CRICINFO<span className="text-sky-400">+</span>
            </span>
            <span>· Cricket Intelligence & Live Match Centre</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Verified Rules Engine</span>
            <span>·</span>
            <span>Ball-by-Ball Simulator</span>
            <span>·</span>
            <span>ICC Official Records</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Match Reminders Modal */}
      <MatchRemindersModal />

      {/* Global Toast Notification */}
      <ToastNotification />

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <CricketProvider>
      <AppContent />
    </CricketProvider>
  );
}
