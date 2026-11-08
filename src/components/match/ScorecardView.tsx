import React, { useState } from 'react';
import { InningsDetails, CricketMatch } from '../../types/cricket';

interface ScorecardViewProps {
  match: CricketMatch;
}

export const ScorecardView: React.FC<ScorecardViewProps> = ({ match }) => {
  // Allow selecting which innings to view (default to current or latest)
  const [activeInningsIndex, setActiveInningsIndex] = useState<number>(() => {
    return Math.max(0, match.innings.length - 1);
  });

  const currentInnings = match.innings[activeInningsIndex] || match.innings[0];

  if (!currentInnings) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
        Scorecard not yet available for this fixture.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Innings Selector Tabs (for multi-innings or 2nd innings) */}
      {match.innings.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
          {match.innings.map((inn, idx) => (
            <button
              key={idx}
              onClick={() => setActiveInningsIndex(idx)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeInningsIndex === idx
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {inn.teamName} Innings {match.format === 'TEST' ? `(${idx < 2 ? '1st' : '2nd'} Inn)` : ''} · {inn.runs}/{inn.wickets}
            </button>
          ))}
        </div>
      )}

      {/* Innings Banner */}
      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-300">
            {currentInnings.teamName} Innings
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
            {currentInnings.runs}/{currentInnings.wickets}{' '}
            <span className="text-sm font-normal text-slate-400">
              ({currentInnings.overs} ov, CRR: {currentInnings.currentRunRate})
            </span>
          </div>
        </div>

        {currentInnings.target && (
          <div className="text-right text-xs">
            <span className="text-slate-400">Target: </span>
            <span className="font-mono tabular-nums text-sky-400 font-bold text-sm">
              {currentInnings.target} runs
            </span>
            {currentInnings.requiredRunRate && (
              <div className="text-slate-400 mt-0.5">
                Req. RR: <span className="font-mono text-emerald-400">{currentInnings.requiredRunRate}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Batting Scorecard Table */}
      <div className="bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Batting</h3>
          <span className="text-[11px] text-slate-500 font-mono">Runs (Balls) · 4s · 6s · SR</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 bg-slate-900/40">
                <th className="py-2.5 px-4">Batter</th>
                <th className="py-2.5 px-2">Dismissal</th>
                <th className="py-2.5 px-3 text-right">R</th>
                <th className="py-2.5 px-3 text-right">B</th>
                <th className="py-2.5 px-3 text-right">4s</th>
                <th className="py-2.5 px-3 text-right">6s</th>
                <th className="py-2.5 px-4 text-right">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {currentInnings.battingFigures.map((b, i) => (
                <tr
                  key={i}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    b.isStriker ? 'bg-sky-950/20' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-medium text-slate-200 whitespace-nowrap">
                    {b.playerName}
                    {b.isStriker && (
                      <span className="ml-1 text-sky-400 font-bold" title="Striker">
                        *
                      </span>
                    )}
                    {b.isNonStriker && (
                      <span className="ml-1 text-slate-400" title="Non-striker">
                        †
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-slate-400 text-[11px] max-w-[200px] truncate">
                    {b.dismissal}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-white font-mono tabular-nums">
                    {b.runs}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400 font-mono tabular-nums">
                    {b.balls}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300 font-mono tabular-nums">
                    {b.fours}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300 font-mono tabular-nums">
                    {b.sixes}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-400 font-mono tabular-nums">
                    {b.strikeRate.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Extras & Total Summary */}
        <div className="px-4 py-3 bg-slate-900/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-slate-400">
            <span className="font-semibold text-slate-300">Extras: </span>
            <span className="font-mono tabular-nums text-white font-semibold">
              {currentInnings.totalExtras}
            </span>{' '}
            <span className="text-[11px] text-slate-500">
              (b {currentInnings.byes}, lb {currentInnings.legByes}, w {currentInnings.wides}, nb {currentInnings.noBalls})
            </span>
          </div>
          <div className="font-semibold text-slate-300">
            Total:{' '}
            <span className="font-mono tabular-nums text-sky-400 font-bold text-sm">
              {currentInnings.runs}/{currentInnings.wickets}
            </span>{' '}
            <span className="text-slate-400 text-xs">
              ({currentInnings.overs} Overs, RR: {currentInnings.currentRunRate})
            </span>
          </div>
        </div>

        {/* Did Not Bat */}
        {currentInnings.didNotBat && currentInnings.didNotBat.length > 0 && (
          <div className="px-4 py-2.5 bg-slate-900/40 border-t border-slate-800/80 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Did not bat: </span>
            {currentInnings.didNotBat.join(', ')}
          </div>
        )}
      </div>

      {/* Bowling Scorecard Table */}
      <div className="bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Bowling</h3>
          <span className="text-[11px] text-slate-500 font-mono">O · M · R · W · ECON · DOTS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 bg-slate-900/40">
                <th className="py-2.5 px-4">Bowler</th>
                <th className="py-2.5 px-3 text-right">O</th>
                <th className="py-2.5 px-3 text-right">M</th>
                <th className="py-2.5 px-3 text-right">R</th>
                <th className="py-2.5 px-3 text-right">W</th>
                <th className="py-2.5 px-3 text-right">ECON</th>
                <th className="py-2.5 px-3 text-right">DOTS</th>
                <th className="py-2.5 px-4 text-right">WD / NB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {currentInnings.bowlingFigures.map((bw, i) => (
                <tr
                  key={i}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    bw.isCurrentBowler ? 'bg-sky-950/20' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-medium text-slate-200 whitespace-nowrap">
                    {bw.playerName}
                    {bw.isCurrentBowler && (
                      <span className="ml-1.5 text-[10px] text-sky-400 font-bold bg-sky-950/80 px-1.5 py-0.5 rounded">
                        Bowling
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-300">
                    {bw.overs}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-400">
                    {bw.maidens}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-300">
                    {bw.runs}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-red-400">
                    {bw.wickets}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-400">
                    {bw.economy.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-400">
                    {bw.dots}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono tabular-nums text-slate-400 text-[11px]">
                    {bw.wides} / {bw.noBalls}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fall of Wickets & Partnerships */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fall of Wickets */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Fall of Wickets
          </h4>
          {currentInnings.fallOfWickets.length > 0 ? (
            <div className="space-y-2 text-xs">
              {currentInnings.fallOfWickets.map((w, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/40">
                  <span className="font-semibold text-slate-200">
                    {w.score}/{w.wicketNumber}{' '}
                    <span className="text-slate-400 font-normal">({w.batsmanName})</span>
                  </span>
                  <span className="text-slate-500 font-mono tabular-nums">
                    {w.over}.{w.ball} ov
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500">No wickets fallen in this innings yet.</div>
          )}
        </div>

        {/* Key Partnerships */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Partnerships
          </h4>
          {currentInnings.partnerships.length > 0 ? (
            <div className="space-y-3 text-xs">
              {currentInnings.partnerships.map((p, idx) => {
                const b1Ratio = (p.batter1Runs / Math.max(p.totalRuns, 1)) * 100;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{p.batter1} ({p.batter1Runs})</span>
                      <span className="font-bold text-white font-mono tabular-nums">
                        {p.totalRuns} runs ({p.totalBalls} balls)
                      </span>
                      <span>{p.batter2} ({p.batter2Runs})</span>
                    </div>
                    {/* Visual proportion bar */}
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="bg-sky-500 h-full" style={{ width: `${b1Ratio}%` }} />
                      <div className="bg-emerald-500 h-full" style={{ width: `${100 - b1Ratio}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-slate-500">No partnerships recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};
