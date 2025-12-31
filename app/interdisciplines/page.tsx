"use client";
import { useState, Fragment, useRef, useEffect } from "react";
import Link from "next/link";
import ColliderBackground from "@/app/interdisciplines/ColliderBackground";
import { AXES, COMBINATIONS } from "@/app/interdisciplines/data";
import { ArrowLeft, Network, Hexagon, XCircle, GitMerge, ExternalLink, Plus } from "lucide-react";

export default function InterdisciplinesPage() {
  const [activeCombo, setActiveCombo] = useState<string | null>(null);
  const [locked, setLocked] = useState(false); // Click to lock selection
  
  // Refs for tracking positions for laser lines
  const gridRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Handle Selection
  const handleInteraction = (id1: string, id2: string, isClick: boolean) => {
    const key = [id1, id2].sort().join("-");
    if (COMBINATIONS[key]) {
        if (isClick) {
            setLocked(!locked); // Toggle lock
            setActiveCombo(key);
        } else if (!locked) {
            setActiveCombo(key);
        }
    }
  };

  const currentData = activeCombo ? COMBINATIONS[activeCombo] : null;
  
  // Derived parents
  const parentA = activeCombo ? AXES.find(a => a.id === activeCombo.split("-")[0]) : null;
  const parentB = activeCombo ? AXES.find(a => a.id === activeCombo.split("-")[1]) : null;

  return (
    <main className="relative h-screen w-screen bg-zinc-950 text-white overflow-hidden selection:bg-purple-500/30 font-sans flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <ColliderBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. COMPACT HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-zinc-950/50 backdrop-blur-sm shrink-0">
         <div className="flex items-center gap-6">
             <Link href="/" className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Nexus
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <Network size={18} className="text-white" />
                 <h1 className="text-lg font-black text-white tracking-tight">THE MATRIX</h1>
             </div>
         </div>
         <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest hidden md:block">
            {locked ? "SELECTION LOCKED" : "INTERACTIVE MODE"}
         </div>
      </header>

      {/* 3. MAIN WORKSPACE (Centered & Scalable) */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 overflow-hidden">
            
            <div 
                ref={gridRef}
                className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-2xl relative max-h-full overflow-auto custom-scrollbar"
            >
                
                {/* GRID CONTAINER */}
                <div 
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `40px repeat(${AXES.length}, minmax(40px, 60px))` }}
                >
                    
                    {/* Top Left Corner */}
                    <div className="col-start-1 flex items-center justify-center text-zinc-700 opacity-50">
                        <Hexagon size={16} strokeWidth={1} />
                    </div>

                    {/* TOP HEADERS (X-Axis) */}
                    {AXES.map((col) => (
                        <div key={`head-${col.id}`} className={`flex flex-col items-center justify-end pb-2 transition-opacity duration-300 ${activeCombo?.includes(col.id) ? "opacity-100 scale-110" : "opacity-40"}`}>
                            <col.icon size={16} className={`${col.color} mb-1`} />
                            <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 hidden md:block">{col.label.substring(0,3)}</span>
                            {/* Laser Target Dot */}
                            {activeCombo?.includes(col.id) && <div className="h-1 w-1 bg-white rounded-full absolute bottom-0 shadow-[0_0_10px_white]" />}
                        </div>
                    ))}

                    {/* ROWS */}
                    {AXES.map((row, rIndex) => (
                        <Fragment key={`row-${row.id}`}>
                            
                            {/* ROW HEADER (Y-Axis) */}
                            <div className={`flex items-center justify-end pr-2 transition-opacity duration-300 ${activeCombo?.includes(row.id) ? "opacity-100 scale-110" : "opacity-40"}`}>
                                <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 hidden md:block mr-2">{row.label.substring(0,3)}</span>
                                <row.icon size={16} className={`${row.color}`} />
                                {/* Laser Target Dot */}
                                {activeCombo?.includes(row.id) && <div className="h-1 w-1 bg-white rounded-full absolute right-0 shadow-[0_0_10px_white]" />}
                            </div>

                            {/* CELLS */}
                            {AXES.map((col, cIndex) => {
                                // Lower Triangle Logic
                                if (cIndex > rIndex) return <div key={`empty-${row.id}-${col.id}`} className="invisible" />;

                                const key = [row.id, col.id].sort().join("-");
                                const data = COMBINATIONS[key];
                                const isActive = activeCombo === key;
                                const isPure = row.id === col.id;

                                return (
                                    <button
                                        key={`cell-${key}`}
                                        onMouseEnter={() => handleInteraction(row.id, col.id, false)}
                                        onClick={() => handleInteraction(row.id, col.id, true)}
                                        disabled={!data}
                                        className={`
                                            aspect-square rounded border transition-all duration-200 relative group overflow-hidden
                                            ${isActive 
                                                ? "bg-white/10 border-white z-20 scale-125 shadow-[0_0_30px_rgba(255,255,255,0.3)] ring-1 ring-white" 
                                                : "bg-black/40 border-white/5"
                                            }
                                            ${data 
                                                ? "hover:bg-white/10 hover:border-white/30 cursor-pointer" 
                                                : "opacity-10 cursor-not-allowed grayscale"
                                            }
                                        `}
                                    >
                                        {/* Row/Col Highlighter (The Crosshair Effect) */}
                                        {isActive && (
                                            <>
                                                {/* Beams handled by CSS pseudo elements or external SVG, 
                                                    but for simplicity, we use absolute divs here */}
                                                <div className={`absolute inset-0 bg-${row.color.split("-")[1]}-500/20`} />
                                            </>
                                        )}

                                        {isPure && <div className={`absolute inset-0 opacity-20 ${row.bg}`} />}
                                        
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {data ? (
                                                <data.icon 
                                                    size={isActive ? 20 : 14} 
                                                    className={`transition-all duration-300 ${isActive ? "text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" : isPure ? row.color : "text-zinc-600 group-hover:text-zinc-400"}`} 
                                                />
                                            ) : (
                                                <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </Fragment>
                    ))}
                </div>
            </div>
      </div>


      {/* 4. THE FUSION REACTOR (Bottom HUD) */}
      <div className="relative z-30 h-40 bg-[#09090b]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-center shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-between gap-4">
                
                {currentData && parentA && parentB ? (
                    <>
                        {/* FUSION VISUALIZER (Left Side) */}
                        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end pr-12 border-r border-white/5">
                            
                            {/* INPUT A */}
                            <div className="flex flex-col items-center gap-2 opacity-60 group hover:opacity-100 transition-opacity">
                                <div className={`w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg ${parentA.color}`}>
                                    <parentA.icon size={18} />
                                </div>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{parentA.label}</span>
                            </div>

                            {/* FUSE ANIMATION */}
                            <div className="relative w-24 h-8 flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                                </div>
                                <div className="relative z-10 w-8 h-8 bg-zinc-950 border border-white/10 rounded-full flex items-center justify-center">
                                    <Plus size={12} className="text-zinc-600" />
                                </div>
                                {/* Animated Particles */}
                                <div className="absolute w-2 h-2 bg-white rounded-full blur-[2px] animate-[ping_1.5s_infinite]" />
                            </div>

                            {/* INPUT B */}
                            <div className="flex flex-col items-center gap-2 opacity-60 group hover:opacity-100 transition-opacity">
                                <div className={`w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg ${parentB.color}`}>
                                    <parentB.icon size={18} />
                                </div>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{parentB.label}</span>
                            </div>
                        </div>

                        {/* RESULT CARD (Center/Right) */}
                        <div className="flex-[2] flex items-center gap-8 pl-4 lg:pl-0">
                            
                            {/* Big Icon */}
                            <div className="flex-shrink-0 w-24 h-24 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl group cursor-help">
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <currentData.icon size={48} className="text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            {/* Text Info */}
                            <div className="flex flex-col justify-center gap-1 max-w-xl">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl font-black text-white tracking-tight leading-none">{currentData.title}</h2>
                                    {locked && <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">LOCKED</span>}
                                </div>
                                
                                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <GitMerge size={12} /> {currentData.field || "Interdisciplinary Field"}
                                </span>
                                
                                <p className="text-zinc-400 text-sm leading-snug line-clamp-2">
                                    {currentData.desc}
                                </p>
                            </div>

                            {/* Action Button */}
                            {currentData.href && (
                                <Link 
                                    href={currentData.href}
                                    className="hidden xl:flex h-12 px-6 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-zinc-200 active:scale-95 transition-all items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap ml-auto"
                                >
                                    Launch Module <ExternalLink size={14} />
                                </Link>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="w-full flex flex-col items-center justify-center gap-2 text-zinc-700">
                        <XCircle size={32} strokeWidth={1} />
                        <span className="font-mono text-sm tracking-[0.2em]">INITIATE SEQUENCE: SELECT NODES</span>
                    </div>
                )}

            </div>
      </div>

    </main>
  );
}