import React, { useState } from 'react';
import { KNOWLEDGE_GRAPH_NODES, KNOWLEDGE_GRAPH_EDGES } from '../../data/mockEnterpriseData';
import { 
  Network, 
  Search, 
  Filter, 
  Info, 
  ChevronRight, 
  Brain, 
  Building2, 
  Cpu, 
  Truck, 
  Users, 
  DollarSign, 
  Package, 
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const EnterpriseKnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState(KNOWLEDGE_GRAPH_NODES[3]); // Default Bengaluru Plant
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = KNOWLEDGE_GRAPH_NODES.filter(node => {
    const matchesType = filterType === 'ALL' || node.type === filterType;
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) || node.dept.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getNodeIcon = (type) => {
    switch (type) {
      case 'CORPORATE': return '🏛️';
      case 'DEPARTMENT': return '🏢';
      case 'FACILITY': return '🏭';
      case 'EQUIPMENT': return '⚙️';
      case 'VENDOR': return '🤝';
      case 'CUSTOMER': return '🎯';
      case 'LOGISTICS': return '🚚';
      case 'TALENT': return '👥';
      default: return '📍';
    }
  };

  const getRelatedEdges = (nodeId) => {
    return KNOWLEDGE_GRAPH_EDGES.filter(edge => edge.source === nodeId || edge.target === nodeId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-2">
            <Network className="w-3.5 h-3.5" /> Interactive Enterprise Ontology
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Enterprise Knowledge Graph</h1>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing 50+ inter-departmental connections across suppliers, facilities, machines, workforce, and active orders.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graph nodes..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Entity Types</option>
            <option value="DEPARTMENT">Departments</option>
            <option value="FACILITY">Facilities & Warehouses</option>
            <option value="EQUIPMENT">Equipment & Machines</option>
            <option value="VENDOR">Suppliers & Vendors</option>
            <option value="CUSTOMER">Customers</option>
          </select>
        </div>
      </div>

      {/* Main Graph Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Canvas / Node Matrix (Left 2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 relative min-h-[500px]">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span>Showing {filteredNodes.length} Enterprise Entities</span>
            <span className="text-[10px] text-cyan-400 font-mono">Live Relationship Mapping</span>
          </div>

          {/* Canvas Simulation Visual */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {node.status === 'WARNING' && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  )}

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{getNodeIcon(node.type)}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{node.type}</span>
                  </div>

                  <h4 className="font-bold text-xs text-white group-hover:text-cyan-400 transition-colors">{node.label}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">{node.metrics}</p>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">{node.dept}</span>
                    <span className={`font-semibold ${
                      node.status === 'WARNING' ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Deep Dive Inspector (Right Col) */}
        {selectedNode && (
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getNodeIcon(selectedNode.type)}</span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400">{selectedNode.type} NODE</span>
                  <h3 className="font-extrabold text-base text-white">{selectedNode.label}</h3>
                </div>
              </div>

              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                selectedNode.status === 'WARNING' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {selectedNode.status}
              </span>
            </div>

            {/* Live Metrics & Business Impact */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">Live Telemetry & Capacity</span>
                <span className="font-semibold text-white">{selectedNode.metrics}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">Systemic Business Impact</span>
                <span className="font-bold text-amber-400">{selectedNode.impact} EXPOSURE</span>
                <p className="text-[11px] text-slate-300 mt-1">
                  Node failure directly cascades to 3 downstream manufacturing lines and ₹3.4 Cr quarterly SLA.
                </p>
              </div>

              {/* Direct Relationships */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 mb-2 block">Direct Knowledge Graph Edges</span>
                <div className="space-y-1.5">
                  {getRelatedEdges(selectedNode.id).map((edge, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] flex items-center justify-between">
                      <span className="text-slate-300">{edge.label}</span>
                      <span className="font-mono text-cyan-400">
                        {edge.source === selectedNode.id ? `➔ ${edge.target}` : `⬅ ${edge.source}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Node Recommendation */}
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Node Optimization
                </span>
                <p className="text-[11px] text-cyan-200 leading-tight">
                  Recommend rerouting micro-component dispatches to decrease node friction by 14.2%.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
