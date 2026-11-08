import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { MatchCard } from '../match/MatchCard';
import { Calendar, ChevronLeft, ChevronRight, Search, Filter, Bell, BellRing } from 'lucide-react';

export const MatchesView: React.FC = () => {
  const { 
    matches, 
    setSelectedMatchId, 
    setActiveNavTab,
    matchStatusFilter, 
    setMatchStatusFilter,
    matchFormatFilter,
    setMatchFormatFilter,
    preferences,
    setIsRemindersModalOpen
  } = useCricket();

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'international' | 'league'>('all');
  const [showRemindersOnly, setShowRemindersOnly] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [selectedDateOffset, setSelectedDateOffset] = useState<number>(0);

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setActiveNavTab('match-center');
  };

  const filteredMatches = matches.filter((m) => {
    if (showRemindersOnly && !preferences.reminders.includes(m.id)) return false;
    if (!showRemindersOnly && matchStatusFilter !== 'all' && m.status !== matchStatusFilter) return false;
    if (matchFormatFilter !== 'all' && m.format !== matchFormatFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      const matchText = `${m.seriesName} ${m.teamHome.name} ${m.teamAway.name} ${m.venue.name} ${m.format}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  const liveMatches = matches.filter(m => m.status === 'live');
  const upcomingMatches = matches.filter(m => m.status === 'scheduled');
  const completedMatches = matches.filter(m => m.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Top Banner & Date Selector */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Cricket Matches & Fixtures</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live scorecards, future tour itineraries, and historical series results
            </p>
          </div>

          {/* Day Navigation */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedDateOffset(prev => prev - 1)}
              className="p-1 hover:text-white text-slate-400 transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 font-medium text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>
                {selectedDateOffset === 0 
                  ? 'Today (Oct 26)' 
                  : selectedDateOffset === 1 
                  ? 'Tomorrow (Oct 27)' 
                  : `Oct ${26 + selectedDateOffset}, 2026`}
              </span>
            </div>
            <button
              onClick={() => setSelectedDateOffset(prev => prev + 1)}
              className="p-1 hover:text-white text-slate-400 transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Filters: All, Live, Upcoming, Completed */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => {
                setShowRemindersOnly(false);
                setMatchStatusFilter('all');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                !showRemindersOnly && matchStatusFilter === 'all'
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              All Matches ({matches.length})
            </button>
            <button
              onClick={() => {
                setShowRemindersOnly(false);
                setMatchStatusFilter('live');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                !showRemindersOnly && matchStatusFilter === 'live'
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              Live ({liveMatches.length})
            </button>
            <button
              onClick={() => {
                setShowRemindersOnly(false);
                setMatchStatusFilter('upcoming');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                !showRemindersOnly && matchStatusFilter === 'upcoming'
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              Upcoming ({upcomingMatches.length})
            </button>
            <button
              onClick={() => {
                setShowRemindersOnly(false);
                setMatchStatusFilter('completed');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                !showRemindersOnly && matchStatusFilter === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              Results ({completedMatches.length})
            </button>

            <button
              onClick={() => setShowRemindersOnly(prev => !prev)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                showRemindersOnly
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : preferences.reminders.length > 0
                  ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-300'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>My Reminders ({preferences.reminders.length})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search team or series..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Format & Category Secondary Sub-bar */}
        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-slate-500 text-[11px] mr-1">Format:</span>
            {(['all', 'TEST', 'ODI', 'T20'] as const).map(fmt => (
              <button
                key={fmt}
                onClick={() => setMatchFormatFilter(fmt)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  matchFormatFilter === fmt ? 'bg-sky-950 text-sky-400 border border-sky-600' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {fmt === 'all' ? 'All Formats' : fmt}
              </button>
            ))}
          </div>

          <span className="text-slate-700">|</span>

          <div className="flex items-center gap-1">
            <span className="text-slate-500 text-[11px] mr-1">Level:</span>
            {(['all', 'international', 'league'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors capitalize ${
                  categoryFilter === cat ? 'bg-sky-950 text-sky-400 border border-sky-600' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixtures Grid */}
      {filteredMatches.length === 0 ? (
        <div className="bg-slate-900/40 rounded-2xl p-12 text-center border border-slate-800 text-slate-400 space-y-3">
          {showRemindersOnly ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-300">No match reminders set yet</h3>
              <p className="text-xs max-w-sm mx-auto">
                Click the bell icon on any upcoming match to receive chimes and alerts before toss and first ball.
              </p>
              <button
                onClick={() => {
                  setShowRemindersOnly(false);
                  setMatchStatusFilter('upcoming');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                Browse Upcoming Matches
              </button>
            </>
          ) : (
            <>
              <Filter className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-semibold text-slate-300">No matches found for this filter</h3>
              <p className="text-xs max-w-sm mx-auto">
                Try resetting your format or status filters to view all international and league fixtures.
              </p>
              <button
                onClick={() => {
                  setMatchStatusFilter('all');
                  setMatchFormatFilter('all');
                  setCategoryFilter('all');
                  setLocalSearch('');
                  setShowRemindersOnly(false);
                }}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map(match => (
            <MatchCard
              key={match.id}
              match={match}
              onSelect={handleSelectMatch}
            />
          ))}
        </div>
      )}
    </div>
  );
};
