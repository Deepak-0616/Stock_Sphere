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
  Sparkles,
  X
} from 'lucide-react';

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
    { id: 'landing', label: 'Product Overview', icon: Sparkles },
    { id: 'settings', label: 'Settings & Audit Logs', icon: Settings },
    { id: 'docs', label: 'Architecture & Docs', icon: HelpCircle }
  ];

  const sidebarContent = (
    <aside className="w-72 border-r border-[#2E2E2E] bg-[#0A0A0A] flex flex-col justify-between shrink-0 h-full overflow-y-auto">
      <div className="p-3 space-y-5">
        {/* Navigation Header */}
        <div className="flex items-center justify-between px-3 pt-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] font-mono">
            Enterprise Navigation
          </div>
          {isMobileOpen && (
            <button onClick={onCloseMobile} className="text-[#A3A3A3] hover:text-[#FAFAFA] md:hidden">
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
                    ? 'bg-[#059669]/15 text-[#10B981] border border-[#059669]/40 shadow-sm shadow-emerald-950/40'
                    : 'text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-[#059669] text-white' : 'bg-[#1A1A1A] text-[#A3A3A3] group-hover:text-[#FAFAFA]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold leading-tight">{item.label}</div>
                    <div className="text-[10px] font-normal text-[#A3A3A3]/70 leading-tight mt-0.5">
                      {item.subLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      item.badge === 'Live' ? 'bg-[#059669]/20 text-[#10B981] border border-[#059669]/40' : 'bg-[#1A1A1A] text-[#A3A3A3] border border-[#2E2E2E]'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {item.alert && (
                    <span className="w-2 h-2 rounded-full bg-[#059669] animate-ping" />
                  )}

                  {item.count && (
                    <span className="w-4 h-4 rounded-full bg-[#059669]/20 text-[10px] text-[#10B981] flex items-center justify-center font-bold border border-[#059669]/40">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* AI Agent Status Quick Glance */}
        <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#FAFAFA] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#059669]" />
              10 AI Domain Agents
            </span>
            <span className="text-[10px] text-[#059669] font-mono font-bold">All Online</span>
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
                className="h-7 rounded bg-[#0A0A0A] border border-[#2E2E2E] flex items-center justify-center text-xs text-[#FAFAFA] hover:scale-110 hover:border-[#059669]/50 transition-all cursor-pointer"
                title={`${agent.name} Agent - Active. Click to inspect.`}
              >
                {agent.emoji}
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-[#2E2E2E] flex items-center justify-between text-[10px] text-[#A3A3A3]">
            <span>Agent Sync Frequency</span>
            <span className="font-mono text-[#10B981] font-bold">Every 500ms</span>
          </div>
        </div>
      </div>

      {/* Footer System Info */}
      <div className="p-3 border-t border-[#2E2E2E] space-y-1">
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
                activeTab === item.id ? 'bg-[#059669]/15 text-[#10B981] border border-[#059669]/40' : 'text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A]'
              }`}
            >
              <Icon className="w-4 h-4 text-[#A3A3A3]" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-2 flex items-center justify-between px-2 text-[10px] text-[#A3A3A3]">
          <span>StockSphere OS Enterprise</span>
          <span className="flex items-center gap-1 text-[#059669]">
            <ShieldCheck className="w-3 h-3" /> SOC-2 Ready
          </span>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar - Full Height matching layout */}
      <div className="hidden md:block sticky top-16 z-30 h-[calc(100vh-4rem)]">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative z-10 w-72 h-full bg-[#0A0A0A] border-r border-[#2E2E2E]">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
