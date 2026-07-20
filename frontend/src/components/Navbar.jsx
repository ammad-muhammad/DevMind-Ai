import { Code2, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.relative')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20' : 'bg-transparent'} `}>
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
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-medium">
                      {user?.username}
                    </span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-800">
                        <p className="text-white text-sm font-medium">
                          {user?.username}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigate('/dashboard')
                          setDropdownOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          logout()
                          navigate('/')
                          setDropdownOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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
