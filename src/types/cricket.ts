/**
 * Core Cricket Data Model & Type Definitions for CricInfo+
 */

export type MatchFormat = 'TEST' | 'ODI' | 'T20I' | 'T20' | 'THE_HUNDRED';

export type MatchStatus = 
  | 'scheduled' 
  | 'toss' 
  | 'live' 
  | 'innings_break' 
  | 'rain_delay' 
  | 'stumps' 
  | 'completed' 
  | 'abandoned' 
  | 'postponed';

export type MatchGender = 'men' | 'women';
export type MatchCategory = 'international' | 'domestic' | 'league';

export interface CricketTeam {
  id: string;
  name: string;
  shortName: string;
  code: string;
  flag: string; // SVG or icon code
  primaryColor: string;
  secondaryColor: string;
  ranking?: {
    test?: number;
    odi?: number;
    t20i?: number;
  };
  captain?: string;
  coach?: string;
  squad?: string[];
  recentForm?: ('W' | 'L' | 'D' | 'T' | 'NR')[];
  description?: string;
}

export interface BattingFigure {
  playerId: string;
  playerName: string;
  isStriker?: boolean;
  isNonStriker?: boolean;
  dismissal: string; // e.g. "c Carey b Cummins", "not out", "b Bumrah", "lbw b Starc"
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  dots?: number;
}

export interface BowlingFigure {
  playerId: string;
  playerName: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  dots: number;
  wides: number;
  noBalls: number;
  isCurrentBowler?: boolean;
}

export interface FallOfWicket {
  wicketNumber: number;
  score: number;
  over: number;
  ball: number;
  batsmanName: string;
}

export interface Partnership {
  batter1: string;
  batter1Runs: number;
  batter2: string;
  batter2Runs: number;
  totalRuns: number;
  totalBalls: number;
  wicketNumber: number;
}

export interface InningsDetails {
  inningsNumber: number;
  teamId: string;
  teamName: string;
  teamCode: string;
  runs: number;
  wickets: number;
  overs: number;
  declared?: boolean;
  followOn?: boolean;
  byes: number;
  legByes: number;
  wides: number;
  noBalls: number;
  penaltyRuns: number;
  totalExtras: number;
  battingFigures: BattingFigure[];
  bowlingFigures: BowlingFigure[];
  fallOfWickets: FallOfWicket[];
  didNotBat: string[];
  partnerships: Partnership[];
  currentRunRate: number;
  target?: number;
  requiredRunRate?: number;
}

export interface BallDelivery {
  id: string;
  over: number;
  ball: number; // 1 to 6
  legalBallNumber: number;
  inningsNumber: number;
  batterId: string;
  batterName: string;
  bowlerId: string;
  bowlerName: string;
  runsScored: number;
  extras: {
    type?: 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'penalty';
    runs: number;
  };
  totalRunsOnBall: number;
  isWicket: boolean;
  wicketDetails?: {
    type: 'bowled' | 'caught' | 'lbw' | 'run_out' | 'stumped' | 'hit_wicket';
    dismissedPlayerName: string;
    fielderName?: string;
    description: string;
  };
  isFour: boolean;
  isSix: boolean;
  isDot: boolean;
  commentary: string;
  timestamp: string;
  cumulativeScore: number;
  cumulativeWickets: number;
  currentOverRunTotal?: number;
}

export interface OverSummary {
  overNumber: number;
  bowlerName: string;
  runsInOver: number;
  wicketsInOver: number;
  ballsSummary: ('0' | '1' | '2' | '3' | '4' | '6' | 'W' | 'Wd' | 'Nb' | 'B' | 'Lb')[];
  cumulativeScore: string; // e.g. "145/3"
}

export interface MatchVenue {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity?: number;
  pitchCondition?: string;
  averageFirstInningsScore?: number;
}

export interface MatchOfficials {
  umpires: string[];
  thirdUmpire: string;
  matchReferee: string;
}

export interface CricketMatch {
  id: string;
  seriesId: string;
  seriesName: string;
  matchNumber: string; // e.g. "3rd Test", "Match 24", "Final"
  format: MatchFormat;
  category: MatchCategory;
  gender: MatchGender;
  status: MatchStatus;
  statusNote: string; // e.g. "India need 34 runs in 22 balls", "Stumps: Day 3 - Australia lead by 182 runs"
  resultNote?: string; // e.g. "India won by 6 wickets", "Match Drawn"
  winningTeamId?: string;
  playerOfTheMatch?: {
    id: string;
    name: string;
    team: string;
    performance: string;
  };
  venue: MatchVenue;
  officials?: MatchOfficials;
  startTime: string; // ISO string
  toss?: {
    winnerTeamId: string;
    decision: 'bat' | 'bowl';
  };
  teamHome: CricketTeam;
  teamAway: CricketTeam;
  innings: InningsDetails[];
  currentInningsIndex: number;
  winProbability?: {
    teamHomePercent: number;
    teamAwayPercent: number;
    drawPercent?: number;
  };
  dlsTarget?: {
    revisedOvers: number;
    targetScore: number;
    dlsMethod: string;
  };
  deliveries: BallDelivery[];
  playingXI?: {
    teamHome: string[];
    teamAway: string[];
  };
  wagonWheelData?: WagonWheelPoint[];
}

export interface WagonWheelPoint {
  id: string;
  angle: number; // 0 to 360 degrees
  distance: number; // 0 to 100 percentage
  runs: number;
  batterName: string;
  shotType?: string;
}

export interface TeamStanding {
  position: number;
  team: CricketTeam;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRunRate: number;
  recentForm: ('W' | 'L' | 'D' | 'NR')[];
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  season: string;
  format: MatchFormat;
  category: MatchCategory;
  startDate: string;
  endDate: string;
  hostCountry: string;
  standings: TeamStanding[];
  topBatters: {
    name: string;
    team: string;
    runs: number;
    innings: number;
    average: number;
    strikeRate: number;
    hundreds: number;
  }[];
  topBowlers: {
    name: string;
    team: string;
    wickets: number;
    overs: number;
    average: number;
    economy: number;
    bestBowling: string;
  }[];
}

export interface PlayerProfile {
  id: string;
  name: string;
  fullName: string;
  country: string;
  teamCode: string;
  role: 'Top-order Batter' | 'Middle-order Batter' | 'Wicketkeeper Batter' | 'Batting All-rounder' | 'Bowling All-rounder' | 'Pace Bowler' | 'Spin Bowler';
  battingStyle: string;
  bowlingStyle: string;
  born: string;
  age: number;
  avatarUrl?: string;
  iccRankings: {
    test?: { rank: number; best: number };
    odi?: { rank: number; best: number };
    t20i?: { rank: number; best: number };
  };
  careerStats: {
    test: PlayerFormatStats;
    odi: PlayerFormatStats;
    t20i: PlayerFormatStats;
  };
  recentInnings: {
    date: string;
    vs: string;
    format: MatchFormat;
    runs: number;
    balls: number;
    wickets?: number;
    overs?: number;
    result: string;
  }[];
  bio: string;
}

export interface PlayerFormatStats {
  matches: number;
  innings: number;
  runs: number;
  highestScore: string;
  battingAverage: number;
  strikeRate: number;
  centuries: number;
  fifties: number;
  wickets: number;
  bowlingAverage?: number;
  economy?: number;
  bestBowling?: string;
  fiveWickets?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Breaking' | 'Match Report' | 'Analysis' | 'Feature' | 'Interview' | 'Squad News';
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  summary: string;
  content: string[];
  relatedMatchId?: string;
  tags: string[];
}

export interface VideoHighlight {
  id: string;
  title: string;
  duration: string;
  category: 'Highlights' | 'Wickets' | 'Best Catches' | 'Press Conference' | 'Analysis';
  matchTitle: string;
  views: string;
  thumbnailUrl: string;
  videoUrl?: string;
  date: string;
}

export interface ICCRankingEntry {
  rank: number;
  name: string;
  country: string;
  rating: number;
  points?: number;
  trend: 'up' | 'down' | 'steady';
  change?: number;
}

export interface ICCRankings {
  updatedAt: string;
  teams: {
    test: ICCRankingEntry[];
    odi: ICCRankingEntry[];
    t20i: ICCRankingEntry[];
  };
  batting: {
    test: ICCRankingEntry[];
    odi: ICCRankingEntry[];
    t20i: ICCRankingEntry[];
  };
  bowling: {
    test: ICCRankingEntry[];
    odi: ICCRankingEntry[];
    t20i: ICCRankingEntry[];
  };
  allRounders: {
    test: ICCRankingEntry[];
    odi: ICCRankingEntry[];
    t20i: ICCRankingEntry[];
  };
}

export interface WorldRecord {
  id: string;
  category: string;
  title: string;
  recordHolder: string;
  value: string;
  teamVs: string;
  date: string;
  venue: string;
  format: MatchFormat;
}

export interface MatchReminderConfig {
  matchId: string;
  leadTimeMinutes: number; // e.g. 15, 30, 60, or 0 (at match start)
  notifyToss: boolean;
  notifyInningsBreak: boolean;
  notifyCloseFinish: boolean;
  createdAt: string;
}

export interface UserPreferences {
  favoriteTeams: string[];
  favoritePlayers: string[];
  followedTournaments: string[];
  savedArticles: string[];
  reminders: string[]; // match IDs
  reminderConfigs?: Record<string, MatchReminderConfig>;
  browserNotificationsEnabled?: boolean;
  theme: 'dark' | 'light';
  timezone: string;
  soundAlerts: boolean;
}
