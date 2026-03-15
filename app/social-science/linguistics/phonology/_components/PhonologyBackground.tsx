"use client";
import React, { useState, useEffect } from 'react';

export default function PhonologyBackground() {
    const [mounted, setMounted] = useState(false);
    const symbols = ['ʃ', 'θ', 'æ', 'ŋ', 'ð', 'dʒ', 'tʃ', 'ə', 'UW1', 'AE0', 'CH'];

    // Wait until mounted to show dynamic elements to prevent hydration mismatches entirely
    useEffect(() => setMounted(true), []);

    // Deterministic pseudo-random generators based on index
    const getHeight = (i: number) => 20 + ((i * 37) % 60);
    const getDelay = (i: number) => ((i * 13) % 20) / 10;
    const getDuration = (i: number) => 1 + ((i * 7) % 20) / 10;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0f0a0a]">
            {/* Ambient Acoustic Glows */}
            <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-orange-900/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-1/4 left-1/4 w-[50vw] h-[50vw] bg-fuchsia-900/10 blur-[120px] rounded-full mix-blend-screen" />

            {mounted && (
                <>
                    {/* Abstract Soundwaves */}
                    <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center gap-2">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div 
                                key={i} className="w-2 bg-orange-500 rounded-full animate-pulse"
                                style={{ height: `${getHeight(i)}%`, animationDelay: `${getDelay(i)}s`, animationDuration: `${getDuration(i)}s` }}
                            />
                        ))}
                    </div>

                    {/* Floating Phonetic Symbols */}
                    <div className="absolute inset-0 opacity-10 font-serif italic text-4xl overflow-hidden">
                        {symbols.map((sym, i) => (
                            <div 
                                key={i} className="absolute text-orange-200"
                                style={{ top: `${(i * 23) % 100}%`, left: `${(i * 41) % 100}%`, transform: `rotate(${(i * 73) % 360}deg)` }}
                            >
                                /{sym}/
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}