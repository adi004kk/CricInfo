import React, { useState } from 'react';
import { Archive, Trophy, Calendar, Award, Shield, ChevronRight } from 'lucide-react';

interface ArchiveTournament {
  year: number;
  tournament: string;
  host: string;
  winner: string;
  flag: string;
  runnerUp: string;
  finalScore: string;
  playerOfTournament: string;
  margin: string;
}

const WORLD_CUP_ARCHIVES: ArchiveTournament[] = [
  {
    year: 2024,
    tournament: "ICC Men's T20 World Cup",
    host: 'West Indies & USA',
    winner: 'India',
    flag: '🇮🇳',
    runnerUp: 'South Africa',
    finalScore: 'IND 176/7 vs SA 169/8',
    playerOfTournament: 'Jasprit Bumrah (15 wkts, 4.17 econ)',
    margin: 'India won by 7 runs'
  },
  {
    year: 2023,
    tournament: "ICC Men's Cricket World Cup (ODI)",
    host: 'India',
    winner: 'Australia',
    flag: '🇦🇺',
    runnerUp: 'India',
    finalScore: 'IND 240 vs AUS 241/4',
    playerOfTournament: 'Virat Kohli (765 runs, 3x100s)',
    margin: 'Australia won by 6 wickets'
  },
  {
    year: 2023,
    tournament: 'ICC World Test Championship Final',
    host: 'The Oval, London',
    winner: 'Australia',
    flag: '🇦🇺',
    runnerUp: 'India',
    finalScore: 'AUS 469 & 270/8d vs IND 296 & 234',
    playerOfTournament: 'Travis Head (163 & 18)',
    margin: 'Australia won by 209 runs'
  },
  {
    year: 2022,
    tournament: "ICC Men's T20 World Cup",
    host: 'Australia',
    winner: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    runnerUp: 'Pakistan',
    finalScore: 'PAK 137/8 vs ENG 138/5',
    playerOfTournament: 'Sam Curran (13 wkts)',
    margin: 'England won by 5 wickets'
  },
  {
    year: 2021,
    tournament: 'ICC World Test Championship Final',
    host: 'Southampton, England',
    winner: 'New Zealand',
    flag: '🇳🇿',
    runnerUp: 'India',
    finalScore: 'IND 217 & 170 vs NZ 249 & 140/2',
    playerOfTournament: 'Kyle Jamieson (5/31 & 2/30)',
    margin: 'New Zealand won by 8 wickets'
  },
  {
    year: 2019,
    tournament: "ICC Cricket World Cup (ODI)",
    host: 'England & Wales',
    winner: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    runnerUp: 'New Zealand',
    finalScore: 'NZ 241/8 & 15/1 vs ENG 241 & 15/0',
    playerOfTournament: 'Kane Williamson (578 runs)',
    margin: 'England won on boundary count after Super Over tie'
  },
  {
    year: 2011,
    tournament: "ICC Cricket World Cup (ODI)",
    host: 'India, Sri Lanka & Bangladesh',
    winner: 'India',
    flag: '🇮🇳',
    runnerUp: 'Sri Lanka',
    finalScore: 'SL 274/6 vs IND 277/4',
    playerOfTournament: 'Yuvraj Singh (362 runs, 15 wkts)',
    margin: 'India won by 6 wickets'
  }
];

export const HistoricalArchives: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'odi' | 't20' | 'test'>('all');

  const filteredTournaments = WORLD_CUP_ARCHIVES.filter(t => {
    if (filterType === 'all') return true;
    if (filterType === 'odi') return t.tournament.includes('ODI') || t.tournament.includes('Cricket World Cup');
    if (filterType === 't20') return t.tournament.includes('T20');
    if (filterType === 'test') return t.tournament.includes('Test');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Historical Cricket Archives & ICC Finals</h1>
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full uppercase">
                  ESPNcricinfo Archive Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete chronicle of World Cup Finals, champions, player of tournament honors, and final margins
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            {(['all', 'odi', 't20', 'test'] as const).map(fmt => (
              <button
                key={fmt}
                onClick={() => setFilterType(fmt)}
                className={`px-3 py-1.5 rounded-lg font-semibold uppercase transition-colors ${
                  filterType === fmt ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {fmt === 'all' ? 'All Finals' : fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Archives Timeline Grid */}
      <div className="space-y-4">
        {filteredTournaments.map((t, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl p-2.5 bg-slate-800/80 rounded-2xl border border-slate-700 shrink-0">
                {t.flag}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-sky-400 text-sm">{t.year}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300 font-semibold">{t.tournament}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-500">Host: {t.host}</span>
                </div>

                <div className="text-base font-bold text-white">
                  Champions: <span className="text-amber-400">{t.winner}</span>{' '}
                  <span className="text-xs font-normal text-slate-400">(Defeated {t.runnerUp})</span>
                </div>

                <div className="text-xs text-slate-300 font-mono">
                  Final Scorecard: {t.finalScore}
                </div>
              </div>
            </div>

            <div className="text-left md:text-right space-y-1 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 w-full md:w-auto">
              <div className="text-xs font-semibold text-emerald-400">{t.margin}</div>
              <div className="text-[11px] text-slate-400">
                MVP: <strong className="text-slate-200">{t.playerOfTournament}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
