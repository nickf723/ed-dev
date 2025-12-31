"use client";
import { useState, useRef } from "react";
import { TrendingUp, RefreshCw, Activity } from "lucide-react";

export default function TangentSurfer() {
  const [x, setX] = useState(150); // visual X coordinate (0-300)
  
  // Math Constants for visualization
  const WIDTH = 300;
  const HEIGHT = 200;
  const CENTER_Y = HEIGHT / 2;
  const SCALE_X = 0.05; // Stretch the wave
  const SCALE_Y = 60;   // Amplitude

  // The Function: f(x) = sin(x)
  const f = (val: number) => Math.sin(val * SCALE_X) * SCALE_Y;
  
  // The Derivative: f'(x) = cos(x) * chain_rule_scale
  // Slope m needs to be visual slope. 
  // Real slope = cos(val * SCALE_X) * SCALE_X * SCALE_Y
  // But since we are rendering pixels, we calculate m visually or analytically.
  const slope = (val: number) => Math.cos(val * SCALE_X) * SCALE_X * SCALE_Y;

  // Calculate current state based on X
  const currentY = CENTER_Y - f(x); // Invert Y for SVG
  const m = -slope(x); // Invert slope for SVG Y-axis
  
  // Tangent Line: y - y1 = m(x - x1)
  // We need two points to draw the line. Let's take x-50 and x+50.
  const x1 = x - 60;
  const y1 = currentY - m * 60;
  const x2 = x + 60;
  const y2 = currentY + m * 60;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      let newX = e.clientX - bounds.left;
      if (newX < 0) newX = 0;
      if (newX > WIDTH) newX = WIDTH;
      setX(newX);
  };

  return (
    <div className="bg-slate-900/80 border border-blue-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl max-w-sm w-full">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-blue-100 flex items-center gap-2 font-mono tracking-wider">
                <TrendingUp size={18} className="text-blue-500" /> TANGENT_SURFER
            </h3>
            <div className="text-[10px] font-mono text-blue-400">f(x) = sin(x)</div>
        </div>

        {/* INTERACTIVE GRAPH */}
        <div 
            className="relative h-48 w-full bg-slate-950 rounded-lg border border-blue-500/20 mb-4 overflow-hidden cursor-crosshair"
            onMouseMove={handleMouseMove}
        >
            <svg className="w-full h-full" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
                {/* Grid Line */}
                <line x1="0" y1={CENTER_Y} x2={WIDTH} y2={CENTER_Y} stroke="rgba(255,255,255,0.1)" />

                {/* The Function Curve */}
                <path 
                    d={Array.from({ length: WIDTH + 1 }).map((_, i) => {
                        const yVal = CENTER_Y - f(i);
                        return `${i === 0 ? 'M' : 'L'} ${i} ${yVal}`;
                    }).join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                />

                {/* The Tangent Line */}
                <line 
                    x1={x1} y1={y1} x2={x2} y2={y2} 
                    stroke="#d946ef" 
                    strokeWidth="2"
                    strokeDasharray="4"
                />

                {/* The Point */}
                <circle cx={x} cy={currentY} r="4" fill="white" stroke="#d946ef" strokeWidth="2" />
            </svg>
        </div>

        {/* DATA READOUT */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 p-2 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 font-mono uppercase">Position (x)</div>
                <div className="text-xl font-bold text-white font-mono">{x.toFixed(0)}</div>
            </div>
            <div className="bg-black/20 p-2 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 font-mono uppercase">Slope (dy/dx)</div>
                <div className={`text-xl font-bold font-mono ${-m > 0 ? "text-blue-400" : "text-pink-400"}`}>
                    {(-m).toFixed(2)}
                </div>
            </div>
        </div>
        
        <p className="mt-4 text-[10px] text-slate-400 leading-relaxed text-center">
            The <strong>Derivative</strong> is the slope of the tangent line at any single point. It represents the instantaneous rate of change.
        </p>

    </div>
  );
}