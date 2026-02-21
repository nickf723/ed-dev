"use client";
import React, { useState } from 'react';
import { Type, ArrowRight, Info } from 'lucide-react';
import { M } from '@/components/Math';

export default function DefiniteLab() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(6.28); // 2*PI

  // Function: f(x) = sin(x)
  const f = (x: number) => Math.sin(x);
  
  // Exact Definite Integral of sin(x) is -cos(x)
  const calculateIntegral = (lower: number, upper: number) => {
      return -Math.cos(upper) - (-Math.cos(lower));
  };

  const netArea = calculateIntegral(a, b);

  // SVG Config
  const width = 600;
  const height = 300;
  const scaleX = width / (Math.PI * 3); // View from 0 to 3PI
  const scaleY = 80;
  const offsetY = height / 2;

  const toSvgX = (x: number) => x * scaleX;
  const toSvgY = (y: number) => offsetY - y * scaleY;

  // Generate paths for filling positive and negative regions
  const generateFill = (start: number, end: number) => {
      if (start >= end) return "";
      let d = `M ${toSvgX(start)} ${offsetY} `;
      for (let x = start; x <= end; x += 0.05) {
          d += `L ${toSvgX(x)} ${toSvgY(f(x))} `;
      }
      d += `L ${toSvgX(end)} ${offsetY} Z`;
      return d;
  };

  const generateLine = () => {
      let d = "";
      for (let x = 0; x <= Math.PI * 3; x += 0.05) {
          d += x === 0 ? `M ${toSvgX(x)} ${toSvgY(f(x))}` : ` L ${toSvgX(x)} ${toSvgY(f(x))}`;
      }
      return d;
  };

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-blue-500 flex items-center gap-2">
                <Type size={14} /> Signed Area Scanner
            </div>
            <div className="px-3 py-1 rounded bg-blue-900/20 border border-blue-500/30 text-[10px] font-bold uppercase text-blue-400">
                f(x) = sin(x)
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* CANVAS */}
            <div className="md:col-span-2 relative h-[350px] bg-black/20">
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                    {/* Grid / X-Axis */}
                    <line x1="0" y1={offsetY} x2={width} y2={offsetY} stroke="#333" strokeWidth="2" />
                    
                    {/* Positive/Negative Area Fills */}
                    <clipPath id="graphClip">
                         <rect x={toSvgX(Math.min(a,b))} y="0" width={Math.abs(toSvgX(b) - toSvgX(a))} height={height} />
                    </clipPath>

                    <g clipPath="url(#graphClip)">
                        {/* Shading Above Axis (Blue) */}
                        <path d={generateLine() + ` L ${width} ${offsetY} L 0 ${offsetY} Z`} fill="rgba(59, 130, 246, 0.2)" />
                        {/* Shading Below Axis (Red) */}
                        <path d={generateLine() + ` L ${width} 0 L 0 0 Z`} fill="rgba(239, 68, 68, 0.2)" />
                    </g>

                    {/* True Curve */}
                    <path d={generateLine()} fill="none" stroke="#fff" strokeWidth="3" className="drop-shadow-lg" />
                    
                    {/* Bounds Indicators */}
                    <line x1={toSvgX(a)} y1="0" x2={toSvgX(a)} y2={height} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4"/>
                    <line x1={toSvgX(b)} y1="0" x2={toSvgX(b)} y2={height} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4"/>
                 </svg>
                 
                 {/* Floating Labels */}
                 <div className="absolute top-4 right-4 flex flex-col gap-2">
                     <div className="flex items-center gap-2 text-xs font-mono text-blue-400 bg-black/60 px-2 py-1 rounded">
                         <div className="w-3 h-3 bg-blue-500/50 rounded-sm"></div> (+) Positive Area
                     </div>
                     <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-black/60 px-2 py-1 rounded">
                         <div className="w-3 h-3 bg-red-500/50 rounded-sm"></div> (-) Negative Area
                     </div>
                 </div>
            </div>

            {/* CONTROLS */}
            <div className="p-6 border-l border-neutral-800 flex flex-col gap-6 bg-neutral-900/30">
                
                {/* Math Rendering */}
                <div className="bg-black/40 p-6 rounded-xl border border-neutral-800 text-center">
                    <M display>{`\\int_{${a.toFixed(1)}}^{${b.toFixed(1)}} \\sin(x) \\,dx`}</M>
                    <div className="w-full h-px bg-neutral-800 my-4" />
                    <div className="text-3xl font-mono font-bold text-white">
                        {netArea.toFixed(3)}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-neutral-500 mt-2">Net Signed Area</div>
                </div>

                {/* Sliders */}
                <div className="space-y-6 mt-4">
                    <div>
                        <div className="flex justify-between text-[10px] uppercase font-bold text-blue-400 mb-2">
                            <span>Lower Bound (a)</span>
                            <span>{a.toFixed(2)}</span>
                        </div>
                        <input 
                            type="range" min="0" max={9.42} step="0.1" 
                            value={a} onChange={e => {
                                const val = parseFloat(e.target.value);
                                if (val < b) setA(val);
                            }}
                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] uppercase font-bold text-blue-400 mb-2">
                            <span>Upper Bound (b)</span>
                            <span>{b.toFixed(2)}</span>
                        </div>
                        <input 
                            type="range" min="0" max={9.42} step="0.1" 
                            value={b} onChange={e => {
                                const val = parseFloat(e.target.value);
                                if (val > a) setB(val);
                            }}
                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                </div>

                <div className="mt-auto bg-blue-900/10 border border-blue-500/20 p-3 rounded-lg text-xs text-blue-200/70 leading-relaxed flex gap-2 items-start">
                    <Info size={16} className="shrink-0 text-blue-400 mt-0.5" />
                    Notice how setting the bounds from 0 to 2π results in exactly 0 area, as the positive mountain cancels out the negative valley!
                </div>

            </div>
        </div>
    </div>
  );
}