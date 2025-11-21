"use client";
import { motion } from "framer-motion";
import { Box, Cpu, Dna, Layers } from "lucide-react";

export const STACKS = [
  { id: "hardware", label: "Hardware", desc: "Physical Systems", Icon: Box, color: "text-orange-400" },
  { id: "software", label: "Software", desc: "Digital Systems", Icon: Cpu, color: "text-sky-400" },
  { id: "wetware", label: "Wetware", desc: "Biological Systems", Icon: Dna, color: "text-emerald-400" },
];

type TechStackWidgetProps = {
  activeStack: string | null;
  setActiveStack: (id: string | null) => void;
};

export default function TechStackWidget({ activeStack, setActiveStack }: TechStackWidgetProps) {
  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Layers size={14} className="text-sky-400" /> Technology Stack
        </h3>
        {activeStack && (
            <button onClick={() => setActiveStack(null)} className="text-[10px] text-red-400 hover:text-red-300 uppercase font-bold">
                Reset
            </button>
        )}
      </div>

      <div className="flex flex-col p-2 gap-1">
        {STACKS.map((stack) => {
          const isActive = activeStack === stack.id;
          return (
            <button
              key={stack.id}
              onMouseEnter={() => setActiveStack(stack.id)}
              className={`group relative flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-300 border border-transparent ${
                isActive ? "bg-white/5 border-white/5" : "hover:bg-white/5"
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors duration-300 ${
                  isActive
                    ? `border-current ${stack.color} bg-neutral-950 shadow-[0_0_15px_rgba(0,0,0,0.5)]`
                    : "border-neutral-800 bg-neutral-900 text-neutral-500 group-hover:text-neutral-300"
                }`}
              >
                <stack.Icon size={18} />
              </div>

              <div className="text-left">
                <span
                  className={`block text-sm font-bold transition-colors ${
                    isActive ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {stack.label}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  {stack.desc}
                </span>
              </div>

              {/* Connection Line Animation */}
              {isActive && (
                <motion.div
                  layoutId="stackLine"
                  className={`absolute right-0 top-0 bottom-0 w-1 ${stack.color.replace("text", "bg")}`}
                />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="bg-neutral-950/50 px-5 py-3 border-t border-white/5">
        <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${activeStack ? "animate-ping bg-green-500" : "bg-neutral-700"}`} />
            <p className="text-[10px] text-neutral-500 font-mono">
                {activeStack ? `SYSTEM_FILTER: ${activeStack.toUpperCase()}` : "SYSTEM_READY"}
            </p>
        </div>
      </div>
    </div>
  );
}