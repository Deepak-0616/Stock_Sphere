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
  X
} from 'lucide-react';
import { ENTERPRISE_METRICS } from '../../data/mockEnterpriseData';
import { HelpTooltip } from '../common/HelpTooltip';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  onToggleLanding,
  onOpenCommandPalette,
  onToggleMobileSidebar,
  isMobileSidebarOpen
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Chief Operating Officer (Executive)');

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800"
          title="Toggle Navigation Menu"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Brain className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">SolveX</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-semibold border border-blue-500/30">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">Enterprise Intelligence OS</p>
          </div>
        </div>

        {/* Global Enterprise Health Badge with Tooltip */}
        <div className="hidden lg:flex items-center gap-2 ml-6 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs text-slate-400">Enterprise Health:</span>
            <span className="text-xs font-bold text-emerald-400">{ENTERPRISE_METRICS.healthScore}/100</span>
          </div>
          <HelpTooltip 
            title="Enterprise Health Score"
            explanation="A composite metric (0-100) calculated continuously across inventory, production SLAs, financial margin stability, and supplier reliability."
            example="92/100 means operations are running smoothly with low risk of downtime."
          />
        </div>
      </div>

      {/* Live Risk Alert Ticker */}
      <div className="hidden md:flex items-center gap-2 max-w-md bg-rose-950/30 border border-rose-800/40 rounded-full px-3.5 py-1 text-xs text-rose-300">
        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 animate-bounce" />
        <span className="truncate font-medium">Alert: CNC Unit #4 Spindle & Microchip Stock</span>
        <button 
          onClick={() => setActiveTab('predictions')} 
          className="underline font-bold text-rose-200 hover:text-white shrink-0"
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
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold hover:bg-indigo-500/20 transition-colors"
          title="Switch to product pitch & overview landing page"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Overview</span>
        </button>

        {/* Search / Command Palette Trigger */}
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs hover:border-blue-500/40 transition-colors"
          title="Open Quick Search & Command Palette (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Search / Cmd Palette</span>
          <kbd className="hidden sm:inline-block text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">Ctrl+K</kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors relative"
            title="View live AI alerts"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
              4
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-sm text-white">Enterprise AI Alerts</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-mono">4 Unread</span>
              </div>
              <div className="space-y-2 mt-2 max-h-64 overflow-y-auto text-xs">
                <div 
                  onClick={() => { setActiveTab('predictions'); setShowNotifications(false); }}
                  className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800 cursor-pointer"
                >
                  <div className="font-semibold text-rose-400">Production Machine #4 Warning</div>
                  <p className="text-slate-300 mt-0.5">Vibration score 8.4mm/s. 84% failure probability within 72 hrs.</p>
                  <span className="text-[10px] text-blue-400 mt-1 block">Click to view fix →</span>
                </div>
                <div 
                  onClick={() => { setActiveTab('automation'); setShowNotifications(false); }}
                  className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800 cursor-pointer"
                >
                  <div className="font-semibold text-amber-400">Microchip X402 Depletion Alert</div>
                  <p className="text-slate-300 mt-0.5">Only 120 units remaining in Warehouse West-3.</p>
                  <span className="text-[10px] text-blue-400 mt-1 block">Click to approve purchase order →</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Role Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">Alex Drake</div>
              <div className="text-[10px] text-slate-400 leading-tight">COO / Executive</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs">
              <div className="p-2 border-b border-slate-800 text-slate-400">
                Logged in as <strong className="text-white">alex.drake@solvex.ai</strong>
              </div>
              <div className="py-1">
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase">Role-Based Access Control</div>
                {['Chief Operating Officer (Executive)', 'VP of Supply Chain', 'Head of Production', 'Finance Director'].map(role => (
                  <button
                    key={role}
                    onClick={() => { setSelectedRole(role); setShowUserMenu(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between ${selectedRole === role ? 'text-blue-400 font-semibold' : 'text-slate-300'}`}
                  >
                    <span>{role}</span>
                    {selectedRole === role && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
