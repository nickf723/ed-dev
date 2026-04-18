"use client";
import React, { useEffect, useState } from 'react';

export default function MultivariateBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Deterministic topographical rings
    const rings = Array.from({ length: 15 }).map((_, i) => ({
        width: 20 + (i * 8),
        height: 15 + (i * 6),
        opacity: Math.max(0.01, 0.1 - (i * 0.005))
    }));

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05050a]">
            {/* Ambient Vector Glows */}
            <div className="absolute top-1/4 right-1/4 w-[50vw] h-[50vw] bg-rose-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-1/4 left-1/4 w-[40vw] h-[40vw] bg-amber-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {/* Topographic Contours */}
            {mounted && (
                <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-screen">
                    {rings.map((ring, i) => (
                        <div 
                            key={i} 
                            className="absolute border border-rose-500/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-[spin_40s_linear_infinite]"
                            style={{ 
                                width: `${ring.width}vw`, 
                                height: `${ring.height}vw`,
                                opacity: ring.opacity,
                                animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                                animationDuration: `${30 + (i * 5)}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}