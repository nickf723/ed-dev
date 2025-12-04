"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Grid, Divide } from "lucide-react";

export default function LagrangeWidget() {
  const [groupSize, setGroupSize] = useState(12);
  const [subgroupSize, setSubgroupSize] = useState(3);

  // Find valid factors for visualization
  const isValid = groupSize % subgroupSize === 0;
  const numCosets = Math.floor(groupSize / subgroupSize);

  return (
    <div className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-pink-400">
              <Grid size={18} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Lagrange's Theorem</h3>
          </div>
          <div className="font-mono text-xs text-neutral-500">
              |G| = {groupSize} // |H| = {subgroupSize}
          </div>
      </div>

      {/* Visualizer Bar */}
      <div className="h-16 w-full rounded-xl bg-white/5 border border-white/10 flex overflow-hidden mb-6 relative">
          
          {isValid ? (
              // Draw Cosets
              Array.from({ length: numCosets }).map((_, i) => (
                  <motion.div
                      key={i}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: `${100 / numCosets}%`, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`h-full border-r border-black/50 flex items-center justify-center text-xs font-bold font-mono
                          ${i === 0 ? "bg-pink-500 text-white" : "bg-pink-500/20 text-pink-300"}
                      `}
                  >
                      {i === 0 ? "H" : `g${i}H`}
                  </motion.div>
              ))
          ) : (
              // Error State
              <div className="w-full h-full flex items-center justify-center bg-red-900/20 text-red-400 text-xs font-bold uppercase tracking-widest">
                  Invalid Subgroup Size
              </div>
          )}
          
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-8">
          <div>
              <label className="block text-[10px] uppercase text-neutral-500 mb-2">Group Order |G|</label>
              <input 
                  type="range" min="4" max="24" step="2"
                  value={groupSize} 
                  onChange={(e) => setGroupSize(parseInt(e.target.value))}
                  className="w-full accent-pink-500 h-1 bg-white/10 rounded appearance-none"
              />
          </div>
          <div>
              <label className="block text-[10px] uppercase text-neutral-500 mb-2">Subgroup Order |H|</label>
              <input 
                  type="range" min="2" max="12" 
                  value={subgroupSize} 
                  onChange={(e) => setSubgroupSize(parseInt(e.target.value))}
                  className="w-full accent-pink-500 h-1 bg-white/10 rounded appearance-none"
              />
          </div>
      </div>

      {/* Theorem Text */}
      <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-neutral-400 leading-relaxed text-center">
          {isValid ? (
              <span className="text-emerald-400 flex items-center justify-center gap-2">
                  <Divide size={12} /> The order of H divides the order of G. Perfect tiling.
              </span>
          ) : (
              <span className="text-red-400">
                  Subgroup size does not divide Group size. This structure is impossible.
              </span>
          )}
      </div>

    </div>
  );
}