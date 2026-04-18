"use client";
import React, { useEffect, useState } from 'react';

export default function ArithmeticBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05000a]">
            {/* Cosmic Lava-Lamp Blobs */}
            <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 blur-[120px] rounded-[40%_60%_70%_30%] animate-[spin_30s_linear_infinite] mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] bg-cyan-600/10 blur-[150px] rounded-[60%_40%_30%_70%] animate-[spin_40s_linear_infinite_reverse] mix-blend-screen" />
            <div className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-amber-500/5 blur-[100px] rounded-full animate-pulse mix-blend-screen" />

            {mounted && (
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.03] mix-blend-overlay" />
            )}
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}