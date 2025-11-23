"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GlassWater } from "lucide-react";

const GLASSES = [
  { name: "Big Joe", vol: 44, desc: "The Original. A standard oversized goblet.", color: "bg-red-900/40" },
  { name: "Big Carl", vol: 60, desc: "The Successor. Technically a candle holder.", color: "bg-red-800/60" },
  { name: "Big K", vol: 70, desc: "The Titan. 5 liters of pure repression.", color: "bg-red-700/80" },
  { name: "Big Lou", vol: 85, desc: "The Vase. When you stop pretending.", color: "bg-red-600" },
];

export default function WineGlassWidget() {
  const [active, setActive] = useState(0);
  const current = GLASSES[active];

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <GlassWater size={14} className="text-red-500" /> Volume Analysis
        </h3>
      </div>
      
      <div className="p-6 flex items-end justify-center gap-4 h-40 border-b border-white/5">
         <div className="relative w-24 border-x-2 border-b-2 border-white/20 rounded-b-3xl overflow-hidden backdrop-blur-sm" style={{ height: `${current.vol}%` }}>
             <motion.div 
                key={active}
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                className={`w-full absolute bottom-0 left-0 ${current.color}`}
             />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
         </div>
      </div>

      <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
              <h4 className="text-lg font-black text-white">{current.name}</h4>
              <span className="font-mono text-xs text-red-400">{current.vol} oz</span>
          </div>
          <p className="text-xs text-neutral-400">{current.desc}</p>
          
          <input 
            type="range" min="0" max="3" value={active} 
            onChange={(e) => setActive(Number(e.target.value))}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
      </div>
    </div>
  );
}