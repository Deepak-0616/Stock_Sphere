import React, { useState, useEffect } from 'react';
import { StockSphereLogo } from '../common/StockSphereLogo';

// Random offsets for each letter of S-T-O-C-K-S-P-H-E-R-E
const INITIAL_LETTER_OFFSETS = [
  { char: 'S', dx: -450, dy: -320, rot: -210, color: '#FAFAFA' },
  { char: 'T', dx: 380, dy: -400, rot: 180, color: '#FAFAFA' },
  { char: 'O', dx: -520, dy: 220, rot: -240, color: '#FAFAFA' },
  { char: 'C', dx: 440, dy: 350, rot: 210, color: '#FAFAFA' },
  { char: 'K', dx: -310, dy: -420, rot: -160, color: '#FAFAFA' },
  { char: 'S', dx: 410, dy: -260, rot: 230, color: '#059669' },
  { char: 'P', dx: -380, dy: 380, rot: -190, color: '#059669' },
  { char: 'H', dx: 490, dy: -210, rot: 170, color: '#059669' },
  { char: 'E', dx: -260, dy: 450, rot: -220, color: '#059669' },
  { char: 'R', dx: 340, dy: 410, rot: 260, color: '#059669' },
  { char: 'E', dx: 550, dy: 180, rot: -140, color: '#059669' }
];

export const LandingPage = ({ onLaunchApp }) => {
  const [isAssembled, setIsAssembled] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Start letter assembly animation 100ms after mount
    const assemblyTimer = setTimeout(() => {
      setIsAssembled(true);
    }, 100);

    // 2. As soon as letters assemble into STOCKSPHERE (1.3s), initiate smooth fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1300);

    // 3. Immediately redirect to Admin Login page (1.6s total) without wasting time!
    const redirectTimer = setTimeout(() => {
      if (onLaunchApp) onLaunchApp();
    }, 1600);

    return () => {
      clearTimeout(assemblyTimer);
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [onLaunchApp]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#0A0A0A] text-[#FAFAFA] flex flex-col items-center justify-between p-8 sm:p-12 select-none overflow-hidden transition-opacity duration-300 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      
      {/* ─── Minimal Top Branding Badge ─── */}
      <header className="w-full max-w-7xl flex items-center justify-between opacity-80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center">
            <StockSphereLogo className="w-5 h-5" color="#059669" />
          </div>
          <span className="text-xs font-mono font-bold text-[#A3A3A3] tracking-widest uppercase">
            StockSphere OS
          </span>
        </div>

        <div className="text-[10px] font-mono text-[#059669] px-2.5 py-1 rounded-full bg-[#059669]/10 border border-[#059669]/30">
          ENTERPRISE INTELLIGENCE
        </div>
      </header>

      {/* ─── Center Minimal Animated Title: STOCKSPHERE ─── */}
      <main className="my-auto relative flex flex-col items-center justify-center">
        
        {/* Background Radial Glow */}
        <div 
          className={`w-[450px] h-[450px] rounded-full bg-[#059669]/15 filter blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
            isAssembled ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`}
        />

        {/* Animated Letters Matrix forming STOCKSPHERE */}
        <div className="relative flex items-center justify-center tracking-tighter text-6xl sm:text-8xl lg:text-9xl font-black uppercase drop-shadow-2xl">
          {INITIAL_LETTER_OFFSETS.map((item, idx) => {
            const transformStyle = isAssembled
              ? 'translate(0px, 0px) rotate(0deg) scale(1)'
              : `translate(${item.dx}px, ${item.dy}px) rotate(${item.rot}deg) scale(0.2)`;

            const opacity = isAssembled ? 1 : 0;
            const filter = isAssembled ? 'blur(0px)' : 'blur(16px)';

            return (
              <span
                key={idx}
                className="inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: transformStyle,
                  opacity: opacity,
                  filter: filter,
                  color: item.color,
                  transitionDelay: `${idx * 50}ms`
                }}
              >
                {item.char}
              </span>
            );
          })}
        </div>

        {/* Glowing Accent Line */}
        <div 
          className={`h-1 rounded-full bg-gradient-to-r from-transparent via-[#059669] to-transparent transition-all duration-1000 mt-4 ${
            isAssembled ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* Subtitle */}
        <p 
          className={`text-xs sm:text-sm font-mono tracking-widest text-[#A3A3A3] uppercase mt-6 transition-all duration-700 ${
            isAssembled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Enterprise Intelligence Operating System
        </p>

      </main>

      {/* ─── Bottom Minimal Footer ─── */}
      <footer className="w-full max-w-7xl flex items-center justify-between text-[10px] font-mono text-[#A3A3A3]/60">
        <span>Auto-directing to Executive Platform...</span>
        <span>© 2026 StockSphere AI</span>
      </footer>

    </div>
  );
};

export default LandingPage;
