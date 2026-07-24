import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  FastForward, 
  Lock, 
  Activity, 
  BarChart2
} from 'lucide-react';
import { StockSphereLogo } from '../common/StockSphereLogo';

// Live Stock Market Ticker items
const MARKET_TICKERS = [
  { symbol: 'STOCKSPHERE OS', price: '₹428.5 Cr', change: '+18.4%', isUp: true },
  { symbol: 'NIFTY 50', price: '24,850.20', change: '+1.42%', isUp: true },
  { symbol: 'NASDAQ', price: '18,420.50', change: '+2.18%', isUp: true },
  { symbol: 'S&P 500', price: '5,620.10', change: '+0.95%', isUp: true },
  { symbol: 'TECHCORP SLA', price: '99.98%', change: '+0.4%', isUp: true },
  { symbol: 'OEE INDEX', price: '94.6%', change: '+4.2%', isUp: true },
  { symbol: 'AI CONFIDENCE', price: '96.8%', change: '+3.1%', isUp: true }
];

const INITIALIZATION_STEPS = [
  'Initializing StockSphere Operating System',
  'Connecting Real-Time Financial Market Feeds',
  'Loading 10 Domain-Specialized AI Agents',
  'Building Knowledge Graph Topology',
  'Synchronizing Enterprise Department Metrics',
  'Preparing Digital Twin Scenario Engine',
  'StockSphere Intelligence Ready'
];

export const OpeningStockSplash = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [candles, setCandles] = useState([
    { open: 120, close: 140, isUp: true },
    { open: 140, close: 155, isUp: true },
    { open: 155, close: 150, isUp: false },
    { open: 150, close: 175, isUp: true },
    { open: 175, close: 190, isUp: true },
    { open: 190, close: 205, isUp: true },
    { open: 205, close: 230, isUp: true }
  ]);

  // Automated loading progress & steps timer
  useEffect(() => {
    const stepDuration = 380;
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

  // Auto transition to login when loading finishes
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
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 350);
  };

  // Pulsing dynamic chart updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCandles(prev => {
        const last = prev[prev.length - 1];
        const nextOpen = last.close;
        const delta = (Math.random() - 0.3) * 12;
        const nextClose = Math.max(100, Math.round(nextOpen + delta));
        const newCandle = { open: nextOpen, close: nextClose, isUp: nextClose >= nextOpen };
        return [...prev.slice(1), newCandle];
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0A0A0A] text-[#FAFAFA] flex flex-col justify-between font-sans overflow-hidden select-none transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ─── Top Live Stock Marquee Ribbon ─── */}
      <div className="w-full bg-[#1A1A1A] border-b border-[#2E2E2E] py-2 px-4 shrink-0 overflow-hidden z-20">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap text-xs font-mono">
          {MARKET_TICKERS.concat(MARKET_TICKERS).map((ticker, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="font-bold text-[#FAFAFA]">{ticker.symbol}</span>
              <span className="text-[#A3A3A3]">{ticker.price}</span>
              <span className={`px-1.5 py-0.2 rounded font-semibold text-[11px] ${ticker.isUp ? 'bg-[#059669]/20 text-[#10B981]' : 'bg-red-500/20 text-red-400'}`}>
                {ticker.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Top Navigation Header ─── */}
      <header className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center shadow-lg">
            <StockSphereLogo className="w-6 h-6" color="#059669" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#FAFAFA]">
            StockSphere <span className="text-[#10B981] font-mono text-sm">AI</span>
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer bg-[#1A1A1A] border border-[#2E2E2E] text-[#A3A3A3] hover:text-[#FAFAFA] hover:border-[#059669]"
          title="Skip loading and go to login"
        >
          <span>Skip Loading</span>
          <FastForward className="w-3.5 h-3.5 text-[#059669]" />
        </button>
      </header>

      {/* ─── Center Stock Title & System Loading Panel ─── */}
      <main className="max-w-lg mx-auto w-full px-6 z-20 my-auto">
        <div className="space-y-6 text-center">
          
          {/* Animated Big STOCKSPHERE Title */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-bold text-[#10B981]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Stock & Enterprise Operating System</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-[#FAFAFA] uppercase leading-none drop-shadow-2xl">
              STOCK<span className="text-[#059669]">SPHERE</span>
            </h1>
          </div>

          {/* Loading Box Panel */}
          <div className="rounded-3xl p-6 sm:p-7 space-y-5 bg-[#1A1A1A]/90 border border-[#2E2E2E] shadow-2xl backdrop-blur-xl text-left">
            
            {/* Header + Progress Percentage */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2E2E]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FAFAFA]">
                <Sparkles className="w-4 h-4 text-[#059669]" />
                <span>System Initialization</span>
              </div>
              <span className="text-sm font-mono font-bold text-[#10B981]">
                {progress}%
              </span>
            </div>

            {/* Glowing Stock Gradient Progress Bar */}
            <div className="w-full h-2.5 rounded-full overflow-hidden bg-[#0A0A0A] border border-[#2E2E2E]">
              <div
                className="h-full rounded-full transition-all duration-100 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #059669, #10B981, #84CC16)'
                }}
              />
            </div>

            {/* Sequential Steps Checkmarks */}
            <div className="space-y-2 pt-1 max-h-48 overflow-y-auto pr-1">
              {INITIALIZATION_STEPS.map((step, idx) => {
                const isDone = idx < currentStepIndex || progress === 100;
                const isCurrent = idx === currentStepIndex && progress < 100;

                let textColor = 'rgba(163,163,163,0.35)';
                if (isDone) textColor = '#FAFAFA';
                if (isCurrent) textColor = '#10B981';

                return (
                  <div
                    key={step}
                    className="flex items-center gap-3 text-xs transition-all duration-200"
                    style={{ color: textColor }}
                  >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                      ) : isCurrent ? (
                        <div className="w-2 h-2 rounded-full animate-ping bg-[#10B981]" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      )}
                    </div>
                    <span className="font-mono text-[11px] truncate">{step}</span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Mini Candlestick Telemetry Strip */}
          <div className="p-3 rounded-2xl bg-[#1A1A1A]/60 border border-[#2E2E2E] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#059669]" />
              <span className="text-[11px] text-[#A3A3A3]">LIVE MARKET FEED:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {candles.map((c, i) => (
                <div key={i} className={`w-2 rounded-sm h-5 ${c.isUp ? 'bg-[#059669]' : 'bg-red-950 border border-red-500'}`} />
              ))}
            </div>
            <strong className="text-[#10B981] font-bold text-xs">₹428.5 Cr (+18.4%)</strong>
          </div>

        </div>
      </main>

      {/* ─── Bottom Footer ─── */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-3 border-t border-[#2E2E2E] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#A3A3A3] shrink-0 z-20">
        <span>© 2026 StockSphere AI Inc. Enterprise Stock Intelligence OS.</span>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-[#059669]" /> SOC-2 Ready</span>
          <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-[#84CC16]" /> Real-time Telemetry</span>
        </div>
      </footer>

    </div>
  );
};

export default OpeningStockSplash;
