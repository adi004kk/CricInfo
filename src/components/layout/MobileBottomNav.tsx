import React, { useState } from 'react';
import { useCricket, AppNavTab } from '../../context/CricketContext';
import { Home, Radio, Trophy, FileText, MoreHorizontal, Database, CloudRain, Flame, Archive, Award, Film, X, Bell, BellRing } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeNavTab, setActiveNavTab, matches, preferences, setIsRemindersModalOpen } = useCricket();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const liveMatchesCount = matches.filter(m => m.status === 'live').length;

  const tabs: { id: AppNavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { 
      id: 'matches', 
      label: 'Matches', 
      icon: <Radio className="w-5 h-5" />, 
      badge: liveMatchesCount > 0 ? liveMatchesCount : undefined 
    },
    { id: 'tournaments', label: 'Series', icon: <Trophy className="w-5 h-5" /> },
    { id: 'news', label: 'News', icon: <FileText className="w-5 h-5" /> }
  ];

  const moreFeatures: { id: AppNavTab; label: string; icon: React.ReactNode; tag: string }[] = [
    { id: 'statguru', label: 'Statguru Query Engine', icon: <Database className="w-5 h-5 text-sky-400" />, tag: 'ESPNcricinfo' },
    { id: 'fantasy', label: 'Fantasy XI Match Builder', icon: <Award className="w-5 h-5 text-amber-400" />, tag: 'Cricbuzz' },
    { id: 'polls', label: 'Fan Pulse & Match Predictor', icon: <Flame className="w-5 h-5 text-red-400" />, tag: 'Cricbuzz' },
    { id: 'dls', label: 'DLS Target Calculator', icon: <CloudRain className="w-5 h-5 text-blue-400" />, tag: 'ICC Rules' },
    { id: 'archives', label: 'Historical Cup Archives', icon: <Archive className="w-5 h-5 text-purple-400" />, tag: 'ESPNcricinfo' },
    { id: 'rankings', label: 'ICC Official Rankings', icon: <Trophy className="w-5 h-5 text-emerald-400" />, tag: 'Official' },
    { id: 'videos', label: 'Highlights & Video Hub', icon: <Film className="w-5 h-5 text-pink-400" />, tag: 'Media' }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMoreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-white text-sm">CricInfo+ & Cricbuzz Tools</span>
              <button 
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  setIsRemindersModalOpen(true);
                }}
                className="flex items-center justify-between p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 text-left transition-colors hover:bg-amber-500/20"
              >
                <div className="flex items-center gap-3">
                  <BellRing className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="font-semibold text-xs text-white">Match Reminders</div>
                    <div className="text-[10px] text-amber-300">
                      {preferences.reminders.length} active alerts & countdowns
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                  {preferences.reminders.length}
                </span>
              </button>

              {moreFeatures.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNavTab(item.id);
                    setIsMoreOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${
                    activeNavTab === item.id 
                      ? 'bg-sky-950/70 border-sky-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <div>
                      <div className="font-semibold text-xs text-white">{item.label}</div>
                      <div className="text-[10px] text-slate-500">{item.tag}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800">
        <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2">
          {tabs.map((tab) => {
            const isActive = activeNavTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveNavTab(tab.id)}
                className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 text-center relative group"
              >
                <div className="relative">
                  <span className={`transition-colors ${isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {tab.icon}
                  </span>
                  {tab.badge !== undefined && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                    isActive ? 'text-sky-400 font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 text-center group text-slate-400 hover:text-white"
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-1">
              More
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
