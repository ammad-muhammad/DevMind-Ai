import { Code2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-white/10 bg-black pt-12 pb-8 px-4 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="text-[#7c3aed]" size={24} />
            <span className="font-bold text-xl tracking-tight text-white">DevMind AI</span>
          </Link>
          <span className="text-sm text-gray-500">Built for developers, by developers</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <button 
            onClick={() => navigate('/privacy')}
            className="text-gray-400 hover:text-white 
            transition-colors text-sm"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => navigate('/terms')}
            className="text-gray-400 hover:text-white 
            transition-colors text-sm"
          >
            Terms of Service
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 text-center text-xs text-gray-600">
        © 2026 DevMind AI. All rights reserved.
      </div>
    </footer>
  );
};
