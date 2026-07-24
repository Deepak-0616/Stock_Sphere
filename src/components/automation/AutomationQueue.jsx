import React, { useState } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Filter,
  Search
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
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
            <CheckSquare className="w-3.5 h-3.5" /> Autonomous Workflow Orchestrator
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Automation Engine & Approval Queue</h1>
          <p className="text-xs text-slate-400 mt-1">
            Low-risk routine workflows run fully automatically. High-value critical decisions require 1-click executive approval.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Pending Approval</div>
            <div className="text-base font-extrabold text-amber-400">
              {tasks.filter(t => t.status === 'PENDING_APPROVAL').length} Requests
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Auto-Executed Today</div>
            <div className="text-base font-extrabold text-emerald-400">142 Workflows</div>
          </div>
        </div>
      </div>

      {/* Task Queue List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  task.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {task.priority} PRIORITY
                </span>
                <span className="text-[11px] text-slate-400">Initiator: <strong className="text-slate-200">{task.agent}</strong></span>
              </div>

              <h4 className="font-bold text-base text-white">{task.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{task.summary}</p>

              <div className="flex items-center gap-4 text-xs pt-1">
                <span className="text-emerald-400 font-bold">Impact: {task.impact}</span>
                <span className="text-slate-400">Cost: <strong className="text-slate-200">{task.cost}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="shrink-0 w-full lg:w-auto flex items-center gap-2">
              {task.status === 'PENDING_APPROVAL' && (
                <button
                  onClick={() => handleApprove(task.id)}
                  className="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve Execution
                </button>
              )}

              {task.status === 'APPROVED' && (
                <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Executed & Audited
                </span>
              )}

              {task.status === 'AUTOMATED' && (
                <span className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs border border-slate-700 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Auto-Executed by Agent
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
