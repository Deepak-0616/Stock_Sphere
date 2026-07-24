// Digital Twin & Decision Simulator Math Engine

export class SimulationEngine {
  static runSimulation(params = {}) {
    const {
      productionDelta = 0, // e.g. +30 (%)
      budgetDelta = 0,     // e.g. -10 (%)
      rawMaterialCostDelta = 0, // e.g. +5 (%)
      laborShiftDelta = 0, // e.g. +15 (%)
      supplierDelayDays = 0, // e.g. 3 (days)
      machineDowntimeHours = 0 // e.g. 4 (hours)
    } = params;

    // Baseline enterprise parameters
    const baseRevenue = 42.85; // Cr
    const baseProfitMargin = 24.2; // %
    const baseInventoryDays = 14; // days
    const baseEmployeeStress = 68; // %
    const baseMachineStress = 72; // %
    const baseDeliveryDelayRisk = 4.2; // %
    const baseCarbonTons = 1420; // tons
    const baseRiskIndex = 24; // 0-100

    // Calculated metrics
    const revMultiplier = 1 + (productionDelta * 0.015) - (supplierDelayDays * 0.02) - (machineDowntimeHours * 0.008);
    const simulatedRevenue = Math.max(10, baseRevenue * revMultiplier);

    const costMultiplier = 1 + (rawMaterialCostDelta * 0.012) + (laborShiftDelta * 0.008) + (budgetDelta < 0 ? Math.abs(budgetDelta) * 0.005 : -budgetDelta * 0.003);
    const simulatedMargin = Math.max(2, baseProfitMargin * (1 / costMultiplier) + (productionDelta > 20 ? 1.8 : 0));

    const simulatedInventoryDays = Math.max(2, baseInventoryDays - (productionDelta * 0.25) + (supplierDelayDays * 1.5));
    const simulatedEmployeeStress = Math.min(99, Math.max(20, baseEmployeeStress + (productionDelta * 0.8) + (laborShiftDelta * 0.5) - (budgetDelta > 0 ? 5 : 0)));
    const simulatedMachineStress = Math.min(99, Math.max(30, baseMachineStress + (productionDelta * 0.95) + (machineDowntimeHours * 2.2)));
    const simulatedDeliveryDelay = Math.min(95, Math.max(1, baseDeliveryDelayRisk + (supplierDelayDays * 6.5) + (productionDelta > 25 ? 8 : 0)));
    const simulatedCarbon = Math.round(baseCarbonTons * (1 + (productionDelta * 0.008)));

    const simulatedRiskIndex = Math.min(98, Math.max(5, 
      baseRiskIndex + 
      (productionDelta > 30 ? 18 : productionDelta * 0.4) + 
      (supplierDelayDays * 8) + 
      (machineDowntimeHours * 3.5) + 
      (simulatedEmployeeStress > 85 ? 15 : 0)
    ));

    const simulatedROI = Number(((simulatedRevenue - baseRevenue) / (baseRevenue * 0.15) * 100).toFixed(1));

    // Recommendations Rationale
    let recommendation = "Baseline operating parameters are optimal.";
    let riskStatus = "SAFE";

    if (simulatedRiskIndex > 70) {
      riskStatus = "CRITICAL RISK";
      recommendation = "HIGH EXPOSURE: Production increase will overload machine bearings and trigger delivery SLA failure. Recommend deploying Backup Supplier Beta and adding Shift-3 buffer.";
    } else if (simulatedRiskIndex > 45) {
      riskStatus = "MODERATE RISK";
      recommendation = "WARNING: Increased component depletion detected. Recommend releasing emergency inventory buffer and monitoring Shift-2 fatigue.";
    } else if (productionDelta > 15) {
      riskStatus = "OPTIMAL EXPANSION";
      recommendation = "EXCELLENT ROI: Enterprise revenue projected to grow by +" + ((revMultiplier - 1) * 100).toFixed(1) + "%. Approve raw material pre-allocation.";
    }

    return {
      revenue: simulatedRevenue.toFixed(2),
      revenueDelta: ((simulatedRevenue - baseRevenue) / baseRevenue * 100).toFixed(1),
      profitMargin: simulatedMargin.toFixed(1),
      profitDelta: (simulatedMargin - baseProfitMargin).toFixed(1),
      inventoryDaysRemaining: Math.round(simulatedInventoryDays),
      employeeStress: Math.round(simulatedEmployeeStress),
      machineStress: Math.round(simulatedMachineStress),
      deliveryDelayRisk: simulatedDeliveryDelay.toFixed(1),
      carbonTons: simulatedCarbon,
      riskIndex: Math.round(simulatedRiskIndex),
      roi: simulatedROI,
      riskStatus,
      recommendation
    };
  }

  static getPresets() {
    return [
      {
        id: 'p-surge',
        title: '30% Demand & Production Surge',
        description: 'Simulate TechCorp Q3 surge effect across plant lines, supplier lead times, and employee shifts.',
        params: { productionDelta: 30, budgetDelta: 10, rawMaterialCostDelta: 4, laborShiftDelta: 20, supplierDelayDays: 1, machineDowntimeHours: 0 }
      },
      {
        id: 'p-supplier-outage',
        title: 'Primary Vendor Port Congestion (5 Days)',
        description: 'Simulate Taiwan port delay impact on stock depletion, plant line 2 stoppage, and revenue risk.',
        params: { productionDelta: -10, budgetDelta: 0, rawMaterialCostDelta: 12, laborShiftDelta: 0, supplierDelayDays: 5, machineDowntimeHours: 2 }
      },
      {
        id: 'p-budget-cut',
        title: '15% Operational Cost Reduction',
        description: 'Simulate department budget trimming impact on talent retention, maintenance quality, and yield.',
        params: { productionDelta: -5, budgetDelta: -15, rawMaterialCostDelta: -2, laborShiftDelta: -10, supplierDelayDays: 0, machineDowntimeHours: 0 }
      },
      {
        id: 'p-machine-breakdown',
        title: 'CNC Unit #4 Spindle Failure (12 hrs)',
        description: 'Simulate unexpected plant equipment outage, yield drop, and emergency dispatch costs.',
        params: { productionDelta: -15, budgetDelta: 5, rawMaterialCostDelta: 0, laborShiftDelta: 10, supplierDelayDays: 0, machineDowntimeHours: 12 }
      }
    ];
  }
}
