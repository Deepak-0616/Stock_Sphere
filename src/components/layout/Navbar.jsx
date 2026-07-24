import React, { useState } from 'react';
import { 
  Brain, 
  ShieldAlert, 
  Bell, 
  Search, 
  Zap, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles,
  HelpCircle,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { ENTERPRISE_METRICS } from '../../data/mockEnterpriseData';
import { HelpTooltip } from '../common/HelpTooltip';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  onToggleLanding,
  onOpenCommandPalette,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
  currentUser,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentUser?.role || 'Chief Operating Officer (Executive)');

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#0B1220]/95 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-[#F9FAFB] hover:text-[#3B82F6] hover:bg-[#111827] border border-white/10"
          title="Toggle Navigation Menu"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#F9FAFB]">SolveX</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-950/80 text-[#3B82F6] font-mono font-semibold border border-blue-800/40">AI</span>
            </div>
            <p className="text-[10px] text-[#9CA3AF] font-medium tracking-wide hidden sm:block">Enterprise OS</p>
          </div>
        </div>

        {/* Global Enterprise Health Badge with Tooltip */}
        <div className="hidden lg:flex items-center gap-2 ml-6 px-3 py-1.5 rounded-full bg-[#111827] border border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-xs text-[#9CA3AF]">Enterprise Health:</span>
            <span className="text-xs font-bold text-[#22C55E]">{ENTERPRISE_METRICS.healthScore}/100</span>
          </div>
          <HelpTooltip 
            title="Enterprise Health Score"
            explanation="A composite metric (0-100) calculated continuously across inventory, production SLAs, financial margin stability, and supplier reliability."
            example="92/100 means operations are running smoothly with low risk of downtime."
          />
        </div>
      </div>

      {/* Live Risk Alert Ticker */}
      <div className="hidden md:flex items-center gap-2 max-w-md bg-blue-950/40 border border-blue-800/40 rounded-full px-3.5 py-1 text-xs text-blue-200">
        <ShieldAlert className="w-4 h-4 text-[#3B82F6] shrink-0" />
        <span className="truncate font-medium">Alert: CNC Unit #4 Spindle & Microchip Stock</span>
        <button 
          onClick={() => setActiveTab('predictions')} 
          className="underline font-bold text-[#3B82F6] hover:text-blue-300 shrink-0"
          title="Click to view root cause analysis"
        >
          View Solution
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Landing Page Toggle */}
        <button
          onClick={onToggleLanding}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111827] text-[#9CA3AF] hover:text-[#F9FAFB] border border-white/10 hover:border-white/20 text-xs font-semibold transition-all cursor-pointer"
          title="Switch to product pitch & overview landing page"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>Product Overview</span>
        </button>

        {/* Search / Command Palette Trigger */}
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-white/20 text-xs transition-all cursor-pointer"
          title="Open Quick Search & Command Palette (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span className="hidden sm:inline">Search / Cmd Palette</span>
          <kbd className="hidden sm:inline-block text-[10px] bg-[#0B1220] px-1.5 py-0.5 rounded text-[#3B82F6] font-mono border border-white/5">Ctrl+K</kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg bg-[#111827] border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-white/20 transition-all cursor-pointer relative"
            title="View live AI alerts"
          >
            <Bell className="w-4 h-4 text-[#3B82F6]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3B82F6] text-[10px] font-bold text-white flex items-center justify-center">
              4
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl shadow-black/80 p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-sm text-[#F9FAFB]">Enterprise AI Alerts</span>
                <span className="text-[10px] bg-blue-950/80 text-[#3B82F6] px-2 py-0.5 rounded font-mono border border-blue-800/40">4 Unread</span>
              </div>
              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto text-xs text-[#9CA3AF]">
                <div 
                  onClick={() => { setActiveTab('predictions'); setShowNotifications(false); }}
                  className="p-2.5 rounded-xl bg-[#0B1220] border border-white/5 hover:border-white/10 cursor-pointer"
                >
                  <div className="font-semibold text-[#F9FAFB]">Production Machine #4 Warning</div>
                  <p className="text-[#9CA3AF] mt-0.5">Vibration score 8.4mm/s. 84% failure probability within 72 hrs.</p>
                  <span className="text-[10px] text-[#3B82F6] mt-1 block">Click to view fix →</span>
                </div>
                <div 
                  onClick={() => { setActiveTab('automation'); setShowNotifications(false); }}
                  className="p-2.5 rounded-xl bg-[#0B1220] border border-white/5 hover:border-white/10 cursor-pointer"
                >
                  <div className="font-semibold text-[#F9FAFB]">Microchip X402 Depletion Alert</div>
                  <p className="text-[#9CA3AF] mt-0.5">Only 120 units remaining in Warehouse West-3.</p>
                  <span className="text-[10px] text-[#3B82F6] mt-1 block">Click to approve purchase order →</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Role Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg bg-[#111827] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-blue-950 border border-blue-800/40 flex items-center justify-center text-[#3B82F6] font-bold text-xs">
              {currentUser?.avatar || 'AD'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-[#F9FAFB] leading-tight">{currentUser?.name || 'Alex Drake'}</div>
              <div className="text-[10px] text-[#9CA3AF] leading-tight truncate max-w-[130px]">{currentUser?.role || 'COO / Executive'}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl shadow-black/80 p-2 z-50 text-xs">
              <div className="p-2 border-b border-white/10 text-[#9CA3AF]">
                Logged in as <strong className="text-[#F9FAFB] block truncate">{currentUser?.email || 'admin@solvex.ai'}</strong>
              </div>
              <div className="py-1">
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase">Role-Based Access Control</div>
                {['Chief Operating Officer (Executive)', 'VP of Supply Chain', 'Head of Production', 'Finance Director'].map(role => (
                  <button
                    key={role}
                    onClick={() => { setSelectedRole(role); setShowUserMenu(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 flex items-center justify-between cursor-pointer ${selectedRole === role ? 'text-[#3B82F6] font-semibold bg-white/5' : 'text-[#9CA3AF]'}`}
                  >
                    <span className="truncate">{role}</span>
                    {selectedRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />}
                  </button>
                ))}
              </div>

              {/* Logout Admin Button */}
              <div className="pt-1 mt-1 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-800/40 text-red-200 font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Logout Admin Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
