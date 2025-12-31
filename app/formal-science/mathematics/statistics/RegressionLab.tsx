"use client";
import { useState, useRef } from "react";
import { TrendingUp, RefreshCw, ScatterChart } from "lucide-react";

export default function RegressionLab() {
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  
  // Canvas Size
  const W = 280;
  const H = 200;

  // Linear Regression Calculation (Least Squares)
  let m = 0;
  let b = 0;
  let r2 = 0; // Correlation Coefficient

  if (points.length >= 2) {
      const n = points.length;
      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;

      points.forEach(p => {
          sumX += p.x;
          sumY += p.y;
          sumXY += p.x * p.y;
          sumXX += p.x * p.x;
          sumYY += p.y * p.y;
      });

      // Slope (m) and Intercept (b)
      m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      b = (sumY - m * sumX) / n;

      // Correlation (r)
      const numerator = n * sumXY - sumX * sumY;
      const denom = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
      r2 = denom === 0 ? 0 : Math.pow(numerator / denom, 2);
  }

  // Handle Click to Add Point
  const addPoint = (e: React.MouseEvent<HTMLDivElement>) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      // Normalize to 0-100 scale for simpler math, visual is scaled
      const x = ((e.clientX - bounds.left) / W) * 100;
      const y = 100 - ((e.clientY - bounds.top) / H) * 100; // Invert Y
      setPoints([...points, { x, y }]);
  };

  const reset = () => setPoints([]);

  // Line coords
  const y1 = m * 0 + b; // at x=0
  const y2 = m * 100 + b; // at x=100

  return (
    <div className="bg-violet-900/80 border border-violet-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-sm">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-violet-100 flex items-center gap-2 font-mono tracking-wider">
                <ScatterChart size={18} className="text-violet-500" /> REGRESSION_LAB
            </h3>
            <button onClick={reset} className="text-violet-500/50 hover:text-violet-400"><RefreshCw size={14}/></button>
        </div>

        {/* INTERACTIVE GRAPH */}
        <div 
            className="relative bg-black/40 border border-white/5 rounded-lg mb-6 overflow-hidden cursor-crosshair"
            style={{ width: W, height: H }}
            onClick={addPoint}
        >
            <div className="absolute inset-0 pointer-events-none text-[10px] text-white/10 p-2 font-mono">
                CLICK TO PLOT DATA
            </div>
            
            <svg className="w-full h-full pointer-events-none" viewBox={`0 0 100 100`} preserveAspectRatio="none">
                {/* Points */}
                {points.map((p, i) => (
                    <circle 
                        key={i} 
                        cx={p.x} cy={100 - p.y} r="2" 
                        fill="#a78bfa" stroke="white" strokeWidth="0.5" 
                    />
                ))}

                {/* Regression Line */}
                {points.length >= 2 && (
                    <line 
                        x1="0" y1={100 - y1} 
                        x2="100" y2={100 - y2} 
                        stroke="#22d3ee" strokeWidth="1" strokeDasharray="4"
                    />
                )}
            </svg>
        </div>

        {/* STATS DASHBOARD */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 p-2 rounded border border-white/5">
                <div className="text-[10px] text-violet-300 font-mono uppercase">Correlation (R²)</div>
                <div className={`text-xl font-bold font-mono ${r2 > 0.8 ? "text-green-400" : r2 > 0.5 ? "text-yellow-400" : "text-violet-400"}`}>
                    {r2.toFixed(3)}
                </div>
            </div>
            <div className="bg-black/20 p-2 rounded border border-white/5">
                <div className="text-[10px] text-violet-300 font-mono uppercase">Trend</div>
                <div className="text-xl font-bold font-mono text-cyan-400">
                    {m > 0 ? "POSITIVE" : m < 0 ? "NEGATIVE" : "NEUTRAL"}
                </div>
            </div>
        </div>

        <p className="mt-4 text-[10px] text-violet-200/50 text-center leading-relaxed font-mono">
            Finding the signal ($y=mx+b$) inside the noise.
        </p>

    </div>
  );
}