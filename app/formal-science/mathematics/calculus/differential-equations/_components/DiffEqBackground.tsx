"use client";
import React, { useEffect, useState } from 'react';

export default function DiffEqBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#02080f]">
            {/* Ambient Flow Glows */}
            <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] bg-teal-900/10 blur-[150px] rounded-[40%_60%_70%_30%] animate-[spin_40s_linear_infinite] mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-pink-900/10 blur-[150px] rounded-[70%_30%_30%_70%] animate-[spin_50s_linear_infinite_reverse] mix-blend-screen" />

            {mounted && (
                <div className="absolute inset-0 opacity-[0.05]">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        {/* Abstract Phase Portrait (Lorenz-esque butterfly curves) */}
                        <path d="M 300 400 C 400 100, 600 100, 700 400 C 800 700, 200 700, 300 400 Z" fill="none" stroke="#2dd4bf" strokeWidth="2" className="animate-[pulse_10s_ease-in-out_infinite]" />
                        <path d="M 700 400 C 600 100, 400 100, 300 400 C 200 700, 800 700, 700 400 Z" fill="none" stroke="#f472b6" strokeWidth="2" className="animate-[pulse_12s_ease-in-out_infinite]" />
                    </svg>
                </div>
            )}

            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}