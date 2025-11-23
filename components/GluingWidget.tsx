"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, RotateCw, Check, AlertCircle } from "lucide-react";

type EdgeState = "none" | "normal" | "twisted";

export default function GluingWidget() {
  // Edge States: 0 = distinct, 1 = match normal, -1 = match twisted
  // We simplify: horizontal pair (L/R) and vertical pair (T/B)
  const [horizontal, setHorizontal] = useState<"none" | "parallel" | "anti">("none");
  const [vertical, setVertical] = useState<"none" | "parallel" | "anti">("none");

  // Determine Shape
  let shape = "Square (Disk)";
  let desc = "A simple 2D surface with a boundary.";
  let orientable = true;

  if (horizontal === "none" && vertical === "none") {
      shape = "Square Sheet";
      desc = "A contractible topological disk.";
  } 
  else if (horizontal !== "none" && vertical === "none") {
      if (horizontal === "parallel") { shape = "Cylinder"; desc = "Edges glued straight. Has 2 boundary circles."; }
      if (horizontal === "anti") { shape = "Möbius Strip"; desc = "Edges glued with a twist. Non-orientable. 1 side, 1 edge."; orientable = false; }
  }
  else if (horizontal === "none" && vertical !== "none") {
       if (vertical === "parallel") { shape = "Cylinder"; desc = "Edges glued straight."; }
       if (vertical === "anti") { shape = "Möbius Strip"; desc = "Non-orientable surface."; orientable = false; }
  }
  else {
      // Both pairs connected
      if (horizontal === "parallel" && vertical === "parallel") { shape = "Torus"; desc = "Donut shape. Closed, orientable surface."; }
      else if (horizontal === "anti" && vertical === "anti") { shape = "Projective Plane"; desc = "Non-orientable. Cannot exist in 3D without self-intersection."; orientable = false; }
      else { shape = "Klein Bottle"; desc = "Closed, non-orientable surface. No inside or outside."; orientable = false; }
  }

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <RotateCw size={14} className="text-indigo-400" /> Fundamental Polygon
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* The Square Visualizer */}
        <div className="relative w-40 h-40 bg-indigo-950/30 border-2 border-indigo-500/30 mb-6 flex items-center justify-center">
            
            {/* Arrows */}
            {/* Top */}
            {vertical !== "none" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900 px-1">
                    <ArrowRight size={16} className={`text-indigo-400 ${vertical === 'anti' ? "rotate-180" : ""}`} />
                </div>
            )}
            {/* Bottom */}
            {vertical !== "none" && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-neutral-900 px-1">
                    <ArrowRight size={16} className="text-indigo-400" />
                </div>
            )}
            {/* Left */}
            {horizontal !== "none" && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-neutral-900 px-1 py-1">
                    <ArrowUp size={16} className="text-violet-400" />
                </div>
            )}
            {/* Right */}
            {horizontal !== "none" && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-neutral-900 px-1 py-1">
                     <ArrowUp size={16} className={`text-violet-400 ${horizontal === 'anti' ? "rotate-180" : ""}`} />
                </div>
            )}

            <span className="text-[10px] font-bold text-indigo-200/50">A</span>
        </div>

        {/* Result Box */}
        <motion.div 
            key={shape}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-6"
        >
            <h4 className="text-lg font-bold text-white">{shape}</h4>
            <div className="flex items-center justify-center gap-2 mt-1">
                {!orientable && <AlertCircle size={12} className="text-red-400" />}
                <span className={`text-[10px] uppercase font-bold ${orientable ? "text-green-400" : "text-red-400"}`}>
                    {orientable ? "Orientable" : "Non-Orientable"}
                </span>
            </div>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-[200px] mx-auto">
                {desc}
            </p>
        </motion.div>

        {/* Controls */}
        <div className="w-full grid grid-cols-2 gap-3">
            <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-violet-400">Purple Pair</label>
                <button onClick={() => setHorizontal("none")} className={`w-full text-[10px] py-1 rounded border ${horizontal === 'none' ? "bg-violet-500 text-white border-violet-500" : "border-white/10 text-neutral-500"}`}>None</button>
                <button onClick={() => setHorizontal("parallel")} className={`w-full text-[10px] py-1 rounded border ${horizontal === 'parallel' ? "bg-violet-500 text-white border-violet-500" : "border-white/10 text-neutral-500"}`}>Parallel</button>
                <button onClick={() => setHorizontal("anti")} className={`w-full text-[10px] py-1 rounded border ${horizontal === 'anti' ? "bg-violet-500 text-white border-violet-500" : "border-white/10 text-neutral-500"}`}>Twisted</button>
            </div>
            <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-indigo-400">Blue Pair</label>
                <button onClick={() => setVertical("none")} className={`w-full text-[10px] py-1 rounded border ${vertical === 'none' ? "bg-indigo-500 text-white border-indigo-500" : "border-white/10 text-neutral-500"}`}>None</button>
                <button onClick={() => setVertical("parallel")} className={`w-full text-[10px] py-1 rounded border ${vertical === 'parallel' ? "bg-indigo-500 text-white border-indigo-500" : "border-white/10 text-neutral-500"}`}>Parallel</button>
                <button onClick={() => setVertical("anti")} className={`w-full text-[10px] py-1 rounded border ${vertical === 'anti' ? "bg-indigo-500 text-white border-indigo-500" : "border-white/10 text-neutral-500"}`}>Twisted</button>
            </div>
        </div>

      </div>
    </div>
  );
}