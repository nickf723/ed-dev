"use client";
import React from "react";

const REGIONS = [
  { id: "nam", name: "North America", x: 20, y: 30 },
  { id: "sam", name: "South America", x: 28, y: 70 },
  { id: "eur", name: "Europe", x: 52, y: 25 },
  { id: "afr", name: "Africa", x: 50, y: 55 },
  { id: "asia", name: "Asia", x: 75, y: 30 },
  { id: "aus", name: "Oceania", x: 85, y: 75 },
];

export default function HistoryAtlas() {
  return (
    <div className="h-[calc(100vh-100px)] w-full flex items-center justify-center relative animate-in fade-in zoom-in-95 duration-700">
        
        {/* HOLO-MAP CARD */}
        <div className="relative w-full max-w-6xl aspect-video border border-white/10 bg-black/40 rounded-3xl p-8 backdrop-blur-sm overflow-hidden group shadow-2xl">
            
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />

            {/* Map Interaction Layer */}
            <div className="relative w-full h-full">
                {/* HUD */}
                <div className="absolute top-0 left-0 text-[10px] font-mono text-cyan-400/60 leading-tight">
                    ATLAS_VIEW v4.0 <br/>
                    PROJECTION: MERCATOR <br/>
                    STATUS: ACTIVE
                </div>

                {/* Region Pins */}
                {REGIONS.map((region) => (
                    <button 
                      key={region.id}
                      className="absolute group/pin -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                      style={{ left: `${region.x}%`, top: `${region.y}%` }}
                    >
                        {/* Ping Animation */}
                        <div className="absolute inset-0 rounded-full bg-cyan-500/30 animate-[ping_2s_ease-in-out_infinite]" />
                        {/* Core Dot */}
                        <div className="relative w-2 h-2 rounded-full bg-cyan-400 border border-white shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                        
                        {/* Hover Card */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/90 border border-cyan-500/30 px-4 py-2 rounded-lg text-center min-w-[120px] opacity-0 group-hover/pin:opacity-100 transition-all duration-300 translate-y-2 group-hover/pin:translate-y-0 z-20">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-200">{region.name}</div>
                            <div className="text-[9px] text-cyan-500/60 mt-1">Click to analyze</div>
                        </div>
                    </button>
                ))}
                
                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                    <h1 className="text-[10vw] font-black tracking-widest text-white blur-sm">TERRA</h1>
                </div>
            </div>
        </div>
    </div>
  );
}