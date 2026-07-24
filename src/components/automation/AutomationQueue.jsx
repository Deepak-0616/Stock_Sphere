import React, { useState } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AutomationQueue = () => {
  const [tasks, setTasks] = useState([
    {
      id: 'task-101',
      title: 'Emergency Purchase Request: Microchip X402 (1,500 Units)',
      agent: 'Inventory Agent + Supplier Agent',
      impact: '+₹8,50,000 Saved',
      cost: '₹14,50,000',
      priority: 'CRITICAL',
      status: 'PENDING_APPROVAL',
      summary: 'Execute air-freight procurement order with Backup Supplier Beta to prevent 48-hr plant line 2 shutdown.'
    },
    {
      id: 'task-102',
      title: 'Schedule Preventive Bearing Maintenance for CNC Unit #4',
      agent: 'Production Agent',
      impact: 'Avoids ₹45,00,000 Scrap Loss',
      cost: '₹2,10,000',
      priority: 'HIGH',
      status: 'PENDING_APPROVAL',
      summary: 'Authorize 4-hour maintenance window during 2:00 AM low-demand shift.'
    },
    {
      id: 'task-103',
      title: 'Early Vendor Invoice Payment (3.5% Rebate)',
      agent: 'Finance Agent',
      impact: '+₹28,50,000 Net Rebate',
      cost: '₹81,42,000',
      priority: 'MEDIUM',
      status: 'AUTOMATED',
      summary: 'Automated treasury disbursement executed 5 days prior to invoice due date.'
    },
    {
      id: 'task-104',
      title: 'Monsoon Highway 52 Fleet Dynamic Reroute',
      agent: 'Logistics Agent',
      impact: '-8 Hours Transit Lag',
      cost: '₹1,20,000 Saved',
      priority: 'LOW',
      status: 'AUTOMATED',
      summary: 'Rerouted 14 freight vehicles away from flooded NH-48 corridor.'
    }
  ]);

  const handleApprove = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'APPROVED' } : t));
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <CheckSquare className="w-3.5 h-3.5" /> Autonomous Workflow Orchestrator
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Automation Engine & Approval Queue</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Low-risk routine workflows run fully automatically. High-value critical decisions require 1-click executive approval.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Pending Approval</div>
            <div className="text-base font-extrabold text-amber-400">
              {tasks.filter(t => t.status === 'PENDING_APPROVAL').length} Requests
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Auto-Executed Today</div>
            <div className="text-base font-extrabold text-[#10B981]">142 Workflows</div>
          </div>
        </div>
      </div>

      {/* Task Queue List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  task.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  task.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-[#059669]/20 text-[#10B981] border border-[#059669]/40'
                }`}>
                  {task.priority} PRIORITY
                </span>
                <span className="text-xs text-[#A3A3A3]">Initiated by <strong className="text-[#FAFAFA]">{task.agent}</strong></span>
              </div>

              <h3 className="font-extrabold text-base text-[#FAFAFA]">{task.title}</h3>
              <p className="text-xs text-[#A3A3A3] max-w-3xl leading-relaxed">{task.summary}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <span className="text-[#10B981] font-bold">Estimated Impact: {task.impact}</span>
                <span className="text-[#A3A3A3]">Allocation Cost: <strong className="text-[#FAFAFA]">{task.cost}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {task.status === 'PENDING_APPROVAL' && (
                <button
                  onClick={() => handleApprove(task.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Executive Order</span>
                </button>
              )}

              {task.status === 'APPROVED' && (
                <span className="px-4 py-2 rounded-xl bg-[#059669]/20 text-[#10B981] font-mono font-bold text-xs border border-[#059669]/40 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" /> Executed Successfully
                </span>
              )}

              {task.status === 'AUTOMATED' && (
                <span className="px-4 py-2 rounded-xl bg-[#0A0A0A] text-[#A3A3A3] font-mono text-xs border border-[#2E2E2E] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#84CC16]" /> Auto-Executed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationQueue;
