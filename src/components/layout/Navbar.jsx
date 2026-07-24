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
    <header className="h-16 border-b border-black/10 bg-white sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between shadow-sm shadow-black/5">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-slate-900 hover:text-red-700 hover:bg-red-50 border border-black/10"
          title="Toggle Navigation Menu"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-black/10 flex items-center justify-center shadow-sm shadow-black/5 group-hover:scale-105 transition-transform">
            <Brain className="w-6 h-6 text-red-700 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">SolveX</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-red-50 text-red-700 font-mono font-semibold border border-red-100">AI</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block">Enterprise Intelligence OS</p>
          </div>
        </div>

        {/* Global Enterprise Health Badge with Tooltip */}
        <div className="hidden lg:flex items-center gap-2 ml-6 px-3 py-1.5 rounded-full bg-red-50 border border-black/10">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-700 animate-ping" />
            <span className="text-xs text-slate-600">Enterprise Health:</span>
            <span className="text-xs font-bold text-red-700">{ENTERPRISE_METRICS.healthScore}/100</span>
          </div>
          <HelpTooltip 
            title="Enterprise Health Score"
            explanation="A composite metric (0-100) calculated continuously across inventory, production SLAs, financial margin stability, and supplier reliability."
            example="92/100 means operations are running smoothly with low risk of downtime."
          />
        </div>
      </div>

      {/* Live Risk Alert Ticker */}
      <div className="hidden md:flex items-center gap-2 max-w-md bg-red-50 border border-black/10 rounded-full px-3.5 py-1 text-xs text-red-700">
        <ShieldAlert className="w-4 h-4 text-red-700 shrink-0 animate-bounce" />
        <span className="truncate font-medium">Alert: CNC Unit #4 Spindle & Microchip Stock</span>
        <button 
          onClick={() => setActiveTab('predictions')} 
          className="underline font-bold text-red-700 hover:text-red-900 shrink-0"
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
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-100 text-xs font-semibold hover:bg-red-100 transition-colors"
          title="Switch to product pitch & overview landing page"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span>Product Overview</span>
        </button>

        {/* Search / Command Palette Trigger */}
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-black/10 text-slate-700 text-xs hover:border-black/20 transition-colors"
          title="Open Quick Search & Command Palette (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-red-600" />
          <span className="hidden sm:inline">Search / Cmd Palette</span>
          <kbd className="hidden sm:inline-block text-[10px] bg-red-50 px-1.5 py-0.5 rounded text-red-700 font-mono">Ctrl+K</kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg bg-white border border-black/10 flex items-center justify-center text-red-700 hover:text-red-900 hover:bg-red-50 transition-colors relative"
            title="View live AI alerts"
          >
            <Bell className="w-4 h-4 text-red-700" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-700 text-[10px] font-bold text-white flex items-center justify-center">
              4
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-black/10 rounded-xl shadow-2xl shadow-black/5 p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <span className="font-bold text-sm text-red-700">Enterprise AI Alerts</span>
                <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded font-mono">4 Unread</span>
              </div>
              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto text-xs text-slate-700">
                <div 
                  onClick={() => { setActiveTab('predictions'); setShowNotifications(false); }}
                  className="p-2 rounded-lg bg-slate-50 border border-black/10 hover:bg-slate-100 cursor-pointer"
                >
                  <div className="font-semibold text-slate-900">Production Machine #4 Warning</div>
                  <p className="text-slate-700 mt-0.5">Vibration score 8.4mm/s. 84% failure probability within 72 hrs.</p>
                  <span className="text-[10px] text-red-700 mt-1 block">Click to view fix →</span>
                </div>
                <div 
                  onClick={() => { setActiveTab('automation'); setShowNotifications(false); }}
                  className="p-2 rounded-lg bg-slate-50 border border-black/10 hover:bg-slate-100 cursor-pointer"
                >
                  <div className="font-semibold text-slate-900">Microchip X402 Depletion Alert</div>
                  <p className="text-slate-600 mt-0.5">Only 120 units remaining in Warehouse West-3.</p>
                  <span className="text-[10px] text-red-700 mt-1 block">Click to approve purchase order →</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Role Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-black/10 hover:border-black/20 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-700 font-bold text-xs">
              {currentUser?.avatar || 'AD'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-900 leading-tight">{currentUser?.name || 'Alex Drake'}</div>
              <div className="text-[10px] text-slate-500 leading-tight truncate max-w-[130px]">{currentUser?.role || 'COO / Executive'}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-900" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-black/10 rounded-xl shadow-2xl shadow-black/5 p-2 z-50 text-xs animate-fadeIn">
              <div className="p-2 border-b border-black/10 text-slate-700">
                Logged in as <strong className="text-slate-900 block truncate">{currentUser?.email || 'admin@solvex.ai'}</strong>
              </div>
              <div className="py-1">
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase">Role-Based Access Control</div>
                {['Chief Operating Officer (Executive)', 'VP of Supply Chain', 'Head of Production', 'Finance Director'].map(role => (
                  <button
                    key={role}
                    onClick={() => { setSelectedRole(role); setShowUserMenu(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded hover:bg-red-50 flex items-center justify-between ${selectedRole === role ? 'text-red-700 font-semibold' : 'text-slate-600'}`}
                  >
                    <span className="truncate">{role}</span>
                    {selectedRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                  </button>
                ))}
              </div>

              {/* Logout Admin Button */}
              <div className="pt-1 mt-1 border-t border-black/10">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-700" />
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
