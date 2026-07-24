import React, { useState } from 'react';
import { DEPARTMENTS, AI_AGENTS } from '../../data/mockEnterpriseData';
import { 
  Building2, 
  Brain, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Cpu, 
  Users, 
  Truck, 
  ShieldCheck, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

export const DepartmentHub = ({ setActiveTab }) => {
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);
  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const assignedAgent = AI_AGENTS.find(a => a.department.toLowerCase().includes(selectedDept.name.toLowerCase().split(' ')[0])) || AI_AGENTS[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
            <Building2 className="w-3.5 h-3.5" /> Departmental Neural Nodes
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Enterprise Departments Hub</h1>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated operational telemetry, budget allocation, headcount, and specialized AI agent management.
          </p>
        </div>
      </div>

      {/* Department Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setSelectedDeptId(dept.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedDeptId === dept.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{dept.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              dept.health > 90 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {dept.health}%
            </span>
          </button>
        ))}
      </div>

      {/* Selected Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Department Metrics & Budget */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-base text-white">{selectedDept.name}</h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                {selectedDept.health}% Health Score
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Department Budget</span>
                <span className="font-bold text-white">{selectedDept.budget}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Headcount</span>
                <span className="font-bold text-slate-200">{selectedDept.headcount} Staff</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Primary Key Metric</span>
                <span className="font-bold text-blue-400">{selectedDept.keyMetric}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Risk Profile</span>
                <span className={`font-bold ${selectedDept.risk === 'HIGH' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {selectedDept.risk} RISK
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right 2 Cols: Assigned AI Agent Roster & Insights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{assignedAgent.avatar}</span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400">Assigned Department Agent</span>
                  <h3 className="font-extrabold text-base text-white">{assignedAgent.name}</h3>
                </div>
              </div>

              <span className="text-xs text-emerald-400 font-mono font-bold">Confidence: {assignedAgent.confidence}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Active Real-Time Task</span>
                <p className="text-slate-200 font-semibold">{assignedAgent.currentTask}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-purple-400 uppercase font-bold">Latest Neural Insight</span>
                <p className="text-purple-200 italic leading-relaxed">"{assignedAgent.recentInsight}"</p>
              </div>

              {/* Agent Capabilities Tags */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Autonomous Capabilities</span>
                <div className="flex flex-wrap gap-1.5">
                  {assignedAgent.capabilities.map((cap, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('agents')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Launch {assignedAgent.name} Working Console</span>
                </button>

                <button
                  onClick={() => setActiveTab('copilot')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Chat with {assignedAgent.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
