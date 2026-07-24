import React, { useState } from 'react';
import { DEPARTMENTS } from '../../data/mockEnterpriseData';
import { 
  Building2, 
  Bot, 
  ArrowRight
} from 'lucide-react';

export const DepartmentHub = ({ setActiveTab }) => {
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);

  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <Building2 className="w-3.5 h-3.5" /> 10 Enterprise Operational Hubs
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Department Intelligence Hub</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Explore active telemetry, budgets, risk profiles, and assigned AI agents across all 10 business units.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
          <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Total Organization Units</div>
          <div className="text-base font-extrabold text-[#10B981]">10 Operational Teams</div>
        </div>
      </div>

      {/* Horizontal Department Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setSelectedDeptId(dept.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              selectedDeptId === dept.id
                ? 'bg-[#059669] text-white shadow-lg shadow-emerald-950/40'
                : 'bg-[#1A1A1A] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E]'
            }`}
          >
            <span>{dept.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              dept.health > 90 ? 'bg-[#059669]/20 text-[#10B981]' : 'bg-amber-500/20 text-amber-300'
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
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2E2E]">
              <h3 className="font-extrabold text-base text-[#FAFAFA]">{selectedDept.name}</h3>
              <span className="px-2.5 py-1 rounded-full bg-[#059669]/20 text-[#10B981] text-xs font-mono font-bold border border-[#059669]/40">
                {selectedDept.health}% Health Score
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] flex justify-between items-center">
                <span className="text-[#A3A3A3]">Department Budget</span>
                <span className="font-bold text-[#FAFAFA]">{selectedDept.budget}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] flex justify-between items-center">
                <span className="text-[#A3A3A3]">Headcount</span>
                <span className="font-bold text-[#FAFAFA]">{selectedDept.headcount} Staff</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] flex justify-between items-center">
                <span className="text-[#A3A3A3]">Primary Key Metric</span>
                <span className="font-bold text-[#10B981]">{selectedDept.keyMetric}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] flex justify-between items-center">
                <span className="text-[#A3A3A3]">Risk Profile</span>
                <span className={`font-bold ${selectedDept.risk === 'HIGH' ? 'text-rose-400' : 'text-[#10B981]'}`}>
                  {selectedDept.risk} RISK
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Agent Profile Card */}
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-white">
                <Bot className="w-5 h-5 text-[#059669]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#059669]">Assigned Department Agent</span>
                <h4 className="font-bold text-sm text-[#FAFAFA]">{selectedDept.agent}</h4>
              </div>
            </div>

            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Continuously monitors {selectedDept.name} operational feeds, executing real-time optimizations and multi-agent debates.
            </p>

            <button
              onClick={() => setActiveTab && setActiveTab('agents')}
              className="w-full py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#2E2E2E] text-[#10B981] font-semibold text-xs border border-[#2E2E2E] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Inspect Agent Decisions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center & Right 2 Cols: Department Action Log & Active Initiatives */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2E2E]">
              <h3 className="font-bold text-sm text-[#FAFAFA]">Active Operational Initiatives & Telemetry</h3>
              <span className="text-xs text-[#10B981] font-mono">Live Feeds</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#FAFAFA]">Autonomous Workflow Sync</span>
                  <span className="text-[10px] bg-[#059669]/20 text-[#10B981] px-2 py-0.5 rounded font-mono">Active</span>
                </div>
                <p className="text-[#A3A3A3]">Automated purchase orders & supplier SLA tracking active for {selectedDept.name}. Zero manual intervention required.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#FAFAFA]">Knowledge Graph Integration</span>
                  <span className="text-[10px] bg-[#059669]/20 text-[#10B981] px-2 py-0.5 rounded font-mono">Connected</span>
                </div>
                <p className="text-[#A3A3A3]">50+ cross-department entity relations synchronized with Neo4j cluster.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHub;
