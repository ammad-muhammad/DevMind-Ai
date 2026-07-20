import { Code2, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <Code2 className="text-[#7c3aed]" size={24} />
            <span className="font-bold text-lg tracking-tight text-white">DevMind AI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo('features')} className="text-xs font-medium text-gray-300 hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-xs font-medium text-gray-300 hover:text-white transition-colors">How it Works</button>
            
            <div className="flex items-center gap-3 ml-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 mr-2">
                    <div className="w-7 h-7 rounded-full bg-[#7c3aed] flex items-center justify-center text-white font-bold text-xs">
                      {user?.username ? user.username[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-medium text-white">{user?.username}</span>
                  </div>
                  <button 
                    onClick={() => navigate('/dashboard')} 
                    className="text-xs font-medium bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
                  >
                    Go to Dashboard
                  </button>
                  <button 
                    onClick={() => { logout(); navigate('/'); }} 
                    className="text-xs font-medium text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {location.pathname !== '/login' && (
                    <Link to="/login" className="text-xs font-medium text-gray-300 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-300">
                      Login
                    </Link>
                  )}
                  {location.pathname !== '/register' && (
                    <Link to="/register" className="text-xs font-medium bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]">
                      Get Started Free
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-4 py-6 space-y-4 shadow-xl">
          <button onClick={() => { scrollTo('features'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-base text-gray-300 hover:text-white py-2">Features</button>
          <button onClick={() => { scrollTo('how-it-works'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-base text-gray-300 hover:text-white py-2">How it Works</button>
          
          <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center text-white font-bold text-sm">
                    {user?.username ? user.username[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-base font-medium text-white">{user?.username}</span>
                </div>
                <button 
                  onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} 
                  className="w-full text-center text-sm font-medium bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-3 rounded-lg transition-all duration-300"
                >
                  Go to Dashboard
                </button>
                <button 
                  onClick={() => { logout(); navigate('/'); setIsMobileMenuOpen(false); }} 
                  className="w-full text-center text-sm font-medium text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 px-5 py-3 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="w-full text-center text-sm font-medium text-gray-300 hover:text-white border border-white/20 hover:border-white/40 px-5 py-3 rounded-lg transition-all duration-300">
                    Login
                  </Link>
                )}
                {location.pathname !== '/register' && (
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/register" className="w-full text-center text-sm font-medium bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-3 rounded-lg transition-all duration-300">
                    Get Started Free
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
