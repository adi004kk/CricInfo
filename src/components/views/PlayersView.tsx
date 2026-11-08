import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { PlayerProfile, MatchFormat } from '../../types/cricket';
import { Heart, Award, Calendar, Activity, Star } from 'lucide-react';

export const PlayersView: React.FC = () => {
  const { players, selectedPlayer, setSelectedPlayerId, preferences, toggleFavoritePlayer } = useCricket();
  const [selectedFormat, setSelectedFormat] = useState<'test' | 'odi' | 't20i'>('test');

  const player = selectedPlayer || players[0];

  if (!player) {
    return <div className="p-8 text-slate-400">Loading players...</div>;
  }

  const isFavorite = preferences.favoritePlayers.includes(player.id);
  const currentFormatStats = player.careerStats[selectedFormat];

  return (
    <div className="space-y-6">
      {/* Player Header Banner */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Player Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-900 flex items-center justify-center text-3xl font-bold text-white shadow-md border-2 border-slate-700 shrink-0">
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white">{player.name}</h1>
                <button
                  onClick={() => toggleFavoritePlayer(player.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isFavorite
                      ? 'bg-red-500/20 border-red-500/50 text-red-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title="Favorite Player"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-300">{player.country}</span>
                <span aria-hidden="true">·</span>
                <span className="text-sky-400 font-medium">{player.role}</span>
                <span aria-hidden="true">·</span>
                <span>Age: {player.age}</span>
              </div>

              <div className="text-[11px] text-slate-500 mt-1">
                Batting: {player.battingStyle} · Bowling: {player.bowlingStyle}
              </div>
            </div>
          </div>

          {/* Quick Player Switcher Dropdown / Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {players.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPlayerId(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  player.id === p.id
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* ICC Rankings Badges */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs">
          <span className="text-slate-500 font-medium">ICC Current Rankings:</span>
          {player.iccRankings.test && (
            <div className="bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-medium mr-1.5">Test:</span>
              <span className="font-mono font-bold text-sky-400">#{player.iccRankings.test.rank}</span>
              <span className="text-[10px] text-slate-500 ml-1.5">(Best: #{player.iccRankings.test.best})</span>
            </div>
          )}
          {player.iccRankings.odi && (
            <div className="bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-medium mr-1.5">ODI:</span>
              <span className="font-mono font-bold text-sky-400">#{player.iccRankings.odi.rank}</span>
              <span className="text-[10px] text-slate-500 ml-1.5">(Best: #{player.iccRankings.odi.best})</span>
            </div>
          )}
          {player.iccRankings.t20i && (
            <div className="bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-medium mr-1.5">T20I:</span>
              <span className="font-mono font-bold text-sky-400">#{player.iccRankings.t20i.rank}</span>
              <span className="text-[10px] text-slate-500 ml-1.5">(Best: #{player.iccRankings.t20i.best})</span>
            </div>
          )}
        </div>
      </div>

      {/* Format Selector for Stats */}
      <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
        <span className="font-semibold text-slate-300">Format Career Breakdown:</span>
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          {(['test', 'odi', 't20i'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-3 py-1 rounded-md font-semibold uppercase transition-colors ${
                selectedFormat === fmt ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Format Career KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Matches / Inn</span>
          <span className="text-lg font-bold font-mono tabular-nums text-white mt-1">
            {currentFormatStats.matches} / {currentFormatStats.innings}
          </span>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Total Runs</span>
          <span className="text-lg font-bold font-mono tabular-nums text-sky-400 mt-1">
            {currentFormatStats.runs.toLocaleString()}
          </span>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Batting Average</span>
          <span className="text-lg font-bold font-mono tabular-nums text-emerald-400 mt-1">
            {currentFormatStats.battingAverage}
          </span>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Strike Rate</span>
          <span className="text-lg font-bold font-mono tabular-nums text-white mt-1">
            {currentFormatStats.strikeRate}
          </span>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">100s / 50s</span>
          <span className="text-lg font-bold font-mono tabular-nums text-amber-400 mt-1">
            {currentFormatStats.centuries} / {currentFormatStats.fifties}
          </span>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Wickets / Best</span>
          <span className="text-lg font-bold font-mono tabular-nums text-red-400 mt-1">
            {currentFormatStats.wickets} {currentFormatStats.bestBowling ? `(${currentFormatStats.bestBowling})` : ''}
          </span>
        </div>
      </div>

      {/* Bio & Recent Innings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bio */}
        <div className="lg:col-span-5 bg-slate-900/60 rounded-2xl p-5 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Player Overview</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {player.bio}
          </p>

          <div className="pt-3 border-t border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span>Full Name:</span>
              <span className="text-slate-200 font-medium">{player.fullName}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Born:</span>
              <span className="text-slate-200">{player.born}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>National Team:</span>
              <span className="text-slate-200 font-medium">{player.country}</span>
            </div>
          </div>
        </div>

        {/* Recent Matches & Innings */}
        <div className="lg:col-span-7 bg-slate-900/60 rounded-2xl p-5 border border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
            Recent Match Performances
          </h3>

          <div className="divide-y divide-slate-800/60 text-xs">
            {player.recentInnings.map((inn, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between hover:bg-slate-800/20 transition-colors">
                <div>
                  <div className="font-semibold text-white">vs {inn.vs}</div>
                  <div className="text-[11px] text-slate-400">
                    {inn.format} · {inn.date}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono tabular-nums text-sm font-bold text-sky-400">
                    {inn.runs} ({inn.balls}b)
                    {inn.wickets !== undefined && (
                      <span className="text-red-400 ml-2"> & {inn.wickets}w</span>
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-400">{inn.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
