import React, { useState } from 'react';
import { KNOWLEDGE_GRAPH_NODES } from '../../data/mockEnterpriseData';
import { 
  Network, 
  Search, 
  Database
} from 'lucide-react';

export const EnterpriseKnowledgeGraph = () => {
  const [nodes] = useState(KNOWLEDGE_GRAPH_NODES);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedNode, setSelectedNode] = useState(KNOWLEDGE_GRAPH_NODES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'DEPARTMENTS', 'AGENTS', 'ENTITIES', 'PROCESSES'];

  const filteredNodes = nodes.filter(node => {
    const matchesCategory = selectedCategory === 'ALL' || node.category === selectedCategory;
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          node.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-xs font-semibold text-[#10B981] mb-2">
            <Network className="w-3.5 h-3.5" /> Neo4j Powered Ontology Engine
          </div>
          <h1 className="text-2xl font-extrabold text-[#FAFAFA] tracking-tight">Enterprise Knowledge Graph</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">
            50+ interconnected nodes mapping real-time entity relationships across Departments, AI Agents, Suppliers, and Physical Machines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Indexed Nodes</div>
            <div className="text-base font-extrabold text-[#10B981]">52 Entities</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] text-center">
            <div className="text-[10px] text-[#A3A3A3] uppercase font-semibold">Graph Cluster</div>
            <div className="text-base font-extrabold text-[#84CC16]">Neo4j v5.12</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'bg-[#1A1A1A] text-[#A3A3A3] hover:text-[#FAFAFA] border border-[#2E2E2E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes or entities..."
            className="w-full sm:w-64 pl-9 pr-3 py-1.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-xs text-[#FAFAFA] placeholder-[#A3A3A3]/60 focus:outline-none focus:border-[#059669]"
          />
        </div>
      </div>

      {/* Graph Visual Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Explorer Cards */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedNode?.id === node.id 
                  ? 'bg-[#059669]/15 border-[#059669]/50 shadow-lg shadow-emerald-950/40' 
                  : 'bg-[#1A1A1A] border-[#2E2E2E] hover:border-[#059669]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-xs text-[#FAFAFA]">{node.name}</div>
                <span className="text-[9px] px-2 py-0.5 rounded font-mono font-bold bg-[#0A0A0A] border border-[#2E2E2E] text-[#10B981]">
                  {node.type}
                </span>
              </div>
              <p className="text-[11px] text-[#A3A3A3] mt-1">Status: <strong className="text-[#FAFAFA]">{node.status}</strong></p>
            </div>
          ))}
        </div>

        {/* Selected Node Connections Graph Details */}
        {selectedNode && (
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2E2E2E]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#10B981]">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#FAFAFA]">{selectedNode.name}</h3>
                    <span className="text-xs text-[#A3A3A3]">Entity Type: {selectedNode.type}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#059669]/20 text-[#10B981] text-xs font-mono font-bold border border-[#059669]/40">
                  {selectedNode.status}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] space-y-1">
                  <span className="text-[10px] text-[#A3A3A3] uppercase font-bold">Active Connected Nodes:</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedNode.connections.map((conn, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-[#10B981] font-mono text-[11px]">
                        {conn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterpriseKnowledgeGraph;
