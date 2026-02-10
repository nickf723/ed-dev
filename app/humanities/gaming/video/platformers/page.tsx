"use client";
import React from 'react';
import Link from 'next/link';
import CloudKingdom from "./CloudKingdom";
import JumpPhysicsLab from "./JumpPhysicsLab";
import { 
  ArrowLeft, Gamepad2, Layers, 
  ArrowUp, Rocket 
} from "lucide-react";

export default function PlatformerPage() {
  return (
    <main className="relative min-h-screen bg-[#0284c7] text-slate-800 font-sans selection:bg-yellow-300/50 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <CloudKingdom />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/humanities/gaming/video" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors bg-white/10 px-3 py-2 rounded backdrop-blur-sm border border-white/20">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Video Games
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/80 border border-white px-3 py-1 rounded text-sky-600 shadow-lg backdrop-blur-md">
                <ArrowUp size={12} /> Genre: Platformer
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 text-center max-w-4xl mx-auto">
            <div className="inline-block p-4 bg-yellow-400 rounded-2xl mb-6 shadow-[0_10px_20px_rgba(250,204,21,0.4)] rotate-3 hover:rotate-0 transition-transform cursor-default">
                <Gamepad2 size={48} className="text-yellow-900" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-md">
                THE ART OF <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-400">THE JUMP</span>
            </h1>
            
            <p className="text-xl text-sky-100 font-medium leading-relaxed mb-8">
                It is the oldest genre in gaming. Whether 2D or 3D, the goal is simple: Defy gravity, traverse the gap, and stick the landing.
            </p>
        </header>

        

        {/* SECTION 1: THE MECHANICS */}
        <section className="mb-32 bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex items-center gap-4 mb-8">
                <Layers size={24} className="text-sky-600" />
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Game Feel: Coyote Time</h2>
            </div>
            
            <p className="text-slate-600 mb-8 max-w-2xl">
                Great platformers don't follow the laws of physics; they follow the laws of <strong>fun</strong>. "Coyote Time" allows players to jump even after they've walked off a ledge, preventing frustration.
            </p>

            <JumpPhysicsLab />
        </section>

        {/* SECTION 2: THE EVOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: 2D Origins */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10">
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">1985 - 1995</div>
                    <h3 className="text-2xl font-black uppercase mb-4">The Side Scroller</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        Strict X/Y axis movement. Precision was key. The era of pixel-perfect jumps in <em>Super Mario Bros</em> and <em>Sonic</em>.
                    </p>
                </div>
            </div>

            {/* Card 2: The 3D Revolution */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-green-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10">
                    <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">1996 - 2006</div>
                    <h3 className="text-2xl font-black uppercase mb-4">The Z-Axis</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        <em>Super Mario 64</em> changed everything. Suddenly, jumping required spatial depth perception. The camera became the enemy.
                    </p>
                </div>
            </div>

            {/* Card 3: The Gravity Shift */}
            <Link 
                href="/humanities/gaming/video/platformers/super-mario-galaxy" 
                className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden group border-2 border-yellow-400/50 hover:border-yellow-400 hover:-translate-y-2 transition-all cursor-pointer"
            >
                <div className="absolute top-0 right-0 p-32 bg-yellow-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10">
                    <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-2">2007 - Present</div>
                    <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                        Spherical Physics <ArrowUp size={18} className="rotate-45" />
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        Gravity is no longer just "down." It pulls to the center of planetoids. See how Nintendo reinvented movement (again).
                    </p>
                    <div className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-bold uppercase rounded hover:bg-white transition-colors">
                        Launch Galaxy Case Study
                    </div>
                </div>
            </Link>

        </section>

      </div>
    </main>
  );
}