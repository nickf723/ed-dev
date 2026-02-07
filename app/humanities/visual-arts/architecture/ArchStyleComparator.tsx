"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, Box, Info } from 'lucide-react';

const STYLES = {
  classical: {
    title: "Classical / Greek",
    era: "800 BC - 400 AD",
    principle: "Order & Proportion",
    icon: Info, // Placeholder for column icon
    desc: "Defined by the 'Orders' (Doric, Ionic, Corinthian). Focus on symmetry, columns, and the Golden Ratio.",
    materials: "Marble, Stone",
    quote: "Firmitas, Utilitas, Venustas (Strength, Utility, Beauty)"
  },
  gothic: {
    title: "Gothic",
    era: "1100 - 1500",
    principle: "Verticality & Light",
    icon: LayoutTemplate, // Placeholder for pointed arch
    desc: "Defined by the pointed arch, flying buttress, and stained glass. Architecture designed to draw the eye upward to heaven.",
    materials: "Stone, Glass",
    quote: "Stone turned into lace."
  },
  modern: {
    title: "Modernism",
    era: "1920 - Present",
    principle: "Form Follows Function",
    icon: Box,
    desc: "Rejection of ornament. Use of steel, glass, and reinforced concrete to create open floor plans and weightless volumes.",
    materials: "Steel, Glass, Concrete",
    quote: "Less is more."
  }
};

export default function ArchStyleComparator() {
  const [active, setActive] = useState<'classical' | 'gothic' | 'modern'>('classical');
  const current = STYLES[active];

  return (
    <div className="w-full bg-blue-950 border border-blue-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[500px]">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-blue-800 p-6 flex flex-col gap-2 bg-blue-900/50">
          <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Style Selector</div>
          
          {(Object.keys(STYLES) as Array<keyof typeof STYLES>).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`p-4 rounded-lg text-left transition-all border ${active === key ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-transparent border-transparent text-blue-300 hover:bg-blue-800'}`}
              >
                  <div className="font-bold uppercase text-sm">{STYLES[key].title}</div>
                  <div className="text-[10px] opacity-70">{STYLES[key].era}</div>
              </button>
          ))}
      </div>

      {/* BLUEPRINT AREA */}
      <div className="flex-1 relative bg-[#172554] p-8 flex flex-col items-center justify-center overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-10 pointer-events-none invert" />

          <AnimatePresence mode="wait">
              <motion.div 
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-lg border-2 border-white/20 p-8 rounded-xl bg-blue-900/20 backdrop-blur-sm"
              >
                  {/* Schematic Icon */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#172554] p-3 border-2 border-white/20 rounded-full text-white">
                      <current.icon size={32} />
                  </div>

                  <h2 className="text-3xl font-black text-white uppercase text-center mt-4 mb-2">{current.title}</h2>
                  <div className="text-center text-cyan-400 font-mono text-xs uppercase mb-6 tracking-widest">
                      // {current.principle}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                          <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">Philosophy</div>
                          <p className="text-xs text-blue-100 leading-relaxed">{current.desc}</p>
                      </div>
                      <div>
                          <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">Materiality</div>
                          <p className="text-xs text-blue-100 font-mono">{current.materials}</p>
                      </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 text-center">
                      <p className="text-sm text-white italic font-serif">"{current.quote}"</p>
                  </div>

                  {/* Decorative Dimensions */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 -translate-x-1 -translate-y-1" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 translate-x-1 -translate-y-1" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 -translate-x-1 translate-y-1" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 translate-x-1 translate-y-1" />

              </motion.div>
          </AnimatePresence>
      </div>

    </div>
  );
}