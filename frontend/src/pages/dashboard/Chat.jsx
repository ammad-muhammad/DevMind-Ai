import { useState, useRef, useEffect } from 'react';
import useChatStore from '../../store/chatStore';
import useSnippetStore from '../../store/snippetStore';
import { Code2, Send, ChevronUp, ChevronDown, Check, Copy, Save, X } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';

const SUGGESTIONS = [
  "What is the difference between SQL and NoSQL?",
  "How does React useEffect work?",
  "Explain REST API in simple words",
  "What is the best way to learn web development?"
];

const CodeBlock = ({ content, language }) => {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const { saveSnippet, loading } = useSnippetStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if(!title.trim()) return;
    await saveSnippet(title, content, language || 'code', desc);
    setShowModal(false);
  };

  return (
    <>
    <div className="my-4 rounded-xl overflow-hidden border border-[#333]">
      <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between text-xs text-gray-400">
        <span className="uppercase font-semibold text-gray-500">{language || 'code'}</span>
        <div className="flex gap-3 items-center">
          <button onClick={() => { setTitle(content.substring(0,30)); setShowModal(true); }} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Save size={14} />
            Save
          </button>
          <button onClick={handleCopy} className="flex items-center gap-1.5 hover:text-white transition-colors">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="bg-[#0d0d0d] p-4 overflow-x-auto text-[13px] text-gray-300 font-mono leading-relaxed">
        <pre>{content}</pre>
      </div>
    </div>

    {showModal && (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
          <div className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-6">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Save size={18} className="text-blue-500" />
              Save Snippet
            </h3>
            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Title</label>
              <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none" placeholder="Snippet title..." />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Language</label>
              <input type="text" value={language || 'code'} disabled className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-gray-500 outline-none opacity-70" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Description (Optional)</label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none resize-none" rows={2} placeholder="What does this do?"></textarea>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={!title.trim() || loading} className="flex-1 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors">
                {loading ? 'Saving...' : 'Save Snippet'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export const Chat = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const { createChat, sendMessage, activeChat, sending, error, loading } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, sending]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!message.trim() || sending) return;

    const currentMsg = message;
    setMessage('');
    
    if (activeChat) {
      await sendMessage(activeChat._id, { message: currentMsg, conversationType: "chat" });
    } else {
      await createChat({ message: currentMsg, conversationType: "chat" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      
      {/* Header */}
      <div className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-4 lg:px-6 bg-[#0a0a0a]/95 backdrop-blur z-10 shrink-0">
        {/* Spacer for hamburger on mobile */}
        <div className="w-10 lg:w-0" />
        <h2 className="font-semibold flex items-center gap-2 text-white lg:mr-auto">
          <Code2 className="text-[#7c3aed]" size={20} />
          AI Chat
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7c3aed]"></div>
          </div>
        ) : !activeChat ? (
          <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center mb-6 text-[#7c3aed] border border-[#7c3aed]/20">
              <Code2 size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">How can I help you today?</h1>
            <p className="text-gray-400 mb-10">I can explain complex concepts, debug your errors, or write code from scratch.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {SUGGESTIONS.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => setMessage(s)}
                  className={`bg-[#111111] p-4 rounded-xl border border-[#1f1f1f] text-left hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 transition-all text-sm text-gray-300 animate-fadeInUp card-hover ${i > 0 ? 'delay-' + (i * 100) : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {activeChat.messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div key={index} className={`animate-fadeInUp flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-sm ${
                      isUser 
                        ? 'bg-[#7c3aed] text-white rounded-br-sm' 
                        : 'bg-[#111111] text-gray-200 border border-[#1f1f1f] rounded-bl-sm'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1f1f1f]">
                        <div className="w-6 h-6 rounded-md bg-[#7c3aed]/20 flex items-center justify-center">
                          <Code2 size={14} className="text-[#7c3aed]" />
                        </div>
                        <span className="font-semibold text-sm">DevMind AI</span>
                      </div>
                    )}
                    
                    <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                      <MarkdownRenderer content={msg.content} />
                    </div>
                  </div>
                  <div className={`text-[11px] text-gray-500 mt-1.5 px-1 ${isUser ? 'mr-1' : 'ml-1'}`}>
                    {formatTime(msg.timestamp || new Date())}
                  </div>
                </div>
              );
            })}
            
            {sending && (
              <div className="flex flex-col items-start">
                <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl rounded-bl-sm p-4 sm:p-5 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-400">DevMind is thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-[#0a0a0a] border-t border-[#1f1f1f] shrink-0">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-4 bg-red-900/20 border border-red-900 text-red-400 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="relative bg-[#111111] rounded-2xl border border-[#1f1f1f] shadow-sm focus-within:border-[#7c3aed]/50 focus-within:ring-1 focus-within:ring-[#7c3aed]/50 transition-all">
            
            <div className="flex flex-col p-3 gap-2">

              <div className="flex gap-3 items-end">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message DevMind AI... (Shift+Enter for new line)"
                  className="w-full bg-transparent text-white placeholder-gray-500 resize-none outline-none max-h-[200px] text-[15px] py-2 px-1"
                  rows={1}
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || sending}
                  className="shrink-0 mb-1 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:bg-[#1a1a1a] disabled:text-gray-600 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-[#7c3aed]/20 disabled:shadow-none glow-purple"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </form>
          <div className="text-center mt-3 text-[11px] text-gray-600">
            DevMind AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>

    </div>
  );
};
