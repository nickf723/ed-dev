"use client";
import React from 'react';
import Link from 'next/link';
import AsylumHallway from "./AsylumHallway";
import SecurityFeed from "./SecurityFeed";
import { ArrowLeft, Radio, Eye, Lock } from "lucide-react";

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-stone-300 p-6 md:p-12 font-sans selection:bg-red-900/50 relative overflow-hidden">
        
        {/* BACKGROUND */}
        <AsylumHallway />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-90" />

        <div className="relative z-10 max-w-7xl mx-auto">
            
            {/* HEADER */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Link href="/humanities/culture/holidays/halloween" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-colors mb-6">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Hub
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900/80 border border-stone-800 rounded-full text-[10px] font-bold text-red-500 uppercase tracking-widest mb-4 backdrop-blur-md">
                        <Radio size={10} className="animate-pulse" /> Live Feed // Encrypted
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        Surveillance <span className="text-stone-700">Grid</span>
                    </h1>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-xs text-stone-600 font-mono bg-black/50 p-2 rounded border border-stone-900">
                        NETWORK STATUS: UNSTABLE<br/>
                        SIGNAL STRENGTH: 42%<br/>
                        NODE: NORTH_AMERICA_01
                    </div>
                </div>
            </div>

            {/* THE MAIN UNIT */}
            <div className="mb-16">
                <SecurityFeed />
            </div>

            {/* LORE FOOTER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-950/10 border border-red-900/20 rounded-xl flex items-start gap-4">
                    <Eye className="text-red-800 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="text-sm font-bold text-red-500 uppercase mb-2">Observation Protocol</h4>
                        <p className="text-xs text-red-900/80 leading-relaxed max-w-md">
                            Do not stare directly at static interference for longer than 60 seconds. 
                            If you observe movement in the peripheral monitors, do not report it. 
                            They know when they are being watched.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-stone-900/30 border border-stone-800 rounded-xl flex items-start gap-4">
                    <Lock className="text-stone-600 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="text-sm font-bold text-stone-400 uppercase mb-2">Clearance Level 4</h4>
                        <p className="text-xs text-stone-600 leading-relaxed max-w-md">
                            You are accessing a restricted government feed. Your IP address has been logged. 
                            Any attempt to download or distribute this footage will result in immediate termination.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </main>
  )
}