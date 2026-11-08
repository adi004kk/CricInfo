import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { MatchCard } from '../match/MatchCard';
import { 
  Flame, 
  Trophy, 
  Radio, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Star, 
  Calendar, 
  BarChart3, 
  ShieldAlert,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    matches, 
    setSelectedMatchId, 
    setSelectedPlayerId, 
    setSelectedTeamId,
    setActiveNavTab,
    news,
    videos,
    rankings,
    tournaments,
    players,
    teams,
    preferences,
    isLiveSimulationActive,
    setIsLiveSimulationActive,
    simulateNextBall
  } = useCricket();

  const [activeFormatTab, setActiveFormatTab] = useState<'all' | 'international' | 'T20' | 'ODI' | 'TEST' | 'league'>('all');

  const liveMatches = matches.filter(m => m.status === 'live');
  const featuredMatch = liveMatches[0] || matches[0];
  const upcomingMatches = matches.filter(m => m.status === 'scheduled');
  const recentResults = matches.filter(m => m.status === 'completed');

  const filteredMatchesByTab = matches.filter(m => {
    if (activeFormatTab === 'all') return true;
    if (activeFormatTab === 'international') return m.category === 'international';
    if (activeFormatTab === 'league') return m.category === 'league';
    return m.format === activeFormatTab;
  });

  const handleOpenMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setActiveNavTab('match-center');
  };

  return (
    <div className="space-y-8">
      {/* Demo Mode Notice & Live Simulator Switch */}
      <div className="bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                Demo Mode Active · Deterministic Engine
              </span>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">
                Verified Data Layer
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Live score simulator running with ball-by-ball commentary, worm curves, and automated strike calculations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isLiveSimulationActive
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isLiveSimulationActive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Auto Simulation Running
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Start Auto Simulation (4s)
              </>
            )}
          </button>

          <button
            onClick={() => simulateNextBall(featuredMatch?.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Simulate Next Ball
          </button>
        </div>
      </div>

      {/* 1. Live Matches Strip / Carousel */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-tight">Live Matches & Action</h2>
          </div>
          <button
            onClick={() => setActiveNavTab('matches')}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>All Fixtures ({matches.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.slice(0, 3).map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onSelect={handleOpenMatch}
              featured={match.status === 'live'}
            />
          ))}
        </div>
      </section>

      {/* 2. Format Navigation Tabs for Content Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800 text-xs">
        {[
          { id: 'all', label: 'All Cricket' },
          { id: 'international', label: 'International' },
          { id: 'TEST', label: 'Test Matches' },
          { id: 'ODI', label: 'ODIs' },
          { id: 'T20', label: 'T20 & Leagues' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFormatTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeFormatTab === tab.id
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Main Multi-Column Section: Featured Match Spotlight + Trending News */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Featured Live Match Centre Spotlight */}
        {featuredMatch ? (
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800 text-slate-400 mb-4">
                <span className="font-semibold text-sky-400">FEATURED MATCH · {featuredMatch.format}</span>
                <span className="truncate max-w-[200px] text-slate-300">{featuredMatch.seriesName}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{featuredMatch.teamHome.flag}</span>
                  <div>
                    <div className="font-bold text-base text-white">{featuredMatch.teamHome.name}</div>
                    <div className="font-mono text-sm font-semibold text-slate-300">
                      {featuredMatch.innings[0] ? `${featuredMatch.innings[0].runs}/${featuredMatch.innings[0].wickets}` : 'Yet to bat'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end text-right">
                  <div>
                    <div className="font-bold text-base text-white">{featuredMatch.teamAway.name}</div>
                    <div className="font-mono text-sm font-semibold text-slate-300">
                      {featuredMatch.innings[1] ? `${featuredMatch.innings[1].runs}/${featuredMatch.innings[1].wickets}` : 'Yet to bat'}
                    </div>
                  </div>
                  <span className="text-3xl">{featuredMatch.teamAway.flag}</span>
                </div>
              </div>

              {/* Live Situation Callout */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1 mb-4">
                <div className="text-xs font-semibold text-sky-400 flex items-center justify-between">
                  <span>{featuredMatch.statusNote}</span>
                  {featuredMatch.status === 'live' && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  Venue: {featuredMatch.venue.name}, {featuredMatch.venue.city}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {featuredMatch.toss ? `${featuredMatch.toss.winnerTeamId} elected to ${featuredMatch.toss.decision}` : ''}
              </span>
              <button
                onClick={() => handleOpenMatch(featuredMatch.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold shadow-sm transition-colors"
              >
                <span>Open Match Centre</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 flex items-center justify-center text-slate-400 text-xs">
            Loading match data...
          </div>
        )}

        {/* Trending News Spotlight */}
        <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Top Editorial Stories
              </h3>
              <button
                onClick={() => setActiveNavTab('news')}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                All News →
              </button>
            </div>

            {news.slice(0, 2).map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveNavTab('news')}
                className="group flex gap-3 cursor-pointer py-2 hover:bg-slate-850/50 rounded-xl p-2 transition-colors"
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h4 className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    {article.author} · {article.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Points Table Spotlight & Popular Stars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* World Test Championship Points Table Mini */}
        <div className="lg:col-span-7 bg-slate-900/60 rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                World Test Championship Standings
              </h3>
            </div>
            <button
              onClick={() => setActiveNavTab('tournaments')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
            >
              Full Standings →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Team</th>
                  <th className="py-2 px-2 text-right">P</th>
                  <th className="py-2 px-2 text-right">W</th>
                  <th className="py-2 px-2 text-right">L</th>
                  <th className="py-2 px-3 text-right">PTS</th>
                  <th className="py-2 px-3 text-right">PCT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {tournaments[0]?.standings.slice(0, 4).map((row) => (
                  <tr
                    key={row.position}
                    onClick={() => {
                      setSelectedTeamId(row.team.code);
                      setActiveNavTab('teams');
                    }}
                    className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-400">
                      {row.position}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{row.team.flag}</span>
                        <span>{row.team.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-300">
                      {row.played}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-emerald-400 font-bold">
                      {row.won}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-red-400">
                      {row.lost}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-sky-400 font-bold">
                      {row.points}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-200 font-semibold">
                      {row.netRunRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Cricket Stars Card */}
        <div className="lg:col-span-5 bg-slate-900/60 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Star className="w-4 h-4 text-sky-400" />
                Featured World Stars
              </h3>
              <button
                onClick={() => setActiveNavTab('players')}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                All Players →
              </button>
            </div>

            <div className="space-y-3">
              {players.slice(0, 3).map((player) => (
                <div
                  key={player.id}
                  onClick={() => {
                    setSelectedPlayerId(player.id);
                    setActiveNavTab('players');
                  }}
                  className="group flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/50 border border-slate-800/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-600/30 text-sky-300 font-bold flex items-center justify-center text-sm border border-sky-500/20">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                        {player.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {player.country} · {player.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono tabular-nums text-xs">
                    <span className="text-sky-400 font-bold">
                      {player.careerStats.test.runs > 0 ? `${player.careerStats.test.runs} runs` : `${player.careerStats.test.wickets} wkts`}
                    </span>
                    <span className="text-slate-500 text-[10px] block">Test Career</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Follow players to receive personal milestone alerts</span>
          </div>
        </div>
      </div>

      {/* 5. Video Highlights Strip */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-sky-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Match Highlights & Analysis</h2>
          </div>
          <button
            onClick={() => setActiveNavTab('videos')}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>Video Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.slice(0, 3).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveNavTab('videos')}
              className="group bg-slate-900/60 hover:bg-slate-850 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer overflow-hidden"
            >
              <div className="relative h-36 bg-slate-950 overflow-hidden">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-white">
                  {vid.duration}
                </span>
              </div>
              <div className="p-3">
                <span className="text-[10px] text-sky-400 font-bold uppercase">{vid.category}</span>
                <h4 className="text-xs font-semibold text-white group-hover:text-sky-300 line-clamp-2 mt-0.5">
                  {vid.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
