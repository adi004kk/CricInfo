import React, { useState } from 'react';
import { useCricket } from '../../context/CricketContext';
import { Flame, CheckCircle, BarChart3, Users, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PollItem {
  id: string;
  question: string;
  category: string;
  totalVotes: number;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
}

const INITIAL_POLLS: PollItem[] = [
  {
    id: 'poll-1',
    question: 'Border-Gavaskar Trophy: Who will win the 3rd Test at the MCG?',
    category: 'Match Winner',
    totalVotes: 14820,
    options: [
      { id: 'opt-ind', text: 'India (need 48 runs with 4 wickets left)', votes: 8892 },
      { id: 'opt-aus', text: 'Australia (need 4 wickets to defend)', votes: 5483 },
      { id: 'opt-draw', text: 'Draw / Tie', votes: 445 }
    ]
  },
  {
    id: 'poll-2',
    question: 'How will the next wicket fall in the MCG final session?',
    category: 'In-Game Pulse',
    totalVotes: 9340,
    options: [
      { id: 'opt-c-behind', text: 'Caught behind / Wicketkeeper', votes: 3829 },
      { id: 'opt-bowled', text: 'Clean Bowled / Off-stump shattered', votes: 2615 },
      { id: 'opt-lbw', text: 'Plumb LBW / In-dipper', votes: 1961 },
      { id: 'opt-catch', text: 'Caught at slip or deep boundary', votes: 935 }
    ]
  },
  {
    id: 'poll-3',
    question: 'Will Rishabh Pant convert his unbeaten 38* into a 4th-innings Test Century?',
    category: 'Milestone Watch',
    totalVotes: 11200,
    options: [
      { id: 'opt-yes', text: 'Yes! Pant will reach 100 with a maximum', votes: 7840 },
      { id: 'opt-no', text: 'No, Australia will dismiss him before 100', votes: 3360 }
    ]
  }
];

export const FanPollsPredictor: React.FC = () => {
  const [polls, setPolls] = useState<PollItem[]>(INITIAL_POLLS);
  const [votedMap, setVotedMap] = useState<Record<string, string>>({});

  const handleVote = (pollId: string, optionId: string) => {
    if (votedMap[pollId]) return;

    setVotedMap(prev => ({ ...prev, pollId: optionId }));
    setPolls(prev => prev.map(p => {
      if (p.id !== pollId) return p;
      return {
        ...p,
        totalVotes: p.totalVotes + 1,
        options: p.options.map(opt => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        })
      };
    }));

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0ea5e9', '#10b981', '#f59e0b']
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Cricbuzz Fan Pulse & Match Predictor</h1>
              <span className="text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full uppercase">
                Live Voting
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Vote on live match outcomes, milestone predictions, and tactical calls in real time
            </p>
          </div>
        </div>
      </div>

      {/* Polls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => {
          const userSelectedOptId = votedMap[poll.id];
          const hasVoted = Boolean(userSelectedOptId);

          return (
            <div
              key={poll.id}
              className="bg-slate-900/70 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                  <span className="text-sky-400 uppercase tracking-wider">{poll.category}</span>
                  <span className="flex items-center gap-1 font-mono tabular-nums text-slate-500">
                    <Users className="w-3 h-3" />
                    {poll.totalVotes.toLocaleString()} votes
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-4 leading-snug">
                  {poll.question}
                </h3>

                {/* Options List */}
                <div className="space-y-2.5">
                  {poll.options.map((opt) => {
                    const percent = Math.round((opt.votes / Math.max(poll.totalVotes, 1)) * 100);
                    const isSelected = userSelectedOptId === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleVote(poll.id, opt.id)}
                        disabled={hasVoted}
                        className={`w-full text-left p-3 rounded-xl border relative overflow-hidden transition-all text-xs ${
                          isSelected
                            ? 'bg-sky-950/60 border-sky-500 font-semibold text-white'
                            : hasVoted
                            ? 'bg-slate-950/60 border-slate-800/80 text-slate-300 cursor-default'
                            : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        {/* Animated Percentage Fill Bar */}
                        {hasVoted && (
                          <div
                            className={`absolute left-0 top-0 bottom-0 opacity-20 transition-all duration-700 ${
                              isSelected ? 'bg-sky-400' : 'bg-slate-400'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        )}

                        <div className="relative flex items-center justify-between gap-2">
                          <span className="truncate pr-2">{opt.text}</span>
                          {hasVoted && (
                            <span className="font-mono tabular-nums font-bold text-sky-400 shrink-0">
                              {percent}%
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
                <span>{hasVoted ? '✓ Vote recorded' : 'Tap any option to cast your vote'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
