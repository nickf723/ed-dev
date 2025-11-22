"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sigma, BarChart3, ArrowRight } from "lucide-react";

export default function IntegrationWidget() {
  const [rectangles, setRectangles] = useState(4);
  const [method, setMethod] = useState<"left" | "right" | "midpoint">("left");

  // Visualizer Constants
  const width = 260;
  const height = 120;
  
  // Function: f(x) = -0.01(x-50)^2 + 90 (Parabola)
  // Domain: 0 to 100
  const f = (x: number) => -0.015 * Math.pow(x - 50, 2) + 90;
  
  // Generate Rectangles
  const rectWidth = 100 / rectangles;
  const rects = [];
  let areaSum = 0;

  for (let i = 0; i < rectangles; i++) {
      const xLeft = i * rectWidth;
      const xRight = (i + 1) * rectWidth;
      const xMid = (xLeft + xRight) / 2;
      
      let heightX = xLeft;
      if (method === "right") heightX = xRight;
      if (method === "midpoint") heightX = xMid;
      
      const hVal = Math.max(0, f(heightX));
      areaSum += hVal * rectWidth;

      rects.push({
          x: (i * rectWidth / 100) * width,
          y: height - (hVal / 100) * height,
          w: (rectWidth / 100) * width,
          h: (hVal / 100) * height
      });
  }
  
  // True Area (Integral of f(x) from 0 to 100) roughly
  const trueArea = 6666; // Approx for scaling display

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Sigma size={14} className="text-blue-400" /> Riemann Sum
        </h3>
      </div>

      {/* Graph Area */}
      <div className="relative h-40 bg-neutral-950/50 border-b border-white/5 flex items-end justify-center px-4 pb-4 overflow-hidden">
        
        {/* The Curve (SVG Overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <path 
                d={`M 0,${height} ` + Array.from({length: 100}, (_, i) => `L ${(i/100)*width},${height - (f(i)/100)*height}`).join(" ") + ` L ${width},${height}`}
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="2" 
                strokeDasharray="4 4"
            />
        </svg>

        {/* The Rectangles */}
        <div className="relative w-full h-full">
            {rects.map((r, i) => (
                <motion.div
                    key={i}
                    className="absolute bottom-0 bg-blue-500/30 border border-blue-400/50 hover:bg-blue-400/50 transition-colors"
                    initial={false}
                    animate={{ 
                        left: `${(r.x / width) * 100}%`, 
                        width: `${(r.w / width) * 100}%`, 
                        height: `${(r.h / height) * 100}%` 
                    }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                />
            ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-5 space-y-5">
        
        {/* N Slider */}
        <div>
            <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-500 mb-2">
                <span>Partitions (n)</span>
                <span className="text-blue-400 font-mono">{rectangles}</span>
            </div>
            <input 
                type="range" 
                min="2" max="50" 
                value={rectangles} 
                onChange={(e) => setRectangles(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
        </div>

        {/* Method Toggle */}
        <div className="flex bg-neutral-950 rounded-lg p-1 border border-white/5">
            {(["left", "midpoint", "right"] as const).map((m) => (
                <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`flex-1 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all
                        ${method === m 
                            ? "bg-blue-600 text-white shadow" 
                            : "text-neutral-500 hover:text-neutral-300"}
                    `}
                >
                    {m}
                </button>
            ))}
        </div>

        {/* Accuracy Readout */}
        <div className="flex items-center justify-between text-xs bg-blue-950/20 p-3 rounded-lg border border-blue-500/20">
            <span className="text-blue-300/70">Approx Area</span>
            <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white">{areaSum.toFixed(0)}</span>
                <ArrowRight size={12} className="text-blue-500" />
                <span className="font-mono text-blue-500">{trueArea}</span>
            </div>
        </div>

      </div>
    </div>
  );
}