"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, RefreshCw, Swords, Hourglass, Layers } from "lucide-react";

const ARCHETYPES = [
  { 
    id: "aggro", 
    name: "Aggro", 
    icon: Swords, 
    color: "text-red-400", 
    desc: "Win fast. Uses cheap, efficient threats to reduce opponent life to 0 before they can stabilize.",
    beats: "Control",
    loses: "Midrange"
  },
  { 
    id: "control", 
    name: "Control", 
    icon: Shield, 
    color: "text-blue-400", 
    desc: "Win late. Stops early threats, draws cards, and wins with a single inevitable threat once the opponent is exhausted.",
    beats: "Combo",
    loses: "Aggro"
  },
  { 
    id: "combo", 
    name: "Combo", 
    icon: RefreshCw, 
    color: "text-purple-400", 
    desc: "Win instantly. Ignores the board state to assemble a specific interaction that wins the game on the spot.",
    beats: "Midrange",
    loses: "Control"
  }
];

export default function ArchetypeTriangle() {
  const [active, setActive] = useState(ARCHETYPES[0]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Layers size={14} className="text-amber-400" /> The Metagame
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Visual Triangle */}
        <div className="relative w-48 h-40 mb-8">
            {/* Edges */}
            <div className="absolute inset-0 flex justify-center">
                <div className="w-0.5 h-full bg-gradient-to-b from-red-500 via-purple-500 to-blue-500 opacity-30" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
                 {/* Triangle SVG Line */}
                 <svg width="100%" height="100%" className="absolute overflow-visible">
                     <polygon points="96,10 192,150 0,150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                 </svg>
            </div>

            {/* Nodes */}
            {/* Aggro (Top) */}
            <button 
                onMouseEnter={() => setActive(ARCHETYPES[0])}
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 p-2 rounded-full border-2 transition-all
                    ${active.id === 'aggro' ? "bg-red-500/20 border-red-400 text-red-400 scale-110 z-10" : "bg-neutral-900 border-neutral-700 text-neutral-500"}
                `}
            >
                <Swords size={20} />
            </button>

            {/* Combo (Bottom Right) */}
            <button 
                onMouseEnter={() => setActive(ARCHETYPES[2])}
                className={`absolute bottom-0 right-0 translate-y-2 p-2 rounded-full border-2 transition-all
                    ${active.id === 'combo' ? "bg-purple-500/20 border-purple-400 text-purple-400 scale-110 z-10" : "bg-neutral-900 border-neutral-700 text-neutral-500"}
                `}
            >
                <RefreshCw size={20} />
            </button>

            {/* Control (Bottom Left) */}
            <button 
                onMouseEnter={() => setActive(ARCHETYPES[1])}
                className={`absolute bottom-0 left-0 translate-y-2 p-2 rounded-full border-2 transition-all
                    ${active.id === 'control' ? "bg-blue-500/20 border-blue-400 text-blue-400 scale-110 z-10" : "bg-neutral-900 border-neutral-700 text-neutral-500"}
                `}
            >
                <Shield size={20} />
            </button>
            
            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                Clock
            </div>
        </div>

        {/* Info Panel */}
        <div className="w-full bg-neutral-950/50 rounded-lg border border-white/5 p-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className={`text-sm font-bold ${active.color}`}>{active.name}</h4>
                <div className="text-[10px] text-neutral-500 flex gap-2">
                    <span>Beats: <span className="text-green-400 font-bold">{active.beats}</span></span>
                </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
                {active.desc}
            </p>
        </div>

      </div>
    </div>
  );
}