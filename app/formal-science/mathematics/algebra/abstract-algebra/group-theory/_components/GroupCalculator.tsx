"use client";
import React, { useState } from "react";
import { ArrowRight, Grid } from "lucide-react";
import { motion } from "framer-motion";
import { M } from "@/app/_components/Math";

// --- GROUP DATA ---
const GROUPS = {
  Z4: {
    name: "Cyclic Group Z₄",
    elements: ["0", "1", "2", "3"],
    op: (a: string, b: string) => ((parseInt(a) + parseInt(b)) % 4).toString(),
    desc: "Modular arithmetic. Think of a clock with 4 hours. 1 + 3 = 0 (midnight). The generator loops endlessly.",
    identity: "0"
  },
  V4: {
    name: "Klein Four-Group (V)",
    elements: ["e", "a", "b", "c"],
    op: (a: string, b: string) => {
        if (a === "e") return b;
        if (b === "e") return a;
        if (a === b) return "e";
        return ["e", "a", "b", "c"].find(x => x !== "e" && x !== a && x !== b) || "e";
    },
    desc: "The symmetries of a non-square rectangle. Flipping it twice brings it back to the start state. Every element is its own inverse.",
    identity: "e"
  }
};

export default function GroupCalculator() {
  const [activeGroup, setActiveGroup] = useState<"Z4" | "V4">("Z4");
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null);

  const group = GROUPS[activeGroup];
  const size = group.elements.length;

  return (
    <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col lg:flex-row relative z-10">
      
      {/* LEFT: CONTROLS & INFO */}
      <div className="w-full lg:w-1/3 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20 flex flex-col relative z-20">
          <div className="mb-8">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2">
                  <Grid size={14} /> Select Structure
              </h3>
              <div className="flex gap-2">
                  {(Object.keys(GROUPS) as Array<"Z4" | "V4">).map(k => (
                      <button 
                        key={k}
                        onClick={() => { setActiveGroup(k); setSelectedCell(null); }}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold font-mono transition-all border ${activeGroup === k ? "bg-purple-900/60 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "bg-black/40 border-white/5 text-zinc-500 hover:border-purple-500/50 hover:text-purple-300"}`}
                      >
                          {k}
                      </button>
                  ))}
              </div>
          </div>

          <div className="mb-auto">
              <h3 className="text-2xl font-black text-white mb-2">{group.name}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                  {group.desc}
              </p>
              
              {selectedCell ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-black/60 border border-purple-500/30 shadow-inner"
                  >
                      <div className="text-[10px] uppercase tracking-widest text-purple-400 mb-3 font-bold">Group Operation</div>
                      <div className="flex items-center justify-between text-2xl font-mono text-white bg-white/5 p-4 rounded-xl border border-white/5">
                          <span className="text-zinc-500">{group.elements[selectedCell.r]}</span>
                          <span className="text-purple-500 text-sm">●</span>
                          <span className="text-zinc-500">{group.elements[selectedCell.c]}</span>
                          <ArrowRight size={20} className="text-purple-500" />
                          <span className="font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                              {group.op(group.elements[selectedCell.r], group.elements[selectedCell.c])}
                          </span>
                      </div>
                  </motion.div>
              ) : (
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-xs text-zinc-500 italic text-center">
                      Hover over the Cayley Table to inspect binary operations.
                  </div>
              )}
          </div>
      </div>

      {/* RIGHT: THE CAYLEY TABLE */}
      <div className="p-6 md:p-8 lg:w-2/3 bg-black/40 flex items-center justify-center relative">
          
          <div className="grid gap-2" style={{ gridTemplateColumns: `auto repeat(${size}, minmax(0, 1fr))` }}>
              
              {/* Header Row */}
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-purple-500 font-black text-xl">●</div>
              {group.elements.map((el, i) => (
                  <div key={i} className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold font-mono text-white bg-white/5 border border-white/10 rounded-xl shadow-inner">
                      {el}
                  </div>
              ))}

              {/* Table Body */}
              {group.elements.map((rowEl, r) => (
                  <React.Fragment key={`row-${r}`}>
                      {/* Row Header */}
                      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold font-mono text-white bg-white/5 border border-white/10 rounded-xl shadow-inner">
                          {rowEl}
                      </div>
                      
                      {/* Cells */}
                      {group.elements.map((colEl, c) => {
                          const result = group.op(rowEl, colEl);
                          const isActive = selectedCell?.r === r && selectedCell?.c === c;
                          const isIdentity = result === group.identity;
                          
                          return (
                              <motion.button
                                  key={`${r}-${c}`}
                                  onMouseEnter={() => setSelectedCell({r, c})}
                                  className={`
                                    w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl font-mono text-xl transition-all duration-200
                                    ${isActive 
                                        ? "bg-cyan-900/80 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110 z-10 font-black" 
                                        : "bg-black/60 text-zinc-500 hover:bg-white/10"
                                    }
                                    ${isIdentity && !isActive ? "border border-emerald-500/30 text-emerald-400" : "border border-white/5"}
                                  `}
                              >
                                  {result}
                              </motion.button>
                          )
                      })}
                  </React.Fragment>
              ))}
          </div>

          <div className="absolute bottom-4 right-4 text-[10px] text-zinc-600 font-mono font-bold tracking-widest uppercase">
              Cayley_Table_Engine
          </div>
      </div>
    </div>
  );
}