"use client";
import React, { useEffect, useState } from 'react';

export default function SortingBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Deterministic array generation
    const columns = Array.from({ length: 40 }).map((_, i) => ({
        height: 10 + ((i * 47) % 80),
        delay: ((i * 13) % 40) / 10
    }));

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#09090b]">
            {/* Ambient Processing Glows */}
            <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />

            {/* Abstract Data Arrays */}
            {mounted && (
                <div className="absolute inset-0 opacity-[0.04] flex items-end justify-center gap-1 pb-10">
                    {columns.map((col, i) => (
                        <div 
                            key={i} 
                            className="w-4 bg-indigo-500 rounded-t-sm"
                            style={{ 
                                height: `${col.height}%`,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}