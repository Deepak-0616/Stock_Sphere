// Live Synthetic Telemetry Stream Generator Service

class TelemetryStreamService {
  constructor() {
    this.subscribers = [];
    this.intervalId = null;
    this.isStreaming = true;
    this.tickInterval = 2000; // 2 seconds per tick

    // Base state that fluctuates dynamically
    this.state = {
      enterpriseHealth: 88,
      annualRevenue: 428500000, // ₹42.85 Cr
      annualRevenueGrowth: 14.8,
      netProfitMargin: 24.2,
      aiSavingsMonthly: 12450000, // ₹1.24 Cr
      aiSavingsCount: 142,
      aiConfidence: 94.6,
      cncVibration: 4.2, // mm/s
      cncTemp: 58.4, // °C
      microchipStock: 120, // units
      warehouseCapacity: 84.5, // %
      activeTrucks: 18,
      lastTickTime: new Date().toLocaleTimeString(),
      recentEvent: null,
      telemetryHistory: [
        { time: '08:00', revenue: 26, efficiency: 74 },
        { time: '10:00', revenue: 29, efficiency: 78 },
        { time: '12:00', revenue: 28, efficiency: 75 },
        { time: '14:00', revenue: 34, efficiency: 82 },
        { time: '16:00', revenue: 38, efficiency: 80 },
        { time: '18:00', revenue: 42, efficiency: 86 }
      ]
    };

    this.startStream();
  }

  startStream() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.isStreaming = true;
    this.intervalId = setInterval(() => this.tick(), this.tickInterval);
  }

  pauseStream() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
    this.isStreaming = false;
    this.notifySubscribers();
  }

  setSpeed(ms) {
    this.tickInterval = ms;
    if (this.isStreaming) {
      this.startStream();
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    callback(this.state);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(cb => cb(this.state));
  }

  tick() {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Slight realistic random walk fluctuations
    const healthDelta = (Math.random() - 0.48) * 0.4;
    const revDelta = Math.floor((Math.random() - 0.45) * 45000);
    const profitDelta = (Math.random() - 0.48) * 0.1;
    const cncDelta = (Math.random() - 0.49) * 0.15;

    this.state = {
      ...this.state,
      lastTickTime: timeStr,
      enterpriseHealth: Math.min(99, Math.max(60, Number((this.state.enterpriseHealth + healthDelta).toFixed(1)))),
      annualRevenue: Math.max(400000000, this.state.annualRevenue + revDelta),
      netProfitMargin: Number((Math.min(35, Math.max(15, this.state.netProfitMargin + profitDelta))).toFixed(1)),
      cncVibration: Number((Math.min(12, Math.max(1.5, this.state.cncVibration + cncDelta))).toFixed(2)),
      cncTemp: Number((Math.min(85, Math.max(45, this.state.cncTemp + (Math.random() - 0.48) * 0.3))).toFixed(1))
    };

    // Periodically append to telemetry history graph
    const lastPoint = this.state.telemetryHistory[this.state.telemetryHistory.length - 1];
    const newEfficiency = Math.min(98, Math.max(50, Math.round(lastPoint.efficiency + (Math.random() - 0.48) * 3)));
    const newRevenue = Math.min(60, Math.max(20, Math.round(lastPoint.revenue + (Math.random() - 0.45) * 2)));

    // Keep history sliding window of 6 points
    const updatedHistory = [...this.state.telemetryHistory.slice(1), { time: timeStr.slice(0, 5), revenue: newRevenue, efficiency: newEfficiency }];
    this.state.telemetryHistory = updatedHistory;

    this.notifySubscribers();
  }

  // Inject user risk scenarios
  injectScenario(scenarioType) {
    const timeStr = new Date().toLocaleTimeString();

    if (scenarioType === 'microchip_drop') {
      this.state = {
        ...this.state,
        microchipStock: 45,
        enterpriseHealth: 74.2,
        recentEvent: {
          title: 'ALERT: Microchip X402 Critical Stock Deficit',
          impact: 'Inventory dropped to 45 units. Line stoppage risk in 6 hrs.',
          timestamp: timeStr
        }
      };
    } else if (scenarioType === 'cnc_vibration') {
      this.state = {
        ...this.state,
        cncVibration: 9.8,
        cncTemp: 82.1,
        enterpriseHealth: 68.5,
        recentEvent: {
          title: 'ALERT: CNC Milling Unit #4 Bearing Anomaly',
          impact: 'Vibration reached 9.8 mm/s (Threshold: 6.0 mm/s).',
          timestamp: timeStr
        }
      };
    } else if (scenarioType === 'supplier_delay') {
      this.state = {
        ...this.state,
        enterpriseHealth: 79.0,
        recentEvent: {
          title: 'ALERT: Kaohsiung Port Typhoon Delay',
          impact: 'Supplier Alpha shipment delayed by +5 days.',
          timestamp: timeStr
        }
      };
    } else if (scenarioType === 'reset') {
      this.state = {
        ...this.state,
        enterpriseHealth: 88.0,
        cncVibration: 4.2,
        cncTemp: 58.4,
        microchipStock: 120,
        recentEvent: null
      };
    }

    this.notifySubscribers();
  }
}

export const telemetryStream = new TelemetryStreamService();
