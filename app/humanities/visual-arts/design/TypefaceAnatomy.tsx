"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, MousePointer, Info } from 'lucide-react';

export default function TypefaceAnatomy() {
  const [font, setFont] = useState<'serif' | 'sans'>('serif');
  const [activePart, setActivePart] = useState<string | null>(null);

  const parts = {
    'serif': {
        name: "The Serif",
        desc: "The decorative stroke at the end of a stem. Originates from Roman stone carving techniques. Helps guide the eye along horizontal lines in print.",
        color: "bg-red-500"
    },
    'bowl': {
        name: "The Bowl",
        desc: "The curved part of the character that encloses the circular or curved parts (counter).",
        color: "bg-blue-500"
    },
    'stem': {
        name: "The Stem",
        desc: "The main, usually vertical stroke of a letterform.",
        color: "bg-yellow-500"
    }
  };

  return (
    <div className="w-full bg-stone-100 border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row h-[500px]">
      
      {/* CONTROLS (Left) */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r-4 border-black p-6 flex flex-col justify-between bg-white">
          <div>
              <div className="flex items-center gap-2 mb-6">
                  <Type size={20} />
                  <span className="font-black text-xl uppercase tracking-tighter">Type Lab</span>
              </div>
              
              <div className="flex gap-2 mb-8">
                  <button 
                    onClick={() => setFont('serif')}
                    className={`flex-1 py-2 px-4 font-bold border-2 border-black transition-all ${font === 'serif' ? 'bg-black text-white' : 'bg-transparent hover:bg-stone-200'}`}
                  >
                      Serif
                  </button>
                  <button 
                    onClick={() => setFont('sans')}
                    className={`flex-1 py-2 px-4 font-bold border-2 border-black transition-all ${font === 'sans' ? 'bg-black text-white' : 'bg-transparent hover:bg-stone-200'}`}
                  >
                      Sans
                  </button>
              </div>

              <div className="space-y-4">
                  <div className="text-xs font-bold uppercase text-stone-500">Inspector</div>
                  {activePart ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-stone-100 border-2 border-black"
                      >
                          <div className={`w-3 h-3 ${parts[activePart as keyof typeof parts].color} mb-2 border border-black`} />
                          <h3 className="font-black text-lg mb-1">{parts[activePart as keyof typeof parts].name}</h3>
                          <p className="text-sm text-stone-600 leading-snug">
                              {parts[activePart as keyof typeof parts].desc}
                          </p>
                      </motion.div>
                  ) : (
                      <div className="p-4 border-2 border-dashed border-stone-300 text-stone-400 text-sm text-center">
                          Hover over the letterform to analyze its anatomy.
                      </div>
                  )}
              </div>
          </div>
          
          <div className="text-[10px] font-mono text-stone-400">
              FIG. 1: {font === 'serif' ? 'GARAMOND (Old Style)' : 'HELVETICA (Neo-Grotesque)'}
          </div>
      </div>

      {/* VISUALIZER (Right) */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-stone-50">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none" />

          {/* THE GIANT LETTER */}
          <div className={`relative text-[300px] leading-none select-none ${font === 'serif' ? 'font-serif' : 'font-sans font-bold'}`}>
              <span className="text-black/10 absolute inset-0 blur-sm transform translate-x-4 translate-y-4">R</span>
              <span className="relative z-10 text-stone-900">R</span>

              {/* INTERACTIVE ZONES (Simplified positions for 'R') */}
              
              {/* Stem */}
              <div 
                  onMouseEnter={() => setActivePart('stem')}
                  onMouseLeave={() => setActivePart(null)}
                  className="absolute left-[15%] top-[10%] w-[20%] h-[80%] cursor-help group"
              >
                   <div className="w-full h-full bg-yellow-500/20 border-2 border-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Bowl */}
              <div 
                  onMouseEnter={() => setActivePart('bowl')}
                  onMouseLeave={() => setActivePart(null)}
                  className="absolute right-[10%] top-[10%] w-[50%] h-[45%] rounded-full cursor-help group"
              >
                   <div className="w-full h-full bg-blue-500/20 border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              </div>

              {/* Serif (Only show if Serif mode) */}
              {font === 'serif' && (
                  <div 
                      onMouseEnter={() => setActivePart('serif')}
                      onMouseLeave={() => setActivePart(null)}
                      className="absolute left-[8%] bottom-[8%] w-[35%] h-[10%] cursor-help group"
                  >
                       <div className="w-full h-full bg-red-500/20 border-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
              )}
          </div>
      </div>

    </div>
  );
}