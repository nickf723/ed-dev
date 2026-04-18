"use client";
import React, { useEffect, useState } from 'react';

export default function AstronomyBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Deterministic star generation to prevent hydration errors
    const generateStars = (count: number, seed: number) => {
        return Array.from({ length: count }).map((_, i) => ({
            x: ((i * seed * 17) % 100),
            y: ((i * seed * 23) % 100),
            size: ((i * seed) % 3) * 0.5 + 0.5,
            opacity: ((i * seed * 11) % 100) / 100
        }));
    };

    const backgroundStars = generateStars(150, 3);
    const foregroundStars = generateStars(75, 7);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020205]">
            {/* Extremely subtle galactic core glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vw] bg-indigo-900/5 blur-[200px] rounded-[100%] rotate-12 mix-blend-screen" />

            {mounted && (
                <>
                    {/* Distant, static stars */}
                    <div className="absolute inset-0">
                        {backgroundStars.map((star, i) => (
                            <div 
                                key={`bg-${i}`} 
                                className="absolute bg-white rounded-full"
                                style={{ 
                                    top: `${star.y}%`, left: `${star.x}%`, 
                                    width: `${star.size}px`, height: `${star.size}px`,
                                    opacity: star.opacity * 0.5
                                }}
                            />
                        ))}
                    </div>

                    {/* Closer, twinkling stars */}
                    <div className="absolute inset-0">
                        {foregroundStars.map((star, i) => (
                            <div 
                                key={`fg-${i}`} 
                                className="absolute bg-blue-100 rounded-full animate-pulse"
                                style={{ 
                                    top: `${star.y}%`, left: `${star.x}%`, 
                                    width: `${star.size * 1.5}px`, height: `${star.size * 1.5}px`,
                                    opacity: star.opacity,
                                    animationDuration: `${3 + (i % 5)}s`,
                                    animationDelay: `${(i % 10) / 2}s`
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
            <div className="absolute inset-0 bg-radial-vignette opacity-90" />
        </div>
    );
}