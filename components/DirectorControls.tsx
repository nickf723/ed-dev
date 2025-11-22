"use client";
import { useState } from "react";
import { Monitor, Smartphone, LayoutTemplate, Grid3X3, Maximize2 } from "lucide-react";

type ViewMode = "mobile" | "desktop" | "square";

type DirectorControlsProps = {
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
  showSafeZone: boolean;
  setShowSafeZone: (b: boolean) => void;
};

export default function DirectorControls({ viewMode, setViewMode, showSafeZone, setShowSafeZone }: DirectorControlsProps) {
  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Maximize2 size={14} className="text-red-500" /> Viewport
        </h3>
        <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-red-500">LIVE</span>
        </div>
      </div>

      {/* Aspect Ratio Toggles */}
      <div className="mb-6 space-y-3">
        <label className="text-[10px] font-mono uppercase text-neutral-500">Aspect Ratio</label>
        <div className="flex bg-neutral-950 rounded-lg p-1 border border-white/5">
            <button 
                onClick={() => setViewMode("mobile")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all
                    ${viewMode === "mobile" ? "bg-neutral-800 text-white shadow" : "text-neutral-500 hover:text-neutral-300"}
                `}
            >
                <Smartphone size={14} /> 9:16
            </button>
            <button 
                onClick={() => setViewMode("square")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all
                    ${viewMode === "square" ? "bg-neutral-800 text-white shadow" : "text-neutral-500 hover:text-neutral-300"}
                `}
            >
                <Grid3X3 size={14} /> 1:1
            </button>
            <button 
                onClick={() => setViewMode("desktop")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all
                    ${viewMode === "desktop" ? "bg-neutral-800 text-white shadow" : "text-neutral-500 hover:text-neutral-300"}
                `}
            >
                <Monitor size={14} /> 16:9
            </button>
        </div>
      </div>

      {/* Overlays */}
      <div className="space-y-3">
        <label className="text-[10px] font-mono uppercase text-neutral-500">Overlays</label>
        <button
            onClick={() => setShowSafeZone(!showSafeZone)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all
                ${showSafeZone 
                    ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400" 
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"}
            `}
        >
            <div className="flex items-center gap-3">
                <LayoutTemplate size={16} />
                <span className="text-xs font-bold">Social Safe Zones</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${showSafeZone ? "bg-cyan-400" : "bg-neutral-700"}`} />
        </button>
      </div>
    </div>
  );
}