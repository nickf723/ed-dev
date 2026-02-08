"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Anchor, RefreshCw, Ship } from 'lucide-react';

export default function ShipOfTheseus() {
  // 5 Parts: Hull, Mast, Sails, Deck, Rudder
  const [parts, setParts] = useState([true, true, true, true, true]); // true = Original
  
  const replacePart = (index: number) => {
      const newParts = [...parts];
      newParts[index] = false; // Replaced
      setParts(newParts);
  };

  const originalCount = parts.filter(p => p).length;
  const percentOriginal = (originalCount / 5) * 100;

  const reset = () => setParts([true, true, true, true, true]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[400px]">
      
      {/* VISUALIZER (Left) */}
      <div className="flex-1 relative p-8 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-900/80 pointer-events-none" />
          
          <div className="relative z-10 w-64 h-64 flex items-center justify-center">
               {/* Abstract Ship Representation using divs */}
               <div className="relative w-full h-full">
                   {/* 1. HULL (Bottom) */}
                   <motion.div 
                        onClick={() => replacePart(0)}
                        className={`absolute bottom-0 left-0 right-0 h-16 rounded-b-3xl cursor-pointer border-2 transition-colors duration-500 ${parts[0] ? 'bg-amber-800 border-amber-600' : 'bg-cyan-600 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]'}`}
                        whileHover={{ scale: 1.05 }}
                   >
                       <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/50 uppercase">Hull</span>
                   </motion.div>

                   {/* 2. MAST (Middle) */}
                   <motion.div 
                        onClick={() => replacePart(1)}
                        className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-4 h-32 cursor-pointer border-2 transition-colors duration-500 ${parts[1] ? 'bg-amber-700 border-amber-500' : 'bg-cyan-500 border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.5)]'}`}
                        whileHover={{ scale: 1.05 }}
                   />

                   {/* 3. SAIL (Top) */}
                   <motion.div 
                        onClick={() => replacePart(2)}
                        className={`absolute bottom-24 left-1/2 ml-2 w-24 h-20 rounded-tr-3xl cursor-pointer border-2 transition-colors duration-500 ${parts[2] ? 'bg-stone-200 border-stone-400' : 'bg-cyan-100 border-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.5)]'}`}
                        whileHover={{ scale: 1.05 }}
                   />
               </div>
          </div>
          
          <div className="mt-8 text-center text-slate-400 text-xs font-mono uppercase">
              Click parts to replace them
          </div>
      </div>

      {/* CONTROLS (Right) */}
      <div className="w-full md:w-80 bg-slate-950 border-l border-slate-800 p-8 flex flex-col justify-between">
          <div>
              <div className="flex items-center gap-2 mb-6 text-indigo-400 font-bold uppercase text-xs tracking-widest">
                  <Ship size={14} /> Identity Paradox
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2">The Ship of Theseus</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  "If the ship of Theseus were kept in a harbor and every part replaced one by one, would it then be a new ship?"
                  <span className="block mt-2 italic text-slate-500">— Plutarch</span>
              </p>

              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Originality</span>
                      <span className={`text-xl font-mono font-bold ${percentOriginal === 0 ? 'text-cyan-400' : 'text-amber-500'}`}>
                          {percentOriginal}%
                      </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
                        style={{ width: `${percentOriginal}%` }}
                      />
                  </div>
              </div>
          </div>

          <div className="mt-6">
               <AnimatePresence mode="wait">
                   {percentOriginal === 0 ? (
                       <motion.div 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }}
                         className="p-3 bg-cyan-900/20 border border-cyan-800/50 rounded text-cyan-200 text-xs text-center"
                       >
                           <strong>Paradox Reached:</strong> Not a single original plank remains. Is it the same ship?
                       </motion.div>
                   ) : (
                       <button 
                         onClick={reset}
                         className="w-full py-3 flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase border border-transparent hover:border-slate-700 rounded"
                       >
                           <RefreshCw size={14} /> Reset Experiment
                       </button>
                   )}
               </AnimatePresence>
          </div>
      </div>

    </div>
  );
}