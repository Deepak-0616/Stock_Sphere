import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Network, 
  Layers
} from 'lucide-react';
import { StockSphereLogo } from '../common/StockSphereLogo';

export const LandingPage = ({ onLaunchApp }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] font-sans selection:bg-[#059669] selection:text-white">
      {/* Top Marketing Navigation */}
      <nav className="h-20 border-b border-[#2E2E2E] bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-50 px-6 max-w-7xl mx-auto flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center border border-[#2E2E2E]">
            <StockSphereLogo className="w-6 h-6" color="#059669" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-[#FAFAFA]">StockSphere <span className="text-[#10B981] font-mono text-sm">AI</span></span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#A3A3A3]">
          <a href="#features" className="hover:text-[#FAFAFA] transition-colors">Features</a>
          <a href="#architecture" className="hover:text-[#FAFAFA] transition-colors">Architecture</a>
          <a href="#security" className="hover:text-[#FAFAFA] transition-colors">Enterprise Security</a>
          <a href="#pricing" className="hover:text-[#FAFAFA] transition-colors">Pricing</a>
        </div>

        <button
          onClick={onLaunchApp}
          className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 border border-[#059669]/40 cursor-pointer"
        >
          <span>Launch Enterprise OS</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 max-w-6xl mx-auto text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#059669]/10 rounded-full filter blur-3xl -z-10 animate-pulse" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-bold text-[#10B981] mb-6">
          <Sparkles className="w-4 h-4" /> Next-Gen Enterprise Intelligence OS
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAFAFA] max-w-4xl mx-auto leading-tight">
          One Network Sphere.<br />
          <span className="text-[#059669]">Smarter Enterprise Decisions.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#A3A3A3] max-w-2xl mx-auto mt-6 leading-relaxed">
          10 domain-specialized AI agents collaborate, debate, and simulate enterprise decisions in real-time — saving millions in operational scrap and supply delays.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={onLaunchApp}
            className="px-8 py-4 rounded-2xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <span>Open Executive Workspace</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2E2E2E]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#10B981]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#FAFAFA]">Multi-Agent Mesh</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">10 autonomous specialized agents cross-verify inventory, finance, logistics, and production metrics.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#10B981]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#FAFAFA]">Digital Twin Simulator</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">Simulate what-if decisions before committing capital or changing live factory shifts.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#10B981]">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#FAFAFA]">Enterprise Knowledge Graph</h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">50+ Neo4j ontology nodes tracing causality from machine friction to net profit margins.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#2E2E2E] text-center text-xs text-[#A3A3A3]">
        <p>© 2026 StockSphere AI Inc. Enterprise Grade Operating System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
