"use client";
import React, { useEffect, useState } from 'react';

export default function GeometryBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050a0a]">
            {/* Ambient Spatial Glows */}
            <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] bg-emerald-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[20%] left-[20%] w-[50vw] h-[50vw] bg-cyan-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <>
                    {/* Basic K-6 Shapes */}
                    <div className="absolute top-[20%] left-[15%] w-32 h-32 border-4 border-emerald-500/10 rounded-full animate-[pulse_4s_linear_infinite]" />
                    <div className="absolute top-[30%] right-[25%] w-40 h-40 border-4 border-cyan-500/10 rotate-45 animate-[spin_30s_linear_infinite]" />
                    <div className="absolute bottom-[30%] left-[30%] w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-fuchsia-500/10 rotate-12" />
                </>
            )}

            {/* Grid Paper Overlay */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.05] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}