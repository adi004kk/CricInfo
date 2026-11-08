import { 
  CricketMatch, 
  CricketTeam, 
  PlayerProfile, 
  Tournament, 
  ICCRankings, 
  NewsArticle, 
  VideoHighlight, 
  WorldRecord 
} from '../types/cricket';

export const TEAMS: Record<string, CricketTeam> = {
  IND: {
    id: 'IND',
    name: 'India',
    shortName: 'India',
    code: 'IND',
    flag: '🇮🇳',
    primaryColor: '#0055A5',
    secondaryColor: '#FF671F',
    captain: 'Rohit Sharma',
    coach: 'Gautam Gambhir',
    ranking: { test: 1, odi: 1, t20i: 1 },
    recentForm: ['W', 'W', 'W', 'L', 'W'],
    description: 'The Men in Blue, two-time World Test Championship finalists and dominant global powerhouse.'
  },
  AUS: {
    id: 'AUS',
    name: 'Australia',
    shortName: 'Australia',
    code: 'AUS',
    flag: '🇦🇺',
    primaryColor: '#006432',
    secondaryColor: '#FFD700',
    captain: 'Pat Cummins',
    coach: 'Andrew McDonald',
    ranking: { test: 2, odi: 2, t20i: 2 },
    recentForm: ['W', 'L', 'W', 'W', 'W'],
    description: 'Reigning World Test Champions and six-time ODI World Cup victors with unmatched pedigree.'
  },
  ENG: {
    id: 'ENG',
    name: 'England',
    shortName: 'England',
    code: 'ENG',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    primaryColor: '#CE1124',
    secondaryColor: '#00247D',
    captain: 'Jos Buttler',
    coach: 'Brendon McCullum',
    ranking: { test: 3, odi: 5, t20i: 3 },
    recentForm: ['W', 'W', 'L', 'L', 'W'],
    description: 'Pioneers of ultra-aggressive modern cricket across all three competitive formats.'
  },
  SA: {
    id: 'SA',
    name: 'South Africa',
    shortName: 'South Africa',
    code: 'SA',
    flag: '🇿🇦',
    primaryColor: '#007A4D',
    secondaryColor: '#FFB612',
    captain: 'Aiden Markram',
    coach: 'Rob Walter',
    ranking: { test: 4, odi: 3, t20i: 4 },
    recentForm: ['L', 'W', 'W', 'W', 'L'],
    description: 'The Proteas, lethal pace attack and explosive middle-order match winners.'
  },
  PAK: {
    id: 'PAK',
    name: 'Pakistan',
    shortName: 'Pakistan',
    code: 'PAK',
    flag: '🇵🇰',
    primaryColor: '#01411C',
    secondaryColor: '#9BC53D',
    captain: 'Mohammad Rizwan',
    coach: 'Jason Gillespie',
    ranking: { test: 6, odi: 4, t20i: 7 },
    recentForm: ['W', 'L', 'W', 'L', 'L'],
    description: 'Unpredictable, fiery fast bowling lineage and gifted stroke-makers.'
  },
  NZ: {
    id: 'NZ',
    name: 'New Zealand',
    shortName: 'New Zealand',
    code: 'NZ',
    flag: '🇳🇿',
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    captain: 'Kane Williamson',
    coach: 'Gary Stead',
    ranking: { test: 5, odi: 6, t20i: 5 },
    recentForm: ['W', 'W', 'L', 'W', 'L'],
    description: 'Blackcaps, celebrated for discipline, technical resilience, and tactical excellence.'
  },
  CSK: {
    id: 'CSK',
    name: 'Chennai Super Kings',
    shortName: 'Chennai',
    code: 'CSK',
    flag: '🦁',
    primaryColor: '#FDB913',
    secondaryColor: '#005DA0',
    captain: 'Ruturaj Gaikwad',
    coach: 'Stephen Fleming',
    recentForm: ['W', 'W', 'L', 'W', 'W'],
    description: 'Five-time league champions renowned for calm pressure management.'
  },
  MI: {
    id: 'MI',
    name: 'Mumbai Indians',
    shortName: 'Mumbai',
    code: 'MI',
    flag: '⚡',
    primaryColor: '#004B87',
    secondaryColor: '#D1AB3E',
    captain: 'Hardik Pandya',
    coach: 'Mahela Jayawardene',
    recentForm: ['W', 'L', 'W', 'L', 'W'],
    description: 'Five-time champions with an unmatched scouting system and star-studded squad.'
  }
};

export const INITIAL_MATCHES: CricketMatch[] = [
  {
    id: 'match-ind-aus-test',
    seriesId: 'bgt-2026',
    seriesName: 'Border-Gavaskar Trophy 2026-27',
    matchNumber: '3rd Test',
    format: 'TEST',
    category: 'international',
    gender: 'men',
    status: 'live',
    statusNote: 'Day 4 - Final Session: India need 48 runs with 4 wickets in hand',
    venue: {
      id: 'mcg',
      name: 'Melbourne Cricket Ground',
      city: 'Melbourne',
      country: 'Australia',
      capacity: 100024,
      pitchCondition: 'Even bounce, slight reverse swing, spin taking purchase on footmarks.'
    },
    officials: {
      umpires: ['Richard Illingworth', 'Kumar Dharmasena'],
      thirdUmpire: 'Michael Gough',
      matchReferee: 'Javagal Srinath'
    },
    startTime: '2026-10-26T00:30:00Z',
    toss: {
      winnerTeamId: 'AUS',
      decision: 'bat'
    },
    teamHome: TEAMS.AUS,
    teamAway: TEAMS.IND,
    currentInningsIndex: 3,
    winProbability: {
      teamHomePercent: 38,
      teamAwayPercent: 54,
      drawPercent: 8
    },
    innings: [
      {
        inningsNumber: 1,
        teamId: 'AUS',
        teamName: 'Australia',
        teamCode: 'AUS',
        runs: 348,
        wickets: 10,
        overs: 104.2,
        byes: 4,
        legByes: 8,
        wides: 3,
        noBalls: 1,
        penaltyRuns: 0,
        totalExtras: 16,
        currentRunRate: 3.33,
        battingFigures: [
          { playerId: 'p-usman', playerName: 'Usman Khawaja', dismissal: 'c Pant b Bumrah', runs: 74, balls: 156, fours: 8, sixes: 0, strikeRate: 47.4 },
          { playerId: 'p-marnus', playerName: 'Marnus Labuschagne', dismissal: 'c Gill b Siraj', runs: 42, balls: 98, fours: 5, sixes: 0, strikeRate: 42.8 },
          { playerId: 'p-steve', playerName: 'Steve Smith', dismissal: 'b Jadeja', runs: 89, balls: 168, fours: 10, sixes: 1, strikeRate: 52.9 },
          { playerId: 'p-travis', playerName: 'Travis Head', dismissal: 'c Rohit b Ashwin', runs: 62, balls: 69, fours: 9, sixes: 2, strikeRate: 89.8 },
          { playerId: 'p-alex', playerName: 'Alex Carey', dismissal: 'b Bumrah', runs: 35, balls: 54, fours: 4, sixes: 0, strikeRate: 64.8 },
          { playerId: 'p-cummins', playerName: 'Pat Cummins', dismissal: 'not out', runs: 28, balls: 45, fours: 3, sixes: 1, strikeRate: 62.2 }
        ],
        bowlingFigures: [
          { playerId: 'p-bumrah', playerName: 'Jasprit Bumrah', overs: 24.2, maidens: 6, runs: 68, wickets: 4, economy: 2.79, dots: 98, wides: 1, noBalls: 0 },
          { playerId: 'p-siraj', playerName: 'Mohammed Siraj', overs: 22.0, maidens: 4, runs: 79, wickets: 2, economy: 3.59, dots: 80, wides: 1, noBalls: 1 },
          { playerId: 'p-ashwin', playerName: 'Ravichandran Ashwin', overs: 28.0, maidens: 5, runs: 88, wickets: 2, economy: 3.14, dots: 102, wides: 0, noBalls: 0 },
          { playerId: 'p-jadeja', playerName: 'Ravindra Jadeja', overs: 30.0, maidens: 8, runs: 97, wickets: 2, economy: 3.23, dots: 114, wides: 1, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 98, over: 32, ball: 4, batsmanName: 'Marnus Labuschagne' },
          { wicketNumber: 2, score: 145, over: 51, ball: 2, batsmanName: 'Usman Khawaja' },
          { wicketNumber: 3, score: 236, over: 74, ball: 5, batsmanName: 'Travis Head' },
          { wicketNumber: 4, score: 280, over: 88, ball: 1, batsmanName: 'Steve Smith' }
        ],
        didNotBat: ['Mitchell Starc', 'Nathan Lyon', 'Josh Hazlewood'],
        partnerships: [
          { batter1: 'Usman Khawaja', batter1Runs: 48, batter2: 'Marnus Labuschagne', batter2Runs: 42, totalRuns: 98, totalBalls: 196, wicketNumber: 1 },
          { batter1: 'Steve Smith', batter1Runs: 54, batter2: 'Travis Head', batter2Runs: 62, totalRuns: 91, totalBalls: 132, wicketNumber: 3 }
        ]
      },
      {
        inningsNumber: 2,
        teamId: 'IND',
        teamName: 'India',
        teamCode: 'IND',
        runs: 312,
        wickets: 10,
        overs: 92.4,
        byes: 2,
        legByes: 6,
        wides: 2,
        noBalls: 0,
        penaltyRuns: 0,
        totalExtras: 10,
        currentRunRate: 3.36,
        battingFigures: [
          { playerId: 'p-rohit', playerName: 'Rohit Sharma', dismissal: 'c Smith b Starc', runs: 58, balls: 84, fours: 7, sixes: 2, strikeRate: 69.0 },
          { playerId: 'p-jaiswal', playerName: 'Yashasvi Jaiswal', dismissal: 'b Cummins', runs: 64, balls: 112, fours: 8, sixes: 1, strikeRate: 57.1 },
          { playerId: 'p-gill', playerName: 'Shubman Gill', dismissal: 'lbw b Lyon', runs: 41, balls: 82, fours: 5, sixes: 0, strikeRate: 50.0 },
          { playerId: 'p-virat', playerName: 'Virat Kohli', dismissal: 'c Carey b Hazlewood', runs: 78, balls: 146, fours: 9, sixes: 0, strikeRate: 53.4 },
          { playerId: 'p-pant', playerName: 'Rishabh Pant', dismissal: 'c Warner b Starc', runs: 45, balls: 52, fours: 6, sixes: 1, strikeRate: 86.5 }
        ],
        bowlingFigures: [
          { playerId: 'p-cummins', playerName: 'Pat Cummins', overs: 24.0, maidens: 5, runs: 74, wickets: 3, economy: 3.08, dots: 92, wides: 1, noBalls: 0 },
          { playerId: 'p-starc', playerName: 'Mitchell Starc', overs: 21.4, maidens: 3, runs: 82, wickets: 3, economy: 3.78, dots: 76, wides: 1, noBalls: 0 },
          { playerId: 'p-hazlewood', playerName: 'Josh Hazlewood', overs: 22.0, maidens: 6, runs: 64, wickets: 2, economy: 2.90, dots: 88, wides: 0, noBalls: 0 },
          { playerId: 'p-lyon', playerName: 'Nathan Lyon', overs: 25.0, maidens: 4, runs: 82, wickets: 2, economy: 3.28, dots: 96, wides: 0, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 92, over: 26, ball: 3, batsmanName: 'Rohit Sharma' },
          { wicketNumber: 2, score: 138, over: 42, ball: 1, batsmanName: 'Yashasvi Jaiswal' },
          { wicketNumber: 3, score: 202, over: 63, ball: 4, batsmanName: 'Shubman Gill' },
          { wicketNumber: 4, score: 275, over: 81, ball: 2, batsmanName: 'Virat Kohli' }
        ],
        didNotBat: ['Jasprit Bumrah', 'Mohammed Siraj'],
        partnerships: [
          { batter1: 'Rohit Sharma', batter1Runs: 58, batter2: 'Yashasvi Jaiswal', batter2Runs: 32, totalRuns: 92, totalBalls: 159, wicketNumber: 1 },
          { batter1: 'Virat Kohli', batter1Runs: 42, batter2: 'Rishabh Pant', batter2Runs: 45, totalRuns: 73, totalBalls: 96, wicketNumber: 4 }
        ]
      },
      {
        inningsNumber: 3,
        teamId: 'AUS',
        teamName: 'Australia',
        teamCode: 'AUS',
        runs: 238,
        wickets: 10,
        overs: 76.5,
        byes: 1,
        legByes: 5,
        wides: 2,
        noBalls: 0,
        penaltyRuns: 0,
        totalExtras: 8,
        currentRunRate: 3.09,
        battingFigures: [
          { playerId: 'p-usman', playerName: 'Usman Khawaja', dismissal: 'lbw b Bumrah', runs: 28, balls: 64, fours: 3, sixes: 0, strikeRate: 43.7 },
          { playerId: 'p-travis', playerName: 'Travis Head', dismissal: 'c Rahul b Jadeja', runs: 82, balls: 94, fours: 11, sixes: 2, strikeRate: 87.2 },
          { playerId: 'p-marnus', playerName: 'Marnus Labuschagne', dismissal: 'c Pant b Siraj', runs: 37, balls: 88, fours: 4, sixes: 0, strikeRate: 42.0 },
          { playerId: 'p-steve', playerName: 'Steve Smith', dismissal: 'b Bumrah', runs: 24, balls: 56, fours: 3, sixes: 0, strikeRate: 42.8 },
          { playerId: 'p-alex', playerName: 'Alex Carey', dismissal: 'c Kohli b Ashwin', runs: 31, balls: 50, fours: 3, sixes: 0, strikeRate: 62.0 }
        ],
        bowlingFigures: [
          { playerId: 'p-bumrah', playerName: 'Jasprit Bumrah', overs: 19.5, maidens: 5, runs: 52, wickets: 4, economy: 2.62, dots: 84, wides: 1, noBalls: 0 },
          { playerId: 'p-siraj', playerName: 'Mohammed Siraj', overs: 17.0, maidens: 3, runs: 58, wickets: 2, economy: 3.41, dots: 62, wides: 1, noBalls: 0 },
          { playerId: 'p-jadeja', playerName: 'Ravindra Jadeja', overs: 20.0, maidens: 4, runs: 64, wickets: 3, economy: 3.20, dots: 78, wides: 0, noBalls: 0 },
          { playerId: 'p-ashwin', playerName: 'Ravichandran Ashwin', overs: 20.0, maidens: 3, runs: 59, wickets: 1, economy: 2.95, dots: 76, wides: 0, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 36, over: 12, ball: 4, batsmanName: 'Usman Khawaja' },
          { wicketNumber: 2, score: 98, over: 31, ball: 1, batsmanName: 'Steve Smith' },
          { wicketNumber: 3, score: 182, over: 54, ball: 3, batsmanName: 'Travis Head' }
        ],
        didNotBat: ['Mitchell Starc', 'Nathan Lyon', 'Josh Hazlewood'],
        partnerships: [
          { batter1: 'Travis Head', batter1Runs: 82, batter2: 'Marnus Labuschagne', batter2Runs: 37, totalRuns: 84, totalBalls: 128, wicketNumber: 3 }
        ]
      },
      {
        inningsNumber: 4,
        teamId: 'IND',
        teamName: 'India',
        teamCode: 'IND',
        runs: 227,
        wickets: 6,
        overs: 68.4,
        target: 275,
        requiredRunRate: 2.25,
        currentRunRate: 3.30,
        byes: 1,
        legByes: 4,
        wides: 3,
        noBalls: 0,
        penaltyRuns: 0,
        totalExtras: 8,
        battingFigures: [
          { playerId: 'p-rohit', playerName: 'Rohit Sharma', dismissal: 'c Smith b Cummins', runs: 34, balls: 48, fours: 4, sixes: 1, strikeRate: 70.8 },
          { playerId: 'p-jaiswal', playerName: 'Yashasvi Jaiswal', dismissal: 'c Carey b Starc', runs: 42, balls: 76, fours: 6, sixes: 0, strikeRate: 55.2 },
          { playerId: 'p-gill', playerName: 'Shubman Gill', dismissal: 'b Lyon', runs: 28, balls: 54, fours: 3, sixes: 0, strikeRate: 51.8 },
          { playerId: 'p-virat', playerName: 'Virat Kohli', dismissal: 'c Green b Cummins', runs: 67, balls: 132, fours: 7, sixes: 0, strikeRate: 50.7 },
          { playerId: 'p-pant', playerName: 'Rishabh Pant', dismissal: 'not out', isStriker: true, runs: 38, balls: 44, fours: 4, sixes: 1, strikeRate: 86.3 },
          { playerId: 'p-rahul', playerName: 'KL Rahul', dismissal: 'b Starc', runs: 12, balls: 24, fours: 1, sixes: 0, strikeRate: 50.0 },
          { playerId: 'p-jadeja', playerName: 'Ravindra Jadeja', dismissal: 'not out', isNonStriker: true, runs: 14, balls: 26, fours: 1, sixes: 0, strikeRate: 53.8 }
        ],
        bowlingFigures: [
          { playerId: 'p-cummins', playerName: 'Pat Cummins', overs: 18.4, maidens: 4, runs: 54, wickets: 2, economy: 2.89, dots: 72, wides: 1, noBalls: 0, isCurrentBowler: true },
          { playerId: 'p-starc', playerName: 'Mitchell Starc', overs: 16.0, maidens: 2, runs: 58, wickets: 2, economy: 3.62, dots: 56, wides: 1, noBalls: 0 },
          { playerId: 'p-lyon', playerName: 'Nathan Lyon', overs: 21.0, maidens: 3, runs: 68, wickets: 1, economy: 3.23, dots: 78, wides: 0, noBalls: 0 },
          { playerId: 'p-hazlewood', playerName: 'Josh Hazlewood', overs: 13.0, maidens: 2, runs: 41, wickets: 1, economy: 3.15, dots: 48, wides: 1, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 58, over: 14, ball: 2, batsmanName: 'Rohit Sharma' },
          { wicketNumber: 2, score: 86, over: 24, ball: 5, batsmanName: 'Yashasvi Jaiswal' },
          { wicketNumber: 3, score: 124, over: 37, ball: 3, batsmanName: 'Shubman Gill' },
          { wicketNumber: 4, score: 182, over: 54, ball: 4, batsmanName: 'Virat Kohli' },
          { wicketNumber: 5, score: 198, over: 59, ball: 1, batsmanName: 'KL Rahul' }
        ],
        didNotBat: ['Ravichandran Ashwin', 'Jasprit Bumrah', 'Mohammed Siraj'],
        partnerships: [
          { batter1: 'Virat Kohli', batter1Runs: 34, batter2: 'Rishabh Pant', batter2Runs: 24, totalRuns: 58, totalBalls: 89, wicketNumber: 4 },
          { batter1: 'Rishabh Pant', batter1Runs: 14, batter2: 'Ravindra Jadeja', batter2Runs: 14, totalRuns: 29, totalBalls: 58, wicketNumber: 6 }
        ]
      }
    ],
    deliveries: [
      {
        id: 'del-68-4',
        over: 68,
        ball: 4,
        legalBallNumber: 4,
        inningsNumber: 4,
        batterId: 'p-pant',
        batterName: 'Rishabh Pant',
        bowlerId: 'p-cummins',
        bowlerName: 'Pat Cummins',
        runsScored: 4,
        extras: { runs: 0 },
        totalRunsOnBall: 4,
        isWicket: false,
        isFour: true,
        isSix: false,
        isDot: false,
        commentary: 'FOUR! Dispatched with sheer bravado! Cummins drops it slightly short outside off, Pant rocks onto his toes and hammers a ferocious cut through point. Beats the diving sweepers to the fence in a flash!',
        timestamp: '2026-10-26T03:08:40Z',
        cumulativeScore: 227,
        cumulativeWickets: 6
      },
      {
        id: 'del-68-3',
        over: 68,
        ball: 3,
        legalBallNumber: 3,
        inningsNumber: 4,
        batterId: 'p-pant',
        batterName: 'Rishabh Pant',
        bowlerId: 'p-cummins',
        bowlerName: 'Pat Cummins',
        runsScored: 0,
        extras: { runs: 0 },
        totalRunsOnBall: 0,
        isWicket: false,
        isFour: false,
        isSix: false,
        isDot: true,
        commentary: 'Good length delivery nibbling back in on off stump, Pant covers the line securely and drops it under his eyes into the off side pitch.',
        timestamp: '2026-10-26T03:07:55Z',
        cumulativeScore: 223,
        cumulativeWickets: 6
      },
      {
        id: 'del-68-2',
        over: 68,
        ball: 2,
        legalBallNumber: 2,
        inningsNumber: 4,
        batterId: 'p-pant',
        batterName: 'Rishabh Pant',
        bowlerId: 'p-cummins',
        bowlerName: 'Pat Cummins',
        runsScored: 2,
        extras: { runs: 0 },
        totalRunsOnBall: 2,
        isWicket: false,
        isFour: false,
        isSix: false,
        isDot: false,
        commentary: 'Fuller outside off, squeezed down past gully towards third man. Nathan Lyon chases hard on the boundary to keep it down to a brace.',
        timestamp: '2026-10-26T03:07:10Z',
        cumulativeScore: 223,
        cumulativeWickets: 6
      },
      {
        id: 'del-68-1',
        over: 68,
        ball: 1,
        legalBallNumber: 1,
        inningsNumber: 4,
        batterId: 'p-jadeja',
        batterName: 'Ravindra Jadeja',
        bowlerId: 'p-cummins',
        bowlerName: 'Pat Cummins',
        runsScored: 1,
        extras: { runs: 0 },
        totalRunsOnBall: 1,
        isWicket: false,
        isFour: false,
        isSix: false,
        isDot: false,
        commentary: 'Cummins begins a critical over from the Southern Stand end. Tucked off the hip towards fine leg for a quick single to put Pant back on strike.',
        timestamp: '2026-10-26T03:06:22Z',
        cumulativeScore: 221,
        cumulativeWickets: 6
      },
      {
        id: 'del-67-6',
        over: 67,
        ball: 6,
        legalBallNumber: 6,
        inningsNumber: 4,
        batterId: 'p-pant',
        batterName: 'Rishabh Pant',
        bowlerId: 'p-lyon',
        bowlerName: 'Nathan Lyon',
        runsScored: 1,
        extras: { runs: 0 },
        totalRunsOnBall: 1,
        isWicket: false,
        isFour: false,
        isSix: false,
        isDot: false,
        commentary: 'Tossed up generously on middle, swept firmly along the carpet to deep backward square leg to retain strike.',
        timestamp: '2026-10-26T03:05:30Z',
        cumulativeScore: 220,
        cumulativeWickets: 6
      },
      {
        id: 'del-67-5',
        over: 67,
        ball: 5,
        legalBallNumber: 5,
        inningsNumber: 4,
        batterId: 'p-pant',
        batterName: 'Rishabh Pant',
        bowlerId: 'p-lyon',
        bowlerName: 'Nathan Lyon',
        runsScored: 6,
        extras: { runs: 0 },
        totalRunsOnBall: 6,
        isWicket: false,
        isFour: false,
        isSix: true,
        isDot: false,
        commentary: 'SIX! WOW! Trademark Pant audacity! He steps out to the pitch of the turn and launches Lyon deep into the Great Southern Stand! The Indian contingent erupts!',
        timestamp: '2026-10-26T03:04:45Z',
        cumulativeScore: 219,
        cumulativeWickets: 6
      }
    ],
    wagonWheelData: [
      { id: 'ww-1', angle: 45, distance: 88, runs: 4, batterName: 'Rishabh Pant', shotType: 'Cover Drive' },
      { id: 'ww-2', angle: 85, distance: 98, runs: 6, batterName: 'Rishabh Pant', shotType: 'Long On Loft' },
      { id: 'ww-3', angle: 125, distance: 75, runs: 4, batterName: 'Rishabh Pant', shotType: 'Midwicket Pull' },
      { id: 'ww-4', angle: 155, distance: 60, runs: 2, batterName: 'Ravindra Jadeja', shotType: 'Square Leg Flick' },
      { id: 'ww-5', angle: 220, distance: 40, runs: 1, batterName: 'Ravindra Jadeja', shotType: 'Fine Leg Glance' },
      { id: 'ww-6', angle: 310, distance: 90, runs: 4, batterName: 'Rishabh Pant', shotType: 'Point Cut' },
      { id: 'ww-7', angle: 20, distance: 70, runs: 3, batterName: 'Virat Kohli', shotType: 'Straight Drive' },
      { id: 'ww-8', angle: 60, distance: 85, runs: 4, batterName: 'Virat Kohli', shotType: 'Extra Cover Drive' },
      { id: 'ww-9', angle: 135, distance: 80, runs: 4, batterName: 'Virat Kohli', shotType: 'On Drive' }
    ]
  },
  {
    id: 'match-eng-sa-t20',
    seriesId: 't20-wc-2026',
    seriesName: 'ICC Men\'s T20 World Cup 2026',
    matchNumber: 'Super 8 - Group 1',
    format: 'T20I',
    category: 'international',
    gender: 'men',
    status: 'live',
    statusNote: 'South Africa need 18 runs from 10 balls. Target: 196',
    venue: {
      id: 'kensington',
      name: 'Kensington Oval',
      city: 'Bridgetown',
      country: 'Barbados',
      capacity: 28000,
      pitchCondition: 'True bounce, excellent carry, slight dew assisting the batting side.'
    },
    startTime: '2026-10-26T02:00:00Z',
    toss: {
      winnerTeamId: 'SA',
      decision: 'bowl'
    },
    teamHome: TEAMS.ENG,
    teamAway: TEAMS.SA,
    currentInningsIndex: 1,
    winProbability: {
      teamHomePercent: 44,
      teamAwayPercent: 56
    },
    innings: [
      {
        inningsNumber: 1,
        teamId: 'ENG',
        teamName: 'England',
        teamCode: 'ENG',
        runs: 195,
        wickets: 5,
        overs: 20.0,
        byes: 0,
        legByes: 4,
        wides: 5,
        noBalls: 1,
        penaltyRuns: 0,
        totalExtras: 10,
        currentRunRate: 9.75,
        battingFigures: [
          { playerId: 'p-buttler', playerName: 'Jos Buttler', dismissal: 'c Jansen b Rabada', runs: 68, balls: 38, fours: 7, sixes: 4, strikeRate: 178.9 },
          { playerId: 'p-salt', playerName: 'Phil Salt', dismissal: 'b Nortje', runs: 32, balls: 18, fours: 4, sixes: 2, strikeRate: 177.7 },
          { playerId: 'p-brook', playerName: 'Harry Brook', dismissal: 'c Miller b Maharaj', runs: 46, balls: 28, fours: 4, sixes: 3, strikeRate: 164.2 },
          { playerId: 'p-livingstone', playerName: 'Liam Livingstone', dismissal: 'not out', runs: 28, balls: 14, fours: 2, sixes: 2, strikeRate: 200.0 }
        ],
        bowlingFigures: [
          { playerId: 'p-rabada', playerName: 'Kagiso Rabada', overs: 4.0, maidens: 0, runs: 38, wickets: 2, economy: 9.50, dots: 8, wides: 1, noBalls: 0 },
          { playerId: 'p-nortje', playerName: 'Anrich Nortje', overs: 4.0, maidens: 0, runs: 42, wickets: 2, economy: 10.50, dots: 7, wides: 2, noBalls: 1 },
          { playerId: 'p-maharaj', playerName: 'Keshav Maharaj', overs: 4.0, maidens: 0, runs: 29, wickets: 1, economy: 7.25, dots: 11, wides: 0, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 54, over: 4, ball: 5, batsmanName: 'Phil Salt' },
          { wicketNumber: 2, score: 132, over: 13, ball: 2, batsmanName: 'Jos Buttler' }
        ],
        didNotBat: ['Sam Curran', 'Jofra Archer', 'Adil Rashid'],
        partnerships: [
          { batter1: 'Jos Buttler', batter1Runs: 42, batter2: 'Harry Brook', batter2Runs: 46, totalRuns: 78, totalBalls: 46, wicketNumber: 2 }
        ]
      },
      {
        inningsNumber: 2,
        teamId: 'SA',
        teamName: 'South Africa',
        teamCode: 'SA',
        runs: 178,
        wickets: 4,
        overs: 18.2,
        target: 196,
        requiredRunRate: 10.8,
        currentRunRate: 9.71,
        byes: 0,
        legByes: 3,
        wides: 4,
        noBalls: 0,
        penaltyRuns: 0,
        totalExtras: 7,
        battingFigures: [
          { playerId: 'p-qdk', playerName: 'Quinton de Kock', dismissal: 'c Brook b Archer', runs: 55, balls: 32, fours: 6, sixes: 3, strikeRate: 171.8 },
          { playerId: 'p-markram', playerName: 'Aiden Markram', dismissal: 'b Rashid', runs: 30, balls: 22, fours: 3, sixes: 1, strikeRate: 136.3 },
          { playerId: 'p-klaasen', playerName: 'Heinrich Klaasen', dismissal: 'not out', isStriker: true, runs: 58, balls: 31, fours: 4, sixes: 5, strikeRate: 187.1 },
          { playerId: 'p-miller', playerName: 'David Miller', dismissal: 'not out', isNonStriker: true, runs: 24, balls: 15, fours: 2, sixes: 1, strikeRate: 160.0 }
        ],
        bowlingFigures: [
          { playerId: 'p-archer', playerName: 'Jofra Archer', overs: 3.2, maidens: 0, runs: 34, wickets: 2, economy: 10.20, dots: 7, wides: 1, noBalls: 0, isCurrentBowler: true },
          { playerId: 'p-rashid', playerName: 'Adil Rashid', overs: 4.0, maidens: 0, runs: 32, wickets: 1, economy: 8.00, dots: 10, wides: 0, noBalls: 0 },
          { playerId: 'p-curran', playerName: 'Sam Curran', overs: 3.0, maidens: 0, runs: 36, wickets: 0, economy: 12.00, dots: 4, wides: 2, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 72, over: 7, ball: 4, batsmanName: 'Quinton de Kock' },
          { wicketNumber: 2, score: 110, over: 11, ball: 3, batsmanName: 'Aiden Markram' }
        ],
        didNotBat: ['Marco Jansen', 'Gerald Coetzee', 'Kagiso Rabada'],
        partnerships: [
          { batter1: 'Heinrich Klaasen', batter1Runs: 42, batter2: 'David Miller', batter2Runs: 24, totalRuns: 68, totalBalls: 38, wicketNumber: 4 }
        ]
      }
    ],
    deliveries: [
      {
        id: 'del-sa-18-2',
        over: 18,
        ball: 2,
        legalBallNumber: 2,
        inningsNumber: 2,
        batterId: 'p-klaasen',
        batterName: 'Heinrich Klaasen',
        bowlerId: 'p-archer',
        bowlerName: 'Jofra Archer',
        runsScored: 6,
        extras: { runs: 0 },
        totalRunsOnBall: 6,
        isWicket: false,
        isFour: false,
        isSix: true,
        isDot: false,
        commentary: 'SIX! MONSTROUS HIT! Archer hits the 148kph mark with a full toss, Klaasen clears his front leg and swings cleanly through the line. The ball sails 96 metres over wide long-on!',
        timestamp: '2026-10-26T03:09:12Z',
        cumulativeScore: 178,
        cumulativeWickets: 4
      },
      {
        id: 'del-sa-18-1',
        over: 18,
        ball: 1,
        legalBallNumber: 1,
        inningsNumber: 2,
        batterId: 'p-miller',
        batterName: 'David Miller',
        bowlerId: 'p-archer',
        bowlerName: 'Jofra Archer',
        runsScored: 1,
        extras: { runs: 0 },
        totalRunsOnBall: 1,
        isWicket: false,
        isFour: false,
        isSix: false,
        isDot: false,
        commentary: 'Yorker right in the blockhole on middle stump, Miller jams his bat down and scampers across for an imperative single.',
        timestamp: '2026-10-26T03:08:20Z',
        cumulativeScore: 172,
        cumulativeWickets: 4
      }
    ],
    wagonWheelData: [
      { id: 'ww-sa-1', angle: 95, distance: 96, runs: 6, batterName: 'Heinrich Klaasen', shotType: 'Long On Pull' },
      { id: 'ww-sa-2', angle: 120, distance: 88, runs: 6, batterName: 'Heinrich Klaasen', shotType: 'Midwicket Slog Sweep' },
      { id: 'ww-sa-3', angle: 40, distance: 82, runs: 4, batterName: 'Quinton de Kock', shotType: 'Cover Drive' }
    ]
  },
  {
    id: 'match-csk-mi-ipl',
    seriesId: 'ipl-2026',
    seriesName: 'Indian Premier League 2026',
    matchNumber: 'Match 28',
    format: 'T20',
    category: 'league',
    gender: 'men',
    status: 'live',
    statusNote: 'CSK: 142/3 (14.2 ov) - Run Rate: 9.91',
    venue: {
      id: 'wankhede',
      name: 'Wankhede Stadium',
      city: 'Mumbai',
      country: 'India',
      capacity: 33108,
      pitchCondition: 'Red soil pitch with true carry and short boundaries.'
    },
    startTime: '2026-10-26T01:30:00Z',
    toss: {
      winnerTeamId: 'MI',
      decision: 'bowl'
    },
    teamHome: TEAMS.MI,
    teamAway: TEAMS.CSK,
    currentInningsIndex: 0,
    winProbability: {
      teamHomePercent: 51,
      teamAwayPercent: 49
    },
    innings: [
      {
        inningsNumber: 1,
        teamId: 'CSK',
        teamName: 'Chennai Super Kings',
        teamCode: 'CSK',
        runs: 142,
        wickets: 3,
        overs: 14.2,
        byes: 0,
        legByes: 2,
        wides: 3,
        noBalls: 0,
        penaltyRuns: 0,
        totalExtras: 5,
        currentRunRate: 9.91,
        battingFigures: [
          { playerId: 'p-ruturaj', playerName: 'Ruturaj Gaikwad', dismissal: 'c Rohit b Bumrah', runs: 52, balls: 34, fours: 6, sixes: 2, strikeRate: 152.9 },
          { playerId: 'p-conway', playerName: 'Devon Conway', dismissal: 'b Coetzee', runs: 38, balls: 26, fours: 4, sixes: 1, strikeRate: 146.1 },
          { playerId: 'p-dube', playerName: 'Shivam Dube', dismissal: 'not out', isStriker: true, runs: 34, balls: 18, fours: 2, sixes: 3, strikeRate: 188.8 }
        ],
        bowlingFigures: [
          { playerId: 'p-bumrah', playerName: 'Jasprit Bumrah', overs: 3.0, maidens: 0, runs: 18, wickets: 2, economy: 6.00, dots: 9, wides: 0, noBalls: 0 },
          { playerId: 'p-hardik', playerName: 'Hardik Pandya', overs: 3.0, maidens: 0, runs: 34, wickets: 0, economy: 11.33, dots: 4, wides: 1, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 62, over: 6, ball: 4, batsmanName: 'Devon Conway' }
        ],
        didNotBat: ['MS Dhoni', 'Ravindra Jadeja', 'Deepak Chahar'],
        partnerships: [
          { batter1: 'Ruturaj Gaikwad', batter1Runs: 52, batter2: 'Devon Conway', batter2Runs: 38, totalRuns: 62, totalBalls: 40, wicketNumber: 1 }
        ]
      }
    ],
    deliveries: [
      {
        id: 'del-csk-14-2',
        over: 14,
        ball: 2,
        legalBallNumber: 2,
        inningsNumber: 1,
        batterId: 'p-dube',
        batterName: 'Shivam Dube',
        bowlerId: 'p-hardik',
        bowlerName: 'Hardik Pandya',
        runsScored: 6,
        extras: { runs: 0 },
        totalRunsOnBall: 6,
        isWicket: false,
        isFour: false,
        isSix: true,
        isDot: false,
        commentary: 'SIX! Dube stands tall and delivers punishment! Hardik tries a slower cutter into the deck, Dube reads it early and muscle-pulls it high into the Garware Pavilion!',
        timestamp: '2026-10-26T03:07:00Z',
        cumulativeScore: 142,
        cumulativeWickets: 3
      }
    ]
  },
  {
    id: 'match-pak-nz-odi',
    seriesId: 'pak-nz-2026',
    seriesName: 'New Zealand tour of Pakistan 2026',
    matchNumber: '2nd ODI',
    format: 'ODI',
    category: 'international',
    gender: 'men',
    status: 'scheduled',
    statusNote: 'Match starts at 14:30 Local (09:30 UTC)',
    venue: {
      id: 'gaddafi',
      name: 'Gaddafi Stadium',
      city: 'Lahore',
      country: 'Pakistan',
      capacity: 27000
    },
    startTime: '2026-10-27T09:30:00Z',
    teamHome: TEAMS.PAK,
    teamAway: TEAMS.NZ,
    currentInningsIndex: 0,
    innings: [],
    deliveries: []
  },
  {
    id: 'match-ind-sa-final',
    seriesId: 't20-wc-final',
    seriesName: 'ICC Men\'s T20 World Cup Final',
    matchNumber: 'Grand Final',
    format: 'T20I',
    category: 'international',
    gender: 'men',
    status: 'completed',
    statusNote: 'India won by 7 runs',
    resultNote: 'India won by 7 runs in a heart-stopping finale',
    winningTeamId: 'IND',
    playerOfTheMatch: {
      id: 'p-virat',
      name: 'Virat Kohli',
      team: 'India',
      performance: '76 runs off 59 balls (6x4, 2x6)'
    },
    venue: {
      id: 'kensington',
      name: 'Kensington Oval',
      city: 'Bridgetown',
      country: 'Barbados',
      capacity: 28000
    },
    startTime: '2026-06-29T14:30:00Z',
    toss: {
      winnerTeamId: 'IND',
      decision: 'bat'
    },
    teamHome: TEAMS.IND,
    teamAway: TEAMS.SA,
    currentInningsIndex: 1,
    innings: [
      {
        inningsNumber: 1,
        teamId: 'IND',
        teamName: 'India',
        teamCode: 'IND',
        runs: 176,
        wickets: 7,
        overs: 20.0,
        byes: 0,
        legByes: 2,
        wides: 3,
        noBalls: 0,
        penaltyRuns: 0,
        totalExtras: 5,
        currentRunRate: 8.80,
        battingFigures: [
          { playerId: 'p-virat', playerName: 'Virat Kohli', dismissal: 'c Rabada b Jansen', runs: 76, balls: 59, fours: 6, sixes: 2, strikeRate: 128.8 },
          { playerId: 'p-axar', playerName: 'Axar Patel', dismissal: 'run out (de Kock)', runs: 47, balls: 31, fours: 1, sixes: 4, strikeRate: 151.6 },
          { playerId: 'p-dube', playerName: 'Shivam Dube', dismissal: 'c Miller b Nortje', runs: 27, balls: 16, fours: 3, sixes: 1, strikeRate: 168.7 }
        ],
        bowlingFigures: [
          { playerId: 'p-nortje', playerName: 'Anrich Nortje', overs: 4.0, maidens: 0, runs: 26, wickets: 2, economy: 6.50, dots: 10, wides: 0, noBalls: 0 },
          { playerId: 'p-maharaj', playerName: 'Keshav Maharaj', overs: 3.0, maidens: 0, runs: 23, wickets: 2, economy: 7.66, dots: 7, wides: 1, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 23, over: 1, ball: 4, batsmanName: 'Rohit Sharma' },
          { wicketNumber: 2, score: 25, over: 2, ball: 2, batsmanName: 'Rishabh Pant' },
          { wicketNumber: 3, score: 34, over: 4, ball: 3, batsmanName: 'Suryakumar Yadav' },
          { wicketNumber: 4, score: 106, over: 13, ball: 3, batsmanName: 'Axar Patel' }
        ],
        didNotBat: ['Jasprit Bumrah', 'Arshdeep Singh', 'Kuldeep Yadav'],
        partnerships: [
          { batter1: 'Virat Kohli', batter1Runs: 38, batter2: 'Axar Patel', batter2Runs: 47, totalRuns: 72, totalBalls: 54, wicketNumber: 4 }
        ]
      },
      {
        inningsNumber: 2,
        teamId: 'SA',
        teamName: 'South Africa',
        teamCode: 'SA',
        runs: 169,
        wickets: 8,
        overs: 20.0,
        target: 177,
        currentRunRate: 8.45,
        byes: 1,
        legByes: 1,
        wides: 3,
        noBalls: 0,
        penaltyRuns: 0,
        totalExtras: 5,
        battingFigures: [
          { playerId: 'p-qdk', playerName: 'Quinton de Kock', dismissal: 'c Kuldeep b Arshdeep', runs: 39, balls: 31, fours: 4, sixes: 1, strikeRate: 125.8 },
          { playerId: 'p-klaasen', playerName: 'Heinrich Klaasen', dismissal: 'c Pant b Hardik', runs: 52, balls: 27, fours: 2, sixes: 5, strikeRate: 192.5 },
          { playerId: 'p-miller', playerName: 'David Miller', dismissal: 'c Suryakumar b Hardik', runs: 21, balls: 17, fours: 1, sixes: 1, strikeRate: 123.5 }
        ],
        bowlingFigures: [
          { playerId: 'p-hardik', playerName: 'Hardik Pandya', overs: 3.0, maidens: 0, runs: 20, wickets: 3, economy: 6.66, dots: 7, wides: 1, noBalls: 0 },
          { playerId: 'p-bumrah', playerName: 'Jasprit Bumrah', overs: 4.0, maidens: 0, runs: 18, wickets: 2, economy: 4.50, dots: 14, wides: 0, noBalls: 0 },
          { playerId: 'p-arshdeep', playerName: 'Arshdeep Singh', overs: 4.0, maidens: 0, runs: 20, wickets: 2, economy: 5.00, dots: 11, wides: 0, noBalls: 0 }
        ],
        fallOfWickets: [
          { wicketNumber: 1, score: 7, over: 1, ball: 3, batsmanName: 'Reeza Hendricks' },
          { wicketNumber: 2, score: 12, over: 2, ball: 4, batsmanName: 'Aiden Markram' },
          { wicketNumber: 3, score: 70, over: 8, ball: 4, batsmanName: 'Tristan Stubbs' },
          { wicketNumber: 4, score: 106, over: 12, ball: 3, batsmanName: 'Quinton de Kock' },
          { wicketNumber: 5, score: 151, over: 16, ball: 1, batsmanName: 'Heinrich Klaasen' },
          { wicketNumber: 6, score: 156, over: 17, ball: 4, batsmanName: 'Marco Jansen' },
          { wicketNumber: 7, score: 161, over: 19, ball: 1, batsmanName: 'David Miller' }
        ],
        didNotBat: ['Anrich Nortje', 'Ottniel Baartman'],
        partnerships: [
          { batter1: 'Quinton de Kock', batter1Runs: 28, batter2: 'Heinrich Klaasen', batter2Runs: 20, totalRuns: 45, totalBalls: 26, wicketNumber: 4 }
        ]
      }
    ],
    deliveries: []
  }
];

export const PLAYERS: PlayerProfile[] = [
  {
    id: 'p-virat',
    name: 'Virat Kohli',
    fullName: 'Virat Prem Kohli',
    country: 'India',
    teamCode: 'IND',
    role: 'Top-order Batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    born: 'November 5, 1988 (Delhi)',
    age: 37,
    iccRankings: {
      test: { rank: 4, best: 1 },
      odi: { rank: 3, best: 1 },
      t20i: { rank: 12, best: 1 }
    },
    careerStats: {
      test: { matches: 118, innings: 198, runs: 9040, highestScore: '254*', battingAverage: 49.13, strikeRate: 55.6, centuries: 29, fifties: 31, wickets: 0 },
      odi: { matches: 295, innings: 283, runs: 13906, highestScore: '183', battingAverage: 58.18, strikeRate: 93.5, centuries: 50, fifties: 72, wickets: 5 },
      t20i: { matches: 125, innings: 117, runs: 4188, highestScore: '122*', battingAverage: 48.69, strikeRate: 137.0, centuries: 1, fifties: 38, wickets: 4 }
    },
    recentInnings: [
      { date: '2026-10-25', vs: 'Australia (MCG)', format: 'TEST', runs: 67, balls: 132, result: 'In Progress' },
      { date: '2026-10-23', vs: 'Australia (MCG)', format: 'TEST', runs: 78, balls: 146, result: 'In Progress' },
      { date: '2026-10-14', vs: 'New Zealand', format: 'TEST', runs: 70, balls: 102, result: 'Won' },
      { date: '2026-06-29', vs: 'South Africa', format: 'T20I', runs: 76, balls: 59, result: 'Won Final' }
    ],
    bio: 'One of the most prolific batters in the history of world cricket, revered for unmatched chase execution, fitness standards, and intensity.'
  },
  {
    id: 'p-bumrah',
    name: 'Jasprit Bumrah',
    fullName: 'Jasprit Jasbirsingh Bumrah',
    country: 'India',
    teamCode: 'IND',
    role: 'Pace Bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast',
    born: 'December 6, 1993 (Ahmedabad)',
    age: 32,
    iccRankings: {
      test: { rank: 1, best: 1 },
      odi: { rank: 2, best: 1 },
      t20i: { rank: 1, best: 1 }
    },
    careerStats: {
      test: { matches: 40, innings: 76, runs: 280, highestScore: '34*', battingAverage: 7.2, strikeRate: 42.1, centuries: 0, fifties: 0, wickets: 178, bowlingAverage: 20.35, economy: 2.74, bestBowling: '6/27', fiveWickets: 10 },
      odi: { matches: 89, innings: 88, runs: 78, highestScore: '16', battingAverage: 6.0, strikeRate: 40.0, centuries: 0, fifties: 0, wickets: 149, bowlingAverage: 23.55, economy: 4.59, bestBowling: '6/19', fiveWickets: 2 },
      t20i: { matches: 70, innings: 69, runs: 8, highestScore: '7', battingAverage: 4.0, strikeRate: 61.5, centuries: 0, fifties: 0, wickets: 89, bowlingAverage: 17.74, economy: 6.27, bestBowling: '3/7', fiveWickets: 0 }
    },
    recentInnings: [
      { date: '2026-10-25', vs: 'Australia (MCG)', format: 'TEST', runs: 4, balls: 8, wickets: 4, overs: 19.5, result: 'In Progress' },
      { date: '2026-10-23', vs: 'Australia (MCG)', format: 'TEST', runs: 0, balls: 2, wickets: 4, overs: 24.2, result: 'In Progress' }
    ],
    bio: 'Widely regarded as the premier multi-format bowler in cricket today, with a distinctive hyperextended arm action, pinpoint yorkers, and devastating seam movement.'
  },
  {
    id: 'p-cummins',
    name: 'Pat Cummins',
    fullName: 'Patrick James Cummins',
    country: 'Australia',
    teamCode: 'AUS',
    role: 'Bowling All-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast',
    born: 'May 8, 1993 (Westmead)',
    age: 33,
    iccRankings: {
      test: { rank: 2, best: 1 },
      odi: { rank: 8, best: 3 },
      t20i: { rank: 14, best: 6 }
    },
    careerStats: {
      test: { matches: 64, innings: 122, runs: 1380, highestScore: '64*', battingAverage: 16.82, strikeRate: 46.5, centuries: 0, fifties: 3, wickets: 275, bowlingAverage: 22.45, economy: 2.82, bestBowling: '6/23', fiveWickets: 12 },
      odi: { matches: 88, innings: 85, runs: 580, highestScore: '39*', battingAverage: 14.5, strikeRate: 78.2, centuries: 0, fifties: 0, wickets: 141, bowlingAverage: 28.12, economy: 5.21, bestBowling: '5/70', fiveWickets: 1 },
      t20i: { matches: 57, innings: 56, runs: 180, highestScore: '28', battingAverage: 13.0, strikeRate: 138.4, centuries: 0, fifties: 0, wickets: 66, bowlingAverage: 23.80, economy: 7.34, bestBowling: '3/15', fiveWickets: 0 }
    },
    recentInnings: [
      { date: '2026-10-26', vs: 'India (MCG)', format: 'TEST', runs: 28, balls: 45, wickets: 2, overs: 18.4, result: 'In Progress' }
    ],
    bio: 'Australia’s ICC World Test Championship and World Cup winning captain, celebrated for unrelenting stamina and game-defining spells.'
  },
  {
    id: 'p-pant',
    name: 'Rishabh Pant',
    fullName: 'Rishabh Rajendra Pant',
    country: 'India',
    teamCode: 'IND',
    role: 'Wicketkeeper Batter',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm medium',
    born: 'October 4, 1997 (Roorkee)',
    age: 29,
    iccRankings: {
      test: { rank: 6, best: 5 },
      odi: { rank: 24, best: 18 },
      t20i: { rank: 32, best: 22 }
    },
    careerStats: {
      test: { matches: 38, innings: 64, runs: 2680, highestScore: '159*', battingAverage: 44.66, strikeRate: 74.2, centuries: 6, fifties: 12, wickets: 0 },
      odi: { matches: 31, innings: 27, runs: 871, highestScore: '125*', battingAverage: 36.29, strikeRate: 106.6, centuries: 1, fifties: 5, wickets: 0 },
      t20i: { matches: 76, innings: 66, runs: 1209, highestScore: '65*', battingAverage: 23.25, strikeRate: 127.3, centuries: 0, fifties: 3, wickets: 0 }
    },
    recentInnings: [
      { date: '2026-10-26', vs: 'Australia (MCG)', format: 'TEST', runs: 38, balls: 44, result: 'In Progress' }
    ],
    bio: 'One of the most fearless match-winners of the modern era, renowned for counter-attacking fourth-innings epics overseas.'
  }
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: 'wtc-2025-27',
    name: 'ICC World Test Championship 2025-27',
    shortName: 'WTC 2025-27',
    season: '2025-2027',
    format: 'TEST',
    category: 'international',
    startDate: '2025-06-01',
    endDate: '2027-06-15',
    hostCountry: 'Global / Final at Lord\'s',
    standings: [
      {
        position: 1,
        team: TEAMS.IND,
        played: 14,
        won: 10,
        lost: 3,
        tied: 0,
        noResult: 1,
        points: 122,
        netRunRate: 68.52, // Percentage of points contested
        recentForm: ['W', 'W', 'W', 'L', 'W']
      },
      {
        position: 2,
        team: TEAMS.AUS,
        played: 13,
        won: 9,
        lost: 3,
        tied: 0,
        noResult: 1,
        points: 108,
        netRunRate: 62.18,
        recentForm: ['W', 'L', 'W', 'W', 'W']
      },
      {
        position: 3,
        team: TEAMS.ENG,
        played: 16,
        won: 9,
        lost: 6,
        tied: 0,
        noResult: 1,
        points: 104,
        netRunRate: 54.16,
        recentForm: ['W', 'W', 'L', 'L', 'W']
      },
      {
        position: 4,
        team: TEAMS.SA,
        played: 11,
        won: 6,
        lost: 4,
        tied: 0,
        noResult: 1,
        points: 74,
        netRunRate: 50.00,
        recentForm: ['L', 'W', 'W', 'W', 'L']
      },
      {
        position: 5,
        team: TEAMS.NZ,
        played: 12,
        won: 5,
        lost: 6,
        tied: 0,
        noResult: 1,
        points: 62,
        netRunRate: 43.05,
        recentForm: ['W', 'W', 'L', 'W', 'L']
      }
    ],
    topBatters: [
      { name: 'Joe Root', team: 'ENG', runs: 1480, innings: 26, average: 61.66, strikeRate: 62.4, hundreds: 5 },
      { name: 'Yashasvi Jaiswal', team: 'IND', runs: 1240, innings: 22, average: 59.04, strikeRate: 68.2, hundreds: 4 },
      { name: 'Travis Head', team: 'AUS', runs: 980, innings: 19, average: 54.44, strikeRate: 78.5, hundreds: 3 }
    ],
    topBowlers: [
      { name: 'Jasprit Bumrah', team: 'IND', wickets: 58, overs: 290.4, average: 18.24, economy: 2.68, bestBowling: '6/45' },
      { name: 'Pat Cummins', team: 'AUS', wickets: 52, overs: 310.2, average: 21.15, economy: 2.84, bestBowling: '6/23' },
      { name: 'Nathan Lyon', team: 'AUS', wickets: 48, overs: 380.0, average: 26.50, economy: 2.92, bestBowling: '5/62' }
    ]
  },
  {
    id: 'ipl-2026',
    name: 'Indian Premier League 2026',
    shortName: 'IPL 2026',
    season: '2026',
    format: 'T20',
    category: 'league',
    startDate: '2026-03-25',
    endDate: '2026-05-30',
    hostCountry: 'India',
    standings: [
      {
        position: 1,
        team: TEAMS.CSK,
        played: 8,
        won: 6,
        lost: 2,
        tied: 0,
        noResult: 0,
        points: 12,
        netRunRate: 0.842,
        recentForm: ['W', 'W', 'L', 'W', 'W']
      },
      {
        position: 2,
        team: TEAMS.MI,
        played: 8,
        won: 5,
        lost: 3,
        tied: 0,
        noResult: 0,
        points: 10,
        netRunRate: 0.518,
        recentForm: ['W', 'L', 'W', 'L', 'W']
      }
    ],
    topBatters: [
      { name: 'Ruturaj Gaikwad', team: 'CSK', runs: 420, innings: 8, average: 60.00, strikeRate: 154.2, hundreds: 1 },
      { name: 'Virat Kohli', team: 'RCB', runs: 395, innings: 8, average: 56.42, strikeRate: 148.6, hundreds: 1 }
    ],
    topBowlers: [
      { name: 'Jasprit Bumrah', team: 'MI', wickets: 16, overs: 32.0, average: 12.80, economy: 6.40, bestBowling: '4/14' },
      { name: 'Matheesha Pathirana', team: 'CSK', wickets: 14, overs: 29.2, average: 16.50, economy: 7.88, bestBowling: '4/28' }
    ]
  }
];

export const ICC_RANKINGS: ICCRankings = {
  updatedAt: '2026-10-25',
  teams: {
    test: [
      { rank: 1, name: 'India', country: 'IND', rating: 120, points: 3480, trend: 'steady' },
      { rank: 2, name: 'Australia', country: 'AUS', rating: 118, points: 3310, trend: 'steady' },
      { rank: 3, name: 'England', country: 'ENG', rating: 106, points: 3610, trend: 'up', change: 1 },
      { rank: 4, name: 'South Africa', country: 'SA', rating: 103, points: 2680, trend: 'down', change: -1 },
      { rank: 5, name: 'New Zealand', country: 'NZ', rating: 98, points: 2750, trend: 'steady' }
    ],
    odi: [
      { rank: 1, name: 'India', country: 'IND', rating: 119, points: 5120, trend: 'steady' },
      { rank: 2, name: 'Australia', country: 'AUS', rating: 115, points: 4250, trend: 'steady' },
      { rank: 3, name: 'South Africa', country: 'SA', rating: 110, points: 3520, trend: 'up', change: 1 },
      { rank: 4, name: 'Pakistan', country: 'PAK', rating: 106, points: 3610, trend: 'down', change: -1 },
      { rank: 5, name: 'England', country: 'ENG', rating: 102, points: 3450, trend: 'steady' }
    ],
    t20i: [
      { rank: 1, name: 'India', country: 'IND', rating: 268, points: 15820, trend: 'steady' },
      { rank: 2, name: 'Australia', country: 'AUS', rating: 257, points: 12340, trend: 'steady' },
      { rank: 3, name: 'England', country: 'ENG', rating: 252, points: 11890, trend: 'steady' },
      { rank: 4, name: 'South Africa', country: 'SA', rating: 248, points: 10980, trend: 'steady' },
      { rank: 5, name: 'West Indies', country: 'WI', rating: 244, points: 12150, trend: 'up', change: 2 }
    ]
  },
  batting: {
    test: [
      { rank: 1, name: 'Joe Root', country: 'ENG', rating: 898, trend: 'steady' },
      { rank: 2, name: 'Kane Williamson', country: 'NZ', rating: 864, trend: 'steady' },
      { rank: 3, name: 'Yashasvi Jaiswal', country: 'IND', rating: 842, trend: 'up', change: 1 },
      { rank: 4, name: 'Virat Kohli', country: 'IND', rating: 818, trend: 'up', change: 2 },
      { rank: 5, name: 'Steve Smith', country: 'AUS', rating: 809, trend: 'down', change: -1 }
    ],
    odi: [
      { rank: 1, name: 'Babar Azam', country: 'PAK', rating: 824, trend: 'steady' },
      { rank: 2, name: 'Rohit Sharma', country: 'IND', rating: 798, trend: 'steady' },
      { rank: 3, name: 'Virat Kohli', country: 'IND', rating: 792, trend: 'steady' },
      { rank: 4, name: 'Shubman Gill', country: 'IND', rating: 775, trend: 'down', change: -1 },
      { rank: 5, name: 'Heinrich Klaasen', country: 'SA', rating: 768, trend: 'up', change: 2 }
    ],
    t20i: [
      { rank: 1, name: 'Travis Head', country: 'AUS', rating: 855, trend: 'steady' },
      { rank: 2, name: 'Suryakumar Yadav', country: 'IND', rating: 824, trend: 'steady' },
      { rank: 3, name: 'Phil Salt', country: 'ENG', rating: 806, trend: 'steady' },
      { rank: 4, name: 'Yashasvi Jaiswal', country: 'IND', rating: 774, trend: 'up', change: 1 },
      { rank: 5, name: 'Mohammad Rizwan', country: 'PAK', rating: 760, trend: 'down', change: -1 }
    ]
  },
  bowling: {
    test: [
      { rank: 1, name: 'Jasprit Bumrah', country: 'IND', rating: 884, trend: 'steady' },
      { rank: 2, name: 'Pat Cummins', country: 'AUS', rating: 852, trend: 'steady' },
      { rank: 3, name: 'Kagiso Rabada', country: 'SA', rating: 835, trend: 'up', change: 1 },
      { rank: 4, name: 'Ravichandran Ashwin', country: 'IND', rating: 820, trend: 'down', change: -1 },
      { rank: 5, name: 'Josh Hazlewood', country: 'AUS', rating: 810, trend: 'steady' }
    ],
    odi: [
      { rank: 1, name: 'Keshav Maharaj', country: 'SA', rating: 698, trend: 'steady' },
      { rank: 2, name: 'Jasprit Bumrah', country: 'IND', rating: 685, trend: 'up', change: 1 },
      { rank: 3, name: 'Adam Zampa', country: 'AUS', rating: 672, trend: 'down', change: -1 },
      { rank: 4, name: 'Kuldeep Yadav', country: 'IND', rating: 664, trend: 'steady' },
      { rank: 5, name: 'Shaheen Afridi', country: 'PAK', rating: 650, trend: 'steady' }
    ],
    t20i: [
      { rank: 1, name: 'Adil Rashid', country: 'ENG', rating: 720, trend: 'steady' },
      { rank: 2, name: 'Rashid Khan', country: 'AFG', rating: 712, trend: 'steady' },
      { rank: 3, name: 'Wanindu Hasaranga', country: 'SL', rating: 700, trend: 'steady' },
      { rank: 4, name: 'Jasprit Bumrah', country: 'IND', rating: 692, trend: 'up', change: 3 },
      { rank: 5, name: 'Anrich Nortje', country: 'SA', rating: 675, trend: 'down', change: -1 }
    ]
  },
  allRounders: {
    test: [
      { rank: 1, name: 'Ravindra Jadeja', country: 'IND', rating: 440, trend: 'steady' },
      { rank: 2, name: 'Ravichandran Ashwin', country: 'IND', rating: 320, trend: 'steady' },
      { rank: 3, name: 'Shakib Al Hasan', country: 'BAN', rating: 295, trend: 'steady' },
      { rank: 4, name: 'Ben Stokes', country: 'ENG', rating: 280, trend: 'up', change: 1 }
    ],
    odi: [
      { rank: 1, name: 'Mohammad Nabi', country: 'AFG', rating: 315, trend: 'steady' },
      { rank: 2, name: 'Sikandar Raza', country: 'ZIM', rating: 290, trend: 'steady' },
      { rank: 3, name: 'Ravindra Jadeja', country: 'IND', rating: 260, trend: 'up', change: 1 }
    ],
    t20i: [
      { rank: 1, name: 'Marcus Stoinis', country: 'AUS', rating: 235, trend: 'steady' },
      { rank: 2, name: 'Hardik Pandya', country: 'IND', rating: 232, trend: 'up', change: 1 },
      { rank: 3, name: 'Wanindu Hasaranga', country: 'SL', rating: 220, trend: 'down', change: -1 }
    ]
  }
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Melbourne Thriller: Pant and Jadeja Battle Cummins in Electrifying Final Session',
    subtitle: 'With 48 runs needed and 4 wickets standing, the 3rd Test approaches a legendary finish on a crumbling Day 4 pitch.',
    category: 'Match Report',
    author: 'Harsha Venkataraman',
    date: 'October 26, 2026',
    readTime: '4 min read',
    imageUrl: '/src/assets/images/cricket_stadium_lights_1793009540729.jpg',
    summary: 'A packed Melbourne Cricket Ground watched breathlessly as Rishabh Pant unleashed his signature audacity against Pat Cummins and Nathan Lyon.',
    content: [
      'The MCG has witnessed decades of unforgettable Boxing Day and Border-Gavaskar battles, but the tension hanging over the fourth afternoon session of this 3rd Test reached fever pitch.',
      'Set 275 to win on an abrasive surface displaying sporadic variable bounce, India looked in command when Virat Kohli (67) and Yashasvi Jaiswal (42) constructed a stoic partnership. However, when Cummins breached Rahul’s defense with a stinging 143kph off-cutter, Australia sensed blood.',
      'Enter Rishabh Pant. True to his maverick nature, Pant refused to be bogged down. Walking down the pitch to Mitchell Starc and reverse-sweeping Lyon, he turned defensive caution into calculated assault.',
      'With Ravindra Jadeja offering dead-bat resilience at the other end, Australia captain Pat Cummins turned to his final burst of reverse swing as twilight set upon the MCG grandstands.'
    ],
    relatedMatchId: 'match-ind-aus-test',
    tags: ['Border-Gavaskar Trophy', 'India vs Australia', 'Rishabh Pant', 'Pat Cummins', 'Test Cricket']
  },
  {
    id: 'news-2',
    title: 'Tactical Deconstruction: The Biomechanics Behind Jasprit Bumrah’s Lethal In-Dipper',
    subtitle: 'How anomalous wrist cock and hyper-late release make the Indian spearhead unplayable across conditions.',
    category: 'Analysis',
    author: 'Michael Atherton & Data Desk',
    date: 'October 25, 2026',
    readTime: '6 min read',
    imageUrl: '/src/assets/images/cricket_fast_bowler_action_1793009544063.jpg',
    summary: 'An in-depth analysis comparing release release angles, seam orientation, and late aerodynamic deviation using ball-tracking telemetry.',
    content: [
      'Modern batsmen spend countless hours in projection simulators studying release points, yet when facing Jasprit Bumrah, conventional preparation often disintegrates in an instant.',
      'The foundation lies in his delivery stride. While classical coaching advocates a long, gathered approach, Bumrah decelerates slightly into his final bound before exploding through hyper-extension.',
      'His release point is consistently 25cm closer to the batter than standard fast bowlers of similar height, reducing reaction time by an estimated 0.04 seconds—the decisive margin between finding the meat of the bat and edging to the keeper.'
    ],
    tags: ['Fast Bowling', 'Biomechanics', 'Jasprit Bumrah', 'Tactics', 'Analytics']
  },
  {
    id: 'news-3',
    title: 'The Art of the Classical Cover Drive in the Era of 200+ T20 Totals',
    subtitle: 'Why pristine weight transfer, high elbow technique, and stroke discipline remain cricket’s highest aesthetic currency.',
    category: 'Feature',
    author: 'Jarrod Kimber',
    date: 'October 24, 2026',
    readTime: '5 min read',
    imageUrl: '/src/assets/images/cricket_batsman_cover_drive_1793009543452.jpg',
    summary: 'Despite the explosion of ramps, scoops, and helicopter hits, the traditional cover drive remains the ultimate test of a batter’s mastery.',
    content: [
      'In a sports world captivated by brute strike rates and 100-metre maximums, the sight of a batter leaning gracefully into a full delivery outside off stump still stops time.',
      'From Sir Donald Bradman and Wally Hammond through to Sachin Tendulkar, Brian Lara, and Virat Kohli, the cover drive is the signature of batting aristocracy.',
      'Even in modern T20 leagues where power hitting reigns, analysts note that batters possessing an authentic forward defensive and balanced cover drive consistently survive the perilous powerplay overs.'
    ],
    tags: ['Batting Technique', 'Virat Kohli', 'Cricket History', 'Cover Drive']
  }
];

export const WORLD_RECORDS: WorldRecord[] = [
  {
    id: 'rec-1',
    category: 'Highest Individual Score (Test)',
    title: 'Highest Individual Score in Test Cricket',
    recordHolder: 'Brian Lara',
    value: '400* runs',
    teamVs: 'West Indies vs England',
    date: 'April 12, 2004',
    venue: 'St John\'s, Antigua',
    format: 'TEST'
  },
  {
    id: 'rec-2',
    category: 'Highest Individual Score (ODI)',
    title: 'Highest Individual Score in ODI Cricket',
    recordHolder: 'Rohit Sharma',
    value: '264 runs (173 balls, 33x4, 9x6)',
    teamVs: 'India vs Sri Lanka',
    date: 'November 13, 2014',
    venue: 'Eden Gardens, Kolkata',
    format: 'ODI'
  },
  {
    id: 'rec-3',
    category: 'Fastest Century (ODI)',
    title: 'Fastest 100 in One-Day Internationals',
    recordHolder: 'AB de Villiers',
    value: '31 balls',
    teamVs: 'South Africa vs West Indies',
    date: 'January 18, 2015',
    venue: 'Johannesburg',
    format: 'ODI'
  },
  {
    id: 'rec-4',
    category: 'Best Bowling Figures (Test)',
    title: 'Best Bowling Figures in a Test Match',
    recordHolder: 'Jim Laker',
    value: '19/90 (9/37 & 10/53)',
    teamVs: 'England vs Australia',
    date: 'July 31, 1956',
    venue: 'Old Trafford, Manchester',
    format: 'TEST'
  },
  {
    id: 'rec-5',
    category: 'Highest Team Total (T20I)',
    title: 'Highest Innings Total in T20 Internationals',
    recordHolder: 'India',
    value: '297/6 (20.0 ov)',
    teamVs: 'India vs Bangladesh',
    date: 'October 12, 2024',
    venue: 'Hyderabad, India',
    format: 'T20I'
  }
];

export const VIDEOS: VideoHighlight[] = [
  {
    id: 'vid-1',
    title: 'Match Highlights: India vs Australia, Day 4 Thriller at the MCG',
    duration: '14:28',
    category: 'Highlights',
    matchTitle: 'Border-Gavaskar Trophy - 3rd Test',
    views: '1.8M views',
    thumbnailUrl: '/src/assets/images/cricket_stadium_lights_1793009540729.jpg',
    date: '3 hours ago'
  },
  {
    id: 'vid-2',
    title: 'Masterclass: Jasprit Bumrah’s 4-Wicket Masterstroke Breakdown',
    duration: '08:15',
    category: 'Analysis',
    matchTitle: 'Tactical Film Room',
    views: '940K views',
    thumbnailUrl: '/src/assets/images/cricket_fast_bowler_action_1793009544063.jpg',
    date: '5 hours ago'
  },
  {
    id: 'vid-3',
    title: 'Every Boundary & Milestone: Rishabh Pant’s Counter-Attacking Masterpiece',
    duration: '06:40',
    category: 'Highlights',
    matchTitle: 'India 4th Innings Chase',
    views: '1.2M views',
    thumbnailUrl: '/src/assets/images/cricket_batsman_cover_drive_1793009543452.jpg',
    date: '1 hour ago'
  }
];
