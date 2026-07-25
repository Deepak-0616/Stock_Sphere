import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  Sparkles,
  XCircle,
  History,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApiClient } from '../../services/api';

export const AutomationQueue = () => {
  const [approvals, setApprovals] = useState([]);
  const [decisionsLog, setDecisionsLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'history'

  // AI Generator state
  const [proposalTopic, setProposalTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Load approvals from backend DB
  const fetchApprovalsData = async () => {
    try {
      const data = await ApiClient.getApprovals();
      if (data) {
        setApprovals(data.approvals || []);
        setDecisionsLog(data.decisionsLog || []);
      }
    } catch (err) {
      console.error('Error loading approvals data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovalsData();
  }, []);

  // Handle Approve action
  const handleApprove = async (id) => {
    try {
      await ApiClient.updateApproval(id, 'approved');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      fetchApprovalsData();
    } catch (err) {
      console.error('Approve failed:', err);
    }
  };

  // Handle Reject action
  const handleReject = async (id) => {
    try {
      await ApiClient.updateApproval(id, 'rejected');
      fetchApprovalsData();
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  // Generate dynamic AI workflow proposal via Groq
  const handleGenerateProposal = async (presetTopic) => {
    const topicToUse = presetTopic || proposalTopic || 'Preventative equipment maintenance and emergency component procurement';
    setIsGenerating(true);
    try {
      const res = await ApiClient.generateWorkflowProposal(topicToUse);
      if (res && res.item) {
        confetti({
          particleCount: 40,
          spread: 40,
          origin: { y: 0.4 }
        });
        setProposalTopic('');
        fetchApprovalsData();
      }
    } catch (err) {
      console.error('Generate proposal error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const pendingItems = approvals.filter(item => item.status === 'pending');
  const processedItems = approvals.filter(item => item.status !== 'pending');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <CheckSquare className="w-3.5 h-3.5" /> StockSphere Dynamic Automation Engine
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Automation Engine & Approval Queue</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Real-time backend approval queue synced across multi-agent mesh, telemetry sensors, and Groq AI orchestrators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Pending Approval</div>
            <div className="text-base font-extrabold text-amber-400">
              {pendingItems.length} Requests
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Executed Decision Log</div>
            <div className="text-base font-extrabold text-[#10B981]">
              {decisionsLog.length + processedItems.length} Actions
            </div>
          </div>
        </div>
      </div>

      {/* Groq AI Dynamic Workflow Generator Bar */}
      <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#FAFAFA] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#059669]" />
            Generate Dynamic AI Enterprise Proposal (Groq Llama 3.3 70B)
          </label>
          <span className="text-[10px] text-[#A3A3A3]">Live Database Persistence</span>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            'Air Freight Expedite for Microchip X402',
            'Preventative Maintenance Window for CNC Unit #4',
            'NH-48 Monsoon Monsoon Corridor Rerouting',
            'Supplier SLA Liquidation Rebate Claim'
          ].map((preset, idx) => (
            <button
              key={idx}
              disabled={isGenerating}
              onClick={() => {
                setProposalTopic(preset);
                handleGenerateProposal(preset);
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
            value={proposalTopic}
            onChange={(e) => setProposalTopic(e.target.value)}
            placeholder="Type custom scenario (e.g. 'Emergency backup generator fuel allocation')..."
            className="flex-1 bg-[#0A0A0A] border border-[#2E2E2E] rounded-xl px-4 py-2.5 text-xs text-[#FAFAFA] placeholder-[#A3A3A3]/60 focus:outline-none focus:border-[#059669]"
          />
          <button
            disabled={isGenerating}
            onClick={() => handleGenerateProposal()}
            className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Create AI Proposal</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#2E2E2E] pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'bg-[#059669] text-white shadow-md'
              : 'bg-[#1A1A1A] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E]'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Pending Executive Approvals ({pendingItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'history'
              ? 'bg-[#059669] text-white shadow-md'
              : 'bg-[#1A1A1A] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E]'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Executed Audit Log ({decisionsLog.length + processedItems.length})</span>
        </button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-[#A3A3A3] space-y-2">
          <Loader2 className="w-6 h-6 text-[#059669] animate-spin mx-auto" />
          <p>Syncing approval queue with StockSphere backend database...</p>
        </div>
      ) : activeTab === 'pending' ? (
        /* Pending Items View */
        <div className="space-y-3">
          {pendingItems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] text-xs text-[#A3A3A3] space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#10B981] mx-auto opacity-80" />
              <h3 className="font-bold text-sm text-[#FAFAFA]">Approval Queue Clear</h3>
              <p>All high-priority executive approval requests have been executed. Generate a new proposal above or run a multi-agent debate!</p>
            </div>
          ) : (
            pendingItems.map((task) => (
              <div key={task.id} className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      task.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      task.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-[#059669]/20 text-[#10B981] border border-[#059669]/40'
                    }`}>
                      {task.priority || 'HIGH'} PRIORITY
                    </span>
                    <span className="text-xs text-[#A3A3A3]">Initiated by <strong className="text-[#FAFAFA]">{task.requestedBy || task.agent}</strong></span>
                    {task.dept && <span className="text-[10px] text-[#A3A3A3] bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#2E2E2E]">{task.dept}</span>}
                  </div>

                  <h3 className="font-extrabold text-base text-[#FAFAFA]">{task.title}</h3>
                  <p className="text-xs text-[#A3A3A3] max-w-3xl leading-relaxed">{task.summary || task.impact}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <span className="text-[#10B981] font-bold">Quantified Impact: {task.impact}</span>
                    <span className="text-[#A3A3A3]">Allocation Cost: <strong className="text-[#FAFAFA]">{task.cost || 'Within Budget'}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleReject(task.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-rose-950/40 text-[#A3A3A3] hover:text-rose-400 font-bold text-xs border border-[#2E2E2E] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleApprove(task.id)}
                    className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Executive Order</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* History & Audit Log View */
        <div className="space-y-3">
          {processedItems.concat(decisionsLog).map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    item.status === 'approved' || item.status === 'EXECUTED' ? 'bg-[#059669]/20 text-[#10B981] border border-[#059669]/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                    {(item.status || 'EXECUTED').toUpperCase()}
                  </span>
                  <span className="font-bold text-[#FAFAFA]">{item.title || item.action}</span>
                </div>
                <p className="text-[11px] text-[#A3A3A3]">{item.impact || item.summary}</p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[10px] text-[#A3A3A3]">{item.timestamp || 'Executed'}</div>
                <div className="text-[10px] font-bold text-[#10B981]">{item.requestedBy || item.agent || 'System'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomationQueue;
