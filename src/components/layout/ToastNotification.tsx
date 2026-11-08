import React from 'react';
import { useCricket } from '../../context/CricketContext';
import { BellRing, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast, dismissToast, setIsRemindersModalOpen } = useCricket();

  if (!toast) return null;

  const isReminder = toast.title.toLowerCase().includes('reminder');

  return (
    <aside 
      aria-label="Notification"
      className="fixed bottom-20 right-4 sm:right-6 z-50 max-w-sm w-full bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-2xl rounded-2xl p-4 animate-in slide-in-from-bottom-5 duration-200"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl shrink-0 ${
          toast.type === 'success' 
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
            : toast.type === 'warning'
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
        }`}>
          {isReminder ? (
            <BellRing className="w-5 h-5" />
          ) : toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : toast.type === 'warning' ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-sm font-bold text-white tracking-tight leading-tight">
            {toast.title}
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {toast.message}
          </p>

          {isReminder && (
            <button
              onClick={() => {
                dismissToast();
                setIsRemindersModalOpen(true);
              }}
              className="mt-2 text-[11px] font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors block"
            >
              View all reminders →
            </button>
          )}
        </div>

        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
