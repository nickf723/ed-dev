"use client";
import { useState } from "react";
import { Share2, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

// A simple planar graph structure
const INITIAL_NODES = [
    { id: 0, x: 50, y: 50, color: 0 },
    { id: 1, x: 150, y: 50, color: 0 },
    { id: 2, x: 100, y: 130, color: 0 },
    { id: 3, x: 50, y: 210, color: 0 },
    { id: 4, x: 150, y: 210, color: 0 },
];

const CONNECTIONS = [
    [0, 1], [0, 2], [0, 3],
    [1, 2], [1, 4],
    [2, 3], [2, 4],
    [3, 4]
];

const COLORS = ["#1e293b", "#f97316", "#3b82f6", "#22c55e", "#eab308"]; // Default(Dark), Orange, Blue, Green, Yellow

export default function GraphColoring() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [solved, setSolved] = useState(false);

  const cycleColor = (id: number) => {
      setNodes(prev => {
          const newNodes = prev.map(n => n.id === id ? { ...n, color: (n.color + 1) % 5 } : n);
          checkSolution(newNodes);
          return newNodes;
      });
  };

  const checkSolution = (currentNodes: typeof INITIAL_NODES) => {
      // 1. All nodes must have a color (color > 0)
      const allColored = currentNodes.every(n => n.color !== 0);
      
      // 2. No connected nodes share a color
      const conflicts = CONNECTIONS.some(([a, b]) => {
          const nodeA = currentNodes.find(n => n.id === a);
          const nodeB = currentNodes.find(n => n.id === b);
          return nodeA?.color !== 0 && nodeA?.color === nodeB?.color;
      });

      setSolved(allColored && !conflicts);
  };

  const reset = () => {
      setNodes(INITIAL_NODES.map(n => ({ ...n, color: 0 })));
      setSolved(false);
  };

  return (
    <div className="bg-blue-900/80 border border-blue-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl max-w-sm w-full">
        
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-blue-100 flex items-center gap-2 font-mono tracking-wider">
                <Share2 size={18} className="text-orange-500" /> GRAPH_THEORY
            </h3>
            <button onClick={reset} className="text-blue-400 hover:text-white transition-colors"><RefreshCw size={14}/></button>
        </div>

        <p className="text-xs text-blue-200/60 mb-6 font-mono">
            Assignment: Assign colors to vertices such that no two adjacent vertices share the same color.
        </p>

        {/* GRAPH VISUALIZER */}
        <div className="relative h-64 w-full bg-blue-950/50 rounded-lg border border-blue-500/20 mb-4">
            <svg className="w-full h-full" viewBox="0 0 200 260">
                {/* Edges */}
                {CONNECTIONS.map(([a, b], i) => {
                    const n1 = nodes.find(n => n.id === a)!;
                    const n2 = nodes.find(n => n.id === b)!;
                    // Conflict Highlight
                    const isConflict = n1.color !== 0 && n1.color === n2.color;
                    
                    return (
                        <line 
                            key={i}
                            x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                            stroke={isConflict ? "#ef4444" : "rgba(255,255,255,0.2)"}
                            strokeWidth={isConflict ? 4 : 2}
                            className="transition-colors duration-300"
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((n) => (
                    <g key={n.id} onClick={() => cycleColor(n.id)} className="cursor-pointer hover:opacity-90">
                        <circle 
                            cx={n.x} cy={n.y} r="18" 
                            fill={COLORS[n.color]} 
                            stroke="white" strokeWidth="2"
                            className="transition-fill duration-300"
                        />
                        <text x={n.x} y={n.y} dy="4" textAnchor="middle" fill="white" fontSize="10" pointerEvents="none" fontWeight="bold">
                            {n.color === 0 ? "?" : n.color}
                        </text>
                    </g>
                ))}
            </svg>
        </div>

        {/* STATUS BAR */}
        <div className={`p-3 rounded border flex items-center gap-3 transition-colors ${solved ? "bg-green-500/20 border-green-500/50 text-green-300" : "bg-blue-950/50 border-blue-500/20 text-blue-300"}`}>
            {solved ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-xs font-bold uppercase">
                {solved ? "Valid Coloring Found" : "Unresolved Conflicts"}
            </span>
        </div>

    </div>
  );
}