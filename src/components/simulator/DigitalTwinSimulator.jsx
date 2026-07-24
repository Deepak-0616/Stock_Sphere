import React, { useState } from 'react';
import { SimulationEngine } from '../../services/simulationEngine';
import { 
  Layers, 
  Play, 
  RotateCcw, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  DollarSign, 
  Activity, 
  Cpu, 
  Users, 
  Truck,
  Leaf,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const DigitalTwinSimulator = () => {
  const presets = SimulationEngine.getPresets();

  const [params, setParams] = useState({
    productionDelta: 30,
    budgetDelta: 10,
    rawMaterialCostDelta: 4,
    laborShiftDelta: 20,
    supplierDelayDays: 1,
    machineDowntimeHours: 0
  });

  const results = SimulationEngine.runSimulation(params);

  const applyPreset = (presetParams) => {
    setParams(presetParams);
  };

  const resetParams = () => {
    setParams({
      productionDelta: 0,
      budgetDelta: 0,
      rawMaterialCostDelta: 0,
      laborShiftDelta: 0,
      supplierDelayDays: 0,
      machineDowntimeHours: 0
    });
  };

  const radarData = [
    { subject: 'Revenue', Baseline: 70, Simulated: Math.min(100, Math.max(20, 70 + Number(results.revenueDelta))) },
    { subject: 'Profit Margin', Baseline: 80, Simulated: Math.min(100, Math.max(20, 80 + Number(results.profitDelta) * 2)) },
    { subject: 'Employee Workload', Baseline: 60, Simulated: results.employeeStress },
    { subject: 'Machine OEE Stress', Baseline: 65, Simulated: results.machineStress },
    { subject: 'Delivery SLA', Baseline: 95, Simulated: Math.max(20, 95 - Number(results.deliveryDelayRisk)) },
    { subject: 'Risk Exposure', Baseline: 25, Simulated: results.riskIndex }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
            <Layers className="w-3.5 h-3.5" /> Virtual Enterprise Digital Twin
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Enterprise Decision Simulator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate "What If?" business decisions before committing capital or altering live production lines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={resetParams}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Parameters
          </button>
        </div>
      </div>

      {/* Preset Scenarios Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presets.map((preset) => (
          <div
            key={preset.id}
            onClick={() => applyPreset(preset.params)}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-white group-hover:text-blue-400 flex items-center gap-1.5">
              <Play className="w-3 h-3 text-blue-400 fill-current" />
              <span>{preset.title}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{preset.description}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Parameters Control Sliders vs Simulated Multi-Variable Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Scenario Sliders */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-blue-400" />
            Interactive Scenario Parameters
          </h3>

          {/* Slider 1: Production Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Production Volume Change:</span>
              <span className={`font-mono font-bold ${params.productionDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {params.productionDelta > 0 ? `+${params.productionDelta}%` : `${params.productionDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="100"
              value={params.productionDelta}
              onChange={(e) => setParams({ ...params, productionDelta: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Slider 2: Budget Allocation */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Department Budget Shift:</span>
              <span className={`font-mono font-bold ${params.budgetDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {params.budgetDelta > 0 ? `+${params.budgetDelta}%` : `${params.budgetDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              value={params.budgetDelta}
              onChange={(e) => setParams({ ...params, budgetDelta: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Slider 3: Raw Material Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Raw Material Inflation:</span>
              <span className="font-mono font-bold text-amber-400">+{params.rawMaterialCostDelta}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={params.rawMaterialCostDelta}
              onChange={(e) => setParams({ ...params, rawMaterialCostDelta: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Slider 4: Supplier Lead Time Delay */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Supplier Delay (Days):</span>
              <span className="font-mono font-bold text-rose-400">{params.supplierDelayDays} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="14"
              value={params.supplierDelayDays}
              onChange={(e) => setParams({ ...params, supplierDelayDays: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Slider 5: Machine Downtime */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Unscheduled Machine Downtime:</span>
              <span className="font-mono font-bold text-rose-400">{params.machineDowntimeHours} Hours</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={params.machineDowntimeHours}
              onChange={(e) => setParams({ ...params, machineDowntimeHours: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Center & Right 2 Cols: Simulation Math Metrics & Radar Projection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Key Outcome Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Simulated Revenue</span>
              <div className="text-lg font-extrabold text-white mt-0.5">₹{results.revenue} Cr</div>
              <div className={`text-[10px] font-bold mt-0.5 ${Number(results.revenueDelta) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {results.revenueDelta >= 0 ? `+${results.revenueDelta}%` : `${results.revenueDelta}%`} vs Base
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Net Profit Margin</span>
              <div className="text-lg font-extrabold text-emerald-400 mt-0.5">{results.profitMargin}%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{results.profitDelta}% margin shift</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Expected ROI</span>
              <div className="text-lg font-extrabold text-blue-400 mt-0.5">+{results.roi}%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">3-Month Capital Return</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Simulated Risk Index</span>
              <div className={`text-lg font-extrabold mt-0.5 ${results.riskIndex > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {results.riskIndex} / 100
              </div>
              <div className="text-[10px] font-bold text-slate-400 mt-0.5">{results.riskStatus}</div>
            </div>
          </div>

          {/* Side-by-Side Radar Chart & Impact Analysis */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-xs text-white mb-2">Multi-Variable Stress Radar (Baseline vs Simulated)</h4>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                    <PolarRadiusAxis stroke="#334155" fontSize={9} />
                    <Radar name="Baseline" dataKey="Baseline" stroke="#64748b" fill="#64748b" fillOpacity={0.3} />
                    <Radar name="Simulated" dataKey="Simulated" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xs text-white mb-2">Simulated Operational Stress Breakdown</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-amber-400" /> Employee Workload Stress</span>
                    <span className="font-mono font-bold text-slate-200">{results.employeeStress}%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-rose-400" /> Machine OEE Stress</span>
                    <span className="font-mono font-bold text-slate-200">{results.machineStress}%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-blue-400" /> Delivery SLA Delay Risk</span>
                    <span className="font-mono font-bold text-slate-200">{results.deliveryDelayRisk}%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-emerald-400" /> Carbon Footprint Impact</span>
                    <span className="font-mono font-bold text-slate-200">{results.carbonTons} Tons CO2</span>
                  </div>
                </div>
              </div>

              {/* Rationale & Recommendation Box */}
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs space-y-1">
                <span className="font-bold text-blue-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Digital Twin Rationale
                </span>
                <p className="text-blue-200 leading-relaxed text-[11px]">
                  {results.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
