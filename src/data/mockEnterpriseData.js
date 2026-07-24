// SolveX AI Enterprise Dataset

export const ENTERPRISE_METRICS = {
  healthScore: 88,
  healthScoreDelta: '+4.2% vs last week',
  revenue: '₹42,85,00,000',
  revenueGrowth: '+14.8%',
  profitMargin: '24.2%',
  profitGrowth: '+2.1%',
  riskLevel: 'MODERATE',
  activeAlerts: 4,
  automatedActionsToday: 142,
  costSavedThisMonth: '₹1,24,50,000',
  decisionConfidenceAvg: '94.6%'
};

export const AI_AGENTS = [
  {
    id: 'agent-inventory',
    name: 'Inventory Agent',
    department: 'Inventory & Warehousing',
    icon: 'Package',
    avatar: '📦',
    status: 'ACTIVE',
    healthScore: 92,
    confidence: '96%',
    currentTask: 'Optimizing reorder thresholds for Warehouse West-3',
    recentInsight: 'Critical stock alert: Microcontroller Chip X402 depleting 18% faster than predicted. Recommend 1,500 unit emergency replenishment.',
    capabilities: ['Stock Shortage Prediction', 'Safety Stock Optimization', 'Multi-Warehouse Balancing', 'Expiry Tracking'],
    color: 'emerald'
  },
  {
    id: 'agent-sales',
    name: 'Sales Agent',
    department: 'Sales & Revenue Ops',
    icon: 'TrendingUp',
    avatar: '📈',
    status: 'ACTIVE',
    healthScore: 94,
    confidence: '95%',
    currentTask: 'Analyzing Q3 enterprise deal pipeline velocity',
    recentInsight: 'Q3 Enterprise demand in APAC region surging by +28%. High probability of stockout in Model-V Servers if production line 2 is not allocated.',
    capabilities: ['Demand Spike Forecasting', 'Customer Lifetime Value', 'Pipeline Velocity', 'Churn Risk Alerts'],
    color: 'blue'
  },
  {
    id: 'agent-finance',
    name: 'Finance Agent',
    department: 'Finance & Treasury',
    icon: 'DollarSign',
    avatar: '💰',
    status: 'ACTIVE',
    healthScore: 90,
    confidence: '98%',
    currentTask: 'Auditing working capital and cash-flow impact',
    recentInsight: 'Liquid capital buffer at ₹14.2 Cr. Expediting Supplier B payment yields 3.5% early settlement discount (₹28,50,000 net savings).',
    capabilities: ['Budget Overrun Detection', 'Working Capital Optimization', 'Cost-Benefit Simulation', 'Tax Compliance'],
    color: 'purple'
  },
  {
    id: 'agent-hr',
    name: 'HR Agent',
    department: 'Human Capital & Talent',
    icon: 'Users',
    avatar: '👥',
    status: 'ACTIVE',
    healthScore: 85,
    confidence: '91%',
    currentTask: 'Evaluating engineering shift fatigue and overtime load',
    recentInsight: 'Shift 2 technicians in Bengaluru plant showing 22% burnout score surge. Recommend rotating 4 floating engineers to prevent line delay.',
    capabilities: ['Burnout & Overload Analysis', 'Skill Gap Forecasting', 'Shift Optimization', 'Attrition Risk Detection'],
    color: 'amber'
  },
  {
    id: 'agent-production',
    name: 'Production Agent',
    department: 'Manufacturing & Plants',
    icon: 'Cpu',
    avatar: '🏭',
    status: 'WARNING',
    healthScore: 78,
    confidence: '93%',
    currentTask: 'Monitoring CNC Milling Unit #4 vibration telemetry',
    recentInsight: 'Vibration anomaly detected on CNC Unit 4 bearings. Failure risk 84% within 72 hrs. Scheduling preventive maintenance now prevents ₹45L breakdown loss.',
    capabilities: ['Predictive Maintenance', 'Line Bottleneck Prevention', 'Yield Rate Optimization', 'OEE Tracking'],
    color: 'rose'
  },
  {
    id: 'agent-supplier',
    name: 'Supplier Agent',
    department: 'Vendor & Sourcing',
    icon: 'Truck',
    avatar: '🤝',
    status: 'ACTIVE',
    healthScore: 89,
    confidence: '94%',
    currentTask: 'Evaluating SLA compliance for top 12 tier-1 vendors',
    recentInsight: 'Supplier Alpha (Taiwan) shipping delay increased to 5 days due to port congestion. Rerouting orders to Backup Supplier Beta prevents delay.',
    capabilities: ['Vendor Lead-Time Tracking', 'Supplier Risk Index', 'Alternative Sourcing Matcher', 'Contract Audit'],
    color: 'cyan'
  },
  {
    id: 'agent-customer',
    name: 'Customer Intelligence Agent',
    department: 'Customer Experience & Success',
    icon: 'HeartHandshake',
    avatar: '🎯',
    status: 'ACTIVE',
    healthScore: 91,
    confidence: '92%',
    currentTask: 'Monitoring CSAT sentiment across enterprise accounts',
    recentInsight: 'Top tier client TechCorp showed 15% drop in platform usage. Triggered CSM high-priority retention workflow.',
    capabilities: ['NPS & Sentiment Engine', 'Churn Risk Scoring', 'Feature Usage Tracking', 'Expansion Matcher'],
    color: 'indigo'
  },
  {
    id: 'agent-logistics',
    name: 'Logistics Agent',
    department: 'Fleet & Distribution',
    icon: 'Navigation',
    avatar: '🚚',
    status: 'ACTIVE',
    healthScore: 87,
    confidence: '95%',
    currentTask: 'Dynamic route optimization for North Zone deliveries',
    recentInsight: 'Monsoon weather alert on Route NH-48. Dynamic rerouting via Highway 52 saves 8 hours transit time and ₹1.2L fuel cost.',
    capabilities: ['Route Optimization', 'Fleet Fuel Analytics', 'Delivery Delay Forecasting', 'Cold-chain Monitoring'],
    color: 'sky'
  },
  {
    id: 'agent-compliance',
    name: 'Compliance Agent',
    department: 'Legal & Governance',
    icon: 'ShieldCheck',
    avatar: '⚖️',
    status: 'ACTIVE',
    healthScore: 96,
    confidence: '99%',
    currentTask: 'Auditing cross-border ESG compliance and tariff updates',
    recentInsight: 'New EU Carbon Border Tax regulation coming into force. ESG audit verified 98.4% alignment across supply chain.',
    capabilities: ['Regulatory Auditing', 'ESG Compliance Tracker', 'Contractual Risk Scan', 'GDPR/DPDP Audit'],
    color: 'emerald'
  },
  {
    id: 'agent-risk',
    name: 'Risk Management Agent',
    department: 'Enterprise Risk & Governance',
    icon: 'AlertTriangle',
    avatar: '🛡️',
    status: 'ACTIVE',
    healthScore: 90,
    confidence: '97%',
    currentTask: 'Synthesizing cross-department systemic threat matrix',
    recentInsight: 'Combined risk index stable at 24/100. Primary exposure remains raw material price volatility in rare earth metals.',
    capabilities: ['Macroeconomic Stress Testing', 'Cross-Dept Risk Correlation', 'Crisis Response Orchestration', 'Insurance Coverage Audit'],
    color: 'violet'
  }
];

export const DEPARTMENTS = [
  { id: 'dept-sales', name: 'Sales & Marketing', agent: 'Sales Agent', health: 94, budget: '₹12.5 Cr', headcount: 140, risk: 'LOW', keyMetric: '₹42.8 Cr ARR' },
  { id: 'dept-inventory', name: 'Inventory & Warehousing', agent: 'Inventory Agent', health: 92, budget: '₹18.2 Cr', headcount: 85, risk: 'LOW', keyMetric: '98.2% Fill Rate' },
  { id: 'dept-finance', name: 'Finance & Accounts', agent: 'Finance Agent', health: 90, budget: '₹8.4 Cr', headcount: 45, risk: 'LOW', keyMetric: '24.2% Net Margin' },
  { id: 'dept-hr', name: 'Human Capital', agent: 'HR Agent', health: 85, budget: '₹6.1 Cr', headcount: 320, risk: 'MODERATE', keyMetric: '92% Retention' },
  { id: 'dept-production', name: 'Manufacturing & Plants', agent: 'Production Agent', health: 78, budget: '₹34.0 Cr', headcount: 450, risk: 'HIGH', keyMetric: '84.5% OEE' },
  { id: 'dept-suppliers', name: 'Procurement & Vendors', agent: 'Supplier Agent', health: 89, budget: '₹22.0 Cr', headcount: 35, risk: 'MODERATE', keyMetric: '96% SLA Adherence' },
  { id: 'dept-logistics', name: 'Logistics & Supply Chain', agent: 'Logistics Agent', health: 87, budget: '₹15.3 Cr', headcount: 110, risk: 'LOW', keyMetric: '97.4% On-time Del.' },
  { id: 'dept-customers', name: 'Customer Success', agent: 'Customer Intelligence Agent', health: 91, budget: '₹4.8 Cr', headcount: 65, risk: 'LOW', keyMetric: '72 CSAT' }
];

export const RECENT_DECISIONS_LOG = [
  {
    id: 'dec-101',
    timestamp: '12 mins ago',
    title: 'Emergency Microchip Allocation to Line 2',
    initiator: 'Inventory Agent + Production Agent',
    status: 'APPROVED',
    impact: '+₹45,00,000 Saved',
    confidence: '96%',
    summary: 'Rerouted 800 Microcontroller units from Warehouse B to Bengaluru plant to prevent 48hr line stoppage.'
  },
  {
    id: 'dec-102',
    timestamp: '1 hour ago',
    title: 'Early Settlement Discount Execution (Supplier Alpha)',
    initiator: 'Finance Agent',
    status: 'AUTOMATED',
    impact: '+₹28,50,000 Savings',
    confidence: '98%',
    summary: 'Triggered early payment release 5 days prior to invoice due date, claiming 3.5% prompt vendor rebate.'
  },
  {
    id: 'dec-103',
    timestamp: '3 hours ago',
    title: 'Preventive Bearing Overhaul (CNC Machine #4)',
    initiator: 'Production Agent',
    status: 'PENDING_APPROVAL',
    impact: 'Avoids ₹60,00,000 Breakdown',
    confidence: '93%',
    summary: 'Scheduled 4-hour maintenance window during low-demand night shift to replace worn spindle bearings.'
  },
  {
    id: 'dec-104',
    timestamp: '5 hours ago',
    title: 'Fleet Rerouting via Highway 52 (Monsoon Delay)',
    initiator: 'Logistics Agent',
    status: 'AUTOMATED',
    impact: '-8 Hours Transit Lag',
    confidence: '95%',
    summary: 'Rerouted 14 freight trucks away from flooded NH-48 corridor, maintaining 100% on-time SLA commitment.'
  }
];

export const KNOWLEDGE_GRAPH_NODES = [
  { id: 'n-corp', label: 'SolveX Enterprise HQ', type: 'CORPORATE', dept: 'Executive', status: 'HEALTHY', impact: 'CRITICAL', metrics: 'ARR: ₹428 Cr | Employees: 1,250' },
  { id: 'n-sales', label: 'Sales Department', type: 'DEPARTMENT', dept: 'Sales', status: 'HEALTHY', impact: 'HIGH', metrics: 'Active Pipeline: ₹85 Cr' },
  { id: 'n-fin', label: 'Finance & Treasury', type: 'DEPARTMENT', dept: 'Finance', status: 'HEALTHY', impact: 'HIGH', metrics: 'Cash Reserve: ₹14.2 Cr' },
  { id: 'n-prod', label: 'Manufacturing Plant-1 (Bengaluru)', type: 'FACILITY', dept: 'Production', status: 'WARNING', impact: 'CRITICAL', metrics: 'Capacity: 88% | OEE: 84.5%' },
  { id: 'n-wh-west', label: 'Warehouse West-3 (Mumbai)', type: 'FACILITY', dept: 'Inventory', status: 'HEALTHY', impact: 'HIGH', metrics: 'Stock Level: 92% | SKU Count: 14,200' },
  { id: 'n-sup-taiwan', label: 'Supplier Alpha (Microchips)', type: 'VENDOR', dept: 'Suppliers', status: 'WARNING', impact: 'HIGH', metrics: 'Lead Time: 14 days (+3d delay)' },
  { id: 'n-sup-backup', label: 'Supplier Beta (Backup Chips)', type: 'VENDOR', dept: 'Suppliers', status: 'HEALTHY', impact: 'MEDIUM', metrics: 'Lead Time: 4 days (Ready)' },
  { id: 'n-machine-cnc4', label: 'CNC Spindle Machine #4', type: 'EQUIPMENT', dept: 'Production', status: 'WARNING', impact: 'CRITICAL', metrics: 'Vibration Score: 8.4mm/s (High)' },
  { id: 'n-cust-techcorp', label: 'TechCorp Enterprise', type: 'CUSTOMER', dept: 'Customers', status: 'HEALTHY', impact: 'HIGH', metrics: 'Annual Contract: ₹12.4 Cr' },
  { id: 'n-fleet-north', label: 'North Freight Fleet (18 Trucks)', type: 'LOGISTICS', dept: 'Logistics', status: 'HEALTHY', impact: 'MEDIUM', metrics: 'On-time delivery: 98.2%' },
  { id: 'n-hr-shift2', label: 'Plant Shift-2 Engineers', type: 'TALENT', dept: 'HR', status: 'WARNING', impact: 'MEDIUM', metrics: 'Fatigue Alert: 22% Overload' }
];

export const KNOWLEDGE_GRAPH_EDGES = [
  { source: 'n-corp', target: 'n-sales', label: 'Oversees Revenue' },
  { source: 'n-corp', target: 'n-fin', label: 'Allocates Budget' },
  { source: 'n-corp', target: 'n-prod', label: 'Operates Plant' },
  { source: 'n-prod', target: 'n-machine-cnc4', label: 'Houses Equipment' },
  { source: 'n-prod', target: 'n-hr-shift2', label: 'Staffed By' },
  { source: 'n-prod', target: 'n-wh-west', label: 'Supplies Inventory' },
  { source: 'n-wh-west', target: 'n-sup-taiwan', label: 'Procures Microchips' },
  { source: 'n-wh-west', target: 'n-sup-backup', label: 'Secondary Sourcing' },
  { source: 'n-sales', target: 'n-cust-techcorp', label: 'Manages Account' },
  { source: 'n-wh-west', target: 'n-fleet-north', label: 'Dispatches Orders' }
];

export const MULTI_AGENT_DEBATE_DEMO = {
  id: 'crisis-904',
  title: 'Critical Supply Chain Bottleneck & Demand Spike Resolution',
  triggerReason: 'Sudden +30% Order Spike from TechCorp during Taiwan Microchip Vendor Port Congestion',
  financialRisk: 'Potential ₹1.8 Cr Revenue Loss if delayed > 72 hours',
  messages: [
    {
      agentId: 'agent-inventory',
      agentName: 'Inventory Agent',
      avatar: '📦',
      time: '10:14:02 AM',
      text: '⚠️ Alert: Current warehouse inventory for Microchip X402 is down to 120 units. Safety threshold is 500 units. Depletion expected within 36 hours at current burn rate.'
    },
    {
      agentId: 'agent-sales',
      agentName: 'Sales Agent',
      avatar: '📈',
      time: '10:14:15 AM',
      text: '🚨 High Priority: TechCorp just placed an urgent add-on order for 1,200 Server Units (Value: ₹3.4 Cr). Delivery required within 5 days to meet Q3 SLA.'
    },
    {
      agentId: 'agent-supplier',
      agentName: 'Supplier Agent',
      avatar: '🤝',
      time: '10:14:32 AM',
      text: '⚠️ Primary Vendor Update: Supplier Alpha (Taiwan) shipment is delayed by 5 days due to Kaohsiung port congestion. They cannot expedite delivery.'
    },
    {
      agentId: 'agent-finance',
      agentName: 'Finance Agent',
      avatar: '💰',
      time: '10:14:48 AM',
      text: '💡 Financial Audit: Treasury has ₹48 Lakhs unallocated emergency procurement buffer. Paying a 12% air-freight premium is fully justified by the ₹3.4 Cr order margin.'
    },
    {
      agentId: 'agent-logistics',
      agentName: 'Logistics Agent',
      avatar: '🚚',
      time: '10:15:05 AM',
      text: '✅ Secondary Solution: Supplier Beta (Domestic) has 1,500 units in stock. Express air-freight via Logistics Partner BlueDart can deliver to Bengaluru plant in 22 hours.'
    },
    {
      agentId: 'agent-production',
      agentName: 'Production Agent',
      avatar: '🏭',
      time: '10:15:22 AM',
      text: '⚙️ Plant Status: Line 2 capacity can be reallocated to TechCorp order starting 8:00 AM tomorrow upon arrival of Supplier Beta components.'
    }
  ],
  consensus: {
    decision: 'Purchase 1,500 units of Microchip X402 from Backup Supplier Beta with express 24-hr air-freight delivery.',
    confidenceScore: 94,
    estimatedCost: '₹14,50,000',
    expectedSavings: '₹8,50,000 (net margin preservation ₹2.85 Cr)',
    executionTime: '< 24 Hours',
    riskLevel: 'LOW',
    status: 'RECOMMENDED'
  }
};
