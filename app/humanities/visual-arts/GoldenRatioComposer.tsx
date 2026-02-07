"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, Divide, Circle, LayoutTemplate } from 'lucide-react';

export default function GoldenRatioComposer() {
  const [overlay, setOverlay] = useState<'none' | 'thirds' | 'golden'>('golden');
  
  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[500px]">
      
      {/* CONTROLS */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800 p-6 flex flex-col gap-4">
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Composition Tool</div>
          
          <button 
            onClick={() => setOverlay('golden')}
            className={`p-3 rounded border text-left transition-all flex items-center gap-3 ${overlay === 'golden' ? 'bg-zinc-800 border-yellow-600 text-yellow-500' : 'border-zinc-700 text-zinc-400 hover:text-white'}`}
          >
              <Circle size={18} />
              <div className="text-sm font-bold">Golden Ratio</div>
          </button>

          <button 
            onClick={() => setOverlay('thirds')}
            className={`p-3 rounded border text-left transition-all flex items-center gap-3 ${overlay === 'thirds' ? 'bg-zinc-800 border-blue-500 text-blue-400' : 'border-zinc-700 text-zinc-400 hover:text-white'}`}
          >
              <Grid3X3 size={18} />
              <div className="text-sm font-bold">Rule of Thirds</div>
          </button>

          <div className="mt-auto p-4 bg-black/40 rounded border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
              {overlay === 'golden' && "The Fibonacci Spiral (Phi). Found in nature (shells, galaxies). Guides the eye to the focal point naturally."}
              {overlay === 'thirds' && "Divides the frame into a 3x3 grid. Placing subjects on the lines creates tension and energy."}
          </div>
      </div>

      {/* CANVAS */}
      <div className="flex-1 relative bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
          
          {/* Abstract Art Elements (Draggable in a real app, static for demo) */}
          <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-red-600 rounded-full mix-blend-screen opacity-80 blur-xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-12 bg-blue-500 -rotate-12 mix-blend-screen opacity-60" />
          
          {/* OVERLAYS */}
          {overlay === 'thirds' && (
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-blue-500/30" />
                  ))}
                  {/* Power Points */}
                  <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-blue-500 rounded-full -ml-1 -mt-1" />
                  <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-500 rounded-full -mr-1 -mt-1" />
                  <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-500 rounded-full -ml-1 -mb-1" />
                  <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-blue-500 rounded-full -mr-1 -mb-1" />
              </div>
          )}

          {overlay === 'golden' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Simplified Golden Rectangle/Spiral Visual */}
                  <rect x="0" y="0" width="100" height="100" fill="none" stroke="#ca8a04" strokeWidth="0.2" />
                  <path d="M 0 100 L 61.8 100 L 61.8 0 L 100 0 L 100 38.2 L 61.8 38.2" fill="none" stroke="#ca8a04" strokeWidth="0.5" />
                  <path d="M 0 100 Q 0 0 61.8 0 Q 100 0 100 38.2 Q 100 61.8 76.4 61.8" fill="none" stroke="#ca8a04" strokeWidth="0.8" strokeDasharray="2 2" />
              </svg>
          )}

      </div>
    </div>
  );
}