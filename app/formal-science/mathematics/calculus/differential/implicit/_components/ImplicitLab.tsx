"use client";
import React, { useState } from 'react';
import { BoxSelect, Move } from 'lucide-react';
import { M } from '@/components/Math';

export default function ImplicitLab() {
  const [angle, setAngle] = useState(Math.PI / 4); // 45 degrees

  // Circle: x^2 + y^2 = 25 (Radius 5)
  const radius = 5;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  
  // Implicit Derivative: dy/dx = -x/y
  const slope = Math.abs(y) < 0.001 ? Infinity : -x / y;

  // SVG Mapping
  const width = 600;
  const height = 400;
  const scale = 30; // 30px per unit
  const cx = width / 2;
  const cy = height / 2;

  const toSvgX = (mathX: number) => cx + mathX * scale;
  const toSvgY = (mathY: number) => cy - mathY * scale;

  // Tangent Line points
  const lineLen = 4;
  const x1 = x - lineLen;
  const y1 = slope === Infinity ? y - lineLen : y - lineLen * slope;
  const x2 = x + lineLen;
  const y2 = slope === Infinity ? y + lineLen : y + lineLen * slope;

  // User Dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return; // Only drag when clicking
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left - cx;
    const my = cy - (e.clientY - rect.top);
    setAngle(Math.atan2(my, mx));
  };

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-blue-500 flex items-center gap-2">
                <BoxSelect size={14} /> The Orbital Inspector
            </div>
            <div className="flex gap-2">
                 <div className="flex items-center gap-2 px-3 py-1 rounded bg-blue-900/20 border border-blue-500/30 text-[10px] font-bold uppercase text-blue-400">
                    x² + y² = 25
                 </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* CANVAS */}
            <div 
                className="bg-black/20 relative h-[400px] cursor-crosshair touch-none"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseMove}
            >
                 <div className="absolute top-4 left-4 pointer-events-none text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-2">
                     <Move size={12} /> Click & Drag on Circle
                 </div>

                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                    {/* Grid & Axes */}
                    <line x1={cx} y1="0" x2={cx} y2={height} stroke="#333" strokeWidth="1" />
                    <line x1="0" y1={cy} x2={width} y2={cy} stroke="#333" strokeWidth="1" />

                    {/* Circle */}
                    <circle cx={cx} cy={cy} r={radius * scale} fill="none" stroke="#3b82f6" strokeWidth="2" className="opacity-50"/>

                    {/* Coordinates Lines */}
                    <line x1={toSvgX(x)} y1={cy} x2={toSvgX(x)} y2={toSvgY(y)} stroke="#3b82f6" strokeDasharray="4" opacity="0.5"/>
                    <line x1={cx} y1={toSvgY(y)} x2={toSvgX(x)} y2={toSvgY(y)} stroke="#3b82f6" strokeDasharray="4" opacity="0.5"/>

                    {/* Tangent Line */}
                    {slope === Infinity ? (
                         <line x1={toSvgX(x)} y1={toSvgY(y - lineLen)} x2={toSvgX(x)} y2={toSvgY(y + lineLen)} stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                    ) : (
                         <line x1={toSvgX(x1)} y1={toSvgY(y1)} x2={toSvgX(x2)} y2={toSvgY(y2)} stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                    )}

                    {/* Current Point */}
                    <circle cx={toSvgX(x)} cy={toSvgY(y)} r="6" fill="#ef4444" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"/>
                 </svg>
            </div>

            {/* DATA PANEL */}
            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                
                <div>
                    <h3 className="text-white font-bold mb-2">Live Calculation</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                        Because we differentiated implicitly, the slope formula <M>dy/dx</M> requires <strong>both</strong> the <M>x</M> and <M>y</M> coordinates to work.
                    </p>
                </div>

                <div className="space-y-4 font-mono text-sm">
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-neutral-800">
                        <span className="text-neutral-500">x coordinate</span>
                        <span className="text-blue-400 font-bold">{x.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-neutral-800">
                        <span className="text-neutral-500">y coordinate</span>
                        <span className="text-blue-400 font-bold">{y.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-4 p-6 rounded-xl border border-blue-500/30 bg-blue-900/10 text-center">
                    <div className="text-[10px] uppercase font-bold text-blue-500 mb-2">Derivative (Slope)</div>
                    <div className="text-2xl font-mono text-white mb-2">
                        {slope === Infinity ? "UNDEFINED" : slope.toFixed(3)}
                    </div>
                    <div className="text-xs text-neutral-500">
                        <M>{`\\frac{dy}{dx} = -\\frac{x}{y}`}</M>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}