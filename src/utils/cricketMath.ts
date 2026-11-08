/**
 * Cricket Mathematical Rules & Calculation Utilities
 */

/**
 * Calculates current run rate: (Total Runs / Total Legal Overs)
 */
export function calculateRunRate(runs: number, oversDecimal: number): number {
  const completedOvers = Math.floor(oversDecimal);
  const balls = Math.round((oversDecimal - completedOvers) * 10);
  const totalBalls = completedOvers * 6 + balls;
  if (totalBalls <= 0) return 0;
  return parseFloat(((runs / totalBalls) * 6).toFixed(2));
}

/**
 * Calculates required run rate: (Runs Needed / Remaining Legal Overs)
 */
export function calculateRequiredRunRate(runsNeeded: number, remainingBalls: number): number {
  if (remainingBalls <= 0) return runsNeeded <= 0 ? 0 : Infinity;
  if (runsNeeded <= 0) return 0;
  return parseFloat(((runsNeeded / remainingBalls) * 6).toFixed(2));
}

/**
 * Increments an over decimal representation by 1 legal ball.
 * E.g., 68.4 + 1 ball -> 68.5; 68.5 + 1 ball -> 69.0.
 */
export function incrementOver(oversDecimal: number): number {
  const completedOvers = Math.floor(oversDecimal);
  const balls = Math.round((oversDecimal - completedOvers) * 10);
  if (balls >= 5) {
    return completedOvers + 1;
  }
  return parseFloat((completedOvers + (balls + 1) / 10).toFixed(1));
}

/**
 * Computes batter strike rate: (Runs / Balls Faced) * 100
 */
export function calculateStrikeRate(runs: number, balls: number): number {
  if (balls <= 0) return 0;
  return parseFloat(((runs / balls) * 100).toFixed(1));
}

/**
 * Computes bowler economy rate: (Runs Conceded / Overs Bowled)
 */
export function calculateEconomyRate(runs: number, oversDecimal: number): number {
  return calculateRunRate(runs, oversDecimal);
}

/**
 * Determines whether the active striker changes on a legal delivery.
 * Strike changes if:
 * 1) Odd number of runs scored (1 or 3) and it's NOT the end of the over.
 * 2) Even number of runs (0, 2, 4, 6) or wicket and it IS the end of the over (ball 6).
 */
export function shouldRotateStrike(runsScored: number, ballInOver: number): boolean {
  const isOddRuns = runsScored % 2 !== 0;
  const isOverEnd = ballInOver === 6;
  return isOddRuns !== isOverEnd;
}

/**
 * Calculates tournament Net Run Rate (NRR):
 * NRR = (Total Runs Scored / Total Overs Faced) - (Total Runs Conceded / Total Overs Bowled)
 */
export function calculateNetRunRate(
  runsScored: number,
  oversFaced: number,
  runsConceded: number,
  oversBowled: number
): number {
  const forRate = calculateRunRate(runsScored, oversFaced);
  const againstRate = calculateRunRate(runsConceded, oversBowled);
  return parseFloat((forRate - againstRate).toFixed(3));
}
