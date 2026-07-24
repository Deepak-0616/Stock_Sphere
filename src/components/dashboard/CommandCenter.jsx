import React, { useState, useEffect } from 'react';
import { 
  DEPARTMENTS, 
  RECENT_DECISIONS_LOG
} from '../../data/mockEnterpriseData';
import { telemetryStream } from '../../services/telemetryStreamService';
import { LiveTelemetryControlBanner } from '../common/LiveTelemetryControlBanner';
import { 
  Activity, 
  AlertTriangle, 
  ArrowUpRight, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ChevronRight
} from 'lucide-react';
import { StockSphereLogo } from '../common/StockSphereLogo';
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
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/10 rounded-full filter blur-3xl -z-10 animate-pulse" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981]">
              <Zap className="w-3.5 h-3.5" /> StockSphere Autonomous Intelligence Online
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
              Enterprise Command Center
            </h1>
            <p className="text-xs md:text-sm text-[#A3A3A3] max-w-2xl leading-relaxed">
              10 specialized AI Agents continuously monitor your business, detect risks before they cost money, and provide one-click executive approvals.
            </p>
          </div>

          {/* Dynamic Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            {/* Metric 1 */}
            <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#A3A3A3]">Annual Revenue</span>
                <HelpTooltip 
                  title="Annual Recurring Revenue (ARR)" 
                  explanation="Current total normalized yearly revenue across all sales channels."
                />
              </div>
              <div className="text-base font-extrabold text-[#FAFAFA]">{ENTERPRISE_METRICS.revenue}</div>
              <div className="text-[10px] font-semibold text-[#10B981] flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> {ENTERPRISE_METRICS.revenueGrowth} YoY
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#A3A3A3]">Net Profit</span>
                <HelpTooltip 
                  title="Net Profit Margin" 
                  explanation="Percentage of revenue retained after all operational costs."
                />
              </div>
              <div className="text-base font-extrabold text-[#FAFAFA]">{ENTERPRISE_METRICS.profitMargin}</div>
              <div className="text-[10px] font-semibold text-[#10B981] flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> {ENTERPRISE_METRICS.profitGrowth} margin
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#A3A3A3]">Monthly AI Savings</span>
                <HelpTooltip 
                  title="Monthly AI Cost Prevention" 
                  explanation="Direct financial savings captured by automated AI agent actions."
                />
              </div>
              <div className="text-base font-extrabold text-[#10B981]">{ENTERPRISE_METRICS.costSavedThisMonth}</div>
              <div className="text-[10px] text-[#A3A3A3]">{ENTERPRISE_METRICS.automatedActionsToday} automated ops</div>
            </div>

            {/* Metric 4 */}
            <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#A3A3A3]">AI Confidence</span>
                <HelpTooltip 
                  title="AI Decision Confidence" 
                  explanation="Statistical reliability score calculated across knowledge graph nodes."
                />
              </div>
              <div className="text-base font-extrabold text-[#84CC16]">{ENTERPRISE_METRICS.decisionConfidenceAvg}</div>
              <div className="text-[10px] font-semibold text-[#10B981]">Verified Precision</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Telemetry Graph & Department Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Enterprise Telemetry & Department Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue & Enterprise Risk Telemetry Graph */}
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#059669]" />
                  Real-time Revenue & Efficiency Telemetry
                </h3>
                <p className="text-xs text-[#A3A3A3] mt-0.5">
                  Synchronized hourly metrics across all 10 departments
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-[#FAFAFA] font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#059669] inline-block" /> Revenue (Cr)
                </span>
                <span className="flex items-center gap-1.5 text-[#FAFAFA] font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] inline-block" /> Efficiency Score
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetry.telemetryHistory}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#84cc16" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
                  <XAxis dataKey="time" stroke="#A3A3A3" fontSize={11} />
                  <YAxis stroke="#A3A3A3" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#2E2E2E', borderRadius: '0.75rem' }} 
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="efficiency" stroke="#84cc16" strokeWidth={2} fillOpacity={1} fill="url(#colorEff)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Health Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center gap-2">
                  <StockSphereLogo className="w-4 h-4" color="#84CC16" />
                  Department Status & Assigned AI Agents
                </h3>
                <p className="text-[11px] text-[#A3A3A3]">Click any department card to explore detailed metrics</p>
              </div>

              <button 
                onClick={() => setActiveTab('departments')}
                className="text-xs text-[#10B981] hover:text-[#059669] font-semibold flex items-center gap-1 bg-[#059669]/15 border border-[#059669]/40 px-2.5 py-1 rounded-lg transition-all"
              >
                View All 10 Departments <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEPARTMENTS.slice(0, 4).map((dept) => {
                return (
                  <div 
                    key={dept.id}
                    onClick={() => setActiveTab('departments')}
                    className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#059669]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-sm text-[#FAFAFA] group-hover:text-[#10B981] transition-colors">{dept.name}</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-mono ${
                        dept.health > 90 ? 'bg-[#059669]/20 text-[#10B981] border border-[#059669]/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {dept.health}% Health
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#A3A3A3]">
                      <div className="flex items-center justify-between text-[#A3A3A3]">
                        <span>Assigned Agent:</span>
                        <span className="font-semibold text-[#FAFAFA]">{dept.agent}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#A3A3A3]">
                        <span>Key Metric:</span>
                        <span className="font-semibold text-[#10B981]">{dept.keyMetric}</span>
                      </div>
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
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" /> 
                {telemetry.recentEvent ? telemetry.recentEvent.title : 'Action Required • Stock Deficit'}
              </span>
              <span className="text-[10px] font-mono text-[#A3A3A3]">AI Confidence: 94%</span>
            </div>

            <div>
              <h4 className="font-bold text-base text-[#FAFAFA]">Approve Microchip X402 Emergency Procurement</h4>
              <p className="text-xs text-[#A3A3A3] mt-1 leading-relaxed">
                Supplier Alpha is delayed by 5 days. Inventory & Logistics Agents recommend procuring from Supplier Beta via express air-freight.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A3A3A3]">Direct Saving:</span>
                <span className="font-bold text-[#10B981]">+₹8,50,000 Saved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A3A3A3]">Delivery Latency:</span>
                <span className="font-bold text-[#84CC16]">&lt; 24 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A3A3A3]">Protected Customer Order:</span>
                <span className="font-bold text-[#FAFAFA]">TechCorp Q3 Batch (₹3.4 Cr)</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button 
                onClick={() => setActiveTab('automation')}
                className="w-full py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-[#FAFAFA] font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve Execution in 1 Click
              </button>
              <div className="flex items-center justify-between text-[11px]">
                <button 
                  onClick={() => setActiveTab('agents')}
                  className="text-[#A3A3A3] hover:text-[#10B981] font-medium underline"
                >
                  Inspect Agent Debate Log →
                </button>
                <button 
                  onClick={() => setActiveTab('simulator')}
                  className="text-[#A3A3A3] hover:text-[#84CC16] font-medium underline"
                >
                  Simulate Financial Outcome →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Decisions Audit Stream */}
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#10B981]" />
                Recent AI Decision History
              </h3>
              <HelpTooltip
                title="Immutable Decision Log"
                explanation="Every decision made by AI agents or human executives is logged with timestamps, financial impact, and rationale."
              />
            </div>

            <div className="space-y-3 text-xs">
              {RECENT_DECISIONS_LOG.map((dec) => (
                <div key={dec.id} className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#FAFAFA]">{dec.title}</span>
                    <span className="text-[10px] text-[#10B981] font-bold">{dec.impact}</span>
                  </div>
                  <p className="text-[11px] text-[#A3A3A3] leading-tight">{dec.summary}</p>
                  <div className="flex items-center justify-between text-[10px] text-[#A3A3A3]/70 pt-1">
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
