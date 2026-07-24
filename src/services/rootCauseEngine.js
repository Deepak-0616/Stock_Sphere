// Explainable AI & Root Cause Analysis Engine

export class RootCauseEngine {
  static getRootCauseTree(anomalyId = 'anomaly-production') {
    const anomalies = {
      'anomaly-production': {
        id: 'anomaly-production',
        title: 'CNC Machine #4 Spindle Bearing Vibration Anomaly',
        department: 'Manufacturing & Production',
        detectedBy: 'Production Agent (Telemetry Sensor #4B)',
        confidenceScore: 94.8,
        riskScore: 84,
        severity: 'HIGH',
        whatHappened: 'Vibration frequency on Spindle 4 exceeded safety threshold (8.4mm/s vs 2.1mm/s standard limit).',
        whyItHappened: 'High-speed continuous milling without lubricative cooling flush during emergency double shift on July 21.',
        whoCausedIt: 'Plant Maintenance Schedule Lag + Overtime Shift 2 Duty Overload.',
        businessImpact: 'Unscheduled failure during active batch will ruin 240 precision server chassis (Loss: ₹45,00,000).',
        financialImpact: '₹45,00,000 Scrap Material & Plant Stoppage vs ₹2,10,000 Preventive Maintenance Cost.',
        evidence: [
          'Vibration Sensor Telemetry Log: 8.4 mm/s RMS at 10,000 RPM',
          'Temperature Probe #4: Spike to 92°C (Norm: 65°C)',
          'Shift 2 Overtime Log: Machine operated 22.5 hours continuously without 30-min cool-down cycle'
        ],
        rootCauseHierarchy: {
          symptom: 'CNC Unit #4 Spindle Noise & Vibration Anomaly',
          immediateCause: 'Spindle ball bearing race micro-fracture & thermal breakdown',
          underlyingCause: 'Lubricant pressure dropped by 18% during double shift peak load',
          systemicCause: 'Preventive maintenance schedule delay due to Q3 order volume acceleration'
        },
        recommendedAction: 'Schedule 4-hour maintenance window tonight between 2:00 AM - 6:00 AM. Replace bearing assembly using buffer parts in Stock Bay 4.',
        alternativeActions: [
          'Reduce CNC Machine #4 spindle speed by 40% (Extends life 48h, but reduces yield by 25%)',
          'Reroute batch to Plant 2 in Pune (Incurs ₹1.8L transport cost + 12h logistics delay)'
        ],
        expectedSavings: '₹42,90,00,00 net risk mitigation'
      },
      'anomaly-inventory': {
        id: 'anomaly-inventory',
        title: 'Microchip X402 Rapid Inventory Depletion Rate',
        department: 'Inventory & Warehousing',
        detectedBy: 'Inventory Agent',
        confidenceScore: 96.2,
        riskScore: 78,
        severity: 'HIGH',
        whatHappened: 'Warehouse West-3 Microchip X402 stock dropped from 1,200 units to 120 units in 48 hours.',
        whyItHappened: 'Sales team secured unannounced TechCorp rush order while Supplier Alpha experienced port shipment delay.',
        whoCausedIt: 'Sales-to-Supply Chain Communication Gap + Vendor Shipping Bottleneck.',
        businessImpact: 'Risk of line 2 stoppage & contract SLA penalty of ₹8,50,000.',
        financialImpact: '₹8,50,000 SLA Penalty + ₹12,00,000 Idle Plant Capacity Cost.',
        evidence: [
          'Warehouse Stock Log: 120 units remaining',
          'TechCorp Order Manifest: 1,200 units demanded within 72 hrs',
          'Port Kaohsiung Shipping Tracking: Vessel delayed 5 days'
        ],
        rootCauseHierarchy: {
          symptom: 'Stockout risk on Microchip X402',
          immediateCause: 'Rush requisition of 800 units for Plant Bengaluru Line 2',
          underlyingCause: 'Primary Taiwan supplier lead time expanded from 7d to 14d',
          systemicCause: 'Single-source dependency for high-density component X402'
        },
        recommendedAction: 'Execute emergency procurement of 1,500 units from Backup Supplier Beta (Air freight 24h).',
        alternativeActions: [
          'Borrow 400 units from Hyderabad Subsidiary Plant (Arrives in 36h)',
          'Negotiate 2-day delivery extension with TechCorp (5% SLA penalty)'
        ],
        expectedSavings: '₹8,50,000 SLA penalty avoided'
      }
    };

    return anomalies[anomalyId] || anomalies['anomaly-production'];
  }
}
