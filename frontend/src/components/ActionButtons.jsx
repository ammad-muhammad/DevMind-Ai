import { Lightbulb, BugPlay, Loader2 } from 'lucide-react';

export const ActionButtons = ({ loading, onExplain, onDebug }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button
        onClick={onExplain}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-medium shadow-lg shadow-brand-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Explaining...</span>
          </>
        ) : (
          <>
            <Lightbulb className="w-5 h-5" />
            <span>Explain Code</span>
          </>
        )}
      </button>

      <button
        onClick={onDebug}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-surface-700 hover:bg-surface-600 border border-surface-600 hover:border-surface-500 text-slate-200 font-medium shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Debugging...</span>
          </>
        ) : (
          <>
            <BugPlay className="w-5 h-5 text-red-400" />
            <span>Debug Code</span>
          </>
        )}
      </button>
    </div>
  );
};
