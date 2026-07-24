import React, { useState, useMemo } from 'react';
import { KNOWLEDGE_GRAPH_NODES, KNOWLEDGE_GRAPH_EDGES } from '../../data/mockEnterpriseData';
import { 
  Network, 
  Search, 
  Share2, 
  Maximize2, 
  X, 
  ArrowRight, 
  Activity
} from 'lucide-react';
import { StockSphereLogo } from '../common/StockSphereLogo';

// Graph coordinates for visual canvas mapping (800x450 viewbox)
const NODE_POSITIONS = {
  'n-corp': { x: 400, y: 65, icon: '🏛️' },
  'n-sales': { x: 200, y: 150, icon: '📈' },
  'n-fin': { x: 400, y: 175, icon: '💰' },
  'n-prod': { x: 600, y: 150, icon: '🏭' },
  'n-wh-west': { x: 620, y: 265, icon: '📦' },
  'n-sup-taiwan': { x: 740, y: 375, icon: '🌐' },
  'n-sup-backup': { x: 590, y: 385, icon: '🤝' },
  'n-machine-cnc4': { x: 440, y: 275, icon: '⚙️' },
  'n-cust-techcorp': { x: 110, y: 275, icon: '🎯' },
  'n-fleet-north': { x: 260, y: 375, icon: '🚚' },
  'n-hr-shift2': { x: 430, y: 385, icon: '👥' }
};

export const EnterpriseKnowledgeGraph = ({ setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedNodeId, setSelectedNodeId] = useState('n-prod');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['ALL', 'CORPORATE', 'DEPARTMENT', 'FACILITY', 'VENDOR', 'EQUIPMENT', 'CUSTOMER', 'LOGISTICS'];

  // Normalize node objects
  const nodes = useMemo(() => {
    return KNOWLEDGE_GRAPH_NODES.map(node => ({
      ...node,
      name: node.name || node.label,
      pos: NODE_POSITIONS[node.id] || { x: 400, y: 225, icon: '🔹' }
    }));
  }, []);

  const selectedNode = useMemo(() => {
    return nodes.find(n => n.id === selectedNodeId) || nodes[0];
  }, [nodes, selectedNodeId]);

  // Find connected edges for selected node
  const connectedEdges = useMemo(() => {
    return KNOWLEDGE_GRAPH_EDGES.filter(
      edge => edge.source === selectedNodeId || edge.target === selectedNodeId
    );
  }, [selectedNodeId]);

  // Find connected neighbor nodes
  const neighborNodes = useMemo(() => {
    const neighborIds = connectedEdges.map(e => (e.source === selectedNodeId ? e.target : e.source));
    return nodes.filter(n => neighborIds.includes(n.id));
  }, [connectedEdges, selectedNodeId, nodes]);

  // Filtered nodes list for sidebar & canvas search
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchesCategory = selectedCategory === 'ALL' || node.type === selectedCategory;
      const matchesStatus = statusFilter === 'ALL' || node.status === statusFilter;
      const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            node.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            node.dept.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [nodes, selectedCategory, statusFilter, searchQuery]);

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
  };

  const handleOpenModal = (nodeId) => {
    if (nodeId) setSelectedNodeId(nodeId);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Header ─── */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <Network className="w-3.5 h-3.5" /> Neo4j Enterprise Cluster v5.12
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Enterprise Knowledge Graph Topology</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Real-time entity relationship matrix mapping Departments, AI Agents, Suppliers, Equipment, and Revenue Channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Indexed Nodes</div>
            <div className="text-base font-extrabold text-[#10B981] font-mono">{nodes.length} Active</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Relationships</div>
            <div className="text-base font-extrabold text-[#84CC16] font-mono">{KNOWLEDGE_GRAPH_EDGES.length} Edges</div>
          </div>
          <button
            onClick={() => handleOpenModal(selectedNodeId)}
            className="px-4 py-3 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer"
            title="Open Interactive Fullscreen Inspector Modal"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">Open Inspector Modal</span>
          </button>
        </div>
      </div>

      {/* ─── Filter & Search Bar ─── */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'bg-[#1A1A1A] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-xl border border-[#2E2E2E]">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                statusFilter === 'ALL' ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'text-[#A3A3A3] hover:text-[#FAFAFA]'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('WARNING')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                statusFilter === 'WARNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-[#A3A3A3] hover:text-amber-400'
              }`}
            >
              Warnings Only
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nodes or entities..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-xs text-[#FAFAFA] placeholder-[#A3A3A3]/60 focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>
      </div>

      {/* ─── Main Workspace Grid: Interactive Topology Canvas + Live Node Inspector ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT/TOP 8 COLS: Interactive SVG Topology Graph */}
        <div className="lg:col-span-8 bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[480px]">
          
          {/* Topology Canvas Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#2E2E2E] z-10">
            <div className="flex items-center gap-2">
              <StockSphereLogo className="w-5 h-5" color="#059669" />
              <span className="text-xs font-bold text-[#FAFAFA]">Interactive Knowledge Graph Visualizer</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#059669]/15 border border-[#059669]/40 text-[#10B981] font-mono">
                Click any Node to Inspect
              </span>
            </div>
            <div className="text-[10px] text-[#A3A3A3] font-mono flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#059669]" /> Healthy</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Warning</span>
            </div>
          </div>

          {/* SVG Graph Canvas */}
          <div className="w-full flex-1 relative flex items-center justify-center my-2 select-none">
            <svg viewBox="0 0 840 460" className="w-full h-full max-h-[440px]">
              <defs>
                <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#84CC16" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="100%" stopColor="#84CC16" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Render Edges / Lines */}
              {KNOWLEDGE_GRAPH_EDGES.map((edge, idx) => {
                const sourceNode = nodes.find(n => n.id === edge.source);
                const targetNode = nodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const isConnectedToSelected = edge.source === selectedNodeId || edge.target === selectedNodeId;

                return (
                  <g key={`edge-${idx}`}>
                    <line
                      x1={sourceNode.pos.x}
                      y1={sourceNode.pos.y}
                      x2={targetNode.pos.x}
                      y2={targetNode.pos.y}
                      stroke={isConnectedToSelected ? '#10B981' : '#2E2E2E'}
                      strokeWidth={isConnectedToSelected ? 2.5 : 1.2}
                      strokeDasharray={isConnectedToSelected ? 'none' : '4 4'}
                      strokeOpacity={isConnectedToSelected ? 0.9 : 0.4}
                      className="transition-all duration-300"
                    />
                    {/* Edge Label on hover or selection */}
                    {isConnectedToSelected && (
                      <text
                        x={(sourceNode.pos.x + targetNode.pos.x) / 2}
                        y={(sourceNode.pos.y + targetNode.pos.y) / 2 - 6}
                        fill="#10B981"
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="pointer-events-none drop-shadow"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isWarning = node.status === 'WARNING';
                const isFilteredOut = !filteredNodes.some(n => n.id === node.id);

                let strokeColor = isSelected ? '#10B981' : isWarning ? '#F59E0B' : '#2E2E2E';
                let opacity = isFilteredOut ? 0.25 : 1;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.pos.x}, ${node.pos.y})`}
                    onClick={() => handleNodeClick(node.id)}
                    className="cursor-pointer group transition-all duration-200"
                    style={{ opacity }}
                  >
                    {/* Outer Glow Circle when selected */}
                    {isSelected && (
                      <circle
                        r="24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                        className="animate-ping"
                      />
                    )}

                    {/* Node Main Circle */}
                    <circle
                      r="18"
                      fill={isSelected ? '#059669' : '#0A0A0A'}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? '2.5' : '2'}
                      className="transition-all group-hover:scale-110"
                    />

                    {/* Emoji / Icon inside Node */}
                    <text
                      x="0"
                      y="5"
                      fontSize="14"
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                    >
                      {node.pos.icon}
                    </text>

                    {/* Node Text Label below */}
                    <text
                      x="0"
                      y="32"
                      fill={isSelected ? '#FAFAFA' : isWarning ? '#FBBF24' : '#A3A3A3'}
                      fontSize="10"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="Inter, sans-serif"
                      textAnchor="middle"
                      className="pointer-events-none select-none transition-colors"
                    >
                      {node.name.length > 18 ? node.name.substring(0, 16) + '...' : node.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Canvas Footer Bar */}
          <div className="pt-3 border-t border-[#2E2E2E] flex flex-wrap items-center justify-between text-[11px] text-[#A3A3A3]">
            <span>Click any node in the topology matrix to inspect detailed entity properties.</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#10B981] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Expand Inspector Modal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT 4 COLS: Side Detail Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-4 shadow-xl">
            {/* Panel Top */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2E2E]">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{selectedNode.pos?.icon || '🔹'}</span>
                <div>
                  <h3 className="font-extrabold text-base text-[#FAFAFA]">{selectedNode.name}</h3>
                  <span className="text-[10px] text-[#A3A3A3] font-mono">{selectedNode.type} • {selectedNode.dept}</span>
                </div>
              </div>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
                selectedNode.status === 'HEALTHY' ? 'bg-[#059669]/20 text-[#10B981] border border-[#059669]/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {selectedNode.status}
              </span>
            </div>

            {/* Metrics & Impact */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
                <span className="text-[10px] text-[#A3A3A3] uppercase font-bold">Real-time Entity Metrics:</span>
                <p className="font-mono text-[#FAFAFA] font-semibold">{selectedNode.metrics}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] flex justify-between items-center">
                <span className="text-[#A3A3A3]">Business Criticality:</span>
                <span className={`font-bold ${selectedNode.impact === 'CRITICAL' ? 'text-rose-400' : 'text-[#10B981]'}`}>
                  {selectedNode.impact} IMPACT
                </span>
              </div>
            </div>

            {/* Connected Relationships Stream */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Connected Topology Edges ({connectedEdges.length}):</span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {connectedEdges.map((edge, idx) => {
                  const targetId = edge.source === selectedNodeId ? edge.target : edge.source;
                  const targetObj = nodes.find(n => n.id === targetId);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleNodeClick(targetId)}
                      className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] hover:border-[#059669]/40 flex items-center justify-between text-xs cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span>{targetObj?.pos?.icon || '🔹'}</span>
                        <span className="font-semibold text-[#FAFAFA]">{targetObj?.name}</span>
                      </div>
                      <span className="text-[10px] text-[#10B981] font-mono">{edge.label} →</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-2 space-y-2 border-t border-[#2E2E2E]">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Open Full Node Inspection Modal</span>
              </button>

              {setActiveTab && (
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <button
                    onClick={() => setActiveTab('simulator')}
                    className="p-2 rounded-lg bg-[#0A0A0A] hover:bg-[#2E2E2E] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E] text-center transition-all cursor-pointer"
                  >
                    Simulate Impact →
                  </button>
                  <button
                    onClick={() => setActiveTab('copilot')}
                    className="p-2 rounded-lg bg-[#0A0A0A] hover:bg-[#2E2E2E] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E] text-center transition-all cursor-pointer"
                  >
                    Ask AI Copilot →
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* ─── FULLSCREEN NODE INSPECTION MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-4xl bg-[#1A1A1A] border border-[#2E2E2E] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Top Header */}
            <div className="p-6 border-b border-[#2E2E2E] bg-[#0A0A0A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#10B981]">
                  <StockSphereLogo className="w-7 h-7" color="#059669" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-[#FAFAFA]">{selectedNode.name}</h2>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      selectedNode.status === 'HEALTHY' ? 'bg-[#059669]/20 text-[#10B981] border border-[#059669]/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {selectedNode.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#A3A3A3] mt-0.5">
                    Enterprise Knowledge Graph Inspector • Node ID: <code className="font-mono text-[#10B981]">{selectedNode.id}</code>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-[#1A1A1A] hover:bg-[#2E2E2E] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* Properties Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
                  <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Entity Category</span>
                  <strong className="text-sm text-[#FAFAFA] font-mono">{selectedNode.type}</strong>
                </div>

                <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
                  <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Operational Department</span>
                  <strong className="text-sm text-[#FAFAFA]">{selectedNode.dept}</strong>
                </div>

                <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
                  <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Business Criticality</span>
                  <strong className={`text-sm ${selectedNode.impact === 'CRITICAL' ? 'text-rose-400' : 'text-[#10B981]'}`}>
                    {selectedNode.impact} IMPACT
                  </strong>
                </div>
              </div>

              {/* Real-time Telemetry Metrics */}
              <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-2">
                <span className="text-[10px] text-[#A3A3A3] uppercase font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#059669]" /> Live Telemetry Feed & Metrics:
                </span>
                <p className="font-mono text-sm text-[#10B981] font-bold">{selectedNode.metrics}</p>
              </div>

              {/* Connected Neighbor Topology Grid */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#FAFAFA] flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#059669]" />
                  Connected Neighbor Graph Topology ({neighborNodes.length} Linked Entities)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {neighborNodes.map((neighbor) => {
                    const edgeObj = connectedEdges.find(
                      e => (e.source === selectedNode.id && e.target === neighbor.id) ||
                           (e.target === selectedNode.id && e.source === neighbor.id)
                    );

                    return (
                      <div
                        key={neighbor.id}
                        onClick={() => setSelectedNodeId(neighbor.id)}
                        className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#2E2E2E] hover:border-[#059669]/50 transition-all cursor-pointer group space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{neighbor.pos?.icon || '🔹'}</span>
                            <span className="font-bold text-sm text-[#FAFAFA] group-hover:text-[#10B981]">{neighbor.name}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                            neighbor.status === 'HEALTHY' ? 'bg-[#059669]/20 text-[#10B981]' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {neighbor.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#A3A3A3] flex items-center justify-between pt-1 border-t border-[#2E2E2E]">
                          <span>Relation: <strong className="text-[#10B981] font-mono">{edgeObj?.label}</strong></span>
                          <span className="text-[10px] text-[#A3A3A3]/70 font-mono">Click to Select →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 border-t border-[#2E2E2E] bg-[#0A0A0A] flex items-center justify-between">
              <span className="text-xs text-[#A3A3A3]">Neo4j Cluster ID: <code className="font-mono text-[#10B981]">cluster-neo4j-01</code></span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#10B981] text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
              >
                Done Inspecting
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseKnowledgeGraph;
