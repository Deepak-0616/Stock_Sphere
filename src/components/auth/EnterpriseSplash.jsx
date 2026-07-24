import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Server, 
  Database, 
  Cpu, 
  FastForward,
  Activity
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
    // Total duration ~2.8 seconds
    const totalSteps = INITIALIZATION_STEPS.length;
    const stepDuration = 280; // ms per step
    const progressIntervalMs = 28;

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
        }, 500); // 500ms fade duration
        return () => clearTimeout(completeTimeout);
      }, 400);
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
    }, 400);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#0B1220] text-[#F9FAFB] flex flex-col justify-between p-6 md:p-12 font-sans transition-opacity duration-500 ease-in-out select-none ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Top Area: Logo, Product Name, Tagline */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#111827] border border-white/10 flex items-center justify-center shadow-lg shadow-black/40">
            <Brain className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-2xl tracking-tight text-[#F9FAFB]">SolveX AI</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/40 text-[#3B82F6] font-mono font-bold tracking-wider uppercase">
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
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#111827] border border-white/10 hover:border-white/20 text-xs font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition-all cursor-pointer shadow-sm"
          title="Skip initialization screen"
        >
          <span>Skip to Login</span>
          <FastForward className="w-3.5 h-3.5 text-[#3B82F6]" />
        </button>
      </header>

      {/* Center Area: Loading Status Card */}
      <main className="max-w-xl mx-auto w-full z-10 my-auto">
        <div className="bg-[#111827]/82 border border-white/10 rounded-3xl p-7 md:p-9 shadow-2xl shadow-black/80 backdrop-blur-xl space-y-6">
          
          {/* Header Status & Percentage */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F9FAFB]">
              <Activity className="w-4 h-4 text-[#3B82F6]" />
              <span>Initializing Platform Engine</span>
            </div>
            <span className="text-sm font-mono font-bold text-[#3B82F6]">
              {progress}%
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-1.5">
            <div className="w-full h-3 bg-[#0B1220] rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-[#3B82F6] rounded-full transition-all duration-150 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Sequential Steps List */}
          <div className="space-y-2.5 pt-2 max-h-60 overflow-y-auto pr-1">
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
                      ? 'text-[#3B82F6] font-semibold opacity-100' 
                      : 'text-[#9CA3AF]/30 opacity-30'
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    ) : isCurrent ? (
                      <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    )}
                  </div>
                  <span className="font-mono tracking-wide">{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Area: System Information Panel & Trust Footer */}
      <footer className="max-w-5xl mx-auto w-full z-10 space-y-4">
        {/* System Information Panel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs p-4 rounded-2xl bg-[#111827]/60 border border-white/5 text-[#9CA3AF]">
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Platform</span>
            <strong className="text-[#F9FAFB] font-semibold">SolveX AI OS</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Version</span>
            <strong className="text-[#F9FAFB] font-mono font-semibold">v1.0</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Status</span>
            <strong className="text-[#22C55E] font-semibold">Secure</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Environment</span>
            <strong className="text-[#F9FAFB] font-semibold">Production</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Security</span>
            <strong className="text-[#F9FAFB] font-semibold">Enterprise Grade</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Connection</span>
            <strong className="text-[#F9FAFB] font-semibold">Encrypted</strong>
          </div>
        </div>

        {/* Security Badge & Copyright */}
        <div className="flex items-center justify-between text-xs text-[#9CA3AF] pt-1">
          <span>© 2026 SolveX AI Inc. All rights reserved.</span>
          <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" /> SOC 2 Type II Certified
          </span>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseSplash;
