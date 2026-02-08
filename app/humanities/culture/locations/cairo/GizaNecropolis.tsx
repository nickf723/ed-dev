"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Pyramid, Map } from 'lucide-react';

const SITES = [
  {
    id: 'khufu',
    name: "The Great Pyramid",
    pharaoh: "Khufu",
    height: "146.6m (Original)",
    fact: "The only surviving Wonder of the Ancient World. Built with 2.3 million stone blocks.",
    x: 60, y: 30, w: 20, h: 20
  },
  {
    id: 'khafre',
    name: "Pyramid of Khafre",
    pharaoh: "Khafre",
    height: "136.4m",
    fact: "Appears taller than Khufu's because it sits on higher bedrock. Still retains some casing stones at the apex.",
    x: 45, y: 55, w: 18, h: 18
  },
  {
    id: 'menkaure',
    name: "Pyramid of Menkaure",
    pharaoh: "Menkaure",
    height: "65m",
    fact: "The smallest of the three. Famous for its vertical gash left by a 12th-century attempt to demolish it.",
    x: 30, y: 75, w: 12, h: 12
  },
  {
    id: 'sphinx',
    name: "The Great Sphinx",
    pharaoh: "Khafre (?)",
    height: "20m",
    fact: "A limestone statue of a reclining sphinx. It faces directly West to East, watching the rising sun.",
    x: 75, y: 65, w: 8, h: 6
  }
];

export default function GizaNecropolis() {
  const [active, setActive] = useState<any>(null);

  return (
    <div className="w-full bg-[#0c0a09] border border-amber-900/30 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[400px]">
      
      {/* LEFT: INFO PANEL */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-amber-900/30 bg-[#1c1917] p-6 relative">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
          
          <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Map size={14} /> Site Survey
          </div>

          <AnimatePresence mode="wait">
              {active ? (
                  <motion.div 
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                      <h2 className="text-2xl font-black text-amber-100 mb-1">{active.name}</h2>
                      <div className="text-xs font-mono text-amber-500 mb-6">Target: {active.pharaoh}</div>
                      
                      <div className="space-y-4">
                          <div className="p-3 bg-amber-900/10 border border-amber-900/30 rounded">
                              <div className="text-[10px] uppercase text-amber-600 font-bold">Elevation</div>
                              <div className="text-amber-100 font-mono">{active.height}</div>
                          </div>
                          <div className="text-sm text-stone-400 leading-relaxed italic">
                              "{active.fact}"
                          </div>
                      </div>
                  </motion.div>
              ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center opacity-50">
                      <Pyramid size={48} className="text-amber-900 mb-4" />
                      <p className="text-xs text-amber-700 uppercase tracking-widest">
                          Hover over a structure<br/>to analyze
                      </p>
                  </div>
              )}
          </AnimatePresence>
      </div>

      {/* RIGHT: MAP VISUALIZER */}
      <div className="flex-1 relative bg-[#0f172a] overflow-hidden">
          {/* Grid Lines */}
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />

          {/* Compass */}
          <div className="absolute top-4 right-4 text-amber-900/50 font-black text-4xl select-none">N</div>

          {/* Render Monuments */}
          {SITES.map((site) => (
              <div
                key={site.id}
                className="absolute cursor-pointer group"
                style={{ 
                    left: `${site.x}%`, 
                    top: `${site.y}%`, 
                    width: `${site.w}%`, 
                    height: `${site.h}%` // Height is visual only for clickable area
                }}
                onMouseEnter={() => setActive(site)}
              >
                  {/* The Square Base */}
                  <div className={`w-full h-full border-2 transition-all duration-300 transform rotate-45 ${active?.id === site.id ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'bg-transparent border-amber-900/50 hover:border-amber-700'}`} />
                  
                  {/* Label */}
                  <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase whitespace-nowrap transition-colors ${active?.id === site.id ? 'text-amber-400' : 'text-amber-900/50'}`}>
                      {site.id}
                  </div>
              </div>
          ))}
          
          <div className="absolute bottom-4 left-4 text-[10px] font-mono text-amber-900/60">
              GIZA PLATEAU // 29.9792° N, 31.1342° E
          </div>
      </div>

    </div>
  );
}