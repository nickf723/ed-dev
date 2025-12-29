"use client";
import { useState } from "react";
import { TrendingUp, Users, Zap, Cpu } from "lucide-react";

const datasets = {
    pop: {
        label: "Global Population",
        unit: "Billions",
        color: "text-emerald-400",
        stroke: "#34d399",
        data: [1, 1.2, 1.6, 2.5, 6, 8] // 1800, 1850, 1900, 1950, 2000, 2024
    },
    energy: {
        label: "Energy Consumption",
        unit: "TWh",
        color: "text-rose-400",
        stroke: "#fb7185",
        data: [5, 10, 25, 60, 120, 180] // Abstract scale
    },
    tech: {
        label: "Transistor Count",
        unit: "Log Scale",
        color: "text-cyan-400",
        stroke: "#22d3ee",
        data: [0, 0.1, 1, 10, 50, 100] // Abstract exp scale
    }
};

export default function AccelerationGraph() {
  const [activeTab, setActiveTab] = useState<"pop" | "energy" | "tech">("pop");
  const current = datasets[activeTab];

  // Simple SVG Path generator
  const generatePath = (data: number[]) => {
      const max = Math.max(...data);
      const points = data.map((val, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - (val / max) * 90; // Leave 10% padding
          return `${x},${y}`;
      });
      return `M ${points.join(" L ")}`;
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-6 backdrop-blur-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} className={current.color} /> The Great Acceleration
            </h3>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab("pop")} className={`p-2 rounded border border-white/10 ${activeTab==="pop" ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-500 hover:text-white"}`}><Users size={16}/></button>
            <button onClick={() => setActiveTab("energy")} className={`p-2 rounded border border-white/10 ${activeTab==="energy" ? "bg-rose-500/20 text-rose-400" : "text-zinc-500 hover:text-white"}`}><Zap size={16}/></button>
            <button onClick={() => setActiveTab("tech")} className={`p-2 rounded border border-white/10 ${activeTab==="tech" ? "bg-cyan-500/20 text-cyan-400" : "text-zinc-500 hover:text-white"}`}><Cpu size={16}/></button>
        </div>

        {/* GRAPH */}
        <div className="relative h-40 w-full border-l border-b border-zinc-600 mb-4 bg-black/20">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" vectorEffect="non-scaling-stroke" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" vectorEffect="non-scaling-stroke" />
                <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" vectorEffect="non-scaling-stroke" />
                
                {/* The Line */}
                <path 
                    d={generatePath(current.data)} 
                    fill="none" 
                    stroke={current.stroke} 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                    className="animate-[draw_1s_ease-out_forwards]"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                />
                
                {/* Area under curve (faint) */}
                <path 
                    d={`${generatePath(current.data)} L 100,100 L 0,100 Z`} 
                    fill={current.stroke} 
                    fillOpacity="0.1"
                />
            </svg>
            
            {/* Axis Labels */}
            <div className="absolute -bottom-6 left-0 text-[10px] text-zinc-500 font-mono">1800</div>
            <div className="absolute -bottom-6 right-0 text-[10px] text-zinc-500 font-mono">2024</div>
        </div>

        <div className="text-right">
            <div className="text-xs text-zinc-400 uppercase tracking-widest">{current.label}</div>
            <div className={`text-2xl font-black font-mono ${current.color}`}>EXPONENTIAL</div>
        </div>
    </div>
  );
}