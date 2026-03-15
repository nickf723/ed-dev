"use client";
import React from 'react';

export default function NumberTheoryBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05050a]">
            
            {/* Ambient Cryptographic Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {/* The Prime Grid (Abstract Representation) */}
            <div className="absolute inset-0 opacity-10 font-mono text-xs flex flex-wrap gap-4 p-8 overflow-hidden text-violet-300/30">
                {Array.from({ length: 200 }).map((_, i) => (
                    <span key={i} className={i % 7 === 0 || i % 11 === 0 ? "text-emerald-400 font-bold" : ""}>
                        {Math.floor(Math.random() * 999).toString().padStart(3, '0')}
                    </span>
                ))}
            </div>

            {/* Mathematical Notation Overlays */}
            <div className="absolute top-[20%] right-[10%] text-[20vw] font-serif italic text-violet-500/[0.02] select-none pointer-events-none">
                {'$\mathbb{Z}$'}
            </div>
            <div className="absolute bottom-[10%] left-[5%] text-[15vw] font-serif italic text-emerald-500/[0.02] select-none pointer-events-none">
                $\pmod n$
            </div>

            {/* Vignette to keep text readable */}
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}