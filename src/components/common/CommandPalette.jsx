import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  LayoutDashboard, 
  Bot, 
  Cpu, 
  Network, 
  Layers, 
  TrendingUp, 
  Building2, 
  CheckSquare,
  ArrowRight
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose, setActiveTab }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, category: 'View', desc: 'Real-time enterprise overview & metrics' },
    { id: 'copilot', label: 'Ask AI Chatbot', icon: Bot, category: 'AI Assistant', desc: 'Natural language executive decision assistant' },
    { id: 'agents', label: 'Multi-Agent Mesh', icon: Cpu, category: 'Agents', desc: '10 domain agents debating live operational risks' },
    { id: 'graph', label: 'Enterprise Knowledge Graph', icon: Network, category: 'Data', desc: 'Interactive node topology of enterprise entities' },
    { id: 'simulator', label: 'Digital Twin Simulator', icon: Layers, category: 'Simulation', desc: 'Run what-if scenario predictions' },
    { id: 'predictions', label: 'Predictions & Root Cause', icon: TrendingUp, category: 'Analytics', desc: 'Predictive failure analysis & machine health' },
    { id: 'departments', label: 'Departments Hub', icon: Building2, category: 'Overview', desc: 'Detailed view across all 10 departments' },
    { id: 'automation', label: 'Automation & Approvals', icon: CheckSquare, category: 'Action', desc: 'Approve pending AI recommendations' }
  ];

  const filtered = actions.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl shadow-2xl shadow-black/90 overflow-hidden flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2E2E2E] bg-[#0A0A0A]">
          <Search className="w-5 h-5 text-[#059669] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search views, or ask AI (e.g. 'inventory', 'risk', 'agents')..."
            className="w-full bg-transparent text-sm text-[#FAFAFA] placeholder-[#A3A3A3]/60 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-[#A3A3A3] hover:text-[#FAFAFA] p-1 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A3A3A3]">
              No matching commands. Ask the <button onClick={() => handleSelect('copilot')} className="text-[#10B981] underline font-semibold cursor-pointer">AI Chatbot</button> directly!
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-[#0A0A0A] border border-transparent hover:border-[#2E2E2E] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#059669]/15 border border-[#059669]/30 flex items-center justify-center text-[#10B981] group-hover:border-[#059669]/50">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#FAFAFA] group-hover:text-[#10B981]">{item.label}</div>
                      <div className="text-[10px] text-[#A3A3A3]">{item.desc}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono text-[#A3A3A3] bg-[#0A0A0A] border border-[#2E2E2E]">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#10B981]" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#0A0A0A] border-t border-[#2E2E2E] flex items-center justify-between text-[10px] text-[#A3A3A3]">
          <span>Use ↑ ↓ to navigate</span>
          <span>Press <kbd className="px-1 py-0.5 rounded bg-[#1A1A1A] border border-[#2E2E2E] text-[#FAFAFA]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
