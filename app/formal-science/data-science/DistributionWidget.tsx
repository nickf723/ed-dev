"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, Sliders, Sigma } from "lucide-react";

export default function DistributionWidget() {
  const [mean, setMean] = useState(50);
  const [stdDev, setStdDev] = useState(15);

  // Generate points for the bell curve SVG
  // Formula: f(x) = (1 / (σ√2π)) * e^(-0.5 * ((x-μ)/σ)^2)
  const points = [];
  const range = 100;
  const heightScale = 3000; // Scaling factor for visual height

  for (let x = 0; x <= range; x++) {
    const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
    // We simplify the coefficient for visual scaling purposes
    const y = Math.exp(exponent) * (heightScale / stdDev); 
    points.push(`${x},${100 - Math.min(y, 100)}`); // Invert Y for SVG coords
  }

  const pathData = `M 0,100 L ${points.join(" L ")} L 100,100 Z`;

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <BarChart2 size={14} className="text-amber-400" /> Distribution Lab
        </h3>
        <Sigma size={14} className="text-neutral-600" />
      </div>

      {/* Visualization */}
      <div className="relative h-32 w-full bg-neutral-950/50 border-b border-white/5 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* The Curve */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <motion.path 
                d={pathData} 
                fill="rgba(251, 191, 36, 0.2)" 
                stroke="#fbbf24" 
                strokeWidth="0.5"
                animate={{ d: pathData }}
                transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            />
        </svg>
        
        {/* Mean Line */}
        <motion.div 
            className="absolute top-0 bottom-0 w-px bg-white/30 border-l border-dashed border-white/50"
            animate={{ left: `${mean}%` }}
        />
      </div>

      {/* Controls */}
      <div className="p-5 space-y-5">
        
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500">
                <span>Mean (μ)</span>
                <span className="text-amber-400">{mean}</span>
            </div>
            <input 
                type="range" 
                min="10" max="90" 
                value={mean} 
                onChange={(e) => setMean(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
        </div>

        <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500">
                <span>Std. Deviation (σ)</span>
                <span className="text-amber-400">{stdDev}</span>
            </div>
            <input 
                type="range" 
                min="5" max="40" 
                value={stdDev} 
                onChange={(e) => setStdDev(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
        </div>

        <div className="pt-2 border-t border-white/5">
            <p className="text-[10px] text-neutral-500 leading-relaxed">
                <strong>The Bell Curve:</strong> In nature, random variables (like height, errors, or test scores) tend to cluster around a mean. 68% of data falls within 1σ.
            </p>
        </div>

      </div>
    </div>
  );
}