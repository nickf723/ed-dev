"use client";
import React, { useEffect, useState } from 'react';

export default function IndustrialBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0c]">
            {/* Ambient Blueprint Glows */}
            <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-sky-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <div className="absolute inset-0 opacity-[0.05]">
                    {/* SVG Isometric Grid Pattern */}
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="iso-grid" width="60" height="34.64" patternUnits="userSpaceOnUse">
                                <path d="M30 0 L60 17.32 L30 34.64 L0 17.32 Z" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
                                <path d="M30 34.64 L30 69.28" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
                                <path d="M0 17.32 L0 51.96" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
                                <path d="M60 17.32 L60 51.96" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#iso-grid)" />
                    </svg>
                </div>
            )}

            {/* Precision Cutting Lines */}
            <div className="absolute top-1/4 left-0 w-full h-px bg-sky-500/10 border-t border-dashed border-sky-500/20" />
            <div className="absolute top-0 left-1/3 w-px h-full bg-sky-500/10 border-l border-dashed border-sky-500/20" />

            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}