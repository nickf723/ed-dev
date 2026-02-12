"use client";
import React, { useState } from 'react';
import { Play, RotateCcw, Share2 } from 'lucide-react';

// Hardcoded Graph Layout for Stability
const NODES = [
  { id: 0, x: 50, y: 150, label: 'Start' },
  { id: 1, x: 150, y: 50, label: 'A' },
  { id: 2, x: 150, y: 250, label: 'B' },
  { id: 3, x: 250, y: 150, label: 'C' },
  { id: 4, x: 350, y: 50, label: 'D' },
  { id: 5, x: 350, y: 250, label: 'E' },
  { id: 6, x: 450, y: 150, label: 'Target' },
];

const EDGES = [
  [0, 1], [0, 2], // Start -> A, B
  [1, 3], [2, 3], // A, B -> C
  [1, 4], [2, 5], // A -> D, B -> E
  [3, 4], [3, 5], // C -> D, E
  [4, 6], [5, 6]  // D, E -> Target
];

// BFS Steps
const BFS_STEPS = [
  { visited: [0], queue: [0], frontier: [], msg: "Initialize Queue with Start Node." },
  { visited: [0, 1, 2], queue: [1, 2], frontier: [1, 2], msg: "Visit neighbors of Start: A and B." },
  { visited: [0, 1, 2, 3, 4], queue: [2, 3, 4], frontier: [3, 4], msg: "Visit neighbors of A: C and D." },
  { visited: [0, 1, 2, 3, 4, 5], queue: [3, 4, 5], frontier: [5], msg: "Visit neighbors of B: E (C already visited)." },
  { visited: [0, 1, 2, 3, 4, 5, 6], queue: [], frontier: [6], msg: "Visit neighbors of D/E: Target found!" },
];

export default function BFSVisualizer() {
  const [step, setStep] = useState(0);

  const current = BFS_STEPS[step];

  // Helper to check status
  const getNodeStatus = (id: number) => {
      if (current.frontier.includes(id)) return 'frontier';
      if (current.visited.includes(id)) return 'visited';
      return 'unvisited';
  };

  return (
    <div className="w-full bg-slate-900 border border-emerald-500/30 rounded-xl p-8 shadow-2xl flex flex-col gap-8">
        
        {/* HEADER & CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Algorithm Lab</div>
                <h3 className="text-2xl font-black text-white">Breadth-First Search (BFS)</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-md">
                    BFS explores the graph layer by layer. It is guaranteed to find the shortest path in an unweighted graph.
                </p>
            </div>

            <div className="flex gap-2">
                 <button 
                    onClick={() => setStep(prev => Math.min(prev + 1, BFS_STEPS.length - 1))}
                    disabled={step === BFS_STEPS.length - 1}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold uppercase rounded flex items-center gap-2"
                 >
                     <Play size={16} /> Step
                 </button>
                 <button 
                    onClick={() => setStep(0)}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                 >
                     <RotateCcw size={16} />
                 </button>
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="bg-black/40 rounded-xl border border-slate-700 h-[300px] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />
            
            <svg width="500" height="300" viewBox="0 0 500 300">
                {/* Draw Edges */}
                {EDGES.map(([s, t], i) => {
                    const nodeS = NODES[s];
                    const nodeT = NODES[t];
                    // Highlight edge if both nodes visited? Optional, keep simple for now.
                    const isActive = current.visited.includes(s) && current.visited.includes(t);
                    return (
                        <line 
                            key={i} 
                            x1={nodeS.x} y1={nodeS.y} 
                            x2={nodeT.x} y2={nodeT.y} 
                            stroke={isActive ? "#34d399" : "#334155"} 
                            strokeWidth={isActive ? 3 : 1}
                            className="transition-all duration-500"
                        />
                    );
                })}

                {/* Draw Nodes */}
                {NODES.map((n) => {
                    const status = getNodeStatus(n.id);
                    let fill = "#1e293b"; // Unvisited (Slate-800)
                    let stroke = "#475569"; // Slate-600
                    let radius = 15;

                    if (status === 'visited') {
                        fill = "#065f46"; // Emerald-800
                        stroke = "#059669"; // Emerald-600
                    }
                    if (status === 'frontier') {
                        fill = "#10b981"; // Emerald-500
                        stroke = "#a7f3d0"; // Emerald-200
                        radius = 18; // Pulse effect
                    }

                    return (
                        <g key={n.id} className="transition-all duration-500">
                            <circle cx={n.x} cy={n.y} r={radius} fill={fill} stroke={stroke} strokeWidth="2" />
                            <text 
                                x={n.x} y={n.y + 4} 
                                textAnchor="middle" 
                                fontSize="10" 
                                fontWeight="bold" 
                                fill={status === 'frontier' ? 'black' : 'white'}
                            >
                                {n.label}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Status Bar */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-block px-4 py-2 bg-slate-900/80 backdrop-blur border border-emerald-500/30 rounded-full text-xs font-mono text-emerald-400">
                    {`> ${current.msg}`}
                </div>
            </div>
        </div>

        {/* LEGEND */}
        <div className="flex justify-center gap-8 text-xs font-bold uppercase text-slate-500">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-800 border border-slate-600 rounded-full" /> Unvisited
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-800 border border-emerald-600 rounded-full" /> Visited
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 border border-emerald-200 rounded-full animate-pulse" /> Frontier (Active)
            </div>
        </div>
    </div>
  );
}