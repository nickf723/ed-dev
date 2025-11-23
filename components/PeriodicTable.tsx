"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// Simplified Dataset (First 18 elements + some notable ones for demo)
const ELEMENTS = [
  { z: 1, symbol: "H", name: "Hydrogen", group: "Nonmetal", mass: 1.008, config: "1s1" },
  { z: 2, symbol: "He", name: "Helium", group: "Noble Gas", mass: 4.002, config: "1s2" },
  { z: 3, symbol: "Li", name: "Lithium", group: "Alkali Metal", mass: 6.94, config: "[He] 2s1" },
  { z: 4, symbol: "Be", name: "Beryllium", group: "Alkaline Earth", mass: 9.012, config: "[He] 2s2" },
  { z: 5, symbol: "B", name: "Boron", group: "Metalloid", mass: 10.81, config: "[He] 2s2 2p1" },
  { z: 6, symbol: "C", name: "Carbon", group: "Nonmetal", mass: 12.01, config: "[He] 2s2 2p2" },
  { z: 7, symbol: "N", name: "Nitrogen", group: "Nonmetal", mass: 14.00, config: "[He] 2s2 2p3" },
  { z: 8, symbol: "O", name: "Oxygen", group: "Nonmetal", mass: 16.00, config: "[He] 2s2 2p4" },
  { z: 9, symbol: "F", name: "Fluorine", group: "Halogen", mass: 19.00, config: "[He] 2s2 2p5" },
  { z: 10, symbol: "Ne", name: "Neon", group: "Noble Gas", mass: 20.18, config: "[He] 2s2 2p6" },
  { z: 11, symbol: "Na", name: "Sodium", group: "Alkali Metal", mass: 22.99, config: "[Ne] 3s1" },
  { z: 12, symbol: "Mg", name: "Magnesium", group: "Alkaline Earth", mass: 24.30, config: "[Ne] 3s2" },
  // ... Jumping to Transition Metals for visual variety
  { z: 26, symbol: "Fe", name: "Iron", group: "Transition Metal", mass: 55.84, config: "[Ar] 3d6 4s2" },
  { z: 79, symbol: "Au", name: "Gold", group: "Transition Metal", mass: 196.97, config: "[Xe] 4f14 5d10 6s1" },
  { z: 92, symbol: "U", name: "Uranium", group: "Actinide", mass: 238.03, config: "[Rn] 5f3 6d1 7s2" },
];

// Group Colors
const categoryColors: Record<string, string> = {
    "Alkali Metal": "bg-red-500/20 border-red-500/50 text-red-300",
    "Alkaline Earth": "bg-orange-500/20 border-orange-500/50 text-orange-300",
    "Transition Metal": "bg-yellow-500/20 border-yellow-500/50 text-yellow-300",
    "Metalloid": "bg-green-500/20 border-green-500/50 text-green-300",
    "Nonmetal": "bg-blue-500/20 border-blue-500/50 text-blue-300",
    "Halogen": "bg-indigo-500/20 border-indigo-500/50 text-indigo-300",
    "Noble Gas": "bg-purple-500/20 border-purple-500/50 text-purple-300",
    "Actinide": "bg-pink-500/20 border-pink-500/50 text-pink-300",
};

type Element = typeof ELEMENTS[0];

export default function PeriodicTable({ onSelect }: { onSelect: (e: Element) => void }) {
  
  // Grid Position Logic (Simplified for Demo)
  // In a full app, you'd map Z to (row, col) coordinates
  const getPos = (z: number) => {
      if (z === 1) return { row: 1, col: 1 };
      if (z === 2) return { row: 1, col: 18 };
      if (z >= 3 && z <= 10) return { row: 2, col: z === 3 || z === 4 ? z - 2 : z + 8 }; // Skip gap
      if (z >= 11 && z <= 18) return { row: 3, col: z === 11 || z === 12 ? z - 10 : z };
      
      // Just placing the extras arbitrarily for the demo layout
      if (z === 26) return { row: 4, col: 8 };
      if (z === 79) return { row: 6, col: 11 };
      if (z === 92) return { row: 7, col: 5 }; // Actinides usually pulled out
      return { row: 1, col: 1 };
  };

  return (
    <div className="relative w-full overflow-x-auto pb-4">
       <div className="grid gap-2 min-w-[800px]" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))", gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
           {ELEMENTS.map((e) => {
               const pos = getPos(e.z);
               const style = categoryColors[e.group] || "bg-neutral-800 border-neutral-700 text-neutral-400";
               
               return (
                   <motion.button
                        key={e.z}
                        onClick={() => onSelect(e)}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        className={`aspect-square flex flex-col items-center justify-center rounded border transition-all ${style}`}
                        style={{ gridColumn: pos.col, gridRow: pos.row }}
                   >
                       <span className="text-[8px] font-mono opacity-70">{e.z}</span>
                       <span className="text-sm font-bold">{e.symbol}</span>
                   </motion.button>
               );
           })}
           
           {/* Phantom placeholders to maintain grid shape if needed */}
       </div>
    </div>
  );
}