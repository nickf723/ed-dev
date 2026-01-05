"use client";
import Link from "next/link";
import { Flame, Zap, Skull, Shield, Eye, Hexagon, Layers, ArrowRight } from "lucide-react";

// The "Big Three" + Modern Challengers
const GAMES = [
  {
    name: "Magic: The Gathering",
    slug: "mtg",
    desc: "The original TCG. Deep strategy, infinite combos, and the color pie.",
    icon: Flame,
    color: "text-orange-500",
    border: "border-orange-500",
    gradient: "from-orange-500/20 to-red-600/20"
  },
  {
    name: "Pokémon TCG",
    slug: "pokemon",
    desc: "Evolution mechanics and prize cards. Gotta catch 'em all.",
    icon: Zap,
    color: "text-yellow-400",
    border: "border-yellow-400",
    gradient: "from-yellow-400/20 to-amber-500/20"
  },
  {
    name: "Yu-Gi-Oh!",
    slug: "yugioh",
    desc: "Fast-paced, trap cards, and massive fusion monsters.",
    icon: Eye, // closest to the Millennium Eye
    color: "text-pink-500",
    border: "border-pink-500",
    gradient: "from-pink-500/20 to-purple-600/20"
  },
  {
    name: "Flesh and Blood",
    slug: "fab",
    desc: "Hero-centric combat. Every card is an action, resource, or defense.",
    icon: Hexagon,
    color: "text-red-500",
    border: "border-red-500",
    gradient: "from-red-500/20 to-rose-900/20"
  },
  {
    name: "Netrunner (LCG)",
    slug: "netrunner",
    desc: "Asymmetric Cyberpunk. Hacker vs Corp. Bluffing and hidden information.",
    icon: Layers,
    color: "text-cyan-400",
    border: "border-cyan-400",
    gradient: "from-cyan-400/20 to-blue-600/20"
  },
  {
    name: "Lorcana",
    slug: "lorcana",
    desc: "Disney magic using 'Ink' to summon characters and quest for Lore.",
    icon: Shield,
    color: "text-indigo-400",
    border: "border-indigo-400",
    gradient: "from-indigo-400/20 to-violet-600/20"
  }
];

export default function TcgLibrary() {
  return (
    <div className="w-full">
        <h2 className="text-2xl font-bold text-white mb-8 font-sans tracking-tight flex items-center gap-3">
            <Layers className="text-violet-500" /> THE LIBRARY
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.map((game) => (
                <Link 
                    key={game.slug} 
                    href={`/humanities/gaming/tabletop/tcg/${game.slug}`}
                    className="group relative block perspective-1000"
                >
                    {/* Card Container */}
                    <div className={`
                        relative h-48 rounded-xl border-2 bg-[#1e1b4b]/80 backdrop-blur-md overflow-hidden transition-all duration-300
                        group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:rotate-x-2
                        ${game.border}
                    `}>
                        {/* Foil Gradient Overlay (Animates on hover) */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        {/* Moving Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:animate-sheen pointer-events-none" />

                        <div className="p-6 h-full flex flex-col justify-between relative z-10">
                            
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div className={`p-2 rounded-lg bg-black/40 border ${game.border} border-opacity-30`}>
                                    <game.icon className={game.color} size={24} />
                                </div>
                                <ArrowRight className={`text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`} size={20} />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-bold text-white font-sans mb-1">{game.name}</h3>
                                <p className="text-xs text-violet-200/70 font-mono leading-relaxed line-clamp-2">
                                    {game.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Shadow underneath */}
                    <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/50 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
            ))}
        </div>
    </div>
  );
}