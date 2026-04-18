"use client";
import React, { useEffect, useState } from 'react';

export default function MtgBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#09090b]">
            {mounted && (
                <div className="absolute inset-0 opacity-[0.15] mix-blend-screen">
                    {/* WUBRG Ambient Glows */}
                    <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-amber-100 blur-[120px] rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] bg-blue-500 blur-[150px] rounded-full animate-[spin_50s_linear_infinite_reverse]" />
                    <div className="absolute bottom-[20%] left-[40%] w-[30vw] h-[30vw] bg-purple-900 blur-[150px] rounded-full animate-[pulse_10s_ease-in-out_infinite]" />
                    <div className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] bg-red-600 blur-[150px] rounded-full animate-[spin_40s_linear_infinite]" />
                    <div className="absolute top-[20%] left-[60%] w-[45vw] h-[45vw] bg-green-500 blur-[150px] rounded-full animate-[spin_45s_linear_infinite_reverse]" />
                </div>
            )}
            
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}