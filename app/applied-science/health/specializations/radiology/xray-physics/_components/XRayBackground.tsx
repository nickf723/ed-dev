"use client";
import React, { useEffect, useState } from 'react';

export default function XRayBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030304]">
            {/* Clinical Radiation Glows */}
            <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] bg-cyan-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-zinc-400/5 blur-[120px] rounded-full mix-blend-screen" />

            {mounted && (
                <>
                    {/* Horizontal Scanning Artifacts */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)]" />
                    
                    {/* Slow moving "Detector Plate" scanline */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-[pulse_8s_ease-in-out_infinite] translate-y-[100vh] duration-[10s]" />
                </>
            )}

            <div className="absolute inset-0 bg-radial-vignette opacity-90" />
        </div>
    );
}