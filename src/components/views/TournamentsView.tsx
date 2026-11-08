import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { Trophy, ChevronRight, Award, Shield, Flame } from 'lucide-react';

export const TournamentsView: React.FC = () => {
  const { tournaments, selectedTournament, setSelectedTournamentId, setSelectedTeamId, setActiveNavTab } = useCricket();
  const [activeTab, setActiveTab] = useState<'table' | 'batting' | 'bowling'>('table');

  const currentTournament = selectedTournament || tournaments[0];

  if (!currentTournament) {
    return <div className="p-8 text-slate-400">Loading tournaments...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Tournament Selector Header */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{currentTournament.name}</h1>
              <p className="text-xs text-slate-400">
                Season {currentTournament.season} · {currentTournament.hostCountry} · {currentTournament.format}
              </p>
            </div>
          </div>

          {/* Quick tournament switcher */}
          <div className="flex items-center gap-2">
            {tournaments.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTournamentId(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  currentTournament.id === t.id
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'table' ? 'bg-sky-950 text-sky-400 border border-sky-600' : 'text-slate-400 hover:text-white'
            }`}
          >
            Points Table & Standings
          </button>
          <button
            onClick={() => setActiveTab('batting')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'batting' ? 'bg-sky-950 text-sky-400 border border-sky-600' : 'text-slate-400 hover:text-white'
            }`}
          >
            Top Run Scorers (Orange Cap / Batting)
          </button>
          <button
            onClick={() => setActiveTab('bowling')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'bowling' ? 'bg-sky-950 text-sky-400 border border-sky-600' : 'text-slate-400 hover:text-white'
            }`}
          >
            Top Wicket Takers (Purple Cap / Bowling)
          </button>
        </div>
      </div>

      {/* Tab 1: Points Table */}
      {activeTab === 'table' && (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">Tournament Standings</h3>
            <span className="text-slate-400">Top 2 qualify for Final at Lord’s</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 bg-slate-900/40">
                  <th className="py-3 px-4"># Pos</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-3 text-right">P</th>
                  <th className="py-3 px-3 text-right">W</th>
                  <th className="py-3 px-3 text-right">L</th>
                  <th className="py-3 px-3 text-right">T / NR</th>
                  <th className="py-3 px-3 text-right">PTS</th>
                  <th className="py-3 px-4 text-right">PCT / NRR</th>
                  <th className="py-3 px-4 text-center">Recent Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {currentTournament.standings.map((row) => (
                  <tr
                    key={row.position}
                    onClick={() => {
                      setSelectedTeamId(row.team.code);
                      setActiveNavTab('teams');
                    }}
                    className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                      row.position <= 2 ? 'bg-sky-950/15' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-300">
                      {row.position}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{row.team.flag}</span>
                        <span>{row.team.name}</span>
                        {row.position <= 2 && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            Q
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                      {row.played}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-400 font-bold">
                      {row.won}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-red-400">
                      {row.lost}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-400">
                      {row.tied + row.noResult}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-sky-400 text-sm">
                      {row.points}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-200 font-semibold">
                      {row.netRunRate > 0 ? `+${row.netRunRate}` : row.netRunRate}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        {row.recentForm.map((f, i) => (
                          <span
                            key={i}
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                              f === 'W'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : f === 'L'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Top Batters */}
      {activeTab === 'batting' && (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">Tournament Leading Batters</h3>
            <span className="text-slate-400 font-mono">Runs · Avg · Strike Rate · 100s</span>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs">
            {currentTournament.topBatters.map((b, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-bold text-sky-400 w-6">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-white">{b.name}</div>
                    <div className="text-[11px] text-slate-400">{b.team} · {b.innings} innings</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono tabular-nums text-right">
                  <div>
                    <span className="text-xs text-slate-400 block">Avg</span>
                    <span className="font-semibold text-slate-200">{b.average}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">SR</span>
                    <span className="font-semibold text-slate-200">{b.strikeRate}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">100s</span>
                    <span className="font-semibold text-slate-200">{b.hundreds}</span>
                  </div>
                  <div className="w-20">
                    <span className="text-xs text-slate-400 block">Runs</span>
                    <span className="text-lg font-bold text-sky-400">{b.runs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Top Bowlers */}
      {activeTab === 'bowling' && (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">Tournament Leading Bowlers</h3>
            <span className="text-slate-400 font-mono">Wickets · Avg · Economy · BBI</span>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs">
            {currentTournament.topBowlers.map((bw, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-bold text-red-400 w-6">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-white">{bw.name}</div>
                    <div className="text-[11px] text-slate-400">{bw.team} · {bw.overs} overs</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono tabular-nums text-right">
                  <div>
                    <span className="text-xs text-slate-400 block">Avg</span>
                    <span className="font-semibold text-slate-200">{bw.average}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Econ</span>
                    <span className="font-semibold text-slate-200">{bw.economy}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">BBI</span>
                    <span className="font-semibold text-slate-200">{bw.bestBowling}</span>
                  </div>
                  <div className="w-20">
                    <span className="text-xs text-slate-400 block">Wickets</span>
                    <span className="text-lg font-bold text-red-400">{bw.wickets}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
