import React from 'react';
import { 
  Brain, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Network, 
  Layers, 
  ShieldCheck, 
  Activity, 
  TrendingUp,
  Zap,
  Globe
} from 'lucide-react';

export const LandingPage = ({ onLaunchApp }) => {
  return (
    <div className="min-h-screen bg-[#060812] text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Marketing Navigation */}
      <nav className="h-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white">SolveX <span className="text-blue-400 font-mono text-sm">AI</span></span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#security" className="hover:text-white transition-colors">Enterprise Security</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <button
          onClick={onLaunchApp}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
        >
          <span>Launch Enterprise OS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 max-w-6xl mx-auto text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full filter blur-3xl -z-10 animate-pulse" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-6">
          <Sparkles className="w-4 h-4 text-blue-400" />
          The Enterprise Intelligence Operating System
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          One Brain. Every Department. <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 -webkit-background-clip-text text-transparent">
            Smarter Enterprise Decisions.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
          SolveX AI continuously ingests data across Sales, Inventory, Finance, Production, HR, and Supply Chain. Instead of passive dashboards, 10 specialized AI Agents debate and predict risks before losses occur.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={onLaunchApp}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Open Command Center</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Multi-Agent Collaboration</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Specialized agents debate complex supply bottlenecks, evaluate cash buffers, and formulate consensus decisions in real time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Enterprise Knowledge Graph</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Interactive 50+ node graph connecting suppliers, warehouses, machines, workforce, and active client orders with live impact tracing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Digital Twin Simulator</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Simulate "What happens if production surges +30%?" before committing capital. Calculate revenue, margins, and stress math instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Footer */}
      <footer className="border-t border-slate-800/80 py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 SolveX AI Technologies Inc. All rights reserved.</div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> SOC-2 Type II Certified</span>
          <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-blue-400" /> Azure Sovereign Cloud</span>
        </div>
      </footer>
    </div>
  );
};
