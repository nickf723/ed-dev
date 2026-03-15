"use client";
import React, { useEffect, useState } from 'react';

export default function DataScienceBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Deterministic network generation to prevent hydration errors
    const nodes = Array.from({ length: 30 }).map((_, i) => ({
        x: 10 + ((i * 37) % 80),
        y: 10 + ((i * 73) % 80),
        size: 2 + ((i * 11) % 4)
    }));

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050a0f]">
            {/* Ambient Data Glows */}
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {/* Neural Lattice */}
            {mounted && (
                <div className="absolute inset-0 opacity-[0.15]">
                    <svg className="w-full h-full">
                        {nodes.map((n1, i) => 
                            nodes.slice(i + 1, i + 4).map((n2, j) => (
                                <line 
                                    key={`${i}-${j}`} 
                                    x1={`${n1.x}%`} y1={`${n1.y}%`} 
                                    x2={`${n2.x}%`} y2={`${n2.y}%`} 
                                    stroke="currentColor" 
                                    className="text-cyan-500/30" 
                                    strokeWidth="1" 
                                />
                            ))
                        )}
                        {nodes.map((n, i) => (
                            <circle 
                                key={i} 
                                cx={`${n.x}%`} cy={`${n.y}%`} 
                                r={n.size} 
                                className="fill-cyan-400" 
                            />
                        ))}
                    </svg>
                </div>
            )}

            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}