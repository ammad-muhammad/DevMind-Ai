import { useState, useRef, useEffect } from 'react';
import { Code2, ChevronDown, Check } from 'lucide-react';

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'php', name: 'PHP' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'html', name: 'HTML/CSS' }
];

export const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const selectedName = languages.find(l => l.id === selectedLanguage)?.name || 'Select Language';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex flex-col items-end" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-surface-800 border ${isOpen ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-surface-700'} text-slate-200 py-2.5 px-4 rounded-xl focus:outline-none transition-all cursor-pointer font-medium text-sm hover:bg-surface-700 min-w-[160px] justify-between shadow-md`}
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-brand-400" />
          <span>{selectedName}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-full min-w-[180px] bg-surface-800 border border-surface-700 rounded-xl shadow-2xl z-50 overflow-hidden glass origin-top animate-fade-in">
          <div className="max-h-[300px] overflow-y-auto p-1.5 flex flex-col gap-0.5">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  onLanguageChange(lang.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors text-sm ${
                  selectedLanguage === lang.id
                    ? 'bg-brand-500/15 text-brand-400 font-medium'
                    : 'text-slate-300 hover:bg-surface-700 hover:text-slate-100'
                }`}
              >
                <span>{lang.name}</span>
                {selectedLanguage === lang.id && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
