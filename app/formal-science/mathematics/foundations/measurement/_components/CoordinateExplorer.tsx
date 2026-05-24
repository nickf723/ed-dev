"use client";
import React, { useState } from 'react';
import { MapPin, Crosshair, Navigation } from 'lucide-react';

export default function CoordinateExplorer() {
    const [x, setX] = useState(3);
    const [y, setY] = useState(4);

    // Determine the Quadrant
    let quadrant = "";
    if (x === 0 && y === 0) quadrant = "Origin";
    else if (x === 0) quadrant = "On Y-Axis";
    else if (y === 0) quadrant = "On X-Axis";
    else if (x > 0 && y > 0) quadrant = "Quadrant I (+, +)";
    else if (x < 0 && y > 0) quadrant = "Quadrant II (-, +)";
    else if (x < 0 && y < 0) quadrant = "Quadrant III (-, -)";
    else if (x > 0 && y < 0) quadrant = "Quadrant IV (+, -)";

    // SVG Coordinate Mapping
    // viewBox is 400x400. Center is 200,200. Each unit is 15px.
    const GRID_SIZE = 400;
    const CENTER = GRID_SIZE / 2;
    const SCALE = 16; // Pixels per math unit

    const svgX = CENTER + x * SCALE;
    const svgY = CENTER - y * SCALE; // Invert Y because SVG Y goes down

    return (
        <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center p-4">
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
                
                {/* Math Readout */}
                <div className="bg-blue-950/30 border border-blue-500/30 p-6 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                    <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                        <MapPin size={12} /> Current Location
                    </div>
                    <div className="text-5xl font-black font-mono tracking-tighter text-white mb-2">
                        (<span className="text-rose-400">{x}</span>, <span className="text-cyan-400">{y}</span>)
                    </div>
                    <div className="text-sm font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                        {quadrant}
                    </div>
                </div>

                {/* X-Axis Control */}
                <div className="space-y-3 bg-black/40 p-5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center text-sm font-bold tracking-widest uppercase">
                        <span className="text-rose-400">X-Axis (Left / Right)</span>
                        <span className="text-white bg-rose-500/20 px-3 py-1 rounded-lg font-mono w-12 text-center">{x}</span>
                    </div>
                    <input 
                        type="range" min="-10" max="10" step="1" 
                        value={x} onChange={(e) => setX(Number(e.target.value))}
                        className="w-full accent-rose-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Y-Axis Control */}
                <div className="space-y-3 bg-black/40 p-5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center text-sm font-bold tracking-widest uppercase">
                        <span className="text-cyan-400">Y-Axis (Up / Down)</span>
                        <span className="text-white bg-cyan-500/20 px-3 py-1 rounded-lg font-mono w-12 text-center">{y}</span>
                    </div>
                    <input 
                        type="range" min="-10" max="10" step="1" 
                        value={y} onChange={(e) => setY(Number(e.target.value))}
                        className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

            </div>

            {/* RIGHT: The Cartesian Plane SVG */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#050a14] rounded-2xl border border-blue-500/30 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)] p-4">
                    
                    <svg viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`} className="w-full h-full">
                        {/* Draw Minor Grid Lines */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i}>
                                    <line x1={pos} y1="0" x2={pos} y2={GRID_SIZE} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={GRID_SIZE} y2={pos} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                </g>
                            );
                        })}

                        {/* Draw Axes */}
                        <line x1="0" y1={CENTER} x2={GRID_SIZE} y2={CENTER} stroke="#f43f5e" strokeWidth="2" /> {/* X Axis (Rose) */}
                        <line x1={CENTER} y1="0" x2={CENTER} y2={GRID_SIZE} stroke="#06b6d4" strokeWidth="2" /> {/* Y Axis (Cyan) */}

                        {/* Axis Labels */}
                        <text x={GRID_SIZE - 15} y={CENTER - 10} fill="#f43f5e" fontSize="16" fontWeight="bold">X</text>
                        <text x={CENTER + 10} y="20" fill="#06b6d4" fontSize="16" fontWeight="bold">Y</text>
                        
                        {/* Quadrant Labels */}
                        <text x="30" y="30" fill="rgba(255,255,255,0.1)" fontSize="24" fontWeight="bold">II</text>
                        <text x={GRID_SIZE - 40} y="30" fill="rgba(255,255,255,0.1)" fontSize="24" fontWeight="bold">I</text>
                        <text x="30" y={GRID_SIZE - 20} fill="rgba(255,255,255,0.1)" fontSize="24" fontWeight="bold">III</text>
                        <text x={GRID_SIZE - 40} y={GRID_SIZE - 20} fill="rgba(255,255,255,0.1)" fontSize="24" fontWeight="bold">IV</text>

                        {/* Tracing Lines to Axes */}
                        {x !== 0 && (
                            <line x1={CENTER} y1={svgY} x2={svgX} y2={svgY} stroke="#06b6d4" strokeWidth="2" strokeDasharray="6,6" opacity="0.5" />
                        )}
                        {y !== 0 && (
                            <line x1={svgX} y1={CENTER} x2={svgX} y2={svgY} stroke="#f43f5e" strokeWidth="2" strokeDasharray="6,6" opacity="0.5" />
                        )}

                        {/* The Point! */}
                        <circle cx={svgX} cy={svgY} r="8" fill="#fff" className="drop-shadow-lg" />
                        
                        {/* Inner glowing core of the point */}
                        <circle cx={svgX} cy={svgY} r="4" fill="#3b82f6" />
                    </svg>

                </div>
            </div>

        </div>
    );
}