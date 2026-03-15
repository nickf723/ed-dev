"use client";
import React from 'react';

export default function MetroidvaniaBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0f]">
            
            {/* Ambient Cavern Glows */}
            <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen" />

            {/* Abstract Wireframe Map */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-[20%] left-[20%] w-[300px] h-[150px] border-4 border-indigo-500 rounded-sm" />
                <div className="absolute top-[35%] left-[30%] w-[50px] h-[200px] border-4 border-indigo-500 rounded-sm" />
                <div className="absolute top-[50%] left-[35%] w-[400px] h-[100px] border-4 border-emerald-500 rounded-sm" />
                <div className="absolute top-[40%] left-[55%] w-[150px] h-[300px] border-4 border-emerald-500 rounded-sm" />
                
                {/* Save Room Indicator */}
                <div className="absolute top-[45%] left-[50%] w-[30px] h-[30px] bg-rose-500 border-2 border-rose-300 animate-pulse" />
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-90" />
        </div>
    );
}