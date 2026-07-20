import { useEffect, useState } from 'react';
import useSnippetStore from '../../store/snippetStore';
import { Save, Trash2, Code2, Copy, Check } from 'lucide-react';

export const Snippets = () => {
  const { snippets, loading, fetchSnippets, deleteSnippet } = useSnippetStore();
  const [copied, setCopied] = useState({});

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopied(prev => ({ ...prev, [id]: true }));
    setTimeout(() => 
      setCopied(prev => ({ ...prev, [id]: false })), 2000);
  };

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] overflow-y-auto">
      {/* Header */}
      <div className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-4 lg:px-6 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-10 shrink-0">
        <div className="w-10 lg:w-0" />
        <h2 className="font-semibold flex items-center gap-2 text-white lg:mr-auto">
          <Save className="text-blue-500" size={20} />
          Saved Snippets
        </h2>
      </div>

      <div className="max-w-5xl mx-auto w-full p-4 md:p-6">
        {loading && snippets.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : snippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#1f1f1f] flex items-center justify-center mb-6 text-gray-500">
              <Code2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No saved snippets yet</h3>
            <p className="text-gray-400">Save code blocks from your chat responses!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {snippets.map((snippet, index) => {
              const delayClass = index === 0 ? '' : 'delay-' + (Math.min(index, 3) * 100);
              return (
              <div key={snippet._id} className={`bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 hover:border-[#333] transition-colors flex flex-col group animate-fadeInUp card-hover ${delayClass}`}>
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate mb-1">{snippet.title}</h3>
                    {snippet.description && (
                      <p className="text-sm text-gray-400 line-clamp-2">{snippet.description}</p>
                    )}
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-blue-400 uppercase tracking-wider font-semibold shrink-0">
                    {snippet.language}
                  </span>
                </div>

                <div className="bg-[#0d0d0d] rounded-xl p-4 overflow-hidden mb-4 border border-[#1f1f1f]">
                  <pre className="text-sm font-mono text-gray-300 line-clamp-3 whitespace-pre-wrap break-all leading-relaxed">
                    {snippet.code}
                  </pre>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1f1f1f]">
                  <span className="text-xs text-gray-500">{formatDate(snippet.createdAt)}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleCopy(snippet._id, snippet.code)}
                      className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Copy code"
                    >
                      {copied[snippet._id] ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <button 
                      onClick={() => deleteSnippet(snippet._id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete snippet"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
};
