"use client";
import Link from "next/link";
import TabletopBackground from "@/app/humanities/gaming/tabletop/TabletopBackground";
import DiceLab from "@/app/humanities/gaming/tabletop/DiceLab";
import { 
  ArrowLeft, Sword, Puzzle, CreditCard, 
  Map, Ghost, Users, ArrowUpRight
} from "lucide-react";

// --- CONFIG: DOMAINS ---
const DOMAINS = [
  {
    id: "board", title: "Board Games", icon: Map,
    desc: "From ancient Go to modern Eurogames. Mechanics, territory control, and economy.",
    color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10"
  },
  {
    id: "tcg", title: "TCGs / CCGs", icon: CreditCard,
    desc: "Trading Card Games. Magic: The Gathering, Pokémon. Deck construction and meta-gaming.",
    color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10"
  },
  {
    id: "wargames", title: "Wargames & Minis", icon: Sword,
    desc: "Warhammer, Battletech. Measuring tapes, painted miniatures, and tactical simulation.",
    color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10"
  },
  {
    id: "puzzles", title: "Puzzles", icon: Puzzle,
    desc: "Logic, spatial reasoning, and deduction. Challenges of the mind against the system.",
    color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10"
  },
  {
    id: "party", title: "Physical & Party", icon: Users,
    desc: "Dexterity (Jenga) and social deduction (Werewolf). Games of human interaction.",
    color: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/10"
  }
];

export default function TabletopPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-stone-300 overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <TabletopBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#050505]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/humanities/gaming" className="flex items-center gap-2 text-xs font-mono text-emerald-600 hover:text-emerald-500 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Gaming
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-900 border border-emerald-800 rounded">
                    <Ghost size={18} className="text-emerald-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-serif">
                    TABLETOP
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-stone-500 uppercase tracking-widest">
            The Analog Frontier
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-[#1a1412]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
                        {/* Abstract Meeple Pattern */}
                        <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4 font-serif">The Social Interface</h2>
                            <p className="text-sm text-stone-400 leading-relaxed mb-6">
                                While video games hide their rules behind code, tabletop games lay them bare on the table. They rely on social contracts, physical components, and the raw imagination of the players. It is the original form of gaming, dating back 5,000 years to ancient Sumer.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Map size={14} className="text-emerald-400" />
                                    <span className="text-xs font-mono">Strategy</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Users size={14} className="text-amber-400" />
                                    <span className="text-xs font-mono">Social</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DOMAINS.map((d) => (
                            <Link 
                                key={d.id} 
                                href={`/humanities/gaming/tabletop/${d.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border backdrop-blur-sm bg-[#1a1412]/40 transition-all duration-300 
                                    hover:-translate-y-1 hover:shadow-lg hover:bg-[#1a1412]/80
                                    ${d.border}
                                `}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${d.bg}`}>
                                            <d.icon className={d.color} size={18} />
                                        </div>
                                        <h3 className="font-bold text-stone-200 text-sm font-serif">{d.title}</h3>
                                    </div>
                                    <ArrowUpRight size={16} className="text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-stone-500 leading-relaxed font-sans">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <DiceLab />

                    {/* TCG CARD */}
                    <div className="bg-[#1a1412]/60 border border-blue-500/20 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2 font-serif">
                            <CreditCard size={18} className="text-blue-500" /> The Meta-Game
                        </h3>
                        
                        <p className="text-xs text-stone-400 leading-relaxed mb-3 mt-3">
                            In games like <em>Magic: The Gathering</em>, the game begins before you even sit at the table. "Deckbuilding" is a game of probability engineering—selecting 60 cards to maximize consistency and synergy against unknown opponents.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}