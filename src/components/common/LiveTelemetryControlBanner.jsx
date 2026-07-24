import React, { useState, useEffect } from 'react';
import { telemetryStream } from '../../services/telemetryStreamService';
import { 
  Activity, 
  Play, 
  Pause, 
  AlertTriangle, 
  RefreshCw, 
  Zap, 
  Flame, 
  Layers 
} from 'lucide-react';

export const LiveTelemetryControlBanner = () => {
  const [telemetry, setTelemetry] = useState(telemetryStream.state);
  const [isStreaming, setIsStreaming] = useState(telemetryStream.isStreaming);
  const [speed, setSpeed] = useState(2000);

  useEffect(() => {
    const unsubscribe = telemetryStream.subscribe((newState) => {
      setTelemetry({ ...newState });
      setIsStreaming(telemetryStream.isStreaming);
    });
    return unsubscribe;
  }, []);

  const toggleStream = () => {
    if (isStreaming) {
      telemetryStream.pauseStream();
    } else {
      telemetryStream.startStream();
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    telemetryStream.setSpeed(newSpeed);
  };

  return (
    <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-300">
      {/* Stream Status Indicator */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-[11px]">
          <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
          <span>{isStreaming ? 'LIVE TELEMETRY STREAM ACTIVE' : 'STREAM PAUSED'}</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
          Tick: {telemetry.lastTickTime}
        </span>
      </div>

      {/* Inject Scenario Trigger Controls */}
      <div className="flex items-center gap-2 overflow-x-auto py-0.5">
        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Inject Live Scenario:</span>
        
        <button
          onClick={() => telemetryStream.injectScenario('microchip_drop')}
          className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-[11px] font-semibold transition-colors shrink-0 flex items-center gap-1"
        >
          <AlertTriangle className="w-3 h-3" /> Stock Shortage
        </button>

        <button
          onClick={() => telemetryStream.injectScenario('cnc_vibration')}
          className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-[11px] font-semibold transition-colors shrink-0 flex items-center gap-1"
        >
          <Flame className="w-3 h-3" /> CNC Anomaly
        </button>

        <button
          onClick={() => telemetryStream.injectScenario('supplier_delay')}
          className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-[11px] font-semibold transition-colors shrink-0 flex items-center gap-1"
        >
          <Zap className="w-3 h-3" /> Vendor Typhoon
        </button>

        <button
          onClick={() => telemetryStream.injectScenario('reset')}
          className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-[11px] font-semibold transition-colors shrink-0"
        >
          Reset Telemetry
        </button>
      </div>

      {/* Play/Pause & Speed Selectors */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 font-mono text-[10px]">
          <button
            onClick={() => handleSpeedChange(1000)}
            className={`px-1.5 py-0.5 rounded ${speed === 1000 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}
          >
            1s
          </button>
          <button
            onClick={() => handleSpeedChange(2000)}
            className={`px-1.5 py-0.5 rounded ${speed === 2000 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}
          >
            2s
          </button>
          <button
            onClick={() => handleSpeedChange(5000)}
            className={`px-1.5 py-0.5 rounded ${speed === 5000 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'}`}
          >
            5s
          </button>
        </div>

        <button
          onClick={toggleStream}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          title={isStreaming ? 'Pause Telemetry Stream' : 'Resume Telemetry Stream'}
        >
          {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>
      </div>
    </div>
  );
};

export default LiveTelemetryControlBanner;
