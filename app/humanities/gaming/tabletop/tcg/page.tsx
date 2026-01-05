"use client";
import Link from "next/link";
import TcgBackground from "@/app/humanities/gaming/tabletop/tcg/TcgBackground";
import ManaCurveLab from "@/app/humanities/gaming/tabletop/tcg/ManaCurveLab";
import TcgLibrary from "@/app/humanities/gaming/tabletop/tcg/TcgLibrary";

import { 
  ArrowLeft, Layers, Sparkles, Coins, 
  Scale, Flame, Shield
} from "lucide-react";

// --- CONFIG: DOMAINS ---
const CONCEPTS = [
  {
    id: "economy", title: "The Card Economy", icon: Coins,
    desc: "Mana, Energy, Lands. Managing the scarcity of resources to deploy threats.",
    color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10"
  },
  {
    id: "advantage", title: "Card Advantage", icon: Layers,
    desc: "The fundamental theory: He who draws more cards, has more options, and wins.",
    color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10"
  },
  {
    id: "meta", title: "The Metagame", icon: Scale,
    desc: "The game outside the game. Analyzing popular decks to build the perfect counter-strategy.",
    color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10"
  },
  {
    id: "archetypes", title: "Archetypes", icon: Flame,
    desc: "Aggro (Fast), Control (Slow), Combo (Synergy), and Midrange (Flexible).",
    color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/10"
  }
];

export default function TcgPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0720] text-violet-100 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <TcgBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none z-0 mix-blend-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-violet-500/20 bg-[#0f0720]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/humanities/gaming/tabletop" className="flex items-center gap-2 text-xs font-mono text-violet-400 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Tabletop
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-violet-950 border border-violet-500/50 rounded shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <Sparkles size={18} className="text-cyan-400" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    TRADING_CARDS
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-violet-500 uppercase tracking-widest">
            Gathering the Magic
         </div>
      </header>

      {/* 3. SCROLLABLE CONTENT AREA */}
      <div className="relative z-10 container mx-auto p-6 md:p-8 space-y-16">
            
            {/* SECTION 1: THEORY & LAB */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE CONCEPTS */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-[#1e1b4b]/60 backdrop-blur-md border border-violet-500/20 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Collectible Strategy</h2>
                            <p className="text-sm text-violet-200/80 leading-relaxed mb-6 font-sans">
                                TCGs combine strategic gameplay with the economics of scarcity. Players are architects, constructing their own tools (decks) from a pool of thousands of components.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Layers size={14} className="text-cyan-400" />
                                    <span className="text-xs font-mono">Deckbuilding</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Coins size={14} className="text-amber-400" />
                                    <span className="text-xs font-mono">Economy</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CONCEPTS.map((d) => (
                            <div key={d.id} className={`group flex flex-col p-5 rounded-xl border backdrop-blur-sm bg-[#1e1b4b]/40 transition-all duration-300 hover:-translate-y-1 ${d.border}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg ${d.bg}`}><d.icon className={d.color} size={18} /></div>
                                    <h3 className="font-bold text-white text-sm font-sans">{d.title}</h3>
                                </div>
                                <p className="text-xs text-violet-200/60 leading-relaxed font-sans">{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    <ManaCurveLab />
                    <div className="bg-[#1e1b4b]/60 border border-violet-500/20 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Shield size={18} /> The Color Pie</h3>
                        <div className="grid grid-cols-5 gap-2 text-center text-[9px] font-mono font-bold">
                            <div className="p-2 rounded bg-white text-black border border-gray-300">ORDER</div>
                            <div className="p-2 rounded bg-blue-600 text-white border border-blue-400">MIND</div>
                            <div className="p-2 rounded bg-black text-white border border-zinc-700">DEATH</div>
                            <div className="p-2 rounded bg-red-600 text-white border border-red-400">CHAOS</div>
                            <div className="p-2 rounded bg-green-600 text-white border border-green-400">LIFE</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: THE LIBRARY */}
            <TcgLibrary />

      </div>
    </main>
  );
}