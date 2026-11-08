import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { Shield, Sparkles, CheckCircle2, AlertCircle, Trophy, UserCheck, Star, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FantasyPlayer {
  id: string;
  name: string;
  team: string;
  role: 'WK' | 'BAT' | 'ALL' | 'BOWL';
  credits: number;
  projectedPoints: number;
  recentForm: string;
}

const AVAILABLE_FANTASY_PLAYERS: FantasyPlayer[] = [
  // Wicketkeepers
  { id: 'f-pant', name: 'Rishabh Pant', team: 'IND', role: 'WK', credits: 9.5, projectedPoints: 88, recentForm: '84, 45, 78' },
  { id: 'f-carey', name: 'Alex Carey', team: 'AUS', role: 'WK', credits: 8.5, projectedPoints: 52, recentForm: '35, 31, 44' },
  // Batters
  { id: 'f-virat', name: 'Virat Kohli', team: 'IND', role: 'BAT', credits: 10.5, projectedPoints: 110, recentForm: '78, 67, 70' },
  { id: 'f-rohit', name: 'Rohit Sharma', team: 'IND', role: 'BAT', credits: 9.5, projectedPoints: 72, recentForm: '58, 34, 19' },
  { id: 'f-jaiswal', name: 'Yashasvi Jaiswal', team: 'IND', role: 'BAT', credits: 9.0, projectedPoints: 82, recentForm: '64, 42, 102' },
  { id: 'f-head', name: 'Travis Head', team: 'AUS', role: 'BAT', credits: 10.0, projectedPoints: 95, recentForm: '82, 62, 119' },
  { id: 'f-smith', name: 'Steve Smith', team: 'AUS', role: 'BAT', credits: 9.5, projectedPoints: 80, recentForm: '89, 24, 48' },
  { id: 'f-khawaja', name: 'Usman Khawaja', team: 'AUS', role: 'BAT', credits: 8.5, projectedPoints: 68, recentForm: '74, 28, 55' },
  // All-Rounders
  { id: 'f-cummins', name: 'Pat Cummins', team: 'AUS', role: 'ALL', credits: 9.5, projectedPoints: 92, recentForm: '3w, 28r, 2w' },
  { id: 'f-jadeja', name: 'Ravindra Jadeja', team: 'IND', role: 'ALL', credits: 9.0, projectedPoints: 85, recentForm: '3w, 14r, 2w' },
  { id: 'f-ashwin', name: 'Ravichandran Ashwin', team: 'IND', role: 'ALL', credits: 8.5, projectedPoints: 74, recentForm: '2w, 1w, 25r' },
  // Bowlers
  { id: 'f-bumrah', name: 'Jasprit Bumrah', team: 'IND', role: 'BOWL', credits: 10.5, projectedPoints: 125, recentForm: '4w, 4w, 3w' },
  { id: 'f-starc', name: 'Mitchell Starc', team: 'AUS', role: 'BOWL', credits: 9.0, projectedPoints: 84, recentForm: '3w, 2w, 2w' },
  { id: 'f-hazlewood', name: 'Josh Hazlewood', team: 'AUS', role: 'BOWL', credits: 8.5, projectedPoints: 70, recentForm: '2w, 1w, 3w' },
  { id: 'f-lyon', name: 'Nathan Lyon', team: 'AUS', role: 'BOWL', credits: 8.5, projectedPoints: 68, recentForm: '2w, 1w, 4w' },
  { id: 'f-siraj', name: 'Mohammed Siraj', team: 'IND', role: 'BOWL', credits: 8.5, projectedPoints: 65, recentForm: '2w, 2w, 1w' }
];

export const FantasyXIBuilder: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['f-virat', 'f-bumrah', 'f-cummins', 'f-pant', 'f-head']);
  const [captainId, setCaptainId] = useState<string | null>('f-bumrah');
  const [viceCaptainId, setViceCaptainId] = useState<string | null>('f-virat');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'WK' | 'BAT' | 'ALL_ROUND' | 'BOWL'>('ALL');

  const selectedPlayers = AVAILABLE_FANTASY_PLAYERS.filter(p => selectedIds.includes(p.id));

  // Calculations
  const usedCredits = selectedPlayers.reduce((acc, p) => acc + p.credits, 0);
  const remainingCredits = parseFloat((100 - usedCredits).toFixed(1));
  const teamIndCount = selectedPlayers.filter(p => p.team === 'IND').length;
  const teamAusCount = selectedPlayers.filter(p => p.team === 'AUS').length;

  const wkCount = selectedPlayers.filter(p => p.role === 'WK').length;
  const batCount = selectedPlayers.filter(p => p.role === 'BAT').length;
  const allCount = selectedPlayers.filter(p => p.role === 'ALL').length;
  const bowlCount = selectedPlayers.filter(p => p.role === 'BOWL').length;

  const isValidSquad = 
    selectedPlayers.length === 11 && 
    remainingCredits >= 0 && 
    wkCount >= 1 && 
    batCount >= 3 && 
    allCount >= 1 && 
    bowlCount >= 3 &&
    teamIndCount <= 7 &&
    teamAusCount <= 7 &&
    captainId !== null &&
    viceCaptainId !== null;

  const togglePlayer = (player: FantasyPlayer) => {
    if (selectedIds.includes(player.id)) {
      setSelectedIds(prev => prev.filter(id => id !== player.id));
      if (captainId === player.id) setCaptainId(null);
      if (viceCaptainId === player.id) setViceCaptainId(null);
    } else {
      if (selectedIds.length >= 11) return;
      if (usedCredits + player.credits > 100) return;
      setSelectedIds(prev => [...prev, player.id]);
    }
  };

  const handleSaveTeam = () => {
    if (isValidSquad) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#0ea5e9', '#10b981', '#f59e0b']
      });
    }
  };

  const filteredPool = AVAILABLE_FANTASY_PLAYERS.filter(p => {
    if (roleFilter === 'ALL') return true;
    if (roleFilter === 'ALL_ROUND') return p.role === 'ALL';
    return p.role === roleFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Cricbuzz Fantasy Match XI Builder</h1>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase">
                  100 Credit Budget
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Build your optimal XI for India vs Australia (3rd Test). Select 11 players, pick 2x Captain & 1.5x Vice Captain.
              </p>
            </div>
          </div>

          <button
            onClick={handleSaveTeam}
            disabled={!isValidSquad}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isValidSquad
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Save & Enter Contest
          </button>
        </div>

        {/* Squad Budget & Composition Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Squad Size</span>
            <span className={`text-base font-bold font-mono tabular-nums mt-0.5 block ${selectedPlayers.length === 11 ? 'text-emerald-400' : 'text-sky-400'}`}>
              {selectedPlayers.length} / 11
            </span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Credits Left</span>
            <span className={`text-base font-bold font-mono tabular-nums mt-0.5 block ${remainingCredits < 0 ? 'text-red-400' : 'text-amber-400'}`}>
              {remainingCredits} / 100
            </span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Team Split</span>
            <span className="text-base font-bold font-mono tabular-nums text-white mt-0.5 block">
              IND: {teamIndCount} · AUS: {teamAusCount}
            </span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Roles Split</span>
            <span className="text-xs font-mono tabular-nums text-slate-300 mt-1 block">
              WK:{wkCount} · BAT:{batCount} · AR:{allCount} · BW:{bowlCount}
            </span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Captain (2x)</span>
            <span className="text-xs font-semibold text-amber-400 truncate mt-1 block">
              {captainId ? AVAILABLE_FANTASY_PLAYERS.find(p => p.id === captainId)?.name : 'Not Picked'}
            </span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Vice-Captain (1.5x)</span>
            <span className="text-xs font-semibold text-sky-400 truncate mt-1 block">
              {viceCaptainId ? AVAILABLE_FANTASY_PLAYERS.find(p => p.id === viceCaptainId)?.name : 'Not Picked'}
            </span>
          </div>
        </div>
      </div>

      {/* Role Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800 overflow-x-auto text-xs">
        {[
          { id: 'ALL', label: 'All Pool' },
          { id: 'WK', label: 'Wicketkeepers (1-2)' },
          { id: 'BAT', label: 'Batters (3-5)' },
          { id: 'ALL_ROUND', label: 'All-Rounders (1-3)' },
          { id: 'BOWL', label: 'Bowlers (3-5)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setRoleFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              roleFilter === tab.id ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Player Pool List */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
          <h3 className="font-bold text-white uppercase tracking-wider">Player Selection Pool</h3>
          <span className="text-slate-400 font-mono text-[11px]">Click to add/remove · Assign C & VC</span>
        </div>

        <div className="divide-y divide-slate-800/60 text-xs">
          {filteredPool.map(player => {
            const isSelected = selectedIds.includes(player.id);
            const isC = captainId === player.id;
            const isVC = viceCaptainId === player.id;

            return (
              <div
                key={player.id}
                className={`p-3.5 flex items-center justify-between transition-colors ${
                  isSelected ? 'bg-sky-950/30' : 'hover:bg-slate-850/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => togglePlayer(player)}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      isSelected ? 'bg-sky-500 border-sky-400 text-white' : 'border-slate-700 bg-slate-950'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 fill-current" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{player.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium">
                        {player.team}
                      </span>
                      <span className="text-[10px] text-sky-400 font-semibold">{player.role}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Recent Form: {player.recentForm} · Proj: {player.projectedPoints} pts
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Credits */}
                  <div className="font-mono tabular-nums font-bold text-amber-400 text-sm">
                    {player.credits} Cr
                  </div>

                  {/* C and VC Buttons */}
                  {isSelected && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setCaptainId(player.id);
                          if (viceCaptainId === player.id) setViceCaptainId(null);
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-colors ${
                          isC ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                        title="Set as Captain (2x points)"
                      >
                        C
                      </button>

                      <button
                        onClick={() => {
                          setViceCaptainId(player.id);
                          if (captainId === player.id) setCaptainId(null);
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-colors ${
                          isVC ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                        title="Set as Vice-Captain (1.5x points)"
                      >
                        VC
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
