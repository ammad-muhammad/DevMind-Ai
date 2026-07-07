import { BrainCircuit } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="relative bg-surface-800 p-4 rounded-full border border-surface-700 shadow-lg">
          <BrainCircuit className="w-8 h-8 text-brand-400 animate-spin-slow" />
        </div>
      </div>
      <p className="mt-6 text-slate-400 font-medium animate-pulse">
        DevMind is analyzing your code...
      </p>
    </div>
  );
};
