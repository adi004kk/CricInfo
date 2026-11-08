import React from 'react';
import { useCricket } from '../../context/CricketContext';
import { Heart, Trophy, Users, Shield, ArrowRight } from 'lucide-react';

export const TeamsView: React.FC = () => {
  const { teams, selectedTeam, setSelectedTeamId, preferences, toggleFavoriteTeam, matches, setSelectedMatchId, setActiveNavTab } = useCricket();

  const team = selectedTeam || teams[0];

  if (!team) {
    return <div className="p-8 text-slate-400">Loading teams...</div>;
  }

  const isFavorite = preferences.favoriteTeams.includes(team.code);
  const teamMatches = matches.filter(m => m.teamHome.code === team.code || m.teamAway.code === team.code);

  return (
    <div className="space-y-6">
      {/* Team Header Banner */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="text-5xl p-2 bg-slate-800/80 rounded-2xl border border-slate-700 shrink-0">
              {team.flag}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white">{team.name}</h1>
                <button
                  onClick={() => toggleFavoriteTeam(team.code)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isFavorite
                      ? 'bg-red-500/20 border-red-500/50 text-red-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title="Favorite Team"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                <span>Code: <strong className="text-white font-mono">{team.code}</strong></span>
                {team.captain && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Captain: <strong className="text-sky-400">{team.captain}</strong></span>
                  </>
                )}
                {team.coach && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Coach: <strong className="text-slate-300">{team.coach}</strong></span>
                  </>
                )}
              </div>

              {team.description && (
                <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {team.description}
                </p>
              )}
            </div>
          </div>

          {/* Quick Team Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {teams.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTeamId(t.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  team.code === t.code
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{t.flag}</span>
                <span>{t.shortName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Team Rankings & Form Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          {team.ranking && (
            <div className="flex items-center gap-4">
              <span className="text-slate-500 font-medium">Official ICC Rank:</span>
              {team.ranking.test && (
                <span className="bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-medium">
                  Test: <strong className="text-sky-400 font-mono">#{team.ranking.test}</strong>
                </span>
              )}
              {team.ranking.odi && (
                <span className="bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-medium">
                  ODI: <strong className="text-sky-400 font-mono">#{team.ranking.odi}</strong>
                </span>
              )}
              {team.ranking.t20i && (
                <span className="bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-medium">
                  T20I: <strong className="text-sky-400 font-mono">#{team.ranking.t20i}</strong>
                </span>
              )}
            </div>
          )}

          {team.recentForm && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Recent Form:</span>
              <div className="flex items-center gap-1">
                {team.recentForm.map((f, i) => (
                  <span
                    key={i}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                      f === 'W'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Team Matches & Fixtures */}
      <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          {team.name} Series & Fixtures
        </h3>

        {teamMatches.length === 0 ? (
          <div className="text-xs text-slate-500 py-4">No recent matches recorded.</div>
        ) : (
          <div className="divide-y divide-slate-800/60 text-xs">
            {teamMatches.map(m => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMatchId(m.id);
                  setActiveNavTab('match-center');
                }}
                className="py-3 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-white">
                    {m.teamHome.name} vs {m.teamAway.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {m.seriesName} · {m.format} · {m.venue.name}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <span className={`text-[11px] font-semibold ${
                    m.status === 'live' ? 'text-red-400 animate-pulse' : 'text-slate-300'
                  }`}>
                    {m.resultNote || m.statusNote}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 hover:text-sky-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
