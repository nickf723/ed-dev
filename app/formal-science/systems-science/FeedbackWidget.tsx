"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, TrendingUp, Activity, ArrowRightCircle } from "lucide-react";

const LOOPS = [
  {
    id: "reinforcing",
    name: "Reinforcing Loop",
    symbol: "R",
    icon: TrendingUp,
    color: "text-red-400",
    desc: "Compound interest, viral growth, population explosion. Change leads to MORE change.",
    example: "More births → Larger population → More births"
  },
  {
    id: "balancing",
    name: "Balancing Loop",
    symbol: "B",
    icon: RefreshCcw,
    color: "text-emerald-400",
    desc: "Thermostats, hunger, predator-prey. Change leads to resistance, seeking equilibrium.",
    example: "Hunger → Eat → Less Hunger"
  }
];

export default function FeedbackWidget() {
  const [activeLoop, setActiveLoop] = useState<string | null>(null);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Activity size={14} className="text-purple-400" /> System Archetypes
        </h3>
      </div>

      <div className="p-4 space-y-3">
        {LOOPS.map((loop) => {
            const isActive = activeLoop === loop.id;
            return (
                <div 
                    key={loop.id}
                    onMouseEnter={() => setActiveLoop(loop.id)}
                    className={`group relative rounded-lg border p-4 transition-all duration-300 cursor-default
                        ${isActive 
                            ? `bg-neutral-800 border-white/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]` 
                            : "bg-neutral-900/50 border-white/5 hover:bg-neutral-800/80"}
                    `}
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full border bg-neutral-950 font-serif font-bold ${loop.color} border-current`}>
                                {loop.symbol}
                            </div>
                            <span className={`text-sm font-bold transition-colors ${isActive ? "text-white" : "text-neutral-400"}`}>
                                {loop.name}
                            </span>
                        </div>
                        <loop.icon size={16} className={`transition-opacity ${isActive ? "opacity-100" : "opacity-20"} ${loop.color}`} />
                    </div>
                    
                    {/* Expandable Details */}
                    <motion.div
                        initial={false}
                        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 border-t border-white/5 mt-2">
                            <p className="text-[11px] text-neutral-400 leading-relaxed mb-2">
                                {loop.desc}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 bg-black/20 p-2 rounded">
                                <ArrowRightCircle size={12} />
                                {loop.example}
                            </div>
                        </div>
                    </motion.div>
                </div>
            );
        })}
      </div>
      
      <div className="bg-neutral-950/50 px-5 py-3 border-t border-white/5">
        <p className="text-[10px] text-neutral-500 font-mono">
            {activeLoop ? "> SIMULATION_NODE_ACTIVE" : "> HOVER TO ANALYZE LOOP DYNAMICS"}
        </p>
      </div>
    </div>
  );
}