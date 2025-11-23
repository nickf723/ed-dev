"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dices, Sword, Users, Gamepad2, Filter, Beaker, ArrowRight, Layers 
} from "lucide-react";

const GAMES = [
  {
    id: "mtg",
    title: "Magic: The Gathering",
    genre: "Deckbuilder / TCG",
    icon: Sword,
    color: "text-amber-400",
    tags: ["Resource Management", "Combinatorial Logic", "Metagaming"],
    desc: "The grandmother of all trading card games. Players are planeswalkers dueling with spells.",
    href: "/interdisciplines/game-studies/library/magic-the-gathering" 
  },
  {
    id: "dnd",
    title: "Dungeons & Dragons",
    genre: "Tabletop RPG",
    icon: Dices,
    color: "text-red-400",
    tags: ["Role-Playing", "Probabilistic Mechanics", "Collaborative Storytelling"],
    desc: "The definitive fantasy role-playing game. A conversation between a Dungeon Master and players.",
    href: "#"
  },
  {
    id: "monopoly",
    title: "Monopoly",
    genre: "Board Game",
    icon: Users,
    color: "text-green-400",
    tags: ["Zero-Sum Game", "Negotiation", "Negative Feedback Loops"],
    desc: "A property trading game demonstrating the ruthless nature of unregulated capitalism.",
    href: "#"
  },
  {
    id: "uno",
    title: "Uno",
    genre: "Card Game",
    icon: Layers,
    color: "text-yellow-400",
    tags: ["Pattern Matching", "Turn-Taking", "Stochastic"],
    desc: "A simple color/number matching game known for destroying friendships.",
    href: "#"
  },
  {
    id: "mario",
    title: "Super Mario Bros",
    genre: "Platformer",
    icon: Gamepad2,
    color: "text-blue-400",
    tags: ["Flow State", "Level Design", "Reflexes"],
    desc: "The archetypal platformer. Precise jumping and physics-based puzzle solving.",
    href: "#"
  }
];

export default function GameBrowser() {
  const [filter, setFilter] = useState("All");

  const filteredGames = filter === "All" 
    ? GAMES 
    : GAMES.filter(g => g.genre.includes(filter) || g.tags.some(t => t.includes(filter)));

  return (
    <div className="w-full space-y-8">
      
      {/* Filter Bar */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <Filter size={16} className="text-neutral-500 shrink-0" />
        {["All", "TCG", "RPG", "Board Game", "Video Game"].map((cat) => (
            <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap
                    ${filter === cat 
                        ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
                        : "bg-white/5 text-neutral-400 hover:bg-white/10"}
                `}
            >
                {cat}
            </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
                <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-6 hover:border-purple-500/50 hover:bg-neutral-900/90 transition-all duration-300"
                >
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${game.color} group-hover:scale-110 transition-transform`}>
                                <game.icon size={24} />
                            </div>
                            <span className="text-[10px] font-mono uppercase text-neutral-500 bg-black/20 px-2 py-1 rounded">
                                {game.genre}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {game.title}
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                            {game.desc}
                        </p>
                    </div>

                    {/* Science Tags */}
                    <div className="space-y-3">
                        <div className="h-[1px] w-full bg-white/5" />
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-purple-400">
                            <Beaker size={12} /> Science of the Game
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {game.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 rounded bg-purple-900/20 border border-purple-500/20 text-[10px] text-purple-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <Link 
                            href={game.href}
                            className={`flex items-center justify-between w-full mt-4 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                ${game.href !== "#" ? "bg-purple-600 text-white hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "bg-white/5 text-neutral-500 cursor-not-allowed"}
                            `}
                        >
                            {game.href !== "#" ? "Analyze System" : "Data Pending"}
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

    </div>
  );
}