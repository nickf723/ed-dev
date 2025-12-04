"use client";
import { useState } from "react";
import { RefreshCw, Check, X, ArrowRight, RotateCw, Grid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- GROUP DATA ---
const GROUPS = {
  Z4: {
    name: "Cyclic Group Z4",
    elements: ["0", "1", "2", "3"],
    op: (a: string, b: string) => ((parseInt(a) + parseInt(b)) % 4).toString(),
    desc: "Think of a clock with 4 hours. 1 + 3 = 0 (midnight). This is modular arithmetic."
  },
  V4: {
    name: "Klein Four-Group",
    elements: ["e", "a", "b", "c"],
    op: (a: string, b: string) => {
        if (a === "e") return b;
        if (b === "e") return a;
        if (a === b) return "e";
        // The remaining case is the third element
        return ["e", "a", "b", "c"].find(x => x !== "e" && x !== a && x !== b) || "e";
    },
    desc: "The symmetries of a non-square rectangle. Flipping it twice brings it back to start (a*a = e)."
  }
};

export default function GroupCalculator() {
  const [activeGroup, setActiveGroup] = useState<"Z4" | "V4">("Z4");
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null);

  const group = GROUPS[activeGroup];
  const size = group.elements.length;

  return (
    <div className="w-full max-w-4xl bg-neutral-900/60 border border-violet-500/30 rounded-3xl overflow-hidden backdrop-blur-xl flex flex-col md:flex-row shadow-2xl">
      
      {/* LEFT: CONTROLS & INFO */}
      <div className="p-8 md:w-1/3 border-r border-violet-500/10 bg-black/20 flex flex-col">
          <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-4 flex items-center gap-2">
                  <Grid size={14} /> Select Structure
              </h3>
              <div className="flex gap-2">
                  {(Object.keys(GROUPS) as Array<"Z4" | "V4">).map(k => (
                      <button 
                        key={k}
                        onClick={() => { setActiveGroup(k); setSelectedCell(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${activeGroup === k ? "bg-violet-600 border-violet-500 text-white" : "bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10"}`}
                      >
                          {k}
                      </button>
                  ))}
              </div>
          </div>

          <div className="mb-auto">
              <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {group.desc}
              </p>
              
              {selectedCell ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-violet-900/20 border border-violet-500/30"
                  >
                      <div className="text-[10px] uppercase tracking-widest text-violet-300 mb-2">Operation</div>
                      <div className="flex items-center gap-4 text-2xl font-mono text-white">
                          <span className="opacity-50">{group.elements[selectedCell.r]}</span>
                          <span className="text-violet-500">•</span>
                          <span className="opacity-50">{group.elements[selectedCell.c]}</span>
                          <ArrowRight size={20} className="text-violet-500" />
                          <span className="font-bold text-violet-200">
                              {group.op(group.elements[selectedCell.r], group.elements[selectedCell.c])}
                          </span>
                      </div>
                  </motion.div>
              ) : (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-neutral-500 italic text-center">
                      Hover over the Cayley Table to inspect operations.
                  </div>
              )}
          </div>
      </div>

      {/* RIGHT: THE CAYLEY TABLE */}
      <div className="p-8 md:w-2/3 bg-black/40 flex items-center justify-center relative">
          
          <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${size}, minmax(0, 1fr))` }}>
              
              {/* Header Row */}
              <div className="w-12 h-12 flex items-center justify-center text-violet-500 font-black text-lg">•</div>
              {group.elements.map((el, i) => (
                  <div key={i} className="w-12 h-12 flex items-center justify-center font-bold text-neutral-300 bg-white/5 rounded-lg">
                      {el}
                  </div>
              ))}

              {/* Table Body */}
              {group.elements.map((rowEl, r) => (
                  <>
                      {/* Row Header */}
                      <div className="w-12 h-12 flex items-center justify-center font-bold text-neutral-300 bg-white/5 rounded-lg">
                          {rowEl}
                      </div>
                      
                      {/* Cells */}
                      {group.elements.map((colEl, c) => {
                          const result = group.op(rowEl, colEl);
                          const isActive = selectedCell?.r === r && selectedCell?.c === c;
                          const isIdentity = result === (activeGroup === "Z4" ? "0" : "e");
                          
                          return (
                              <motion.button
                                  key={`${r}-${c}`}
                                  onMouseEnter={() => setSelectedCell({r, c})}
                                  className={`
                                    w-12 h-12 flex items-center justify-center rounded-lg font-mono text-lg transition-all duration-200
                                    ${isActive 
                                        ? "bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-110 z-10" 
                                        : "bg-white/5 text-neutral-400 hover:bg-white/10"
                                    }
                                    ${isIdentity && !isActive ? "border border-violet-500/30 text-violet-300" : "border border-transparent"}
                                  `}
                              >
                                  {result}
                              </motion.button>
                          )
                      })}
                  </>
              ))}
          </div>

          <div className="absolute bottom-4 right-4 text-[10px] text-neutral-600 font-mono">
              CAYLEY_TABLE_VISUALIZER // V.1.0
          </div>

      </div>
    </div>
  );
}