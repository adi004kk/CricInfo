import { describe, it, expect } from 'vitest';
import { 
  calculateRunRate, 
  calculateRequiredRunRate, 
  incrementOver, 
  calculateStrikeRate, 
  calculateEconomyRate,
  shouldRotateStrike,
  calculateNetRunRate
} from '../utils/cricketMath';

describe('Cricket Mathematical Rules & Score Calculations', () => {
  it('calculates run rate correctly across completed and fractional overs', () => {
    // 200 runs in 40.0 overs = 5.00
    expect(calculateRunRate(200, 40.0)).toBe(5.00);

    // 175 runs in 19.3 overs (117 balls) = (175 / 117) * 6 = 8.97
    expect(calculateRunRate(175, 19.3)).toBe(8.97);

    // 0 overs edge case
    expect(calculateRunRate(0, 0)).toBe(0);
  });

  it('calculates required run rate correctly', () => {
    // 36 runs needed off 24 balls = 9.00
    expect(calculateRequiredRunRate(36, 24)).toBe(9.00);

    // 12 runs needed off 6 balls = 12.00
    expect(calculateRequiredRunRate(12, 6)).toBe(12.00);

    // 0 runs needed
    expect(calculateRequiredRunRate(0, 10)).toBe(0);
  });

  it('increments overs accurately avoiding impossible decimals', () => {
    // 14.1 -> 14.2
    expect(incrementOver(14.1)).toBe(14.2);

    // 14.4 -> 14.5
    expect(incrementOver(14.4)).toBe(14.5);

    // 14.5 + 1 ball -> 15.0 (over completes)
    expect(incrementOver(14.5)).toBe(15.0);
  });

  it('calculates batter strike rate and bowler economy accurately', () => {
    // 76 runs off 59 balls = 128.8%
    expect(calculateStrikeRate(76, 59)).toBe(128.8);

    // 0 balls faced
    expect(calculateStrikeRate(0, 0)).toBe(0);

    // 24 runs conceded in 4.0 overs = 6.00
    expect(calculateEconomyRate(24, 4.0)).toBe(6.00);
  });

  it('rotates strike correctly based on delivery score and over completion', () => {
    // Single on ball 3: rotates strike
    expect(shouldRotateStrike(1, 3)).toBe(true);

    // Dot on ball 3: no strike rotation
    expect(shouldRotateStrike(0, 3)).toBe(false);

    // Four on ball 3: no strike rotation
    expect(shouldRotateStrike(4, 3)).toBe(false);

    // Single on ball 6 (over end): odd run rotates, but over end rotates back -> striker stays on strike!
    expect(shouldRotateStrike(1, 6)).toBe(false);

    // Dot or Four on ball 6 (over end): rotates due to change of ends
    expect(shouldRotateStrike(0, 6)).toBe(true);
    expect(shouldRotateStrike(4, 6)).toBe(true);
  });

  it('calculates net run rate (NRR) accurately', () => {
    // Team A scored 250 in 50 ov (5.00), conceded 200 in 50 ov (4.00) => +1.000
    expect(calculateNetRunRate(250, 50.0, 200, 50.0)).toBe(1.000);
  });
});
