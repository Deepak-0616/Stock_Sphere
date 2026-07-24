import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Server, 
  Database, 
  Cpu, 
  Globe,
  Sparkles,
  FastForward
} from 'lucide-react';

const INITIALIZATION_STEPS = [
  'Initializing Enterprise Workspace',
  'Connecting Secure Services',
  'Loading Enterprise Modules',
  'Building Knowledge Graph',
  'Synchronizing Department Intelligence',
  'Preparing AI Collaboration Engine',
  'Activating Decision Engine',
  'Loading Enterprise Memory',
  'Enterprise Intelligence Ready'
];

export const EnterpriseSplash = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Total duration ~2.8 seconds split across steps
    const stepDuration = 280; // ms per step
    const progressIntervalMs = 30;
    const totalSteps = INITIALIZATION_STEPS.length;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, progressIntervalMs);

    const stepTimer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(stepTimer);
          return totalSteps - 1;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, []);

  // When progress reaches 100%, trigger smooth fade out
  useEffect(() => {
    if (progress >= 100 && currentStepIndex === INITIALIZATION_STEPS.length - 1) {
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        const completeTimeout = setTimeout(() => {
          if (onComplete) onComplete();
        }, 400); // 400ms fade duration
        return () => clearTimeout(completeTimeout);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, currentStepIndex, onComplete]);

  const handleSkip = () => {
    try {
      localStorage.setItem('solvex_skip_splash', 'true');
    } catch (e) {
      // Ignore storage errors
    }
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#0B1220] text-slate-100 flex flex-col justify-between p-6 md:p-12 font-sans transition-opacity duration-500 ease-out select-none ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Top Header Section */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#111827] border border-white/10 flex items-center justify-center shadow-lg shadow-black/50">
            <Brain className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-[#F9FAFB]">SolveX AI</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/40 text-blue-400 font-mono font-bold tracking-wider uppercase">
                Enterprise OS
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] font-medium tracking-wide">
              One Brain. Every Department. Smarter Decisions.
            </p>
          </div>
        </div>

        {/* Skip Splash Button */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 hover:border-white/20 text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-all cursor-pointer"
          title="Skip initialization screen"
        >
          <span>Skip to Login</span>
          <FastForward className="w-3.5 h-3.5 text-[#3B82F6]" />
        </button>
      </header>

      {/* Center Initialization Status Panel */}
      <main className="max-w-xl mx-auto w-full z-10 my-auto">
        <div className="bg-[#111827]/82 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/80 backdrop-blur-xl space-y-6">
          
          {/* Header info */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F9FAFB]">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" />
              <span>System Initialization Sequence</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#3B82F6]">
              {progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-2.5 bg-[#0B1220] rounded-full overflow-hidden p-0.5 border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-[#3B82F6] rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Sequential Steps List */}
          <div className="space-y-2.5 pt-2 max-h-56 overflow-y-auto pr-1">
            {INITIALIZATION_STEPS.map((step, idx) => {
              const isDone = idx < currentStepIndex || progress === 100;
              const isCurrent = idx === currentStepIndex && progress < 100;

              return (
                <div 
                  key={step} 
                  className={`flex items-center gap-3 text-xs transition-all duration-200 ${
                    isDone 
                      ? 'text-[#F9FAFB] opacity-100' 
                      : isCurrent 
                      ? 'text-[#3B82F6] font-semibold opacity-100 scale-[1.01]' 
                      : 'text-[#9CA3AF]/40 opacity-40'
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    ) : isCurrent ? (
                      <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    )}
                  </div>
                  <span className="font-mono">{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom System Information & Trust Footer */}
      <footer className="max-w-4xl mx-auto w-full z-10 space-y-4">
        {/* System Info Panel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px] p-3 rounded-2xl bg-[#111827]/60 border border-white/5 text-[#9CA3AF]">
          <div>
            <span className="text-[10px] text-slate-500 block">Platform</span>
            <strong className="text-[#F9FAFB]">SolveX OS</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Version</span>
            <strong className="text-[#F9FAFB]">v1.0</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Status</span>
            <strong className="text-[#22C55E]">Secure</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Environment</span>
            <strong className="text-[#F9FAFB]">Production</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Security</span>
            <strong className="text-[#F9FAFB]">SOC-2 Ready</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Connection</span>
            <strong className="text-[#F9FAFB]">TLS 1.3</strong>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-2">
          <span>© 2026 SolveX AI Inc. All rights reserved.</span>
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <Lock className="w-3 h-3 text-[#3B82F6]" /> Enterprise Grade System
          </span>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseSplash;
