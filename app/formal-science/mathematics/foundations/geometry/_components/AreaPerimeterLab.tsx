"use client";
import React, { useState } from 'react';
import { Grid3X3, MousePointerClick, RefreshCw } from 'lucide-react';

export default function AreaPerimeterLab() {
    // We store the active grid blocks as a Set of string coordinates like "x,y"
    // Start with a basic 2x2 square
    const [blocks, setBlocks] = useState<Set<string>>(new Set(['3,3', '3,4', '4,3', '4,4']));

    const toggleBlock = (x: number, y: number) => {
        const key = `${x},${y}`;
        const newBlocks = new Set(blocks);
        if (newBlocks.has(key)) {
            newBlocks.delete(key);
        } else {
            newBlocks.add(key);
        }
        setBlocks(newBlocks);
    };

    const clearGrid = () => setBlocks(new Set());

    // Calculate Area (simply the number of blocks)
    const area = blocks.size;

    // Calculate Perimeter (count edges that do not touch another block)
    let perimeter = 0;
    blocks.forEach(key => {
        const [x, y] = key.split(',').map(Number);
        if (!blocks.has(`${x + 1},${y}`)) perimeter++;
        if (!blocks.has(`${x - 1},${y}`)) perimeter++;
        if (!blocks.has(`${x},${y + 1}`)) perimeter++;
        if (!blocks.has(`${x},${y - 1}`)) perimeter++;
    });

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans select-none">
            <div className="bg-emerald-950/30 border-b border-emerald-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                        <Grid3X3 size={18} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Measurement Sandbox</h3>
                        <p className="text-[10px] text-emerald-300/60 font-mono uppercase tracking-widest">Area vs. Perimeter</p>
                    </div>
                </div>
                <button 
                    onClick={clearGrid}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-500 transition-colors"
                    title="Clear Board"
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center border-b border-white/5 bg-black/40 relative">
                
                {/* 8x8 Grid Builder */}
                <div className="grid grid-cols-8 gap-1 bg-emerald-950/20 p-2 rounded-xl border border-emerald-500/20">
                    {Array.from({ length: 8 }).map((_, y) => (
                        Array.from({ length: 8 }).map((_, x) => {
                            const isActive = blocks.has(`${x},${y}`);
                            return (
                                <button
                                    key={`${x}-${y}`}
                                    onPointerDown={(e) => {
                                        // Allow dragging to paint blocks smoothly
                                        e.currentTarget.releasePointerCapture(e.pointerId);
                                        toggleBlock(x, y);
                                    }}
                                    onPointerEnter={(e) => {
                                        if (e.buttons === 1) toggleBlock(x, y);
                                    }}
                                    className={`w-8 h-8 md:w-12 md:h-12 rounded-md transition-colors duration-100 ${
                                        isActive 
                                        ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] border-2 border-emerald-300' 
                                        : 'bg-zinc-900 border border-zinc-800 hover:bg-zinc-800'
                                    }`}
                                />
                            );
                        })
                    ))}
                </div>

                {blocks.size === 0 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-emerald-500/30 px-4 py-2 rounded-lg flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest shadow-xl pointer-events-none">
                        <MousePointerClick size={14} /> Click & drag to draw shapes
                    </div>
                )}
            </div>

            {/* Diagnostics Panel */}
            <div className="p-6 grid grid-cols-2 gap-6 text-center">
                <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-4">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">Area (Inside Space)</div>
                    <div className="text-3xl font-black text-white">{area} <span className="text-sm font-normal text-zinc-500">sq units</span></div>
                </div>
                <div className="bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-xl p-4">
                    <div className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest mb-1">Perimeter (Outside Edge)</div>
                    <div className="text-3xl font-black text-white">{perimeter} <span className="text-sm font-normal text-zinc-500">units</span></div>
                </div>
            </div>
        </div>
    );
}