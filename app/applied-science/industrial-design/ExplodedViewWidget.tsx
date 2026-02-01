"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Box, Eye } from 'lucide-react';

export default function ExplodedView() {
  const [exploded, setExploded] = useState(false);

  // Abstract layers of a product
  const layers = [
    { name: "Housing (Top)", color: "bg-orange-500", z: 60 },
    { name: "User Interface", color: "bg-slate-800 border-2 border-orange-400", z: 40 },
    { name: "Circuitry / PCB", color: "bg-green-600", z: 20 },
    { name: "Power Unit", color: "bg-slate-700", z: 0 },
    { name: "Chassis (Bottom)", color: "bg-orange-600", z: -20 },
  ];

  return (
    <div className="w-full h-[400px] bg-slate-900/50 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden perspective-1000">
      
      {/* Controls */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <button 
          onClick={() => setExploded(!exploded)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${exploded ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
        >
          <Layers size={14} /> {exploded ? 'Assemble' : 'Explode'}
        </button>
      </div>

      {/* The Product Assembly */}
      <div className="relative w-48 h-48" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(-45deg)' }}>
        {layers.map((layer, i) => (
          <motion.div
            key={layer.name}
            initial={false}
            animate={{ 
              z: exploded ? i * 50 : 0, // Separate on Z axis
              opacity: exploded ? 0.9 : 1
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`absolute inset-0 rounded-xl shadow-xl flex items-center justify-center border border-white/5 ${layer.color}`}
            style={{ 
              transform: `translateZ(${layer.z}px)`, // Base offset
            }}
          >
            {exploded && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-[8px] font-mono text-white bg-black/50 px-1 rounded -rotate-45"
              >
                {layer.name}
              </motion.span>
            )}
          </motion.div>
        ))}
        
        {/* Core Label when assembled */}
        {!exploded && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <Box className="text-white drop-shadow-lg" size={32} />
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500 text-right">
        VIEW: ISOMETRIC<br/>
        STATUS: {exploded ? 'DIAGNOSTIC' : 'ASSEMBLED'}
      </div>
    </div>
  );
}