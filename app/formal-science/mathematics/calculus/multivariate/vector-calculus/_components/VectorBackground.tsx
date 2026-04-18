"use client";
import React, { useEffect, useState } from 'react';

export default function VectorBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Deterministic streamlines
    const lines = Array.from({ length: 30 }).map((_, i) => ({
        top: 5 + ((i * 17) % 90),
        width: 10 + ((i * 23) % 40),
        delay: ((i * 11) % 20) / 2,
        duration: 10 + ((i * 7) % 15)
    }));

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050a14]">
            {/* Ambient Fluid Glows */}
            <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] bg-sky-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] bg-cyan-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <div className="absolute inset-0 opacity-[0.05]">
                    {lines.map((line, i) => (
                        <div 
                            key={i} 
                            className="absolute h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-[pulse_ease-in-out_infinite]"
                            style={{ 
                                top: `${line.top}%`,
                                left: '-10%',
                                width: `${line.width}vw`,
                                animationDuration: `${line.duration}s`,
                                animationDelay: `${line.delay}s`,
                                transform: `translateX(${((i * 13) % 100)}vw)` // Static distribution
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}