"use client";
import { motion } from "framer-motion";
import { ELEMENTS, GROUP_COLORS, ChemicalElement } from "./chemistry-data";

export default function PeriodicTable({ onSelect, activeZ }: { onSelect: (e: ChemicalElement) => void, activeZ: number }) {
  
  // Basic Grid Mapper
  const getPos = (z: number) => {
      if (z === 1) return { r: 1, c: 1 };
      if (z === 2) return { r: 1, c: 18 };
      
      if (z >= 3 && z <= 4) return { r: 2, c: z - 2 };
      if (z >= 5 && z <= 10) return { r: 2, c: z + 8 };

      if (z >= 11 && z <= 12) return { r: 3, c: z - 10 };
      if (z >= 13 && z <= 18) return { r: 3, c: z };

      // Row 4 (K=19 to Kr=36)
      if (z >= 19 && z <= 36) return { r: 4, c: z - 18 };

      // Manual placements for our "Notable" extras
      if (z === 79) return { r: 6, c: 11 }; // Gold
      if (z === 92) return { r: 7, c: 5 };  // Uranium (Actinide row usually separate, but grid-locking here for simplicity)

      return { r: 1, c: 1 };
  };

  return (
    <div className="relative w-full overflow-x-auto pb-4 custom-scrollbar">
       <div className="grid gap-1 min-w-[700px]" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))", gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
           {ELEMENTS.map((e) => {
               const pos = getPos(e.z);
               const style = GROUP_COLORS[e.group] || "border-neutral-700 text-neutral-500";
               const isActive = activeZ === e.z;
               
               return (
                   <motion.button
                       key={e.z}
                       onClick={() => onSelect(e)}
                       whileHover={{ scale: 1.2, zIndex: 10 }}
                       className={`
                           aspect-square flex flex-col items-center justify-center rounded border bg-[#0f172a] transition-all
                           ${style}
                           ${isActive ? "ring-2 ring-white z-10 scale-110 bg-slate-800" : "opacity-80 hover:opacity-100"}
                       `}
                       style={{ gridColumn: pos.c, gridRow: pos.r }}
                   >
                       <span className="text-[9px] font-mono opacity-60 leading-none">{e.z}</span>
                       <span className="text-xs md:text-sm font-bold leading-none mt-0.5">{e.symbol}</span>
                   </motion.button>
               );
           })}
           
           {/* Row Labels (Optional for polish) */}
           <div className="col-start-1 row-start-1 text-[8px] text-slate-700 flex items-center -ml-4">1</div>
           <div className="col-start-1 row-start-2 text-[8px] text-slate-700 flex items-center -ml-4">2</div>
           <div className="col-start-1 row-start-3 text-[8px] text-slate-700 flex items-center -ml-4">3</div>
           <div className="col-start-1 row-start-4 text-[8px] text-slate-700 flex items-center -ml-4">4</div>
       </div>
    </div>
  );
}