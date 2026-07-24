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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Marketing Navigation */}
      <nav className="h-20 border-b border-black/10 bg-white sticky top-0 z-50 px-6 max-w-7xl mx-auto flex items-center justify-between shadow-sm shadow-black/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shadow-sm shadow-black/5 border border-black/10">
            <Brain className="w-6 h-6 text-red-700" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">SolveX <span className="text-red-700 font-mono text-sm">AI</span></span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-500">
          <a href="#features" className="hover:text-red-700 transition-colors">Features</a>
          <a href="#architecture" className="hover:text-red-700 transition-colors">Architecture</a>
          <a href="#security" className="hover:text-red-700 transition-colors">Enterprise Security</a>
          <a href="#pricing" className="hover:text-red-700 transition-colors">Pricing</a>
        </div>

        <button
          onClick={onLaunchApp}
          className="px-5 py-2.5 rounded-xl bg-red-700 text-white hover:bg-red-800 font-bold text-xs shadow-lg shadow-black/10 transition-all flex items-center gap-2 border border-black/10"
        >
          <span>Launch Enterprise OS</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 max-w-6xl mx-auto text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-red-100 via-white/60 to-white rounded-full filter blur-3xl -z-10 animate-pulse" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-black/10 text-xs font-semibold text-red-700 mb-6">
          <Sparkles className="w-4 h-4 text-white" />
          The Enterprise Intelligence Operating System
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          One Brain. Every Department. <br />
          <span className="text-red-700">Smarter Enterprise Decisions.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
          SolveX AI continuously ingests data across Sales, Inventory, Finance, Production, HR, and Supply Chain. Instead of passive dashboards, 10 specialized AI Agents debate and predict risks before losses occur.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={onLaunchApp}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-700 text-white font-extrabold text-sm shadow-2xl shadow-black/10 transition-all flex items-center justify-center gap-2 group border border-black/10 hover:bg-red-800"
          >
            <span>Open Command Center</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 text-left">
          <div className="p-6 rounded-2xl bg-slate-50 border border-black/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-red-700 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Multi-Agent Collaboration</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Specialized agents debate complex supply bottlenecks, evaluate cash buffers, and formulate consensus decisions in real time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-black/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-red-700 mb-4">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Enterprise Knowledge Graph</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Interactive 50+ node graph connecting suppliers, warehouses, machines, workforce, and active client orders with live impact tracing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-black/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-red-700 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Digital Twin Simulator</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Simulate "What happens if production surges +30%?" before committing capital. Calculate revenue, margins, and stress math instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Footer */}
      <footer className="border-t border-black/10 py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 SolveX AI Technologies Inc. All rights reserved.</div>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-red-700" /> SOC-2 Type II Certified</span>
          <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-red-700" /> Azure Sovereign Cloud</span>
        </div>
      </footer>
    </div>
  );
};
