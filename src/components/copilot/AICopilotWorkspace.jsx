import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart2, 
  ArrowRight,
  Brain,
  Search,
  User,
  Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AICopilotWorkspace = ({ setActiveTab }) => {
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello Alex! I am your SolveX Enterprise AI Copilot. I have live telemetry access to all 10 department agents, knowledge graphs, and digital twin models. How can I assist your executive decisions today?',
      timestamp: '10:00 AM',
      quickPrompts: [
        'Why is revenue decreasing in West region?',
        'Which supplier is causing shipping delays?',
        'Predict next month\'s sales.',
        'Which department has highest risk right now?',
        'What should we execute today?'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = `I analyzed your query on "${textToSend}" across Inventory, Sales, Finance, and Supplier Agent neural feeds. Here is the enterprise breakdown:`;
      let chartType = null;
      let actionRecommendation = null;

      if (textToSend.toLowerCase().includes('supplier') || textToSend.toLowerCase().includes('delays')) {
        aiResponseText = `⚠️ Supplier Agent Alert: **Supplier Alpha (Taiwan)** is causing a 5-day shipping delay due to port congestion at Kaohsiung. This threatens Warehouse West-3 Microchip X402 stock (120 units remaining).`;
        actionRecommendation = {
          title: 'Switch Sourcing to Backup Supplier Beta',
          benefit: 'Prevents ₹8,50,000 SLA Penalty & ₹3.4 Cr order cancelation',
          tab: 'automation'
        };
      } else if (textToSend.toLowerCase().includes('risk') || textToSend.toLowerCase().includes('department')) {
        aiResponseText = `🚨 Risk Analysis: **Manufacturing & Production Department** currently has the highest risk score (78/100 Health). Primary cause is CNC Machine #4 spindle vibration anomaly (84% failure probability in 72h).`;
        actionRecommendation = {
          title: 'Inspect Predictions & Root Cause',
          benefit: 'Extends machine lifespan by 48 hrs with zero batch scrap',
          tab: 'predictions'
        };
      } else if (textToSend.toLowerCase().includes('sales') || textToSend.toLowerCase().includes('predict')) {
        aiResponseText = `📈 Predictive Revenue Model: Q3 ARR is projected to reach **₹44.8 Cr (+14.8% YoY)** based on TechCorp enterprise deal pipeline velocity and APAC regional expansion.`;
        chartType = 'sales';
      } else {
        aiResponseText = `⚡ Enterprise Action Plan for Today:\n1. Approve emergency Microchip X402 procurement from Supplier Beta.\n2. Schedule 4-hour preventive overhaul for CNC Machine #4 spindle.\n3. Release 3.5% early payment discount to Supplier Alpha.`;
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        chartType,
        actionRecommendation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const sampleSalesChartData = [
    { month: 'May', sales: 36.2 },
    { month: 'Jun', sales: 38.5 },
    { month: 'Jul', sales: 42.8 },
    { month: 'Aug (Pred)', sales: 44.8 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
            <Bot className="w-3.5 h-3.5" /> ChatGPT + SAP Copilot Hybrid Interface
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Business Copilot</h1>
          <p className="text-xs text-slate-400 mt-1">
            Natural language executive queries backed by real-time enterprise telemetry, knowledge graphs, and predictive math models.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 min-h-[500px] flex flex-col justify-between">
        {/* Messages Feed */}
        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                  <Brain className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-xl p-4 rounded-2xl space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-70 pb-1 border-b border-white/10">
                  <span>{msg.sender === 'user' ? 'You (Alex Drake)' : 'SolveX AI Copilot'}</span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-line leading-relaxed font-sans">
                  {msg.text}
                </p>

                {/* Quick Prompts Panel */}
                {msg.quickPrompts && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Suggested Executive Queries:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.quickPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(prompt)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-700 text-[11px] transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline Chart Response */}
                {msg.chartType === 'sales' && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mt-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">Q3 Sales Forecast Model</span>
                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sampleSalesChartData}>
                          <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                          <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Actionable Trigger Recommendation */}
                {msg.actionRecommendation && (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-400">{msg.actionRecommendation.title}</span>
                      <span className="text-[10px] text-emerald-300 font-bold">{msg.actionRecommendation.benefit}</span>
                    </div>
                    <button
                      onClick={() => setActiveTab(msg.actionRecommendation.tab)}
                      className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Execute Recommended Action
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 text-xs">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                <Brain className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 italic">
                SolveX Copilot is consulting 10 department agents...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 pt-3 border-t border-slate-800">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything about enterprise revenue, suppliers, risk, inventory..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/30 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
