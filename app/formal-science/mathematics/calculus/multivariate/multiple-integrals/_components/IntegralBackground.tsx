"use client";
import React, { useEffect, useState } from 'react';

export default function IntegralBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05050a]">
            {/* Ambient Volume Glows */}
            <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-fuchsia-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] bg-rose-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {mounted && (
                <>
                    {/* Faint Slicing Planes */}
                    <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center">
                        <div className="w-[150vw] h-[1px] bg-fuchsia-500 rotate-12 -translate-y-20 animate-[pulse_8s_ease-in-out_infinite]" />
                        <div className="absolute w-[150vw] h-[1px] bg-rose-500 -rotate-6 translate-y-32 animate-[pulse_12s_ease-in-out_infinite]" />
                    </div>

                    {/* Floating Mathematical Symbols */}
                    <div className="absolute top-[30%] left-[20%] text-[8vw] font-serif italic text-fuchsia-500/[0.02] select-none rotate-12">
                        ∬
                    </div>
                    <div className="absolute bottom-[20%] right-[15%] text-[10vw] font-serif italic text-rose-500/[0.02] select-none -rotate-12">
                        ∭
                    </div>
                </>
            )}

            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}