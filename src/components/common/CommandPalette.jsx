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
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose, setActiveTab }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent or event
        }
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
    { id: 'copilot', label: 'Ask AI Copilot', icon: Bot, category: 'AI Assistant', desc: 'Natural language executive decision assistant' },
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/20 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-white border border-black/10 rounded-2xl shadow-2xl shadow-black/5 overflow-hidden flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10 bg-slate-50">
          <Search className="w-5 h-5 text-red-700 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search views, or ask AI (e.g. 'inventory', 'risk', 'agents')..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 p-1 rounded-lg hover:bg-red-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching commands. Ask the <button onClick={() => handleSelect('copilot')} className="text-red-700 underline font-semibold">AI Copilot</button> directly!
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-red-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-700 group-hover:border-red-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-red-700 flex items-center gap-2">
                        <span>{item.label}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-50 text-red-700 font-mono font-normal">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-red-700 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-600 font-mono text-[10px]">Esc</kbd> to close</span>
          <span className="flex items-center gap-1 text-red-700">
            <Sparkles className="w-3 h-3" /> Quick Command Palette
          </span>
        </div>
      </div>
    </div>
  );
};
