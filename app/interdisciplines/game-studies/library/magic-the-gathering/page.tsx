"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import ManaBackground from "@/app/interdisciplines/game-studies/library/magic-the-gathering/ManaBackground";
import MtgBattleSimulator from "@/app/interdisciplines/game-studies/library/magic-the-gathering/MtgBattleSimulator";
import MtgCardFetcher from "@/app/interdisciplines/game-studies/library/magic-the-gathering/MtgCardFetcher";
import { motion } from "framer-motion";
import {
  Sword, BookOpen, Brain, Trophy, Palette, Zap, Dices, Layers
} from "lucide-react";
import Link from "next/link";

// --- SECTORS (Navigation) ---
const sectors = [
  {
    name: "The Academy",
    desc: "Master the rules and theory.",
    color: "text-cyan-400",
    icon: BookOpen,
    items: [
      { 
        title: "Fundamentals & Rules", 
        desc: "The axioms of the game. Card types, the Stack, and the phases of the turn.", 
        href: "/interdisciplines/game-studies/library/magic-the-gathering/fundamentals", 
        Icon: Layers, 
        className: "theme-computer-science", // Borrowing CS theme for 'Logic'
        subtitle: "The Engine" 
      },
      { 
        title: "Strategy & Deckbuilding", 
        desc: "The art of winning. Archetypes, mana curves, and hypergeometric probability.", 
        href: "/interdisciplines/game-studies/library/magic-the-gathering/strategy", 
        Icon: Brain, 
        className: "theme-mtg-construct",
        subtitle: "The Blueprint" 
      }
    ]
  }
];

// Helper for Color Pie (Visual Flair)
function ColorPieMini() {
    return (
        <div className="flex justify-between items-center p-4 rounded-xl border border-white/5 bg-neutral-900/50 backdrop-blur-sm">
            <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-yellow-100 border-2 border-white/20 shadow-[0_0_10px_rgba(254,240,138,0.4)]" title="White: Peace" />
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white/20 shadow-[0_0_10px_rgba(59,130,246,0.4)]" title="Blue: Knowledge" />
                <div className="w-6 h-6 rounded-full bg-neutral-900 border-2 border-neutral-600 shadow-[0_0_10px_rgba(0,0,0,0.8)]" title="Black: Power" />
                <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white/20 shadow-[0_0_10px_rgba(239,68,68,0.4)]" title="Red: Freedom" />
                <div className="w-6 h-6 rounded-full bg-green-600 border-2 border-white/20 shadow-[0_0_10px_rgba(22,163,74,0.4)]" title="Green: Nature" />
            </div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Philosophy of Color
            </div>
        </div>
    );
}

export default function MTGHubPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Mana Background */}
      <ManaBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Game Library"
          title="Magic: The Gathering"
          subtitle="The grandfather of modern gaming. Part chess, part poker, part math problem. Welcome to the Multiverse."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 cols) */}
          <div className="lg:col-span-9 space-y-12">
             
             {/* 1. Navigation Grid */}
             <section>
                 <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <Zap className="text-amber-400" size={20} />
                    <h2 className="text-xl font-bold text-white tracking-wide">Choose Your Path</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sectors[0].items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                            <TopicCard {...item} />
                        </motion.div>
                    ))}
                 </div>
             </section>
             
             {/* 2. The Arena (Simulator) */}
             <section>
                 <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                        <Sword className="text-red-500" size={20} />
                        <h2 className="text-xl font-bold text-white tracking-wide">The Proving Ground</h2>
                    </div>
                    <div className="hidden sm:block">
                        <ColorPieMini />
                    </div>
                 </div>
                 
                 <p className="text-sm text-neutral-400 mb-6">
                    Test deck concepts in a vacuum. Search for any card in history (via Scryfall API) and deploy it to the battlefield.
                 </p>
                 
                 <MtgBattleSimulator />
             </section>

             {/* 3. Footer / Meta Info */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="glass p-5 rounded-xl border border-white/5 flex items-center gap-4">
                    <Trophy size={24} className="text-yellow-500" />
                    <div>
                        <h4 className="font-bold text-white text-sm">Esports Legacy</h4>
                        <p className="text-[10px] text-neutral-400">30+ years of competitive history.</p>
                    </div>
                 </div>
                 <div className="glass p-5 rounded-xl border border-white/5 flex items-center gap-4">
                    <Palette size={24} className="text-purple-500" />
                    <div>
                        <h4 className="font-bold text-white text-sm">20,000+ Cards</h4>
                        <p className="text-[10px] text-neutral-400">Infinite combinations.</p>
                    </div>
                 </div>
                 <div className="glass p-5 rounded-xl border border-white/5 flex items-center gap-4">
                    <Dices size={24} className="text-cyan-500" />
                    <div>
                        <h4 className="font-bold text-white text-sm">Turing Complete</h4>
                        <p className="text-[10px] text-neutral-400">A computational system.</p>
                    </div>
                 </div>
             </div>

          </div>

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Oracle / Card Search */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
               <MtgCardFetcher />
            </motion.div>

            {/* External Resources */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-neutral-400 mb-4 flex items-center gap-2">
                    <Link className="w-4 h-4" href="#" /> External Archives
                </h4>
                <ul className="space-y-3">
                    <li>
                        <a href="https://scryfall.com" target="_blank" className="flex items-center justify-between text-xs text-cyan-400 hover:text-cyan-300 group">
                            Scryfall <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </a>
                        <p className="text-[10px] text-neutral-500">Advanced card search engine.</p>
                    </li>
                    <li>
                        <a href="https://edhrec.com" target="_blank" className="flex items-center justify-between text-xs text-purple-400 hover:text-purple-300 group">
                            EDHREC <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </a>
                        <p className="text-[10px] text-neutral-500">Commander usage statistics.</p>
                    </li>
                     <li>
                        <a href="https://magic.wizards.com/en/rules" target="_blank" className="flex items-center justify-between text-xs text-amber-400 hover:text-amber-300 group">
                            Comprehensive Rules <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </a>
                        <p className="text-[10px] text-neutral-500">The 200+ page law book.</p>
                    </li>
                </ul>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}