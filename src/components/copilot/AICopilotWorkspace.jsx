import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  ArrowRight, 
  Loader2
} from 'lucide-react';
import { StockSphereLogo } from '../common/StockSphereLogo';
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
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Alex. I am your StockSphere Enterprise AI Copilot. I have synchronized real-time data across all 10 departments. What would you like to analyze or execute today?",
      timestamp: '10:14 AM',
      quickPrompts: [
        'Why is CNC Unit #4 at risk of breakdown?',
        'Simulate Q3 Profit Margins if Microchip procurement is delayed',
        'Show me top 3 cost optimization opportunities'
      ]
    }
  ]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Analyzing enterprise knowledge graph across Inventory, Finance, and Production...";
      let hasChart = false;
      let hasActions = false;

      if (query.toLowerCase().includes('cnc') || query.toLowerCase().includes('breakdown')) {
        replyText = "🔍 **Root Cause Diagnostics for CNC Unit #4:**\n• Spindle vibration reached 8.4mm/s (safety threshold 5.0mm/s).\n• Bearing friction score is elevated by +42% due to missed lubrication cycle #402.\n• AI Recommendation: Trigger automated work order #849 to replace spindle bearing before Saturday shift to avoid ₹14,50,000 in unscheduled downtime.";
        hasActions = true;
      } else if (query.toLowerCase().includes('q3') || query.toLowerCase().includes('simulate') || query.toLowerCase().includes('profit')) {
        replyText = "📊 **Q3 Financial Risk & Margin Simulation:**\n• If Microchip X402 procurement from Supplier Alpha is delayed by 5 days, Q3 revenue drops by -₹42,00,000.\n• Switching to Supplier Beta via Air-Freight retains 98.4% of expected net profit.\n• Simulated ROI: +310% on freight acceleration cost.";
        hasChart = true;
      } else {
        replyText = `Understood. Analyzing "${query}" across 50+ knowledge graph nodes. Autonomous agents recommend reviewing active automation queues to prevent delivery SLA penalties.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasChart,
        hasActions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <Bot className="w-3.5 h-3.5" /> ChatGPT + SAP Copilot Hybrid Interface
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">AI Business Copilot</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Natural language executive queries backed by real-time enterprise telemetry, knowledge graphs, and predictive math models.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-6 min-h-[500px] flex flex-col justify-between">
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
                <div className="w-8 h-8 rounded-xl bg-[#059669] flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-950/40">
                  <StockSphereLogo className="w-5 h-5" color="#FAFAFA" />
                </div>
              )}

              <div className={`max-w-xl p-4 rounded-2xl space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-[#059669] text-[#FAFAFA] rounded-tr-none'
                  : 'bg-[#0A0A0A] border border-[#2E2E2E] text-[#FAFAFA] rounded-tl-none'
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-70 pb-1 border-b border-white/10">
                  <span>{msg.sender === 'user' ? 'You (Alex Drake)' : 'StockSphere AI Copilot'}</span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-line leading-relaxed font-sans">
                  {msg.text}
                </p>

                {/* Quick Prompts Panel */}
                {msg.quickPrompts && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] text-[#A3A3A3] uppercase font-bold">Suggested Executive Queries:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.quickPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(prompt)}
                          className="px-2.5 py-1 rounded-lg bg-[#1A1A1A] hover:bg-[#059669]/20 text-[#A3A3A3] hover:text-[#10B981] border border-[#2E2E2E] text-[11px] transition-colors cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline Forecast Chart */}
                {msg.hasChart && (
                  <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#10B981] uppercase font-mono">Q3 Sales Forecast Model</span>
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
                <span>Copilot is inspecting 50+ knowledge graph nodes...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="flex items-center gap-2 pt-4 border-t border-[#2E2E2E]">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Copilot anything (e.g. 'What is the risk score for Q3 sales?')"
            className="flex-1 px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-xs text-[#FAFAFA] placeholder-[#A3A3A3]/60 focus:outline-none focus:border-[#059669]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#10B981] disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 shrink-0 cursor-pointer"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICopilotWorkspace;
