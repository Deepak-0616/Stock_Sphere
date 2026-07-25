import React, { useState } from 'react';
import { 
  Send, 
  ArrowRight, 
  Loader2, 
  ShieldAlert, 
  Key, 
  X, 
  AlertTriangle,
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';
import { StockSphereLogo } from '../common/StockSphereLogo';
import { AIService } from '../../services/aiService';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';

const mockSalesData = [
  { month: 'May', sales: 12.4 },
  { month: 'Jun', sales: 14.8 },
  { month: 'Jul (Est)', sales: 18.2 },
  { month: 'Aug (Sim)', sales: 21.5 },
  { month: 'Sep (Sim)', sales: 24.1 }
];

export const AICopilotWorkspace = ({ setActiveTab }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => AIService.getApiKey());
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [activeProvider, setActiveProvider] = useState(() => apiKey ? 'Google Gemini AI' : 'StockSphere Domain AI');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am the StockSphere Real Enterprise AI Chatbot. I have direct access to live telemetry, 10 department agents, and knowledge graphs.\n\n🔒 **Domain Guardrail Active**: I can answer any question related to StockSphere, supply chain, inventory, manufacturing, logistics, and enterprise finance. Outer questions outside this domain are restricted.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: apiKey ? 'Google Gemini AI' : 'StockSphere Domain AI',
      quickPrompts: [
        { label: 'Why is CNC Unit #4 at risk of breakdown?', type: 'valid' },
        { label: 'Simulate Q3 Profit Margins if Microchip procurement is delayed', type: 'valid' },
        { label: 'Show Microchip X402 inventory & supplier bottleneck status', type: 'valid' },
        { label: '🚫 How to bake a chocolate cake? (Test Restriction)', type: 'invalid' },
        { label: '🚫 Who won the 2022 World Cup? (Test Restriction)', type: 'invalid' }
      ]
    }
  ]);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    AIService.setApiKey(tempApiKey);
    setApiKey(tempApiKey.trim());
    setActiveProvider(tempApiKey.trim() ? 'Google Gemini AI' : 'StockSphere Domain AI');
    setShowApiKeyModal(false);
  };

  const handleClearApiKey = () => {
    AIService.clearApiKey();
    setApiKey('');
    setTempApiKey('');
    setActiveProvider('StockSphere Domain AI');
    setShowApiKeyModal(false);
  };

  const handleSend = async (textToSend) => {
    const rawQuery = textToSend || inputQuery;
    if (!rawQuery.trim()) return;

    // Clean prompt label if test prompt
    const query = rawQuery.replace('🚫 ', '').replace(' (Test Restriction)', '');

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    try {
      const response = await AIService.queryAI(query);

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasChart: response.hasChart,
        hasActions: response.hasActions,
        isRestricted: response.isRestricted,
        provider: response.provider || activeProvider
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "⚠️ An error occurred while communicating with the AI service. Please check your API key connection or try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRestricted: false,
          provider: 'System Error'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with AI Engine & Guardrail Badge */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981]">
              <Sparkles className="w-3.5 h-3.5" /> 
              <span>{apiKey ? 'Real AI Engine: Gemini 2.5 Flash' : 'Real AI Engine: Groq Llama 3.3 70B (Express Backend)'}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-xs font-semibold text-[#60A5FA]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Domain Access Policy: STRICT RESTRICTION</span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight flex items-center gap-2">
            StockSphere Real AI Chatbot
          </h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Answers any project & domain question using real-time enterprise telemetry. Restricts off-topic / outer requests.
          </p>
        </div>

        {/* API Key Configure Button */}
        <button
          onClick={() => {
            setTempApiKey(apiKey);
            setShowApiKeyModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#333333] text-xs font-medium text-[#FAFAFA] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Key className="w-4 h-4 text-[#10B981]" />
          <span>{apiKey ? 'Configured (Gemini Key)' : 'Configure Gemini API Key'}</span>
        </button>
      </div>

      {/* Domain Scope Info Banner */}
      <div className="p-4 rounded-xl bg-[#0D1B1E] border border-[#059669]/30 flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
        <div className="text-[#A3A3A3] space-y-1">
          <p className="text-[#FAFAFA] font-semibold">
            🛡️ Smart Domain Guardrails Active
          </p>
          <p>
            This AI is configured to assist <strong>strictly with StockSphere domain operations</strong> (Inventory, CNC telemetry, Supply Chain, Logistics, Finance, Department Agents). Off-topic questions (e.g. recipes, sports, random trivia) will be blocked gracefully.
          </p>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-6 min-h-[520px] flex flex-col justify-between">
        {/* Messages Feed */}
        <div className="space-y-5 max-h-[540px] overflow-y-auto pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg ${
                  msg.isRestricted ? 'bg-amber-600 shadow-amber-950/40' : 'bg-[#059669] shadow-emerald-950/40'
                }`}>
                  {msg.isRestricted ? <ShieldAlert className="w-5 h-5 text-white" /> : <StockSphereLogo className="w-5 h-5" color="#FAFAFA" />}
                </div>
              )}

              <div className={`max-w-2xl p-4 rounded-2xl space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-[#059669] text-[#FAFAFA] rounded-tr-none'
                  : msg.isRestricted
                    ? 'bg-[#1C1917] border border-amber-500/40 text-[#FAFAFA] rounded-tl-none shadow-lg'
                    : 'bg-[#0A0A0A] border border-[#2E2E2E] text-[#FAFAFA] rounded-tl-none'
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-70 pb-1.5 border-b border-white/10">
                  <span className="font-semibold flex items-center gap-1.5">
                    {msg.sender === 'user' ? 'You' : 'StockSphere AI'}
                    {msg.sender === 'ai' && (
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono">
                        {msg.provider}
                      </span>
                    )}
                  </span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>

                {/* Restricted Query Warning Badge */}
                {msg.isRestricted && (
                  <div className="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-medium flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Domain Restriction Triggered: Outer Question Blocked</span>
                  </div>
                )}

                <div className="whitespace-pre-line leading-relaxed font-sans text-xs">
                  {msg.text}
                </div>

                {/* Quick Prompts Panel */}
                {msg.quickPrompts && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[10px] text-[#A3A3A3] uppercase font-bold tracking-wider">
                      Try Sample Queries (Valid Domain vs Restricted Outer):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.quickPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(prompt.label)}
                          className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                            prompt.type === 'invalid'
                              ? 'bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 border-amber-700/50'
                              : 'bg-[#1A1A1A] hover:bg-[#059669]/20 text-[#A3A3A3] hover:text-[#10B981] border-[#2E2E2E]'
                          }`}
                        >
                          {prompt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline Forecast Chart */}
                {msg.hasChart && (
                  <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#10B981] uppercase font-mono">Q3 Sales & Profit Forecast Model</span>
                      <span className="text-[10px] text-[#A3A3A3]">+24.1 Cr Projected</span>
                    </div>
                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockSalesData}>
                          <XAxis dataKey="month" stroke="#A3A3A3" fontSize={10} />
                          <YAxis stroke="#A3A3A3" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#2E2E2E' }} />
                          <Area type="monotone" dataKey="sales" stroke="#059669" fill="#059669" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Inline Action Buttons */}
                {msg.hasActions && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setActiveTab('automation')}
                      className="px-3 py-1.5 rounded-lg bg-[#059669] hover:bg-[#10B981] text-white font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                    >
                      Approve Maintenance Work Order <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setActiveTab('predictions')}
                      className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#2E2E2E] text-[#A3A3A3] hover:text-white border border-[#2E2E2E] text-[11px] transition-colors cursor-pointer"
                    >
                      View Root Cause Tree
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-[#A3A3A3]">
              <div className="w-8 h-8 rounded-xl bg-[#059669] flex items-center justify-center text-white shrink-0 animate-pulse">
                <StockSphereLogo className="w-5 h-5" color="#FAFAFA" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0A0A0A] border border-[#2E2E2E]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#059669]" />
                <span>Evaluating domain scope & querying Real AI...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="space-y-3 pt-4 border-t border-[#2E2E2E]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask any StockSphere domain question (e.g., 'What is CNC Unit #4 status?')"
              className="flex-1 px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-xs text-[#FAFAFA] placeholder-[#A3A3A3]/60 focus:outline-none focus:border-[#059669]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#10B981] disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 shrink-0 cursor-pointer"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#A3A3A3] px-1">
            <span>
              💡 Try asking about <strong>Inventory</strong>, <strong>CNC Telemetry</strong>, <strong>Suppliers</strong>, or <strong>Logistics</strong>.
            </span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Domain Restrictions Active
            </span>
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#FAFAFA] flex items-center gap-2">
                <Key className="w-5 h-5 text-[#10B981]" /> Configure Google Gemini API Key
              </h3>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="text-[#A3A3A3] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Enter your <strong>Google Gemini API Key</strong> to connect real LLM reasoning. The key will be securely saved in your browser standard local storage. If no key is provided, StockSphere's built-in Domain RAG Engine is used automatically.
            </p>

            <form onSubmit={handleSaveApiKey} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#FAFAFA] mb-1">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-xs text-[#FAFAFA] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {apiKey ? (
                  <button
                    type="button"
                    onClick={handleClearApiKey}
                    className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-medium cursor-pointer transition-colors"
                  >
                    Clear Key
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowApiKeyModal(false)}
                    className="px-4 py-2 rounded-xl bg-[#262626] text-[#FAFAFA] text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Save & Activate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICopilotWorkspace;
