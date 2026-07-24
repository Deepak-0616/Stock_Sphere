import React, { useState } from 'react';
import { AI_AGENTS } from '../../data/mockEnterpriseData';
import { 
  Cpu, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  MessageSquareText, 
  ArrowRight
} from 'lucide-react';

export const MultiAgentHub = ({ setActiveTab }) => {
  const [agents] = useState(AI_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState(AI_AGENTS[0]);

  const debateLog = [
    {
      agent: 'Inventory Agent',
      avatar: '📦',
      time: '10:14:02 AM',
      message: '🚨 CRITICAL: Microchip X402 stock at Warehouse West-3 will hit ZERO in 48 hours. Supplier Alpha delivery is delayed by 5 days.',
      status: 'Warning Raised'
    },
    {
      agent: 'Logistics Agent',
      avatar: '🚚',
      time: '10:14:05 AM',
      message: '⚡ SOLUTION: Scanned secondary suppliers. Supplier Beta has 1,500 units available in Bengaluru. Express air-freight can deliver in 22 hours.',
      status: 'Option Proposed'
    },
    {
      agent: 'Finance Agent',
      avatar: '💰',
      time: '10:14:08 AM',
      message: '💵 MARGIN AUDIT: Express air-freight adds ₹45,000 in shipping. However, delaying production costs ₹8,50,000 in TechCorp contract SLA penalties. Net ROI of air-freight: +₹8,05,000.',
      status: 'Financial ROI Verified'
    },
    {
      agent: 'Executive Agent',
      avatar: '👔',
      time: '10:14:12 AM',
      message: '✅ CONSENSUS REACHED: All 3 agents agree (Confidence 94%). Recommendation generated for 1-Click Executive Approval.',
      status: 'Consensus Approved'
    }
  ];

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
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <Cpu className="w-3.5 h-3.5" /> StockSphere Core Innovation Engine
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Multi-Agent Collaboration Mesh</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Agents do NOT work in isolation. They debate, cross-verify data across departments, and formulate unified decisions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Active Agents</div>
            <div className="text-base font-extrabold text-[#10B981]">10 / 10</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Consensus Accuracy</div>
            <div className="text-base font-extrabold text-[#84CC16]">96.4%</div>
          </div>
        </div>
      </div>

      {/* Main Area: 10 Agent Roster + Live Agent Debate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 10 Specialized Agent Profiles */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center justify-between">
            <span>Specialized Enterprise Agents</span>
            <span className="text-xs text-[#A3A3A3] font-normal">Click to Inspect</span>
          </h3>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedAgent?.id === agent.id 
                    ? 'bg-[#059669]/15 border-[#059669]/50 shadow-lg shadow-emerald-950/40'
                    : 'bg-[#1A1A1A] border-[#2E2E2E] hover:border-[#059669]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl group-hover:scale-110 transition-transform">{agent.avatar}</span>
                    <div>
                      <div className="font-bold text-xs text-[#FAFAFA]">{agent.name}</div>
                      <div className="text-[10px] text-[#A3A3A3]">{agent.department}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    agent.healthScore > 90 ? 'bg-[#059669]/20 text-[#10B981]' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {agent.healthScore}%
                  </span>
                </div>

                <p className="text-[11px] text-[#A3A3A3] mt-2 line-clamp-2 italic">
                  "{agent.recentThought}"
                </p>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-blue-400 font-semibold">
                  <span>Launch Working Console →</span>
                  <span className="text-slate-500 font-mono">{agent.lastRun || 'Active'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle & Right 2 Cols: Live Multi-Agent Debate Simulation & Selected Agent Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Agent Debate Log */}
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2E2E2E] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center gap-2">
                  <MessageSquareText className="w-4 h-4 text-[#059669]" />
                  Live Multi-Agent Debate Protocol
                </h3>
                <p className="text-xs text-[#A3A3A3]">Case #849: Microchip X402 Supply Chain Friction Resolution</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#059669]/20 text-[#10B981] font-mono font-bold border border-[#059669]/40">
                Consensus Reached
              </span>
            </div>

            <div className="space-y-3">
              {debateLog.map((log, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{log.avatar}</span>
                      <span className="font-bold text-[#FAFAFA]">{log.agent}</span>
                      <span className="text-[10px] text-[#A3A3A3]/60 font-mono">{log.time}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#84CC16] bg-[#84CC16]/10 px-2 py-0.5 rounded border border-[#84CC16]/30">
                      {log.status}
                    </span>
                  </div>
                  <p className="text-[#A3A3A3] leading-relaxed pl-7">{log.message}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#A3A3A3]">Debate completed in <strong className="text-[#FAFAFA]">10 seconds</strong> (94% AI Confidence)</span>
              <button
                onClick={() => setActiveTab('automation')}
                className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Execute Consensus Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Inspector Panel for Selected Agent */}
          {selectedAgent && (
            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedAgent.avatar}</span>
                  <div>
                    <h3 className="font-bold text-sm text-[#FAFAFA]">{selectedAgent.name}</h3>
                    <p className="text-xs text-[#A3A3A3]">{selectedAgent.role}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#059669]/20 text-[#10B981] font-mono font-bold border border-[#059669]/40">
                  {selectedAgent.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-xs space-y-1">
                <span className="text-[10px] text-[#A3A3A3] uppercase font-bold">Latest Autonomous Reasoning:</span>
                <p className="text-[#FAFAFA] font-medium leading-relaxed">{selectedAgent.recentThought}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiAgentHub;
