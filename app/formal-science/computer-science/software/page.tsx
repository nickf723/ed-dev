"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SoftwareBackground from "./SoftwareBackground";
import { SOFTWARE_SECTORS } from "./software-data";
import { ArrowLeft, Terminal, Command, ChevronRight } from "lucide-react";

export default function SoftwareHub() {
  const [activeSnippet, setActiveSnippet] = useState(SOFTWARE_SECTORS[0].snippet);
  const [displayedText, setDisplayedText] = useState("");
  
  // TYPING EFFECT LOGIC
  useEffect(() => {
    let i = 0;
    setDisplayedText(""); // Reset
    const interval = setInterval(() => {
        setDisplayedText(prev => {
            if (i < activeSnippet.length) {
                i++;
                return activeSnippet.slice(0, i);
            }
            return prev;
        });
    }, 10); // Speed of typing
    return () => clearInterval(interval);
  }, [activeSnippet]);

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono pl-0 md:pl-80 relative overflow-hidden selection:bg-green-500/30">
      
      {/* 1. MATRIX VISUALIZER */}
      <SoftwareBackground />
      {/* Scanlines Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-20" />
      {/* Vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#000_150%)] pointer-events-none z-10" />

      <div className="relative z-20 p-6 md:p-12 min-h-screen flex flex-col justify-center">
        
        {/* HEADER */}
        <header className="mb-12">
            <Link href="/formal-science/computer-science" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 hover:text-green-400 transition-colors mb-6">
                <ArrowLeft size={10} /> CS Department
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 flex items-center gap-4">
                SOFTWARE <Terminal className="opacity-50 animate-pulse text-green-500" size={48} />
            </h1>
            <p className="text-green-600/80 max-w-xl text-lg leading-relaxed">
                The architecture of the virtual world. Instructions, logic, and systems.
            </p>
        </header>

        <div className="flex flex-col xl:flex-row gap-12">
            
            {/* LEFT: SECTOR GRID */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {SOFTWARE_SECTORS.map((sector) => {
                    const Icon = sector.icon;
                    return (
                        <Link 
                            key={sector.id} 
                            href={sector.link}
                            onMouseEnter={() => setActiveSnippet(sector.snippet)}
                            className={`
                                group relative p-6 bg-black/80 border border-green-900/50 rounded hover:border-green-500 hover:bg-green-950/10 transition-all duration-300
                            `}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded bg-black border border-green-900 ${sector.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-green-800 group-hover:text-green-500">
                                    SYS_DIR_0{SOFTWARE_SECTORS.indexOf(sector) + 1}
                                </div>
                            </div>
                            
                            <h2 className={`text-2xl font-bold text-white mb-2 group-hover:${sector.color}`}>
                                {sector.label}
                            </h2>
                            <p className="text-sm text-stone-500 leading-relaxed group-hover:text-stone-400">
                                {sector.desc}
                            </p>

                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight size={16} className={sector.color} />
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* RIGHT: THE LIVE TERMINAL (Preview) */}
            <div className="hidden xl:block w-96">
                <div className="sticky top-12 bg-[#0c0c0c] border border-green-900/50 rounded-lg p-1 shadow-2xl">
                    {/* Fake Window Controls */}
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-green-900/30 bg-black rounded-t-lg">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        <div className="ml-auto text-[9px] uppercase tracking-widest text-green-900 flex items-center gap-1">
                            <Command size={10} /> bash
                        </div>
                    </div>
                    
                    {/* Code Content */}
                    <div className="p-6 h-96 font-mono text-xs overflow-hidden relative">
                         <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
                         
                         <div className="text-green-700 mb-4">
                             admin@vector-lab:~$ ./execute_preview.sh
                         </div>
                         
                         <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                             {displayedText}
                             <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse" />
                         </pre>
                    </div>

                    <div className="p-2 border-t border-green-900/30 text-center text-[9px] text-green-900 uppercase">
                        Compile Status: <span className="text-green-500">OK</span>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </main>
  );
}