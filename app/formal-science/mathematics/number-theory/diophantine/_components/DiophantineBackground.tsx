"use client";
import React from 'react';

export default function DiophantineBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05050a]">
            
            {/* Ambient Cartesian Glows */}
            <div className="absolute top-0 left-[-10%] w-[60vw] h-[60vw] bg-rose-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-amber-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {/* The Discrete Grid */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.04] mix-blend-overlay" />

            {/* Floating Lattice Coordinates (Abstract) */}
            <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                        style={{
                            top: `${Math.floor(Math.random() * 20) * 5}%`, // Snaps to a 5% grid
                            left: `${Math.floor(Math.random() * 20) * 5}%`,
                            opacity: Math.random() * 0.5 + 0.1
                        }}
                    />
                ))}
            </div>

            {/* Faint Mathematical Notation */}
            <div className="absolute top-[30%] left-[20%] text-[8vw] font-serif italic text-rose-500/[0.02] select-none rotate-12">
                $ax+by=c$
            </div>
            <div className="absolute bottom-[20%] right-[15%] text-[10vw] font-serif italic text-amber-500/[0.02] select-none -rotate-6">
                {"$x,y\\in\\mathbb{Z}$"}
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}