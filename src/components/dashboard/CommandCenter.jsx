import React, { useState, useEffect } from 'react';
import { 
  DEPARTMENTS, 
  RECENT_DECISIONS_LOG,
  AI_AGENTS 
} from '../../data/mockEnterpriseData';
import { telemetryStream } from '../../services/telemetryStreamService';
import { LiveTelemetryControlBanner } from '../common/LiveTelemetryControlBanner';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Brain, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  DollarSign,
  Package,
  Cpu,
  Users,
  Truck,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { HelpTooltip } from '../common/HelpTooltip';
import { OnboardingBanner } from '../common/OnboardingBanner';

export const CommandCenter = ({ setActiveTab }) => {
  const [telemetry, setTelemetry] = useState(telemetryStream.state);

  useEffect(() => {
    const unsubscribe = telemetryStream.subscribe((newState) => {
      setTelemetry({ ...newState });
    });
    return unsubscribe;
  }, []);

  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} L`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* User Onboarding & Quick Guide Banner */}
      <OnboardingBanner setActiveTab={setActiveTab} />

      {/* Live Synthetic Telemetry Stream Control Banner */}
      <LiveTelemetryControlBanner />

      {/* Top Banner: Enterprise OS Health Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl -z-10 animate-pulse" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <Zap className="w-3.5 h-3.5" /> SolveX Autonomous Intelligence Stream Online
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Command Center
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              10 specialized AI Agents continuously monitor live enterprise telemetry, detect operational risks before they cause downtime, and output one-click executive actions.
            </p>
          </div>

          {/* Dynamic Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            {/* Metric 1: Annual Revenue */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Annual Revenue</span>
                <HelpTooltip 
                  title="Annual Recurring Revenue (ARR)" 
                  explanation="Current total normalized yearly revenue across all sales channels."
                />
              </div>
              <div className="text-base font-extrabold text-white font-mono">{formatCurrency(telemetry.annualRevenue)}</div>
              <div className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5 font-mono">
                <ArrowUpRight className="w-3 h-3" /> +{telemetry.annualRevenueGrowth}% YoY
              </div>
            </div>

            {/* Metric 2: Net Profit Margin */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Net Profit</span>
                <HelpTooltip 
                  title="Net Profit Margin" 
                  explanation="Percentage of revenue retained after all operational costs."
                />
              </div>
              <div className="text-base font-extrabold text-white font-mono">{telemetry.netProfitMargin}%</div>
              <div className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5 font-mono">
                <ArrowUpRight className="w-3 h-3" /> +2.1% margin
              </div>
            </div>

            {/* Metric 3: Monthly AI Savings */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Monthly AI Savings</span>
                <HelpTooltip 
                  title="Monthly AI Cost Prevention" 
                  explanation="Direct financial savings captured by automated AI agent actions."
                />
              </div>
              <div className="text-base font-extrabold text-blue-400 font-mono">{formatCurrency(telemetry.aiSavingsMonthly)}</div>
              <div className="text-[10px] text-slate-400 font-mono">{telemetry.aiSavingsCount} automated ops</div>
            </div>

            {/* Metric 4: AI Confidence */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">AI Confidence</span>
                <HelpTooltip 
                  title="AI Decision Confidence" 
                  explanation="Statistical reliability score calculated across knowledge graph nodes."
                />
              </div>
              <div className="text-base font-extrabold text-purple-400 font-mono">{telemetry.aiConfidence}%</div>
              <div className="text-[10px] font-semibold text-emerald-400">Verified Precision</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Telemetry Graph & Department Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Enterprise Telemetry & Department Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue & Enterprise Risk Telemetry Graph */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                  Real-Time Revenue & Efficiency Telemetry Stream
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live synchronized metrics across all 10 departments (Last Tick: {telemetry.lastTickTime})
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Revenue Vector
                </span>
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Efficiency Score
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetry.telemetryHistory}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }} 
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEff)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Health Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  Department Status & Assigned AI Agents
                </h3>
                <p className="text-[11px] text-slate-400">Click any department card to explore detailed metrics</p>
              </div>

              <button 
                onClick={() => setActiveTab('departments')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg"
              >
                View All 10 Departments <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEPARTMENTS.slice(0, 4).map((dept) => (
                <div 
                  key={dept.id}
                  onClick={() => setActiveTab('departments')}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">{dept.name}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-mono ${
                      dept.health > 90 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {dept.health}% Health
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Assigned Agent:</span>
                      <span className="font-semibold text-slate-200">{dept.agent}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Key Metric:</span>
                      <span className="font-semibold text-blue-400">{dept.keyMetric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: High Priority AI Recommendations & Dynamic Injected Event Alert */}
        <div className="space-y-6">
          {/* Priority AI Recommendation Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-slate-900 border border-indigo-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" /> 
                {telemetry.recentEvent ? telemetry.recentEvent.title : 'Action Required • Stock Deficit'}
              </span>
              <span className="text-[10px] font-mono text-slate-400">Confidence: {telemetry.aiConfidence}%</span>
            </div>

            <div>
              <h4 className="font-bold text-base text-white">
                {telemetry.recentEvent ? telemetry.recentEvent.title : 'Approve Microchip X402 Emergency Procurement'}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {telemetry.recentEvent ? telemetry.recentEvent.impact : `Current stock: ${telemetry.microchipStock} units. Inventory & Logistics Agents recommend procuring from Supplier Beta via express air-freight.`}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">CNC Spindle Vibration:</span>
                <span className={`font-bold font-mono ${telemetry.cncVibration > 6.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {telemetry.cncVibration} mm/s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Microchip X402 Stock:</span>
                <span className={`font-bold font-mono ${telemetry.microchipStock < 100 ? 'text-rose-400' : 'text-blue-400'}`}>
                  {telemetry.microchipStock} Units
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Protected Customer Order:</span>
                <span className="font-bold text-slate-200">TechCorp Q3 Batch (₹3.4 Cr)</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button 
                onClick={() => setActiveTab('automation')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve Execution in 1 Click
              </button>
              <div className="flex items-center justify-between text-[11px]">
                <button 
                  onClick={() => setActiveTab('agents')}
                  className="text-slate-400 hover:text-blue-400 font-medium underline"
                >
                  Inspect Agent Debate Log →
                </button>
                <button 
                  onClick={() => setActiveTab('simulator')}
                  className="text-slate-400 hover:text-purple-400 font-medium underline"
                >
                  Simulate Financial Outcome →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Decisions Audit Stream */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Recent AI Decision History
              </h3>
              <HelpTooltip
                title="Immutable Decision Log"
                explanation="Every decision made by AI agents or human executives is logged with timestamps, financial impact, and rationale."
              />
            </div>

            <div className="space-y-3 text-xs">
              {RECENT_DECISIONS_LOG.map((dec) => (
                <div key={dec.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{dec.title}</span>
                    <span className="text-[10px] text-emerald-400 font-bold">{dec.impact}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{dec.summary}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Initiator: {dec.initiator}</span>
                    <span className="font-mono">{dec.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
