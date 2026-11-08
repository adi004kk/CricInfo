/**
 * Gentle Notification Audio Chime using Web Audio API
 * No external media assets needed; works reliably in any modern browser sandbox.
 */
export const playReminderChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    // Two-tone bright notification bell chime (E5 -> G#5)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc1.frequency.exponentialRampToValueAtTime(830.61, ctx.currentTime + 0.12); // G#5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1318.5, ctx.currentTime); // E6 harmonic
    osc2.frequency.exponentialRampToValueAtTime(1661.2, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.45);
    osc2.stop(ctx.currentTime + 0.45);
  } catch (err) {
    // Audio context may be restricted before user gesture
  }
};
