import { useState, useEffect } from 'react';
import useChatStore from '../../store/chatStore';
import useSnippetStore from '../../store/snippetStore';
import { Zap, ChevronDown, Check, Copy, ChevronUp, Loader2, Eye, X, Save } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'php', name: 'PHP' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
];

export const CodeWriter = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0].name);
  const [langOpen, setLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewHTML, setPreviewHTML] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snippetTitle, setSnippetTitle] = useState('');
  const [snippetDesc, setSnippetDesc] = useState('');

  const { createChat, activeChat, sending, error, clearChat } = useChatStore();
  const { saveSnippet, loading: savingSnippet } = useSnippetStore();

  useEffect(() => {
    clearChat();
  }, [clearChat]);

  const handleGenerate = async () => {
    if (!prompt.trim() || sending) return;
    const fullPrompt = `Please write the requested code. Provide only production-ready code with helpful comments, and explain any setup if necessary.\n\nRequirement:\n${prompt}`;
    await createChat({ message: fullPrompt, language, conversationType: "code" }, language);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aiResponse = activeChat?.messages?.findLast(m => m.role === 'assistant');

  const extractHTML = (result) => {
    if (!result) return null;
    const match = result.match(/```html\n([\s\S]*?)```/i);
    if (match) return match[1];
    if (result.includes('<html')) return result;
    return null;
  };

  const getCleanCode = () => {
    if (!aiResponse?.content) return '';
    const extracted = extractHTML(aiResponse.content);
    return extracted || aiResponse.content.replace(/```[\w]*\n?/g, '').trim();
  };

  const handleSaveSnippet = async () => {
    if(!snippetTitle.trim()) return;
    await saveSnippet(snippetTitle, getCleanCode(), language || 'html', snippetDesc);
    setShowSaveModal(false);
  };

  useEffect(() => {
    if (aiResponse?.content) {
      const html = extractHTML(aiResponse.content);
      if (html) setPreviewHTML(html);
      else setPreviewHTML(null);
    } else {
      setPreviewHTML(null);
    }
  }, [aiResponse?.content]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] overflow-y-auto scroll-smooth">
      {/* Header */}
      <div className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-4 lg:px-6 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-10 shrink-0">
        <div className="w-10 lg:w-0" />
        <h2 className="font-semibold flex items-center gap-2 text-white lg:mr-auto">
          <Zap className="text-[#16a34a]" size={20} />
          Code Writer
        </h2>
      </div>

      <div className="max-w-5xl mx-auto w-full p-4 md:p-6 flex flex-col gap-6">
        
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">⚡ Code Writer</h1>
            <p className="text-gray-400">Describe what you want to build, and AI will generate production-ready code.</p>
          </div>
          
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5 shadow-sm focus-within:border-[#16a34a]/50 focus-within:ring-1 focus-within:ring-[#16a34a]/50 transition-all">


            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Write a function that takes an array of objects and sorts them by a given key..."
              className="w-full bg-transparent text-white placeholder-gray-600 resize-none outline-none min-h-[100px] text-sm"
            />
            
            {error && (
              <div className="mt-4 bg-red-900/20 border border-red-900 text-red-400 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
              </div>
            )}

            <div className="flex gap-4 mt-4 justify-end border-t border-[#1f1f1f] pt-4">
              <button
                onClick={() => setPrompt('')}
                disabled={sending || (!prompt && !aiResponse)}
                className="px-6 py-2.5 text-gray-400 hover:text-white rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                Clear
              </button>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || sending}
                className="bg-[#16a34a] hover:bg-[#15803d] disabled:bg-[#1a1a1a] disabled:text-gray-600 text-white py-2.5 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#16a34a]/20 disabled:shadow-none"
              >
                {sending ? (
                  <><Loader2 className="animate-spin" size={18} /> Generating...</>
                ) : (
                  <>Generate Code →</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        {(aiResponse || sending) && (
          <div className="flex flex-col gap-4 animate-fadeInUp">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Generated Code
              </h2>
              {aiResponse && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => { setSnippetTitle(prompt.substring(0,30)); setShowSaveModal(true); }}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium bg-[#111111] border border-[#1f1f1f] px-4 py-2 rounded-lg"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button 
                    onClick={() => handleCopy(aiResponse.content)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium bg-[#111111] border border-[#1f1f1f] px-4 py-2 rounded-lg"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    {copied ? 'Copied to Clipboard' : 'Copy Full Response'}
                  </button>
                </div>
              )}
            </div>
            
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 md:p-5 min-h-[200px]">
              {sending ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4 py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#16a34a]"></div>
                  <p>Writing your code...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap leading-relaxed text-[15px] text-gray-300">
                  <MarkdownRenderer content={aiResponse.content} />
                </div>
              )}
              
              {previewHTML && !sending && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-purple-600/20"
                  >
                    <Eye size={18} />
                    Preview UI
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
      </div>

      {/* Preview Modal */}
      {showPreview && previewHTML && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col backdrop-blur-sm animate-scaleIn">
          <div className="h-16 flex items-center justify-between px-6 border-b border-[#333]">
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              <Eye className="text-purple-500" size={20} />
              Live Preview
            </h3>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 hover:bg-[#222] rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 bg-[#0a0a0a]">
            <iframe
              srcDoc={previewHTML}
              title="Live Preview"
              style={{
                width: '100%',
                height: '85vh',
                border: 'none',
                background: 'white',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>
      )}
      {/* Save Snippet Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-6">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Save size={18} className="text-blue-500" />
                Save Snippet
              </h3>
              <button onClick={() => setShowSaveModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Title</label>
                <input type="text" value={snippetTitle} onChange={e=>setSnippetTitle(e.target.value)} className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none" placeholder="Snippet title..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Language</label>
                <input type="text" value={language || 'html'} disabled className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-gray-500 outline-none opacity-70" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Description (Optional)</label>
                <textarea value={snippetDesc} onChange={e=>setSnippetDesc(e.target.value)} className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none resize-none" rows={2} placeholder="What does this do?"></textarea>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setShowSaveModal(false)} className="flex-1 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors">Cancel</button>
                <button onClick={handleSaveSnippet} disabled={!snippetTitle.trim() || savingSnippet} className="flex-1 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors">
                  {savingSnippet ? 'Saving...' : 'Save Snippet'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
