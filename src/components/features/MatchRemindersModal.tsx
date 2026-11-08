import React, { useState, useEffect } from 'react';
import { useCricket } from '../../context/CricketContext';
import { 
  Bell, 
  BellRing, 
  BellOff, 
  X, 
  Volume2, 
  VolumeX, 
  Clock, 
  Trash2, 
  Play, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { MatchReminderConfig } from '../../types/cricket';

export const MatchRemindersModal: React.FC = () => {
  const { 
    isRemindersModalOpen, 
    setIsRemindersModalOpen, 
    matches, 
    preferences, 
    toggleMatchReminder, 
    updateReminderConfig, 
    clearAllReminders, 
    toggleSoundAlerts, 
    triggerTestReminderAlert,
    setSelectedMatchId,
    setActiveNavTab
  } = useCricket();

  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update countdown every 30 seconds
  useEffect(() => {
    if (!isRemindersModalOpen) return;
    const interval = setInterval(() => setCurrentTime(Date.now()), 30000);
    return () => clearInterval(interval);
  }, [isRemindersModalOpen]);

  if (!isRemindersModalOpen) return null;

  const reminderMatchIds = preferences.reminders || [];
  const reminderMatches = matches.filter(m => reminderMatchIds.includes(m.id));
  const upcomingMatchesNotReminded = matches
    .filter(m => m.status === 'scheduled' && !reminderMatchIds.includes(m.id))
    .slice(0, 3);

  const formatCountdown = (startTimeStr: string) => {
    const diff = new Date(startTimeStr).getTime() - currentTime;
    if (diff <= 0) return 'Starting soon or live';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `Starts in ${days}d ${hours % 24}h`;
    }
    return `Starts in ${hours}h ${minutes}m`;
  };

  const handleOpenMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setActiveNavTab('match-center');
    setIsRemindersModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reminders-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h2 id="reminders-modal-title" className="text-base font-bold text-white flex items-center gap-2">
                Match Reminders
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                  {reminderMatchIds.length} active
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Get alerted before toss, first ball, and thrilling finishes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleSoundAlerts}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                preferences.soundAlerts 
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' 
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={preferences.soundAlerts ? 'Audio alert chime enabled' : 'Audio chime muted'}
            >
              {preferences.soundAlerts ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline font-medium">
                {preferences.soundAlerts ? 'Chime On' : 'Muted'}
              </span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsRemindersModalOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Reminders modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {reminderMatches.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Active alerts will chime and display in-app notifications.</span>
                <button
                  onClick={clearAllReminders}
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </button>
              </div>

              {reminderMatches.map((m) => {
                const config: MatchReminderConfig = preferences.reminderConfigs?.[m.id] || {
                  matchId: m.id,
                  leadTimeMinutes: 15,
                  notifyToss: true,
                  notifyInningsBreak: true,
                  notifyCloseFinish: true,
                  createdAt: new Date().toISOString()
                };

                return (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 transition-all space-y-3"
                  >
                    {/* Top Row: Format, Series & Countdown */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-semibold text-sky-400">{m.format}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-300 truncate">{m.seriesName}</span>
                      </div>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium text-[11px] whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        {formatCountdown(m.startTime)}
                      </span>
                    </div>

                    {/* Teams Banner */}
                    <div 
                      onClick={() => handleOpenMatch(m.id)}
                      className="flex items-center justify-between cursor-pointer py-1 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{m.teamHome.flag}</span>
                          <span className="font-semibold text-white group-hover:text-sky-300 transition-colors">
                            {m.teamHome.code}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-bold">vs</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{m.teamAway.flag}</span>
                          <span className="font-semibold text-white group-hover:text-sky-300 transition-colors">
                            {m.teamAway.code}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-sky-400 transition-colors">
                        <span>Match Center</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Venue & Time */}
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{new Date(m.startTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      <span className="text-slate-600">·</span>
                      <span className="truncate">{m.venue.name}, {m.venue.city}</span>
                    </div>

                    {/* Alert Preference Controls */}
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                      {/* Lead Time Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">Notify me:</span>
                        <select
                          value={config.leadTimeMinutes}
                          onChange={(e) => updateReminderConfig(m.id, { leadTimeMinutes: Number(e.target.value) })}
                          aria-label={`Notification lead time for ${m.teamHome.name} vs ${m.teamAway.name}`}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                        >
                          <option value={0}>At Match Start</option>
                          <option value={15}>15 minutes before</option>
                          <option value={30}>30 minutes before</option>
                          <option value={60}>1 hour before</option>
                          <option value={120}>2 hours before</option>
                        </select>
                      </div>

                      {/* Checkbox Chips */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateReminderConfig(m.id, { notifyToss: !config.notifyToss })}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                            config.notifyToss 
                              ? 'bg-sky-500/15 border-sky-500/40 text-sky-300' 
                              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Toss Alert
                        </button>
                        <button
                          type="button"
                          onClick={() => updateReminderConfig(m.id, { notifyCloseFinish: !config.notifyCloseFinish })}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                            config.notifyCloseFinish 
                              ? 'bg-sky-500/15 border-sky-500/40 text-sky-300' 
                              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Close Finish
                        </button>

                        {/* Test Alert Button */}
                        <button
                          type="button"
                          onClick={() => triggerTestReminderAlert(m.id)}
                          className="p-1 rounded text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                          title="Simulate reminder alert now"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>

                        {/* Remove Reminder */}
                        <button
                          type="button"
                          onClick={() => toggleMatchReminder(m.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Remove reminder"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <BellOff className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">No Match Reminders Set</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Never miss a crucial toss or thrilling final over. Toggle the bell icon on any upcoming match to receive timely chimes and alerts.
              </p>
            </div>
          )}

          {/* Quick-add Upcoming Matches */}
          {upcomingMatchesNotReminded.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Suggested Upcoming Matches to Follow</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {upcomingMatchesNotReminded.map(m => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between gap-3 text-xs hover:border-slate-700/80 transition-colors"
                  >
                    <div className="truncate">
                      <div className="font-semibold text-slate-200 truncate">
                        {m.teamHome.code} vs {m.teamAway.code}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {m.format} · {formatCountdown(m.startTime)}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMatchReminder(m.id)}
                      className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <Bell className="w-3 h-3" />
                      Set Alert
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800/80 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Preferences saved locally to your device</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerTestReminderAlert()}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors text-xs"
            >
              <Play className="w-3 h-3 text-amber-400" />
              Test Audio Alert
            </button>
            <button
              onClick={() => setIsRemindersModalOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors text-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
