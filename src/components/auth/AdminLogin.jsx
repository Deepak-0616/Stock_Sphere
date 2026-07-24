import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertTriangle, 
  Loader2, 
  ShieldCheck, 
  Sparkles,
  Bot,
  Activity,
  Layers
} from 'lucide-react';
import { authService } from '../../services/authService';
import { StockSphereLogo } from '../common/StockSphereLogo';

export const AdminLogin = ({ onLoginSuccess, onShowSplash }) => {
  const [email, setEmail] = useState('admin@stocksphere.ai');
  const [password, setPassword] = useState('admin');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const presetAdmins = authService.getPresetAdmins();

  const handleSelectPreset = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email address and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await authService.login(email, password, remember);
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A0A0A] text-[#FAFAFA] flex flex-col justify-between font-sans selection:bg-[#059669] selection:text-white">
      
      {/* ─── Minimal Header ─── */}
      <header className="w-full border-b border-[#2E2E2E] bg-[#0A0A0A]/90 backdrop-blur-md px-6 lg:px-12 py-3 shrink-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center shadow-md">
              <StockSphereLogo className="w-5.5 h-5.5" color="#059669" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-[#FAFAFA]">StockSphere AI</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-[#059669]/15 border border-[#059669]/40 text-[#10B981] font-mono font-bold uppercase tracking-wider">
                Enterprise OS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#A3A3A3]">
            {onShowSplash && (
              <button
                type="button"
                onClick={onShowSplash}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#059669]/50 text-[#FAFAFA] font-medium transition-all cursor-pointer text-xs"
                title="Return to Product Overview Landing Page"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                <span>← Product Overview</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>SOC-2 Type II Certified</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Viewport Grid (Zero-Scroll Clean Layout) ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-0">
        
        {/* LEFT HERO SECTION (60% Desktop - Col 7) */}
        <section className="lg:col-span-7 space-y-6 pr-0 lg:pr-8 hidden sm:block">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FAFAFA] leading-[1.15]">
            One Network Sphere.<br />
            <span className="text-[#059669]">Smarter Enterprise Decisions.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-lg leading-relaxed">
            Collaborative multi-agent system connecting Executive Operations, Finance, Supply Chain, and Production in real-time.
          </p>

          {/* 3 Clean Feature Chips */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
            <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-1">
              <Bot className="w-4 h-4 text-[#059669]" />
              <div className="text-xs font-bold text-[#FAFAFA]">10 AI Agents</div>
              <div className="text-[10px] text-[#A3A3A3]">Multi-Agent Mesh</div>
            </div>

            <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-1">
              <Activity className="w-4 h-4 text-[#84CC16]" />
              <div className="text-xs font-bold text-[#FAFAFA]">Predictive AI</div>
              <div className="text-[10px] text-[#A3A3A3]">Root Cause Trees</div>
            </div>

            <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-1">
              <Layers className="w-4 h-4 text-[#10B981]" />
              <div className="text-xs font-bold text-[#FAFAFA]">Digital Twin</div>
              <div className="text-[10px] text-[#A3A3A3]">Scenario Simulator</div>
            </div>
          </div>

        </section>

        {/* RIGHT LOGIN CARD (40% Desktop - Col 5) */}
        <section className="lg:col-span-5 flex justify-center lg:justify-end">
          
          <div className="w-full max-w-[380px] bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/90 space-y-5">
            
            {/* Card Header */}
            <div className="text-center space-y-1.5">
              <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] flex items-center justify-center mx-auto p-2">
                <StockSphereLogo className="w-6.5 h-6.5" color="#059669" />
              </div>
              <h2 className="text-xl font-extrabold text-[#FAFAFA] tracking-tight">Sign In</h2>
              <p className="text-[11px] text-[#A3A3A3]">
                Enter credentials to access StockSphere OS
              </p>
            </div>

            {/* Demo Account Quick-Fill Presets */}
            <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-bold text-[#A3A3A3] uppercase tracking-wider">
                <span>Demo Accounts</span>
                <span className="text-[#059669]">Auto Fill</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {presetAdmins.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleSelectPreset(acc)}
                    className={`p-2 rounded-lg text-left text-[10px] transition-all cursor-pointer border ${
                      email === acc.email 
                        ? 'bg-[#059669]/20 border-[#059669] text-[#FAFAFA] font-bold shadow-sm' 
                        : 'bg-[#1A1A1A] border-[#2E2E2E] text-[#A3A3A3] hover:text-[#FAFAFA] hover:border-[#059669]/40'
                    }`}
                  >
                    <div className="font-bold truncate text-[#FAFAFA]">{acc.name.split(' ')[0]}</div>
                    <div className="text-[8.5px] text-neutral-400 truncate">{acc.role.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-[#EF4444] text-[11px] flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444] shrink-0 mt-0.5" />
                <div className="leading-relaxed text-red-200">{error}</div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              
              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#FAFAFA] block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@stocksphere.ai"
                    required
                    className="w-full h-10 bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#059669] focus:outline-none rounded-xl py-2 pl-9 pr-3 text-xs text-[#FAFAFA] placeholder:text-[#A3A3A3]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#FAFAFA] block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full h-10 bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#059669] focus:outline-none rounded-xl py-2 pl-9 pr-9 text-xs text-[#FAFAFA] placeholder:text-[#A3A3A3]/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded bg-[#0A0A0A] border-[#2E2E2E] text-[#059669] focus:ring-[#059669] w-3.5 h-3.5 accent-[#059669]"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#059669] hover:underline font-semibold">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10.5 rounded-xl bg-[#059669] hover:bg-[#10B981] active:bg-[#047857] disabled:opacity-50 text-[#FAFAFA] font-extrabold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer mt-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>

          </div>

        </section>

      </main>

      {/* ─── Minimal Footer ─── */}
      <footer className="w-full border-t border-[#2E2E2E] bg-[#0A0A0A] py-2.5 px-6 lg:px-12 text-[11px] text-[#A3A3A3] shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#FAFAFA] transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#FAFAFA] transition-colors">Terms</a>
            <a href="#status" onClick={(e) => e.preventDefault()} className="hover:text-[#FAFAFA] transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#059669]" /> Systems Operational
            </a>
          </div>
          <div className="text-neutral-500 font-mono text-[10px]">
            © 2026 StockSphere AI Inc. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AdminLogin;
