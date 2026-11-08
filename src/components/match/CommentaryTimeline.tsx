import React, { useState } from 'react';
import { BallDelivery, CricketMatch } from '../../types/cricket';
import { ArrowDownUp, Filter, Sparkles } from 'lucide-react';

interface CommentaryTimelineProps {
  match: CricketMatch;
  onSimulateBall?: () => void;
  isSimulating?: boolean;
}

export const CommentaryTimeline: React.FC<CommentaryTimelineProps> = ({ 
  match, 
  onSimulateBall, 
  isSimulating = false 
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'boundaries' | 'wickets'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const rawDeliveries = match.deliveries || [];

  const filteredDeliveries = rawDeliveries.filter((d) => {
    if (filterMode === 'boundaries') return d.isFour || d.isSix;
    if (filterMode === 'wickets') return d.isWicket;
    return true;
  });

  const displayDeliveries = sortOrder === 'desc' 
    ? [...filteredDeliveries] 
    : [...filteredDeliveries].reverse();

  const getEventBadge = (delivery: BallDelivery) => {
    if (delivery.isWicket) {
      return (
        <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded">
          WICKET
        </span>
      );
    }
    if (delivery.isSix) {
      return (
        <span className="bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px] font-bold px-2 py-0.5 rounded">
          SIX (6)
        </span>
      );
    }
    if (delivery.isFour) {
      return (
        <span className="bg-sky-500/20 text-sky-400 border border-sky-500/40 text-[10px] font-bold px-2 py-0.5 rounded">
          FOUR (4)
        </span>
      );
    }
    if (delivery.extras.type) {
      return (
        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          {delivery.extras.type}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        {/* Filters */}
        <div className="flex items-center gap-1.5 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              filterMode === 'all'
                ? 'bg-sky-500 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            All Deliveries
          </button>
          <button
            onClick={() => setFilterMode('boundaries')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              filterMode === 'boundaries'
                ? 'bg-sky-500 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            Boundaries Only
          </button>
          <button
            onClick={() => setFilterMode('wickets')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              filterMode === 'wickets'
                ? 'bg-red-500 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            Wickets
          </button>
        </div>

        {/* Sort & Quick Simulator */}
        <div className="flex items-center gap-2">
          {match.status === 'live' && onSimulateBall && (
            <button
              onClick={onSimulateBall}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Simulate Next Ball
            </button>
          )}

          <button
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700/80 transition-colors"
            title="Toggle newest / oldest order"
          >
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      {displayDeliveries.length === 0 ? (
        <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
          No commentary entries match the current filter.
        </div>
      ) : (
        <div className="space-y-2.5">
          {displayDeliveries.map((delivery, index) => {
            const isNewest = index === 0 && sortOrder === 'desc';

            return (
              <div
                key={delivery.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  delivery.isWicket
                    ? 'bg-red-950/25 border-red-900/60'
                    : delivery.isSix
                    ? 'bg-purple-950/20 border-purple-900/50'
                    : delivery.isFour
                    ? 'bg-sky-950/20 border-sky-900/40'
                    : isNewest
                    ? 'bg-slate-850 border-sky-500/50'
                    : 'bg-slate-900/60 border-slate-800/80'
                }`}
              >
                {/* Header: Over & Ball, Participants, Badge, Score */}
                <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                  <div className="flex items-center gap-2">
                    {/* Over Ball Badge */}
                    <span className="font-mono font-bold text-sky-400 text-sm tabular-nums">
                      {delivery.over}.{delivery.ball}
                    </span>

                    {/* Batter to Bowler */}
                    <span className="text-slate-300 font-medium">
                      {delivery.bowlerName} to {delivery.batterName}
                    </span>

                    {/* Event Tag */}
                    {getEventBadge(delivery)}
                  </div>

                  {/* Cumulative Score Snapshot */}
                  <div className="text-right font-mono tabular-nums text-slate-400 text-[11px]">
                    <span className="text-white font-bold">{delivery.cumulativeScore}/{delivery.cumulativeWickets}</span>
                  </div>
                </div>

                {/* Commentary Narrative */}
                <p className="text-xs text-slate-200 leading-relaxed pl-7">
                  {delivery.commentary}
                </p>

                {/* Dismissal specific callout */}
                {delivery.isWicket && delivery.wicketDetails && (
                  <div className="mt-2 pl-7 text-[11px] font-semibold text-red-400">
                    Dismissal: {delivery.wicketDetails.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
