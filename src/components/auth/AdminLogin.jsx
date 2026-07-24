import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  Eye, 
  EyeOff, 
  Brain, 
  ArrowRight, 
  AlertTriangle, 
  Loader2, 
  Building2,
  Sparkles,
  Shield
} from 'lucide-react';
import { authService } from '../../services/authService';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both your Admin Email and Password.');
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
      setError(err.message || 'Authentication failed. Please check your admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Subtle Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-800/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Brand Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-10 py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/40 flex items-center justify-center shadow-lg shadow-red-950/40">
            <Brain className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">SolveX</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 border border-red-700/50 text-red-400 font-mono font-bold uppercase tracking-wider">Admin Portal</span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Enterprise Intelligence Operating System</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>SOC-2 Type II Gatekeeper Active</span>
        </div>
      </header>

      {/* Main Login Workspace Card */}
      <main className="flex-1 flex items-center justify-center my-8 z-10">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl relative">
          {/* Header Inside Card */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-950/60 border border-red-800/40 text-red-500 mb-2 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin System Authentication</h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Please enter your authorized administrative credentials to access enterprise controls.
            </p>
          </div>

          {/* Alert Message Box */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Admin Email Address</span>
                <span className="text-[10px] text-slate-500 font-mono">Restricted Domain</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@solvex.ai"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-600 transition-colors outline-none font-mono"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Master Password</span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-100 placeholder:text-slate-600 transition-colors outline-none"
                />
              </div>
            </div>

            {/* Remember Me & SSO link */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-red-600/40 w-4 h-4 accent-red-600"
                />
                <span>Remember session (24h)</span>
              </label>
              <span className="text-slate-500 hover:text-slate-400 text-[11px] cursor-pointer">
                SAML 2.0 / Okta SSO
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-red-700 hover:bg-red-600 disabled:bg-slate-800 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 hover:shadow-red-900/60 active:scale-[0.99] cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying Admin Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter OS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto w-full text-center text-[11px] text-slate-500 z-10 space-y-1">
        <div className="flex items-center justify-center gap-4 flex-wrap text-slate-400">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-red-500" /> AES-256 Encrypted
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-red-500" /> Enterprise Restricted
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-red-500" /> Real-time Audit Logging
          </span>
        </div>
        <p className="text-[10px] text-slate-600">© 2026 SolveX AI Inc. Confidential Admin System.</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
