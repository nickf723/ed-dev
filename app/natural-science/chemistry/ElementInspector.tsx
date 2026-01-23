"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, Scale, Zap, Layers } from "lucide-react";

// Re-using the type locally for simplicity
export type Element = { z: number; symbol: string; name: string; group: string; mass: number; config: string };

export default function ElementInspector({ element }: { element: Element | null }) {
  
  if (!element) {
      return (
          <div className="glass h-full rounded-xl border border-white/10 bg-neutral-900/80 p-8 flex flex-col items-center justify-center text-center text-neutral-500">
              <Atom size={48} className="mb-4 opacity-20" />
              <p className="text-xs uppercase tracking-widest">Select an Element</p>
          </div>
      );
  }

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Atom size={14} className="text-lime-400" /> Atomic Data
        </h3>
        <span className="text-2xl font-black text-white/10">{element.z}</span>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Big Symbol */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center bg-neutral-950 rounded-2xl border border-white/10 shadow-inner">
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600">
                {element.symbol}
            </span>
            <div className="absolute top-2 left-3 text-xs font-mono text-lime-400">{element.z}</div>
            <div className="absolute bottom-2 right-3 text-xs font-mono text-neutral-500">{element.mass.toFixed(2)}</div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">{element.name}</h2>
        <span className="inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-lime-300 mb-6">
            {element.group}
        </span>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-1 gap-3">
            <StatRow icon={Scale} label="Atomic Mass" value={`${element.mass} u`} />
            <StatRow icon={Layers} label="Electron Config" value={element.config} />
            <StatRow icon={Zap} label="Electronegativity" value="Unknown" /> {/* Placeholder for expansion */}
        </div>

      </div>
    </div>
  );
}

function StatRow({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950/50 border border-white/5">
            <div className="flex items-center gap-2 text-neutral-400">
                <Icon size={14} />
                <span className="text-xs font-medium">{label}</span>
            </div>
            <span className="text-xs font-mono text-white">{value}</span>
        </div>
    );
}