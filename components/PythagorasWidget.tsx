"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Triangle } from "lucide-react";

export default function PythagorasWidget() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const c = Math.sqrt(a*a + b*b);
  
  // Scaling for visualization (max width ~200px)
  const scale = 15;

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Triangle size={14} className="text-blue-400" /> Pythagorean Lab
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        {/* Visual */}
        <div className="relative mb-8" style={{ width: (a+b)*scale + 40, height: (a+b)*scale + 40 }}>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                  {/* Triangle */}
                  <div 
                    className="absolute bottom-0 left-0 bg-white/20 z-10"
                    style={{ width: a*scale, height: b*scale, clipPath: "polygon(0 0, 100% 100%, 0% 100%)" }} 
                  />
                  
                  {/* Square A (Left) */}
                  <motion.div 
                    className="absolute border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-xs text-blue-300"
                    style={{ width: a*scale, height: a*scale, left: -a*scale, bottom: 0 }}
                    animate={{ width: a*scale, height: a*scale, left: -a*scale }}
                  >
                    {a}²
                  </motion.div>
                  
                  {/* Square B (Bottom) */}
                  <motion.div 
                    className="absolute border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-xs text-cyan-300"
                    style={{ width: b*scale, height: b*scale, left: 0, bottom: -b*scale }}
                    animate={{ width: b*scale, height: b*scale, bottom: -b*scale }}
                  >
                    {b}²
                  </motion.div>
              </div>
           </div>
        </div>

        {/* Readout */}
        <div className="text-center mb-6 font-mono text-sm">
           <span className="text-blue-400">{a}²</span> + <span className="text-cyan-400">{b}²</span> = <span className="text-white font-bold">{c.toFixed(2)}²</span>
           <div className="text-xs text-neutral-500 mt-1">
             {a*a} + {b*b} = {(a*a + b*b).toFixed(0)}
           </div>
        </div>

        {/* Sliders */}
        <div className="w-full space-y-4">
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500">
                    <span>Side A</span>
                    <span className="text-blue-400">{a}</span>
                </div>
                <input type="range" min="1" max="8" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
            </div>
             <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500">
                    <span>Side B</span>
                    <span className="text-cyan-400">{b}</span>
                </div>
                <input type="range" min="1" max="8" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
            </div>
        </div>
      </div>
    </div>
  );
}