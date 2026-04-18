"use client";
import React, { useEffect, useState } from 'react';

export default function ReligionBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#110a05]">
            {/* Ethereal Cathedral Glows */}
            <div className="absolute top-0 left-[20%] w-[60vw] h-[60vw] bg-amber-600/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-purple-900/20 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <>
                    {/* Sacred Geometry (Faint Mandala) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-[0.03] animate-[spin_120s_linear_infinite]">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <circle 
                                    key={i} cx="50" cy="20" r="20" 
                                    fill="none" stroke="#fbbf24" strokeWidth="0.5"
                                    transform={`rotate(${i * 30} 50 50)`} 
                                />
                            ))}
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="10" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
                        </svg>
                    </div>

                    {/* God Rays (Shafts of Light) */}
                    <div className="absolute top-[-10%] left-[10%] w-[15vw] h-[150vh] bg-gradient-to-b from-amber-300/10 to-transparent blur-[20px] rotate-[-25deg] transform-gpu mix-blend-screen" />
                    <div className="absolute top-[-10%] left-[40%] w-[20vw] h-[150vh] bg-gradient-to-b from-orange-300/5 to-transparent blur-[30px] rotate-[-25deg] transform-gpu mix-blend-screen" />
                </>
            )}

            {/* Dust / Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}