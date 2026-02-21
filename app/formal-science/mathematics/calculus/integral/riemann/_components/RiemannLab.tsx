"use client";
import React, { useState } from 'react';
import { AlignEndVertical, Calculator, Settings2 } from 'lucide-react';
import { M } from '@/components/Math';

export default function RiemannLab() {
  const [n, setN] = useState(5);
  const [method, setMethod] = useState<'left' | 'right' | 'mid'>('left');

  // The Function: f(x) = -0.15(x-5)^2 + 5 (A gentle hill)
  const f = (x: number) => -0.15 * Math.pow(x - 5, 2) + 5;
  
  const a = 1;
  const b = 9;
  const dx = (b - a) / n;
  const exactArea = 33.6; // Calculated via integral

  // Calculate Sum and Generate Rectangles
  let estimatedArea = 0;
  const rects = [];

  for (let i = 0; i < n; i++) {
    const xLeft = a + i * dx;
    const xRight = xLeft + dx;
    const xMid = xLeft + dx / 2;
    
    let evalX = xLeft;
    if (method === 'right') evalX = xRight;
    if (method === 'mid') evalX = xMid;

    const height = f(evalX);
    estimatedArea += height * dx;

    rects.push({ x: xLeft, w: dx, h: height, evalX });
  }

  const error = Math.abs(exactArea - estimatedArea);

  // SVG Configuration
  const width = 600;
  const height = 300;
  const scaleX = width / 10; // View from x=0 to x=10
  const scaleY = 40; 
  const offsetY = height - 20;

  const toSvgX = (x: number) => x * scaleX;
  const toSvgY = (y: number) => offsetY - y * scaleY;

  const generateCurve = () => {
    let d = "";
    for (let x = 0; x <= 10; x += 0.1) {
      d += x === 0 ? `M ${toSvgX(x)} ${toSvgY(f(x))}` : ` L ${toSvgX(x)} ${toSvgY(f(x))}`;
    }
    return d;
  };

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800 gap-4">
            <div className="text-xs font-bold uppercase text-cyan-500 flex items-center gap-2">
                <AlignEndVertical size={14} /> Approximation Engine
            </div>
            
            <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                <button onClick={() => setMethod('left')} className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${method === 'left' ? 'bg-cyan-600 text-white' : 'text-neutral-500 hover:text-white'}`}>Left</button>
                <button onClick={() => setMethod('right')} className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${method === 'right' ? 'bg-cyan-600 text-white' : 'text-neutral-500 hover:text-white'}`}>Right</button>
                <button onClick={() => setMethod('mid')} className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${method === 'mid' ? 'bg-cyan-600 text-white' : 'text-neutral-500 hover:text-white'}`}>Midpoint</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* CANVAS */}
            <div className="lg:col-span-2 relative h-[350px] bg-black/20">
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                    {/* Axes */}
                    <line x1="0" y1={offsetY} x2={width} y2={offsetY} stroke="#333" strokeWidth="2" />
                    
                    {/* Rectangles */}
                    {rects.map((r, i) => (
                        <g key={i}>
                            <rect 
                                x={toSvgX(r.x)} 
                                y={toSvgY(r.h)} 
                                width={r.w * scaleX} 
                                height={r.h * scaleY} 
                                fill="rgba(6, 182, 212, 0.15)" 
                                stroke="#06b6d4" 
                                strokeWidth={n > 25 ? 0.5 : 2}
                                className="transition-all duration-300"
                            />
                            {/* Evaluation Point Marker */}
                            {n <= 15 && (
                                <circle 
                                    cx={toSvgX(r.evalX)} 
                                    cy={toSvgY(r.h)} 
                                    r="3" fill="#fff" 
                                    className="transition-all duration-300"
                                />
                            )}
                        </g>
                    ))}

                    {/* True Curve */}
                    <path d={generateCurve()} fill="none" stroke="#fff" strokeWidth="3" className="drop-shadow-lg" />
                    
                    {/* Bounds */}
                    <line x1={toSvgX(a)} y1={offsetY} x2={toSvgX(a)} y2={toSvgY(f(a))} stroke="#06b6d4" strokeDasharray="4" opacity="0.5"/>
                    <line x1={toSvgX(b)} y1={offsetY} x2={toSvgX(b)} y2={toSvgY(f(b))} stroke="#06b6d4" strokeDasharray="4" opacity="0.5"/>
                 </svg>
            </div>

            {/* DATA PANEL */}
            <div className="p-6 border-l border-neutral-800 flex flex-col gap-6 bg-neutral-900/30">
                <div className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-2">
                    <Settings2 size={14}/> Parameters
                </div>
                
                {/* Resolution Slider */}
                <div className="bg-black/40 p-4 rounded-xl border border-neutral-800">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-400 mb-2">
                        <span>Rectangles (n)</span>
                        <span className="text-cyan-400">{n}</span>
                    </div>
                    <input 
                        type="range" min="2" max="50" step="1" 
                        value={n} onChange={e => setN(parseInt(e.target.value))}
                        className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="mt-4 flex justify-between text-xs font-mono text-neutral-500">
                        <span>Width (Δx)</span>
                        <span className="text-white">{dx.toFixed(2)}</span>
                    </div>
                </div>

                <div className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-2 mt-2">
                    <Calculator size={14}/> Calculations
                </div>

                <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between p-2 border-b border-neutral-800">
                        <span className="text-neutral-500">Est. Area</span>
                        <span className="text-cyan-400 font-bold">{estimatedArea.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between p-2 border-b border-neutral-800">
                        <span className="text-neutral-500">Exact Area</span>
                        <span className="text-white">{exactArea.toFixed(3)}</span>
                    </div>
                    <div className={`flex justify-between p-2 rounded ${error < 0.5 ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                        <span className="opacity-75">Error Margin</span>
                        <span className="font-bold">{error.toFixed(3)}</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}