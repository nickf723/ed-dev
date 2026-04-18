"use client";
import React, { useState } from 'react';
import { PenTool, RefreshCw, Box, Layers } from 'lucide-react';

export default function IsometricLab() {
    // 5x5 Grid representing the height (Z-axis) of blocks at each (X,Y) coordinate
    const [grid, setGrid] = useState<number[][]>(Array(5).fill(Array(5).fill(0)));

    const incrementBlock = (x: number, y: number, e: React.MouseEvent) => {
        e.preventDefault();
        setGrid(prev => {
            const newGrid = prev.map(row => [...row]);
            if (e.type === 'contextmenu' || e.shiftKey) {
                newGrid[x][y] = Math.max(0, newGrid[x][y] - 1); // Remove block
            } else {
                newGrid[x][y] = Math.min(5, newGrid[x][y] + 1); // Add block (max 5 high)
            }
            return newGrid;
        });
    };

    const resetGrid = () => setGrid(Array(5).fill(Array(5).fill(0)));

    // --- ISOMETRIC MATH ENGINE ---
    const tileW = 40;
    const tileH = 20;
    const blockZ = 24; // Height of one block

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-sky-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans select-none">
            <div className="bg-sky-950/30 border-b border-sky-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-500/20 border border-sky-500/30 rounded-lg">
                        <PenTool size={18} className="text-sky-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Projection Engine</h3>
                        <p className="text-[10px] text-sky-300/60 font-mono uppercase tracking-widest">Orthographic to Isometric</p>
                    </div>
                </div>
                <button onClick={resetGrid} className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-500 transition-colors">
                    <RefreshCw size={14} />
                </button>
            </div>

            <div className="flex flex-col md:flex-row min-h-[400px] relative">
                
                {/* LEFT: 2D Orthographic (Top View) Blueprint */}
                <div className="w-full md:w-1/3 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col items-center justify-center">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Layers size={14} className="text-sky-400"/> Top View (2D Blueprint)
                    </div>
                    
                    <div className="grid grid-cols-5 gap-1 bg-sky-950/20 p-2 rounded-xl border border-sky-500/20">
                        {grid.map((row, x) => (
                            row.map((height, y) => (
                                <button
                                    key={`${x}-${y}`}
                                    onClick={(e) => incrementBlock(x, y, e)}
                                    onContextMenu={(e) => incrementBlock(x, y, e)}
                                    className={`w-10 h-10 md:w-8 md:h-8 rounded flex items-center justify-center font-mono text-xs font-bold transition-all
                                        ${height > 0 ? 'bg-sky-500 border-b-4 border-sky-700 text-white shadow-[0_0_10px_rgba(56,189,248,0.4)]' : 'bg-zinc-900 border border-zinc-800 text-zinc-600 hover:bg-zinc-800'}
                                    `}
                                >
                                    {height > 0 ? height : '+'}
                                </button>
                            ))
                        ))}
                    </div>
                    <div className="text-center mt-6 text-[10px] text-zinc-500 font-mono">
                        Left Click: Add Block<br/>
                        Right Click: Remove Block
                    </div>
                </div>

                {/* RIGHT: 3D Isometric Projection Render */}
                <div className="w-full md:w-2/3 bg-zinc-900/50 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-6 left-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <Box size={14} className="text-indigo-400"/> Isometric Projection (30°)
                    </div>

                    <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px]">
                        <g transform="translate(200, 100)">
                            {/* Render Base Grid Floor */}
                            {grid.map((row, x) => (
                                row.map((_, y) => {
                                    const isoX = (x - y) * (tileW / 2);
                                    const isoY = (x + y) * (tileH / 2);
                                    return (
                                        <polygon 
                                            key={`floor-${x}-${y}`}
                                            points={`0,-${tileH/2} ${tileW/2},0 0,${tileH/2} -${tileW/2},0`}
                                            transform={`translate(${isoX}, ${isoY})`}
                                            fill="rgba(255,255,255,0.02)"
                                            stroke="rgba(56,189,248,0.2)"
                                            strokeWidth="1"
                                        />
                                    );
                                })
                            ))}

                            {/* Render 3D Blocks (Painter's Algorithm: back to front) */}
                            {grid.map((row, x) => (
                                row.map((height, y) => {
                                    if (height === 0) return null;
                                    const blocks = [];
                                    
                                    // Stack blocks up the Z axis
                                    for (let z = 0; z < height; z++) {
                                        const isoX = (x - y) * (tileW / 2);
                                        const isoY = (x + y) * (tileH / 2) - (z * blockZ);
                                        
                                        // Color gradient based on height to make it pop
                                        const colorIntensity = 50 + (z * 20);
                                        
                                        blocks.push(
                                            <g key={`block-${x}-${y}-${z}`} transform={`translate(${isoX}, ${isoY})`}>
                                                {/* Left Face (Darker) */}
                                                <polygon points={`-${tileW/2},0 0,${tileH/2} 0,${tileH/2 + blockZ} -${tileW/2},${blockZ}`} fill={`rgb(15, ${colorIntensity - 20}, ${colorIntensity + 40})`} stroke="#0f172a" strokeWidth="0.5"/>
                                                {/* Right Face (Medium) */}
                                                <polygon points={`0,${tileH/2} ${tileW/2},0 ${tileW/2},${blockZ} 0,${tileH/2 + blockZ}`} fill={`rgb(30, ${colorIntensity}, ${colorIntensity + 60})`} stroke="#0f172a" strokeWidth="0.5"/>
                                                {/* Top Face (Lightest / Sky Blue) */}
                                                <polygon points={`0,-${tileH/2} ${tileW/2},0 0,${tileH/2} -${tileW/2},0`} fill={`rgb(56, 189, 248)`} stroke="#e0f2fe" strokeWidth="1"/>
                                            </g>
                                        );
                                    }
                                    return blocks;
                                })
                            ))}
                        </g>
                    </svg>
                </div>

            </div>
        </div>
    );
}