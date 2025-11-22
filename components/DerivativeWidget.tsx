"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity } from "lucide-react";

export default function DerivativeWidget() {
  const [xVal, setXVal] = useState(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);

  // Function: f(x) = sin(x)
  // Derivative: f'(x) = cos(x)
  
  // Map slider (0-100) to radians (0-2PI)
  const xRad = (xVal / 100) * Math.PI * 2;
  const yVal = Math.sin(xRad); // -1 to 1
  const slope = Math.cos(xRad); // -1 to 1

  // Visualization SVG
  // We map xRad (0 to 6.28) to SVG X (0 to 300)
  // We map yVal (-1 to 1) to SVG Y (100 to 0)
  const width = 300;
  const height = 100;
  
  const getSvgY = (y: number) => (height / 2) - (y * (height / 2.5));
  const getSvgX = (rad: number) => (rad / (Math.PI * 2)) * width;

  const currentX = getSvgX(xRad);
  const currentY = getSvgY(yVal);

  // Calculate tangent line ends
  // Line formula: y - y1 = m(x - x1)
  // Visual slope needs to account for aspect ratio scaling
  const visualSlope = -slope; // Invert because SVG Y is down
  const lineLen = 40;
  const x1 = currentX - lineLen;
  const x2 = currentX + lineLen;
  const y1 = currentY - lineLen * visualSlope;
  const y2 = currentY + lineLen * visualSlope;

  // Path for Sine Wave
  let pathD = `M 0 ${getSvgY(Math.sin(0))}`;
  for(let i=1; i<=100; i++) {
      const r = (i/100) * Math.PI * 2;
      pathD += ` L ${getSvgX(r)} ${getSvgY(Math.sin(r))}`;
  }

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <TrendingUp size={14} className="text-red-500" /> Instantaneous Rate
        </h3>
        <Activity size={14} className="text-neutral-600" />
      </div>

      {/* Graph */}
      <div className="relative h-32 w-full bg-neutral-950 border-b border-white/5 overflow-hidden">
         <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
             {/* Axis */}
             <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="rgba(255,255,255,0.1)" />
             
             {/* Function Curve */}
             <path d={pathD} fill="none" stroke="#ef4444" strokeWidth="2" />
             
             {/* Tangent Line */}
             <motion.line 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke="#fff" strokeWidth="2" strokeDasharray="4 2"
                animate={{ x1, y1, x2, y2 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
             />
             
             {/* Point */}
             <motion.circle 
                cx={currentX} cy={currentY} r="4" fill="#fff"
                animate={{ cx: currentX, cy: currentY }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
             />
         </svg>
      </div>

      {/* Controls & Readout */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between text-[10px] font-mono uppercase text-neutral-500">
            <span>Position (x)</span>
            <span className="text-white">{xVal.toFixed(0)}%</span>
        </div>
        
        <input 
            type="range" 
            min="0" max="100" 
            value={xVal} 
            onChange={(e) => setXVal(Number(e.target.value))}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
        />

        <div className="grid grid-cols-2 gap-2 pt-2">
             <div className="p-2 rounded bg-neutral-900/50 border border-white/5 text-center">
                 <span className="block text-[9px] text-neutral-500 uppercase font-bold">Slope (dy/dx)</span>
                 <span className={`text-sm font-mono font-bold ${slope > 0 ? "text-green-400" : "text-red-400"}`}>
                     {slope.toFixed(2)}
                 </span>
             </div>
             <div className="p-2 rounded bg-neutral-900/50 border border-white/5 text-center">
                 <span className="block text-[9px] text-neutral-500 uppercase font-bold">Height (y)</span>
                 <span className="text-sm font-mono font-bold text-white">
                     {yVal.toFixed(2)}
                 </span>
             </div>
        </div>

        <p className="text-[10px] text-neutral-500 leading-relaxed border-t border-white/5 pt-3">
            The <strong>Derivative</strong> is the slope of the tangent line. Notice how the slope is zero at the peak and valley of the wave.
        </p>
      </div>
    </div>
  );
}