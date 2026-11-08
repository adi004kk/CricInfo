import { 
  CricketMatch, 
  BallDelivery, 
  PlayerProfile, 
  CricketTeam, 
  Tournament, 
  ICCRankings, 
  NewsArticle, 
  VideoHighlight, 
  WorldRecord 
} from '../types/cricket';
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

export interface CricketDataProvider {
  getMatches: () => Promise<CricketMatch[]>;
  getMatchById: (id: string) => Promise<CricketMatch | undefined>;
  getPlayers: () => Promise<PlayerProfile[]>;
  getPlayerById: (id: string) => Promise<PlayerProfile | undefined>;
  getTeams: () => Promise<CricketTeam[]>;
  getTeamById: (id: string) => Promise<CricketTeam | undefined>;
  getTournaments: () => Promise<Tournament[]>;
  getRankings: () => Promise<ICCRankings>;
  getNews: () => Promise<NewsArticle[]>;
  getVideos: () => Promise<VideoHighlight[]>;
  getWorldRecords: () => Promise<WorldRecord[]>;
}

// Realistic commentary descriptions for live simulation
const SIMULATED_COMMENTARY = {
  dot: [
    'Good length delivery pitched on off stump, defended solidly off the front foot towards cover.',
    'Beaten! Angling across from over the wicket, squares the batter up as it zips past the outside edge.',
    'Sharp bouncer dug in short! The batter sways out of the line with disciplined glove tuck.',
    'Flatter and spinning sharply off the surface, tucked cautiously straight to silly mid-off.'
  ],
  single: [
    'Tapped gently with soft hands towards mid-on, quick call and they cross easily for one.',
    'Worked off the hip into the gap at backward square leg, comfortable single taken.',
    'Pushed down the ground past the non-striker to long-on for a brisk run.',
    'Steered down towards third man with open bat face, rotation of strike executed.'
  ],
  two: [
    'Whipped off middle stump into the vacant pocket between deep midwicket and long-on. Brilliant sprint between wickets for two.',
    'Punched through the covers off the back foot, sweet timing allows them to comfortably come back for the brace.'
  ],
  three: [
    'Cracked through extra cover! The sweeper runs around 30 yards to save the boundary, excellent commitment from the batters yielding three runs.'
  ],
  four: [
    'FOUR! Shot of supreme authority! Leans into a full delivery and caresses a classical cover drive racing to the fence!',
    'FOUR! Short and pulled with ferocious power! Crack of the willow echoes around the stadium as it thumps the midwicket boundary ropes!',
    'FOUR! Exquisite late cut! Waits for the spin, opens the bat face right at the death and guides it past slip!'
  ],
  six: [
    'SIX! HIGH, HANDSOME AND GARGANTUAN! Dancing down the pitch, meets the trajectory on the rise and sends it sailing 98 metres into the top tier!',
    'SIX! Picked off the hips and deposited over the deep backward square leg fence! Pure instinctive brilliance!'
  ],
  wicket: [
    'OUT! GONE! TIMBER! A 146kph thunderbolt yorker shatters the off stump! The bowler lets out a guttural roar as the bails fly 20 yards!',
    'OUT! EDGED AND TAKEN! Full, tempting outside off, the batter reaches out and provides a feather edge safely pouching into the keeper\'s gloves!',
    'OUT! PLUMB LBW! Rapid in-ducker crashes right into the front pad before the bat can come down. The umpire raises the finger without hesitation!'
  ]
};

export class MockCricketProvider implements CricketDataProvider {
  private matches: CricketMatch[] = JSON.parse(JSON.stringify(INITIAL_MATCHES));
  private players: PlayerProfile[] = JSON.parse(JSON.stringify(PLAYERS));
  private teams: CricketTeam[] = Object.values(TEAMS);
  private tournaments: Tournament[] = JSON.parse(JSON.stringify(TOURNAMENTS));
  private rankings: ICCRankings = JSON.parse(JSON.stringify(ICC_RANKINGS));
  private news: NewsArticle[] = JSON.parse(JSON.stringify(NEWS_ARTICLES));
  private videos: VideoHighlight[] = JSON.parse(JSON.stringify(VIDEOS));
  private records: WorldRecord[] = JSON.parse(JSON.stringify(WORLD_RECORDS));

  async getMatches(): Promise<CricketMatch[]> {
    return this.matches;
  }

  async getMatchById(id: string): Promise<CricketMatch | undefined> {
    return this.matches.find(m => m.id === id);
  }

  async getPlayers(): Promise<PlayerProfile[]> {
    return this.players;
  }

  async getPlayerById(id: string): Promise<PlayerProfile | undefined> {
    return this.players.find(p => p.id === id);
  }

  async getTeams(): Promise<CricketTeam[]> {
    return this.teams;
  }

  async getTeamById(id: string): Promise<CricketTeam | undefined> {
    return this.teams.find(t => t.id === id || t.code === id);
  }

  async getTournaments(): Promise<Tournament[]> {
    return this.tournaments;
  }

  async getRankings(): Promise<ICCRankings> {
    return this.rankings;
  }

  async getNews(): Promise<NewsArticle[]> {
    return this.news;
  }

  async getVideos(): Promise<VideoHighlight[]> {
    return this.videos;
  }

  async getWorldRecords(): Promise<WorldRecord[]> {
    return this.records;
  }

  /**
   * Deterministic real-time live ball simulation
   * Simulates a delivery on the specified match and updates all batting, bowling, innings, and target stats reactively.
   */
  simulateNextDelivery(matchId: string): { match: CricketMatch; newDelivery: BallDelivery } | null {
    const match = this.matches.find(m => m.id === matchId);
    if (!match || match.status !== 'live') return null;

    const currentInnings = match.innings[match.currentInningsIndex];
    if (!currentInnings) return null;

    // Determine current over and ball
    const currentOverDecimal = currentInnings.overs;
    const completedOvers = Math.floor(currentOverDecimal);
    const ballsInCurrentOver = Math.round((currentOverDecimal - completedOvers) * 10);

    const nextBallInOver = ballsInCurrentOver >= 5 ? 1 : ballsInCurrentOver + 1;
    const nextOverNumber = ballsInCurrentOver >= 5 ? completedOvers + 1 : completedOvers;

    // Pick active striker and non-striker
    const striker = currentInnings.battingFigures.find(b => b.isStriker) || currentInnings.battingFigures[0];
    const nonStriker = currentInnings.battingFigures.find(b => b.isNonStriker) || currentInnings.battingFigures[1] || currentInnings.battingFigures[0];
    const bowler = currentInnings.bowlingFigures.find(b => b.isCurrentBowler) || currentInnings.bowlingFigures[0];

    // Outcome generation probabilities
    const rand = Math.random();
    let runsScored = 0;
    let isWicket = false;
    let isFour = false;
    let isSix = false;
    let isDot = false;
    let commentary = '';

    if (rand < 0.08) {
      // Wicket
      isWicket = true;
      runsScored = 0;
      const wicketComments = SIMULATED_COMMENTARY.wicket;
      commentary = wicketComments[Math.floor(Math.random() * wicketComments.length)];
    } else if (rand < 0.40) {
      // Dot ball
      isDot = true;
      runsScored = 0;
      const dotComments = SIMULATED_COMMENTARY.dot;
      commentary = dotComments[Math.floor(Math.random() * dotComments.length)];
    } else if (rand < 0.72) {
      // 1 Run
      runsScored = 1;
      const sComments = SIMULATED_COMMENTARY.single;
      commentary = sComments[Math.floor(Math.random() * sComments.length)];
    } else if (rand < 0.84) {
      // 2 Runs
      runsScored = 2;
      const twoComments = SIMULATED_COMMENTARY.two;
      commentary = twoComments[Math.floor(Math.random() * twoComments.length)];
    } else if (rand < 0.94) {
      // Four
      isFour = true;
      runsScored = 4;
      const fourComments = SIMULATED_COMMENTARY.four;
      commentary = fourComments[Math.floor(Math.random() * fourComments.length)];
    } else {
      // Six
      isSix = true;
      runsScored = 6;
      const sixComments = SIMULATED_COMMENTARY.six;
      commentary = sixComments[Math.floor(Math.random() * sixComments.length)];
    }

    // Update cumulative score & wickets
    const newTotalRuns = currentInnings.runs + runsScored;
    const newTotalWickets = isWicket ? currentInnings.wickets + 1 : currentInnings.wickets;

    // Update over string representation: e.g. 68.4 -> 68.5 or 69.0
    const newOvers = nextBallInOver === 6 ? nextOverNumber + 0.6 : nextOverNumber + (nextBallInOver / 10);
    const normalizedOvers = nextBallInOver === 6 ? nextOverNumber + 1 : (completedOvers + (nextBallInOver / 10));

    // Create delivery object
    const newDelivery: BallDelivery = {
      id: `sim-del-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      over: nextOverNumber,
      ball: nextBallInOver,
      legalBallNumber: nextBallInOver,
      inningsNumber: currentInnings.inningsNumber,
      batterId: striker?.playerId || 'striker-1',
      batterName: striker?.playerName || 'Striker',
      bowlerId: bowler?.playerId || 'bowler-1',
      bowlerName: bowler?.playerName || 'Bowler',
      runsScored,
      extras: { runs: 0 },
      totalRunsOnBall: runsScored,
      isWicket,
      isFour,
      isSix,
      isDot,
      commentary: `${nextOverNumber}.${nextBallInOver}: ${commentary}`,
      timestamp: new Date().toISOString(),
      cumulativeScore: newTotalRuns,
      cumulativeWickets: newTotalWickets
    };

    // Update Innings
    currentInnings.runs = newTotalRuns;
    currentInnings.wickets = newTotalWickets;
    currentInnings.overs = parseFloat(normalizedOvers.toFixed(1));
    const totalLegalBalls = (completedOvers * 6) + nextBallInOver;
    currentInnings.currentRunRate = parseFloat(((newTotalRuns / Math.max(totalLegalBalls, 1)) * 6).toFixed(2));

    // Update striker batting figures
    if (striker) {
      striker.runs += runsScored;
      striker.balls += 1;
      if (isFour) striker.fours += 1;
      if (isSix) striker.sixes += 1;
      if (isDot) striker.dots = (striker.dots || 0) + 1;
      striker.strikeRate = parseFloat(((striker.runs / striker.balls) * 100).toFixed(1));

      if (isWicket) {
        striker.isStriker = false;
        striker.dismissal = `c Carey b ${bowler.playerName}`;
      }
    }

    // Update bowler figures
    if (bowler) {
      bowler.runs += runsScored;
      if (isWicket) bowler.wickets += 1;
      if (isDot) bowler.dots += 1;
      const bowlerBalls = (Math.floor(bowler.overs) * 6) + Math.round((bowler.overs % 1) * 10) + 1;
      const bCompleted = Math.floor(bowlerBalls / 6);
      const bRem = bowlerBalls % 6;
      bowler.overs = parseFloat((bCompleted + (bRem / 10)).toFixed(1));
      bowler.economy = parseFloat(((bowler.runs / Math.max(bowlerBalls, 1)) * 6).toFixed(2));
    }

    // Strike rotation on odd runs or end of over
    const rotatesOnRuns = runsScored % 2 !== 0;
    const isOverEnd = nextBallInOver === 6;
    if (rotatesOnRuns !== isOverEnd) {
      if (striker && nonStriker && !isWicket) {
        striker.isStriker = false;
        striker.isNonStriker = true;
        nonStriker.isStriker = true;
        nonStriker.isNonStriker = false;
      }
    }

    // Update match deliveries array (newest at top for live feed)
    match.deliveries.unshift(newDelivery);

    // Update target status note if applicable
    if (currentInnings.target) {
      const runsNeeded = currentInnings.target - newTotalRuns;
      if (runsNeeded <= 0) {
        match.status = 'completed';
        match.resultNote = `${currentInnings.teamName} won by ${10 - newTotalWickets} wickets!`;
        match.statusNote = match.resultNote;
      } else {
        match.statusNote = `${currentInnings.teamName} need ${runsNeeded} runs with ${10 - newTotalWickets} wickets remaining`;
      }
    }

    return { match, newDelivery };
  }
}

export const cricketService = new MockCricketProvider();
