// Multi-Agent Collaboration Engine Service

import { AI_AGENTS, MULTI_AGENT_DEBATE_DEMO } from '../data/mockEnterpriseData';

// Session state storage for executed agent actions and logs
const agentActionLogs = {};
const agentCustomStates = {};

AI_AGENTS.forEach(agent => {
  agentActionLogs[agent.id] = [
    {
      id: `log-init-${agent.id}`,
      timestamp: '09:00:00 AM',
      action: 'Agent Initialization & Telemetry Sync',
      status: 'SUCCESS',
      impact: 'Connected to Enterprise Graph Node',
      details: `Initialized ${agent.name} with ${agent.confidence} base confidence score.`
    }
  ];
  agentCustomStates[agent.id] = {
    lastRun: '15 mins ago',
    activeCount: 1,
    status: agent.status,
    healthScore: agent.healthScore
  };
});

export class AgentEngine {
  static getAgents() {
    return AI_AGENTS.map(agent => ({
      ...agent,
      ...agentCustomStates[agent.id]
    }));
  }

  static getAgentById(id) {
    const base = AI_AGENTS.find(a => a.id === id);
    if (!base) return null;
    return {
      ...base,
      ...agentCustomStates[id]
    };
  }

  static getActiveDebate() {
    return MULTI_AGENT_DEBATE_DEMO;
  }

  static getAgentLogs(agentId) {
    return agentActionLogs[agentId] || [];
  }

  /**
   * Execute an individual agent's domain action synchronously or with simulated telemetry streaming
   */
  static async executeAgentTask(agentId, params = {}) {
    const agent = this.getAgentById(agentId);
    if (!agent) throw new Error(`Agent ${agentId} not found`);

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let result = {
      success: true,
      timestamp,
      steps: [],
      metrics: {},
      summary: '',
      impact: ''
    };

    switch (agentId) {
      case 'agent-inventory': {
        const sku = params.sku || 'Microcontroller X402';
        const qty = parseInt(params.qty || 1500, 10);
        const warehouse = params.warehouse || 'Warehouse West-3 (Mumbai)';
        
        result.steps = [
          `[1/4] Querying real-time stock levels for ${sku} in ${warehouse}...`,
          `[2/4] Detecting safety stock deficit: Current stock is 120 units (Reorder threshold: 500).`,
          `[3/4] Transmitting automated Purchase Order for +${qty} units to Procurement Queue.`,
          `[4/4] Warehouse West-3 inventory re-balanced. Prevented estimated 48hr line stoppage.`
        ];
        result.summary = `Re-ordered +${qty} units of ${sku} for ${warehouse}.`;
        result.impact = `+₹45,00,000 Production Loss Saved`;
        result.metrics = {
          newStockLevel: 120 + qty,
          reorderStatus: 'TRANSMITTED',
          leadTime: '22 Hours'
        };
        break;
      }

      case 'agent-sales': {
        const dealName = params.dealName || 'TechCorp Enterprise Server Expansion';
        const dealValue = params.dealValue || '₹3.4 Cr';
        
        result.steps = [
          `[1/4] Ingesting deal pipeline metrics for "${dealName}" (${dealValue})...`,
          `[2/4] Evaluating client order urgency vs. current manufacturing capacity...`,
          `[3/4] Triggering priority allocation alert to Production & Inventory Agents...`,
          `[4/4] Deal velocity accelerated. SLA delivery commitment updated to 5 business days.`
        ];
        result.summary = `Accelerated pipeline velocity for ${dealName} (${dealValue}).`;
        result.impact = `+18.4% Revenue Growth Pipeline`;
        result.metrics = {
          winProbability: '96%',
          allocatedLine: 'Plant 1 - Line 2',
          slaTarget: '5 Days'
        };
        break;
      }

      case 'agent-finance': {
        const supplier = params.supplier || 'Supplier Alpha (Taiwan)';
        const amount = params.amount || '₹85,00,000';
        const discount = params.discount || '3.5%';
        
        result.steps = [
          `[1/4] Auditing corporate treasury liquid reserve (Current: ₹14.2 Cr)...`,
          `[2/4] Verifying early invoice payment terms for ${supplier} (${amount})...`,
          `[3/4] Calculating net discount yield at ${discount}...`,
          `[4/4] Automated early settlement executed. Reclaimed prompt vendor rebate.`
        ];
        result.summary = `Executed early payment of ${amount} to ${supplier} at ${discount} rebate.`;
        result.impact = `+₹28,50,000 Direct Cash Rebate`;
        result.metrics = {
          remainingBuffer: '₹13.35 Cr',
          rebateYield: '3.5%',
          treasuryScore: '98%'
        };
        break;
      }

      case 'agent-production': {
        const machine = params.machine || 'CNC Milling Unit #4';
        const vibration = params.vibration || '8.4 mm/s';
        
        result.steps = [
          `[1/4] Ingesting IoT vibration & thermal telemetry from ${machine}...`,
          `[2/4] Anomaly detected: Vibration at ${vibration} exceeds safety limit (6.0 mm/s).`,
          `[3/4] Running bearing failure probability model: 84% failure likelihood within 72 hrs.`,
          `[4/4] Scheduled 4-hr preventive maintenance window during low-demand night shift.`
        ];
        result.summary = `Scheduled preventive spindle overhaul for ${machine}.`;
        result.impact = `Avoided ₹60,00,000 Catastrophic Downtime`;
        result.metrics = {
          vibrationAfterService: '2.1 mm/s',
          scheduledShift: 'Night Shift (02:00 AM)',
          oeeScore: '89.5%'
        };
        agentCustomStates[agentId].healthScore = 92;
        agentCustomStates[agentId].status = 'ACTIVE';
        break;
      }

      case 'agent-supplier': {
        const primaryVendor = params.primaryVendor || 'Supplier Alpha (Kaohsiung Port)';
        const backupVendor = params.backupVendor || 'Supplier Beta (Domestic Direct)';
        
        result.steps = [
          `[1/4] Auditing tier-1 vendor delivery SLA compliance...`,
          `[2/4] Port congestion detected at ${primaryVendor}: Shipping delay +5 days.`,
          `[3/4] Scanning alternative vendor network: ${backupVendor} has 1,500 units in stock.`,
          `[4/4] Automated purchase reroute initiated. Subscribed to express air-freight transit.`
        ];
        result.summary = `Rerouted orders from ${primaryVendor} to ${backupVendor}.`;
        result.impact = `Reduced Supply Delay by 4 Days`;
        result.metrics = {
          newLeadTime: '24 Hours',
          slaAdherence: '98%',
          vendorStatus: 'BACKUP_ACTIVE'
        };
        break;
      }

      case 'agent-logistics': {
        const corridor = params.corridor || 'Route NH-48 (Bengaluru - Mumbai)';
        const alternate = params.alternate || 'Highway 52 Direct Bypass';
        
        result.steps = [
          `[1/4] Fetching satellite monsoon weather & traffic telemetry for ${corridor}...`,
          `[2/4] Severe flooding risk detected on NH-48. Transit delay calculated at +14 hours.`,
          `[3/4] Recalculating route topology via ${alternate}...`,
          `[4/4] Dispatched dynamic GPS reroute to 18 active freight trucks.`
        ];
        result.summary = `Rerouted 18 freight trucks to ${alternate}.`;
        result.impact = `-8 Hours Transit Lag / ₹1.2L Fuel Saved`;
        result.metrics = {
          transitSaved: '8 Hours',
          fuelEfficiency: '+12%',
          fleetOnTime: '98.5%'
        };
        break;
      }

      case 'agent-hr': {
        const plant = params.plant || 'Bengaluru Plant Shift-2';
        
        result.steps = [
          `[1/4] Monitoring technician fatigue & overtime load metrics for ${plant}...`,
          `[2/4] Overtime burnout index reached 22% safety alert threshold.`,
          `[3/4] Identifying 4 qualified floating technicians from Shift 1...`,
          `[4/4] Rotated shift schedule. Workload re-balanced across engineering team.`
        ];
        result.summary = `Re-balanced shift workload for ${plant}.`;
        result.impact = `Burnout Risk Reduced to 4%`;
        result.metrics = {
          techniciansRotated: 4,
          retentionScore: '94%',
          fatigueStatus: 'NORMALIZED'
        };
        break;
      }

      case 'agent-customer': {
        const client = params.client || 'TechCorp Enterprise';
        
        result.steps = [
          `[1/4] Scanning platform activity & CSAT sentiment for ${client}...`,
          `[2/4] Detected 15% dip in weekly active usage logs.`,
          `[3/4] Triggered high-priority CSM retention workflow and technical check-in.`,
          `[4/4] Automated executive check-in email dispatched to VP of IT.`
        ];
        result.summary = `Triggered CSM retention workflow for ${client}.`;
        result.impact = `Saved ₹12.4 Cr ARR Account`;
        result.metrics = {
          accountStatus: 'CSM_ASSIGNED',
          churnRisk: 'LOW (Mitigated)',
          csatScore: '88/100'
        };
        break;
      }

      case 'agent-compliance': {
        const auditScope = params.auditScope || 'EU Carbon Border Tax (CBAM)';
        
        result.steps = [
          `[1/4] Running regulatory compliance scan for ${auditScope}...`,
          `[2/4] Auditing carbon emissions across 10 department supply nodes.`,
          `[3/4] Verified 98.4% alignment with cross-border ESG standards.`,
          `[4/4] Issued immutable compliance audit certificate for Q3 reporting.`
        ];
        result.summary = `Completed ESG audit for ${auditScope}.`;
        result.impact = `100% Regulatory Clearance`;
        result.metrics = {
          esgScore: '98.4%',
          tariffRisk: 'ZERO',
          certificateId: `ESG-${Date.now().toString().slice(-6)}`
        };
        break;
      }

      case 'agent-risk': {
        const factor = params.factor || 'Rare Earth Metal Volatility';
        
        result.steps = [
          `[1/4] Running Monte Carlo macroeconomic stress simulation for ${factor}...`,
          `[2/4] Cross-correlating risk exposure vectors across Inventory, Finance, & Production.`,
          `[3/4] Overall Enterprise Risk Index calculated at 24/100 (STABLE).`,
          `[4/4] Formulated cash-hedge recommendation for rare earth component purchases.`
        ];
        result.summary = `Executed stress test for ${factor}.`;
        result.impact = `Risk Exposure Index Stabilized at 24/100`;
        result.metrics = {
          riskIndex: '24/100',
          exposureLevel: 'STABLE',
          hedgeConfidence: '97%'
        };
        break;
      }

      default:
        break;
    }

    // Append to live action logs
    agentActionLogs[agentId].unshift({
      id: `log-${Date.now()}`,
      timestamp,
      action: result.summary,
      status: 'EXECUTED',
      impact: result.impact,
      details: result.steps[result.steps.length - 1]
    });

    agentCustomStates[agentId].lastRun = 'Just now';

    return result;
  }

  static generateCustomDebate(topic) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    return {
      id: `debate-${Date.now()}`,
      title: `Multi-Agent Consensus Analysis: ${topic}`,
      triggerReason: `User triggered enterprise reasoning on: "${topic}"`,
      financialRisk: 'Evaluated cross-departmental financial vector',
      messages: [
        {
          agentId: 'agent-risk',
          agentName: 'Risk Management Agent',
          avatar: '🛡️',
          time: timestamp,
          text: `Analyzing enterprise risk profile for "${topic}". Scanning 10 department data streams.`
        },
        {
          agentId: 'agent-finance',
          agentName: 'Finance Agent',
          avatar: '💰',
          time: timestamp,
          text: `Financial impact assessment complete. Treasury reserve is capable of supporting required operational adjustments with 92% liquidity safety margin.`
        },
        {
          agentId: 'agent-inventory',
          agentName: 'Inventory Agent',
          avatar: '📦',
          time: timestamp,
          text: `Cross-checking stock depletion & safety stock levels. Procurement buffers align with proposed operational shift.`
        },
        {
          agentId: 'agent-logistics',
          agentName: 'Logistics Agent',
          avatar: '🚚',
          time: timestamp,
          text: `Logistics and transport capacity verified. Distribution routes optimized with zero predicted SLA bottleneck.`
        }
      ],
      consensus: {
        decision: `Proceed with optimized execution plan for "${topic}". Monitor real-time telemetry every 15 minutes.`,
        confidenceScore: 95,
        estimatedCost: '₹8,20,000',
        expectedSavings: '₹14,80,000',
        executionTime: 'Immediate',
        riskLevel: 'LOW',
        status: 'RECOMMENDED'
      }
    };
  }
}
