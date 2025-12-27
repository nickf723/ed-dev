"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function SensoryMapperWidget() {
  const [pitch, setPitch] = useState(50); // 0 (Low) to 100 (High)
  const [timbre, setTimbre] = useState(50); // 0 (Round) to 100 (Sharp)

  // Shape Logic (Kiki vs Bouba)
  const spikes = Math.floor(3 + (timbre / 100) * 12); // 3 to 15 points
  const innerRadius = 30 + (100 - timbre) * 0.4; // 30 to 70 (Blobs are fatter)
  const outerRadius = 80;

  // Color Logic (Chromesthesia)
  const hue = (pitch / 100) * 300;
  const lightness = 20 + (pitch / 100) * 60; // 20% to 80%

  // SVG Path Generator
  const generatePath = () => {
    let path = "";
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (Math.PI * i) / spikes;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      
      // FIX: Use toFixed(2) to prevent hydration mismatches from floating point math
      const x = (150 + Math.cos(angle) * radius).toFixed(2);
      const y = (100 + Math.sin(angle) * radius).toFixed(2);
      
      path += (i === 0 ? "M" : "L") + `${x},${y} `;
    }
    return path + "Z";
  };

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <BrainCircuit size={14} className="text-fuchsia-400" /> Cross-Modal Map
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Visualizer */}
        <div className="relative w-full h-48 bg-black/40 rounded-xl border border-white/5 mb-6 flex items-center justify-center overflow-hidden">
             <motion.svg 
                width="300" height="200" 
                animate={{ scale: 1 + (pitch/200) }}
             >
                 <motion.path 
                    d={generatePath()} 
                    fill={`hsl(${hue}, 80%, ${lightness}%)`}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                    transition={{ type: "spring", bounce: 0.2 }}
                 />
             </motion.svg>
             
             {/* Label */}
             <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/50">
                 {timbre > 50 ? '"Kiki"' : '"Bouba"'}
             </div>
        </div>

        {/* Controls */}
        <div className="w-full space-y-4">
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500">
                    <span>Frequency (Pitch)</span>
                    <span style={{ color: `hsl(${hue}, 80%, 60%)` }}>{pitch} Hz</span>
                </div>
                <input 
                    type="range" min="0" max="100" value={pitch} 
                    onChange={(e) => setPitch(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500">
                    <span>Texture (Sharpness)</span>
                    <span>{timbre}%</span>
                </div>
                <input 
                    type="range" min="0" max="100" value={timbre} 
                    onChange={(e) => setTimbre(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                />
            </div>
        </div>

      </div>
    </div>
  );
}