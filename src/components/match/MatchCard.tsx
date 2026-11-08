import React from 'react';
import { CricketMatch } from '../../types/cricket';
import { Bell, BellRing, Clock, ArrowRight } from 'lucide-react';
import { useCricket } from '../../context/CricketContext';

interface MatchCardProps {
  match: CricketMatch;
  onSelect?: (matchId: string) => void;
  featured?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onSelect, featured = false }) => {
  const { preferences, toggleMatchReminder } = useCricket();
  const hasReminder = preferences.reminders.includes(match.id);
  const reminderConfig = preferences.reminderConfigs?.[match.id];

  const getTeamScore = (teamCode: string) => {
    if (match.format === 'TEST') {
      const inn1 = match.innings.find(i => i.teamCode === teamCode && (i.inningsNumber === 1 || i.inningsNumber === 2));
      const inn2 = match.innings.find(i => i.teamCode === teamCode && (i.inningsNumber === 3 || i.inningsNumber === 4));
      if (!inn1) return 'Yet to bat';
      return `${inn1.runs}/${inn1.wickets}${inn2 ? ` & ${inn2.runs}/${inn2.wickets}` : ''}`;
    }

    const inn = match.innings.find(i => i.teamCode === teamCode);
    if (!inn) return 'Yet to bat';
    return `${inn.runs}/${inn.wickets} (${inn.overs} ov)`;
  };

  return (
    <div
      onClick={() => onSelect && onSelect(match.id)}
      className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        featured
          ? 'bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 border-sky-500/40 p-5 shadow-lg shadow-sky-950/20'
          : 'bg-slate-900/70 hover:bg-slate-850 border-slate-800 hover:border-slate-700/80 p-4'
      }`}
    >
      {/* Top line: Format, Series & Status indicator */}
      <div className="flex items-center justify-between text-xs mb-3 text-slate-400">
        <div className="flex items-center gap-2 truncate pr-2">
          <span className="font-semibold text-sky-400 text-[11px]">{match.format}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate max-w-[160px] text-slate-300">{match.seriesName}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {match.status === 'live' && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </span>
          )}
          {match.status === 'completed' && (
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              RESULT
            </span>
          )}
          {match.status === 'scheduled' && (
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Upcoming
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMatchReminder(match.id);
            }}
            className={`p-1.5 rounded-lg border transition-all ${
              hasReminder 
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25' 
                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
            title={
              hasReminder 
                ? `Reminder active (${reminderConfig?.leadTimeMinutes ?? 15}m before match). Click to cancel.` 
                : `Set match reminder for ${match.teamHome.name} vs ${match.teamAway.name}`
            }
            aria-label={
              hasReminder 
                ? `Remove reminder for ${match.teamHome.name} vs ${match.teamAway.name}` 
                : `Set reminder for ${match.teamHome.name} vs ${match.teamAway.name}`
            }
          >
            {hasReminder ? (
              <BellRing className="w-3.5 h-3.5" />
            ) : (
              <Bell className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Teams & Scores */}
      <div className="space-y-2.5 my-3">
        {/* Team Home */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{match.teamHome.flag}</span>
            <span className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">
              {match.teamHome.name}
            </span>
          </div>
          <span className="font-mono tabular-nums text-sm font-bold text-slate-100">
            {getTeamScore(match.teamHome.code)}
          </span>
        </div>

        {/* Team Away */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{match.teamAway.flag}</span>
            <span className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">
              {match.teamAway.name}
            </span>
          </div>
          <span className="font-mono tabular-nums text-sm font-bold text-slate-100">
            {getTeamScore(match.teamAway.code)}
          </span>
        </div>
      </div>

      {/* Status Note / Result */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-sky-400 font-medium truncate pr-2">
          {match.resultNote || match.statusNote}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </div>
  );
};
