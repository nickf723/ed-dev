"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, Eye, Code, Info } from 'lucide-react';

export default function TableStructureLab() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sections = {
    caption: { tag: '<caption>', desc: "The title of the table. Critical for accessibility context." },
    thead: { tag: '<thead>', desc: "Groups header content. Contains <th> elements defining columns." },
    tbody: { tag: '<tbody>', desc: "The main data payload. Browsers can enable independent scrolling here." },
    tfoot: { tag: '<tfoot>', desc: "Summaries or totals. Often repeated on print pages." },
  };

  return (
    <div className="w-full bg-slate-900/90 border border-orange-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT: THE VISUAL TABLE */}
      <div className="w-full md:w-1/2 p-8 bg-[url('/grid-pattern.svg')] bg-slate-950 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
        
        <div className="bg-slate-900 rounded-lg overflow-hidden border border-white/10 w-full max-w-xs shadow-2xl relative">
          
          {/* Caption */}
          <div 
            onMouseEnter={() => setHoveredSection('caption')}
            onMouseLeave={() => setHoveredSection(null)}
            className={`p-2 text-center text-xs font-bold transition-colors cursor-help ${hoveredSection === 'caption' ? 'bg-orange-500 text-white' : 'text-slate-500 bg-slate-950'}`}
          >
            Quarterly Revenue Report
          </div>

          {/* Thead */}
          <div 
            onMouseEnter={() => setHoveredSection('thead')}
            onMouseLeave={() => setHoveredSection(null)}
            className={`transition-colors border-b border-white/10 ${hoveredSection === 'thead' ? 'bg-orange-500/20 ring-2 ring-inset ring-orange-500' : 'bg-slate-800'}`}
          >
            <div className="grid grid-cols-3 p-2 text-[10px] font-bold text-white uppercase tracking-wider">
                <span>Period</span>
                <span>Gross</span>
                <span>Net</span>
            </div>
          </div>

          {/* Tbody */}
          <div 
            onMouseEnter={() => setHoveredSection('tbody')}
            onMouseLeave={() => setHoveredSection(null)}
            className={`transition-colors ${hoveredSection === 'tbody' ? 'bg-orange-500/10 ring-2 ring-inset ring-orange-500' : ''}`}
          >
            {[1, 2, 3].map(row => (
                <div key={row} className="grid grid-cols-3 p-2 text-xs text-slate-400 border-b border-white/5 last:border-0 hover:bg-white/5">
                    <span className="font-mono text-orange-400">Q{row}</span>
                    <span>$10,240</span>
                    <span>$4,300</span>
                </div>
            ))}
          </div>

          {/* Tfoot */}
          <div 
            onMouseEnter={() => setHoveredSection('tfoot')}
            onMouseLeave={() => setHoveredSection(null)}
            className={`transition-colors border-t border-white/10 ${hoveredSection === 'tfoot' ? 'bg-orange-500/20 ring-2 ring-inset ring-orange-500' : 'bg-slate-800'}`}
          >
             <div className="grid grid-cols-3 p-2 text-[10px] font-bold text-white uppercase">
                <span>Total</span>
                <span>$30k</span>
                <span>$12k</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: THE INSPECTOR */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-orange-500/10 rounded border border-orange-500/30">
                <Code className="text-orange-400" size={16} />
            </div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Semantic Inspector</h3>
        </div>

        {hoveredSection ? (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={hoveredSection}
                className="space-y-4"
            >
                <div className="text-2xl font-mono text-orange-400 font-bold">
                    {sections[hoveredSection as keyof typeof sections].tag}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                    {sections[hoveredSection as keyof typeof sections].desc}
                </p>
                <div className="p-3 bg-black/40 border border-white/10 rounded-lg text-[10px] text-slate-500 font-mono">
                    <div className="flex gap-2">
                        <Info size={12} className="text-sky-400"/>
                        <span>Browser Hint:</span>
                    </div>
                    Using this tag allows browsers to print long tables across multiple pages while repeating the headers automatically.
                </div>
            </motion.div>
        ) : (
            <div className="text-center text-slate-500 py-12">
                <Eye size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-xs">Hover over the table sections to inspect their semantic value.</p>
            </div>
        )}
      </div>
    </div>
  );
}