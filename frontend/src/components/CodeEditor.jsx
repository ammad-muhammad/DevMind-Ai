import { Eraser } from 'lucide-react';

export const CodeEditor = ({ code, onCodeChange, onClear }) => {
  const lineCount = code ? code.split('\n').length : 1;
  const charCount = code.length;

  // Generate line numbers
  const lineNumbers = Array.from({ length: Math.max(10, lineCount) }, (_, i) => i + 1);

  return (
    <div className="w-full relative glass rounded-2xl overflow-hidden shadow-xl border border-surface-700 transition-all focus-within:border-brand-500/50 focus-within:ring-1 focus-within:ring-brand-500/50">
      
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-800/80 border-b border-surface-700/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span>{lineCount} lines</span>
          <span>{charCount} chars</span>
          <button
            onClick={onClear}
            disabled={!code}
            className={`flex items-center gap-1.5 transition-colors ${
              code ? 'text-slate-300 hover:text-red-400 cursor-pointer' : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Clear Code"
          >
            <Eraser className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Editor Body with line numbers */}
      <div className="flex relative min-h-[300px]">
        {/* Line numbers column */}
        <div className="py-4 px-3 text-right bg-surface-800/30 text-slate-500 font-mono text-sm select-none border-r border-surface-700/50 min-w-[3rem]">
          {lineNumbers.map(num => (
            <div key={num} className="leading-6 opacity-60">{num}</div>
          ))}
        </div>
        
        {/* Textarea */}
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Paste your code here..."
          className="flex-1 bg-transparent text-slate-200 font-mono text-sm p-4 leading-6 resize-none focus:outline-none whitespace-pre"
          spellCheck="false"
        />
      </div>
    </div>
  );
};
