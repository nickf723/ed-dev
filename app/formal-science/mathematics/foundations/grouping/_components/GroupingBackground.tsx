"use client";
import React, { useEffect, useState } from 'react';

export default function GroupingBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0f14]">
            {/* Ambient Type Glows (Grass, Fire, Water) */}
            <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute top-[40%] right-[10%] w-[50vw] h-[50vw] bg-rose-600/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[10%] left-[30%] w-[40vw] h-[40vw] bg-sky-600/10 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <div className="absolute inset-0 opacity-[0.05]">
                    {/* Bouncing set circles */}
                    <div className="absolute top-[20%] left-[15%] w-64 h-64 border-[4px] border-emerald-500 border-dashed rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute bottom-[20%] right-[25%] w-48 h-48 border-[4px] border-rose-500 border-dashed rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                </div>
            )}

            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}