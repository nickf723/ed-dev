"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Grid, Divide } from "lucide-react";
import { M } from "@/app/_components/Math";

export default function LagrangeWidget() {
  const [mounted, setMounted] = useState(false);
  const [groupSize, setGroupSize] = useState(12);
  const [subgroupSize, setSubgroupSize] = useState(3);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-full h-64 bg-black/40 border border-purple-500/20 rounded-3xl animate-pulse" />;

  // Find valid factors for visualization
  const isValid = groupSize % subgroupSize === 0;
  const numCosets = Math.floor(groupSize / subgroupSize);

  return (
    <div className="w-full bg-black/40 border border-purple-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-purple-500/20 pb-6">
          <div className="flex items-center gap-3 text-fuchsia-400">
              <div className="p-2 bg-fuchsia-500/20 rounded-lg border border-fuchsia-500/30">
                  <Grid size={20} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest">Lagrange's Tiling Engine</h3>
          </div>
          <div className="font-mono text-sm text-zinc-400 flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <M>{`|G| = ${groupSize}`}</M> 
              <span className="text-purple-500/50">|</span> 
              <M>{`|H| = ${subgroupSize}`}</M>
          </div>
      </div>

      {/* Visualizer Bar */}
      <div className="h-20 w-full rounded-xl bg-black/60 border border-white/10 flex overflow-hidden mb-8 relative shadow-inner">
          {isValid ? (
              // Draw Cosets
              Array.from({ length: numCosets }).map((_, i) => (
                  <motion.div
                      key={i}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: `${100 / numCosets}%`, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`h-full border-r border-black/50 flex items-center justify-center text-sm font-bold font-mono
                          ${i === 0 ? "bg-fuchsia-500/80 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)] z-10" : "bg-purple-900/40 text-purple-300 hover:bg-purple-800/60 transition-colors"}
                      `}
                  >
                      <M>{i === 0 ? "H" : `g_{${i}}H`}</M>
                  </motion.div>
              ))
          ) : (
              // Error State
              <div className="w-full h-full flex items-center justify-center bg-red-950/40 text-red-400 text-xs font-bold uppercase tracking-widest">
                  Invalid Subgroup Geometry (Does not divide)
              </div>
          )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-purple-950/20 p-5 rounded-xl border border-purple-500/20 shadow-inner">
              <label className="flex justify-between text-[10px] uppercase text-purple-400 font-bold tracking-widest mb-4">
                  <span>Group Order <M>|G|</M></span>
              </label>
              <select 
                  value={groupSize} 
                  onChange={(e) => setGroupSize(parseInt(e.target.value))}
                  className="w-full bg-black/60 border border-purple-500/30 text-white rounded-lg p-3 outline-none focus:border-fuchsia-500 font-mono text-sm cursor-pointer"
              >
                  {[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map(n => (
                      <option key={n} value={n}>{n}</option>
                  ))}
              </select>
          </div>
          <div className="bg-purple-950/20 p-5 rounded-xl border border-purple-500/20 shadow-inner">
              <label className="flex justify-between text-[10px] uppercase text-purple-400 font-bold tracking-widest mb-4">
                  <span>Subgroup Order <M>|H|</M></span>
              </label>
              <select 
                  value={subgroupSize} 
                  onChange={(e) => setSubgroupSize(parseInt(e.target.value))}
                  className="w-full bg-black/60 border border-purple-500/30 text-white rounded-lg p-3 outline-none focus:border-fuchsia-500 font-mono text-sm cursor-pointer"
              >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                      <option key={n} value={n}>{n}</option>
                  ))}
              </select>
          </div>
      </div>

      {/* Theorem Text */}
      <div className="mt-8 pt-6 border-t border-white/10 text-sm text-zinc-400 leading-relaxed text-center font-mono">
          {isValid ? (
              <span className="text-cyan-400 flex items-center justify-center gap-3 bg-cyan-950/30 py-3 rounded-lg border border-cyan-500/20">
                  <Divide size={16} /> 
                  <M>{`${groupSize} \\div ${subgroupSize} = ${numCosets}`}</M> 
                  <span className="text-xs font-sans uppercase tracking-widest text-cyan-200">Perfect Tiling</span>
              </span>
          ) : (
              <span className="text-red-400 flex items-center justify-center gap-3 bg-red-950/30 py-3 rounded-lg border border-red-500/20">
                  Subgroup size does not divide Group size.
              </span>
          )}
      </div>

    </div>
  );
}