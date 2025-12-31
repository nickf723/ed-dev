"use client";
import { useState } from "react";
import { 
  Binary, Braces, FunctionSquare, Box, Activity, 
  PieChart, ShieldQuestion, ChevronRight 
} from "lucide-react";

// The Map of Mathematics (Same data, compact UI)
const domains = [
  {
    id: "foundations", label: "Foundations", icon: ShieldQuestion, color: "text-rose-400",
    items: ["Logic", "Set Theory", "Category Theory", "Computability"]
  },
  {
    id: "structures", label: "Structures", icon: Box, color: "text-amber-400",
    items: ["Number Theory", "Algebra", "Combinatorics", "Order Theory"]
  },
  {
    id: "space", label: "Space", icon: Braces, color: "text-emerald-400",
    items: ["Geometry", "Topology", "Manifolds", "Trigonometry"]
  },
  {
    id: "change", label: "Change", icon: Activity, color: "text-blue-400",
    items: ["Calculus", "Diff. Equations", "Chaos Theory", "Complex Analysis"]
  },
  {
    id: "applied", label: "Applied", icon: PieChart, color: "text-violet-400",
    items: ["Probability", "Statistics", "Game Theory", "Cryptography"]
  }
];

export default function CompactSyllabus() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 sticky top-0 bg-[#0a0a0a] z-10 py-2">
            Fields of Study
        </h3>
        <div className="space-y-2">
            {domains.map((d) => (
                <div key={d.id} className="border border-white/5 rounded-lg overflow-hidden bg-white/5">
                    <button 
                        onClick={() => setActiveDomain(activeDomain === d.id ? null : d.id)}
                        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <d.icon size={16} className={d.color} />
                            <span className="font-bold text-sm text-zinc-200">{d.label}</span>
                        </div>
                        <ChevronRight size={14} className={`text-zinc-500 transition-transform ${activeDomain === d.id ? "rotate-90" : ""}`} />
                    </button>
                    
                    {activeDomain === d.id && (
                        <div className="bg-black/20 p-2 border-t border-white/5 grid grid-cols-1 gap-1">
                            {d.items.map(item => (
                                <div key={item} className="px-3 py-1.5 rounded hover:bg-white/5 text-xs text-zinc-400 cursor-help flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full bg-current opacity-50`} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
}