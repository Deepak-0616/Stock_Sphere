import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const initialData = {
  approvals: [
    {
      id: 'app-101',
      title: 'Authorize Microchip X402 Expedited Air Freight',
      dept: 'Procurement & Supply Chain',
      requestedBy: 'Supplier Agent',
      impact: 'Avoids 45% production bottleneck in Plant 2',
      cost: '$14,200',
      risk: 'Medium',
      status: 'pending',
      timestamp: new Date().toISOString()
    },
    {
      id: 'app-102',
      title: 'Schedule Emergency Spindle Maintenance for CNC Unit #4',
      dept: 'Manufacturing Operations',
      requestedBy: 'Production Agent',
      impact: 'Prevents catastrophic spindle failure ($85,000 damage)',
      cost: '$4,500',
      risk: 'High',
      status: 'pending',
      timestamp: new Date().toISOString()
    }
  ],
  decisionsLog: [
    {
      id: 'dec-1',
      action: 'Automated reroute of NH-48 monsoon delay cargo via Air Freight',
      status: 'EXECUTED',
      timestamp: '10 mins ago',
      agent: 'Logistics Agent',
      impact: 'Saved 3.2 days production lead time'
    },
    {
      id: 'dec-2',
      action: 'Dynamic safety stock increase for Microcontroller X402 (+250 units)',
      status: 'EXECUTED',
      timestamp: '2 hours ago',
      agent: 'Inventory Agent',
      impact: 'Mitigated tier-2 supplier lead time spike'
    }
  ]
};

class LocalDB {
  constructor() {
    if (!fs.existsSync(DB_FILE)) {
      this.write(initialData);
    }
  }

  read() {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading DB, resetting to initial:', err);
      this.write(initialData);
      return initialData;
    }
  }

  write(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  }

  getApprovals() {
    return this.read().approvals || [];
  }

  updateApprovalStatus(id, status) {
    const data = this.read();
    const itemIndex = data.approvals.findIndex(a => a.id === id);
    if (itemIndex !== -1) {
      data.approvals[itemIndex].status = status;
      data.approvals[itemIndex].updatedAt = new Date().toISOString();
      
      // Also add to audit decisions log if approved
      if (status === 'approved') {
        data.decisionsLog.unshift({
          id: `dec-${Date.now()}`,
          action: data.approvals[itemIndex].title,
          status: 'EXECUTED',
          timestamp: 'Just now',
          agent: data.approvals[itemIndex].requestedBy,
          impact: data.approvals[itemIndex].impact
        });
      }
      this.write(data);
      return data.approvals[itemIndex];
    }
    return null;
  }

  getDecisionsLog() {
    return this.read().decisionsLog || [];
  }
}

export const db = new LocalDB();
