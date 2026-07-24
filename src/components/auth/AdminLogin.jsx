import React, { useState } from 'react';
import { 
  Brain, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertTriangle, 
  Loader2, 
  Building2, 
  Globe, 
  Moon, 
  Sun, 
  ChevronDown, 
  Bot, 
  LineChart, 
  Workflow, 
  Sparkles,
  HelpCircle,
  FileText,
  DollarSign
} from 'lucide-react';
import { authService } from '../../services/authService';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@solvex.ai');
  const [password, setPassword] = useState('admin');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const presetAdmins = authService.getPresetAdmins();

  const handleSelectPreset = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both your email address and password.');
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
      setError(err.message || 'Authentication failed. Please check your enterprise credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F9FAFB] flex flex-col justify-between font-sans selection:bg-[#3B82F6] selection:text-white">
      
      {/* Navigation Header */}
      <header className="w-full border-b border-white/[0.08] bg-[#0B1220]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Top Left: Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#F9FAFB]">SolveX AI</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/40 text-[#3B82F6] font-mono font-bold uppercase tracking-wider">
                  Enterprise OS
                </span>
              </div>
              <span className="hidden lg:inline text-slate-600">•</span>
              <span className="hidden lg:inline text-xs text-[#9CA3AF] font-medium">
                One Brain. Every Department. Smarter Decisions.
              </span>
            </div>
          </div>

          {/* Top Right: Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
            <nav className="hidden md:flex items-center gap-5 text-[#9CA3AF]">
              <a href="#docs" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Documentation
              </a>
              <a href="#about" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors">
                About
              </a>
              <a href="#pricing" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> Pricing
              </a>
              <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Support
              </a>
            </nav>

            <div className="h-4 w-px bg-white/10 hidden md:block" />

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-[#9CA3AF] hover:text-[#F9FAFB] transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span className="hidden sm:inline">{selectedLanguage}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-[#111827] border border-white/10 rounded-xl shadow-xl py-1 z-50 text-xs text-[#9CA3AF]">
                  {['English (US)', 'English (UK)', 'Deutsch', 'Français', '日本語'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-white/5 hover:text-[#F9FAFB] cursor-pointer ${
                        selectedLanguage === lang ? 'text-[#3B82F6] font-semibold bg-white/5' : ''
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Indicator */}
            <div className="p-1.5 rounded-lg bg-[#111827] border border-white/10 text-[#9CA3AF]" title="Dark Mode (Enterprise Standard)">
              <Moon className="w-3.5 h-3.5 text-[#3B82F6]" />
            </div>
          </div>

        </div>
      </header>

      {/* Main Split Layout Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* LEFT SECTION (60% Desktop - Col 7) */}
        <section className="lg:col-span-7 space-y-8 pr-0 lg:pr-6">
          
          {/* Brand Headline & Tagline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-xs font-semibold text-[#3B82F6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Intelligence Operating System</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F9FAFB] leading-tight">
              One Brain.<br />
              Every Department.<br />
              <span className="text-[#3B82F6]">Smarter Decisions.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl leading-relaxed">
              Enterprise Intelligence Operating System powered by Collaborative AI. Connect every department, predict business risks, and accelerate smarter decisions across your enterprise network.
            </p>
          </div>

          {/* Key Capabilities Checklist */}
          <div className="space-y-2.5 pt-2">
            {[
              'AI-Powered Decision Intelligence',
              'Cross-Department Collaboration',
              'Predictive Business Insights',
              'Enterprise Knowledge Graph',
              'Explainable AI Recommendations'
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#F9FAFB]">
                <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-[#111827]/82 border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-[#3B82F6]">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#F9FAFB]">AI Collaboration</h3>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Autonomous multi-agent network uniting Executive, Finance, HR, and Ops.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#111827]/82 border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-[#3B82F6]">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#F9FAFB]">Predictive Intelligence</h3>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Real-time risk forecasting, anomaly detection, and root cause trees.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#111827]/82 border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-[#3B82F6]">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#F9FAFB]">Enterprise Automation</h3>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                End-to-end workflow execution with SOC 2 compliance and governance.
              </p>
            </div>
          </div>

          {/* Trusted Enterprise Platform Footer Badge */}
          <div className="pt-2">
            <div className="p-4 rounded-2xl bg-[#111827]/40 border border-white/[0.05] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9CA3AF]">
              <span className="font-semibold text-[#F9FAFB]">Trusted Enterprise Platform</span>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" /> SOC 2 Ready
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-[#3B82F6]" /> End-to-End Encryption
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" /> 99.99% Uptime SLA
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* RIGHT SECTION (40% Desktop - Col 5) */}
        <section className="lg:col-span-5 flex flex-col items-center justify-center">
          
          {/* Centered Glassmorphism Login Card */}
          <div className="w-full max-w-[420px] bg-[#111827]/82 border border-white/[0.08] rounded-[24px] p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl space-y-6">
            
            {/* Card Top Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1220] border border-white/10 flex items-center justify-center mx-auto shadow-inner">
                <Brain className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h2 className="text-2xl font-bold text-[#F9FAFB] tracking-tight">Welcome Back</h2>
              <p className="text-xs text-[#9CA3AF] max-w-xs mx-auto">
                Sign in to access your Enterprise Intelligence Workspace
              </p>
            </div>

            {/* Quick Demo Preset Selector */}
            <div className="p-3 rounded-xl bg-[#0B1220]/80 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>Demo Authorized Profiles</span>
                <span className="text-[#3B82F6]">Click to Auto-fill</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {presetAdmins.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleSelectPreset(acc)}
                    className={`p-2 rounded-lg text-left text-[11px] transition-all cursor-pointer border ${
                      email === acc.email 
                        ? 'bg-[#3B82F6]/15 border-[#3B82F6]/50 text-[#F9FAFB]' 
                        : 'bg-[#111827] border-white/5 text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-white/10'
                    }`}
                  >
                    <div className="font-semibold truncate">{acc.name.split(' ')[0]}</div>
                    <div className="text-[9px] text-slate-400 truncate">{acc.role.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-[#EF4444] text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                <div className="leading-relaxed text-red-200">{error}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F9FAFB] block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@enterprise.com"
                    required
                    className="w-full h-12 bg-[#0B1220] border border-white/[0.08] focus:border-[#3B82F6] focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF]/60 transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F9FAFB] block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full h-12 bg-[#0B1220] border border-white/[0.08] focus:border-[#3B82F6] focus:outline-none rounded-xl py-2.5 pl-10 pr-10 text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF]/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded bg-[#0B1220] border-white/10 text-[#3B82F6] focus:ring-[#3B82F6] w-4 h-4 accent-[#3B82F6]"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#3B82F6] hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Primary Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 text-[#F9FAFB] font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin text-white" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-white/[0.08]" />
              <span className="absolute bg-[#111827] px-3 text-[11px] uppercase font-mono tracking-wider text-[#9CA3AF]">
                OR
              </span>
            </div>

            {/* Social / OAuth Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleLoginSubmit}
                className="w-full h-11 rounded-xl bg-[#0B1220] border border-white/[0.08] hover:border-white/20 text-xs font-medium text-[#F9FAFB] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                {/* Microsoft SVG Icon */}
                <svg className="w-4 h-4" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                </svg>
                <span>Continue with Microsoft</span>
              </button>

              <button
                type="button"
                onClick={handleLoginSubmit}
                className="w-full h-11 rounded-xl bg-[#0B1220] border border-white/[0.08] hover:border-white/20 text-xs font-medium text-[#F9FAFB] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                {/* Google SVG Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleLoginSubmit}
                className="w-full h-11 rounded-xl bg-[#0B1220] border border-white/[0.08] hover:border-white/20 text-xs font-medium text-[#F9FAFB] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
                <span>Enterprise SSO</span>
              </button>
            </div>

            {/* Bottom Form Actions */}
            <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-2 border-t border-white/[0.08]">
              <a href="#create" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors">
                Create Organization
              </a>
              <span>•</span>
              <a href="#demo" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors">
                Request Demo
              </a>
              <span>•</span>
              <a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors">
                Contact Admin
              </a>
            </div>

          </div>

          {/* Security Elements & Trust Indicators below Card */}
          <div className="w-full max-w-[420px] mt-6 text-center space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#9CA3AF]">
              <span>Enterprise-grade Security</span>
              <span>•</span>
              <span>SOC 2 Ready</span>
              <span>•</span>
              <span>End-to-End Encryption</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#9CA3AF]">
              <span>Role-Based Access</span>
              <span>•</span>
              <span>Multi-Factor Authentication</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase pt-1">
              Trusted by Modern Enterprises
            </p>
          </div>

        </section>

      </main>

      {/* Global Footer */}
      <footer className="w-full border-t border-white/[0.08] bg-[#0B1220] py-4 px-4 sm:px-8 text-xs text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors">
              Terms of Service
            </a>
            <a href="#security" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors">
              Security
            </a>
            <a href="#status" onClick={(e) => e.preventDefault()} className="hover:text-[#F9FAFB] transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Systems Operational
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span className="font-mono">Version v1.0</span>
            <span>© 2026 SolveX AI Inc. All rights reserved.</span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default AdminLogin;
