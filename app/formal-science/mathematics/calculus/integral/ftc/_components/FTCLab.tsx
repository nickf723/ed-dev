"use client";
import React, { useState } from 'react';
import { SplitSquareVertical, ArrowRight } from 'lucide-react';
import { M } from '@/components/Math';

export default function FTCLab() {
  const [x, setX] = useState(2); // Current boundary

  // Function: f(t) = 2t
  const f = (t: number) => 2 * t;
  
  // Accumulation Function (Area under f from 0 to x): F(x) = x^2
  const F = (val: number) => val * val;

  const area = F(x);
  const currentRate = f(x);

  // SVG Config
  const width = 300;
  const height = 300;
  const scaleX = width / 5; // View 0 to 5
  const scaleYLeft = height / 10; // View 0 to 10
  const scaleYRight = height / 25; // View 0 to 25
  const offsetY = height - 20;

  const toSvgX = (val: number) => val * scaleX;
  const toSvgYLeft = (val: number) => offsetY - val * scaleYLeft;
  const toSvgYRight = (val: number) => offsetY - val * scaleYRight;

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-indigo-500 flex items-center gap-2">
                <SplitSquareVertical size={14} /> The Accumulator
            </div>
            <div className="text-xs font-mono text-neutral-500">
                Integration & Differentiation
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            
            {/* LEFT GRAPH: Rate Function (The Integral) */}
            <div className="relative h-[300px] bg-black/20 p-4">
                 <div className="absolute top-6 left-6 text-[10px] font-bold text-neutral-500 uppercase">Rate: f(t) = 2t</div>
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Area Fill */}
                    <polygon 
                        points={`0,${offsetY} ${toSvgX(x)},${offsetY} ${toSvgX(x)},${toSvgYLeft(f(x))}`} 
                        fill="rgba(59, 130, 246, 0.2)" 
                        stroke="#3b82f6" 
                        strokeWidth="1"
                        strokeDasharray="4"
                    />
                    {/* True Line */}
                    <line x1="0" y1={offsetY} x2={toSvgX(5)} y2={toSvgYLeft(f(5))} stroke="#3b82f6" strokeWidth="3" />
                    
                    {/* The Height Marker (Matches Derivative) */}
                    <line x1={toSvgX(x)} y1={offsetY} x2={toSvgX(x)} y2={toSvgYLeft(f(x))} stroke="#fff" strokeWidth="2" />
                    <circle cx={toSvgX(x)} cy={toSvgYLeft(f(x))} r="4" fill="#fff" />
                 </svg>
                 {/* Live Data */}
                 <div className="absolute bottom-6 right-6 bg-blue-900/20 border border-blue-500/30 p-2 rounded text-right font-mono text-sm">
                     <div className="text-blue-400">Area = {area.toFixed(2)}</div>
                     <div className="text-white text-xs mt-1 border-t border-blue-500/30 pt-1">Height = {currentRate.toFixed(2)}</div>
                 </div>
            </div>

            {/* RIGHT GRAPH: Accumulation Function (The Derivative) */}
            <div className="relative h-[300px] bg-black/20 p-4">
                 <div className="absolute top-6 left-6 text-[10px] font-bold text-neutral-500 uppercase">Accumulation: F(x) = x²</div>
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Curve */}
                    <path 
                        d={`M 0 ${offsetY} Q ${toSvgX(2.5)} ${offsetY} ${toSvgX(5)} ${toSvgYRight(F(5))}`} 
                        fill="none" stroke="#ef4444" strokeWidth="3" 
                    />
                    
                    {/* Tangent Line */}
                    <line 
                        x1={toSvgX(x - 1)} y1={toSvgYRight(F(x) - currentRate)} 
                        x2={toSvgX(x + 1)} y2={toSvgYRight(F(x) + currentRate)} 
                        stroke="#fff" strokeWidth="2" 
                    />
                    <circle cx={toSvgX(x)} cy={toSvgYRight(F(x))} r="4" fill="#fff" />
                 </svg>
                 {/* Live Data */}
                 <div className="absolute bottom-6 right-6 bg-red-900/20 border border-red-500/30 p-2 rounded text-right font-mono text-sm">
                     <div className="text-red-400">Value = {area.toFixed(2)}</div>
                     <div className="text-white text-xs mt-1 border-t border-red-500/30 pt-1">Slope = {currentRate.toFixed(2)}</div>
                 </div>
            </div>
        </div>

        {/* CONTROLS */}
        <div className="p-6 bg-neutral-900/80 backdrop-blur flex flex-col items-center justify-center border-t border-neutral-800">
             <div className="w-full max-w-md">
                 <div className="flex justify-between text-[10px] uppercase font-bold text-indigo-400 mb-2">
                     <span>Drag Boundary (x)</span>
                     <span>{x.toFixed(2)}</span>
                 </div>
                 <input 
                     type="range" min="0" max="4.5" step="0.01" 
                     value={x} onChange={e => setX(parseFloat(e.target.value))}
                     className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                 />
             </div>
             
             <div className="mt-6 flex items-center gap-4 font-mono text-sm bg-black/50 px-4 py-2 rounded-lg border border-neutral-800">
                 <span className="text-blue-400 flex items-center gap-2">Area = {area.toFixed(2)}</span>
                 <ArrowRight size={14} className="text-neutral-600"/>
                 <span className="text-red-400 flex items-center gap-2">Value = {area.toFixed(2)}</span>
             </div>
        </div>
    </div>
  );
}