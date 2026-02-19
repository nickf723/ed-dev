"use client";
import React, { useState } from 'react';
import { MousePointer2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SecantLab() {
  const [h, setH] = useState(2); // The distance between points
  const [x] = useState(1);       // The anchor point

  // Function: f(x) = 0.25 * x^2
  // Derivative: f'(x) = 0.5 * x
  const f = (val: number) => 0.25 * val * val;
  
  // Coordinates
  const x1 = x;
  const y1 = f(x1);
  const x2 = x + h;
  const y2 = f(x2);

  const rise = y2 - y1;
  const run = x2 - x1;
  const slope = run === 0 ? "UNDEFINED" : (rise / run);
  const exactSlope = 0.5 * x; // From derivative

  // SVG Mapping
  const width = 600;
  const height = 400;
  const scaleX = 60; // 1 unit = 60px
  const scaleY = 60;
  const offsetX = 50;
  const offsetY = height - 50;

  const toSvgX = (val: number) => offsetX + val * scaleX;
  const toSvgY = (val: number) => offsetY - val * scaleY;

  // Generate Parabola Path
  const generatePath = () => {
    let d = "";
    for (let i = 0; i <= 8; i += 0.1) {
      d += i === 0 ? `M ${toSvgX(i)} ${toSvgY(f(i))}` : ` L ${toSvgX(i)} ${toSvgY(f(i))}`;
    }
    return d;
  };

  // Generate Secant Line Extension
  // y - y1 = m(x - x1)  =>  y = m(x - x1) + y1
  const m = typeof slope === 'number' ? slope : 0;
  const lineStart = 0; 
  const lineEnd = 8;
  const yStart = m * (lineStart - x1) + y1;
  const yEnd = m * (lineEnd - x1) + y1;

  const isTangent = Math.abs(h) < 0.05 && h !== 0;
  const isBroken = h === 0;

  return (
    <div className="my-8 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-red-500 flex items-center gap-2">
                <MousePointer2 size={14} /> The Secant Slider
            </div>
            <div className={`px-3 py-1 rounded text-[10px] font-bold uppercase border ${
                isBroken ? 'bg-red-900/30 border-red-500 text-red-400' :
                isTangent ? 'bg-green-900/30 border-green-500 text-green-400' :
                'bg-neutral-800 border-neutral-700 text-neutral-500'
            }`}>
                {isBroken ? "UNDEFINED (0/0)" : isTangent ? "ALMOST TANGENT" : "SECANT LINE"}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* GRAPH */}
            <div className="md:col-span-2 relative h-[400px] bg-black/20">
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                    {/* Grid */}
                    <line x1={offsetX} y1="0" x2={offsetX} y2={height} stroke="#333" strokeWidth="1"/>
                    <line x1="0" y1={offsetY} x2={width} y2={offsetY} stroke="#333" strokeWidth="1"/>

                    {/* Function */}
                    <path d={generatePath()} fill="none" stroke="#555" strokeWidth="3" />

                    {/* Secant Line (Extended) */}
                    {!isBroken && (
                        <line 
                            x1={toSvgX(lineStart)} y1={toSvgY(yStart)} 
                            x2={toSvgX(lineEnd)} y2={toSvgY(yEnd)} 
                            stroke={isTangent ? "#ef4444" : "#3b82f6"} 
                            strokeWidth="2" 
                        />
                    )}

                    {/* Triangle Rise/Run */}
                    {!isBroken && !isTangent && (
                        <>
                            <line x1={toSvgX(x1)} y1={toSvgY(y1)} x2={toSvgX(x2)} y2={toSvgY(y1)} stroke="#fff" strokeWidth="1" strokeDasharray="4" opacity="0.5"/>
                            <line x1={toSvgX(x2)} y1={toSvgY(y1)} x2={toSvgX(x2)} y2={toSvgY(y2)} stroke="#fff" strokeWidth="1" strokeDasharray="4" opacity="0.5"/>
                            <text x={toSvgX(x1 + h/2)} y={toSvgY(y1) + 15} fill="#aaa" fontSize="10" textAnchor="middle">h = {h.toFixed(2)}</text>
                        </>
                    )}

                    {/* Points */}
                    <circle cx={toSvgX(x1)} cy={toSvgY(y1)} r="5" fill="#ef4444" /> {/* Anchor */}
                    {!isBroken && (
                        <circle cx={toSvgX(x2)} cy={toSvgY(y2)} r="5" fill="#3b82f6" /> /* Dragger */
                    )}

                 </svg>
            </div>

            {/* CONTROLS */}
            <div className="p-6 border-l border-neutral-800 flex flex-col gap-6 bg-neutral-900/30">
                
                {/* Math Display */}
                <div className="bg-black/40 p-4 rounded-xl border border-neutral-800 font-mono text-sm">
                    <div className="flex justify-between mb-2">
                        <span className="text-neutral-500">Run (Δx)</span>
                        <span className="text-blue-400">{h.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-neutral-500">Rise (Δy)</span>
                        <span className="text-blue-400">{rise.toFixed(4)}</span>
                    </div>
                    <div className="h-px bg-neutral-800 my-2"/>
                    <div className="flex justify-between text-lg font-bold">
                        <span className="text-neutral-400">Slope</span>
                        <span className={isTangent ? "text-green-400" : "text-white"}>
                            {typeof slope === 'number' ? slope.toFixed(4) : "ERROR"}
                        </span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase mt-1 text-neutral-600">
                        <span>True Derivative</span>
                        <span>{exactSlope.toFixed(4)}</span>
                    </div>
                </div>

                {/* Slider */}
                <div className="mt-auto">
                    <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase mb-2">
                        <span>Shrink Distance (h)</span>
                        <span className={h===0 ? "text-red-500" : "text-white"}>{h.toFixed(2)}</span>
                    </div>
                    <input 
                        type="range" min="0" max="4" step="0.01" 
                        value={h} onChange={e => setH(parseFloat(e.target.value))}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isBroken ? 'bg-red-900 accent-red-500' : 'bg-neutral-700 accent-blue-500'}`}
                    />
                    <div className="flex justify-between text-[10px] text-neutral-600 mt-2">
                        <span>0 (Tangent)</span>
                        <span>4 (Secant)</span>
                    </div>
                </div>

                {/* Instructions */}
                <div className="text-xs text-neutral-400 leading-relaxed border-t border-neutral-800 pt-4">
                    {isBroken ? (
                        <div className="flex gap-2 text-red-400 items-start">
                            <AlertTriangle size={16} className="shrink-0"/>
                            You cannot divide by zero. The slope formula breaks.
                        </div>
                    ) : isTangent ? (
                        <div className="flex gap-2 text-green-400 items-start">
                            <CheckCircle2 size={16} className="shrink-0"/>
                            This is the Derivative! The points are effectively one.
                        </div>
                    ) : (
                        "Drag the slider left to pull the blue point closer to the red anchor."
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}