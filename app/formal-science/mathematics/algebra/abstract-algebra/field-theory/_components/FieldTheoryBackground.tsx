"use client";
import React, { useEffect, useState } from 'react';

export default function FieldTheoryBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0d0714]">
            {/* Crystalline Glows */}
            <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-purple-900/20 blur-[150px] rounded-[30%_70%_70%_30%] animate-[spin_40s_linear_infinite] mix-blend-screen" />
            <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-amber-900/10 blur-[150px] rounded-[70%_30%_30%_70%] animate-[spin_30s_linear_infinite_reverse] mix-blend-screen" />

            {mounted && (
                <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center">
                    {/* Abstract Matrix/Lattice visualization */}
                    <div className="grid grid-cols-6 gap-8 animate-[pulse_8s_ease-in-out_infinite]">
                        {Array.from({ length: 36 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="w-2 h-2 bg-amber-400 rounded-sm rotate-45"
                                style={{ opacity: ((i * 13) % 10) / 10 }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.03] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}