import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Bot, 
  Cpu, 
  CheckSquare, 
  Brain, 
  Zap, 
  Activity 
} from 'lucide-react';

export const OnboardingBanner = ({ setActiveTab }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDismissed(false)}
          className="text-xs text-[#10B981] hover:underline flex items-center gap-1 font-medium cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Show Quick Guide
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] shadow-xl mb-6 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-[#A3A3A3] hover:text-[#FAFAFA] p-1 rounded-lg hover:bg-[#0A0A0A] transition-colors cursor-pointer"
        title="Dismiss guide"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#059669]/20 text-[#10B981] border border-[#059669]/40 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Welcome to StockSphere • Quick Start Guide
          </div>
          <h2 className="text-lg font-bold text-[#FAFAFA] tracking-tight">
            How StockSphere Autonomous Intelligence Works
          </h2>
          <p className="text-xs text-[#A3A3A3] leading-relaxed">
            StockSphere acts as your enterprise's central nervous system. Select any action below or ask questions in plain English via the AI Chatbot.
          </p>
        </div>

        {/* Action Quick Links */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('copilot')}
            className="px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI Chatbot</span>
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className="px-3.5 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#2E2E2E] text-[#FAFAFA] font-bold text-xs border border-[#2E2E2E] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-[#059669]" />
            <span>Inspect 10 AI Agents</span>
          </button>

          <button
            onClick={() => setActiveTab('automation')}
            className="px-3.5 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#2E2E2E] text-[#FAFAFA] font-bold text-xs border border-[#2E2E2E] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckSquare className="w-4 h-4 text-[#84CC16]" />
            <span>View Approvals</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBanner;
