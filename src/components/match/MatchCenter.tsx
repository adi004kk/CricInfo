import React, { useState } from 'react';
import { CricketMatch } from '../../types/cricket';
import { ScorecardView } from './ScorecardView';
import { CommentaryTimeline } from './CommentaryTimeline';
import { WormChart } from '../charts/WormChart';
import { ManhattanChart } from '../charts/ManhattanChart';
import { WagonWheel } from '../charts/WagonWheel';
import { 
  Radio, 
  MapPin, 
  Calendar, 
  Award, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Info, 
  Clock, 
  Play, 
  Pause, 
  Sparkles,
  Share2,
  Bookmark,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  Flame,
  CloudRain
} from 'lucide-react';
import { useCricket } from '../../context/CricketContext';

interface MatchCenterProps {
  match: CricketMatch;
  onBack?: () => void;
}

export const MatchCenter: React.FC<MatchCenterProps> = ({ match, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'live' | 'scorecard' | 'charts' | 'lineups' | 'info'>('overview');
  const { 
    isLiveSimulationActive, 
    setIsLiveSimulationActive, 
    isAudioCommentaryEnabled,
    setIsAudioCommentaryEnabled,
    simulateNextBall,
    preferences,
    toggleMatchReminder,
    setIsRemindersModalOpen,
    setActiveNavTab
  } = useCricket();

  const currentInnings = match.innings[match.currentInningsIndex] || match.innings[0];
  const hasReminder = preferences.reminders.includes(match.id);
  const reminderConfig = preferences.reminderConfigs?.[match.id];

  // Active batters & bowler for live glance
  const striker = currentInnings?.battingFigures.find(b => b.isStriker) || currentInnings?.battingFigures[0];
  const nonStriker = currentInnings?.battingFigures.find(b => b.isNonStriker) || currentInnings?.battingFigures[1];
  const activeBowler = currentInnings?.bowlingFigures.find(b => b.isCurrentBowler) || currentInnings?.bowlingFigures[0];

  return (
    <div className="space-y-6">
      {/* Top Header Card: Teams, Score, Match Status */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Series Name & Format / Status Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-200">{match.seriesName}</span>
            <span aria-hidden="true">·</span>
            <span>{match.matchNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-sky-400">{match.format}</span>
          </div>

          <div className="flex items-center gap-3">
            {match.status === 'live' && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[11px] font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </span>
            )}
            {match.status === 'completed' && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold">
                COMPLETED
              </span>
            )}
            {match.status === 'scheduled' && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold">
                UPCOMING
              </span>
            )}

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => toggleMatchReminder(match.id)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  hasReminder 
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                }`}
                title={hasReminder ? 'Reminder active. Click to toggle.' : 'Set match notification alert'}
                aria-label={hasReminder ? 'Cancel match reminder' : 'Set match reminder'}
              >
                {hasReminder ? <BellRing className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">
                  {hasReminder ? 'Reminder Set' : 'Set Reminder'}
                </span>
              </button>

              {hasReminder && (
                <button
                  onClick={() => setIsRemindersModalOpen(true)}
                  className="px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-[11px] transition-colors"
                  title="Configure reminder lead-time & alerts"
                >
                  {reminderConfig?.leadTimeMinutes ?? 15}m
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Teams Matchup & Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Team Home */}
          <div className="lg:col-span-5 flex items-center justify-between lg:justify-start gap-4">
            <div className="text-3xl">{match.teamHome.flag}</div>
            <div>
              <div className="font-bold text-lg text-white">{match.teamHome.name}</div>
              <div className="text-xs text-slate-400">
                {match.format === 'TEST' ? (
                  <>
                    1st: {match.innings[0]?.runs ?? '-'}/{match.innings[0]?.wickets ?? '-'} 
                    {match.innings[2] && ` · 2nd: ${match.innings[2].runs}/${match.innings[2].wickets}`}
                  </>
                ) : (
                  match.innings.find(i => i.teamCode === match.teamHome.code) 
                    ? `${match.innings.find(i => i.teamCode === match.teamHome.code)?.runs}/${match.innings.find(i => i.teamCode === match.teamHome.code)?.wickets} (${match.innings.find(i => i.teamCode === match.teamHome.code)?.overs} ov)`
                    : 'Yet to bat'
                )}
              </div>
            </div>
          </div>

          {/* VS Divider or Win Probability */}
          <div className="lg:col-span-2 text-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
            VS
          </div>

          {/* Team Away */}
          <div className="lg:col-span-5 flex items-center justify-between lg:justify-end gap-4 lg:text-right">
            <div className="order-2 lg:order-1">
              <div className="font-bold text-lg text-white">{match.teamAway.name}</div>
              <div className="text-xs text-slate-400">
                {match.format === 'TEST' ? (
                  <>
                    1st: {match.innings[1]?.runs ?? '-'}/{match.innings[1]?.wickets ?? '-'}
                    {match.innings[3] && ` · 2nd: ${match.innings[3].runs}/${match.innings[3].wickets}`}
                  </>
                ) : (
                  match.innings.find(i => i.teamCode === match.teamAway.code)
                    ? `${match.innings.find(i => i.teamCode === match.teamAway.code)?.runs}/${match.innings.find(i => i.teamCode === match.teamAway.code)?.wickets} (${match.innings.find(i => i.teamCode === match.teamAway.code)?.overs} ov)`
                    : 'Yet to bat'
                )}
              </div>
            </div>
            <div className="text-3xl order-1 lg:order-2">{match.teamAway.flag}</div>
          </div>
        </div>

        {/* Status Note & Active State */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-sky-400">
            {match.statusNote}
          </div>

          {/* Live Simulator Controls & Audio for Demo */}
          {match.status === 'live' && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsAudioCommentaryEnabled(!isAudioCommentaryEnabled)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isAudioCommentaryEnabled
                    ? 'bg-sky-500/20 border-sky-500/50 text-sky-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Toggle Web Speech Voice Commentary"
              >
                {isAudioCommentaryEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                    Audio Comm: ON
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    Audio Comm: OFF
                  </>
                )}
              </button>

              <button
                onClick={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isLiveSimulationActive
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-950/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {isLiveSimulationActive ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause Auto Stream
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Start Auto Stream
                  </>
                )}
              </button>

              <button
                onClick={() => simulateNextBall(match.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Simulate Next Ball
              </button>
            </div>
          )}
        </div>

        {/* Cricbuzz Recent Deliveries Strip */}
        {match.deliveries && match.deliveries.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">Recent Balls:</span>
              <div className="flex items-center gap-1.5">
                {match.deliveries.slice(0, 6).reverse().map((d, i) => (
                  <span
                    key={d.id || i}
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs ${
                      d.isWicket
                        ? 'bg-red-500 text-white'
                        : d.isSix
                        ? 'bg-purple-600 text-white'
                        : d.isFour
                        ? 'bg-sky-500 text-white'
                        : d.isDot
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {d.isWicket ? 'W' : d.runsScored}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveNavTab('polls')}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20"
              >
                <Flame className="w-3 h-3" />
                Fan Pulse
              </button>
              <button
                onClick={() => setActiveNavTab('fantasy')}
                className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
              >
                <Award className="w-3 h-3" />
                Fantasy XI
              </button>
              <button
                onClick={() => setActiveNavTab('dls')}
                className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-semibold px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20"
              >
                <CloudRain className="w-3 h-3" />
                DLS Calculator
              </button>
            </div>
          </div>
        )}

        {/* Win Probability Bar */}
        {match.winProbability && (
          <div className="mt-4 pt-3 border-t border-slate-800/50">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span>{match.teamHome.name} ({match.winProbability.teamHomePercent}%)</span>
              <span className="font-semibold text-slate-300">Win Probability</span>
              <span>{match.teamAway.name} ({match.winProbability.teamAwayPercent}%)</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${match.winProbability.teamHomePercent}%` }}
              />
              {match.winProbability.drawPercent && (
                <div
                  className="bg-slate-500 h-full transition-all duration-500"
                  style={{ width: `${match.winProbability.drawPercent}%` }}
                />
              )}
              <div
                className="bg-sky-500 h-full transition-all duration-500"
                style={{ width: `${match.winProbability.teamAwayPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs for Match Detail */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'live', label: 'Ball-by-Ball Live' },
          { id: 'scorecard', label: 'Full Scorecard' },
          { id: 'charts', label: 'Charts & Analysis' },
          { id: 'lineups', label: 'Playing XI' },
          { id: 'info', label: 'Match Info' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === tab.id
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Live Action Mini Glance (if live) */}
          {match.status === 'live' && currentInnings && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Batting on Pitch */}
              <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                  <span>Batters in Middle</span>
                  <span className="font-mono text-[11px] text-slate-500">R (B) · 4s · 6s · SR</span>
                </div>
                <div className="space-y-2 text-xs">
                  {striker && (
                    <div className="flex items-center justify-between py-1 border-b border-slate-800/40">
                      <div className="flex items-center gap-1.5 font-semibold text-white">
                        <span>{striker.playerName}</span>
                        <span className="text-sky-400 font-bold">*</span>
                      </div>
                      <div className="font-mono tabular-nums text-slate-300">
                        <span className="text-white font-bold">{striker.runs}</span> ({striker.balls}) · {striker.fours} · {striker.sixes} · {striker.strikeRate.toFixed(1)}
                      </div>
                    </div>
                  )}
                  {nonStriker && (
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span>{nonStriker.playerName}</span>
                      </div>
                      <div className="font-mono tabular-nums text-slate-400">
                        <span className="text-slate-200 font-bold">{nonStriker.runs}</span> ({nonStriker.balls}) · {nonStriker.fours} · {nonStriker.sixes} · {nonStriker.strikeRate.toFixed(1)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Bowler */}
              <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                  <span>Current Bowler</span>
                  <span className="font-mono text-[11px] text-slate-500">O · M · R · W · ECON</span>
                </div>
                {activeBowler ? (
                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="font-semibold text-white">{activeBowler.playerName}</span>
                    <span className="font-mono tabular-nums text-slate-300">
                      {activeBowler.overs} ov · {activeBowler.maidens}m · {activeBowler.runs}r · <span className="text-red-400 font-bold">{activeBowler.wickets}w</span> · {activeBowler.economy.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">Bowler info updating...</div>
                )}
              </div>
            </div>
          )}

          {/* Worm Comparison Preview */}
          <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              Match Progression Curve
            </h3>
            <WormChart
              inningsList={match.innings}
              teamHomeCode={match.teamHome.code}
              teamAwayCode={match.teamAway.code}
            />
          </div>

          {/* Recent Commentary Snippet */}
          <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                Latest Ball Updates
              </h3>
              <button
                onClick={() => setActiveTab('live')}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                View Full Commentary →
              </button>
            </div>
            <CommentaryTimeline match={match} onSimulateBall={() => simulateNextBall(match.id)} />
          </div>
        </div>
      )}

      {/* Tab 2: Live Commentary */}
      {activeTab === 'live' && (
        <CommentaryTimeline 
          match={match} 
          onSimulateBall={() => simulateNextBall(match.id)} 
          isSimulating={isLiveSimulationActive}
        />
      )}

      {/* Tab 3: Full Scorecard */}
      {activeTab === 'scorecard' && (
        <ScorecardView match={match} />
      )}

      {/* Tab 4: Charts & Visualizations */}
      {activeTab === 'charts' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-400" />
              Worm Chart: Cumulative Comparison
            </h3>
            <WormChart
              inningsList={match.innings}
              teamHomeCode={match.teamHome.code}
              teamAwayCode={match.teamAway.code}
            />
          </div>

          {currentInnings && (
            <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                Manhattan Chart: {currentInnings.teamName} Innings
              </h3>
              <ManhattanChart innings={currentInnings} />
            </div>
          )}

          <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800">
            <WagonWheel points={match.wagonWheelData} title="Wagon Wheel & Ground Shot Distribution" />
          </div>
        </div>
      )}

      {/* Tab 5: Lineups & Playing XI */}
      {activeTab === 'lineups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{match.teamHome.flag}</span>
              <h3 className="text-sm font-bold text-white">{match.teamHome.name} Playing XI</h3>
            </div>
            <div className="space-y-2 text-xs">
              {(match.playingXI?.teamHome || [
                'Usman Khawaja', 'Marnus Labuschagne', 'Steve Smith', 'Travis Head',
                'Cameron Green', 'Alex Carey (wk)', 'Pat Cummins (c)', 'Mitchell Starc',
                'Nathan Lyon', 'Josh Hazlewood', 'Scott Boland'
              ]).map((player, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-800/40 text-slate-300">
                  <span>{idx + 1}. {player}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{match.teamAway.flag}</span>
              <h3 className="text-sm font-bold text-white">{match.teamAway.name} Playing XI</h3>
            </div>
            <div className="space-y-2 text-xs">
              {(match.playingXI?.teamAway || [
                'Rohit Sharma (c)', 'Yashasvi Jaiswal', 'Shubman Gill', 'Virat Kohli',
                'Rishabh Pant (wk)', 'KL Rahul', 'Ravindra Jadeja', 'Ravichandran Ashwin',
                'Jasprit Bumrah', 'Mohammed Siraj', 'Akash Deep'
              ]).map((player, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-800/40 text-slate-300">
                  <span>{idx + 1}. {player}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Match Info & Officials */}
      {activeTab === 'info' && (
        <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2">Match Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Series:</span>
                <span className="font-semibold text-slate-200">{match.seriesName}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Match:</span>
                <span className="text-slate-200">{match.matchNumber}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Format:</span>
                <span className="text-slate-200 font-semibold">{match.format}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Venue:</span>
                <span className="text-slate-200">{match.venue.name}, {match.venue.city}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Capacity:</span>
                <span className="font-mono tabular-nums text-slate-200">
                  {match.venue.capacity ? match.venue.capacity.toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Toss:</span>
                <span className="text-slate-200">
                  {match.toss ? `${match.toss.winnerTeamId === match.teamHome.id ? match.teamHome.name : match.teamAway.name} won and chose to ${match.toss.decision}` : 'Yet to occur'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">On-field Umpires:</span>
                <span className="text-slate-200">
                  {match.officials?.umpires.join(', ') || 'Richard Illingworth, Kumar Dharmasena'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Third Umpire:</span>
                <span className="text-slate-200">{match.officials?.thirdUmpire || 'Michael Gough'}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Match Referee:</span>
                <span className="text-slate-200">{match.officials?.matchReferee || 'Javagal Srinath'}</span>
              </div>
            </div>
          </div>

          {match.venue.pitchCondition && (
            <div className="mt-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-300 block mb-1">Pitch & Weather Condition:</span>
              <p className="text-slate-400">{match.venue.pitchCondition}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
