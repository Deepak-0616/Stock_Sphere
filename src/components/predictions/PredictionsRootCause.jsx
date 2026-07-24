import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Workflow
} from 'lucide-react';

const ANOMALIES_DATA = [
  {
    id: 'anomaly-1',
    title: 'CNC Unit #4 Spindle Bearing Failure',
    detectedBy: 'Production Agent + IoT Vibration Sensor #402',
    confidenceScore: 94,
    riskScore: 84,
    rootCauseHierarchy: {
      surfaceSymptom: 'Spindle bearing vibration elevated to 8.4mm/s (threshold 5.0mm/s).',
      intermediateTrigger: 'Missed scheduled lubrication cycle #402 due to overtime shift strain.',
      underlyingCause: 'Sub-optimal preventive maintenance schedule logic in legacy ERP.'
    },
    recommendationText: 'Schedule immediate 4-hour preventive bearing replacement during low-demand 2:00 AM shift. Prevent ₹45,00,000 in unscheduled downtime & scrap loss.',
    financialImpact: '₹45,00,000 Saved'
  },
  {
    id: 'anomaly-2',
    title: 'Microchip X402 Stockout & Shipment Delay',
    detectedBy: 'Inventory Agent + Supplier Network Feed',
    confidenceScore: 96,
    riskScore: 92,
    rootCauseHierarchy: {
      surfaceSymptom: 'Warehouse West-3 inventory depleting 18% faster than baseline.',
      intermediateTrigger: 'Supplier Alpha shipment delayed 5 days due to Kaohsiung port congestion.',
      underlyingCause: 'Single-source procurement dependency on Taiwan maritime lane.'
    },
    recommendationText: 'Approve 1-click emergency purchase order of 1,500 units from domestic Supplier Beta via express air-freight.',
    financialImpact: '₹8,50,000 Saved'
  }
];

export const PredictionsRootCause = ({ setActiveTab }) => {
  const [selectedAnomaly, setSelectedAnomaly] = useState(ANOMALIES_DATA[0].id);

  const predictionsList = [
    {
      id: 1,
      title: 'CNC Unit #4 Spindle Bearing Failure',
      category: 'Production',
      probability: '84%',
      timeframe: 'Within 72 Hours',
      severity: 'HIGH',
      anomalyId: ANOMALIES_DATA[0].id
    },
    {
      id: 2,
      title: 'Microchip X402 Stockout & Shipment Delay',
      category: 'Inventory & Supply Chain',
      probability: '92%',
      timeframe: 'Within 48 Hours',
      severity: 'CRITICAL',
      anomalyId: ANOMALIES_DATA[1].id
    }
  ];

  const rootCauseData = ANOMALIES_DATA.find(a => a.id === selectedAnomaly) || ANOMALIES_DATA[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Explainable AI & Causality Engine
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Predictions & Root Cause Analysis</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            StockSphere doesn't just predict breakdown — it traces exact root cause trees down to underlying systemic triggers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Active Forecast Models</div>
            <div className="text-base font-extrabold text-[#10B981]">10 / 10</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Explainability Rating</div>
            <div className="text-base font-extrabold text-[#84CC16]">100% Transparent</div>
          </div>
        </div>
      </div>

      {/* Grid: Forecasted Risk List vs Deep Root Cause Explainability Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Forecasted Predictions Cards */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#FAFAFA] flex items-center justify-between">
            <span>Forecasted Enterprise Risks</span>
            <span className="text-xs text-[#A3A3A3] font-normal">Select to Explain</span>
          </h3>

          <div className="space-y-2">
            {predictionsList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedAnomaly(item.anomalyId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedAnomaly === item.anomalyId 
                    ? 'bg-rose-950/30 border-rose-500/50 shadow-lg shadow-rose-950/40' 
                    : 'bg-[#1A1A1A] border-[#2E2E2E] hover:border-[#059669]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-wider">{item.category}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-400">
                    {item.severity} SEVERITY
                  </span>
                </div>

                <h4 className="font-bold text-sm text-[#FAFAFA] mt-1">{item.title}</h4>

                <div className="mt-3 pt-2 border-t border-[#2E2E2E] flex items-center justify-between text-xs">
                  <span className="text-[#A3A3A3]">Probability: <strong className="text-rose-400">{item.probability}</strong></span>
                  <span className="text-[#A3A3A3]">Timeframe: <strong className="text-[#FAFAFA]">{item.timeframe}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center & Right 2 Cols: Deep Root Cause Explainability Tree */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-5">
            {/* Title & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#2E2E2E] gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-400">Explainable AI Root Cause Report</span>
                <h3 className="font-extrabold text-lg text-[#FAFAFA]">{rootCauseData.title}</h3>
                <p className="text-xs text-[#A3A3A3] mt-0.5">Detected by {rootCauseData.detectedBy}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#059669]/20 text-[#10B981] text-xs font-mono font-bold border border-[#059669]/40">
                  Confidence: {rootCauseData.confidenceScore}%
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-mono font-bold border border-rose-500/30">
                  Risk Score: {rootCauseData.riskScore}/100
                </span>
              </div>
            </div>

            {/* Causality Hierarchy Breakdown */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-3">
              <h4 className="font-bold text-xs text-[#FAFAFA] uppercase tracking-wider flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#059669]" />
                Systemic Causality Tree (3-Tier Hierarchy)
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-[#A3A3A3]">
                  <strong className="text-[#FAFAFA]">1. Surface Symptom:</strong> {rootCauseData.rootCauseHierarchy.surfaceSymptom}
                </div>
                <div className="p-2.5 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-[#A3A3A3]">
                  <strong className="text-amber-400">2. Intermediate Failure:</strong> {rootCauseData.rootCauseHierarchy.intermediateTrigger}
                </div>
                <div className="p-2.5 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-[#A3A3A3]">
                  <strong className="text-[#10B981]">3. Underlying Cause:</strong> {rootCauseData.rootCauseHierarchy.underlyingCause}
                </div>
              </div>
            </div>

            {/* AI Prescriptive Recommendation & One-Click Execution */}
            <div className="p-4 rounded-xl bg-[#059669]/10 border border-[#059669]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#10B981] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" /> Prescriptive AI Action Plan
                </span>
                <span className="text-[10px] text-[#A3A3A3] font-mono">1-Click Execution</span>
              </div>

              <p className="text-xs text-[#FAFAFA] leading-relaxed">
                {rootCauseData.recommendationText}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#059669]/30">
                <span className="text-xs text-[#10B981] font-bold">Estimated Cost Prevention: {rootCauseData.financialImpact}</span>
                <button
                  onClick={() => setActiveTab && setActiveTab('automation')}
                  className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Approve Fix Now</span>
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

export default PredictionsRootCause;
