import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { Award, TrendingUp, TrendingDown, Minus, BookOpen, Shield } from 'lucide-react';
import { MatchFormat } from '../../types/cricket';

export const RankingsView: React.FC = () => {
  const { rankings, records, setSelectedPlayerId, setActiveNavTab } = useCricket();
  const [activeTab, setActiveTab] = useState<'teams' | 'batting' | 'bowling' | 'allrounders' | 'records'>('teams');
  const [format, setFormat] = useState<'test' | 'odi' | 't20i'>('test');

  if (!rankings) {
    return <div className="p-8 text-slate-400">Loading rankings...</div>;
  }

  const getFormatLabel = (fmt: string) => {
    if (fmt === 'test') return 'Test Cricket';
    if (fmt === 'odi') return 'ODI Cricket';
    return 'T20 Internationals';
  };

  const renderTrend = (trend: 'up' | 'down' | 'steady', change?: number) => {
    if (trend === 'up') {
      return (
        <span className="flex items-center text-emerald-400 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
          {change ? `+${change}` : ''}
        </span>
      );
    }
    if (trend === 'down') {
      return (
        <span className="flex items-center text-red-400 text-xs font-semibold">
          <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
          {change ? `${change}` : ''}
        </span>
      );
    }
    return <Minus className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header & Category Switcher */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Official ICC Rankings & World Records</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Updated as of {rankings.updatedAt} · Standardized ICC rating algorithm
            </p>
          </div>

          {/* Format Selector */}
          {activeTab !== 'records' && (
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              {(['test', 'odi', 't20i'] as const).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg font-semibold uppercase transition-colors ${
                    format === fmt ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-3 border-t border-slate-800 text-xs">
          {[
            { id: 'teams', label: 'Team Rankings' },
            { id: 'batting', label: 'Batting Rankings' },
            { id: 'bowling', label: 'Bowling Rankings' },
            { id: 'allrounders', label: 'All-Rounder Rankings' },
            { id: 'records', label: 'All-Time World Records' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-sky-950 text-sky-400 border border-sky-600'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Content */}
      {activeTab === 'teams' && (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">
              ICC Men's {getFormatLabel(format)} Team Rankings
            </h3>
            <span className="text-slate-400">Rating Points System</span>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs">
            {rankings.teams[format].map((item) => (
              <div
                key={item.rank}
                className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-base font-bold text-slate-400 w-6">
                    {item.rank}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-white">{item.name}</div>
                    <div className="text-[11px] text-slate-400">{item.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono tabular-nums text-right">
                  <div>
                    <span className="text-xs text-slate-400 block">Trend</span>
                    {renderTrend(item.trend, item.change)}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Points</span>
                    <span className="font-semibold text-slate-200">{item.points}</span>
                  </div>
                  <div className="w-16">
                    <span className="text-xs text-slate-400 block">Rating</span>
                    <span className="text-lg font-bold text-sky-400">{item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Batting Player Rankings */}
      {activeTab === 'batting' && (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">
              ICC Men's {getFormatLabel(format)} Batting Rankings
            </h3>
            <span className="text-slate-400">Player Ratings</span>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs">
            {rankings.batting[format].map((p) => (
              <div
                key={p.rank}
                onClick={() => {
                  if (p.name.includes('Kohli')) {
                    setSelectedPlayerId('p-virat');
                    setActiveNavTab('players');
                  }
                }}
                className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-base font-bold text-sky-400 w-6">
                    {p.rank}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-white hover:text-sky-300 transition-colors">{p.name}</div>
                    <div className="text-[11px] text-slate-400">{p.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono tabular-nums text-right">
                  <div>
                    <span className="text-xs text-slate-400 block">Movement</span>
                    {renderTrend(p.trend, p.change)}
                  </div>
                  <div className="w-20">
                    <span className="text-xs text-slate-400 block">Rating</span>
                    <span className="text-lg font-bold text-white">{p.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bowling Player Rankings */}
      {activeTab === 'bowling' && (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">
              ICC Men's {getFormatLabel(format)} Bowling Rankings
            </h3>
            <span className="text-slate-400">Player Ratings</span>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs">
            {rankings.bowling[format].map((bw) => (
              <div
                key={bw.rank}
                onClick={() => {
                  if (bw.name.includes('Bumrah')) {
                    setSelectedPlayerId('p-bumrah');
                    setActiveNavTab('players');
                  }
                }}
                className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-base font-bold text-red-400 w-6">
                    {bw.rank}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-white hover:text-sky-300 transition-colors">{bw.name}</div>
                    <div className="text-[11px] text-slate-400">{bw.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono tabular-nums text-right">
                  <div>
                    <span className="text-xs text-slate-400 block">Movement</span>
                    {renderTrend(bw.trend, bw.change)}
                  </div>
                  <div className="w-20">
                    <span className="text-xs text-slate-400 block">Rating</span>
                    <span className="text-lg font-bold text-white">{bw.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All-Rounders */}
      {activeTab === 'allrounders' && (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">
              ICC Men's {getFormatLabel(format)} All-Rounder Rankings
            </h3>
            <span className="text-slate-400">Composite Impact Rating</span>
          </div>

          <div className="divide-y divide-slate-800/60 text-xs">
            {rankings.allRounders[format].map((ar) => (
              <div
                key={ar.rank}
                className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-base font-bold text-emerald-400 w-6">
                    {ar.rank}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-white">{ar.name}</div>
                    <div className="text-[11px] text-slate-400">{ar.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono tabular-nums text-right">
                  <div>
                    <span className="text-xs text-slate-400 block">Movement</span>
                    {renderTrend(ar.trend, ar.change)}
                  </div>
                  <div className="w-20">
                    <span className="text-xs text-slate-400 block">Rating</span>
                    <span className="text-lg font-bold text-white">{ar.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All-Time World Records */}
      {activeTab === 'records' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-sky-400 uppercase tracking-wider">
                  {rec.category}
                </span>
                <span className="font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {rec.format}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{rec.title}</h4>
                <div className="text-xl font-extrabold text-amber-400 font-mono tabular-nums mt-1">
                  {rec.value}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
                <div>
                  <span className="text-slate-300 font-semibold">{rec.recordHolder}</span> ({rec.teamVs})
                </div>
                <div className="text-[11px] text-slate-500">
                  {rec.venue} · {rec.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
