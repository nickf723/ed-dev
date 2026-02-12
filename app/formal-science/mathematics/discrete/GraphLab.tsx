"use client";
import React, { useState, useRef } from 'react';
import { Network, Plus, Trash2, Share2 } from 'lucide-react';

interface Node {
    id: number;
    x: number;
    y: number;
}
interface Edge {
    source: number;
    target: number;
}

export default function GraphLab() {
  const [nodes, setNodes] = useState<Node[]>([
      { id: 1, x: 100, y: 100 },
      { id: 2, x: 300, y: 100 },
      { id: 3, x: 200, y: 250 }
  ]);
  const [edges, setEdges] = useState<Edge[]>([
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 1 }
  ]);
  
  const [mode, setMode] = useState<'node' | 'edge'>('node');
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
      if (mode !== 'node' || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Prevent adding node on top of another
      if (nodes.some(n => Math.hypot(n.x - x, n.y - y) < 30)) return;

      const newId = nodes.length > 0 ? Math.max(...nodes.map(n => n.id)) + 1 : 1;
      setNodes([...nodes, { id: newId, x, y }]);
  };

  const handleNodeClick = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      if (mode === 'edge') {
          if (selectedNode === null) {
              setSelectedNode(id);
          } else {
              if (selectedNode !== id) {
                  // Check if edge exists
                  const exists = edges.some(edge => 
                      (edge.source === selectedNode && edge.target === id) || 
                      (edge.source === id && edge.target === selectedNode)
                  );
                  
                  if (!exists) {
                      setEdges([...edges, { source: selectedNode, target: id }]);
                  }
              }
              setSelectedNode(null);
          }
      }
  };

  const clear = () => {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
  };

  // Calculate Degrees
  const getDegree = (id: number) => {
      return edges.filter(e => e.source === id || e.target === id).length;
  };

  return (
    <div className="w-full bg-slate-900 border border-emerald-500/30 rounded-xl p-8 shadow-2xl flex flex-col lg:flex-row gap-8">
        
        {/* CONTROLS */}
        <div className="w-full lg:w-64 space-y-6">
            <div className="pb-4 border-b border-emerald-900">
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Topology Lab</div>
                <h3 className="text-2xl font-black text-white">Graph Theory</h3>
            </div>

            <div className="flex gap-2">
                <button 
                    onClick={() => setMode('node')}
                    className={`flex-1 p-3 rounded border flex flex-col items-center gap-2 transition-all ${mode === 'node' ? 'bg-emerald-900/40 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                    <Plus size={20} />
                    <span className="text-xs font-bold uppercase">Add Node</span>
                </button>
                <button 
                    onClick={() => setMode('edge')}
                    className={`flex-1 p-3 rounded border flex flex-col items-center gap-2 transition-all ${mode === 'edge' ? 'bg-emerald-900/40 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                    <Share2 size={20} />
                    <span className="text-xs font-bold uppercase">Link Nodes</span>
                </button>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-emerald-500/10 space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                    <span>Vertices (V)</span>
                    <span className="text-white font-mono">{nodes.length}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                    <span>Edges (E)</span>
                    <span className="text-white font-mono">{edges.length}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                    <span>Max Degree</span>
                    <span className="text-white font-mono">
                        {nodes.length > 0 ? Math.max(...nodes.map(n => getDegree(n.id))) : 0}
                    </span>
                </div>
            </div>

            <button onClick={clear} className="w-full py-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50 rounded flex items-center justify-center gap-2 text-xs font-bold uppercase">
                <Trash2 size={14} /> Clear Graph
            </button>

            <div className="text-xs text-slate-500 leading-relaxed">
                {mode === 'node' ? "Click anywhere in the box to create a Vertex." : "Click two separate Vertices to connect them with an Edge."}
            </div>
        </div>

        {/* INTERACTIVE AREA */}
        <div 
            ref={containerRef}
            onClick={handleCanvasClick}
            className={`flex-1 h-[400px] bg-black/60 rounded-xl border border-slate-700 relative overflow-hidden ${mode === 'node' ? 'cursor-crosshair' : 'cursor-default'}`}
        >
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />
            
            <svg className="w-full h-full pointer-events-none">
                {/* Draw Edges */}
                {edges.map((e, i) => {
                    const source = nodes.find(n => n.id === e.source);
                    const target = nodes.find(n => n.id === e.target);
                    if (!source || !target) return null;
                    return (
                        <line 
                            key={i}
                            x1={source.x} y1={source.y}
                            x2={target.x} y2={target.y}
                            stroke="#10b981" strokeWidth="2"
                        />
                    );
                })}
            </svg>

            {/* Draw Nodes (Interactive Divs) */}
            {nodes.map((n) => (
                <div
                    key={n.id}
                    onClick={(e) => handleNodeClick(e, n.id)}
                    className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all z-10 pointer-events-auto cursor-pointer hover:scale-110 ${selectedNode === n.id ? 'bg-emerald-500 text-black border-white shadow-[0_0_15px_rgba(16,185,129,0.8)]' : 'bg-slate-900 text-emerald-500 border-emerald-500'}`}
                    style={{ left: n.x, top: n.y }}
                >
                    {getDegree(n.id)}
                </div>
            ))}
        </div>
    </div>
  );
}