import { Bug, BookOpen, Zap, MessageSquare, Globe, History, UserPlus, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Landing = () => {
  const [typingText, setTypingText] = useState('');
  const fullText = "function calculateFibonacci(n) {\n  if (n <= 1) return n;\n  return calculateFibonacci(n-1) + \n         calculateFibonacci(n-2);\n}";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.substring(0, i + 1));
        i++;
      } else {
        setTimeout(() => { i = 0; }, 3000); 
      }
    }, 50);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => {
      clearInterval(typingInterval);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#7c3aed]/30 overflow-x-hidden">
      
      <Navbar />

      {/* SECTION 2: Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7c3aed]/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
          
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a78bfa] text-sm font-medium backdrop-blur-sm transition-transform duration-500 hover:scale-105">
            🚀 AI-Powered Developer Tool
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight transition-transform duration-700 hover:scale-[1.02]">
            Your Intelligent <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#7c3aed] to-[#5b21b6]">
              Coding Partner
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-100">
            Explain, debug, and write code 10x faster with AI. 
            Built for developers who ship fast.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 transition-all duration-700 delay-200">
            <Link to="/login" className="glow-purple w-full sm:w-auto text-base font-semibold bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-1">
              Start Coding Free →
            </Link>
            <button onClick={() => scrollTo('how-it-works')} className="w-full sm:w-auto text-base font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 px-8 py-4 rounded-xl transition-all duration-300">
              See How It Works
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mb-16 transition-all duration-700 delay-300">
            No credit card required • Free forever
          </p>
          
          {/* Mockup Window */}
          <div className="w-full max-w-4xl relative rounded-2xl border border-white/10 bg-[#111111]/80 backdrop-blur-xl shadow-2xl overflow-hidden text-left flex flex-col md:flex-row transition-all duration-1000 delay-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]">
            {/* Header bar */}
            <div className="absolute top-0 left-0 w-full h-8 bg-black/40 border-b border-white/10 flex items-center px-4 gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer"></div>
            </div>
            
            <div className="w-full md:w-1/2 p-6 pt-12 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-xs text-gray-500 font-mono mb-2">fibonacci.js</div>
              <pre className="font-mono text-sm text-blue-300">
                {typingText}<span className="animate-pulse inline-block w-2 h-4 bg-[#7c3aed] ml-1 align-middle"></span>
              </pre>
            </div>
            
            <div className="w-full md:w-1/2 p-6 pt-12 bg-black/20">
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={16} className="text-[#7c3aed]" />
                <span className="text-xs font-semibold text-gray-300">DevMind AI</span>
              </div>
              <div className="text-sm text-gray-300 leading-relaxed">
                <p className="mb-2">This is a recursive function to calculate the Fibonacci sequence.</p>
                <p className="mb-2"><strong>Time Complexity:</strong> O(2^n) - exponential.</p>
                <p>💡 <em>Tip: You can optimize this using memoization to achieve O(n) time complexity.</em></p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 3: Stats */}
      <section className="scroll-animate border-y border-white/5 bg-black/40 py-12 transition-colors duration-500 hover:bg-black/60">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex-1 text-center py-4 md:py-0 transition-transform duration-300 hover:scale-110">
            <div className="text-4xl font-bold text-white mb-2 tracking-tight">10,000+</div>
            <div className="text-gray-400 font-medium">Developers</div>
          </div>
          <div className="flex-1 text-center py-4 md:py-0 transition-transform duration-300 hover:scale-110">
            <div className="text-4xl font-bold text-white mb-2 tracking-tight">50+</div>
            <div className="text-gray-400 font-medium">Languages Supported</div>
          </div>
          <div className="flex-1 text-center py-4 md:py-0 transition-transform duration-300 hover:scale-110">
            <div className="text-4xl font-bold text-white mb-2 tracking-tight">3</div>
            <div className="text-gray-400 font-medium">AI Models</div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Features */}
      <section id="features" className="py-24 px-4 relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#7c3aed]/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 transition-all duration-500 hover:tracking-wide">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#7c3aed]">code smarter</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="scroll-animate card-hover group bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bug size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Smart Debugger</h3>
              <p className="text-gray-400 leading-relaxed">Paste buggy code and get instant bug analysis with line-by-line fixes</p>
            </div>
            
            <div className="scroll-animate card-hover group bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Code Explainer</h3>
              <p className="text-gray-400 leading-relaxed">Understand any codebase instantly with step-by-step plain English explanations</p>
            </div>
            
            <div className="scroll-animate card-hover group bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Code Writer</h3>
              <p className="text-gray-400 leading-relaxed">Describe what you want and get production-ready code in seconds</p>
            </div>
            
            <div className="scroll-animate card-hover group bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI Chat</h3>
              <p className="text-gray-400 leading-relaxed">Have a full conversation about your code with context memory across messages</p>
            </div>
            
            <div className="scroll-animate card-hover group bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">50+ Languages</h3>
              <p className="text-gray-400 leading-relaxed">JavaScript, Python, PHP, Java, C++, TypeScript and many more supported</p>
            </div>
            
            <div className="scroll-animate card-hover group bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <History size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Save & History</h3>
              <p className="text-gray-400 leading-relaxed">All your conversations saved automatically. Access your coding history anytime</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 5: How it works */}
      <section id="how-it-works" className="py-24 px-4 bg-black/30 transition-colors duration-700 hover:bg-black/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-20 transition-all duration-500 hover:tracking-wide">Start coding smarter in 3 steps</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            
            <div className="scroll-animate flex-1 flex flex-col items-center group">
              <div className="w-20 h-20 rounded-2xl bg-[#7c3aed]/20 border border-[#7c3aed]/30 flex items-center justify-center text-[#a78bfa] mb-6 transition-all duration-300 group-hover:bg-[#7c3aed]/40 group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_15px_rgba(124,58,237,0)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <UserPlus size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Create Account</h3>
              <p className="text-gray-400 max-w-xs mx-auto">Sign up free in 30 seconds. No credit card needed.</p>
            </div>
            
            <div className="hidden md:block w-24 h-[2px] bg-gradient-to-r from-[#7c3aed]/20 via-[#7c3aed]/50 to-[#7c3aed]/20 -mt-16 transition-all duration-500 hover:via-[#7c3aed]"></div>
            
            <div className="scroll-animate flex-1 flex flex-col items-center group">
              <div className="w-20 h-20 rounded-2xl bg-[#7c3aed]/20 border border-[#7c3aed]/30 flex items-center justify-center text-[#a78bfa] mb-6 transition-all duration-300 group-hover:bg-[#7c3aed]/40 group-hover:scale-110 group-hover:-rotate-3 shadow-[0_0_15px_rgba(124,58,237,0)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <Code2 size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Paste Your Code</h3>
              <p className="text-gray-400 max-w-xs mx-auto">Drop your code or describe what you need built.</p>
            </div>
            
            <div className="hidden md:block w-24 h-[2px] bg-gradient-to-r from-[#7c3aed]/20 via-[#7c3aed]/50 to-[#7c3aed]/20 -mt-16 transition-all duration-500 hover:via-[#7c3aed]"></div>
            
            <div className="scroll-animate flex-1 flex flex-col items-center group">
              <div className="w-20 h-20 rounded-2xl bg-[#7c3aed]/20 border border-[#7c3aed]/30 flex items-center justify-center text-[#a78bfa] mb-6 transition-all duration-300 group-hover:bg-[#7c3aed]/40 group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_15px_rgba(124,58,237,0)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <Zap size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get AI Response</h3>
              <p className="text-gray-400 max-w-xs mx-auto">Instant explanations, bug fixes, or fresh code.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="scroll-animate py-24 px-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4c1d95] via-[#2e1065] to-black opacity-80 -z-10 transition-opacity duration-700 group-hover:opacity-100"></div>
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 transition-transform duration-500 group-hover:scale-105">Ready to code smarter?</h2>
          <p className="text-xl text-[#c4b5fd] mb-10 max-w-2xl mx-auto">Join thousands of developers already using DevMind AI</p>
          <Link to="/login" className="inline-block text-lg font-bold bg-white text-[#7c3aed] hover:bg-gray-100 px-10 py-5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110">
            Get Started For Free →
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
};
