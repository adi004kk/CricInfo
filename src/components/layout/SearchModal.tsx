import React, { useState, useEffect, useRef } from 'react';
import { useCricket } from '../../context/CricketContext';
import { Search, X, Users, Trophy, Radio, FileText, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { 
    matches, 
    players, 
    teams, 
    tournaments, 
    news, 
    setSelectedMatchId, 
    setSelectedPlayerId, 
    setSelectedTeamId,
    setSelectedTournamentId,
    setSelectedArticleId,
    setActiveNavTab 
  } = useCricket();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedPlayers = q ? players.filter(p => p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)).slice(0, 4) : [];
  const matchedTeams = q ? teams.filter(t => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q)).slice(0, 4) : [];
  const matchedMatches = q ? matches.filter(m => `${m.teamHome.name} ${m.teamAway.name} ${m.seriesName}`.toLowerCase().includes(q)).slice(0, 4) : [];
  const matchedNews = q ? news.filter(n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)).slice(0, 3) : [];

  const hasResults = matchedPlayers.length > 0 || matchedTeams.length > 0 || matchedMatches.length > 0 || matchedNews.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search players, teams, series, live matches, news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <p>Type to search across international cricket fixtures, players, and historical archives.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-slate-400">Popular:</span>
                {['Virat Kohli', 'Jasprit Bumrah', 'India vs Australia', 'Pat Cummins', 'World Test Championship'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No results found for "<span className="text-white font-medium">{query}</span>".
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              {/* Matches */}
              {matchedMatches.length > 0 && (
                <div>
                  <div className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-red-400" />
                    Matches & Fixtures
                  </div>
                  <div className="space-y-1">
                    {matchedMatches.map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setSelectedMatchId(m.id);
                          setActiveNavTab('match-center');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>{m.teamHome.flag}</span>
                          <span className="font-semibold text-white">{m.teamHome.name} vs {m.teamAway.name}</span>
                          <span className="text-slate-400 font-mono">({m.format})</span>
                        </div>
                        <span className="text-sky-400 text-[11px]">{m.statusNote}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Players */}
              {matchedPlayers.length > 0 && (
                <div>
                  <div className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    Players
                  </div>
                  <div className="space-y-1">
                    {matchedPlayers.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedPlayerId(p.id);
                          setActiveNavTab('players');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-white">{p.name}</div>
                          <div className="text-[11px] text-slate-400">{p.country} · {p.role}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teams */}
              {matchedTeams.length > 0 && (
                <div>
                  <div className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    Teams
                  </div>
                  <div className="space-y-1">
                    {matchedTeams.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedTeamId(t.code);
                          setActiveNavTab('teams');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{t.flag}</span>
                          <span className="font-semibold text-white">{t.name}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {matchedNews.length > 0 && (
                <div>
                  <div className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    Editorial Articles
                  </div>
                  <div className="space-y-1">
                    {matchedNews.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setSelectedArticleId(n.id);
                          setActiveNavTab('news');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors cursor-pointer"
                      >
                        <div className="pr-4">
                          <div className="font-medium text-white line-clamp-1">{n.title}</div>
                          <div className="text-[11px] text-slate-400">{n.category} · {n.author}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
