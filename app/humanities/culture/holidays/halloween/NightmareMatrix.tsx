"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, Wheat, Castle, FlaskConical, Trees, 
    Skull, AlertTriangle, Fingerprint, RefreshCw
} from 'lucide-react';
import { MONSTERS, SETTINGS, type HorrorGenre } from './nightmareData';

// Icon Map
const iconMap: any = {
    Activity, Wheat, Castle, FlaskConical, Trees
};

export default function NightmareMatrix() {
  const [activeGenre, setActiveGenre] = useState<HorrorGenre | 'All'>('All');
  const [selectedMonster, setSelectedMonster] = useState<string | null>(null);

  const genres: HorrorGenre[] = ['Gothic', 'Sci-Fi', 'Folk', 'Slasher', 'Cosmic'];

  const filteredMonsters = activeGenre === 'All' 
    ? MONSTERS 
    : MONSTERS.filter(m => m.genres.includes(activeGenre));

  // Get active monster details
  const activeMonData = MONSTERS.find(m => m.id === selectedMonster);

  return (
    <div className="relative min-h-[600px] w-full max-w-6xl mx-auto bg-black border border-stone-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      
      {/* 1. CONTROL PANEL */}
      <div className="p-6 border-b border-stone-800 bg-stone-950 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs uppercase tracking-widest">
              <Skull size={14} /> Taxonomy Filter
          </div>
          <div className="flex gap-2 flex-wrap">
              <button 
                  onClick={() => setActiveGenre('All')}
                  className={`px-3 py-1 rounded text-xs font-bold uppercase transition-all ${activeGenre === 'All' ? 'bg-red-900 text-white' : 'bg-stone-900 text-stone-500 hover:text-stone-300'}`}
              >
                  All
              </button>
              {genres.map(g => (
                  <button 
                    key={g} 
                    onClick={() => setActiveGenre(g)}
                    className={`px-3 py-1 rounded text-xs font-bold uppercase transition-all ${activeGenre === g ? 'bg-red-900 text-white' : 'bg-stone-900 text-stone-500 hover:text-stone-300'}`}
                  >
                      {g}
                  </button>
              ))}
          </div>
      </div>

      <div className="flex flex-col md:flex-row h-full">
          
          {/* 2. THE MONSTER GRID */}
          <div className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#0a0a0a]">
              <AnimatePresence>
                  {filteredMonsters.map(m => (
                      <motion.div
                          layout
                          key={m.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          onClick={() => setSelectedMonster(m.id)}
                          className={`relative group cursor-pointer border rounded-xl overflow-hidden transition-all duration-500 ${selectedMonster === m.id ? 'border-red-600 bg-red-900/10' : 'border-stone-800 bg-stone-900/50 hover:border-stone-600'}`}
                      >
                          {/* Image */}
                          <div className="h-32 w-full overflow-hidden relative">
                              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url(${m.image})` }} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                              <div className="absolute bottom-2 left-3 text-white font-black uppercase text-lg italic tracking-tighter">
                                  {m.name}
                              </div>
                          </div>
                          
                          {/* Tags */}
                          <div className="p-4 space-y-3">
                              <div className="flex flex-wrap gap-2">
                                  {m.genres.map(g => (
                                      <span key={g} className="px-1.5 py-0.5 bg-stone-800 text-[9px] uppercase font-bold text-stone-400 border border-stone-700">
                                          {g}
                                      </span>
                                  ))}
                              </div>
                              <div className="text-xs text-stone-400 line-clamp-2">
                                  {m.desc}
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </AnimatePresence>
          </div>

          {/* 3. THE INSPECTOR PANEL (Right Side) */}
          <div className="w-full md:w-80 border-l border-stone-800 bg-stone-950 p-6 flex flex-col">
              {activeMonData ? (
                  <motion.div 
                      key={activeMonData.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                  >
                      <div className="border-b border-red-900/50 pb-4">
                          <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1">Subject #892</div>
                          <h2 className="text-2xl font-black text-white uppercase">{activeMonData.name}</h2>
                          <div className="text-xs text-stone-500 font-mono">Class: {activeMonData.class}</div>
                      </div>

                      <div className="space-y-4">
                          <h3 className="text-xs font-bold text-white uppercase flex items-center gap-2">
                              <AlertTriangle size={12} className="text-orange-500" /> Known Weaknesses
                          </h3>
                          <div className="p-3 bg-orange-900/10 border border-orange-900/30 text-orange-200 text-xs font-mono">
                              {activeMonData.weakness}
                          </div>
                      </div>

                      <div className="space-y-4">
                          <h3 className="text-xs font-bold text-white uppercase flex items-center gap-2">
                              <Fingerprint size={12} className="text-stone-400" /> Habitat / Setting
                          </h3>
                          <div className="space-y-2">
                              {activeMonData.settings.map(sId => {
                                  const setting = SETTINGS.find(s => s.id === sId);
                                  const Icon = setting ? iconMap[setting.icon] : Activity;
                                  return setting ? (
                                      <div key={sId} className="flex items-start gap-3 p-2 rounded bg-stone-900 border border-stone-800 group hover:border-stone-600 transition-colors">
                                          <div className={`p-1.5 bg-black rounded ${setting.color}`}>
                                              <Icon size={14} />
                                          </div>
                                          <div>
                                              <div className="text-xs font-bold text-stone-200">{setting.title}</div>
                                              <div className="text-[9px] text-stone-500 italic">{setting.sensory}</div>
                                          </div>
                                      </div>
                                  ) : null;
                              })}
                          </div>
                      </div>

                  </motion.div>
              ) : (
                  <div className="h-full flex flex-col items-center justify-center text-stone-700 space-y-4">
                      <RefreshCw size={48} className="animate-spin-slow" />
                      <div className="text-xs font-bold uppercase tracking-widest">Awaiting Selection</div>
                  </div>
              )}
          </div>

      </div>
    </div>
  );
}