import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Bell, 
  Search, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { ENTERPRISE_METRICS } from '../../data/mockEnterpriseData';
import { HelpTooltip } from '../common/HelpTooltip';
import { StockSphereLogo } from '../common/StockSphereLogo';

export const Navbar = ({ 
  setActiveTab, 
  onToggleLanding,
  onOpenCommandPalette,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
  currentUser,
  onLogout,
  pendingApprovalsCount = 0
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentUser?.role || 'Chief Operating Officer (Executive)');

  // Dynamic notifications count calculation (3 system alerts + pending approvals count)
  const systemAlertsCount = 3;
  const totalNotificationCount = systemAlertsCount + pendingApprovalsCount;

  return (
    <header className="h-16 border-b border-[#2E2E2E] bg-[#0A0A0A]/95 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-[#FAFAFA] hover:text-[#059669] hover:bg-[#1A1A1A] border border-[#2E2E2E]"
          title="Toggle Navigation Menu"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <StockSphereLogo className="w-6 h-6" color="#059669" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#FAFAFA]">StockSphere</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#059669]/15 text-[#10B981] font-mono font-semibold border border-[#059669]/40">AI</span>
            </div>
            <p className="text-[10px] text-[#A3A3A3] font-medium tracking-wide hidden sm:block">Enterprise OS</p>
          </div>
        </div>

        {/* Global Enterprise Health Badge with Tooltip */}
        <div className="hidden lg:flex items-center gap-2 ml-6 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2E2E2E]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#059669]" />
            <span className="text-xs text-[#A3A3A3]">Enterprise Health:</span>
            <span className="text-xs font-bold text-[#059669]">{ENTERPRISE_METRICS.healthScore}/100</span>
          </div>
          <HelpTooltip 
            title="Enterprise Health Score"
            explanation="A composite metric (0-100) calculated continuously across inventory, production SLAs, financial margin stability, and supplier reliability."
            example="92/100 means operations are running smoothly with low risk of downtime."
          />
        </div>
      </div>

      {/* Live Risk Alert Ticker (Horizontal Bar) */}
      <div className="hidden md:flex items-center gap-2 max-w-md bg-[#059669]/10 border border-[#059669]/30 rounded-full px-3.5 py-1 text-xs text-emerald-200">
        <ShieldAlert className="w-4 h-4 text-[#059669] shrink-0" />
        <span className="truncate font-medium">
          Alerts ({totalNotificationCount}): CNC Unit #4, Microchip Stock & {pendingApprovalsCount} Pending Orders
        </span>
        <button 
          onClick={() => setActiveTab('automation')} 
          className="underline font-bold text-[#10B981] hover:text-emerald-300 shrink-0"
          title="Click to view action queue"
        >
          View Queue
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Landing Page Toggle */}
        <button
          onClick={onToggleLanding}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E] hover:border-[#059669]/50 text-xs font-semibold transition-all cursor-pointer"
          title="Switch to product pitch & overview landing page"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
          <span>Product Overview</span>
        </button>

        {/* Search / Command Palette Trigger */}
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-[#A3A3A3] hover:text-[#FAFAFA] hover:border-[#059669]/50 text-xs transition-all cursor-pointer"
          title="Open Quick Search & Command Palette (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#059669]" />
          <span className="hidden sm:inline">Search / Cmd Palette</span>
          <kbd className="hidden sm:inline-block text-[10px] bg-[#0A0A0A] px-1.5 py-0.5 rounded text-[#10B981] font-mono border border-[#2E2E2E]">Ctrl+K</kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-[#A3A3A3] hover:text-[#FAFAFA] hover:border-[#059669]/50 transition-all cursor-pointer relative"
            title="View live AI alerts"
          >
            <Bell className="w-4 h-4 text-[#059669]" />
            {totalNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#059669] text-[10px] font-bold text-white flex items-center justify-center">
                {totalNotificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-84 bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl shadow-2xl shadow-black/90 p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#2E2E2E]">
                <span className="font-bold text-sm text-[#FAFAFA]">Enterprise AI Notifications</span>
                <span className="text-[10px] bg-[#059669]/20 text-[#10B981] px-2 py-0.5 rounded font-mono border border-[#059669]/40">
                  {totalNotificationCount} Unread
                </span>
              </div>
              <div className="space-y-2 mt-2 max-h-72 overflow-y-auto text-xs text-[#A3A3A3]">
                {pendingApprovalsCount > 0 && (
                  <div 
                    onClick={() => { setActiveTab('automation'); setShowNotifications(false); }}
                    className="p-2.5 rounded-xl bg-[#059669]/10 border border-[#059669]/40 hover:bg-[#059669]/20 cursor-pointer"
                  >
                    <div className="font-bold text-[#10B981] flex items-center justify-between">
                      <span>Executive Approvals Pending</span>
                      <span className="text-[10px] bg-[#059669] text-white px-1.5 py-0.5 rounded-full font-mono">{pendingApprovalsCount}</span>
                    </div>
                    <p className="text-[#FAFAFA] mt-0.5 font-medium">{pendingApprovalsCount} high-priority action orders require authorization.</p>
                    <span className="text-[10px] text-[#10B981] mt-1 block font-bold">Review Approval Queue →</span>
                  </div>
                )}

                <div 
                  onClick={() => { setActiveTab('predictions'); setShowNotifications(false); }}
                  className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] hover:border-[#059669]/40 cursor-pointer"
                >
                  <div className="font-semibold text-[#FAFAFA]">Production Machine #4 Warning</div>
                  <p className="text-[#A3A3A3] mt-0.5">Vibration score 8.4mm/s. 84% failure probability within 72 hrs.</p>
                  <span className="text-[10px] text-[#059669] mt-1 block">Click to view fix →</span>
                </div>

                <div 
                  onClick={() => { setActiveTab('automation'); setShowNotifications(false); }}
                  className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] hover:border-[#059669]/40 cursor-pointer"
                >
                  <div className="font-semibold text-[#FAFAFA]">Microchip X402 Depletion Alert</div>
                  <p className="text-[#A3A3A3] mt-0.5">Stock level below safety threshold in West-3.</p>
                  <span className="text-[10px] text-[#059669] mt-1 block">Click to approve purchase order →</span>
                </div>

                <div 
                  onClick={() => { setActiveTab('simulator'); setShowNotifications(false); }}
                  className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] hover:border-[#059669]/40 cursor-pointer"
                >
                  <div className="font-semibold text-[#FAFAFA]">NH-48 Monsoon Freight Delay</div>
                  <p className="text-[#A3A3A3] mt-0.5">3 container shipments delayed on western transit corridor.</p>
                  <span className="text-[10px] text-[#059669] mt-1 block">Simulate reroute impact →</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Role Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#059669]/50 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#10B981] font-bold text-xs">
              {currentUser?.avatar || 'AD'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-[#FAFAFA] leading-tight">{currentUser?.name || 'Alex Drake'}</div>
              <div className="text-[10px] text-[#A3A3A3] leading-tight truncate max-w-[130px]">{currentUser?.role || 'COO / Executive'}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#A3A3A3]" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl shadow-2xl shadow-black/90 p-2 z-50 text-xs">
              <div className="p-2 border-b border-[#2E2E2E] text-[#A3A3A3]">
                Logged in as <strong className="text-[#FAFAFA] block truncate">{currentUser?.email || 'admin@stocksphere.ai'}</strong>
              </div>
              <div className="py-1">
                <div className="px-2 py-1 text-[10px] font-semibold text-neutral-500 uppercase">Role-Based Access Control</div>
                {['Chief Operating Officer (Executive)', 'VP of Supply Chain', 'Head of Production', 'Finance Director'].map(role => (
                  <button
                    key={role}
                    onClick={() => { setSelectedRole(role); setShowUserMenu(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 flex items-center justify-between cursor-pointer ${selectedRole === role ? 'text-[#059669] font-semibold bg-white/5' : 'text-[#A3A3A3]'}`}
                  >
                    <span className="truncate">{role}</span>
                    {selectedRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />}
                  </button>
                ))}
              </div>

              {/* Logout Admin Button */}
              <div className="pt-1 mt-1 border-t border-[#2E2E2E]">
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
