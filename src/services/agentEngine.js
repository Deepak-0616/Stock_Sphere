// Multi-Agent Collaboration Engine Service

import { AI_AGENTS, MULTI_AGENT_DEBATE_DEMO } from '../data/mockEnterpriseData';

export class AgentEngine {
  static getAgents() {
    return AI_AGENTS;
  }

  static getAgentById(id) {
    return AI_AGENTS.find(a => a.id === id);
  }

  static getActiveDebate() {
    return MULTI_AGENT_DEBATE_DEMO;
  }

  static generateCustomDebate(topic, departmentFocus) {
    // Generates a dynamic inter-agent discussion based on user query/topic
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
