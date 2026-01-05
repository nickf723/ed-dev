"use client";
import Link from "next/link";
import GamingBackground from "@/app/humanities/gaming/GamingBackground";
import TimelineJumper from "@/app/humanities/gaming/TimelineJumper";
import { 
  ArrowLeft, Gamepad2, Dices, Swords, 
  BookOpen, Twitch, ArrowUpRight, Joystick
} from "lucide-react";

// --- CONFIG: DOMAINS ---
const DOMAINS = [
  {
    id: "tabletop", title: "Tabletop Games", icon: Dices,
    desc: "Board games, card games, and abstract strategy. The analog foundation of organized play.",
    color: "text-amber-400", border: "border-amber-500/50", bg: "bg-amber-500/10", shadow: "shadow-amber-500/20"
  },
  {
    id: "rpg", title: "Roleplaying Games", icon: Swords,
    desc: "Collaborative storytelling systems (D&D). Exploring identity and narrative through avatars.",
    color: "text-green-400", border: "border-green-500/50", bg: "bg-green-500/10", shadow: "shadow-green-500/20"
  },
  {
    id: "video", title: "Video Games", icon: Joystick,
    desc: "Interactive digital entertainment. From Pong to open worlds. The dominant cultural medium.",
    color: "text-cyan-400", border: "border-cyan-500/50", bg: "bg-cyan-500/10", shadow: "shadow-cyan-500/20"
  },
  {
    id: "ludology", title: "Ludology (Game Studies)", icon: BookOpen,
    desc: "The academic analysis of games. Studying rules, mechanics, and their societal impact.",
    color: "text-fuchsia-400", border: "border-fuchsia-500/50", bg: "bg-fuchsia-500/10", shadow: "shadow-fuchsia-500/20"
  }
];

export default function GamingPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <GamingBackground />
      
      {/* OVERLAY (CRT Scanline + Vignette) */}
      <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-30 pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b-2 border-fuchsia-500/30 bg-[#020617]/90 backdrop-blur-md sticky top-0 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
         <div className="flex items-center gap-6">
             <Link href="/humanities" className="flex items-center gap-2 text-xs font-mono text-fuchsia-400 hover:text-cyan-400 transition-colors uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Humanities
             </Link>
             {/* Retro Separator */}
             <div className="h-6 w-2 bg-gradient-to-b from-fuchsia-500 to-cyan-500 skew-x-12" />
             
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-black border-2 border-cyan-500 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-pulse-slow">
                    <Gamepad2 size={20} className="text-cyan-400" />
                 </div>
                 <h1 className="text-2xl font-black text-white tracking-tight font-mono uppercase drop-shadow-[2px_2px_0_#d946ef]">
                    GAMING
                 </h1>
             </div>
         </div>
         
         {/* Player Status header element */}
         <div className="hidden md:flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest bg-black/50 border border-fuchsia-500/30 px-4 py-2 rounded-full">
            <div className="flex items-center gap-1 text-green-400"><div className="w-2 h-2 bg-green-400 rounded-full animate-ping"/> PLAYER 1 READY</div>
            <span className="text-fuchsia-500">|</span>
            <div className="text-cyan-400">INSERT COIN</div>
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            
            {/* INTRO HERO (NES Style box) */}
            <div className="max-w-4xl mx-auto mb-16 bg-black/80 border-4 border-double border-fuchsia-500 p-6 rounded-lg shadow-[0_0_30px_rgba(217,70,239,0.3)] relative overflow-hidden group">
                 {/* Pixel Corners */}
                 <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-cyan-500"/>
                 <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-cyan-500"/>
                 <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-cyan-500"/>
                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-cyan-500"/>

                 <h2 className="text-4xl font-black text-white mb-4 font-mono uppercase drop-shadow-[3px_3px_0_#06b6d4]">Homo Ludens: Man the Player</h2>
                 <p className="text-fuchsia-200 font-mono text-sm leading-relaxed max-w-3xl relative z-10">
                    Play is not just a pastime; it is a fundamental mode of human existence. Through games, we structure chaos into rules, explore alternate identities, and build culture. From ancient dice made of bone to sprawling virtual metaverses, gaming is the humanities in action—interactive, collaborative, and deeply human.
                 </p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* LEFT: THE CARTRIDGES (Domains) */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {DOMAINS.map((d) => (
                            <Link 
                                key={d.id} 
                                href={`/humanities/gaming/${d.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border-2 backdrop-blur-md transition-all duration-200
                                    hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl ${d.shadow}
                                    ${d.border} ${d.bg}
                                `}
                            >
                                <div className="flex justify-between items-start mb-3 relative">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-lg bg-black/50 border ${d.border} group-hover:animate-bounce-pixel`}>
                                            <d.icon className={d.color} size={24} />
                                        </div>
                                        <h3 className="font-bold text-white text-lg font-mono uppercase drop-shadow-sm">{d.title}</h3>
                                    </div>
                                    <ArrowUpRight size={20} className={`${d.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed font-mono pl-14">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* ESPORTS BANNER */}
                    <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-2 border-cyan-500/50 p-6 rounded-xl flex items-center justify-between gap-6 relative overflow-hidden group hover:border-cyan-400 transition-all cursor-pointer">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"/>
                        <div className="relative z-10">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2 font-mono uppercase text-lg">
                                <Twitch className="text-purple-400" /> Esports & Streaming
                            </h3>
                            <p className="text-xs font-mono text-cyan-200/80 max-w-md">
                                The modern colosseum. Where gaming transforms from a participatory hobby into a global spectator sport and performance art.
                            </p>
                        </div>
                        <div className="hidden md:flex text-4xl font-mono font-bold text-cyan-500 bg-black/50 px-4 py-2 rounded border-2 border-cyan-500/50 drop-shadow-[2px_2px_0_#d946ef] group-hover:animate-pulse">
                            LIVE
                        </div>
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE WIDGET */}
                <div className="lg:col-span-5 flex flex-col items-center justify-start sticky top-28">
                    
                    {/* THE WIDGET */}
                    <TimelineJumper />

                    {/* "INSERT COIN" FLAVOR */}
                    <div className="mt-8 text-center animate-pulse-slow">
                        <p className="text-fuchsia-500 font-mono text-xs mb-1">PRESS START TO CONTINUE</p>
                        <p className="text-cyan-500 font-mono text-[10px]">CREDITS: 01</p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}