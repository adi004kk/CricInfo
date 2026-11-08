import React from 'react';
import { useCricket } from '../../context/CricketContext';
import { Volume2, VolumeX, Sparkles, Play, Pause, ChevronRight, Radio } from 'lucide-react';

export const StickyLiveScoreTicker: React.FC = () => {
  const { 
    matches, 
    selectedMatchId, 
    setSelectedMatchId, 
    activeNavTab, 
    setActiveNavTab,
    isLiveSimulationActive,
    setIsLiveSimulationActive,
    isAudioCommentaryEnabled,
    setIsAudioCommentaryEnabled,
    simulateNextBall
  } = useCricket();

  const liveMatches = matches.filter(m => m.status === 'live');
  const activeMatch = liveMatches[0] || matches[0];

  if (!activeMatch) return null;

  // Don't duplicate if already in the detailed Match Centre
  if (activeNavTab === 'match-center') return null;

  const currentInnings = activeMatch.innings[activeMatch.currentInningsIndex] || activeMatch.innings[0];
  const striker = currentInnings?.battingFigures.find(b => b.isStriker) || currentInnings?.battingFigures[0];
  const bowler = currentInnings?.bowlingFigures.find(b => b.isCurrentBowler) || currentInnings?.bowlingFigures[0];

  const handleOpenMatch = () => {
    setSelectedMatchId(activeMatch.id);
    setActiveNavTab('match-center');
  };

  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-sky-500/30 px-3 sm:px-6 py-2 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Left: Live Match Score Snapshot */}
        <div 
          onClick={handleOpenMatch}
          className="flex items-center gap-3 cursor-pointer group flex-1 truncate"
        >
          {/* Live Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </div>

          {/* Teams & Score */}
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors shrink-0">
              {activeMatch.teamHome.code} vs {activeMatch.teamAway.code}
            </span>
            <span className="text-slate-500">·</span>
            {currentInnings && (
              <span className="font-mono tabular-nums text-sky-400 font-bold text-sm shrink-0">
                {currentInnings.teamCode} {currentInnings.runs}/{currentInnings.wickets}{' '}
                <span className="text-slate-400 font-normal text-xs">({currentInnings.overs} ov)</span>
              </span>
            )}
            <span className="hidden md:inline text-slate-400 truncate">
              {activeMatch.statusNote}
            </span>
          </div>

          {/* Active Batter & Bowler pill */}
          {striker && (
            <div className="hidden xl:flex items-center gap-2 text-slate-300 font-mono text-[11px] bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">
              <span>{striker.playerName}* <strong className="text-white">{striker.runs}</strong> ({striker.balls})</span>
              {bowler && (
                <>
                  <span className="text-slate-600">|</span>
                  <span>{bowler.playerName} <strong className="text-red-400">{bowler.wickets}/{bowler.runs}</strong></span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Audio commentary switch & Simulator Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Audio Commentary Synthesizer Toggle */}
          <button
            onClick={() => setIsAudioCommentaryEnabled(!isAudioCommentaryEnabled)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
              isAudioCommentaryEnabled
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle Audio Voice Commentary"
          >
            {isAudioCommentaryEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span className="hidden sm:inline">Audio Comm</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Audio Off</span>
              </>
            )}
          </button>

          {/* Auto Stream Simulation */}
          <button
            onClick={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              isLiveSimulationActive
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {isLiveSimulationActive ? (
              <>
                <Pause className="w-3 h-3" />
                <span className="hidden sm:inline">Streaming</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span className="hidden sm:inline">Stream</span>
              </>
            )}
          </button>

          {/* Simulate Next Ball */}
          <button
            onClick={() => simulateNextBall(activeMatch.id)}
            className="flex items-center gap-1 px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Next Ball</span>
          </button>

          {/* Open Match Centre */}
          <button
            onClick={handleOpenMatch}
            className="p-1 hover:text-white text-slate-400 transition-colors"
            title="Open Match Centre"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
