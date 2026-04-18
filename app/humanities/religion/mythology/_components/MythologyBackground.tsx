"use client";
import React, { useEffect, useState } from 'react';

export default function MythologyBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#090a10]">
            {/* Celestial Nebulas */}
            <div className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] bg-indigo-900/20 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-amber-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <>
                    {/* Abstract Constellations */}
                    <div className="absolute inset-0 opacity-[0.1] flex items-center justify-center animate-[spin_180s_linear_infinite]">
                        <svg viewBox="0 0 200 200" className="w-[150vw] h-[150vw] max-w-[1200px] max-h-[1200px]">
                            {/* Orbital Rings */}
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="0.2" strokeDasharray="1 3" />
                            <circle cx="100" cy="100" r="60" fill="none" stroke="#e2e8f0" strokeWidth="0.2" />
                            
                            {/* Star Nodes and Lines */}
                            <polyline points="100,20 120,40 140,30 160,60 140,80" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
                            <polyline points="40,140 60,120 50,90 80,80 100,100" fill="none" stroke="#818cf8" strokeWidth="0.5" />
                            
                            {[
                                [100,20], [120,40], [140,30], [160,60], [140,80],
                                [40,140], [60,120], [50,90], [80,80], [100,100]
                            ].map(([cx, cy], i) => (
                                <circle key={i} cx={cx} cy={cy} r="1" fill="#fff" className="animate-pulse" />
                            ))}
                        </svg>
                    </div>
                </>
            )}

            {/* Parchment/Stone Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.03] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}