import { useState, useEffect } from 'react';
import useChatStore from '../../store/chatStore';
import { Bug, ChevronDown, Check, Copy, ChevronUp, Loader2 } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'php', name: 'PHP' },
  { id: 'typescript', name: 'TypeScript' },
];

export const Debugger = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0].name);
  const [langOpen, setLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [langMismatch, setLangMismatch] = useState(false);
  
  const { createChat, activeChat, sending, error, clearChat } = useChatStore();

  useEffect(() => {
    // Clear active chat when entering debugger so we start fresh
    clearChat();
  }, [clearChat]);

  const handleDebug = async () => {
    if (!code.trim() || sending) return;
    setLangMismatch(false);
    await createChat({ message: code, conversationType: "debug", language }, language);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find the AI's response (last message from assistant)
  const aiResponse = activeChat?.messages?.findLast(m => m.role === 'assistant');

  const checkLanguageMismatch = (text) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return (
      lower.includes("not in java") ||
      lower.includes("not java") ||
      lower.includes("not javascript") ||
      lower.includes("not python") ||
      lower.includes("not php") ||
      lower.includes("but rather") ||
      lower.includes("this is not") ||
      lower.includes("appears to be") ||
      lower.includes("written in javascript") ||
      lower.includes("written in python") ||
      lower.includes("written in php") ||
      lower.includes("written in java") ||
      lower.includes("is javascript") ||
      lower.includes("is python") ||
      lower.includes("is php") ||
      lower.includes("not a java") ||
      lower.includes("not a python") ||
      lower.includes("not a php")
    );
  };

  useEffect(() => {
    if (aiResponse?.content && !sending) {
      setLangMismatch(checkLanguageMismatch(aiResponse.content));
    }
  }, [aiResponse?.content, sending]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Header */}
      <div className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-4 lg:px-6 bg-[#0a0a0a]/95 backdrop-blur z-10 shrink-0">
        <div className="w-10 lg:w-0" />
        <h2 className="font-semibold flex items-center gap-2 text-white lg:mr-auto">
          <Bug className="text-[#ea580c]" size={20} />
          Debugger
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* Left Panel: Input */}
        <div className="lg:flex-1 border-b lg:border-b-0 lg:border-r border-[#1f1f1f] flex flex-col bg-[#0a0a0a]">
          <div className="p-4 shrink-0 border-b border-[#1f1f1f]">
            <h1 className="text-xl font-bold text-white mb-1">🐛 Code Debugger</h1>
            <p className="text-gray-400 text-sm">Paste your buggy code below and let AI find and fix the issues.</p>
          </div>
          
          <div className="flex flex-col p-4 lg:flex-1 lg:overflow-hidden gap-4">
            <div className="relative w-fit">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-[#111111] border border-[#1f1f1f] rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                {language}
                {langOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              
              {langOpen && (
                <div className="absolute top-full mt-2 left-0 w-44 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden" style={{ zIndex: 30 }}>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.id}
                      onClick={() => { setLanguage(l.name); setLangOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-[#ea580c] hover:text-white transition-colors"
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full min-h-[160px] lg:flex-1 bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 font-mono text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#ea580c]/50 focus:ring-1 focus:ring-[#ea580c]/50 resize-none transition-colors"
            />
            
            {error && (
              <div className="mt-4 bg-red-900/20 border border-red-900 text-red-400 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
              </div>
            )}

            <div className="flex gap-4 mt-4 shrink-0">
              <button
                onClick={handleDebug}
                disabled={!code.trim() || sending}
                className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] disabled:bg-[#1a1a1a] disabled:text-gray-600 text-white py-2.5 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#ea580c]/20 disabled:shadow-none"
              >
                {sending ? (
                  <><Loader2 className="animate-spin" size={18} /> Analyzing...</>
                ) : (
                  <>Find Bugs & Fix →</>
                )}
              </button>
              <button
                onClick={() => setCode('')}
                disabled={sending}
                className="px-6 py-2.5 border border-[#1f1f1f] text-gray-400 hover:text-white hover:bg-[#111111] rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="lg:flex-1 flex flex-col bg-[#0d0d0d] lg:overflow-hidden">
          <div className="p-4 shrink-0 border-t lg:border-t-0 border-b border-[#1f1f1f] flex items-center justify-between min-h-[64px]">
            <h2 className="text-lg font-semibold text-white">Bug Analysis</h2>
            {aiResponse && (
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-medium flex items-center gap-1.5">
                  <Check size={14} /> Fix Applied
                </div>
                <button 
                  onClick={() => handleCopy(aiResponse.content)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Copy full response"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
            )}
          </div>
          
          <div className="p-4 lg:flex-1 lg:overflow-y-auto">
            {sending ? (
              <div className="flex flex-col items-center justify-center text-gray-500 gap-4 py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ea580c]"></div>
                <p>Analyzing code for bugs...</p>
              </div>
            ) : !aiResponse ? (
              <div className="flex flex-col items-center justify-center text-gray-600 text-sm border-2 border-dashed border-[#1f1f1f] rounded-2xl p-6 min-h-[160px]">
                Bug report will appear here...
              </div>
            ) : (
              <div className="animate-scaleIn">
                {langMismatch && (
                  <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3 mb-4 animate-fadeInUp">
                    <span className="text-xl">⚠️</span>
                    <p className="text-yellow-400 text-sm font-medium">
                      Language mismatch! Your code does not match the selected language. Please select the correct language and try again for accurate results.
                    </p>
                    <button 
                      onClick={() => setLangMismatch(false)}
                      className="ml-auto text-yellow-400 hover:text-yellow-300 text-lg font-bold"
                    >✕</button>
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed text-[15px] text-gray-300">
                  <MarkdownRenderer content={aiResponse.content} />
                </div>
                <p className="text-xs text-gray-500 mt-3 border-t border-gray-800 pt-3">
                  💡 Bugs found are highlighted in the analysis above. Review the Fixed Code section for the corrected version.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
