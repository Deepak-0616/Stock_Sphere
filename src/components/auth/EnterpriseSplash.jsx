import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Sparkles,
  FastForward
} from 'lucide-react';
import { StockSphereLogo } from '../common/StockSphereLogo';

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
    const stepDuration = 280;
    const progressIntervalMs = 28;
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

  useEffect(() => {
    if (progress >= 100 && currentStepIndex === INITIALIZATION_STEPS.length - 1) {
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        const completeTimeout = setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
        return () => clearTimeout(completeTimeout);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, currentStepIndex, onComplete]);

  const handleSkip = () => {
    try {
      localStorage.setItem('stocksphere_skip_splash', 'true');
    } catch {
      // Ignore storage errors
    }
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 350);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-8 lg:p-12 font-sans select-none transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#0A0A0A', color: '#FAFAFA' }}
    >

      {/* ─── Top Header ─── */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: '#1A1A1A', border: '1px solid #2E2E2E' }}>
            <StockSphereLogo className="w-7 h-7" color="#059669" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight" style={{ color: '#FAFAFA' }}>
                StockSphere AI
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: 'rgba(5, 150, 105, 0.15)',
                  border: '1px solid rgba(5, 150, 105, 0.4)',
                  color: '#10B981'
                }}
              >
                Enterprise OS
              </span>
            </div>
            <p className="text-xs font-medium tracking-wide" style={{ color: '#A3A3A3' }}>
              One Brain. Every Department. Smarter Decisions.
            </p>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: '#1A1A1A',
            border: '1px solid #2E2E2E',
            color: '#A3A3A3'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.color = '#FAFAFA'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2E2E2E'; e.currentTarget.style.color = '#A3A3A3'; }}
          title="Skip initialization and go to login"
        >
          <span>Skip</span>
          <FastForward className="w-3.5 h-3.5" style={{ color: '#059669' }} />
        </button>
      </header>

      {/* ─── Center Initialization Panel ─── */}
      <main className="max-w-lg mx-auto w-full z-10 my-auto">
        <div
          className="rounded-3xl p-7 sm:p-8 space-y-6 backdrop-blur-xl"
          style={{
            backgroundColor: 'rgba(26, 26, 26, 0.85)',
            border: '1px solid #2E2E2E',
            boxShadow: '0 24px 64px rgba(0,0,0,0.8)'
          }}
        >

          {/* Panel Header */}
          <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid #2E2E2E' }}>
            <div className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: '#FAFAFA' }}>
              <Sparkles className="w-4 h-4" style={{ color: '#059669' }} />
              <span>System Initialization</span>
            </div>
            <span className="text-sm font-mono font-bold tabular-nums" style={{ color: '#10B981' }}>
              {progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div
            className="w-full h-2.5 rounded-full overflow-hidden"
            style={{ backgroundColor: '#0A0A0A', border: '1px solid #2E2E2E' }}
          >
            <div
              className="h-full rounded-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #059669, #10B981, #84CC16)'
              }}
            />
          </div>

          {/* Sequential Steps */}
          <div className="space-y-2 pt-1 max-h-60 overflow-y-auto pr-1">
            {INITIALIZATION_STEPS.map((step, idx) => {
              const isDone = idx < currentStepIndex || progress === 100;
              const isCurrent = idx === currentStepIndex && progress < 100;

              let textColor = 'rgba(163,163,163,0.35)';
              let fontWeight = '400';
              if (isDone) { textColor = '#FAFAFA'; fontWeight = '500'; }
              if (isCurrent) { textColor = '#10B981'; fontWeight = '600'; }

              return (
                <div
                  key={step}
                  className="flex items-center gap-3 text-xs transition-all duration-200"
                  style={{ color: textColor, fontWeight }}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4" style={{ color: '#059669' }} />
                    ) : isCurrent ? (
                      <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#10B981' }} />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
                    )}
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ─── Bottom System Info & Footer ─── */}
      <footer className="max-w-4xl mx-auto w-full z-10 space-y-3">
        {/* System Information Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px] p-3.5 rounded-2xl"
          style={{
            backgroundColor: 'rgba(26, 26, 26, 0.6)',
            border: '1px solid #2E2E2E',
            color: '#A3A3A3'
          }}
        >
          {[
            { label: 'Platform', value: 'StockSphere AI', color: '#FAFAFA' },
            { label: 'Version', value: 'v1.0', color: '#FAFAFA' },
            { label: 'Status', value: 'Secure', color: '#059669' },
            { label: 'Environment', value: 'Production', color: '#FAFAFA' },
            { label: 'Security', value: 'SOC-2 Ready', color: '#FAFAFA' },
            { label: 'Connection', value: 'TLS 1.3', color: '#FAFAFA' }
          ].map((item) => (
            <div key={item.label}>
              <span className="block" style={{ color: 'rgba(163,163,163,0.6)', fontSize: '10px' }}>{item.label}</span>
              <strong style={{ color: item.color }}>{item.value}</strong>
            </div>
          ))}
        </div>

        {/* Copyright Line */}
        <div className="flex items-center justify-between text-[11px] pt-1" style={{ color: '#A3A3A3' }}>
          <span>© 2026 StockSphere AI Inc. All rights reserved.</span>
          <span className="flex items-center gap-1.5" style={{ color: 'rgba(163,163,163,0.5)', fontSize: '10px' }}>
            <Lock className="w-3 h-3" style={{ color: '#059669' }} />
            Enterprise Grade System
          </span>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseSplash;
