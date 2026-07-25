// StockSphere Frontend API Client connecting to Node Express Backend (Port 5000)

const BASE_URL = 'http://localhost:5000/api';

export const ApiClient = {
  // Check backend server health
  async checkHealth() {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      console.warn('Backend server unreachable, falling back to mock mode:', err);
      return null;
    }
  },

  // Send query to Groq-powered Chatbot & Enterprise Analytics
  async sendChatQuery(query) {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to query AI Chatbot');
    }
    return await res.json();
  },

  // Fetch live enterprise metrics
  async getMetrics() {
    const res = await fetch(`${BASE_URL}/metrics`);
    return await res.json();
  },

  // Fetch departments telemetry
  async getDepartments() {
    const res = await fetch(`${BASE_URL}/departments`);
    return await res.json();
  },

  // Fetch AI agents
  async getAgents() {
    const res = await fetch(`${BASE_URL}/agents`);
    return await res.json();
  },

  // Trigger Multi-Agent Crisis Debate Consensus
  async runAgentDebate(crisisTopic) {
    const res = await fetch(`${BASE_URL}/agents/debate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crisisTopic })
    });
    return await res.json();
  },

  // Run Digital Twin Scenario Simulation
  async runSimulation(params) {
    const res = await fetch(`${BASE_URL}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return await res.json();
  },

  // Fetch Knowledge Graph Topology
  async getGraph() {
    const res = await fetch(`${BASE_URL}/graph`);
    return await res.json();
  },

  // Fetch Approvals & Decisions Log
  async getApprovals() {
    const res = await fetch(`${BASE_URL}/approvals`);
    return await res.json();
  },

  // Update Approval Status (approve or reject)
  async updateApproval(id, status) {
    const res = await fetch(`${BASE_URL}/approvals/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  }
};
