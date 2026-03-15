"use client";
import React from 'react';

export default function InequalityBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
            
            {/* Massive Abstract Operators */}
            <div className="absolute top-[-10%] left-[-5%] text-[40vw] font-black text-amber-500/[0.03] select-none rotate-12">
                &gt;
            </div>
            <div className="absolute bottom-[-10%] right-[-5%] text-[40vw] font-black text-sky-500/[0.03] select-none -rotate-12">
                &lt;
            </div>

            {/* The Diagonal Magnitude Split */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-1/2 left-[-10%] w-[120%] h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent -rotate-[15deg] origin-center" />
                <div className="absolute top-1/2 left-[-10%] w-[120%] h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent -rotate-[15deg] translate-y-8 origin-center" />
            </div>

            {/* Subtle Math Grid */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.02] mix-blend-overlay" />

            {/* Dynamic Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-600/10 blur-[150px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-600/10 blur-[150px] rounded-full mix-blend-screen" />
        </div>
    );
}