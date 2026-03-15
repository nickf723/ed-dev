"use client";
import React from 'react';

export default function QuantumBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
            {/* Probability Clouds */}
            <div className="absolute top-[20%] left-[30%] w-[60vw] h-[40vw] bg-cyan-900/10 blur-[150px] rounded-[100%] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-violet-900/10 blur-[150px] rounded-full mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_reverse]" />

            {/* Faint Wave Functions */}
            <div className="absolute top-[30%] right-[10%] text-[10vw] font-serif italic text-cyan-500/[0.02] select-none -rotate-12">
                $\Psi(x,t)$
            </div>
            
            <div className="absolute inset-0 bg-radial-vignette opacity-90" />
        </div>
    );
}