import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Code2, Loader2 } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError, isAuthenticated, requiresVerification } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else if (requiresVerification) {
      navigate('/verify-otp');
    }
    return () => clearError();
  }, [isAuthenticated, requiresVerification, navigate, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.status === 403 && 
          error.response?.data?.requiresVerification) {
        useAuthStore.getState().setPendingEmail(email);
        navigate('/verify-otp');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 flex flex-col justify-center py-24 sm:px-6 lg:px-8 animate-fade-in">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center text-[#8b5cf6] hover:scale-110 transition-transform duration-300">
            <Code2 size={48} />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            DevMind AI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to your account
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#111111]/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-[#8b5cf6]/5 sm:rounded-2xl sm:px-10 border border-gray-800 transition-all duration-300 hover:border-[#8b5cf6]/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm animate-fade-in">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-[#8b5cf6] focus:border-[#8b5cf6] bg-[#1a1a1a] text-white sm:text-sm transition-all duration-300 focus:shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-900 border border-gray-700 
                    rounded-xl px-4 py-3 text-white pr-12
                    focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 
                    text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 
                        0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 
                        8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b5cf6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#111111] text-gray-400">
                    New to DevMind?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/register"
                  className="w-full flex justify-center py-2.5 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-white/5 hover:text-white focus:outline-none transition-all duration-300"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
