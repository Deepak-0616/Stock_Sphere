import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Activity, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  HelpCircle,
  Zap,
  TrendingUp,
  Brain
} from 'lucide-react';

export const OnboardingBanner = ({ setActiveTab }) => {
  const [dismissed, setDismissed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  if (dismissed) {
    return (
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Need help navigating SolveX? Re-open the quick tour anytime.</span>
        </div>
        <button
          onClick={() => setDismissed(false)}
          className="text-xs font-semibold text-blue-400 hover:underline"
        >
          Show Quick Guide
        </button>
      </div>
    );
  }

  const steps = [
    {
      icon: Activity,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      title: '1. Real-time Telemetry & Health',
      description: 'SolveX connects to your company data (inventory, sales, finance) and displays a live 0-100 Enterprise Health Score.'
    },
    {
      icon: Brain,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: '2. 10 Specialized AI Agents',
      description: 'Agents debate risks in real-time (e.g., Inventory Agent alerts Production Agent about stock shortages).'
    },
    {
      icon: Zap,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: '3. One-Click AI Automations',
      description: 'Instead of complex manual workflows, approve high-confidence AI recommendations with a single click to save cost and prevent delays.'
    }
  ];

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30 shadow-xl mb-6 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        title="Dismiss guide"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Welcome to SolveX • Quick Start Guide
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            How SolveX Autonomous Intelligence Works
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            SolveX acts as your enterprise's central nervous system. Select any action below or ask questions in plain English via the AI Copilot.
          </p>
        </div>

        {/* Action Quick Links */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('copilot')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI Copilot</span>
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Brain className="w-4 h-4 text-purple-400" />
            <span>Meet 10 AI Agents</span>
          </button>

          <button
            onClick={() => setActiveTab('automation')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>View Approvals</span>
          </button>
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800/80">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg border ${step.color}`}>
                  <StepIcon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-white">{step.title}</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
