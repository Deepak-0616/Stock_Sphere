import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandCenter } from './components/dashboard/CommandCenter';
import { MultiAgentHub } from './components/collaboration/MultiAgentHub';
import { EnterpriseKnowledgeGraph } from './components/graph/EnterpriseKnowledgeGraph';
import { DigitalTwinSimulator } from './components/simulator/DigitalTwinSimulator';
import { PredictionsRootCause } from './components/predictions/PredictionsRootCause';
import { AICopilotWorkspace } from './components/copilot/AICopilotWorkspace';
import { DepartmentHub } from './components/departments/DepartmentHub';
import { AutomationQueue } from './components/automation/AutomationQueue';
import { LandingPage } from './components/landing/LandingPage';
import { CommandPalette } from './components/common/CommandPalette';
import { AdminLogin } from './components/auth/AdminLogin';
import { authService } from './services/authService';
import { Settings, ShieldCheck, Database, Server, Key, Lock, FileText, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLanding, setShowLanding] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  const isAuthenticated = !!currentUser;

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Global Ctrl+K listener to open Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (showLanding) {
    return <LandingPage onLaunchApp={() => setShowLanding(false)} />;
  }

  // Admin Login gatekeeper: If not authenticated, require Admin Login
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Top Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onToggleLanding={() => setShowLanding(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-4rem)] max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <CommandCenter setActiveTab={setActiveTab} />}
          {activeTab === 'copilot' && <AICopilotWorkspace setActiveTab={setActiveTab} />}
          {activeTab === 'agents' && <MultiAgentHub setActiveTab={setActiveTab} />}
          {activeTab === 'graph' && <EnterpriseKnowledgeGraph />}
          {activeTab === 'simulator' && <DigitalTwinSimulator />}
          {activeTab === 'predictions' && <PredictionsRootCause />}
          {activeTab === 'departments' && <DepartmentHub setActiveTab={setActiveTab} />}
          {activeTab === 'automation' && <AutomationQueue />}

          {/* Settings & System Audit Module */}
          {activeTab === 'settings' && (
            <div className="space-y-6 pb-12">
              <div className="p-6 rounded-2xl bg-slate-50 border border-black/10 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">System Settings & Audit Logs</h1>
                  <p className="text-xs text-slate-600 mt-1">Enterprise SSO, API keys, role permissions, and immutable security audit logs.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-black/10 space-y-3 text-xs">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-700" /> SOC-2 Security & RBAC Configuration
                  </h3>
                  <div className="p-3 rounded-xl bg-white border border-black/10 space-y-1">
                    <span className="text-slate-500 text-[10px]">Enterprise SSO Protocol:</span>
                    <div className="font-semibold text-slate-900">SAML 2.0 / Okta Active</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-black/10 space-y-1">
                    <span className="text-slate-500 text-[10px]">Database Encryption:</span>
                    <div className="font-semibold text-slate-900">AES-256 at Rest & TLS 1.3 in Transit</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-black/10 space-y-3 text-xs">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Database className="w-4 h-4 text-red-700" /> Database & LLM Engine Config
                  </h3>
                  <div className="p-3 rounded-xl bg-white border border-black/10 space-y-1">
                    <span className="text-slate-500 text-[10px]">Knowledge Graph Engine:</span>
                    <div className="font-semibold text-slate-900">Neo4j Enterprise Cluster v5.12</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-black/10 space-y-1">
                    <span className="text-slate-500 text-[10px]">Agent Framework:</span>
                    <div className="font-semibold text-slate-900">LangGraph / CrewAI Hybrid Mesh</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Architecture & Documentation Module */}
          {activeTab === 'docs' && (
            <div className="space-y-6 pb-12">
              <div className="p-6 rounded-2xl bg-slate-50 border border-black/10">
                <h1 className="text-2xl font-extrabold text-slate-900">SolveX AI Architecture & Documentation</h1>
                <p className="text-xs text-slate-600 mt-1">Enterprise Intelligence Operating System technical design specs.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-black/10 space-y-4 text-xs">
                <h3 className="font-bold text-sm text-slate-900">Core Architectural Innovations</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li><strong>Multi-Agent Neural Mesh:</strong> 10 domain-specialized agents (Inventory, Sales, Finance, HR, Production, Supplier, Customer, Logistics, Compliance, Risk) executing cross-departmental debate protocol.</li>
                  <li><strong>Enterprise Digital Twin:</strong> Real-time mathematical simulation matrix predicting revenue, profit margins, machine stress, and delivery SLAs before committing capital.</li>
                  <li><strong>Explainable AI Root Cause Tree:</strong> 100% transparent causality breakdown tracing every anomaly to its underlying systemic origin.</li>
                  <li><strong>Knowledge Graph Ontology:</strong> 50+ interconnected nodes mapping real-time enterprise entity relationships.</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
export default App;
