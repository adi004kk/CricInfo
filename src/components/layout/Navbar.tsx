import React from 'react';
import { useCricket, AppNavTab } from '../../context/CricketContext';
import { Search, Radio, Trophy, Film, BarChart2, Sparkles, Moon, Sun, Bell } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { activeNavTab, setActiveNavTab, matches, preferences, setIsRemindersModalOpen } = useCricket();

  const liveCount = matches.filter(m => m.status === 'live').length;

  const navLinks: { id: AppNavTab; label: string }[] = [
    { id: 'matches', label: 'Matches' },
    { id: 'tournaments', label: 'Series' },
    { id: 'statguru', label: 'Statguru' },
    { id: 'fantasy', label: 'Fantasy XI' },
    { id: 'polls', label: 'Fan Pulse' },
    { id: 'dls', label: 'DLS Engine' },
    { id: 'archives', label: 'Archives' },
    { id: 'rankings', label: 'Rankings' },
    { id: 'news', label: 'News' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => setActiveNavTab('home')}
          className="flex items-center gap-2 text-left group whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md group-hover:scale-105 transition-transform">
            C+
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white font-athletic">
            CRICINFO<span className="text-sky-400">+</span>
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeNavTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveNavTab(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                  isActive
                    ? 'text-sky-400 font-semibold border-b-2 border-sky-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Search + Match Reminders) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <Search className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Search players & matches...</span>
            <kbd className="hidden md:inline text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
              /
            </kbd>
          </button>

          <button
            onClick={() => setIsRemindersModalOpen(true)}
            className={`relative p-2 rounded-xl border transition-colors flex items-center justify-center ${
              preferences.reminders.length > 0
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={`Match Reminders (${preferences.reminders.length} active)`}
            aria-label="Match Reminders"
          >
            <Bell className="w-4 h-4" />
            {preferences.reminders.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-md animate-pulse">
                {preferences.reminders.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
