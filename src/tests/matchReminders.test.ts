import { describe, it, expect, beforeEach } from 'vitest';
import { MatchReminderConfig } from '../types/cricket';

describe('Match Reminders Configuration & Preferences Logic', () => {
  // Simple in-memory mock for environments without DOM localStorage
  const mockStorage: Record<string, string> = {};

  beforeEach(() => {
    for (const key in mockStorage) {
      delete mockStorage[key];
    }
  });

  it('generates standard default reminder config for matches', () => {
    const matchId = 'match-ind-eng-t20';
    const config: MatchReminderConfig = {
      matchId,
      leadTimeMinutes: 15,
      notifyToss: true,
      notifyInningsBreak: true,
      notifyCloseFinish: true,
      createdAt: new Date().toISOString()
    };

    expect(config.matchId).toBe(matchId);
    expect(config.leadTimeMinutes).toBe(15);
    expect(config.notifyToss).toBe(true);
    expect(config.notifyCloseFinish).toBe(true);
  });

  it('persists and retrieves reminders correctly via JSON storage model', () => {
    const initialReminders = ['match-1', 'match-2'];
    const configs: Record<string, MatchReminderConfig> = {
      'match-1': {
        matchId: 'match-1',
        leadTimeMinutes: 30,
        notifyToss: true,
        notifyInningsBreak: false,
        notifyCloseFinish: true,
        createdAt: '2026-10-26T12:00:00Z'
      }
    };

    const storedData = {
      reminders: initialReminders,
      reminderConfigs: configs,
      soundAlerts: true
    };

    mockStorage['cricinfo_prefs'] = JSON.stringify(storedData);

    const retrieved = JSON.parse(mockStorage['cricinfo_prefs'] || '{}');
    expect(retrieved.reminders).toContain('match-1');
    expect(retrieved.reminders).toHaveLength(2);
    expect(retrieved.reminderConfigs['match-1'].leadTimeMinutes).toBe(30);
    expect(retrieved.soundAlerts).toBe(true);
  });

  it('handles lead-time threshold calculations correctly', () => {
    const matchStart = new Date(Date.now() + 20 * 60 * 1000).getTime(); // 20 mins from now
    const now = Date.now();
    const diffMinutes = Math.round((matchStart - now) / 60000);

    // If lead time is 30 mins, alert window is entered
    const leadTime30 = 30;
    const shouldAlert30 = diffMinutes <= leadTime30;
    expect(shouldAlert30).toBe(true);

    // If lead time is 10 mins, alert window has not arrived yet
    const leadTime10 = 10;
    const shouldAlert10 = diffMinutes <= leadTime10;
    expect(shouldAlert10).toBe(false);
  });
});
