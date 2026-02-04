"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Book, Users, Skull, CloudLightning } from 'lucide-react';

export default function ArchetypeCompass() {
  const [active, setActive] = useState('trickster');

  const archetypes = {
    'trickster': {
      title: "The Trickster",
      desc: "Agent of chaos. He breaks the rules of the gods, sometimes creating the world by accident, sometimes just causing trouble.",
      icon: CloudLightning,
      color: "text-amber-400",
      examples: [
        { name: "Loki", culture: "Norse", trait: "Shapeshifter / Betrayer" },
        { name: "Anansi", culture: "West African", trait: "Spider / Storyteller" },
        { name: "Coyote", culture: "Native American", trait: "Creator / Fool" },
        { name: "Sun Wukong", culture: "Chinese", trait: "The Monkey King" }
      ]
    },
    'hero': {
      title: "The Solar Hero",
      desc: "The chosen one. Born of obscure origins, they must journey into the underworld to retrieve a boon for their people.",
      icon: Users,
      color: "text-blue-400",
      examples: [
        { name: "Heracles", culture: "Greek", trait: "Strength / Atonement" },
        { name: "Gilgamesh", culture: "Sumerian", trait: "Quest for Immortality" },
        { name: "King Arthur", culture: "British", trait: "The Once and Future King" },
        { name: "Maui", culture: "Polynesian", trait: "Tamer of the Sun" }
      ]
    },
    'flood': {
      title: "The Great Flood",
      desc: "The reset button. The gods grow angry at humanity's corruption and cleanse the world with water.",
      icon: Compass,
      color: "text-cyan-400",
      examples: [
        { name: "Noah's Ark", culture: "Abrahamic", trait: "The Covenant" },
        { name: "Epic of Gilgamesh", culture: "Sumerian", trait: "Utnapishtim's Boat" },
        { name: "Gun-Yu", culture: "Chinese", trait: "Controlling the Waters" },
        { name: "Manu", culture: "Hindu", trait: "The Great Fish" }
      ]
    }
  };

  const current = archetypes[active as keyof typeof archetypes];
  const Icon = current.icon;

  return (
    <div className="w-full bg-slate-900/90 border border-purple-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col min-h-[500px]">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Book className="text-purple-400" size={16} /> Comparative Mythology
        </h3>
        <div className="flex gap-2">
            {Object.entries(archetypes).map(([key, val]) => (
                <button 
                    key={key}
                    onClick={() => setActive(key)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase rounded transition-colors ${active === key ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                    {val.title.split(' ')[1]}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: THE CARD */}
        <motion.div 
            key={active}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className={`inline-block p-4 rounded-full bg-black/40 border border-white/10 ${current.color}`}>
                <Icon size={48} />
            </div>
            <div>
                <h2 className="text-4xl font-black text-white mb-2">{current.title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-purple-500/50 pl-4">
                    {current.desc}
                </p>
            </div>
        </motion.div>

        {/* RIGHT: THE EXAMPLES */}
        <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode='wait'>
                {current.examples.map((ex, i) => (
                    <motion.div
                        key={ex.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-purple-500/30 transition-colors group"
                    >
                        <div>
                            <div className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{ex.name}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">{ex.culture}</div>
                        </div>
                        <div className="text-xs text-right text-slate-400 font-mono">
                            {ex.trait}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

      </div>
    </div>
  );
}