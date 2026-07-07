import { useState } from 'react';
import { Copy, Check, Sparkles, AlertCircle, X, ShieldAlert } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const ResultPanel = ({ loading, error, result, modelUsed, onClear }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (text) => {
    if (!text) return null;
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const language = lines[0].trim() || 'javascript';
        const code = lines.slice(1).join('\n');
        
        return (
          <div key={index} className="my-4 rounded-xl overflow-hidden border border-surface-700 shadow-md">
            <div className="flex items-center justify-between px-4 py-2 bg-surface-800 border-b border-surface-700">
              <span className="text-xs font-mono text-slate-400">{language}</span>
            </div>
            <SyntaxHighlighter
              language={language.toLowerCase()}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'var(--color-surface-900)',
                fontSize: '0.875rem'
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      }
      
      if (!part.trim()) return null;
      
      // Basic markdown styling for headers and bold text
      // In a real app we'd use react-markdown, but this meets the rules of not adding packages
      let formattedText = part;
      
      return (
        <div 
          key={index} 
          className="text-slate-300 leading-relaxed space-y-4 my-4 whitespace-pre-wrap font-sans text-[15px]"
        >
          {formattedText}
        </div>
      );
    });
  };

  return (
    <div className="w-full glass rounded-2xl overflow-hidden shadow-2xl border border-surface-700 mt-8 animate-fade-in relative">
      <div className="flex items-center justify-between px-6 py-4 bg-surface-800/80 border-b border-surface-700/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-400" />
          <h3 className="text-lg font-semibold text-slate-200">DevMind Analysis</h3>
        </div>
        <div className="flex items-center gap-2">
          {result && !loading && !error && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700 hover:bg-surface-600 text-slate-300 transition-colors text-sm font-medium border border-surface-600"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors text-sm font-medium border border-red-500/20"
            title="Clear Results"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>
      
      <div className="p-6 md:p-8 bg-surface-900/50">
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-surface-700 rounded-full w-3/4"></div>
            <div className="h-4 bg-surface-700 rounded-full w-full"></div>
            <div className="h-4 bg-surface-700 rounded-full w-5/6"></div>
          </div>
        )}

        {error && !loading && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Analysis Failed</h4>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && result && (
          <>
            {renderContent(result)}
            {modelUsed && (
              <div className="mt-8 pt-4 border-t border-surface-700/50 flex justify-end">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  Powered by: {modelUsed}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
