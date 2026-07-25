// Real AI Service with Google Gemini Integration & Domain Restriction Guardrails

import { 
  ENTERPRISE_METRICS, 
  AI_AGENTS, 
  DEPARTMENTS, 
  RECENT_DECISIONS_LOG, 
  KNOWLEDGE_GRAPH_NODES, 
  MULTI_AGENT_DEBATE_DEMO 
} from '../data/mockEnterpriseData';
import { ApiClient } from './api';

// API Key Storage Key
const GEMINI_API_KEY_STORAGE = 'stocksphere_gemini_api_key';

export class AIService {
  // Get stored API key or env var
  static getApiKey() {
    return localStorage.getItem(GEMINI_API_KEY_STORAGE) || import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  // Save API key to LocalStorage
  static setApiKey(key) {
    if (key) {
      localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(GEMINI_API_KEY_STORAGE);
    }
  }

  // Remove saved API key
  static clearApiKey() {
    localStorage.removeItem(GEMINI_API_KEY_STORAGE);
  }

  // Build full system prompt and RAG context from StockSphere domain data
  static getSystemPrompt() {
    const metricsStr = JSON.stringify(ENTERPRISE_METRICS, null, 2);
    const agentsStr = AI_AGENTS.map(a => `- ${a.name} (${a.department}): ${a.recentInsight} (Capabilities: ${a.capabilities.join(', ')})`).join('\n');
    const deptsStr = DEPARTMENTS.map(d => `- ${d.name}: Health ${d.health}%, Budget ${d.budget}, Risk ${d.risk}, Metric: ${d.keyMetric}`).join('\n');
    const nodesStr = KNOWLEDGE_GRAPH_NODES.map(n => `- Node ${n.id} (${n.label}): Type=${n.type}, Dept=${n.dept}, Status=${n.status}, Metrics=${n.metrics}`).join('\n');

    return `You are StockSphere AI, an enterprise intelligent assistant specialized EXCLUSIVELY in the StockSphere platform, supply chain analytics, inventory management, factory operations, financial telemetry, logistics, and enterprise operations.

### DOMAIN RESTRICTION RULE (STRICT MANDATE):
1. You MUST ONLY answer questions that pertain to:
   - StockSphere app features, architecture, and navigation
   - Supply chain management, inventory tracking, safety stock, and reorder levels
   - Manufacturing, plant equipment (e.g. CNC Machine #4, spindle vibrations, maintenance work orders)
   - Enterprise finance, ARR, profit margins, cost savings, and cash flow
   - Logistics, freight routes, transit delays (e.g. NH-48 monsoon delay), and fleet management
   - AI Agents (Inventory Agent, Sales Agent, Finance Agent, Production Agent, HR Agent, Supplier Agent, etc.)
   - Vendors & Sourcing (Supplier Alpha, Supplier Beta, Microcontroller Chip X402)
   - Enterprise Knowledge Graph entities and metrics
2. IF THE USER ASKS AN OUTER / OFF-TOPIC QUESTION (such as general programming outside StockSphere, recipes, sports, entertainment, movies, general history, personal advice, weather outside logistics, general science, or any topic unrelated to enterprise supply chain and StockSphere):
   YOU MUST REFUSE TO ANSWER THE QUESTION.
   Return exactly a response starting with: "⛔ **Domain Access Restricted**" and explain clearly that you are restricted exclusively to StockSphere enterprise operations, inventory, and supply chain management.

### STOCKS PHERE DOMAIN KNOWLEDGE GRAPH & DATA SNAPSHOT:
- Enterprise Metrics: ${metricsStr}
- Specialized AI Agents:\n${agentsStr}
- Enterprise Departments:\n${deptsStr}
- Real-Time Knowledge Graph Nodes:\n${nodesStr}
- Recent System Decisions:\n${JSON.stringify(RECENT_DECISIONS_LOG, null, 2)}
- Active Bottleneck Case:\n${JSON.stringify(MULTI_AGENT_DEBATE_DEMO.consensus, null, 2)}

Provide clear, analytical, and actionable enterprise responses with markdown formatting (bullet points, bold highlights, bold metrics) when answering valid domain questions.`;
  }

  // Pre-filter query to check if it's within the StockSphere / Supply Chain / Enterprise domain
  static isDomainQuery(query) {
    const q = query.toLowerCase().trim();

    // Specific outer/off-topic trigger keywords
    const offTopicKeywords = [
      'recipe', 'cook', 'bake', 'cake', 'pizza', 'pasta', 'dinner',
      'football', 'soccer', 'cricket', 'nba', 'world cup', 'olympics', 'match',
      'movie', 'actor', 'actress', 'hollywood', 'bollywood', 'song', 'music', 'singer',
      'joke', 'riddle', 'poem', 'story', 'game', 'playstation', 'xbox',
      'capital of', 'president of', 'prime minister', 'who is', 'history of',
      'discord bot', 'python script to download', 'write a game in c++',
      'horoscope', 'zodiac', 'love', 'dating', 'relationship'
    ];

    // Check if query matches outer keywords without domain context
    const containsOffTopicKeyword = offTopicKeywords.some(keyword => q.includes(keyword));

    // Valid domain terms
    const domainKeywords = [
      'stock', 'sphere', 'stocksphere', 'inventory', 'supply', 'chain', 'warehouse',
      'cnc', 'machine', 'spindle', 'vibration', 'bearing', 'maintenance', 'work order',
      'microchip', 'x402', 'supplier', 'alpha', 'beta', 'vendor', 'procurement',
      'finance', 'revenue', 'profit', 'margin', 'arr', 'cost', 'budget', 'treasury',
      'logistics', 'fleet', 'truck', 'route', 'nh-48', 'highway', 'delivery', 'sla',
      'agent', 'hr', 'production', 'sales', 'customer', 'techcorp', 'compliance', 'risk',
      'graph', 'node', 'twin', 'simulator', 'root cause', 'alert', 'telemetry', 'oee',
      'department', 'dashboard', 'automation', 'decision', 'esg', 'shift'
    ];

    const containsDomainKeyword = domainKeywords.some(keyword => q.includes(keyword));

    if (containsOffTopicKeyword && !containsDomainKeyword) {
      return false;
    }

    // General heuristics for domain questions vs obvious non-domain questions
    if (containsDomainKeyword) return true;

    // Check generic supply chain / enterprise phrasing
    const genericEnterpriseTerms = [
      'order', 'stockout', 'capacity', 'lead time', 'shipment', 'burnout',
      'burn rate', 'delay', 'audit', 'health score', 'analytics', 'forecast',
      'q1', 'q2', 'q3', 'q4', 'metrics', 'pipeline', 'roi', 'kpi'
    ];

    if (genericEnterpriseTerms.some(term => q.includes(term))) return true;

    // If query is very short or ambiguous and has no domain keywords, mark as potentially restricted if completely unrelated
    if (q.length < 5) return false;

    // Default: if it's not explicitly off-topic, treat as subject to Gemini system prompt guardrails
    return true;
  }

  // Process Query via Groq Backend API or Fallback Domain Engine
  static async queryAI(query) {
    // 1. Try sending to Express Backend API powered by Groq Llama 3.3 70B
    try {
      const backendResponse = await ApiClient.sendChatQuery(query);
      if (backendResponse && backendResponse.text) {
        return backendResponse;
      }
    } catch (backendErr) {
      console.warn('Backend server query failed, trying client-side fallback:', backendErr.message);
    }

    const apiKey = this.getApiKey();

    // 1. Client-Side Domain Restriction Check
    const isDomain = this.isDomainQuery(query);

    if (!isDomain) {
      return {
        text: `⛔ **Domain Access Restricted**\n\nYour query falls outside the **StockSphere Enterprise Domain**. As an enterprise AI assistant, I am restricted exclusively to StockSphere supply chain operations, inventory management, manufacturing telemetry, and business domain analytics.\n\n💡 **Supported Topics Include:**\n• Inventory reorder thresholds & Microchip X402 stock levels\n• CNC Machine #4 spindle vibration & preventive maintenance\n• Q3 revenue, profit margin simulations & vendor SLA delays\n• Route optimization (NH-48 monsoon rerouting)\n• Multi-agent debate & cross-departmental risk matrices`,
        isRestricted: true,
        provider: apiKey ? 'Gemini API Guardrails' : 'StockSphere Domain Engine'
      };
    }

    // 2. If API Key is present, call Google Gemini API
    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${this.getSystemPrompt()}\n\nUser Question: ${query}` }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1000
            }
          })
        });

        if (!response.ok) {
          // Fallback to gemini-1.5-flash if 2.5 endpoint differs
          const fallbackRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${this.getSystemPrompt()}\n\nUser Question: ${query}` }]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1000
              }
            })
          });

          if (!fallbackRes.ok) {
            const errData = await fallbackRes.json();
            throw new Error(errData.error?.message || 'Gemini API request failed');
          }

          const fallbackData = await fallbackRes.json();
          const replyText = fallbackData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            const isRestricted = replyText.includes('Domain Access Restricted') || replyText.includes('⛔');
            return {
              text: replyText,
              isRestricted,
              provider: 'Google Gemini 1.5 Flash'
            };
          }
        }

        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          const isRestricted = replyText.includes('Domain Access Restricted') || replyText.includes('⛔');
          return {
            text: replyText,
            isRestricted,
            provider: 'Google Gemini 2.5 Flash'
          };
        }
      } catch (err) {
        console.warn('Gemini API Call failed, switching to Built-in Domain Engine:', err);
      }
    }

    // 3. Built-in Smart Domain Engine (RAG over StockSphere Knowledge Graph)
    return this.queryDomainEngine(query);
  }

  // Built-in RAG & Rule Engine for StockSphere Domain Knowledge
  static queryDomainEngine(query) {
    const q = query.toLowerCase();
    let replyText = '';
    let hasChart = false;
    let hasActions = false;

    if (q.includes('cnc') || q.includes('vibration') || q.includes('breakdown') || q.includes('machine') || q.includes('spindle')) {
      replyText = `🔍 **Root Cause Diagnostics for CNC Milling Unit #4:**
• **Spindle Vibration Score:** 8.4 mm/s (Safety threshold: 5.0 mm/s).
• **Bearing Friction Score:** Elevated by +42% due to missed maintenance cycle #402.
• **Failure Probability:** 84% estimated within next 72 hours.
• **AI Recommendation:** Trigger automated Work Order #849 to replace spindle bearings during low-demand night shift to prevent **₹45,00,000** in unscheduled factory downtime.`;
      hasActions = true;
    } else if (q.includes('q3') || q.includes('simulate') || q.includes('profit') || q.includes('revenue') || q.includes('margin')) {
      replyText = `📊 **Q3 Financial Risk & Margin Simulation:**
• **Current ARR:** ₹42.85 Cr with Net Margin at 24.2%.
• **Risk Vector:** If Microchip X402 procurement from Supplier Alpha is delayed by 5 days, Q3 revenue drops by **-₹42,00,000**.
• **Mitigation:** Rerouting emergency orders to Backup Supplier Beta via express air-freight retains **98.4%** of expected net profit.
• **Simulated ROI:** +310% return on expedited freight costs.`;
      hasChart = true;
    } else if (q.includes('microchip') || q.includes('x402') || q.includes('supplier') || q.includes('vendor') || q.includes('inventory')) {
      replyText = `📦 **Inventory & Supplier Intelligence Report:**
• **Item:** Microcontroller Chip X402
• **Current Warehouse Level:** 120 units (Safety stock threshold: 500 units).
• **Burn Rate:** Depleting 18% faster than predicted due to TechCorp order acceleration.
• **Primary Supplier Alpha (Taiwan):** Port congestion at Kaohsiung causing 5-day shipping lag.
• **Backup Supplier Beta (Domestic):** 1,500 units available for 24-hr air-freight delivery.`;
    } else if (q.includes('agent') || q.includes('collaborate') || q.includes('debate')) {
      replyText = `🤖 **StockSphere Multi-Agent Neural Mesh Status:**
• **Active Agents:** 10 domain-specialized agents (Inventory, Sales, Finance, HR, Production, Supplier, Customer, Logistics, Compliance, Risk).
• **Average Consensus Confidence:** 94.6%.
• **Latest Debate:** Multi-agent consensus resolved TechCorp demand spike by authorizing emergency air-freight from Supplier Beta, preserving **₹2.85 Cr** net margin.`;
    } else if (q.includes('logistics') || q.includes('route') || q.includes('fleet') || q.includes('nh-48')) {
      replyText = `🚚 **Logistics & Fleet Dispatch Analytics:**
• **Active Corridor Alert:** Heavy monsoon flooding reported on Route NH-48.
• **Action Executed:** 14 North Zone freight trucks dynamically rerouted via Highway 52.
• **Outcome:** Saved 8 transit hours and **₹1,20,000** in idling fuel costs while maintaining 100% on-time delivery SLA.`;
    } else if (q.includes('health') || q.includes('metrics') || q.includes('overview') || q.includes('score')) {
      replyText = `📈 **StockSphere Overall Enterprise Health Index:**
• **Health Score:** 88/100 (+4.2% vs last week)
• **Total Revenue:** ₹42,85,00,000 (+14.8% YoY growth)
• **Cost Saved This Month:** ₹1,24,50,000 via automated multi-agent actions
• **Active Critical Alerts:** 2 (CNC Unit #4 vibration, Supplier Alpha shipping lag)`;
    } else {
      replyText = `✅ **StockSphere Domain Intelligence Analysis for "${query}":**

Inspected **50+ Knowledge Graph Nodes** across Inventory, Production, Finance, and Logistics.
• **Systemic Status:** Enterprise Health Score is stable at **88/100**.
• **Correlated Nodes:** Warehouse West-3, Bengaluru Production Plant, and Risk Management Matrix.
• **Autonomous Recommendation:** All active operational queues are aligned within safety tolerances. Ask for CNC diagnostics, financial simulations, or vendor lead-times for granular insights.`;
    }

    return {
      text: replyText,
      hasChart,
      hasActions,
      isRestricted: false,
      provider: 'StockSphere Enterprise AI Engine'
    };
  }
}
