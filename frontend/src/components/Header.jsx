import { BrainCircuit } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
      <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
        <BrainCircuit className="w-10 h-10 text-brand-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        DevMind <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">AI</span>
      </h1>
      <p className="text-slate-400 max-w-lg mx-auto text-lg">
        Your intelligent pair programmer. Paste your code below to get instant explanations and debug insights.
      </p>
    </header>
  );
};
