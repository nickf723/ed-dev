"use client";
import React, { useState } from 'react';
import { AlignEndVertical, MonitorPlay } from 'lucide-react';

export default function RiemannSurfer() {
  const [n, setN] = useState(4); // Number of rectangles

  // Function: f(x) = -0.2(x-3)^2 + 4  (A nice positive parabola)
  const f = (x: number) => -0.2 * Math.pow(x - 3, 2) + 4;
  
  // Bounds
  const a = 0;
  const b = 6;
  const dx = (b - a) / n;

  // Calculate Left Riemann Sum
  let estimatedArea = 0;
  for (let i = 0; i < n; i++) {
    const x = a + i * dx;
    estimatedArea += f(x) * dx;
  }

  // Exact Area (Calculated via actual definite integral: 16.8)
  const exactArea = 16.8;
  const error = Math.abs(exactArea - estimatedArea);

  // SVG Mapping
  const width = 800;
  const height = 300;
  const scaleX = width / 8; // Display from x=-1 to 7 (8 units)
  const scaleY = 50; 
  const offsetX = 1 * scaleX; // Shift right to show x=0 clearly
  const offsetY = height - 40;

  const toSvgX = (x: number) => offsetX + x * scaleX;
  const toSvgY = (y: number) => offsetY - y * scaleY;

  // Generate Smooth Curve
  const generateCurve = () => {
    let d = "";
    for (let x = -1; x <= 7; x += 0.1) {
      d += x === -1 ? `M ${toSvgX(x)} ${toSvgY(f(x))}` : ` L ${toSvgX(x)} ${toSvgY(f(x))}`;
    }
    return d;
  };

  return (
    <div className="relative w-full h-[300px] bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex">
        
        {/* GRAPH AREA */}
        <div className="flex-1 relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                {/* Axes */}
                <line x1="0" y1={offsetY} x2={width} y2={offsetY} stroke="#333" strokeWidth="2" />
                <line x1={toSvgX(0)} y1="0" x2={toSvgX(0)} y2={height} stroke="#333" strokeWidth="2" />

                {/* Riemann Rectangles */}
                {Array.from({ length: n }).map((_, i) => {
                    const xPos = a + i * dx;
                    const yPos = f(xPos); // Left endpoint
                    return (
                        <rect 
                            key={i}
                            x={toSvgX(xPos)} 
                            y={toSvgY(yPos)} 
                            width={dx * scaleX} 
                            height={yPos * scaleY} 
                            fill="rgba(6, 182, 212, 0.2)" 
                            stroke="#06b6d4" 
                            strokeWidth={n > 20 ? 0.5 : 2}
                            className="transition-all duration-300"
                        />
                    );
                })}

                {/* The True Curve */}
                <path d={generateCurve()} fill="none" stroke="#fff" strokeWidth="3" className="drop-shadow-md" />

                {/* Start/End bounds markers */}
                <line x1={toSvgX(a)} y1={offsetY} x2={toSvgX(a)} y2={toSvgY(f(a))} stroke="#06b6d4" strokeDasharray="4" />
                <line x1={toSvgX(b)} y1={offsetY} x2={toSvgX(b)} y2={toSvgY(f(b))} stroke="#06b6d4" strokeDasharray="4" />
            </svg>

            {/* Title */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-bold text-cyan-500 uppercase tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur border border-cyan-500/20">
                <AlignEndVertical size={14} /> The Area Problem
            </div>
        </div>

        {/* CONTROLS HUD */}
        <div className="w-64 bg-black/80 backdrop-blur border-l border-neutral-800 p-6 flex flex-col">
            <div className="text-xs font-bold text-neutral-500 uppercase mb-4 flex items-center gap-2">
                <MonitorPlay size={14}/> Simulation Data
            </div>
            
            <div className="space-y-4 font-mono text-sm flex-1">
                <div>
                    <div className="text-neutral-500 text-[10px]">Rectangles (n)</div>
                    <div className="text-2xl text-cyan-400 font-bold">{n}</div>
                </div>
                <div>
                    <div className="text-neutral-500 text-[10px]">Est. Area</div>
                    <div className="text-white">{estimatedArea.toFixed(3)}</div>
                </div>
                <div>
                    <div className="text-neutral-500 text-[10px]">Exact Area</div>
                    <div className="text-neutral-300">16.800</div>
                </div>
                <div className="pt-4 border-t border-neutral-800">
                    <div className="text-neutral-500 text-[10px]">Error Margin</div>
                    <div className={`${error < 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                        {error.toFixed(3)}
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="mt-auto">
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-2">Resolution</label>
                <input 
                    type="range" min="2" max="50" step="1" 
                    value={n} onChange={e => setN(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
            </div>
        </div>
    </div>
  );
}