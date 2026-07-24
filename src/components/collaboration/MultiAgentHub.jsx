import React, { useState } from 'react';
import { AgentEngine } from '../../services/agentEngine';
import { AgentInteractiveWorkspace } from './AgentInteractiveWorkspace';
import { 
  Cpu, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Clock,
  ArrowRight,
  Brain,
  RefreshCw,
  Sliders,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MultiAgentHub = ({ setActiveTab }) => {
  const [agents, setAgents] = useState(() => AgentEngine.getAgents());
  const [activeDebate, setActiveDebate] = useState(AgentEngine.getActiveDebate());
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [customTopic, setCustomTopic] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleRunDebate = (e) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setIsSimulating(true);
    setTimeout(() => {
      const newDebate = AgentEngine.generateCustomDebate(customTopic);
      setActiveDebate(newDebate);
      setIsSimulating(false);
    }, 1200);
  };

  const handleApproveConsensus = () => {
    setApproved(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // If an individual agent is selected for interactive working mode
  if (selectedAgentId) {
    return (
      <AgentInteractiveWorkspace 
        agentId={selectedAgentId} 
        onBackToDebate={() => {
          setSelectedAgentId(null);
          setAgents(AgentEngine.getAgents());
        }}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400 mb-2">
            <Cpu className="w-3.5 h-3.5" /> SolveX Core Autonomous Execution Engine
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Multi-Agent Engine & Working Consoles</h1>
          <p className="text-xs text-slate-400 mt-1">
            Agents do NOT work in isolation. Click any agent below to launch its working console, or trigger live inter-agent debate.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Working Agents</div>
            <div className="text-base font-extrabold text-emerald-400">10 / 10</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Consensus Precision</div>
            <div className="text-base font-extrabold text-blue-400">96.4%</div>
          </div>
        </div>
      </div>

      {/* Main Area: 10 Agent Roster + Live Agent Debate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 10 Specialized Agent Profiles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">
              Select Agent Working Console
            </h3>
            <span className="text-[10px] text-blue-400 font-mono font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              10 Fully Interactive
            </span>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className="p-3 rounded-xl border transition-all cursor-pointer bg-slate-900/70 border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl group-hover:scale-110 transition-transform">{agent.avatar}</span>
                    <div>
                      <div className="font-bold text-xs text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <span>{agent.name}</span>
                        <Play className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[10px] text-slate-400">{agent.department}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    agent.healthScore > 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {agent.healthScore}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 italic">
                  "{agent.recentInsight}"
                </p>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-blue-400 font-semibold">
                  <span>Launch Working Console →</span>
                  <span className="text-slate-500 font-mono">{agent.lastRun || 'Active'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center & Right 2 Cols: Live Inter-Agent Debate & Consensus Engine */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom Debate Trigger */}
          <form onSubmit={handleRunDebate} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Ask Multi-Agent Engine to debate a scenario (e.g. 'What if Supplier A delays shipment by 7 days?')..."
              className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isSimulating}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Agents Reasoning...' : 'Trigger Agent Debate'}</span>
            </button>
          </form>

          {/* Active Debate Transcript */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-purple-400">Live Inter-Agent Dialogue Stream</span>
                <h3 className="font-extrabold text-base text-white">{activeDebate.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeDebate.triggerReason}</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30">
                {activeDebate.messages.length} Agent Dialogue Turns
              </span>
            </div>

            {/* Messages Feed */}
            <div className="space-y-3 max-h-96 overflow-y-auto p-1">
              {activeDebate.messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedAgentId(msg.agentId)}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1 hover:border-blue-500/40 transition-colors cursor-pointer group"
                  title="Click to launch this specific agent's working console"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{msg.avatar}</span>
                      <span className="font-bold text-xs text-white group-hover:text-blue-400 transition-colors">{msg.agentName}</span>
                      <span className="text-[9px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">Open Console →</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans pl-7">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Final Consensus Engine Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400">Consensus Decision Engine</span>
                    <h4 className="font-bold text-sm text-white">{activeDebate.consensus.decision}</h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Confidence Score</span>
                  <span className="text-base font-extrabold text-emerald-400">{activeDebate.consensus.confidenceScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Estimated Cost</span>
                  <span className="font-bold text-slate-200">{activeDebate.consensus.estimatedCost}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Expected Savings</span>
                  <span className="font-bold text-emerald-400">{activeDebate.consensus.expectedSavings}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Execution Time</span>
                  <span className="font-bold text-blue-400">{activeDebate.consensus.executionTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Risk Profile</span>
                  <span className="font-bold text-emerald-400">{activeDebate.consensus.riskLevel}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleApproveConsensus}
                  disabled={approved}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                    approved 
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{approved ? 'Consensus Approved & Executed!' : 'Approve AI Consensus Decision'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('simulator')}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  Simulate in Digital Twin <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
