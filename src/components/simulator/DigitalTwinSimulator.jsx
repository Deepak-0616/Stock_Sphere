import React, { useState } from 'react';
import { 
  Layers, 
  RotateCcw, 
  Play, 
  Sliders, 
  TrendingUp, 
  DollarSign, 
  Truck, 
  ShieldCheck
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip 
} from 'recharts';

export const DigitalTwinSimulator = () => {
  const [params, setParams] = useState({
    productionDelta: 20,
    freightSpeed: 'express', // standard, express, air
    supplierRiskFactor: 15,
    rawMaterialPriceShift: -5
  });

  const calculateSimulation = () => {
    const revenueShift = (params.productionDelta * 0.8) - (params.rawMaterialPriceShift * 0.4);
    const costShift = (params.freightSpeed === 'air' ? 12 : params.freightSpeed === 'express' ? 4 : 0) + (params.rawMaterialPriceShift * 0.6);
    const netMarginImpact = revenueShift - costShift;

    return {
      revenueImpact: revenueShift.toFixed(1),
      netMarginImpact: netMarginImpact.toFixed(1),
      slaRisk: Math.max(5, 35 - (params.freightSpeed === 'air' ? 25 : params.freightSpeed === 'express' ? 15 : 0) + params.supplierRiskFactor),
      roi: (netMarginImpact * 12.5).toFixed(1)
    };
  };

  const results = calculateSimulation();

  const presets = [
    {
      id: 'express_mitigation',
      title: 'Air-Freight Microchip Supply Mitigation',
      description: 'Accelerate Microchip X402 delivery from Supplier Beta to avoid production line #4 stoppage.',
      params: { productionDelta: 25, freightSpeed: 'air', supplierRiskFactor: 5, rawMaterialPriceShift: 0 }
    },
    {
      id: 'cost_reduction',
      title: 'Aggressive Inventory Lean Strategy',
      description: 'Reduce safety stock buffers by 30% to maximize free cash flow.',
      params: { productionDelta: -10, freightSpeed: 'standard', supplierRiskFactor: 35, rawMaterialPriceShift: -12 }
    },
    {
      id: 'max_capacity',
      title: 'Q3 High Demand Surge Production',
      description: 'Run production lines 24/7 with overtime shifts.',
      params: { productionDelta: 50, freightSpeed: 'express', supplierRiskFactor: 20, rawMaterialPriceShift: 8 }
    }
  ];

  const applyPreset = (presetParams) => {
    setParams(presetParams);
  };

  const resetParams = () => {
    setParams({
      productionDelta: 0,
      freightSpeed: 'standard',
      supplierRiskFactor: 0,
      rawMaterialPriceShift: 0
    });
  };

  const radarData = [
    { metric: 'Revenue Gain', Baseline: 60, Simulated: Math.min(100, 60 + parseFloat(results.revenueImpact)) },
    { metric: 'Margin Stability', Baseline: 75, Simulated: Math.min(100, 75 + parseFloat(results.netMarginImpact)) },
    { metric: 'Delivery SLA Rate', Baseline: 80, Simulated: Math.min(100, 100 - results.slaRisk) },
    { metric: 'Supplier Reliability', Baseline: 70, Simulated: Math.min(100, 100 - params.supplierRiskFactor) },
    { metric: 'Cost Efficiency', Baseline: 65, Simulated: Math.min(100, 65 + parseFloat(results.roi) / 10) }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <Layers className="w-3.5 h-3.5" /> Virtual Enterprise Digital Twin
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Enterprise Decision Simulator</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Simulate "What If?" business decisions before committing capital or altering live production lines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={resetParams}
            className="px-3 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#2E2E2E] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Parameters
          </button>
        </div>
      </div>

      {/* Preset Scenarios Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {presets.map((preset) => (
          <div
            key={preset.id}
            onClick={() => applyPreset(preset.params)}
            className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#059669]/50 transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-[#FAFAFA] group-hover:text-[#10B981] flex items-center gap-1.5">
              <Play className="w-3 h-3 text-[#059669] fill-current" />
              <span>{preset.title}</span>
            </div>
            <p className="text-[11px] text-[#A3A3A3] mt-1 line-clamp-2">{preset.description}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Parameters Control Sliders vs Simulated Multi-Variable Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Scenario Sliders */}
        <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-4">
          <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center gap-2 pb-2 border-b border-[#2E2E2E]">
            <Sliders className="w-4 h-4 text-[#059669]" />
            Interactive Scenario Parameters
          </h3>

          {/* Slider 1: Production Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#A3A3A3]">Production Volume Change:</span>
              <span className={`font-mono font-bold ${params.productionDelta >= 0 ? 'text-[#10B981]' : 'text-rose-400'}`}>
                {params.productionDelta > 0 ? `+${params.productionDelta}%` : `${params.productionDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="100"
              value={params.productionDelta}
              onChange={(e) => setParams({ ...params, productionDelta: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer accent-[#059669]"
            />
          </div>

          {/* Selector 2: Logistics Freight Speed */}
          <div className="space-y-1.5">
            <span className="text-xs text-[#A3A3A3] block">Logistics Freight Speed:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {['standard', 'express', 'air'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setParams({ ...params, freightSpeed: mode })}
                  className={`py-1.5 text-xs rounded-lg font-bold capitalize transition-all cursor-pointer ${
                    params.freightSpeed === mode
                      ? 'bg-[#059669] text-white border border-[#059669]'
                      : 'bg-[#0A0A0A] text-[#A3A3A3] border border-[#2E2E2E] hover:text-[#FAFAFA]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 3: Supplier Delay Risk */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#A3A3A3]">Supplier Delay Risk Index:</span>
              <span className="font-mono font-bold text-amber-400">{params.supplierRiskFactor} / 50</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={params.supplierRiskFactor}
              onChange={(e) => setParams({ ...params, supplierRiskFactor: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Slider 4: Raw Material Cost Shift */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#A3A3A3]">Raw Material Price Shift:</span>
              <span className={`font-mono font-bold ${params.rawMaterialPriceShift <= 0 ? 'text-[#10B981]' : 'text-rose-400'}`}>
                {params.rawMaterialPriceShift > 0 ? `+${params.rawMaterialPriceShift}%` : `${params.rawMaterialPriceShift}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="30"
              value={params.rawMaterialPriceShift}
              onChange={(e) => setParams({ ...params, rawMaterialPriceShift: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer accent-[#059669]"
            />
          </div>
        </div>

        {/* Middle & Right 2 Cols: Simulation Results Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metric Scorecard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#A3A3A3]">Revenue Shift</span>
              <div className={`text-lg font-extrabold ${parseFloat(results.revenueImpact) >= 0 ? 'text-[#10B981]' : 'text-rose-400'}`}>
                {parseFloat(results.revenueImpact) >= 0 ? `+${results.revenueImpact}%` : `${results.revenueImpact}%`}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#A3A3A3]">Net Margin Impact</span>
              <div className={`text-lg font-extrabold ${parseFloat(results.netMarginImpact) >= 0 ? 'text-[#10B981]' : 'text-rose-400'}`}>
                {parseFloat(results.netMarginImpact) >= 0 ? `+${results.netMarginImpact}%` : `${results.netMarginImpact}%`}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#A3A3A3]">Delivery SLA Delay</span>
              <div className="text-lg font-extrabold text-amber-400">{results.slaRisk}% Risk</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#A3A3A3]">Simulated ROI</span>
              <div className="text-lg font-extrabold text-[#84CC16] mt-0.5">+{results.roi}%</div>
            </div>
          </div>

          {/* Simulated Multi-Variable Radar Chart */}
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-4">
            <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center justify-between">
              <span>Multi-Variable Performance Radar (Baseline vs Simulated)</span>
              <span className="text-xs text-[#10B981] font-mono">Real-time Mathematical Matrix</span>
            </h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#2E2E2E" />
                  <PolarAngleAxis dataKey="metric" stroke="#A3A3A3" fontSize={11} />
                  <PolarRadiusAxis stroke="#2E2E2E" fontSize={10} />
                  <Radar name="Baseline" dataKey="Baseline" stroke="#A3A3A3" fill="#A3A3A3" fillOpacity={0.2} />
                  <Radar name="Simulated" dataKey="Simulated" stroke="#059669" fill="#059669" fillOpacity={0.5} />
                  <Tooltip contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#2E2E2E', borderRadius: '0.5rem' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <span className="text-[#A3A3A3] flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-[#10B981]" /> Baseline vs Simulated Active</span>
                <span className="text-[#A3A3A3] flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-[#84CC16]" /> Delivery SLA Delay Risk</span>
              </div>
              <span className="font-mono text-[#10B981] font-bold">100% Mathematical Precision</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinSimulator;
