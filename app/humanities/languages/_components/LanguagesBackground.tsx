"use client";
import React, { useEffect, useState } from 'react';

export default function LanguagesBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Deterministic glyph distribution
    const glyphs = ['あ', 'Ω', 'ش', 'Ж', '語', 'æ', 'ç', 'ñ', 'ث', 'λ', '文', 'Δ'];
    const nodes = Array.from({ length: 24 }).map((_, i) => ({
        glyph: glyphs[i % glyphs.length],
        top: 5 + ((i * 37) % 90),
        left: 5 + ((i * 17) % 90),
        delay: ((i * 11) % 20) / 2,
        duration: 15 + ((i * 7) % 20)
    }));

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0c10]">
            {/* Ambient Cultural Glows */}
            <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-violet-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-amber-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <div className="absolute inset-0 opacity-[0.05] font-serif">
                    {nodes.map((node, i) => (
                        <div 
                            key={i} 
                            className="absolute text-4xl md:text-6xl text-violet-200 animate-[pulse_ease-in-out_infinite]"
                            style={{ 
                                top: `${node.top}%`,
                                left: `${node.left}%`,
                                animationDuration: `${node.duration}s`,
                                animationDelay: `${node.delay}s`,
                                transform: `rotate(${((i * 45) % 360)}deg)`
                            }}
                        >
                            {node.glyph}
                        </div>
                    ))}
                </div>
            )}

            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}