"use client";
import React, { useState } from 'react';
import { Shapes, RotateCw, Spline, ArrowRightLeft, Expand } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function TransformationLab() {
    // 2x2 Transformation Matrix
    const [a, setA] = useState(1);
    const [b, setB] = useState(0);
    const [c, setC] = useState(0);
    const [d, setD] = useState(1);

    // SVG Configuration
    const SIZE = 350;
    const CENTER = SIZE / 2;
    const SCALE = 20;

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE);

    // A simple 'L' shape or house shape to make transformations obvious
    // Coordinates: (0,0), (3,0), (3,1), (1,1), (1,4), (0,4)
    const baseShape = [
        { x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, 
        { x: 1, y: 1 }, { x: 1, y: 4 }, { x: 0, y: 4 }
    ];

    // Apply transformation
    const transformedShape = baseShape.map(pt => ({
        x: pt.x * a + pt.y * b,
        y: pt.x * c + pt.y * d
    }));

    const generatePath = (shape: {x: number, y: number}[]) => {
        return shape.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getSvgX(pt.x)} ${getSvgY(pt.y)}`).join(" ") + " Z";
    };

    // Presets
    const applyPreset = (pa: number, pb: number, pc: number, pd: number) => {
        setA(pa); setB(pb); setC(pc); setD(pd);
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-orange-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col lg:flex-row relative z-10">
            
            {/* LEFT: Controls */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 text-orange-400">
                    <Shapes size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Spatial Warper</h3>
                </div>

                {/* Matrix Input */}
                <div className="bg-black/60 p-6 rounded-2xl border border-white/5 flex flex-col items-center shadow-inner mb-6">
                    <div className="text-[10px] text-orange-500 uppercase tracking-widest font-bold mb-4">Transformation Matrix</div>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-16 border-l-2 border-t-2 border-b-2 border-orange-500/50 rounded-l" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="number" step="0.5" value={a} onChange={e => setA(Number(e.target.value))} className="w-16 bg-orange-950/50 border border-orange-500/30 text-white text-center font-mono font-bold rounded p-2 outline-none focus:border-orange-400" />
                            <input type="number" step="0.5" value={b} onChange={e => setB(Number(e.target.value))} className="w-16 bg-orange-950/50 border border-orange-500/30 text-white text-center font-mono font-bold rounded p-2 outline-none focus:border-orange-400" />
                            <input type="number" step="0.5" value={c} onChange={e => setC(Number(e.target.value))} className="w-16 bg-orange-950/50 border border-orange-500/30 text-white text-center font-mono font-bold rounded p-2 outline-none focus:border-orange-400" />
                            <input type="number" step="0.5" value={d} onChange={e => setD(Number(e.target.value))} className="w-16 bg-orange-950/50 border border-orange-500/30 text-white text-center font-mono font-bold rounded p-2 outline-none focus:border-orange-400" />
                        </div>
                        <div className="w-2 h-16 border-r-2 border-t-2 border-b-2 border-orange-500/50 rounded-r" />
                    </div>
                </div>

                {/* Presets */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => applyPreset(1, 0, 0, 1)} className="flex flex-col items-center p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white text-xs">
                        <Expand size={16} className="mb-2 text-zinc-400" /> Identity (Reset)
                    </button>
                    <button onClick={() => applyPreset(0, -1, 1, 0)} className="flex flex-col items-center p-3 rounded-xl border border-orange-500/30 bg-orange-950/30 hover:bg-orange-900/40 transition-colors text-orange-200 text-xs">
                        <RotateCw size={16} className="mb-2 text-orange-400" /> Rotate 90°
                    </button>
                    <button onClick={() => applyPreset(1, 1, 0, 1)} className="flex flex-col items-center p-3 rounded-xl border border-rose-500/30 bg-rose-950/30 hover:bg-rose-900/40 transition-colors text-rose-200 text-xs">
                        <Spline size={16} className="mb-2 text-rose-400" /> Shear X
                    </button>
                    <button onClick={() => applyPreset(-1, 0, 0, 1)} className="flex flex-col items-center p-3 rounded-xl border border-sky-500/30 bg-sky-950/30 hover:bg-sky-900/40 transition-colors text-sky-200 text-xs">
                        <ArrowRightLeft size={16} className="mb-2 text-sky-400" /> Reflect Y-Axis
                    </button>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#0a0500] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.15">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#f97316" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#f97316" strokeWidth="1" />
                                </g>
                            );
                        })}
                        
                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#fdba74" strokeWidth="1.5" opacity="0.4" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#fdba74" strokeWidth="1.5" opacity="0.4" />

                        {/* Ghost Base Shape */}
                        <path d={generatePath(baseShape)} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />

                        <g className="transition-all duration-300">
                            {/* Transformed Shape */}
                            <path 
                                d={generatePath(transformedShape)} 
                                fill="rgba(249, 115, 22, 0.2)"
                                stroke="#f97316" 
                                strokeWidth="2" 
                                className="drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                            />

                            {/* Transformed Basis Vectors */}
                            <line x1={CENTER} y1={CENTER} x2={getSvgX(a)} y2={getSvgY(c)} stroke="#38bdf8" strokeWidth="3" />
                            <circle cx={getSvgX(a)} cy={getSvgY(c)} r="3" fill="#38bdf8" />
                            
                            <line x1={CENTER} y1={CENTER} x2={getSvgX(b)} y2={getSvgY(d)} stroke="#a3e635" strokeWidth="3" />
                            <circle cx={getSvgX(b)} cy={getSvgY(d)} r="3" fill="#a3e635" />
                        </g>
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2 bg-black/80 p-2 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 font-bold"><div className="w-2 h-2 bg-cyan-500 rounded-full" /> New <M>{"\\hat{i}"}</M> location</div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-lime-400 font-bold"><div className="w-2 h-2 bg-lime-500 rounded-full" /> New <M>{"\\hat{j}"}</M> location</div>
                    </div>
                </div>
            </div>
        </div>
    );
}