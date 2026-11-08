import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { BarChart2, Users, ArrowRightLeft, ShieldCheck, Zap } from 'lucide-react';
import { PlayerProfile } from '../../types/cricket';

export const StatsView: React.FC = () => {
  const { players, teams } = useCricket();

  const [comparePlayer1Id, setComparePlayer1Id] = useState<string>(players[0]?.id || 'p-virat');
  const [comparePlayer2Id, setComparePlayer2Id] = useState<string>(players[2]?.id || 'p-cummins');
  const [format, setFormat] = useState<'test' | 'odi' | 't20i'>('test');

  const p1 = players.find(p => p.id === comparePlayer1Id) || players[0];
  const p2 = players.find(p => p.id === comparePlayer2Id) || players[1] || players[0];

  const p1Stats = p1 ? p1.careerStats[format] : null;
  const p2Stats = p2 ? p2.careerStats[format] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">Cricket Analytics & Head-to-Head Comparison</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Deep statistical comparison matrix between world cricket champions
            </p>
          </div>

          {/* Format Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            {(['test', 'odi', 't20i'] as const).map(fmt => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg font-semibold uppercase transition-colors ${
                  format === fmt ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Selector Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player 1 Picker */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Player 1:</span>
            <select
              value={comparePlayer1Id}
              onChange={(e) => setComparePlayer1Id(e.target.value)}
              className="bg-slate-950 text-white font-semibold text-sm rounded-lg border border-slate-700 px-3 py-1.5 mt-1 focus:outline-none focus:border-sky-500"
            >
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.country})</option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <span className="text-xs text-sky-400 font-semibold">{p1?.role}</span>
          </div>
        </div>

        {/* Player 2 Picker */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Player 2:</span>
            <select
              value={comparePlayer2Id}
              onChange={(e) => setComparePlayer2Id(e.target.value)}
              className="bg-slate-950 text-white font-semibold text-sm rounded-lg border border-slate-700 px-3 py-1.5 mt-1 focus:outline-none focus:border-sky-500"
            >
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.country})</option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <span className="text-xs text-emerald-400 font-semibold">{p2?.role}</span>
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparison Matrix */}
      {p1Stats && p2Stats && (
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="grid grid-cols-3 p-4 bg-slate-850 border-b border-slate-800 text-center font-bold text-sm">
            <div className="text-left text-sky-400 truncate">{p1.name}</div>
            <div className="text-slate-400 uppercase text-xs tracking-wider">Metrics ({format.toUpperCase()})</div>
            <div className="text-right text-emerald-400 truncate">{p2.name}</div>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs">
            {/* Matches */}
            <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-850/40 transition-colors">
              <div className="font-mono tabular-nums text-sm font-bold text-white text-left">
                {p1Stats.matches}
              </div>
              <div className="text-slate-400 text-center font-medium">Matches Played</div>
              <div className="font-mono tabular-nums text-sm font-bold text-white text-right">
                {p2Stats.matches}
              </div>
            </div>

            {/* Total Runs */}
            <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-850/40 transition-colors">
              <div className="font-mono tabular-nums text-sm font-bold text-sky-400 text-left">
                {p1Stats.runs.toLocaleString()}
              </div>
              <div className="text-slate-400 text-center font-medium">Career Runs</div>
              <div className="font-mono tabular-nums text-sm font-bold text-emerald-400 text-right">
                {p2Stats.runs.toLocaleString()}
              </div>
            </div>

            {/* Batting Average */}
            <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-850/40 transition-colors">
              <div className={`font-mono tabular-nums text-sm font-bold text-left ${p1Stats.battingAverage >= p2Stats.battingAverage ? 'text-emerald-400' : 'text-slate-200'}`}>
                {p1Stats.battingAverage}
              </div>
              <div className="text-slate-400 text-center font-medium">Batting Average</div>
              <div className={`font-mono tabular-nums text-sm font-bold text-right ${p2Stats.battingAverage >= p1Stats.battingAverage ? 'text-emerald-400' : 'text-slate-200'}`}>
                {p2Stats.battingAverage}
              </div>
            </div>

            {/* Strike Rate */}
            <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-850/40 transition-colors">
              <div className="font-mono tabular-nums text-sm font-bold text-left text-white">
                {p1Stats.strikeRate}
              </div>
              <div className="text-slate-400 text-center font-medium">Batting Strike Rate</div>
              <div className="font-mono tabular-nums text-sm font-bold text-right text-white">
                {p2Stats.strikeRate}
              </div>
            </div>

            {/* Centuries */}
            <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-850/40 transition-colors">
              <div className="font-mono tabular-nums text-sm font-bold text-amber-400 text-left">
                {p1Stats.centuries}
              </div>
              <div className="text-slate-400 text-center font-medium">Centuries (100s)</div>
              <div className="font-mono tabular-nums text-sm font-bold text-amber-400 text-right">
                {p2Stats.centuries}
              </div>
            </div>

            {/* Wickets */}
            <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-850/40 transition-colors">
              <div className={`font-mono tabular-nums text-sm font-bold text-left ${p1Stats.wickets >= p2Stats.wickets ? 'text-red-400' : 'text-slate-300'}`}>
                {p1Stats.wickets}
              </div>
              <div className="text-slate-400 text-center font-medium">Career Wickets</div>
              <div className={`font-mono tabular-nums text-sm font-bold text-right ${p2Stats.wickets >= p1Stats.wickets ? 'text-red-400' : 'text-slate-300'}`}>
                {p2Stats.wickets}
              </div>
            </div>

            {/* Best Bowling */}
            <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-850/40 transition-colors">
              <div className="font-mono tabular-nums text-xs text-slate-300 text-left">
                {p1Stats.bestBowling || 'N/A'}
              </div>
              <div className="text-slate-400 text-center font-medium">Best Bowling Figures</div>
              <div className="font-mono tabular-nums text-xs text-slate-300 text-right">
                {p2Stats.bestBowling || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
