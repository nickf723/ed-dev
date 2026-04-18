"use client";
import React, { useEffect, useState } from 'react';

export default function GreekBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0c]">
            {/* Olympian Gold & Underworld Cyan Glows */}
            <div className="absolute top-[5%] left-[15%] w-[50vw] h-[50vw] bg-amber-600/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[10%] w-[60vw] h-[60vw] bg-cyan-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <>
                    {/* Ambient Lightning Flashes (Zeus) */}
                    <div className="absolute top-0 right-[20%] w-[20vw] h-full bg-cyan-400/5 blur-[80px] animate-[pulse_7s_ease-in-out_infinite]" />
                    
                    {/* Floating Embers / Dust */}
                    <div className="absolute inset-0 opacity-[0.3]">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div 
                                key={i}
                                className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                                style={{
                                    top: `${(i * 23) % 100}%`,
                                    left: `${(i * 41) % 100}%`,
                                    animationDuration: `${2 + ((i * 3) % 4)}s`,
                                    animationDelay: `${((i * 7) % 5)}s`
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Marble Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}