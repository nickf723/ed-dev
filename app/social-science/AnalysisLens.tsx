"use client";
import { motion } from "framer-motion";
import { User, Users, Globe, ZoomIn } from "lucide-react";

export const LENSES = [
  { id: "micro", label: "Micro-Level", desc: "The Individual", Icon: User, color: "text-blue-400" },
  { id: "meso", label: "Meso-Level", desc: "Groups & Markets", Icon: Users, color: "text-indigo-400" },
  { id: "macro", label: "Macro-Level", desc: "Societies & Systems", Icon: Globe, color: "text-purple-400" },
];

type AnalysisLensProps = {
  activeLens: string | null;
  setActiveLens: (id: string | null) => void;
};

export default function AnalysisLens({ activeLens, setActiveLens }: AnalysisLensProps) {
  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <ZoomIn size={14} className="text-indigo-400" /> Scope of Analysis
        </h3>
        {activeLens && (
            <button onClick={() => setActiveLens(null)} className="text-[10px] text-red-400 hover:text-red-300 uppercase font-bold">
                Reset
            </button>
        )}
      </div>

      <div className="flex flex-col p-2">
        {LENSES.map((lens) => {
          const isActive = activeLens === lens.id;
          return (
            <button
              key={lens.id}
              onMouseEnter={() => setActiveLens(lens.id)}
              className={`group relative flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-300 ${
                isActive ? "bg-white/5" : "hover:bg-white/5"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isActive
                    ? `border-current ${lens.color} bg-neutral-950`
                    : "border-neutral-700 bg-neutral-900 text-neutral-500 group-hover:text-neutral-300"
                }`}
              >
                <lens.Icon size={16} />
              </div>

              <div className="text-left">
                <span
                  className={`block text-sm font-bold transition-colors ${
                    isActive ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {lens.label}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  {lens.desc}
                </span>
              </div>

              {/* Active Indicator Bar */}
              {isActive && (
                <motion.div
                  layoutId="lensActive"
                  className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full ${lens.color.replace("text", "bg")}`}
                />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="bg-neutral-950/30 px-5 py-3 border-t border-white/5">
        <p className="text-[10px] text-neutral-500 leading-relaxed">
            {activeLens === 'micro' && "Focus: Cognitive processes, individual behavior, and agency."}
            {activeLens === 'meso' && "Focus: Interaction, community dynamics, and economic exchange."}
            {activeLens === 'macro' && "Focus: Cultural norms, political structures, and global systems."}
            {!activeLens && "Hover to filter by analytical scope."}
        </p>
      </div>
    </div>
  );
}