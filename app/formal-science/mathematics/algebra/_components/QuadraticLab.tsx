"use client";
import { useState } from "react";
import { FunctionSquare, RefreshCw, Move } from "lucide-react";

export default function QuadraticLab() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  // Visualization Constants
  const W = 200;
  const H = 150;
  const SCALE = 10; // Pixels per unit

  // Generate Path Data
  const generatePath = () => {
      let d = "";
      for (let px = 0; px <= W; px+=2) {
          // Convert pixel to graph coordinate
          const x = (px - W/2) / SCALE;
          const y = a * x * x + b * x + c;
          
          // Convert graph y to pixel
          const py = H/2 - (y * SCALE);
          
          d += `${px === 0 ? "M" : "L"} ${px} ${py} `;
      }
      return d;
  };

  const reset = () => { setA(1); setB(0); setC(0); };

  // Calculate Vertex
  const h = -b / (2 * a);
  const k = c - (b * b) / (4 * a);

  return (
    <div className="bg-zinc-900/80 border border-amber-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-sm">
        
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-amber-100 flex items-center gap-2 font-mono tracking-wider">
                <FunctionSquare size={18} className="text-amber-500" /> QUADRATIC_LAB
            </h3>
            <button onClick={reset} className="text-amber-500/50 hover:text-amber-400"><RefreshCw size={14}/></button>
        </div>

        {/* GRAPH DISPLAY */}
        <div className="relative w-full h-40 bg-black/40 border border-white/5 rounded-lg mb-6 overflow-hidden">
            {/* Grid Center */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
            
            <svg className="w-full h-full" viewBox={`0 0 ${W} ${H}`}>
                <path 
                    d={generatePath()} 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            
            {/* Vertex Point */}
            <div 
                className="absolute w-2 h-2 bg-white rounded-full -ml-1 -mt-1 shadow-[0_0_10px_white]"
                style={{ 
                    left: h * SCALE + W/2, 
                    top: H/2 - k * SCALE 
                }}
            />
        </div>

        {/* CONTROLS */}
        <div className="space-y-4 font-mono text-xs">
            {/* A Slider */}
            <div className="space-y-1">
                <div className="flex justify-between text-amber-500/80">
                    <span>A (Curvature)</span>
                    <span>{a}</span>
                </div>
                <input 
                    type="range" min="-2" max="2" step="0.1"
                    value={a} onChange={(e) => setA(parseFloat(e.target.value))}
                    className="w-full h-1 bg-amber-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                />
            </div>

            {/* B Slider */}
            <div className="space-y-1">
                <div className="flex justify-between text-amber-500/80">
                    <span>B (Slope at 0)</span>
                    <span>{b}</span>
                </div>
                <input 
                    type="range" min="-5" max="5" step="0.5"
                    value={b} onChange={(e) => setB(parseFloat(e.target.value))}
                    className="w-full h-1 bg-amber-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                />
            </div>

            {/* C Slider */}
            <div className="space-y-1">
                <div className="flex justify-between text-amber-500/80">
                    <span>C (Y-Intercept)</span>
                    <span>{c}</span>
                </div>
                <input 
                    type="range" min="-5" max="5" step="0.5"
                    value={c} onChange={(e) => setC(parseFloat(e.target.value))}
                    className="w-full h-1 bg-amber-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                />
            </div>
        </div>

        {/* FORMULA */}
        <div className="mt-6 text-center">
            <code className="text-lg text-white font-bold">
                {a}x² {b >= 0 ? "+" : ""} {b}x {c >= 0 ? "+" : ""} {c}
            </code>
        </div>

    </div>
  );
}