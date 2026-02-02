"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trash2, MousePointer2 } from 'lucide-react';

export default function RegressionPlayground() {
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);

  // Add point on click
  const handlePlot = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints([...points, {x, y}]);
  };

  // Calculate Linear Regression (Least Squares)
  let m = 0, b = 0, r2 = 0;
  if (points.length >= 2) {
    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    points.forEach(p => {
        sumX += p.x;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumXX += p.x * p.x;
    });

    m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    b = (sumY - m * sumX) / n;
  }

  // Generate Line Coordinates (Start -> End of canvas)
  const width = 600; // Approx container width
  const lineY1 = m * 0 + b;
  const lineY2 = m * width + b;

  return (
    <div className="w-full bg-slate-900/90 border border-indigo-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="text-indigo-400" size={16} /> Regression Analysis
        </h3>
        <div className="flex gap-2">
            <div className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-indigo-300">
                y = {m.toFixed(2)}x + {b.toFixed(0)}
            </div>
            <button 
                onClick={() => setPoints([])} 
                className="p-1 hover:text-red-400 text-slate-500 transition-colors"
            >
                <Trash2 size={14} />
            </button>
        </div>
      </div>

      <div className="relative h-64 w-full bg-[url('/grid-pattern.svg')] bg-slate-950 cursor-crosshair overflow-hidden" onClick={handlePlot}>
        {points.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold animate-pulse">
                    <MousePointer2 size={16} /> Click to plot data
                </div>
            </div>
        )}

        {/* Data Points */}
        {points.map((p, i) => (
            <motion.div 
                key={i}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute w-3 h-3 bg-teal-400 rounded-full border border-black shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                style={{ left: p.x - 6, top: p.y - 6 }}
            />
        ))}

        {/* Line of Best Fit */}
        {points.length >= 2 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line 
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    x1={0} y1={lineY1} 
                    x2={width} y2={lineY2} 
                    stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5"
                />
            </svg>
        )}
      </div>

      <div className="p-3 bg-slate-900 text-[10px] text-slate-500 text-center border-t border-white/5">
        Algorithm: Least Squares Method
      </div>
    </div>
  );
}