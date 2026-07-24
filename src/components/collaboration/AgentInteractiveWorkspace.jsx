import React, { useState, useEffect } from 'react';
import { AgentEngine } from '../../services/agentEngine';
import { 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Clock, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Sliders, 
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AgentInteractiveWorkspace = ({ agentId, onBackToDebate, setActiveTab }) => {
  const [agent, setAgent] = useState(() => AgentEngine.getAgentById(agentId));
  const [logs, setLogs] = useState(() => AgentEngine.getAgentLogs(agentId));
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Custom Input Parameters for Agent Domain
  const [paramInput1, setParamInput1] = useState('');
  const [paramInput2, setParamInput2] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');

  useEffect(() => {
    const updatedAgent = AgentEngine.getAgentById(agentId);
    setAgent(updatedAgent);
    setLogs(AgentEngine.getAgentLogs(agentId));
    setExecutionResult(null);
    setActiveStep(0);
    setParamInput1('');
    setParamInput2('');
  }, [agentId]);

  if (!agent) return null;

  // Domain specific presets and controls based on agentId
  const getDomainControls = () => {
    switch (agentId) {
      case 'agent-inventory':
        return {
          title: 'Inventory & Stock Re-balancing Console',
          field1Label: 'Target Component / SKU',
          field1Placeholder: 'e.g. Microcontroller X402',
          field2Label: 'Reorder Quantity',
          field2Placeholder: 'e.g. 1500',
          presets: ['Emergency Reorder X402 (+1,500)', 'Re-balance West-3 Stock', 'Safety Stock Optimization']
        };
      case 'agent-sales':
        return {
          title: 'Sales & Revenue Acceleration Console',
          field1Label: 'Enterprise Deal Name',
          field1Placeholder: 'e.g. TechCorp Server Expansion',
          field2Label: 'Contract Value',
          field2Placeholder: 'e.g. ₹3.4 Cr',
          presets: ['Accelerate TechCorp Deal', 'APAC Q3 Demand Spike', 'Churn Risk Mitigation']
        };
      case 'agent-finance':
        return {
          title: 'Treasury & Working Capital Console',
          field1Label: 'Target Vendor / Invoice',
          field1Placeholder: 'e.g. Supplier Alpha (Taiwan)',
          field2Label: 'Payment Amount & Rebate %',
          field2Placeholder: 'e.g. ₹85,00,000 (3.5% Rebate)',
          presets: ['Prompt Vendor Discount (3.5%)', 'Treasury Buffer Audit', 'CapEx Variance Scan']
        };
      case 'agent-production':
        return {
          title: 'Plant Machinery & OEE Telemetry Console',
          field1Label: 'Target Machine Unit',
          field1Placeholder: 'e.g. CNC Milling Unit #4',
          field2Label: 'Vibration Score Threshold',
          field2Placeholder: 'e.g. 8.4 mm/s',
          presets: ['Schedule CNC Unit #4 Overhaul', 'Line 2 Speed Balancing', 'Yield Thermal Audit']
        };
      case 'agent-supplier':
        return {
          title: 'Vendor Sourcing & SLA Audit Console',
          field1Label: 'Primary Delayed Supplier',
          field1Placeholder: 'e.g. Supplier Alpha (Kaohsiung)',
          field2Label: 'Backup Direct Supplier',
          field2Placeholder: 'e.g. Supplier Beta (Domestic)',
          presets: ['Auto-Reroute to Supplier Beta', 'Audit Top 12 Vendor SLAs', 'Port Congestion Bypass']
        };
      case 'agent-logistics':
        return {
          title: 'Fleet Navigation & Route Optimization Console',
          field1Label: 'Monsoon Transit Corridor',
          field1Placeholder: 'e.g. Route NH-48 (Bengaluru-Mumbai)',
          field2Label: 'Alternate Bypass Highway',
          field2Placeholder: 'e.g. Highway 52 Bypass',
          presets: ['Reroute 18 Freight Trucks', 'Fuel Efficiency Optimizer', 'Cold-chain Temperature Scan']
        };
      case 'agent-hr':
        return {
          title: 'Human Capital & Shift Workload Console',
          field1Label: 'Target Plant & Shift',
          field1Placeholder: 'e.g. Bengaluru Plant Shift-2',
          field2Label: 'Floating Engineers Count',
          field2Placeholder: 'e.g. 4 Technicians',
          presets: ['Rotate Floating Technicians', 'Overtime Fatigue Balancer', 'Engineering Shift Audit']
        };
      case 'agent-customer':
        return {
          title: 'Customer Experience & Retention Console',
          field1Label: 'Enterprise Client Name',
          field1Placeholder: 'e.g. TechCorp Enterprise',
          field2Label: 'CSAT Target Score',
          field2Placeholder: 'e.g. 92/100',
          presets: ['Escalate TechCorp Retention', 'CSAT Usage Dip Analysis', 'NPS Feedback Scan']
        };
      case 'agent-compliance':
        return {
          title: 'Regulatory Governance & ESG Audit Console',
          field1Label: 'Compliance Framework Scope',
          field1Placeholder: 'e.g. EU Carbon Border Tax (CBAM)',
          field2Label: 'Audit Target',
          field2Placeholder: 'e.g. 10 Supply Nodes',
          presets: ['Run EU CBAM ESG Audit', 'GDPR/DPDP Data Scan', 'Cross-Border Tariff Check']
        };
      case 'agent-risk':
        return {
          title: 'Enterprise Risk & Macro Stress Test Console',
          field1Label: 'Risk Exposure Factor',
          field1Placeholder: 'e.g. Rare Earth Metal Volatility',
          field2Label: 'Stress Factor Magnitude',
          field2Placeholder: 'e.g. +25% Price Surge',
          presets: ['Macro Stress Test (25% Spike)', 'Cross-Dept Risk Correlation', 'Crisis Scenario Drill']
        };
      default:
        return {
          title: 'Agent Domain Console',
          field1Label: 'Parameter 1',
          field1Placeholder: 'Enter value',
          field2Label: 'Parameter 2',
          field2Placeholder: 'Enter value',
          presets: ['Run Default Task']
        };
    }
  };

  const domainControls = getDomainControls();

  const handleApplyPreset = (preset) => {
    setSelectedPreset(preset);
    if (preset.includes('X402') || preset.includes('Reorder')) {
      setParamInput1('Microcontroller X402');
      setParamInput2('1500');
    } else if (preset.includes('TechCorp')) {
      setParamInput1('TechCorp Enterprise');
      setParamInput2('₹3.4 Cr');
    } else if (preset.includes('CNC') || preset.includes('Overhaul')) {
      setParamInput1('CNC Milling Unit #4');
      setParamInput2('8.4 mm/s');
    } else if (preset.includes('Supplier Beta') || preset.includes('Reroute')) {
      setParamInput1('Supplier Alpha (Taiwan)');
      setParamInput2('Supplier Beta (Domestic)');
    } else if (preset.includes('Discount') || preset.includes('Rebate')) {
      setParamInput1('Supplier Alpha');
      setParamInput2('₹85,00,000 (3.5% Rebate)');
    } else {
      setParamInput1(preset);
    }
  };

  const handleRunAgentAction = async (e) => {
    if (e) e.preventDefault();
    setIsRunning(true);
    setExecutionResult(null);
    setActiveStep(0);

    const params = {
      sku: paramInput1,
      qty: paramInput2,
      dealName: paramInput1,
      dealValue: paramInput2,
      supplier: paramInput1,
      amount: paramInput2,
      machine: paramInput1,
      vibration: paramInput2,
      primaryVendor: paramInput1,
      backupVendor: paramInput2,
      corridor: paramInput1,
      alternate: paramInput2,
      plant: paramInput1,
      client: paramInput1,
      auditScope: paramInput1,
      factor: paramInput1
    };

    try {
      const result = await AgentEngine.executeAgentTask(agentId, params);
      
      // Simulate live step streaming
      for (let i = 0; i < result.steps.length; i++) {
        setActiveStep(i);
        await new Promise(r => setTimeout(r, 400));
      }

      setExecutionResult(result);
      setAgent(AgentEngine.getAgentById(agentId));
      setLogs(AgentEngine.getAgentLogs(agentId));

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Profile Bar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl shadow-inner">
            {agent.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">{agent.name}</h1>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                agent.healthScore > 90 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {agent.healthScore}% Operational Health
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{agent.department} • Active Task: {agent.currentTask}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={onBackToDebate}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            ← View Multi-Agent Inter-Debate
          </button>
        </div>
      </div>

      {/* Main Grid: Control Console & Real-time Reasoning Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Interactive Domain Parameters & Presets */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              {domainControls.title}
            </h3>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono font-bold border border-blue-500/20">
              Interactive Execution Mode
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400">Quick Scenario Presets</label>
            <div className="flex flex-wrap gap-2">
              {domainControls.presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    selectedPreset === preset
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 font-semibold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Form Controls */}
          <form onSubmit={handleRunAgentAction} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">{domainControls.field1Label}</label>
              <input
                type="text"
                value={paramInput1}
                onChange={(e) => setParamInput1(e.target.value)}
                placeholder={domainControls.field1Placeholder}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">{domainControls.field2Label}</label>
              <input
                type="text"
                value={paramInput2}
                onChange={(e) => setParamInput2(e.target.value)}
                placeholder={domainControls.field2Placeholder}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isRunning}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-800"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Agent Processing Telemetry & Reasoning...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute {agent.name} Action</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Real-time Reasoning Terminal & Output Impact */}
        <div className="space-y-6">
          {/* Reasoning Terminal Stream */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Terminal className="w-4 h-4" /> Live Reasoning Stream
              </div>
              <span className="text-[10px] text-slate-500">Agent Engine v5.12</span>
            </div>

            <div className="space-y-2 min-h-48 max-h-56 overflow-y-auto text-xs">
              {!executionResult && !isRunning && (
                <div className="text-slate-600 italic py-8 text-center">
                  Select a scenario preset or enter parameters on the left, then click "Execute Action" to view step-by-step agent reasoning.
                </div>
              )}

              {isRunning && (
                <div className="space-y-2 text-slate-300">
                  <div className="text-blue-400 font-semibold animate-pulse">
                    ⚡ Initializing {agent.name} neural execution pipeline...
                  </div>
                </div>
              )}

              {executionResult && (
                <div className="space-y-2">
                  {executionResult.steps.map((step, idx) => (
                    <div 
                      key={idx}
                      className={`p-2 rounded border text-[11px] transition-all ${
                        idx === activeStep 
                          ? 'bg-blue-950/60 border-blue-800 text-blue-200'
                          : 'bg-slate-900/50 border-slate-800/80 text-slate-300'
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Impact Card */}
          {executionResult && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-sm text-white">Action Executed Successfully</h4>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  {executionResult.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {executionResult.summary}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Financial / Ops Impact:</span>
                <span className="font-bold text-emerald-400">{executionResult.impact}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Historical Agent Action Logs */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            {agent.name} Immutable Session Execution Logs
          </h3>
          <span className="text-[10px] text-slate-400 font-mono font-bold">{logs.length} Actions Recorded</span>
        </div>

        <div className="space-y-2 text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-200">{log.action}</div>
                <div className="text-[11px] text-slate-400">{log.details}</div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-right">
                <div>
                  <div className="text-[10px] text-emerald-400 font-bold">{log.impact}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{log.timestamp}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentInteractiveWorkspace;
