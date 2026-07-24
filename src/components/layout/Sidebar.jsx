import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Network, 
  Layers, 
  TrendingUp, 
  Building2, 
  CheckSquare, 
  Settings, 
  Zap, 
  Cpu, 
  HelpCircle,
  ShieldCheck,
  Package,
  Activity,
  X
} from 'lucide-react';
import { HelpTooltip } from '../common/HelpTooltip';

export const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, onCloseMobile }) => {
  const mainNav = [
    { 
      id: 'dashboard', 
      label: 'Command Center', 
      subLabel: 'Executive Overview',
      icon: LayoutDashboard, 
      badge: 'Live' 
    },
    { 
      id: 'copilot', 
      label: 'AI Business Copilot', 
      subLabel: 'Ask Questions in Plain English',
      icon: Bot, 
      highlight: true 
    },
    { 
      id: 'agents', 
      label: 'Multi-Agent Engine', 
      subLabel: '10 AI Specialists Debating',
      icon: Cpu, 
      badge: '10 Active' 
    },
    { 
      id: 'graph', 
      label: 'Enterprise Graph', 
      subLabel: 'Entity & Supply Network',
      icon: Network 
    },
    { 
      id: 'simulator', 
      label: 'Digital Twin & Simulator', 
      subLabel: 'What-If Risk Modeling',
      icon: Layers, 
      badge: 'Sim' 
    },
    { 
      id: 'predictions', 
      label: 'Predictions & Root Cause', 
      subLabel: 'Prevent Failure & Scrap',
      icon: TrendingUp, 
      alert: true 
    },
    { 
      id: 'departments', 
      label: 'Departments Hub', 
      subLabel: 'All 10 Enterprise Teams',
      icon: Building2 
    },
    { 
      id: 'automation', 
      label: 'Automation & Approvals', 
      subLabel: '1-Click Decision Queue',
      icon: CheckSquare, 
      count: 3 
    }
  ];

  const secondaryNav = [
    { id: 'settings', label: 'Settings & Audit Logs', icon: Settings },
    { id: 'docs', label: 'Architecture & Docs', icon: HelpCircle }
  ];

  const sidebarContent = (
    <aside className="w-72 border-r border-slate-800/80 bg-slate-950/95 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
      <div className="p-3 space-y-5">
        {/* Navigation Header */}
        <div className="flex items-center justify-between px-3 pt-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Enterprise Navigation
          </div>
          {isMobileOpen && (
            <button onClick={onCloseMobile} className="text-slate-400 hover:text-white md:hidden">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Nav Items */}
        <nav className="space-y-1.5">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold leading-tight">{item.label}</div>
                    <div className="text-[10px] font-normal text-slate-400 leading-tight mt-0.5">
                      {item.subLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      item.badge === 'Live' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {item.alert && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  )}

                  {item.count && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-[10px] text-white flex items-center justify-center font-bold">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* AI Agent Status Quick Glance */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              10 AI Domain Agents
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">All Online</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 mt-2">
            {[
              { emoji: '📦', name: 'Inventory' },
              { emoji: '📈', name: 'Sales' },
              { emoji: '💰', name: 'Finance' },
              { emoji: '👥', name: 'HR' },
              { emoji: '🏭', name: 'Production' },
              { emoji: '🤝', name: 'Supplier' },
              { emoji: '🎯', name: 'Customer' },
              { emoji: '🚚', name: 'Logistics' },
              { emoji: '⚖️', name: 'Compliance' },
              { emoji: '🛡️', name: 'Risk' }
            ].map((agent, idx) => (
              <div 
                key={idx}
                onClick={() => { setActiveTab('agents'); if (onCloseMobile) onCloseMobile(); }}
                className="h-7 rounded bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-xs hover:scale-110 transition-transform cursor-pointer"
                title={`${agent.name} Agent - Active. Click to inspect.`}
              >
                {agent.emoji}
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>Agent Sync Frequency</span>
            <span className="font-mono text-emerald-400 font-bold">Every 500ms</span>
          </div>
        </div>
      </div>

      {/* Footer System Info */}
      <div className="p-3 border-t border-slate-800/80 space-y-1">
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
                activeTab === item.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 text-slate-400" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-2 flex items-center justify-between px-2 text-[10px] text-slate-500">
          <span>SolveX OS Enterprise</span>
          <span className="flex items-center gap-1 text-emerald-500">
            <ShieldCheck className="w-3 h-3" /> SOC-2 Ready
          </span>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky top-16 z-30 h-[calc(100vh-4rem)]">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative z-10 w-72 h-full bg-slate-950">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
