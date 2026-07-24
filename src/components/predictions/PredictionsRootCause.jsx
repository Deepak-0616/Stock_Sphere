import React, { useState } from 'react';
import { RootCauseEngine } from '../../services/rootCauseEngine';
import { 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  Brain, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  Activity,
  Cpu,
  Package
} from 'lucide-react';

export const PredictionsRootCause = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState('anomaly-production');
  const rootCauseData = RootCauseEngine.getRootCauseTree(selectedAnomaly);

  const predictionsList = [
    { id: 'p-1', title: 'CNC Machine #4 Failure', probability: '84%', timeframe: '72 Hours', severity: 'HIGH', category: 'Production Bottleneck', anomalyId: 'anomaly-production' },
    { id: 'p-2', title: 'Microchip X402 Stockout', probability: '96%', timeframe: '36 Hours', severity: 'CRITICAL', category: 'Inventory Shortage', anomalyId: 'anomaly-inventory' },
    { id: 'p-3', title: 'TechCorp Account Churn Risk', probability: '18%', timeframe: '30 Days', severity: 'MODERATE', category: 'Customer Churn', anomalyId: 'anomaly-inventory' },
    { id: 'p-4', title: 'Plant Shift-2 Burnout Load', probability: '72%', timeframe: '7 Days', severity: 'MODERATE', category: 'Employee Shortage', anomalyId: 'anomaly-production' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Explainable AI & Risk Forecasting
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Predictions & Root Cause Engine</h1>
          <p className="text-xs text-slate-400 mt-1">
            Predict business risks before losses occur and trace every recommendation down to systemic root causes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Forecast Models</div>
            <div className="text-base font-extrabold text-emerald-400">10 / 10</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Explainability Rating</div>
            <div className="text-base font-extrabold text-blue-400">100% Transparent</div>
          </div>
        </div>
      </div>

      {/* Grid: Forecasted Risk List vs Deep Root Cause Explainability Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Forecasted Predictions Cards */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center justify-between">
            <span>Forecasted Enterprise Risks</span>
            <span className="text-xs text-slate-400 font-normal">Select to Explain</span>
          </h3>

          <div className="space-y-2">
            {predictionsList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedAnomaly(item.anomalyId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedAnomaly === item.anomalyId 
                    ? 'bg-rose-950/30 border-rose-500/50 shadow-lg shadow-rose-500/10' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-400">
                    {item.severity} SEVERITY
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white mt-1">{item.title}</h4>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Probability: <strong className="text-rose-400">{item.probability}</strong></span>
                  <span className="text-slate-400">Timeframe: <strong className="text-slate-200">{item.timeframe}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center & Right 2 Cols: Deep Root Cause Explainability Tree */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            {/* Title & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-400">Explainable AI Root Cause Report</span>
                <h3 className="font-extrabold text-lg text-white">{rootCauseData.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Detected by {rootCauseData.detectedBy}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30">
                  Confidence: {rootCauseData.confidenceScore}%
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-mono font-bold border border-rose-500/30">
                  Risk Score: {rootCauseData.riskScore}/100
                </span>
              </div>
            </div>

            {/* Structured Root Cause Answers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">What Happened?</span>
                <p className="text-slate-200 leading-relaxed">{rootCauseData.whatHappened}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Why It Happened?</span>
                <p className="text-slate-200 leading-relaxed">{rootCauseData.whyItHappened}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Who / Upstream Cause</span>
                <p className="text-amber-400 font-semibold leading-relaxed">{rootCauseData.whoCausedIt}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Financial & Business Impact</span>
                <p className="text-rose-400 font-bold leading-relaxed">{rootCauseData.financialImpact}</p>
              </div>
            </div>

            {/* Root Cause Causality Hierarchy */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-purple-400">Systemic Causality Tree</span>
              
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  <strong className="text-rose-400">1. Symptom:</strong> {rootCauseData.rootCauseHierarchy.symptom}
                </div>
                <div className="p-2 rounded bg-slate-900 text-slate-300 border border-slate-800 pl-4">
                  <strong className="text-amber-400">2. Immediate Cause:</strong> {rootCauseData.rootCauseHierarchy.immediateCause}
                </div>
                <div className="p-2 rounded bg-slate-900 text-slate-300 border border-slate-800 pl-6">
                  <strong className="text-blue-400">3. Underlying Cause:</strong> {rootCauseData.rootCauseHierarchy.underlyingCause}
                </div>
                <div className="p-2 rounded bg-slate-900 text-slate-300 border border-slate-800 pl-8">
                  <strong className="text-purple-400">4. Systemic Root Cause:</strong> {rootCauseData.rootCauseHierarchy.systemicCause}
                </div>
              </div>
            </div>

            {/* Recommended Action vs Alternatives */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Recommended Mitigation Action
                </span>
                <span className="text-xs font-bold text-emerald-400">{rootCauseData.expectedSavings}</span>
              </div>

              <p className="text-xs text-emerald-200 font-medium leading-relaxed">
                {rootCauseData.recommendedAction}
              </p>

              <div className="pt-2 border-t border-emerald-900/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Alternative Options</span>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                  {rootCauseData.alternativeActions.map((alt, idx) => (
                    <li key={idx}>{alt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
