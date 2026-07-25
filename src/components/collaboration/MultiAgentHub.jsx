import React, { useState } from 'react';
import { AI_AGENTS } from '../../data/mockEnterpriseData';
import { ApiClient } from '../../services/api';
import { 
  Cpu, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  MessageSquareText, 
  ArrowRight,
  Loader2,
  Send,
  Zap,
  ShieldAlert,
  Bot
} from 'lucide-react';

export const MultiAgentHub = ({ setActiveTab }) => {
  const [agents] = useState(AI_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState(AI_AGENTS[0]);

  // Debate State
  const [customTopic, setCustomTopic] = useState('');
  const [isDebating, setIsDebating] = useState(false);
  const [debateData, setDebateData] = useState({
    caseId: 'Case #849: Microchip X402 Supply Chain Friction',
    confidence: '96.4%',
    duration: '6.4 seconds',
    debateSteps: [
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
        message: '💵 MARGIN AUDIT: Express air-freight adds $14,200 in shipping. However, delaying production costs $85,000 in TechCorp contract SLA penalties. Net ROI: +$70,800.',
        status: 'Financial ROI Verified'
      },
      {
        agent: 'Executive Agent',
        avatar: '👔',
        time: '10:14:12 AM',
        message: '✅ CONSENSUS REACHED: All 4 agents agree. Recommendation generated for 1-Click Executive Approval.',
        status: 'Consensus Approved'
      }
    ],
    consensusSummary: 'Multi-agent consensus resolved Microchip X402 supply friction by authorizing air-freight shipment from Supplier Beta.',
    actionItem: {
      title: 'Authorize Microchip X402 Expedited Air Freight',
      dept: 'Procurement & Supply Chain',
      impact: 'Avoids 45% production bottleneck in Plant 2',
      cost: '$14,200',
      risk: 'Medium'
    }
  });

  // Agent Direct Chat State
  const [agentChatInput, setAgentChatInput] = useState('');
  const [agentChatHistory, setAgentChatHistory] = useState({});
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  // Trigger Live Multi-Agent Debate via Groq
  const handleTriggerDebate = async (presetTopic) => {
    const topicToUse = presetTopic || customTopic || 'Microchip X402 procurement bottleneck';
    setIsDebating(true);

    try {
      const res = await ApiClient.runAgentDebate(topicToUse);
      if (res && res.debateSteps) {
        setDebateData(res);
      }
    } catch (err) {
      console.error('Multi-agent debate error:', err);
    } finally {
      setIsDebating(false);
    }
  };

  // Chat directly with selected agent
  const handleSendAgentChat = async (e) => {
    e.preventDefault();
    if (!agentChatInput.trim() || !selectedAgent) return;

    const userQuery = agentChatInput;
    setAgentChatInput('');
    setIsAgentTyping(true);

    const agentId = selectedAgent.id;
    const history = agentChatHistory[agentId] || [];

    const newHistory = [...history, { sender: 'user', text: userQuery }];
    setAgentChatHistory({ ...agentChatHistory, [agentId]: newHistory });

    try {
      const res = await ApiClient.chatWithAgent(
        selectedAgent.id,
        selectedAgent.name,
        selectedAgent.department,
        userQuery
      );

      const agentReply = res?.text || `[${selectedAgent.name}] Telemetry analyzed for query: "${userQuery}". All parameters optimal.`;

      setAgentChatHistory(prev => ({
        ...prev,
        [agentId]: [...(prev[agentId] || []), { sender: 'agent', text: agentReply }]
      }));
    } catch (err) {
      setAgentChatHistory(prev => ({
        ...prev,
        [agentId]: [...(prev[agentId] || []), { sender: 'agent', text: `⚠️ Agent communication timeout: ${err.message}` }]
      }));
    } finally {
      setIsAgentTyping(false);
    }
  };

  const currentAgentMessages = agentChatHistory[selectedAgent?.id] || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981]">
              <Cpu className="w-3.5 h-3.5" /> StockSphere Multi-Agent Neural Mesh
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-xs font-semibold text-[#60A5FA]">
              <Zap className="w-3.5 h-3.5" /> Powered by Groq Llama 3.3 70B
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Multi-Agent Collaboration Mesh</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            10 specialized domain agents debate enterprise crises in real-time, audit financial ROI, and formulate unified consensus.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Active Agents</div>
            <div className="text-base font-extrabold text-[#10B981]">10 / 10</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Consensus Accuracy</div>
            <div className="text-base font-extrabold text-[#84CC16]">{debateData.confidence || '96.4%'}</div>
          </div>
        </div>
      </div>

      {/* Interactive Crisis Topic Selector Bar */}
      <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#FAFAFA] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#059669]" />
            Trigger Live Operational Crisis Debate
          </label>
          <span className="text-[10px] text-[#A3A3A3]">Groq Neural Consensus Protocol</span>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            'Microchip X402 Procurement Bottleneck',
            'CNC Unit #4 Spindle Vibration Risk',
            'NH-48 Monsoon Freight Delay Rerouting',
            'TechCorp Q3 Order Spike (+40% Volume)'
          ].map((preset, idx) => (
            <button
              key={idx}
              disabled={isDebating}
              onClick={() => {
                setCustomTopic(preset);
                handleTriggerDebate(preset);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] hover:bg-[#2E2E2E] text-[#FAFAFA] border border-[#2E2E2E] text-xs font-medium transition-all cursor-pointer disabled:opacity-50"
            >
              ⚡ {preset}
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Or type a custom crisis (e.g. 'Supplier Gamma raw steel delivery failure')..."
            className="flex-1 bg-[#0A0A0A] border border-[#2E2E2E] rounded-xl px-4 py-2.5 text-xs text-[#FAFAFA] placeholder-[#A3A3A3]/60 focus:outline-none focus:border-[#059669]"
          />
          <button
            disabled={isDebating}
            onClick={() => handleTriggerDebate()}
            className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
          >
            {isDebating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Debating...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                <span>Run Groq Debate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Area: 10 Agent Roster + Live Agent Debate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 10 Specialized Agent Profiles */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center justify-between">
            <span>Specialized Enterprise Agents</span>
            <span className="text-xs text-[#A3A3A3] font-normal">Click to Inspect & Chat</span>
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
                    <span className="text-xl">{agent.avatar}</span>
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
                <p className="text-xs text-[#A3A3A3] font-mono mt-0.5">{debateData.caseId}</p>
              </div>
              <div className="flex items-center gap-2">
                {isDebating ? (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold border border-amber-500/40 flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" /> Debating Crisis...
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#059669]/20 text-[#10B981] font-mono font-bold border border-[#059669]/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Consensus Reached
                  </span>
                )}
              </div>
            </div>

            {/* Debate Turns List */}
            <div className="space-y-3 min-h-[220px]">
              {isDebating ? (
                <div className="p-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-[#059669] animate-spin mx-auto" />
                  <p className="text-xs text-[#A3A3A3] animate-pulse">
                    Groq Llama 3.3 70B orchestrating inter-agent reasoning across Inventory, Production, Finance & Logistics...
                  </p>
                </div>
              ) : (
                debateData.debateSteps?.map((log, i) => (
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
                ))
              )}
            </div>

            {/* Execution Trigger Bar */}
            <div className="pt-3 border-t border-[#2E2E2E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs text-[#A3A3A3]">
                Debate completed in <strong className="text-[#FAFAFA]">{debateData.duration || '6.4s'}</strong> ({debateData.confidence || '95%'} AI Confidence)
              </span>
              <button
                onClick={() => setActiveTab('automation')}
                className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Execute Consensus Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Inspector Panel & Direct 1-on-1 Agent Chat */}
          {selectedAgent && (
            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-4">
              <div className="flex items-center justify-between border-b border-[#2E2E2E] pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedAgent.avatar}</span>
                  <div>
                    <h3 className="font-bold text-sm text-[#FAFAFA]">{selectedAgent.name}</h3>
                    <p className="text-xs text-[#A3A3A3]">{selectedAgent.role} • {selectedAgent.department}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#059669]/20 text-[#10B981] font-mono font-bold border border-[#059669]/40">
                  {selectedAgent.status}
                </span>
              </div>

              {/* Agent Thought / Telemetry */}
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-xs space-y-1">
                <span className="text-[10px] text-[#A3A3A3] uppercase font-bold">Autonomous Agent Telemetry:</span>
                <p className="text-[#FAFAFA] font-medium leading-relaxed">{selectedAgent.recentThought}</p>
              </div>

              {/* 1-on-1 Direct Chat Window */}
              <div className="space-y-3 pt-1">
                <label className="text-xs font-bold text-[#FAFAFA] flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#059669]" />
                  Direct 1-on-1 Channel with {selectedAgent.name}
                </label>

                {currentAgentMessages.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E]">
                    {currentAgentMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`text-xs p-2.5 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-[#2E2E2E] text-[#FAFAFA] ml-8'
                            : 'bg-[#059669]/15 border border-[#059669]/30 text-[#A3A3A3] mr-8'
                        }`}
                      >
                        <div className="font-semibold text-[10px] text-[#A3A3A3] mb-1">
                          {msg.sender === 'user' ? 'You' : selectedAgent.name}
                        </div>
                        {msg.text}
                      </div>
                    ))}
                    {isAgentTyping && (
                      <div className="text-xs text-[#10B981] animate-pulse flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> {selectedAgent.name} analyzing telemetry...
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleSendAgentChat} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={agentChatInput}
                    onChange={(e) => setAgentChatInput(e.target.value)}
                    placeholder={`Ask ${selectedAgent.name} anything about ${selectedAgent.department}...`}
                    className="flex-1 bg-[#0A0A0A] border border-[#2E2E2E] rounded-xl px-3.5 py-2 text-xs text-[#FAFAFA] placeholder-[#A3A3A3]/60 focus:outline-none focus:border-[#059669]"
                  />
                  <button
                    type="submit"
                    disabled={isAgentTyping}
                    className="px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiAgentHub;
