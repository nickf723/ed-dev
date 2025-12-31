"use client";
import Link from "next/link";
import { 
  Blocks, Variable, Triangle, Grid3X3, Activity, 
  BarChart3, Key
} from "lucide-react";
import { useState } from "react";

// The 7 Pillars
const NODES = [
  { id: "foundations", label: "Foundations", icon: Blocks, angle: 0, color: "text-rose-400" },
  { id: "algebra", label: "Algebra", icon: Variable, angle: 51.4, color: "text-amber-400" },
  { id: "geometry", label: "Geometry", icon: Triangle, angle: 102.8, color: "text-emerald-400" },
  { id: "discrete", label: "Discrete", icon: Grid3X3, angle: 154.2, color: "text-cyan-400" },
  { id: "calculus", label: "Calculus", icon: Activity, angle: 205.6, color: "text-blue-400" },
  { id: "statistics", label: "Statistics", icon: BarChart3, angle: 257, color: "text-violet-400" },
  { id: "number-theory", label: "Number Theory", icon: Key, angle: 308.4, color: "text-fuchsia-400" },
];

export default function MathLattice() {
  const [hovered, setHovered] = useState<string | null>(null);
  
  // Radius of the Heptagon
  const RADIUS = 280; 
  
  // Convert polar to cartesian
  const getPos = (angleDeg: number, r: number) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 to start at top
    return {
      x: r * Math.cos(angleRad),
      y: r * Math.sin(angleRad)
    };
  };

  return (
    <div className="relative w-[800px] h-[800px] flex items-center justify-center">
      
      {/* SVG CONNECTORS (The Graph Edges) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>
        
        {/* Draw lines from Center to Nodes */}
        {NODES.map((node) => {
            const pos = getPos(node.angle, RADIUS);
            // Center is 400, 400
            return (
                <line 
                    key={`center-${node.id}`}
                    x1={400} y1={400} 
                    x2={400 + pos.x} y2={400 + pos.y}
                    stroke="url(#edge-gradient)"
                    strokeWidth="1"
                />
            );
        })}

        {/* Draw lines between Neighbors (The Heptagon Ring) */}
        {NODES.map((node, i) => {
            const nextNode = NODES[(i + 1) % NODES.length];
            const pos1 = getPos(node.angle, RADIUS);
            const pos2 = getPos(nextNode.angle, RADIUS);
            return (
                <line 
                    key={`ring-${i}`}
                    x1={400 + pos1.x} y1={400 + pos1.y} 
                    x2={400 + pos2.x} y2={400 + pos2.y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />
            );
        })}
      </svg>

      {/* CENTER NODE (Euler) */}
      <div className="absolute z-20 flex flex-col items-center justify-center w-40 h-40 bg-[#09090b] border border-white/10 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.05)]">
         <div className="text-3xl font-serif text-white font-bold italic mb-1">e<sup className="text-amber-500 text-lg">iπ</sup></div>
         <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">+ 1 = 0</div>
      </div>

      {/* OUTER NODES */}
      {NODES.map((node) => {
          const pos = getPos(node.angle, RADIUS);
          const isHovered = hovered === node.id;

          return (
            <Link
                key={node.id}
                href={`/formal-science/mathematics/${node.id}`}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                className="absolute z-30 group"
                style={{ 
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                }}
            >
                {/* Node Label (Floats outside) */}
                <div className={`
                    absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300
                    ${isHovered ? "text-white translate-y-0" : "text-zinc-600 translate-y-2 opacity-0 group-hover:opacity-100"}
                `}>
                    {node.label}
                </div>

                {/* The Vertex Point */}
                <div className={`
                    w-16 h-16 -ml-8 -mt-8 rounded-full bg-[#09090b] border flex items-center justify-center transition-all duration-300
                    ${isHovered ? `border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-110` : "border-white/10 scale-100"}
                `}>
                    <node.icon 
                        size={24} 
                        className={`transition-colors duration-300 ${isHovered ? node.color : "text-zinc-600"}`} 
                    />
                </div>
            </Link>
          );
      })}

    </div>
  );
}