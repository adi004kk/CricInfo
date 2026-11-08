import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CricketMatch, 
  CricketTeam, 
  PlayerProfile, 
  Tournament, 
  ICCRankings, 
  NewsArticle, 
  VideoHighlight, 
  WorldRecord, 
  UserPreferences,
  MatchReminderConfig
} from '../types/cricket';
import { cricketService } from '../services/cricketService';
import { playReminderChime } from '../utils/audioChime';
import confetti from 'canvas-confetti';

export type AppNavTab = 
  | 'home' 
  | 'matches' 
  | 'match-center' 
  | 'tournaments' 
  | 'rankings' 
  | 'stats' 
  | 'statguru'
  | 'fantasy'
  | 'dls'
  | 'archives'
  | 'polls'
  | 'players' 
  | 'teams' 
  | 'news' 
  | 'videos'
  | 'saved';

interface CricketContextType {
  matches: CricketMatch[];
  selectedMatch: CricketMatch | null;
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string | null) => void;
  selectedPlayer: PlayerProfile | null;
  selectedPlayerId: string | null;
  setSelectedPlayerId: (id: string | null) => void;
  selectedTeam: CricketTeam | null;
  selectedTeamId: string | null;
  setSelectedTeamId: (id: string | null) => void;
  selectedTournament: Tournament | null;
  selectedTournamentId: string | null;
  setSelectedTournamentId: (id: string | null) => void;
  selectedArticle: NewsArticle | null;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  activeNavTab: AppNavTab;
  setActiveNavTab: (tab: AppNavTab) => void;
  
  // Filtering
  matchStatusFilter: 'all' | 'live' | 'upcoming' | 'completed';
  setMatchStatusFilter: (status: 'all' | 'live' | 'upcoming' | 'completed') => void;
  matchFormatFilter: 'all' | 'TEST' | 'ODI' | 'T20';
  setMatchFormatFilter: (format: 'all' | 'TEST' | 'ODI' | 'T20') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Datasets
  players: PlayerProfile[];
  teams: CricketTeam[];
  tournaments: Tournament[];
  rankings: ICCRankings | null;
  news: NewsArticle[];
  videos: VideoHighlight[];
  records: WorldRecord[];

  // User preferences & personalization
  preferences: UserPreferences;
  toggleFavoriteTeam: (teamId: string) => void;
  toggleFavoritePlayer: (playerId: string) => void;
  toggleSaveArticle: (articleId: string) => void;
  toggleTheme: () => void;
  toggleMatchReminder: (matchId: string, leadTimeMinutes?: number) => void;
  updateReminderConfig: (matchId: string, updates: Partial<MatchReminderConfig>) => void;
  clearAllReminders: () => void;
  toggleSoundAlerts: () => void;
  isRemindersModalOpen: boolean;
  setIsRemindersModalOpen: (open: boolean) => void;
  toast: { id: string; title: string; message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: () => void;
  triggerTestReminderAlert: (matchId?: string) => void;

  // Live simulation controls
  isLiveSimulationActive: boolean;
  setIsLiveSimulationActive: (active: boolean) => void;
  isAudioCommentaryEnabled: boolean;
  setIsAudioCommentaryEnabled: (enabled: boolean) => void;
  simulateNextBall: (matchId?: string) => void;
  lastSimulatedDelivery: string | null;
}

const CricketContext = createContext<CricketContextType | undefined>(undefined);

import { 
  INITIAL_MATCHES, 
  PLAYERS, 
  TEAMS, 
  TOURNAMENTS, 
  ICC_RANKINGS, 
  NEWS_ARTICLES, 
  VIDEOS, 
  WORLD_RECORDS 
} from '../data/mockCricketData';

export const CricketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<CricketMatch[]>(() => INITIAL_MATCHES);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>('match-ind-aus-test');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>('p-virat');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>('IND');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>('wtc-2025-27');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>('news-1');
  const [activeNavTab, setActiveNavTab] = useState<AppNavTab>('home');

  const [matchStatusFilter, setMatchStatusFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [matchFormatFilter, setMatchFormatFilter] = useState<'all' | 'TEST' | 'ODI' | 'T20'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [players, setPlayers] = useState<PlayerProfile[]>(() => PLAYERS);
  const [teams, setTeams] = useState<CricketTeam[]>(() => Object.values(TEAMS));
  const [tournaments, setTournaments] = useState<Tournament[]>(() => TOURNAMENTS);
  const [rankings, setRankings] = useState<ICCRankings | null>(() => ICC_RANKINGS);
  const [news, setNews] = useState<NewsArticle[]>(() => NEWS_ARTICLES);
  const [videos, setVideos] = useState<VideoHighlight[]>(() => VIDEOS);
  const [records, setRecords] = useState<WorldRecord[]>(() => WORLD_RECORDS);

  const [isLiveSimulationActive, setIsLiveSimulationActive] = useState(false);
  const [isAudioCommentaryEnabled, setIsAudioCommentaryEnabled] = useState(false);
  const [lastSimulatedDelivery, setLastSimulatedDelivery] = useState<string | null>(null);

  // Reminders & Toast UI states
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false);
  const [toast, setToast] = useState<{ id: string; title: string; message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // User preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('cricinfo_prefs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      favoriteTeams: ['IND', 'AUS'],
      favoritePlayers: ['p-virat', 'p-bumrah'],
      followedTournaments: ['wtc-2025-27', 'ipl-2026'],
      savedArticles: ['news-1'],
      reminders: ['match-pak-nz-odi'],
      reminderConfigs: {
        'match-pak-nz-odi': {
          matchId: 'match-pak-nz-odi',
          leadTimeMinutes: 15,
          notifyToss: true,
          notifyInningsBreak: true,
          notifyCloseFinish: true,
          createdAt: new Date().toISOString()
        }
      },
      browserNotificationsEnabled: false,
      theme: 'dark',
      timezone: 'UTC+5:30',
      soundAlerts: true
    };
  });

  useEffect(() => {
    localStorage.setItem('cricinfo_prefs', JSON.stringify(preferences));
  }, [preferences]);

  // Initial load
  useEffect(() => {
    const initData = async () => {
      const [m, p, t, tr, r, n, v, rec] = await Promise.all([
        cricketService.getMatches(),
        cricketService.getPlayers(),
        cricketService.getTeams(),
        cricketService.getTournaments(),
        cricketService.getRankings(),
        cricketService.getNews(),
        cricketService.getVideos(),
        cricketService.getWorldRecords()
      ]);
      setMatches(m);
      setPlayers(p);
      setTeams(t);
      setTournaments(tr);
      setRankings(r);
      setNews(n);
      setVideos(v);
      setRecords(rec);
    };
    initData();
  }, []);

  // Ball-by-ball simulation ticker
  const simulateNextBall = (targetMatchId?: string) => {
    const matchId = targetMatchId || selectedMatchId || 'match-ind-aus-test';
    const result = cricketService.simulateNextDelivery(matchId);
    if (result) {
      setMatches(prev => prev.map(m => m.id === result.match.id ? { ...result.match } : m));
      setLastSimulatedDelivery(result.newDelivery.commentary);

      // Audio commentary announcement using Web Speech API if enabled
      if (isAudioCommentaryEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const text = result.newDelivery.isWicket
            ? `Wicket! ${result.newDelivery.batterName} is out! Over ${result.newDelivery.over}.${result.newDelivery.ball}.`
            : result.newDelivery.isSix
            ? `Six! Maximum from ${result.newDelivery.batterName}! Over ${result.newDelivery.over}.${result.newDelivery.ball}.`
            : result.newDelivery.isFour
            ? `Four runs! Smashed to the boundary by ${result.newDelivery.batterName}.`
            : `${result.newDelivery.runsScored} run. Over ${result.newDelivery.over}.${result.newDelivery.ball}.`;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 1.05;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          // Ignore speech failures in restricted sandboxes
        }
      }

      // Trigger celebratory confetti on big events
      if (result.newDelivery.isSix || (result.newDelivery.isWicket && Math.random() > 0.4)) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#0ea5e9', '#10b981', '#ffffff', '#ef4444']
        });
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLiveSimulationActive) {
      interval = setInterval(() => {
        simulateNextBall(selectedMatchId || 'match-ind-aus-test');
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLiveSimulationActive, selectedMatchId]);

  // Action helpers
  const toggleFavoriteTeam = (teamId: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteTeams: prev.favoriteTeams.includes(teamId)
        ? prev.favoriteTeams.filter(id => id !== teamId)
        : [...prev.favoriteTeams, teamId]
    }));
  };

  const toggleFavoritePlayer = (playerId: string) => {
    setPreferences(prev => ({
      ...prev,
      favoritePlayers: prev.favoritePlayers.includes(playerId)
        ? prev.favoritePlayers.filter(id => id !== playerId)
        : [...prev.favoritePlayers, playerId]
    }));
  };

  const toggleSaveArticle = (articleId: string) => {
    setPreferences(prev => ({
      ...prev,
      savedArticles: prev.savedArticles.includes(articleId)
        ? prev.savedArticles.filter(id => id !== articleId)
        : [...prev.savedArticles, articleId]
    }));
  };

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToast({ id, title, message, type });
    setTimeout(() => {
      setToast(current => current?.id === id ? null : current);
    }, 4000);
  };

  const dismissToast = () => setToast(null);

  const toggleMatchReminder = (matchId: string, leadTimeMinutes: number = 15) => {
    const targetMatch = matches.find(m => m.id === matchId);
    const matchName = targetMatch ? `${targetMatch.teamHome.name} vs ${targetMatch.teamAway.name}` : 'Match';
    
    setPreferences(prev => {
      const isCurrentlySet = prev.reminders.includes(matchId);
      if (isCurrentlySet) {
        const newReminders = prev.reminders.filter(id => id !== matchId);
        const newConfigs = { ...(prev.reminderConfigs || {}) };
        delete newConfigs[matchId];
        showToast('Reminder Cancelled', `Alert removed for ${matchName}.`, 'info');
        return { ...prev, reminders: newReminders, reminderConfigs: newConfigs };
      } else {
        const newReminders = [...prev.reminders, matchId];
        const newConfig: MatchReminderConfig = {
          matchId,
          leadTimeMinutes,
          notifyToss: true,
          notifyInningsBreak: true,
          notifyCloseFinish: true,
          createdAt: new Date().toISOString()
        };
        if (prev.soundAlerts) {
          playReminderChime();
        }
        showToast('Reminder Scheduled', `You will be alerted ${leadTimeMinutes > 0 ? `${leadTimeMinutes}m before` : 'at start of'} ${matchName}.`, 'success');
        return {
          ...prev,
          reminders: newReminders,
          reminderConfigs: {
            ...(prev.reminderConfigs || {}),
            [matchId]: newConfig
          }
        };
      }
    });
  };

  const updateReminderConfig = (matchId: string, updates: Partial<MatchReminderConfig>) => {
    setPreferences(prev => {
      const existing = prev.reminderConfigs?.[matchId] || {
        matchId,
        leadTimeMinutes: 15,
        notifyToss: true,
        notifyInningsBreak: true,
        notifyCloseFinish: true,
        createdAt: new Date().toISOString()
      };
      return {
        ...prev,
        reminderConfigs: {
          ...(prev.reminderConfigs || {}),
          [matchId]: { ...existing, ...updates }
        }
      };
    });
    showToast('Preferences Saved', 'Reminder alert settings updated.', 'info');
  };

  const clearAllReminders = () => {
    setPreferences(prev => ({ ...prev, reminders: [], reminderConfigs: {} }));
    showToast('Reminders Cleared', 'All scheduled match alerts have been removed.', 'info');
  };

  const toggleSoundAlerts = () => {
    setPreferences(prev => {
      const next = !prev.soundAlerts;
      if (next) playReminderChime();
      showToast(next ? 'Sound Alerts On' : 'Sound Alerts Muted', next ? 'Chime will play when reminders trigger.' : 'Notifications will be silent.', 'info');
      return { ...prev, soundAlerts: next };
    });
  };

  const triggerTestReminderAlert = (matchId?: string) => {
    const targetMatch = (matchId && matches.find(m => m.id === matchId)) || matches.find(m => m.status === 'scheduled') || matches[0];
    playReminderChime();
    showToast(
      '🏏 Match Starting Soon!',
      `Toss for ${targetMatch?.teamHome.name} vs ${targetMatch?.teamAway.name} (${targetMatch?.matchNumber}) is scheduled in 15 minutes!`,
      'warning'
    );
  };

  const selectedMatch = matches.find(m => m.id === selectedMatchId) || matches[0] || null;
  const selectedPlayer = players.find(p => p.id === selectedPlayerId) || players[0] || null;
  const selectedTeam = teams.find(t => t.id === selectedTeamId || t.code === selectedTeamId) || teams[0] || null;
  const selectedTournament = tournaments.find(t => t.id === selectedTournamentId) || tournaments[0] || null;
  const selectedArticle = news.find(n => n.id === selectedArticleId) || news[0] || null;

  return (
    <CricketContext.Provider
      value={{
        matches,
        selectedMatch,
        selectedMatchId,
        setSelectedMatchId,
        selectedPlayer,
        selectedPlayerId,
        setSelectedPlayerId,
        selectedTeam,
        selectedTeamId,
        setSelectedTeamId,
        selectedTournament,
        selectedTournamentId,
        setSelectedTournamentId,
        selectedArticle,
        selectedArticleId,
        setSelectedArticleId,
        activeNavTab,
        setActiveNavTab,
        matchStatusFilter,
        setMatchStatusFilter,
        matchFormatFilter,
        setMatchFormatFilter,
        searchQuery,
        setSearchQuery,
        players,
        teams,
        tournaments,
        rankings,
        news,
        videos,
        records,
        preferences,
        toggleFavoriteTeam,
        toggleFavoritePlayer,
        toggleSaveArticle,
        toggleTheme,
        toggleMatchReminder,
        updateReminderConfig,
        clearAllReminders,
        toggleSoundAlerts,
        isRemindersModalOpen,
        setIsRemindersModalOpen,
        toast,
        showToast,
        dismissToast,
        triggerTestReminderAlert,
        isLiveSimulationActive,
        setIsLiveSimulationActive,
        isAudioCommentaryEnabled,
        setIsAudioCommentaryEnabled,
        simulateNextBall,
        lastSimulatedDelivery
      }}
    >
      {children}
    </CricketContext.Provider>
  );
};

export const useCricket = () => {
  const context = useContext(CricketContext);
  if (!context) {
    throw new Error('useCricket must be used within a CricketProvider');
  }
  return context;
};
