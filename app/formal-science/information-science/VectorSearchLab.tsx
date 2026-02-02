"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Database, Network } from 'lucide-react';

export default function VectorSearchLab() {
  const [query, setQuery] = useState("");
  const [activeVector, setActiveVector] = useState<{x: number, y: number} | null>(null);

  // Simplified 2D Vector Space
  const corpus = [
    { word: "King", x: 20, y: 20, category: "Royalty" },
    { word: "Queen", x: 25, y: 25, category: "Royalty" },
    { word: "Apple", x: 80, y: 80, category: "Food" },
    { word: "Banana", x: 85, y: 75, category: "Food" },
    { word: "Code", x: 80, y: 20, category: "Tech" },
    { word: "Computer", x: 75, y: 25, category: "Tech" },
  ];

  const handleSearch = () => {
    // Simulate finding the vector for the query
    const match = corpus.find(c => c.word.toLowerCase() === query.toLowerCase());
    if (match) {
        setActiveVector({ x: match.x, y: match.y });
    } else {
        setActiveVector(null);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-cyan-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Network className="text-cyan-400" size={16} /> Vector Space
        </h3>
        <div className="text-[10px] text-slate-500 uppercase font-mono">
            Embedding Dimension: 2
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CONTROLS */}
        <div className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
                Modern search engines don't just match keywords; they map words to coordinates. Words with similar meanings appear closer together in space.
            </p>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Try 'Apple', 'King', 'Code'..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded p-2 pl-8 text-xs text-white outline-none focus:border-cyan-500"
                />
                <Search size={12} className="absolute left-2.5 top-2.5 text-slate-500" />
            </div>
            <button 
                onClick={handleSearch}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded transition-colors"
            >
                Calculate Vectors
            </button>
        </div>

        {/* VISUALIZER */}
        <div className="md:col-span-2 relative h-48 bg-slate-950 rounded-xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')]"></div>
            
            {/* The Points */}
            {corpus.map((item) => {
                const isNear = activeVector && Math.hypot(item.x - activeVector.x, item.y - activeVector.y) < 15;
                const isActive = activeVector && item.x === activeVector.x && item.y === activeVector.y;
                
                return (
                    <motion.div
                        key={item.word}
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className={`absolute flex flex-col items-center justify-center transition-opacity duration-500 ${activeVector && !isNear ? 'opacity-20' : 'opacity-100'}`}
                        style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    >
                        <div className={`w-2 h-2 rounded-full mb-1 ${isActive ? 'bg-amber-400 shadow-[0_0_10px_orange]' : 'bg-cyan-500'}`} />
                        <span className={`text-[10px] font-mono ${isActive ? 'text-amber-400 font-bold' : 'text-cyan-200'}`}>{item.word}</span>
                        {isActive && (
                            <div className="absolute w-24 h-24 border border-white/10 rounded-full animate-ping" />
                        )}
                    </motion.div>
                )
            })}
        </div>
      </div>
    </div>
  );
}