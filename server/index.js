import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

app.use(cors());
app.use(express.json());

// Domain data for RAG context
const STOCKS_PHERE_CONTEXT = `
You are StockSphere AI, an enterprise intelligent assistant powered by Groq Llama 3.3 70B, specialized EXCLUSIVELY in StockSphere platform operations, supply chain analytics, inventory tracking, factory operations, financial telemetry, logistics, and enterprise decision management.

### STRICT DOMAIN RESTRICTION GUARDRAIL:
1. ONLY answer questions pertaining to:
   - StockSphere app features, navigation, and metrics
   - Supply chain management, inventory tracking, safety stock, reorder levels
   - Manufacturing plant equipment (e.g. CNC Machine #4, spindle vibrations, maintenance work orders)
   - Enterprise finance, ARR ($24.8M), profit margin (21.4%), cost savings, cash flow
   - Logistics, freight routes, transit delays (e.g. NH-48 monsoon delay), fleet management
   - AI Agents (Inventory Agent, Sales Agent, Finance Agent, Production Agent, HR Agent, Supplier Agent, etc.)
   - Sourcing & Vendors (Supplier Alpha, Supplier Beta, Microcontroller Chip X402)
   - Knowledge Graph entities (50+ enterprise nodes)
2. IF USER ASKS OFF-TOPIC QUESTIONS (recipes, movies, general programming outside StockSphere, sports, general knowledge, weather outside logistics):
   YOU MUST REFUSE. Start response with: "⛔ **Domain Access Restricted**" and explain you are restricted exclusively to StockSphere enterprise operations and supply chain management.

### LIVE ENTERPRISE DATA SNAPSHOT:
- Enterprise Health Score: 88/100 (Optimal)
- ARR: $24.8M (+14.2% YoY)
- Gross Profit Margin: 21.4%
- On-Time Delivery: 94.2% (Warning: 3 transit delays on NH-48)
- Plant Equipment Health: CNC Unit #4 at 74% health due to 4.2mm/s spindle vibration (Risk: High)
- Microchip X402 Inventory: 1,420 units remaining (Safety threshold: 1,500 units - At Risk)
- Active AI Agents: 10/10 Online in Mesh
`;

// Helper: Call Groq API via fetch
async function callGroqAPI(messages) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API Key is not configured on backend.');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: messages,
      temperature: 0.3,
      max_tokens: 1024
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Groq API Error Response:', errText);
    throw new Error(`Groq API responded with status ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response received from Groq AI.';
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'StockSphere Backend API',
    groqConfigured: !!GROQ_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// 2. Chatbot & Enterprise Analytics Proxy Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query prompt is required.' });
    }

    const messages = [
      { role: 'system', content: STOCKS_PHERE_CONTEXT },
      { role: 'user', content: query }
    ];

    const aiResponse = await callGroqAPI(messages);

    const isRestricted = aiResponse.startsWith('⛔ **Domain Access Restricted**');
    const hasChart = query.toLowerCase().includes('margin') || query.toLowerCase().includes('sales') || query.toLowerCase().includes('q3') || query.toLowerCase().includes('inventory');
    const hasActions = query.toLowerCase().includes('risk') || query.toLowerCase().includes('breakdown') || query.toLowerCase().includes('chip') || query.toLowerCase().includes('cnc');

    res.json({
      text: aiResponse,
      hasChart: !isRestricted && hasChart,
      hasActions: !isRestricted && hasActions,
      isRestricted,
      provider: 'Groq Enterprise AI (Llama 3.3 70B)'
    });
  } catch (err) {
    console.error('Chat API Error:', err);
    res.status(500).json({
      error: 'Failed to process AI chat query.',
      details: err.message
    });
  }
});

// 3. Enterprise Telemetry Metrics API
app.get('/api/metrics', (req, res) => {
  res.json({
    enterpriseHealth: 88,
    healthStatus: 'Optimal Operation',
    arr: '$24.8M',
    arrGrowth: '+14.2% YoY',
    profitMargin: '21.4%',
    deliveryRate: '94.2%',
    activeAlerts: [
      { id: 1, type: 'critical', text: 'CNC Unit #4 Spindle Vibration exceeding 4.2mm/s threshold' },
      { id: 2, type: 'warning', text: 'Microcontroller X402 stock below safety threshold (1,420 / 1,500 units)' },
      { id: 3, type: 'info', text: 'NH-48 Monsoon freight delay affecting 3 container shipments' }
    ]
  });
});

// 4. Department Status API
app.get('/api/departments', (req, res) => {
  res.json([
    { id: 'mfg', name: 'Manufacturing Operations', health: 82, budget: '$4.2M', risk: 'Medium', keyMetric: 'Spindle Health 74%' },
    { id: 'sc', name: 'Supply Chain & Sourcing', health: 78, budget: '$6.8M', risk: 'High', keyMetric: 'Chip X402 Bottleneck' },
    { id: 'fin', name: 'Enterprise Finance', health: 94, budget: '$12.5M', risk: 'Low', keyMetric: 'Margin 21.4%' },
    { id: 'log', name: 'Logistics & Fleet', health: 86, budget: '$3.1M', risk: 'Medium', keyMetric: 'Delivery 94.2%' },
    { id: 'sales', name: 'Sales & Revenue Intelligence', health: 91, budget: '$5.4M', risk: 'Low', keyMetric: 'ARR $24.8M' }
  ]);
});

// 5. Multi-Agent Mesh Status API
app.get('/api/agents', (req, res) => {
  res.json([
    { id: 'a1', name: 'Inventory Agent', dept: 'Supply Chain', status: 'Active', insight: 'X402 inventory replenishment required within 48h' },
    { id: 'a2', name: 'Production Agent', dept: 'Manufacturing', status: 'Active', insight: 'Recommend temporary load shift from CNC #4 to CNC #2' },
    { id: 'a3', name: 'Finance Agent', dept: 'Finance', status: 'Active', insight: 'Air freight surcharge ($14.2k) approved within Q3 buffer' },
    { id: 'a4', name: 'Logistics Agent', dept: 'Logistics', status: 'Active', insight: 'Rerouting NH-48 shipment via western express corridor' }
  ]);
});

// 6. Multi-Agent Debate Generator API via Groq
app.post('/api/agents/debate', async (req, res) => {
  try {
    const { crisisTopic } = req.body;
    const topic = crisisTopic || 'Microchip X402 procurement delay and CNC Unit #4 spindle vibration alert';

    const systemPrompt = `You are StockSphere AI Multi-Agent Mesh Orchestrator. 
Generate a high-stakes 4-agent debate & consensus resolution for StockSphere enterprise on the topic: "${topic}".
Return ONLY a valid JSON object matching this schema (no markdown formatting, no code blocks):
{
  "caseId": "Case #${Math.floor(100 + Math.random() * 900)}: ${topic.slice(0, 40)}...",
  "confidence": "95%",
  "duration": "6.4 seconds",
  "debateSteps": [
    {
      "agent": "Inventory Agent",
      "avatar": "📦",
      "time": "10:14:02 AM",
      "message": "Detailed warning statement about stock, vendor delays or inventory impact...",
      "status": "Warning Raised"
    },
    {
      "agent": "Production Agent",
      "avatar": "⚙️",
      "time": "10:14:04 AM",
      "message": "Detailed statement about plant floor equipment, CNC health, work orders...",
      "status": "Operational Impact"
    },
    {
      "agent": "Logistics Agent",
      "avatar": "🚚",
      "time": "10:14:07 AM",
      "message": "Proposed solution rerouting shipment, alternate supplier or express air freight...",
      "status": "Option Proposed"
    },
    {
      "agent": "Finance Agent",
      "avatar": "💰",
      "time": "10:14:10 AM",
      "message": "Financial ROI calculation audit showing cost savings vs SLA penalty...",
      "status": "Financial ROI Verified"
    },
    {
      "agent": "Executive Agent",
      "avatar": "👔",
      "time": "10:14:14 AM",
      "message": "Final consensus decision statement authorizing action...",
      "status": "Consensus Approved"
    }
  ],
  "consensusSummary": "Clear 2-sentence executive consensus statement.",
  "actionItem": {
    "title": "Action title for 1-click execution",
    "dept": "Supply Chain & Manufacturing",
    "requestedBy": "Multi-Agent Consensus Panel",
    "impact": "Quantifiable positive impact statement",
    "cost": "$12,500",
    "risk": "Low"
  }
}`;

    const rawResponse = await callGroqAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate consensus for crisis: ${topic}` }
    ]);

    let parsed;
    try {
      const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.warn('JSON parse failed for Groq debate, forming structured fallback:', parseErr);
      parsed = {
        caseId: `Case #${Math.floor(100 + Math.random() * 900)}: ${topic.slice(0, 30)}`,
        confidence: "94%",
        duration: "8.2 seconds",
        debateSteps: [
          { agent: 'Inventory Agent', avatar: '📦', time: '10:14:02 AM', message: `🚨 CRITICAL: Stock alert triggered for "${topic}". Supplier lead time bottleneck detected.`, status: 'Warning Raised' },
          { agent: 'Production Agent', avatar: '⚙️', time: '10:14:05 AM', message: `⚡ PLANT AUDIT: Rerouting workload from impacted units to prevent operational downtime.`, status: 'Operational Shift' },
          { agent: 'Finance Agent', avatar: '💰', time: '10:14:08 AM', message: `💵 ROI AUDIT: Net ROI of proposed mitigation exceeds 450%. Q3 margin preserved.`, status: 'Financial ROI Verified' },
          { agent: 'Executive Agent', avatar: '👔', time: '10:14:12 AM', message: `✅ CONSENSUS REACHED: All agents approved unified resolution.`, status: 'Consensus Approved' }
        ],
        consensusSummary: `Multi-agent consensus resolved "${topic}" with 94% confidence.`,
        actionItem: {
          title: `Authorize Resolution for ${topic.slice(0, 35)}`,
          dept: 'Enterprise Operations',
          requestedBy: 'Multi-Agent Consensus Panel',
          impact: 'Mitigates supply chain friction and protects ARR',
          cost: '$14,200',
          risk: 'Low'
        }
      };
    }

    // Auto save action item to DB approvals
    if (parsed.actionItem) {
      const newApproval = {
        id: `app-${Date.now()}`,
        title: parsed.actionItem.title,
        dept: parsed.actionItem.dept || 'Multi-Agent Mesh',
        requestedBy: parsed.actionItem.requestedBy || 'Multi-Agent Consensus Panel',
        impact: parsed.actionItem.impact || 'Resolved operational friction',
        cost: parsed.actionItem.cost || '$10,000',
        risk: parsed.actionItem.risk || 'Low',
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      const currentData = db.read();
      currentData.approvals.unshift(newApproval);
      db.write(currentData);
      parsed.savedApprovalId = newApproval.id;
    }

    res.json(parsed);
  } catch (err) {
    console.error('Debate API Error:', err);
    res.status(500).json({ error: 'Failed to generate agent consensus', details: err.message });
  }
});

// 7. 1-on-1 Agent Chat API via Groq
app.post('/api/agents/chat', async (req, res) => {
  try {
    const { agentId, agentName, agentDept, prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemPrompt = `You are ${agentName || 'Domain Agent'}, an AI specialized agent for StockSphere in the ${agentDept || 'Enterprise'} department. 
Respond in character, concisely, with quantitative telemetry and clear insights. Keep your response under 3 paragraphs.`;

    const aiResponse = await callGroqAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ]);

    res.json({
      agentId,
      agentName,
      text: aiResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to chat with agent', details: err.message });
  }
});

// 7. Digital Twin Simulator API Engine
app.post('/api/simulate', (req, res) => {
  const { productionDelta = 0, supplierDelayDays = 0, inflationRate = 0 } = req.body;

  const baseMargin = 21.4;
  const baseHealth = 88;

  const simulatedMargin = Math.max(5, (baseMargin + (productionDelta * 0.15) - (supplierDelayDays * 0.4) - (inflationRate * 0.5)).toFixed(1));
  const simulatedHealth = Math.max(10, Math.min(100, Math.round(baseHealth - (supplierDelayDays * 2) - (inflationRate * 1.5) + (productionDelta * 0.2))));
  const costImpact = Math.round((supplierDelayDays * 18500) + (inflationRate * 24000));

  res.json({
    inputs: { productionDelta, supplierDelayDays, inflationRate },
    outputs: {
      simulatedMargin: `${simulatedMargin}%`,
      simulatedHealth,
      estimatedCostImpact: `$${costImpact.toLocaleString()}`,
      riskLevel: simulatedHealth < 75 ? 'High Risk' : simulatedHealth < 85 ? 'Moderate' : 'Low Risk'
    }
  });
});

// 8. Knowledge Graph API
app.get('/api/graph', (req, res) => {
  res.json({
    nodes: [
      { id: 'n1', label: 'Plant 1 - Manufacturing', type: 'Facility', dept: 'Manufacturing', status: 'Healthy' },
      { id: 'n2', label: 'CNC Unit #4', type: 'Equipment', dept: 'Manufacturing', status: 'Warning' },
      { id: 'n3', label: 'Microchip X402', type: 'Component', dept: 'Supply Chain', status: 'Critical' },
      { id: 'n4', label: 'Supplier Alpha', type: 'Vendor', dept: 'Supply Chain', status: 'Healthy' },
      { id: 'n5', label: 'NH-48 Corridor', type: 'Route', dept: 'Logistics', status: 'Delayed' }
    ],
    links: [
      { source: 'n1', target: 'n2', label: 'Houses' },
      { source: 'n2', target: 'n3', label: 'Requires' },
      { source: 'n4', target: 'n3', label: 'Supplies' },
      { source: 'n5', target: 'n4', label: 'Transports' }
    ]
  });
});

// 9. Approvals List API (Persistent)
app.get('/api/approvals', (req, res) => {
  res.json({
    approvals: db.getApprovals(),
    decisionsLog: db.getDecisionsLog()
  });
});

// 10. Generate AI Workflow Proposal via Groq
app.post('/api/approvals/generate', async (req, res) => {
  try {
    const { topic } = req.body;
    const promptTopic = topic || 'Emergency procurement or machine preventative maintenance';

    const systemPrompt = `You are StockSphere AI Workflow Orchestrator. 
Generate a realistic high-value enterprise executive approval proposal for the topic: "${promptTopic}".
Return ONLY a valid JSON object matching this schema (no markdown, no code blocks):
{
  "title": "Actionable proposal title (e.g. Authorize Air Freight for Component X)",
  "dept": "Department Name (Procurement / Manufacturing / Finance / Logistics)",
  "requestedBy": "Agent Name (e.g. Inventory Agent + Supplier Agent)",
  "impact": "Quantifiable ROI impact (e.g. +$45,000 Saved)",
  "cost": "Estimated Cost (e.g. $12,400)",
  "priority": "CRITICAL or HIGH or MEDIUM",
  "summary": "Detailed 2-sentence rationale for this executive decision order."
}`;

    const rawResponse = await callGroqAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate proposal for: ${promptTopic}` }
    ]);

    let parsed;
    try {
      const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch (err) {
      parsed = {
        title: `Authorize Operational Resolution for ${promptTopic.slice(0, 30)}`,
        dept: 'Procurement & Supply Chain',
        requestedBy: 'Inventory Agent + Production Agent',
        impact: '+$35,000 Net Margin Saved',
        cost: '$8,500',
        priority: 'HIGH',
        summary: `Execute preventative operational workflow for ${promptTopic} to eliminate lead time bottlenecks and protect ARR.`
      };
    }

    const newApproval = {
      id: `app-${Date.now()}`,
      title: parsed.title,
      dept: parsed.dept,
      requestedBy: parsed.requestedBy,
      impact: parsed.impact,
      cost: parsed.cost,
      priority: parsed.priority || 'HIGH',
      summary: parsed.summary,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    const currentData = db.read();
    currentData.approvals.unshift(newApproval);
    db.write(currentData);

    res.json({ message: 'Workflow proposal generated & queued', item: newApproval });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate workflow proposal', details: err.message });
  }
});

// 11. Approve/Reject Action API
app.post('/api/approvals/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Status must be approved or rejected' });
  }

  const updated = db.updateApprovalStatus(id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Approval item not found' });
  }

  res.json({ message: `Action ${status} successfully`, item: updated });
});

app.listen(PORT, () => {
  console.log(`🚀 StockSphere Express Backend Server running on http://localhost:${PORT}`);
  console.log(`🤖 Groq AI API Key: ${GROQ_API_KEY ? 'Configured ✅' : 'Missing ❌'}`);
});
